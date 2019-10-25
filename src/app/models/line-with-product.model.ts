import { Product } from './product.model';

export class LineWithProduct {
  constructor(
    readonly product: Product,
    readonly amount: number,
  ) {
  }
}
