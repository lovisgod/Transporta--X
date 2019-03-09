const {Pool} = require('pg')
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      transporta(
        USERNAME    TEXT,
        PASSWORD    VARCHAR(200),
        EMAIL       VARCHAR,
        CATEGORY    TEXT,
        LOCATION    VARCHAR,
        PHONE_NO    VARCHAR
      )`;


      `CREATE TABLE IF NOT EXISTS
        rides(
          RIDEFROM   TEXT,
          RIDETO     TEXT,
          TIMEOFDEP   VARCHAR,
          NOOFPASSENGER   INT,
          STATUS    TEXT,
          CUSTOMER  TEXT,
          DRIVER    TEXT,
          DISTANCE  VARCHAR,
          COST      VARCHAR,
          RIDEID    SERIAL PRIMARY KEY        
        )`;



  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS transporta';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};

require('make-runnable');
