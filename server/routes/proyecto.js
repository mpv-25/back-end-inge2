const express = require("express");
const cors = require("cors");
const Proyecto = require("../models/proyecto");
const app = express();
app.use(cors());

app.get("/proyectos", (req, res) => {
  Proyecto.find().exec((err, proyectoBD) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({
      ok: true,
      proyectos: proyectoBD,
    });
  });
});

app.post("/proyecto", (req, res) => {
  let body = req.body;
  let nombre = body.nombre;
  let gerente = body.gerente;
  let descripcion = body.descripcion;
  if (!nombre || !gerente || !descripcion) {
    return res.status(500).json({
      ok: false,
      err: {
        message: "Todos los parametros son obligatorios",
      },
    });
  }
  let proyecto = new Proyecto({
    nombre,
    gerente,
    descripcion,
  });
  proyecto.save((err, proyectoBD) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({
      ok: true,
      proyecto: proyectoBD,
    });
  });
});

module.exports = app;
