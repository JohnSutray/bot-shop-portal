import { Order } from './order.model';
import { LineWithProduct } from './line-with-product.model';

export class OrderWithProductLines {
  constructor(
    readonly order: Order,
    readonly products: LineWithProduct[],
  ) {
  }
}
