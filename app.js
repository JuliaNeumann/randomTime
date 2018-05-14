const express = require("express");
const randomTime = require("./randomTime");
const app = express();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// Set up a URL route
app.get("/", function(req, res) {
  res.send("Welcome to randomtime!");
});

app.get("/weekplan/:hours", function(req, res) {
  if (parseInt(req.params.hours) <= 20) {
    randomTime.createWeekPlan(parseInt(req.params.hours));
    res.send(`Created weekplan for ${req.params.hours} hours!`);
    return;
  }
  res.send("");
});

app.get("/dayplan/:slots", function(req, res) {
  if (parseInt(req.params.slots) <= 40) {
    const dayPlan = randomTime.getDayPlan(parseInt(req.params.slots));
    if (dayPlan) {
      // let response = '';
      // dayPlan.forEach(function eachTask(task) {
      //   response += '0.5: ' + task + '<br />';
      // });
      res.send(dayPlan);
      return;
    }
    res.send('No weekplan set.');
    return;
  }
  res.send("");
});

// bind the app to listen for connections on a specified port
const port = process.env.PORT || 3000;
app.listen(port);

// Render some console log output
console.log("Listening on port " + port);