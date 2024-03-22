const express = require('express');
const prestigeRoute = require('./prestige/prestige');
const couristanRoute = require('./couristan/couristan');
const fibreRoute = require('./fibre/fibre');
const kayaRoute = require('./kaya/kaya');
const bloomsburgRoute = require('./bloomsburg/bloomsburg');
const harcourtRoute = require('./harcourt/harcourt');
const nourisonRoute = require('./nourison/nourison');

const app = express();
app.use("/prestige",prestigeRoute);
app.use("/couristan",couristanRoute)
app.use("/fibreworks",fibreRoute)
app.use("/kaya",kayaRoute)
app.use("/bloomsburg",bloomsburgRoute)
app.use("/harcourt",harcourtRoute)
app.use("/nourison",nourisonRoute)
module.exports = app;


