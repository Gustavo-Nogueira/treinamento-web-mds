const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'docker',
  database: 'treino'
})

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};