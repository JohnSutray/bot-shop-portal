import { freezeAndSeal } from '../utils/object.utils';

export class PaginationFilter {
  constructor(
    readonly page: number,
    readonly limit: number,
  ) {
    freezeAndSeal(this);
  }
}
