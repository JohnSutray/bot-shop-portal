import { slideInAnimation } from '../animations/slide-in.animation';
import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

it('sad', () => {
  expect(slideInAnimation).toEqual(trigger('routeAnimations', [
      transition('home <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [
          style({ left: '-100%' }),
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('500ms ease-out', style({ left: '100%' })),
          ]),
          query(':enter', [
            animate('500ms ease-out', style({ left: '0%' })),
          ]),
        ]),
        query(':enter', animateChild()),
      ]),
    ]),
  );
});
