const db = require("./db");
const configService = require("./config");

exports.createWeekPlan = async function createWeekPlan(entireTime, user) {
  const config = await configService.getConfig(user);
  const numberOfSlots = entireTime / parseFloat(config.slotLength);
  const weekSlots = [];
  config.activities.forEach((activity) => {
    if (activity.minAmount && !isNaN(activity.minAmount)) {
      let minNumberOfSlots = Math.floor(numberOfSlots * parseFloat(activity.minAmount));
      for (let i = 0; i < minNumberOfSlots; i++) {
        weekSlots.push(activity.name);
      }
    }
  });

  for (let i = weekSlots.length; i < numberOfSlots; i++) {
    weekSlots.push(config.activities[getRandomInt(0, config.activities.length - 1)].name);
  }

  shuffleArray(weekSlots);

  await db.storeWeekplan(weekSlots, user);
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

exports.getDayPlan = async function getDayPlan(numberOfHours, user) {
  const config = await configService.getConfig(user);
  let numberOfSlots = numberOfHours * (1 / parseFloat(config.slotLength));

  try {
    const currentWeekPlan = await db.retrieveWeekplan(user);

    if (!currentWeekPlan.length) {
      console.warn("No weekplan set. Create one first by calling createWeekPlan(NUMBER_OF_HOURS_IN_WEEK).");
      return;
    }

    let result = [];
    for (let i = 0; i < numberOfSlots; i++) {
      result.push(currentWeekPlan.shift());
    }

    await db.storeWeekplan(currentWeekPlan, user);

    return result;

  } catch(err) {

    return false;

  }
};
