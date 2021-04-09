const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const estados = {
  values: ["iniciado", "pendiente", "finalizado"],
  message: "{VALUE} No es un estado valido",
};
const tareaHijo = {
  type: Schema.Types.ObjectId,
  ref: "Tarea",
};

const tareaSchema = Schema({
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
    type: Schema.Types.ObjectId,
    ref: "Tarea",
    required: false,
  },
  id_tarea_hijos: [tareaHijo],
});

module.exports = mongoose.model("Tarea", tareaSchema);
