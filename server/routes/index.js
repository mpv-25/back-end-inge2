const express = require("express");
const app = express();

//Rutas
app.use(require("./usuario"));
app.use(require("./role"));

module.exports = app;
