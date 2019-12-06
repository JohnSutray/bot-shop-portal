import { from, Observable } from 'rxjs';
import { RandomUrils } from './random.urils';
import { lookup } from 'mime-types';

export class FileUtils {
  static toBase64(file: File): Observable<string> {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    const resolvePromise = new Promise<string>(
      resolve => fileReader.onload = (e: any) => resolve(e.target.result),
    );

    return from(resolvePromise);
  }

  static isImage(file: File): boolean {
    return ['image/jpeg', 'image/png'].includes(file.type);
  }

  static isVideo(file: File): boolean {
    return ['video/mp4'].includes(file.type);
  }

  static createFileId(file: File): string {
    return `${RandomUrils.randomString()}_${file.name}`;
  }

  static getContentType(file: File): string {
    return lookup(file.name) as string;
  }

  static inSizeLimit(file: File, limitMB: number): boolean {
    return file.size < limitMB * 1048576;
  }
}
