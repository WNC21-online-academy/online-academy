const knex = require('knex');

const host = process.env.PG_HOST;
const database = process.env.PG_DATABASE;
const user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;

const conn = knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host,
    user,
    password,
    database,
    ssl: {
      rejectUnauthorized: false
    }
  },
  pool: { min: 0, max: 20, propagateCreateError: false }
});

module.exports = conn;
