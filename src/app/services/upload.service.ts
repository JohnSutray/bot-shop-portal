import * as AWS from 'aws-sdk';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Credentials } from '../models/aws-credentials.model';
import { HttpClient } from '@angular/common/http';
import { lookup } from 'mime-types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private s3Service: AWS.S3;
  private credentials: Credentials;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  uploadObject(file: File, bucket: string): Observable<AWS.S3.ManagedUpload.SendData> {
    return this.checkCredentials().pipe(
      switchMap(() => this.s3Service.upload({
        Bucket: bucket,
        Key: `${Math.random().toString(36).substring(2, 15)}_${file.name}`,
        Body: file,
        ACL: 'public-read',
        ContentType: lookup(file.name) || '',
      }).promise()),
    );
  }

  removeObject(imageUrl: string, bucket: string): Observable<AWS.S3.DeleteObjectOutput> {
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
        tap(credentials => AWS.config.update({
          accessKeyId: credentials.AccessKeyId,
          secretAccessKey: credentials.SecretAccessKey,
          sessionToken: credentials.SessionToken,
          region: 'eu-north-1',
        })),
        tap(() => this.s3Service = new AWS.S3()),
      );
  }
}
