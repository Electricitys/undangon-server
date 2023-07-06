// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';

import { hooks as schemaHooks } from '@feathersjs/schema';
import {
  sharingPartyEmailAddressDataValidator,
  sharingPartyEmailAddressPatchValidator,
  sharingPartyEmailAddressQueryValidator,
  sharingPartyEmailAddressResolver,
  sharingPartyEmailAddressExternalResolver,
  sharingPartyEmailAddressDataResolver,
  sharingPartyEmailAddressPatchResolver,
  sharingPartyEmailAddressQueryResolver
} from './sharing_party_email_address.schema.js';
import { SharingPartyEmailAddressService, getOptions } from './sharing_party_email_address.class.js';

export const sharingPartyEmailAddressPath = 'sharing_party_email_address';
export const sharingPartyEmailAddressMethods = ['find', 'get', 'create', 'patch', 'remove'];

export * from './sharing_party_email_address.class.js';
export * from './sharing_party_email_address.schema.js';

// A configure function that registers the service and its hooks via `app.configure`
export const sharingPartyEmailAddress = (app) => {
  // Register our service on the Feathers application
  app.use(sharingPartyEmailAddressPath, new SharingPartyEmailAddressService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: sharingPartyEmailAddressMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  });
  // Initialize hooks
  app.service(sharingPartyEmailAddressPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(sharingPartyEmailAddressExternalResolver),
        schemaHooks.resolveResult(sharingPartyEmailAddressResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(sharingPartyEmailAddressQueryValidator),
        schemaHooks.resolveQuery(sharingPartyEmailAddressQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(sharingPartyEmailAddressDataValidator),
        schemaHooks.resolveData(sharingPartyEmailAddressDataResolver)
      ],
      patch: [
        schemaHooks.validateData(sharingPartyEmailAddressPatchValidator),
        schemaHooks.resolveData(sharingPartyEmailAddressPatchResolver)
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
