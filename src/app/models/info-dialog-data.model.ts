import { freezeAndSeal } from '../utils/object.utils';

export class InfoDialogData {
  constructor(
    readonly header: string,
    readonly messages: string[] = [],
  ) {
    freezeAndSeal(this);
  }
}
