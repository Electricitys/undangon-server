import { app } from './app.js'
import { logger } from './logger.js'

const port = app.get('port')
const host = app.get('host')

process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))

console.log(app.get("mysql"))

app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})
