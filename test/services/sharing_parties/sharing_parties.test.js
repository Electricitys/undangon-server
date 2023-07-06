// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app.js';

describe('sharing_parties service', () => {
  it('registered the service', () => {
    const service = app.service('sharing_parties');

    assert.ok(service, 'Registered the service');
  });
});
