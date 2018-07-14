const db = require("./db");

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
    },
    {
      name: "Eigene Programmierprojekte",
      minAmount: 0.25
    }
  ]
};
exports.config = config;

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

  await db.storeWeekplan(weekSlots, 'Jule');
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

exports.getDayPlan = async function getDayPlan(numberOfHours) {
  let numberOfSlots = numberOfHours * 2;

  try {
    const currentWeekPlan = await db.retrieveWeekplan('Jule');

    if (!currentWeekPlan.length) {
      console.warn("No weekplan set. Create one first by calling createWeekPlan(NUMBER_OF_HOURS_IN_WEEK).");
      return;
    }

    let result = [];
    for (let i = 0; i < numberOfSlots; i++) {
      result.push(currentWeekPlan.shift());
    }

    await db.storeWeekplan(currentWeekPlan, 'Jule');

    return result;

  } catch(err) {

    return false;

  }
};
