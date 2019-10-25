import { Product } from './product.model';

export class Line {
  constructor(
    readonly product: Product,
    readonly amount: number,
  ) {
  }
}
