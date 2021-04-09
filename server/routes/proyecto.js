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
  let tareas = body.tareas;

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
    tareas,
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

app.put("/proyecto/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let update = {
    nombre: body.nombre,
    gerente: body.gerente,
    descripcion: body.descripcion,
    tareas: body.tareas,
  };
  Proyecto.findByIdAndUpdate(
    id,
    update,
    { new: true },
    (err, proyectoUpdate) => {
      if (err) {
        return res.status(500).json({
          ok: true,
          err,
        });
      }
      res.status(200).json({
        ok: true,
        proyecto: proyectoUpdate,
      });
    }
  );
});

module.exports = app;
