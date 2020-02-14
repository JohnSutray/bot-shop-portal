import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { easeOut, enter, forSelectors, leave, leftPercents, relative, timing } from '../constants/animations.constants';

export const slideInAnimation = trigger('routeAnimations', [
  transition('home <=> *', [
    style(
      relative()
    ),
    query(
      forSelectors(enter, leave),
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
    ),
    query(
      enter,
      [
        style(
          leftPercents(-100),
        ),
      ],
    ),
    query(
      leave,
      animateChild(),
    ),
    group([
      query(
        leave,
        [
          animate(
            timing(500, easeOut),
            style(
              leftPercents(100),
            ),
          ),
        ],
      ),
      query(enter, [
        animate(
          timing(500, easeOut),
          style(
            leftPercents(0),
          ),
        ),
      ]),
    ]),
    query(
      enter,
      animateChild(),
    ),
  ]),
]);

