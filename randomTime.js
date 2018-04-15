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

function createWeekPlan(entireTime) {
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

  localStorage.setItem("weekPlan", JSON.stringify(weekSlots));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getDayPlan(timeInHours) {
  let currentWeekPlan;
  if (localStorage.getItem("weekPlan")) {
    let prevWeekPlan = JSON.parse(localStorage.getItem("weekPlan"));
    if (prevWeekPlan.length > 0) {
      currentWeekPlan = prevWeekPlan;
    }
  }
  if (!currentWeekPlan) {
    console.warn("No weekplan set. Create one first by calling createWeekPlan(NUMBER_OF_HOURS_IN_WEEK).");
    return;
  }

  for (let i = 0; i < (timeInHours / config.slotLength); i++) {
    console.log(`${config.slotLength}: ${currentWeekPlan.shift()}`);
  }

  localStorage.setItem("weekPlan", JSON.stringify(currentWeekPlan));
}
