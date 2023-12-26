// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema';
import {
  metadataDataValidator,
  metadataPatchValidator,
  metadataQueryValidator,
  metadataResolver,
  metadataExternalResolver,
  metadataDataResolver,
  metadataPatchResolver,
  metadataQueryResolver
} from './metadata.schema.js';
import { MetadataService, getOptions } from './metadata.class.js';

export const metadataPath = 'metadata';
export const metadataMethods = ['find', 'get', 'create', 'patch', 'remove'];

export * from './metadata.class.js';
export * from './metadata.schema.js';

// A configure function that registers the service and its hooks via `app.configure`
export const metadata = (app) => {
  // Register our service on the Feathers application
  app.use(metadataPath, new MetadataService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: metadataMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  });
  // Initialize hooks
  app.service(metadataPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(metadataExternalResolver),
        schemaHooks.resolveResult(metadataResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(metadataQueryValidator),
        schemaHooks.resolveQuery(metadataQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(metadataDataValidator),
        schemaHooks.resolveData(metadataDataResolver)
      ],
      patch: [
        schemaHooks.validateData(metadataPatchValidator),
        schemaHooks.resolveData(metadataPatchResolver)
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
