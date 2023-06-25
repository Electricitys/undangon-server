import { packages } from './packages/packages.js'

import { invitations } from './invitations/invitations.js'

import { categories } from './categories/categories.js'

import { templates } from './templates/templates.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(packages)

  app.configure(invitations)

  app.configure(categories)

  app.configure(templates)

  app.configure(user)

  // All services will be registered here
}
