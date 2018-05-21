const store = require('json-fs-store')();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const config = {
  slotLength: 0.5,
  activities: [
    {
      name: 'Programmieren Lernen',
      minAmount: 0.25,
    },
    {
      name: 'LKG Website',
      minAmount: 0.25,
    },
    {
      name: 'Frei',
      minAmount: 0.25,
    },
  ],
};

exports.createWeekPlan = function createWeekPlan(entireTime, callback) {
  const numberOfSlots = entireTime / config.slotLength;
  const weekSlots = [];
  config.activities.forEach((activity) => {
    const minNumberOfSlots = Math.floor(numberOfSlots * activity.minAmount);
    for (let i = 0; i < minNumberOfSlots; i++) {
      weekSlots.push(activity.name);
    }
  });

  for (let i = weekSlots.length; i < numberOfSlots; i++) {
    weekSlots.push(config.activities[getRandomInt(0, config.activities.length - 1)].name);
  }

  shuffleArray(weekSlots);

  const weekPlan = {
    id: 'weekPlan',
    weekSlots,
  };

  store.add(weekPlan, (err) => {
    if (err) console.log(err);
    else callback();
  });
};

exports.getDayPlan = function getDayPlan(numberOfSlots, callback) {
  store.load('weekPlan', (err, object) => {
    if (err || object.weekSlots.length === 0) {
      console.warn('No weekplan set. Create one first by calling createWeekPlan(NUMBER_OF_HOURS_IN_WEEK).');
      return;
    }

    const currentWeekSlots = object.weekSlots;

    const result = [];
    for (let i = 0; i < numberOfSlots; i++) {
      result.push(currentWeekSlots.shift());
    }

    store.add({
      id: 'weekPlan',
      weekSlots: currentWeekSlots,
    });

    callback(result);
  });
};
