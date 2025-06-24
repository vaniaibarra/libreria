const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'libreria',
  port: 5432,
  allowExitOnIdle: true
});

module.exports = { pool };
