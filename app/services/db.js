const updatePlanQuery = 'UPDATE weekplan SET plan=$2 WHERE author=$1 RETURNING *';
const updateConfigQuery = 'UPDATE weekplan SET config=$2 WHERE author=$1 RETURNING *';
const selectQuery = 'SELECT * FROM weekplan WHERE author = $1';

const { Client } = require('pg');

const clientConfig = process.env.DATABASE_URL ?
  { //DB connection on heroku
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.RANDOMTIME_NO_SSL === undefined
  }
  :
  { //DB connection on OpenShift
    user: process.env.POSTGRESQL_USER,
    host: process.env.POSTGRESQL_SERVICE_HOST,
    database: process.env.POSTGRESQL_DATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.POSTGRESQL_SERVICE_PORT,
  };

exports.storeWeekplan = async function storeWeekplan(plan, user) {
  dbConnectionWrap(async (client) => {
    const values = [user, JSON.stringify(plan)];
    await client.query(updatePlanQuery, values);
    console.log(`Successfully stored weekplan for user ${user}`);
  });
};

exports.retrieveWeekplan = async function retrieveWeekplan(user) {
  return dbConnectionWrap(async (client) => {
    const values = [user];
    const res = await client.query(selectQuery, values);
    client.end();
    if (res.rows && res.rows.length > 0 && res.rows[0].plan) {
      return JSON.parse(res.rows[0].plan);
    }
    return [];
  });
};

exports.storeConfig = async (config, user) => {
  dbConnectionWrap(async (client) => {
    const values = [user, JSON.stringify(config)];
    await client.query(updateConfigQuery, values);
    console.log(`Successfully stored config for user ${user}`);
  });
};

exports.retrieveConfig = async (user) => {
  return dbConnectionWrap(async (client) => {
    const values = [user];
    const res = await client.query(selectQuery, values);
    if (res.rows && res.rows.length > 0 && res.rows[0].config) {
      return JSON.parse(res.rows[0].config);
    }
    return [];
  });
};

const dbConnectionWrap = async (doQuery) => {
  const client = new Client(clientConfig);

  client.connect();

  try {
    const result = await doQuery(client);
    client.end();
    return result;

  } catch(err) {

    console.log(err.stack);
    client.end();
    return false;
  }
};