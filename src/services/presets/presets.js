// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';

import { hooks as schemaHooks } from '@feathersjs/schema';
import {
  presetsDataValidator,
  presetsPatchValidator,
  presetsQueryValidator,
  presetsResolver,
  presetsExternalResolver,
  presetsDataResolver,
  presetsPatchResolver,
  presetsQueryResolver
} from './presets.schema.js';
import { PresetsService, getOptions } from './presets.class.js';

export const presetsPath = 'presets';
export const presetsMethods = ['find', 'get', 'create', 'patch', 'remove'];

export * from './presets.class.js';
export * from './presets.schema.js';

// A configure function that registers the service and its hooks via `app.configure`
export const presets = (app) => {
  // Register our service on the Feathers application
  app.use(presetsPath, new PresetsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: presetsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  });
  // Initialize hooks
  app.service(presetsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(presetsExternalResolver),
        schemaHooks.resolveResult(presetsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(presetsQueryValidator), schemaHooks.resolveQuery(presetsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(presetsDataValidator), schemaHooks.resolveData(presetsDataResolver)],
      patch: [schemaHooks.validateData(presetsPatchValidator), schemaHooks.resolveData(presetsPatchResolver)],
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
