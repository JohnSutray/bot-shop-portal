import range from 'lodash.range';

export class RangeUtils {
  static range(from: number, to: number, step: number = 1): number[] {
    return range(from, to + 0.0000001, step);
  }
}
