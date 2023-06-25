// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const packagesSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    description: Type.String(),
    price: Type.Number(),

    created_at: Type.Number(),
    updated_at: Type.Number()
  },
  { $id: 'Packages', additionalProperties: false }
)
export const packagesValidator = getValidator(packagesSchema, dataValidator)
export const packagesResolver = resolve({})

export const packagesExternalResolver = resolve({})

// Schema for creating new entries
export const packagesDataSchema = Type.Pick(packagesSchema, ['name', 'description', 'price'], {
  $id: 'PackagesData'
})
export const packagesDataValidator = getValidator(packagesDataSchema, dataValidator)
export const packagesDataResolver = resolve({})

// Schema for updating existing entries
export const packagesPatchSchema = Type.Partial(packagesSchema, {
  $id: 'PackagesPatch'
})
export const packagesPatchValidator = getValidator(packagesPatchSchema, dataValidator)
export const packagesPatchResolver = resolve({})

// Schema for allowed query properties
export const packagesQueryProperties = Type.Pick(packagesSchema, [
  'id',
  'name',
  'description',
  'price',
  'created_at',
  'updated_at'
])
export const packagesQuerySchema = Type.Intersect(
  [
    querySyntax(packagesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const packagesQueryValidator = getValidator(packagesQuerySchema, queryValidator)
export const packagesQueryResolver = resolve({})
