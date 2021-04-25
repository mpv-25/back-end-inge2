const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const estados = {
  values: ["iniciado", "pendiente", "finalizado"],
  message: "{VALUE} No es un estado valido",
};

const tarea = {
  titulo: {
    type: String,
    require: [true, "La tarea es obligatoria"],
  },
  estado: {
    type: String,
    required: [true, "El estado es obligatorio"],
    enum: estados,
  },
  lineaBase: {
    type: Number,
    require: [true, "Es obligatorio saber si una tarea esta en línea base"],
    default: 0,
  },
  version: {
    type: Number,
    require: [true, "El estado es obligatorio"],
    default: 1,
  },
  descripcion: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  id_tarea_padre: {
    type: String,
    require: false,
  },
  id_tareas_hijos: [],
};

const lineaBase = {
  lineaBase: {
    type: Number,
    require: [true, "El número de línea base es obligatorio"],
  },
  descripcion: {
    type: String,
    require: [true, "La descripción de la línea base es obligatoria"],
  },
  abierto: {
    type: Boolean,
    require: [
      true,
      "Indicar que la línea base esta abierto o no es obligatoria",
    ],
    default: true,
  },
  tareas: [tarea],
};

const proyectoSchema = Schema({
  nombre: {
    type: String,
    requiere: [true, "El nombre del proyecto es obligatorio"],
    unique: true,
  },
  descripcion: {
    type: String,
    require: [true, "La descripción del proyecto es obligatoria"],
  },
  tareas: [tarea],
  lineasBase: [lineaBase],
});

proyectoSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });

module.exports = mongoose.model("Proyecto", proyectoSchema);
