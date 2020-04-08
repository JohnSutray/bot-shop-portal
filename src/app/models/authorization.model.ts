import { freezeAndSeal } from '../utils/object.utils';

export class AuthResult {
  static fromDto(dto: AuthResult): AuthResult {
    return new AuthResult(
      dto.name,
      dto.token,
      dto.avatar,
    );
  }

  constructor(
    readonly name: string,
    readonly token: string,
    readonly avatar: string,
  ) {
    freezeAndSeal(this);
  }
}
