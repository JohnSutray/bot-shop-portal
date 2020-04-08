import { CategoryDto } from '../services/generated/model/category-dto';
import { freezeAndSeal } from '../utils/object.utils';

export class ProductCategory {
  static fromDto(dto: CategoryDto): ProductCategory {
    return new ProductCategory(dto.name, dto.types);
  }

  constructor(
    readonly name: string,
    readonly types: string[],
  ) {
    freezeAndSeal(this);
  }
}
