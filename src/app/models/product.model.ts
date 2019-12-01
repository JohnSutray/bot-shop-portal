import { EDisplayType } from '../enums/display-type.enum';

export class Product {
  constructor(
    readonly id: string,
    readonly contentUrl: string,
    readonly displayType: EDisplayType,
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly category: string,
    readonly type: string,
  ) {
  }
}
