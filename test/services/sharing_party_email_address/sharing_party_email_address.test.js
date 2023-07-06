// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app.js';

describe('sharing_party_email_address service', () => {
  it('registered the service', () => {
    const service = app.service('sharing_party_email_address');

    assert.ok(service, 'Registered the service');
  });
});
