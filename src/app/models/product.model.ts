import { EDisplayType } from '../enums/display-type.enum';

export class Product {
  constructor(
    public id: string,
    public contentUrl: string,
    public displayType: EDisplayType,
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public type: string,
  ) {
  }
}
