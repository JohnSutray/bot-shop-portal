import { OrderItem } from './order-item.model';
import { OrderDto } from '../services/generated/model/order-dto';
import { freezeAndSeal } from '../utils/object.utils';

export class Order {
  static fromDto(dto: OrderDto): Order {
    return new Order(
      dto.id,
      dto.firstName,
      dto.lastName,
      new Date(dto.createdAt),
      dto.phone,
      dto.address,
      dto.items.map(OrderItem.fromDto),
    );
  }

  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly createdAt: Date,
    readonly phone: string,
    readonly address: string,
    readonly orderItems: OrderItem[],
  ) {
    freezeAndSeal(this);
  }

  get totalCost(): number {
    return this.orderItems.reduce(this.addItemCost, 0);
  }

  private addItemCost = (total: number, item: OrderItem) => total + item.product.price * item.amount;
}
