const express = require("express");
const app = express();

//Rutas
app.use(require("./usuario"));

module.exports = app;
