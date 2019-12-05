import { Line } from './line.model';

export class Order {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly phone: string,
    readonly lines: Line[],
  ) {
  }
}
