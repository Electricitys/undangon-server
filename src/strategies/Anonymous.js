import { AuthenticationBaseStrategy } from '@feathersjs/authentication';

export class AnonymousStrategy extends AuthenticationBaseStrategy {
  async authenticate(authentication, params) {
    return {
      anonymous: true
    };
  }
}
