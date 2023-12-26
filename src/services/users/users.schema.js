// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { passwordHash } from '@feathersjs/authentication-local';
import { dataValidator, queryValidator } from '../../validators.js';

export const USER_ROLES = { ADMIN: 'admin', MAINTAINER: 'maintainer', USER: 'user', PUBLIC: 'public' };

// Main data model schema
export const userSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    email: Type.String(),
    password: Type.Optional(Type.String()),
    googleId: Type.Optional(Type.String()),
    role: Type.String({ default: USER_ROLES.PUBLIC }),

    created_at: Type.Optional(Type.String()),
    updated_at: Type.Optional(Type.String())
  },
  { $id: 'User', additionalProperties: false }
);
export const userValidator = getValidator(userSchema, dataValidator);
export const userResolver = resolve({});

export const userExternalResolver = resolve({
  // The password should never be visible externally
  password: async () => undefined
});

// Schema for creating new entries
export const userDataSchema = Type.Pick(userSchema, ['name', 'email', 'password', 'role', 'googleId'], {
  $id: 'UserData'
});
export const userDataValidator = getValidator(userDataSchema, dataValidator);
export const userDataResolver = resolve({
  password: passwordHash({ strategy: 'local' })
});

// Schema for updating existing entries
export const userPatchSchema = Type.Partial(userSchema, {
  $id: 'UserPatch'
});
export const userPatchValidator = getValidator(userPatchSchema, dataValidator);
export const userPatchResolver = resolve({
  password: passwordHash({ strategy: 'local' })
});

// Schema for allowed query properties
export const userQueryProperties = Type.Pick(userSchema, ['id', 'name', 'email', 'created_at', 'updated_at']);
export const userQuerySchema = Type.Intersect(
  [
    querySyntax(userQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export const userQueryValidator = getValidator(userQuerySchema, queryValidator);
export const userQueryResolver = resolve({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  id: async (value, _query, context) => {
    if (context.params.user) {
      if ([USER_ROLES.ADMIN, USER_ROLES.MAINTAINER].indexOf(context.params.user.role)) return undefined;
      return context.params.user.id;
    }

    return value;
  }
});
