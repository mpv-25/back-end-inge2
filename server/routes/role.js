const express = require("express"); //Para poder utilizar el framework de express

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:4200/",
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

app.get("/role/:id", (req, res) => {
  let id = req.params.id;
  Role.findById(id).exec((err, roleBD) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({
      ok: true,
      role: roleBD,
    });
  });
});

app.post("/role", (req, res) => {
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let permisos = req.body.permisos;
  if (!nombre || !permisos || !descripcion) {
    return res.status(500).json({
      ok: false,
      message: "Complete todos los campos",
    });
  }
  const role = new Role({
    nombre,
    descripcion,
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
      role: roleBD,
    });
  });
});

app.put("/role/:id", (req, res) => {
  let id = req.params.id;
  let permisos = req.body.permisos;
  let descripcion = req.body.descripcion;
  let nombre = req.body.nombre;
  let update = {};
  if (permisos) {
    update["permisos"] = permisos;
  }
  if (nombre) {
    update["nombre"] = nombre;
  }
  if (descripcion) {
    update["descripcion"] = descripcion;
  }
  if (!permisos && !nombre && !descripcion) {
    return res.status(500).json({
      ok: false,
      message: "Todos los parametros estan en blanco",
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
      update: updateBD,
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
      delete: roleBD,
    });
  });
});

module.exports = app;
