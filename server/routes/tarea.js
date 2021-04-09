const express = require("express");

const cors = require("cors");

const Tarea = require("../models/tarea");

const app = express();

app.use(cors());

app.get("/tareas", (req, res) => {
  Tarea.find().exec((err, tareasBD) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      tareas: tareasBD,
    });
  });
});

app.post("/tarea", (req, res) => {
  let body = req.body;
  let titulo = body.titulo;
  let estado = body.estado;
  let descripcion = body.descripcion;
  let id_tarea_padre = body.id_tarea_padre;
  let id_tarea_hijos = [];
  const tarea = new Tarea({
    titulo,
    estado,
    descripcion,
    id_tarea_padre,
  });
  tarea.save((err, tareaBD) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (id_tarea_padre) {
      console.log(id_tarea_padre);
      Tarea.findById(id_tarea_padre, (err, tareaPadreBD) => {
        if (tareaPadreBD.id_tarea_hijos.length > 0) {
          id_tarea_hijos = [...tareaPadreBD.id_tarea_hijos, tareaBD._id];
        } else {
          id_tarea_hijos = [tareaBD._id];
        }
        let update = { id_tarea_hijos };
        Tarea.findByIdAndUpdate(
          id_tarea_padre,
          update,
          { new: true },
          (err, updatePadre) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                err,
              });
            }
            return res.json({
              ok: true,
              tarea: tareaBD,
            });
          }
        );
      });
    } else {
      return res.json({
        ok: true,
        tarea: tareaBD,
      });
    }
  });
});

app.put("/tarea/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let titulo = body.titulo;
  let descripcion = body.descripcion;
  let estado = body.estado;
  let id_tarea_padre = body.id_tarea_padre;
  let id_tarea_hijos = body.id_tarea_hijos;
  let update = {
    titulo,
    descripcion,
    estado,
    id_tarea_padre,
    id_tarea_hijos,
  };
  Tarea.findByIdAndUpdate(id, update, { new: true }, (err, tareaUpdate) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({
      ok: true,
      tarea: tareaUpdate,
    });
  });
});

module.exports = app;
