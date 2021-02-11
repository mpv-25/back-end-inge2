const mongoose = require("mongoose"); // importar mongoose
const uniqueValidator = require("mongoose-unique-validator"); // importar uniqueValidator para validar valores unicos

let Schema = mongoose.Schema; // crear esquema

let rolesValidos = {
  values: ["ADMIN_ROLE"],
  message: "{VALUE} no es un rol válido",
};

//Creamos el objeto Schema con todas sus propiedades

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  apellido: {
    type: String,
    require: [true, "El apellido es obligatorio"],
  },
  email: {
    type: String,
    unique: true,
    require: [true, "El email es obligatorio"],
  },
  password: {
    type: String,
    require: [true, "El password es obligatorio"],
  },
  img: {
    type: String,
    require: false,
  },
  role: {
    type: String,
    default: "ADMIN_ROLE",
    enum: rolesValidos,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

//Eliminamos el password del JSON, de esta forma cuando se consulte el modelo el password nunca sera visible
usuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });

module.exports = mongoose.model("Usuario", usuarioSchema);
