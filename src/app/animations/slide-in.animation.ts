import { animate, group, style } from '@angular/animations';
import {
  easeOut,
  enter,
  forSelectors,
  leave,
  leftInPercents,
  timing,
  topInPercents,
  transitionFromTo,
} from '../constants/animations.constants';
import { SlideEnum } from '../enums/slide.enum';

const atTopLeftAndAbsolute = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
};

const underOtherLayout = { 'z-index': '-1' };

const containerForVertical = {
  position: 'absolute',
  top: '64px',
  left: '0',
  right: '0',
  bottom: '0',
};

const containerForHorizontal = {
  position: 'relative',
};

const slideDirections = (direction: SlideEnum, slideTime: number) => ({
  [SlideEnum.FromLeft]: [
    style(containerForHorizontal),
    forSelectors(enter, leave).query(
      style(atTopLeftAndAbsolute),
    ),
    forSelectors(enter).query(
      style(leftInPercents(-100)),
    ),
    group([
      forSelectors(leave).query(
        animate(
          timing(slideTime, easeOut),
          style(leftInPercents(100)),
        ),
      ),
      forSelectors(enter).query(
        animate(
          timing(slideTime, easeOut),
          style(leftInPercents(0)),
        ),
      ),
    ]),
  ],
  [SlideEnum.FromRight]: [
    style(containerForHorizontal),
    forSelectors(enter, leave).query(
      style(atTopLeftAndAbsolute),
    ),
    forSelectors(enter).query(
      style(leftInPercents(100)),
    ),
    group([
      forSelectors(leave).query(
        animate(
          timing(slideTime, easeOut),
          style(leftInPercents(-100)),
        ),
      ),
      forSelectors(enter).query(
        animate(
          timing(slideTime, easeOut),
          style(leftInPercents(0)),
        ),
      ),
    ]),
  ],
  [SlideEnum.FromTop]: [
    style(containerForVertical),
    forSelectors(enter, leave).query(
      style({
        ...atTopLeftAndAbsolute,
        ...underOtherLayout,
      }),
    ),
    forSelectors(enter).query(
      style(topInPercents(-100)),
    ),
    group([
      forSelectors(leave).query(
        animate(
          timing(slideTime, easeOut),
          style(topInPercents(100)),
        ),
      ),
      forSelectors(enter).query(
        animate(
          timing(slideTime, easeOut),
          style(topInPercents(0)),
        ),
      ),
    ]),
  ],
  [SlideEnum.FromBottom]: [
    style(containerForVertical),
    forSelectors(enter, leave).query(
      style({
        ...atTopLeftAndAbsolute,
        ...underOtherLayout,
      }),
    ),
    forSelectors(enter).query(
      style(topInPercents(100)),
    ),
    group([
      forSelectors(leave).query(
        animate(
          timing(slideTime, easeOut),
          style(topInPercents(-100)),
        ),
      ),
      forSelectors(enter).query(
        animate(
          timing(slideTime, easeOut),
          style(topInPercents(0)),
        ),
      ),
    ]),
  ],
}[direction]);

export const slideIn = (
  who: string,
  replaceWhom: string,
  direction: SlideEnum,
  slideTime: number = 200,
) =>
  transitionFromTo(who, replaceWhom).do(...slideDirections(direction, slideTime));
