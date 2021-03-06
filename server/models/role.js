const mongoose = require("mongoose");
const uniqueValidator = require("underscore");

const Schema = mongoose.Schema;

const roleSchema = Schema({
  nombre: {
    type: String,
    unique: true,
    require: [true, "El nombre es obligatorio"],
  },
  descripcion: {
    type:String,
    require: [true, 'La descripción es obligatoria'],
  },
  permisos: {
    type: Array,
    require: [true, "El rol debe tener por lo menos un permiso"],
  },
});

roleSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });

module.exports = mongoose.model("Role", roleSchema);
