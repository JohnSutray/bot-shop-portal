import { AnimationMetadata, AnimationTransitionMetadata, query, transition } from '@angular/animations';

export const leftInPercents = (percents: number) => ({
  left: `${percents}%`,
});
export const topInPercents = (percents: number) => ({
  top: `${percents}%`,
});

export const timing = (timeInMs: number, animation: string) => `${timeInMs}ms ${animation}`;
export const forSelectors = (...selectors: string[]) => ({
  query: (...animation) => query(selectors.join(', '), animation),
});
export const transitionFromTo = (from: string, to: string) => ({
  do: (...actions: AnimationMetadata[]): AnimationTransitionMetadata => transition(`${from} => ${to}`, actions),
});

export const enter = ':enter';
export const leave = ':leave';
export const easeOut = 'ease-out';
