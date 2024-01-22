// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';

import { hooks as schemaHooks } from '@feathersjs/schema';
import {
  templatesDataValidator,
  templatesPatchValidator,
  templatesQueryValidator,
  templatesResolver,
  templatesExternalResolver,
  templatesDataResolver,
  templatesPatchResolver,
  templatesQueryResolver,
  tempaltesRemoveResolver
} from './templates.schema.js';
import { TemplatesService, getOptions } from './templates.class.js';
import { allowAnonymous } from '../../hooks/allow-anonymous.js';

export const templatesPath = 'templates';
export const templatesMethods = ['find', 'get', 'create', 'patch', 'remove'];

export * from './templates.class.js';
export * from './templates.schema.js';

// A configure function that registers the service and its hooks via `app.configure`
export const templates = (app) => {
  // Register our service on the Feathers application
  app.use(templatesPath, new TemplatesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: templatesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  });
  // Initialize hooks
  app.service(templatesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(templatesExternalResolver),
        schemaHooks.resolveResult(templatesResolver)
      ],
      find: [allowAnonymous, authenticate('jwt', 'anonymous')],
      get: [allowAnonymous, authenticate('jwt', 'anonymous')],
      create: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(templatesQueryValidator),
        schemaHooks.resolveQuery(templatesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(templatesDataValidator),
        schemaHooks.resolveData(templatesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(templatesPatchValidator),
        schemaHooks.resolveData(templatesPatchResolver)
      ],
      remove: [tempaltesRemoveResolver]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  });
};
