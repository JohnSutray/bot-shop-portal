import { environment } from '../../environments/environment';

export class EndpointConstants {
  static readonly ACCOUNT = `${environment.apiUrl}/account`;
  static readonly AUTHORIZE = `${environment.apiUrl}/auth`;
  static readonly PRODUCT = `${environment.apiUrl}/product`;
}
