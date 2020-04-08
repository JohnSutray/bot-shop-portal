import { freezeAndSeal } from '../utils/object.utils';
import { EButtonType } from '../enums/button-type.enum';
import { ThemePalette } from '@angular/material/core';

export class TableColumn<TData> {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly mapFunction: (data: TData, index: number) => string,
    readonly isButton: boolean = false,
    readonly buttonType: EButtonType = EButtonType.SIMPLE,
    readonly buttonColor: ThemePalette = null,
    readonly buttonAction: (data: TData, index: number) => any = () => null,
  ) {
    freezeAndSeal(this);
  }
}
