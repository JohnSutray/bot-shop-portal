import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService {
  private isLoadingState = false;

  setIsLoading(isLoading: boolean): void {
    this.isLoadingState = isLoading;
  }

  get isLoading(): boolean {
    return this.isLoadingState;
  }
}
