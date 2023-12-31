// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { oauth, OAuthStrategy } from '@feathersjs/authentication-oauth';
import { AnonymousStrategy } from './strategies/Anonymous.js';

export const localStrategy = new LocalStrategy();
export const anonymousStrategy = new AnonymousStrategy();

export const authentication = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', localStrategy);
  authentication.register('anonymous', anonymousStrategy);
  authentication.register('google', new OAuthStrategy());

  app.use('authentication', authentication);
  app.configure(oauth());
};
