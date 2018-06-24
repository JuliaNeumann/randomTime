const store = require('data-store')('randomtime');

const { Client } = require('pg');

const client = new Client({
  user: process.env.POSTGRESQL_USER,
  host: process.env.POSTGRESQL_SERVICE_HOST,
  database: process.env.POSTGRESQL_DATABASE,
  password: process.env.PGPASSWORD,
  port: POSTGRESQL_SERVICE_PORT,
});

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

exports.createWeekPlan = function createWeekPlan(entireTime) {
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

  client.connect();
  const text = 'UPDATE weekplan SET plan=$2 WHERE author=$1 RETURNING *';
  const values = ['Jule', JSON.stringify(weekSlots)];

  client.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(`Created weekplan for ${entireTime} hours!`);
      console.log(res.rows[0]);
    }
    client.end()
  });
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

exports.getDayPlan = function getDayPlan(numberOfSlots) {
  let currentWeekPlan;
  const query = {
    name: 'fetch-weekplan',
    text: 'SELECT * FROM weekplan WHERE author = $1',
    values: ['Jule']
  };

  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      if (!res.rows[0]) {
        console.warn("No weekplan set. Create one first by calling createWeekPlan(NUMBER_OF_HOURS_IN_WEEK).");
      }
      else {
        console.log(res.rows[0]);
      }
    }
  });

  // if (store.get("weekPlan")) {
  //   let prevWeekPlan = store.get("weekPlan");
  //   if (prevWeekPlan.length > 0) {
  //     currentWeekPlan = prevWeekPlan;
  //   }
  // }
  // if (!currentWeekPlan) {
  //   console.warn("No weekplan set. Create one first by calling createWeekPlan(NUMBER_OF_HOURS_IN_WEEK).");
  //   return;
  // }
  //
  // let result = [];
  // for (let i = 0; i < numberOfSlots; i++) {
  //   result.push(currentWeekPlan.shift());
  // }
  //
  // store.set("weekPlan", currentWeekPlan);
  //
  // return result;
};
