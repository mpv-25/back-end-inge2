const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const estados = {
  values: ["iniciado", "pendiente", "finalizado"],
  message: "{VALUE} No es un estado valido",
};

const tarea = {
  id:{
    type:Number,
    require:[true, "El id es obligatorio"]
  },
  titulo: {
    type: String,
    require: [true, "La tarea es obligatoria"],
  },
  estado: {
    type: String,
    required: [true, "El estado es obligatorio"],
    enum: estados,
  },
  descripcion: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  id_tarea_padre: {
    type: Number,
    require:false,
  },
  id_tareas_hijos: [],
};

const proyectoSchema = Schema({
  nombre: {
    type: String,
    requiere: [true, "El nombre del proyecto es obligatorio"],
    unique: true,
  },
  gerente: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: [true, "El gerente de proyecto es obligatorio"],
  },
  descripcion: {
    type: String,
    require: [true, "La descripción del proyecto es obligatoria"],
  },
  tareas: [tarea],
});

proyectoSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });

module.exports = mongoose.model("Proyecto", proyectoSchema);
