import { ProductDto } from '../services/generated/model/product-dto';

export class Product {
  static fromDto(dto: ProductDto): Product {
    return new Product(
      dto.id,
      dto.mediaUrl,
      dto.name,
      dto.description,
      dto.price,
      dto.category,
      dto.type,
    );
  }

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
