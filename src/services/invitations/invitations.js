// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';
import { iff } from 'feathers-hooks-common';

import { hooks as schemaHooks } from '@feathersjs/schema';
import {
  invitationsDataValidator,
  invitationsPatchValidator,
  invitationsQueryValidator,
  invitationsResolver,
  invitationsExternalResolver,
  invitationsDataResolver,
  invitationsPatchResolver,
  invitationsQueryResolver,
  invitationsRemoveResolver
} from './invitations.schema.js';
import { InvitationsService, getOptions } from './invitations.class.js';
import { allowAnonymous } from '../../hooks/allow-anonymous.js';

export const invitationsPath = 'invitations';
export const invitationsMethods = ['find', 'get', 'create', 'patch', 'remove'];

export * from './invitations.class.js';
export * from './invitations.schema.js';

// A configure function that registers the service and its hooks via `app.configure`
export const invitations = (app) => {
  // Register our service on the Feathers application
  app.use(invitationsPath, new InvitationsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: invitationsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  });
  // Initialize hooks
  app.service(invitationsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(invitationsExternalResolver),
        schemaHooks.resolveResult(invitationsResolver)
      ],
      find: [allowAnonymous, authenticate('jwt', 'anonymous')],
      get: [allowAnonymous, authenticate('jwt', 'anonymous')],
      create: [authenticate('jwt')],
      patch: [
        // authenticate('jwt')
      ],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(invitationsQueryValidator),
        schemaHooks.resolveQuery(invitationsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(invitationsDataValidator),
        schemaHooks.resolveData(invitationsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(invitationsPatchValidator),
        schemaHooks.resolveData(invitationsPatchResolver)
      ],
      remove: [invitationsRemoveResolver]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  });
};
