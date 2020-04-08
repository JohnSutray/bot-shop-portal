import { Component } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { PaginationResult } from '../../models/page-result.model';
import { Observable } from 'rxjs';
import { PaginationFilter } from '../../models/paginate-filter.model';
import { TableColumn } from '../../models/table-column.model';
import { LabelsConstants } from '../../constants/labels.constants';
import { EButtonType } from '../../enums/button-type.enum';
import { EButtonColor } from '../../enums/button-color.enum';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  constructor(
    private readonly orderService: OrderService,
  ) {
  }

  readonly columns = [
    new TableColumn<Order>(
      'number',
      LabelsConstants.NUMBER,
      (_, index) => (index + 1).toString(),
    ),
    new TableColumn<Order>(
      'first-name',
      LabelsConstants.FIRST_NAME,
      order => order.firstName,
    ),
    new TableColumn<Order>(
      'last-name',
      LabelsConstants.LAST_NAME,
      order => order.lastName,
    ),
    new TableColumn<Order>(
      'phone',
      LabelsConstants.PHONE,
      order => order.phone,
    ),
    new TableColumn<Order>(
      'address',
      LabelsConstants.ADDRESS,
      order => order.address,
    ),
    new TableColumn<Order>(
      'created-at-date',
      LabelsConstants.CREATION_DATE,
      order => LabelsConstants.TO_DATE(order.createdAt),
    ),
    new TableColumn<Order>(
      'created-at-time',
      LabelsConstants.CREATION_TIME,
      order => LabelsConstants.TO_TIME(order.createdAt),
    ),
    new TableColumn<Order>(
      'total-cost',
      LabelsConstants.TOTAL_COST,
      order => LabelsConstants.TO_PRICE(order.totalCost),
    ),
    new TableColumn<Order>(
      'delete',
      LabelsConstants.REMOVE,
      () => 'delete',
      true,
      EButtonType.ICON,
      EButtonColor.ACCENT,
      order => this.removeOrder(order),
    ),
  ];

  tooltipMapper(order: Order): string {
    return LabelsConstants.CLICK_TO_SEE_ORDER(order.firstName);
  }

  loadFunction = (paginationFilter: PaginationFilter): Observable<PaginationResult<Order>> => this.orderService.getOrders(paginationFilter);

  removeOrder(order: Order): void {
    console.log('remove');
    return;
    this.orderService.removeOrder(order.id);
  }

  openOrder(order: Order) {
    console.log(order);
  }


}
