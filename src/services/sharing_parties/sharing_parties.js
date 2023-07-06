// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';

import { hooks as schemaHooks } from '@feathersjs/schema';
import {
  sharingPartyDataValidator,
  sharingPartyPatchValidator,
  sharingPartyQueryValidator,
  sharingPartyResolver,
  sharingPartyExternalResolver,
  sharingPartyDataResolver,
  sharingPartyPatchResolver,
  sharingPartyQueryResolver
} from './sharing_parties.schema.js';
import { SharingPartyService, getOptions } from './sharing_parties.class.js';

export const sharingPartyPath = 'sharing_parties';
export const sharingPartyMethods = ['find', 'get', 'create', 'patch', 'remove'];

export * from './sharing_parties.class.js';
export * from './sharing_parties.schema.js';

// A configure function that registers the service and its hooks via `app.configure`
export const sharingParty = (app) => {
  // Register our service on the Feathers application
  app.use(sharingPartyPath, new SharingPartyService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: sharingPartyMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  });
  // Initialize hooks
  app.service(sharingPartyPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(sharingPartyExternalResolver),
        schemaHooks.resolveResult(sharingPartyResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(sharingPartyQueryValidator),
        schemaHooks.resolveQuery(sharingPartyQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(sharingPartyDataValidator),
        schemaHooks.resolveData(sharingPartyDataResolver)
      ],
      patch: [
        schemaHooks.validateData(sharingPartyPatchValidator),
        schemaHooks.resolveData(sharingPartyPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  });
};
