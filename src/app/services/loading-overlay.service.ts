import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService {
  private isLoadingState = false;
  private forceLoading = false;

  setIsLoading(isLoading: boolean): void {
    this.isLoadingState = isLoading;
  }

  setForceLoading(isLoading: boolean): void {
    this.forceLoading = isLoading;
  }

  get isLoading(): boolean {
    return this.isLoadingState || this.forceLoading;
  }
}
