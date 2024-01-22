import { presetType } from './preset_types/preset_types.js';

import { metadata } from './metadata/metadata.js';

import { presets } from './presets/presets.js';

import { sharingPartyEmailAddress } from './sharing_party_email_address/sharing_party_email_address.js';

import { sharingParty } from './sharing_parties/sharing_parties.js';

import { packages } from './packages/packages.js';

import { invitations } from './invitations/invitations.js';

import { categories } from './categories/categories.js';

import { templates } from './templates/templates.js';

import { user } from './users/users.js';

export const services = (app) => {
  app.configure(presetType);

  app.configure(metadata);

  app.configure(presets);

  app.configure(sharingPartyEmailAddress);

  app.configure(sharingParty);

  app.configure(packages);

  app.configure(invitations);

  app.configure(categories);

  app.configure(templates);

  app.configure(user);

  // All services will be registered here
};
