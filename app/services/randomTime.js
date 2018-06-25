const updateText = 'UPDATE weekplan SET plan=$2 WHERE author=$1 RETURNING *';

const { Client } = require('pg');

const clientConfig = {
  user: process.env.POSTGRESQL_USER,
  host: process.env.POSTGRESQL_SERVICE_HOST,
  database: process.env.POSTGRESQL_DATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.POSTGRESQL_SERVICE_PORT,
};

const config = {
  slotLength: 0.5,
  activities: [
    {
      name: "Programmieren Lernen",
      minAmount: 0.25
    },
    {
      name: "LKG Website",
      minAmount: 0.25
    },
    {
      name: "Frei",
      minAmount: 0.25
    }
  ]
};

exports.createWeekPlan = async function createWeekPlan(entireTime) {
  const numberOfSlots = entireTime / config.slotLength;
  const weekSlots = [];
  config.activities.forEach((activity) => {
    let minNumberOfSlots = Math.floor(numberOfSlots * activity.minAmount);
    for (let i = 0; i < minNumberOfSlots; i++) {
      weekSlots.push(activity.name);
    }
  });

  for (let i = weekSlots.length; i < numberOfSlots; i++) {
    weekSlots.push(config.activities[getRandomInt(0, config.activities.length - 1)].name);
  }

  shuffleArray(weekSlots);
  const client = new Client(clientConfig);

  client.connect();
  const values = ['Jule', JSON.stringify(weekSlots)];

  try {
    await client.query(updateText, values);
    console.log(`Created weekplan for ${entireTime} hours!`);

  } catch(err) {
    console.log(err.stack);
  }

  client.end();
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

exports.getDayPlan = async function getDayPlan(numberOfSlots) {
  let currentWeekPlan;
  const query = {
    name: 'fetch-weekplan',
    text: 'SELECT * FROM weekplan WHERE author = $1',
    values: ['Jule']
  };

  const client = new Client(clientConfig);
  client.connect();

  try {
    const res = await client.query(query);

    if (res.rows[0]) {
      let prevWeekPlan = JSON.parse(res.rows[0].plan);
      if (prevWeekPlan.length > 0) {
        currentWeekPlan = prevWeekPlan;
      }
    }
    if (!currentWeekPlan) {
      console.warn("No weekplan set. Create one first by calling createWeekPlan(NUMBER_OF_HOURS_IN_WEEK).");
      return;
    }

    let result = [];
    for (let i = 0; i < numberOfSlots; i++) {
      result.push(currentWeekPlan.shift());
    }

    const values = ['Jule', JSON.stringify(currentWeekPlan)];

    try {
      await client.query(updateText, values);
    } catch (err) {
      console.log(err.stack);
    }

    client.end();
    return result;

  } catch(err) {
    console.log(err.stack);
    client.end();
    return false;
  }
};
