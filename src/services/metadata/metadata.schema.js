// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { dataValidator, queryValidator } from '../../validators.js';

// Main data model schema
export const metadataSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    url: Type.Optional(Type.Union([Type.String(), Type.Null()])),

    image: Type.Union([Type.String(), Type.Null()]),
    image_width: Type.Union([Type.String(), Type.Null()]),
    image_height: Type.Union([Type.String(), Type.Null()]),

    created_at: Type.Number(),
    updated_at: Type.Number()
  },
  { $id: 'Metadata', additionalProperties: false }
);
export const metadataValidator = getValidator(metadataSchema, dataValidator);
export const metadataResolver = resolve({});

export const metadataExternalResolver = resolve({});

// Schema for creating new entries
export const metadataDataSchema = Type.Pick(metadataSchema, ['title'], {
  $id: 'MetadataData',
  additionalProperties: true
});
export const metadataDataValidator = getValidator(metadataDataSchema, dataValidator);
export const metadataDataResolver = resolve({});

// Schema for updating existing entries
export const metadataPatchSchema = Type.Partial(metadataSchema, {
  $id: 'MetadataPatch'
});
export const metadataPatchValidator = getValidator(metadataPatchSchema, dataValidator);
export const metadataPatchResolver = resolve({});

// Schema for allowed query properties
export const metadataQueryProperties = Type.Pick(metadataSchema, [
  'id',
  'title',
  'description',
  'url',
  'image',
  'image_width',
  'image_height',
  'created_at',
  'updated_at'
]);
export const metadataQuerySchema = Type.Intersect(
  [
    querySyntax(metadataQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export const metadataQueryValidator = getValidator(metadataQuerySchema, queryValidator);
export const metadataQueryResolver = resolve({});
