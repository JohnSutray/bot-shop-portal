import { from, Observable } from 'rxjs';

export class FileUtils {
  static toBase64(file: File): Observable<string> {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    const resolvePromise = new Promise<string>(
      resolve => fileReader.onload = (e: any) => resolve(e.target.result),
    );

    return from(resolvePromise);
  }
}
