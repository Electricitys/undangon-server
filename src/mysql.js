// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import knex from 'knex';

export const mysql = (app) => {
  const config = app.get('mysql');

  console.log(config);
  const db = knex(config);

  app.set('mysqlClient', db);
};
