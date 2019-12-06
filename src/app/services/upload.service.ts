import * as S3 from 'aws-sdk/clients/s3';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Credentials } from '../models/aws-credentials.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FileUtils } from '../utils/file-utils';
import { LoadingOverlayService } from './loading-overlay.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private s3Service = new S3();
  private credentials: Credentials;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly loadingOverlayService: LoadingOverlayService,
  ) {
  }

  uploadObject(file: File, bucket: string): Observable<S3.ManagedUpload.SendData> {
    return this.checkCredentials().pipe(
      tap(() => this.loadingOverlayService.setForceLoading(true)),
      switchMap(() => this.s3Service.upload(
        this.createUploadConfig(file, bucket),
      ).promise()),
      tap(() => this.loadingOverlayService.setForceLoading(false)),
    );
  }

  removeObject(imageUrl: string, bucket: string): Observable<S3.DeleteObjectOutput> {
    const key = imageUrl.slice(imageUrl.lastIndexOf('/') + 1);

    return this.checkCredentials().pipe(
      switchMap(() => this.s3Service.deleteObject({
        Key: key,
        Bucket: bucket,
      }).promise()),
    );
  }

  checkCredentials(): Observable<any> {
    if (!this.credentials || Date.parse(this.credentials.Expiration) < Date.now()) {
      return this.fetchCredentials();
    }

    return of({});
  }

  private fetchCredentials(): Observable<Credentials> {
    return this.httpClient
      .get<Credentials>(`${environment.apiUrl}/credentials`)
      .pipe(
        tap(credentials => this.credentials = credentials),
        tap(credentials => this.s3Service.config.update({
          accessKeyId: credentials.AccessKeyId,
          secretAccessKey: credentials.SecretAccessKey,
          sessionToken: credentials.SessionToken,
          region: 'eu-north-1',
        })),
      );
  }

  private createUploadConfig(file: File, bucket: string): S3.PutObjectRequest {
    return {
      Bucket: bucket,
      Key: FileUtils.createFileId(file),
      Body: file,
      ACL: 'public-read',
      ContentType: FileUtils.getContentType(file),
    };
  }
}
