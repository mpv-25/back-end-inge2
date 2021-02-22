const mongoose = require("mongoose");
const uniqueValidator = require("underscore");

const Schema = mongoose.Schema;

const permisos = {
  values: [
    "crearRole",
    "crearUsuario",
    "asignarRol",
    "crearProyecto",
    "crearTareas",
    "agregarTareas",
    "crearLineaBase",
    "visualizarLineaBase",
  ],
  message: "{VALUE} no es un permiso válido",
};
const tipo = {
  values: ["SISTEMA", "PROYECTO"],
  message: "{VALUE} no es un permiso válido",
};

const roleSchema = Schema({
  tipo: {
    type: String,
    require: [true, "El tipo es obligatorio"],
    enum: tipo,
  },
  nombre: {
    type: String,
    unique: true,
    require: [true, "El nombre es obligatorio"],
  },
  permisos: {
    type: Array,
    require: false,
  },
});

roleSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });

module.exports = mongoose.model("Role", roleSchema);
