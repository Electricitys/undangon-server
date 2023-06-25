// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { categoriesSchema } from '../categories/categories.schema.js'
import { userSchema } from '../users/users.schema.js'

// Main data model schema
export const invitationsSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    content: Type.String(),
    slug: Type.String(),

    category_id: Type.Number(),
    category: Type.Ref(categoriesSchema),

    user_id: Type.Number(),
    user: Type.Ref(userSchema),

    created_at: Type.Number(),
    updated_at: Type.Number()
  },
  { $id: 'Invitations', additionalProperties: false }
)
export const invitationsValidator = getValidator(invitationsSchema, dataValidator)
export const invitationsResolver = resolve({
  user: virtual(async (invitation, context) => {
    // Associate the user that sent the message
    return context.app.service('users').get(invitation.user_id)
  }),
  categories: virtual(async (invitation, context) => {
    // Associate the user that sent the message
    return context.app.service('cateogories').get(invitation.category_id)
  })
})

export const invitationsExternalResolver = resolve({})

// Schema for creating new entries
export const invitationsDataSchema = Type.Pick(
  invitationsSchema,
  ['name', 'content', 'slug', 'category_id'],
  {
    $id: 'InvitationsData'
  }
)
export const invitationsDataValidator = getValidator(invitationsDataSchema, dataValidator)
export const invitationsDataResolver = resolve({
  user_id: async (_value, _invitation, context) => {
    return context.params.user.id
  }
})

// Schema for updating existing entries
export const invitationsPatchSchema = Type.Partial(invitationsSchema, {
  $id: 'InvitationsPatch'
})
export const invitationsPatchValidator = getValidator(invitationsPatchSchema, dataValidator)
export const invitationsPatchResolver = resolve({})

// Schema for allowed query properties
export const invitationsQueryProperties = Type.Pick(invitationsSchema, [
  'id',
  'name',
  'content',
  'slug',
  'category_id',
  'user_id',
  'created_at',
  'updated_at'
])
export const invitationsQuerySchema = Type.Intersect(
  [
    querySyntax(invitationsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const invitationsQueryValidator = getValidator(invitationsQuerySchema, queryValidator)
export const invitationsQueryResolver = resolve({})
