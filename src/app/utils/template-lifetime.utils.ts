export class TemplateLifetimeUtils {
  static callAfterNextViewInit(callback: () => any): void {
    setTimeout(() => callback(), 0);
  }
}
