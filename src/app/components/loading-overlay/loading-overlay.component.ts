import { Component, OnInit } from '@angular/core';
import { LoadingOverlayService } from '../../services/loading-overlay.service';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
})
export class LoadingOverlayComponent implements OnInit {
  constructor(
    private readonly loadingOverlayService: LoadingOverlayService,
  ) {
  }

  get isLoading(): boolean {
    return this.loadingOverlayService.isLoading;
  }

  ngOnInit() {
  }

}
