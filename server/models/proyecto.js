const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const proyectoSchema = Schema({
  nombre: {
    type: String,
    requiere: [true, "El nombre del proyecto es obligatorio"],
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
});

proyectoSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });

module.exports = mongoose.model("Proyecto", proyectoSchema);
