// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { dataValidator, queryValidator } from '../../validators.js';

export const SHARING_TYPE = { PRIVATE: 'private', PUBLIC: 'public' };

// Main data model schema
export const sharingPartySchema = Type.Object(
  {
    id: Type.Number(),
    type: Type.String({ default: SHARING_TYPE.PRIVATE })
  },
  { $id: 'SharingParty', additionalProperties: false }
);
export const sharingPartyValidator = getValidator(sharingPartySchema, dataValidator);
export const sharingPartyResolver = resolve({});

export const sharingPartyExternalResolver = resolve({});

// Schema for creating new entries
export const sharingPartyDataSchema = Type.Pick(sharingPartySchema, ['type'], {
  $id: 'SharingPartyData'
});
export const sharingPartyDataValidator = getValidator(sharingPartyDataSchema, dataValidator);
export const sharingPartyDataResolver = resolve({});

// Schema for updating existing entries
export const sharingPartyPatchSchema = Type.Partial(sharingPartySchema, {
  $id: 'SharingPartyPatch'
});
export const sharingPartyPatchValidator = getValidator(sharingPartyPatchSchema, dataValidator);
export const sharingPartyPatchResolver = resolve({});

// Schema for allowed query properties
export const sharingPartyQueryProperties = Type.Pick(sharingPartySchema, ['id', 'type']);
export const sharingPartyQuerySchema = Type.Intersect(
  [
    querySyntax(sharingPartyQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export const sharingPartyQueryValidator = getValidator(sharingPartyQuerySchema, queryValidator);
export const sharingPartyQueryResolver = resolve({});
