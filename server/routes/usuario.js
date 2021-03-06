const express = require("express"); //Para poder utilizar el framework de express

const bcrypt = require("bcrypt"); //Para poder encriptar el password

const _ = require("underscore"); //Para poder filtrar los elementos de un objeto

const jwt = require("jsonwebtoken"); // Importamos jwt para poder crear Json Web Tokens

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:4200/login",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express(); //El objeto de express()

app.use(cors());

const Usuario = require("../models/usuario"); // Para poder usar el Schema de mongoose

app.post("/login", (req, res) => {
  let body = req.body;
  let condicion = {
    email: body.email,
  };
  Usuario.findOne(condicion, (err, usuarioBD) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!usuarioBD) {
      return res.status(400).json({
        ok: false,
        message: "Usuario o Contraseña incorrecta",
      });
    }
    if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
      return res.status(400).json({
        ok: false,
        ingresado: body.password,
        password: usuarioBD.password,
        message: "Usuario o Contraseña incorrecta",
      });
    }
    let token = jwt.sign(
      {
        usuarioBD,
      },
      process.env.SEED,
      { expiresIn: process.env.CADUCIDAD_TOKEN }
    );

    res.json({
      ok: true,
      usuario: usuarioBD,
      token,
    });
  });
});

app.post("/usuario", (req, res) => {
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    apellido: body.apellido,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    img: body.img,
    role: body.role,
  });
  usuario.save((err, usuarioBD) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      usuario: usuarioBD,
    });
  });
});
app.get("/usuarios", (req, res) => {
  let condicion = {
    estado: true,
  };
  let desde = req.query.desde || 0;
  desde = Number(desde);
  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find()
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      Usuario.countDocuments(condicion, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          totalUsuarios: conteo,
        });
      });
    });
});
app.put("/usuario/role/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["role"]);
  Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioUpdate) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!usuarioUpdate) {
      return res.status(500).json({
        ok: false,
        err: {
          message: "El usuario no existe",
        },
      });
    }
    res.status(200).json({
      ok: true,
      usuario: usuarioUpdate,
    });
  });
});
app.put("/usuario/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, [
    "nombre",
    "apellido",
    "email",
    "role",
    "img",
    "estado",
  ]); //la funcion pick de undercore, permite filtrar solo las propiedades que quiero del objeto

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioUpdate) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    if (!usuarioUpdate) {
      return res.status(500).json({
        ok: false,
        err: {
          message: "El usuario no existe",
        },
      });
    }
    res.json({
      ok: true,
      message: "Usuario Actualizado",
      usuario: usuarioUpdate,
    });
  });
});
app.delete("/usuario/:id", (req, res) => {
  let id = req.params.id;
  Usuario.findByIdAndDelete(id, (err, usuario) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({
      ok: true,
      eliminado: usuario,
    });
  });
});

module.exports = app;
