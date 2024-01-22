// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { dataValidator, queryValidator } from '../../validators.js';

// Main data model schema
export const presetTypeSchema = Type.Object(
  {
    id: Type.Number(),
    label: Type.String(),
    description: Type.Optional(Type.String())
  },
  { $id: 'PresetType', additionalProperties: false }
);
export const presetTypeValidator = getValidator(presetTypeSchema, dataValidator);
export const presetTypeResolver = resolve({});

export const presetTypeExternalResolver = resolve({});

// Schema for creating new entries
export const presetTypeDataSchema = Type.Pick(presetTypeSchema, ['label'], {
  $id: 'PresetTypeData'
});
export const presetTypeDataValidator = getValidator(presetTypeDataSchema, dataValidator);
export const presetTypeDataResolver = resolve({});

// Schema for updating existing entries
export const presetTypePatchSchema = Type.Partial(presetTypeSchema, {
  $id: 'PresetTypePatch'
});
export const presetTypePatchValidator = getValidator(presetTypePatchSchema, dataValidator);
export const presetTypePatchResolver = resolve({});

// Schema for allowed query properties
export const presetTypeQueryProperties = Type.Pick(presetTypeSchema, ['id', 'label']);
export const presetTypeQuerySchema = Type.Intersect(
  [
    querySyntax(presetTypeQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export const presetTypeQueryValidator = getValidator(presetTypeQuerySchema, queryValidator);
export const presetTypeQueryResolver = resolve({});
