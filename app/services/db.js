const updateText = 'UPDATE weekplan SET plan=$2 WHERE author=$1 RETURNING *';
const selectText = 'SELECT * FROM weekplan WHERE author = $1';

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
  const client = new Client(clientConfig);

  client.connect();
  const values = [user, JSON.stringify(plan)];

  try {

    await client.query(updateText, values);
    console.log(`Successfully stored weekplan for user ${user}`);

  } catch(err) {

    console.log(err.stack);

  }

  client.end();
};

exports.retrieveWeekplan = async function retrieveWeekplan(user) {
  const client = new Client(clientConfig);
  client.connect();
  const values = [user];

  try {

    const res = await client.query(selectText, values);
    client.end();
    return JSON.parse(res.rows[0].plan);

  } catch(err) {

    console.log(err.stack);
    client.end();
    return false;

  }
};