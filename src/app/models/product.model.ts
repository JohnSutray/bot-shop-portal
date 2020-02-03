export class Product {
  constructor(
    public id: string,
    public mediaUrl: string,
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public type: string,
  ) {
  }
}
