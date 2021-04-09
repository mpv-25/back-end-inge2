const express = require("express");
const app = express();

//Rutas
app.use(require("./usuario"));
app.use(require("./role"));
app.use(require("./proyecto"));
app.use(require("./tarea"));

module.exports = app;
