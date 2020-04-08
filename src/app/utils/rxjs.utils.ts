import { catchError, map } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { PaginationResultDto } from '../models/pagination-result-dto.model';
import { PaginationResult } from '../models/page-result.model';

export const stubPipeOnError = catchError(() => EMPTY) as <T>(source: Observable<T>) => Observable<T>;

export const mapCollection = <TDto, TResult>(dtoMapper: (dto: TDto) => TResult) => map(
  (collection: TDto[]) => collection.map(dtoMapper),
);

export const mapPaginationResult = <TDto, TResult>(dtoMapper: (dto: TDto) => TResult) => map(
  (paginationResult: PaginationResultDto<TDto>) => PaginationResult.fromDto(paginationResult, dtoMapper),
);
