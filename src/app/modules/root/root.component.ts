import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { slideIn } from '../../animations/slide-in.animation';
import { trigger } from '@angular/animations';
import { SlideEnum } from '../../enums/slide.enum';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [
    trigger('routeAnimations', [
      slideIn('home', 'product', SlideEnum.FromRight),
      slideIn('product', 'home', SlideEnum.FromLeft),
    ]),
  ],
})
export class RootComponent implements OnInit {
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      't-bot',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/t-bot.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'product',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/product.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'order',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/order.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'new',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/new.svg'),
    );
  }

  getRouteAnimation(outlet: RouterOutlet): string {
    return outlet
      && outlet.activatedRouteData
      && outlet.activatedRouteData.animation;
  }
}
