// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema';
import {
  presetTypeDataValidator,
  presetTypePatchValidator,
  presetTypeQueryValidator,
  presetTypeResolver,
  presetTypeExternalResolver,
  presetTypeDataResolver,
  presetTypePatchResolver,
  presetTypeQueryResolver
} from './preset_types.schema.js';
import { PresetTypeService, getOptions } from './preset_types.class.js';

export const presetTypePath = 'preset_types';
export const presetTypeMethods = ['find', 'get', 'create', 'patch', 'remove'];

export * from './preset_types.class.js';
export * from './preset_types.schema.js';

// A configure function that registers the service and its hooks via `app.configure`
export const presetType = (app) => {
  // Register our service on the Feathers application
  app.use(presetTypePath, new PresetTypeService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: presetTypeMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  });
  // Initialize hooks
  app.service(presetTypePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(presetTypeExternalResolver),
        schemaHooks.resolveResult(presetTypeResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(presetTypeQueryValidator),
        schemaHooks.resolveQuery(presetTypeQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(presetTypeDataValidator),
        schemaHooks.resolveData(presetTypeDataResolver)
      ],
      patch: [
        schemaHooks.validateData(presetTypePatchValidator),
        schemaHooks.resolveData(presetTypePatchResolver)
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
