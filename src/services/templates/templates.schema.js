// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { dataValidator, queryValidator } from '../../validators.js';
import { USER_ROLES, userSchema } from '../users/users.schema.js';
import { categoriesSchema } from '../categories/categories.schema.js';
import { metadataSchema } from '../metadata/metadata.schema.js';

// Main data model schema
export const templatesSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    content: Type.String(),
    thumbnail_url: Type.String(),

    category_id: Type.Number(),
    category: Type.Ref(categoriesSchema),
    user_id: Type.Number(),
    user: Type.Ref(userSchema),

    metadata_id: Type.Number(),
    metadata: Type.Ref(metadataSchema),

    created_at: Type.Number(),
    updated_at: Type.Number()
  },
  { $id: 'Templates', additionalProperties: false }
);
export const templatesValidator = getValidator(templatesSchema, dataValidator);
export const templatesResolver = resolve({
  user: virtual(async (template, context) => {
    // Associate the user that sent the message
    return context.app.service('users').get(template.user_id);
  }),
  category: virtual(async (template, context) => {
    // Associate the category that sent the message
    return context.app.service('categories').get(template.category_id);
  }),
  metadata: virtual(async (template, context) => {
    // Associate the metadata that sent the message
    if (!template.metadata_id) return undefined;
    return context.app.service('metadata').get(template.metadata_id);
  })
});

export const templatesExternalResolver = resolve({});

// Schema for creating new entries
export const templatesDataSchema = Type.Pick(templatesSchema, ['name', 'category_id'], {
  $id: 'TemplatesData'
});
export const templatesDataValidator = getValidator(templatesDataSchema, dataValidator);
export const templatesDataResolver = resolve({
  user_id: async (_value, _template, context) => {
    return context.params.user.id;
  },
  metadata_id: async (value, template, context) => {
    if (value) return value;
    const metadata = await context.app.service('metadata').create({
      title: template.name
    });
    return metadata.id;
  }
});

// Schema for updating existing entries
export const templatesPatchSchema = Type.Partial(templatesSchema, {
  $id: 'TemplatesPatch'
});
export const templatesPatchValidator = getValidator(templatesPatchSchema, dataValidator);
export const templatesPatchResolver = resolve({});

// Schema for allowed query properties
export const templatesQueryProperties = Type.Pick(templatesSchema, [
  'id',
  'name',
  'content',
  'user_id',
  'category_id',
  'metadata_id',
  'created_at',
  'updated_at'
]);
export const templatesQuerySchema = Type.Intersect(
  [
    querySyntax(templatesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export const templatesQueryValidator = getValidator(templatesQuerySchema, queryValidator);
export const templatesQueryResolver = resolve({
  user_id: async (value, _query, context) => {
    const user = context.params.user;
    if (user) {
      if ([USER_ROLES.ADMIN, USER_ROLES.MAINTAINER].indexOf(user.role) > -1) return undefined;
      return user.id;
    }

    return value;
  }
});
