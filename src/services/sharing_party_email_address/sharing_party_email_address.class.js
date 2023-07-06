import { KnexService } from '@feathersjs/knex';

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SharingPartyEmailAddressService extends KnexService {}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'sharing_party_email_address'
  };
};
