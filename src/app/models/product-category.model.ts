import { Category } from '../services/generated/model/category';

export class ProductCategory {
  static fromDto(dto: Category): ProductCategory {
    return new ProductCategory(dto.name, dto.types);
  }

  constructor(
    readonly name: string,
    readonly types: string[],
  ) {
  }
}
