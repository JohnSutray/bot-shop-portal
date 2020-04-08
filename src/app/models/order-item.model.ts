import { Product } from './product.model';
import { OrderItemDto } from '../services/generated/model/order-item-dto';
import { freezeAndSeal } from '../utils/object.utils';

export class OrderItem {
  static fromDto(dto: OrderItemDto): OrderItem {
    return new OrderItem(
      Product.fromDto(dto.product),
      dto.amount,
    );
  }

  constructor(
    readonly product: Product,
    readonly amount: number,
  ) {
    freezeAndSeal(this);
  }
}
