import { catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';

export const stubPipeOnError = catchError(() => EMPTY) as <T>(source: Observable<T>) => Observable<T>;
