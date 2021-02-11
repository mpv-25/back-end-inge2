require("./config/config"); //de esta forma podemos usar las variables de entorno
//para crear path absolutos es propio de Node
const path = require("path");

const express = require("express"); // Importamos express para poder utilizarlo
const app = express(); //Creamos el objeto de express

const mongoose = require("mongoose"); // para poder conectarnos a la BD de mongoDB

const bodyParser = require("body-parser"); //Utilizamos el body parser para poder utilizar req.body

// Middleware del body-parser
/*
El módulo npm body-parser permite realizar esta tarea. No es necesario programarla. 
Solo se requiere instalar body-parser y habilitar json() así como url-encode como middlewares para convertir datos a JSON.
*/
app.use(bodyParser.json()); // para poder enviar objetos JSON en el body

app.use(bodyParser.urlencoded({ extended: false }));

//Rutas
app.use(require("./routes/index"));

//Habilitar carpeta public
app.use(express.static(path.resolve(__dirname, "../public")));
//Si entra a un url que no seaa el principal lo redirecciona
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//Conexion a la BD MongoseDB
mongoose.connect(
  process.env.URLBD,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, res) => {
    if (err) throw new err();

    console.log("Conectado a la Base de Datos de proyecto de Inge2");
  }
);

//Indicamos a expres el puerto donde va correr
app.listen(process.env.PORT, (err, res) => {
  if (err) throw new err();

  console.log("el servidor esta corridendo en el puerto: ", process.env.PORT);
});
