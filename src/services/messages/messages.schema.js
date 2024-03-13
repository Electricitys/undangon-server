// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { dataValidator, queryValidator } from '../../validators.js';
import { invitationsSchema } from '../invitations/invitations.schema.js';

// Main data model schema
export const messageSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    message: Type.String(),

    token: Type.String(),

    created_at: Type.String(),
    updated_at: Type.String()
  },
  { $id: 'Message', additionalProperties: false }
);
export const messageValidator = getValidator(messageSchema, dataValidator);
export const messageResolver = resolve({});

export const messageExternalResolver = resolve({});

// Schema for creating new entries
export const messageDataSchema = Type.Pick(messageSchema, ['title', 'message', 'token'], {
  $id: 'MessageData'
});
export const messageDataValidator = getValidator(messageDataSchema, dataValidator);
export const messageDataResolver = resolve({});

// Schema for updating existing entries
export const messagePatchSchema = Type.Partial(messageSchema, {
  $id: 'MessagePatch'
});
export const messagePatchValidator = getValidator(messagePatchSchema, dataValidator);
export const messagePatchResolver = resolve({});

// Schema for allowed query properties
export const messageQueryProperties = Type.Pick(messageSchema, ['id', 'title', 'message', 'token']);
export const messageQuerySchema = Type.Intersect(
  [
    querySyntax(messageQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export const messageQueryValidator = getValidator(messageQuerySchema, queryValidator);
export const messageQueryResolver = resolve({});
