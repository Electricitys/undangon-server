// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { dataValidator, queryValidator } from '../../validators.js';
import { sharingPartySchema } from '../sharing_parties/sharing_parties.schema.js';

// Main data model schema
export const sharingPartyEmailAddressSchema = Type.Object(
  {
    id: Type.Number(),
    user_email: Type.String(),
    sharing_party_id: Type.Number(),
    sharing_party: Type.Ref(sharingPartySchema)
  },
  { $id: 'SharingPartyEmailAddress', additionalProperties: false }
);
export const sharingPartyEmailAddressValidator = getValidator(sharingPartyEmailAddressSchema, dataValidator);
export const sharingPartyEmailAddressResolver = resolve({});

export const sharingPartyEmailAddressExternalResolver = resolve({});

// Schema for creating new entries
export const sharingPartyEmailAddressDataSchema = Type.Pick(
  sharingPartyEmailAddressSchema,
  ['user_email', 'sharing_party_id'],
  {
    $id: 'SharingPartyEmailAddressData'
  }
);
export const sharingPartyEmailAddressDataValidator = getValidator(
  sharingPartyEmailAddressDataSchema,
  dataValidator
);
export const sharingPartyEmailAddressDataResolver = resolve({});

// Schema for updating existing entries
export const sharingPartyEmailAddressPatchSchema = Type.Partial(sharingPartyEmailAddressSchema, {
  $id: 'SharingPartyEmailAddressPatch'
});
export const sharingPartyEmailAddressPatchValidator = getValidator(
  sharingPartyEmailAddressPatchSchema,
  dataValidator
);
export const sharingPartyEmailAddressPatchResolver = resolve({});

// Schema for allowed query properties
export const sharingPartyEmailAddressQueryProperties = Type.Pick(sharingPartyEmailAddressSchema, [
  'id',
  'user_email',
  'sharing_party_id'
]);
export const sharingPartyEmailAddressQuerySchema = Type.Intersect(
  [
    querySyntax(sharingPartyEmailAddressQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export const sharingPartyEmailAddressQueryValidator = getValidator(
  sharingPartyEmailAddressQuerySchema,
  queryValidator
);
export const sharingPartyEmailAddressQueryResolver = resolve({});
