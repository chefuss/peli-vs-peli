//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require('./controlador/controlador');
var controladorAdministrador = require('./controlador/controladorAdmin');

var app = express();

app.use(cors());
//
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//los parámetros son: ruta, manejo de datos, y vista.
//ponemos las menos específicas al inicio, luego las más específicas.
app.get('/competencias/:id/peliculas', controlador.controlador.obtenerCompetencia);
app.post('/competencias/:id/voto', controlador.controlador.guardarVotos);
app.get('/competencias/:id/resultados', controlador.controlador.mostrarResultados);

app.get('/competencias/:id', controlador.controladorDatos.competencias);
app.get('/generos', controlador.controladorDatos.generos);
app.get('/directores', controlador.controladorDatos.directores);
app.get('/actores', controlador.controladorDatos.actores);

app.get('/competencias', controlador.controlador.mostrarCompetencias);
app.post('/competencia', controladorAdministrador.controladorAdmin.crearCompetencia);
app.put('/competencias/:id/', controladorAdministrador.controladorAdmin.editarCompetencia);
app.delete('/competencias/:id/votos', controlador.controlador.eliminarVotos);
app.delete('/competencias/:id/', controladorAdministrador.controladorAdmin.eliminarCompetencia);



//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';


app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});
