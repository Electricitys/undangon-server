import { app } from './app.js';
import { logger } from './logger.js';

const port = app.get('port');
const host = app.get('host');

process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason));

const db = app.get('mysqlClient');

db.raw('select 1+1 as result').catch((err) => {
  const db_config = app.get('mysql');
  logger.error(`While creating connection to DB [${db_config.client}] ${db_config.connection}\n`, err);
  process.exit(1);
});

app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`);
});
