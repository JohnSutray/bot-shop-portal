export class Product {
  constructor(
    readonly id: string,
    readonly imageUrl: string,
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly category: string,
    readonly type: string,
  ) {
  }
}
