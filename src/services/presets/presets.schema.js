// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { dataValidator, queryValidator } from '../../validators.js';
import { userSchema } from '../users/users.schema.js';
import { presetTypeDataSchema } from '../preset_types/preset_types.schema.js';

// Main data model schema
export const presetsSchema = Type.Object(
  {
    id: Type.Number(),
    label: Type.String(),
    content: Type.String(),
    thumbnail: Type.String(),

    type_id: Type.Number(),
    type: Type.Ref(presetTypeDataSchema),

    user_id: Type.Number(),
    user: Type.Ref(userSchema),

    created_at: Type.Number(),
    updated_at: Type.Number()
  },
  { $id: 'Presets', additionalProperties: false }
);
export const presetsValidator = getValidator(presetsSchema, dataValidator);
export const presetsResolver = resolve({
  user: virtual(async (preset, context) => {
    // Associate the user that sent the message
    return context.app.service('users').get(preset.user_id);
  }),
  type: virtual(async (preset, context) => {
    return context.app.service('preset_types').get(preset.type_id);
  })
});

export const presetsExternalResolver = resolve({});

// Schema for creating new entries
export const presetsDataSchema = Type.Pick(presetsSchema, ['content', 'thumbnail', 'user_id', 'type_id'], {
  $id: 'PresetsData'
});
export const presetsDataValidator = getValidator(presetsDataSchema, dataValidator);
export const presetsDataResolver = resolve({
  user_id: async (_value, _preset, context) => {
    return context.params.user.id;
  }
});

// Schema for updating existing entries
export const presetsPatchSchema = Type.Partial(presetsSchema, {
  $id: 'PresetsPatch'
});
export const presetsPatchValidator = getValidator(presetsPatchSchema, dataValidator);
export const presetsPatchResolver = resolve({});

// Schema for allowed query properties
export const presetsQueryProperties = Type.Pick(presetsSchema, [
  'id',
  'content',
  'thumbnail',
  'user_id',
  'type_id',
  'created_at',
  'updated_at'
]);
export const presetsQuerySchema = Type.Intersect(
  [
    querySyntax(presetsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export const presetsQueryValidator = getValidator(presetsQuerySchema, queryValidator);
export const presetsQueryResolver = resolve({});
