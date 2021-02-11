/*
=======================
El puerto en donde corre el servidor
=======================
*/
process.env.PORT = process.env.PORT || 3000;
/*
=======================
TOKEN
=======================
*/
process.env.SEED = process.env.SEED || "INGE2-matias-pinto";
process.env.CADUCIDAD_TOKEN = "3h";

/*
=======================
Conexion a la BD
=======================
*/
process.env.URLBD =
  "mongodb+srv://alumnos-inge2:inge2FPUNA@2021@cluster0.mmyol.mongodb.net/BDinge2?retryWrites=true&w=majority";
