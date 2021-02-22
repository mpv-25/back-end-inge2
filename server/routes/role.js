const express = require("express"); //Para poder utilizar el framework de express

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:4200/login",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const Role = require("../models/role");
const app = express(); //El objeto de express()

app.use(cors());

app.get("/roles", (req, res) => {
  Role.find().exec((err, rolesBD) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({
      ok: true,
      roles: rolesBD,
    });
  });
});

app.post("/role", (req, res) => {
  let tipo = req.body.tipo;
  let nombre = req.body.nombre;
  let permisos = req.body.permisos;
  if (!tipo || !nombre || !permisos) {
    return res.status(500).json({
      ok: false,
      message: "Complete todos los campos",
      tipo,
      nombre,
      permisos,
    });
  }
  const role = new Role({
    tipo,
    nombre,
    permisos,
  });
  role.save((err, roleBD) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.status(200).json({
      ok: true,
      Role: roleBD,
    });
  });
});

app.put("/role/:id", (req, res) => {
  let id = req.params.id;
  let permisos = req.body.permisos;
  let nombre = req.body.nombre;
  let update = {};
  if (permisos) {
    update["permisos"] = permisos;
  }
  if (nombre) {
    update["nombre"] = nombre;
  }
  if (!permisos && !nombre) {
    return res.status(500).json({
      ok: false,
      message: "permisos y nombre en blanco",
    });
  }

  Role.findByIdAndUpdate(id, update, { new: true }, (err, updateBD) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.status(200).json({
      ok: true,
      updateBD,
    });
  });
});

app.delete("/role/:id", (req, res) => {
  let id = req.params.id;
  Role.findByIdAndDelete(id, (err, roleBD) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({
      ok: true,
      message: "Role Eliminado",
      roleBD,
    });
  });
});

module.exports = app;
