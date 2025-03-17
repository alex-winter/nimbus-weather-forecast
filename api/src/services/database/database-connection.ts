import {config} from '../../config'

export const databaseConnection = require('knex')({
  client: 'mysql2',
  connection: {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
  },
});
