export const leftPercents = (percents: number) => ({
  left: `${percents}%`,
});
export const relative = () => ({
  position: 'relative',
});
export const timing = (timeInMs: number, animation: string) => `${timeInMs}ms ${animation}`;
export const forSelectors = (...selectors: string[]) => selectors.join(', ');

export const enter = ':enter';
export const leave = ':leave';
export const easeOut = 'ease-out';
