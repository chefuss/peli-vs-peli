var conexion = require('../lib/conexionbase');

var controlador = {
  mostrarCompetencias: function(req, res) {
    var sql = 'select * from competencia';
    conexion.query(sql, function(err, result, fields) {
      if (err) {
        console.log('Hubo un error en la consulta, ' , err.message);
        return res.status(404).send('Hugo un error en la consulta');
      }
      res.send(JSON.stringify(result));
    });
  },
  obtenerCompetencia: function(req, res) {
    //seleccionamos una competencia de acuerdo al id pasado como parámetro.
    var id = req.params.id;
    var sql = 'select * from competencia where id= ' + id;

    conexion.query(sql, function(err, competenciaResult, fields) {
      //nuestra respuesta debe contener el nombre de la competencia.
      if(err) {
        console.log('Hubo un error en la consulta, ' , err.message);
        return res.status(404).send('Hugo un error en la consulta de competencia');
      }
      if (competenciaResult == undefined || competenciaResult.length == 0) {
        return res.status(404).send('Hugo un error en la consulta de competencia con ese id');
      }

      var peliculaGenero = competenciaResult[0].genero_id;
      var peliculaDirector = competenciaResult[0].director_id;
      var peliculaActor = competenciaResult[0].actor_id;

      var where = '';

      var peliculaQuery = 'select pelicula.id, pelicula.titulo, pelicula.poster from pelicula JOIN genero on pelicula.genero_id = genero.id JOIN director_pelicula on pelicula.id = director_pelicula.pelicula_id JOIN actor_pelicula on pelicula.id = actor_pelicula.pelicula_id WHERE 1 = 1';
      if (peliculaGenero) {
        where += ' AND pelicula.genero_id = "' + peliculaGenero + '"';
      }
      if (peliculaDirector) {
        where += ' AND director_pelicula.director_id = "' + peliculaDirector + '"';
      }
      if (peliculaActor) {
        where += ' AND actor_pelicula.actor_id = "' + peliculaActor + '"';
      }
      var queryOrderAndLimit = ' order by rand() limit 2';
      peliculaQuery += where + queryOrderAndLimit;

      conexion.query(peliculaQuery, function( err, peliculaResult, fields) {
        if(err) {
          console.log('Hubo un error en la consulta, ' , err.message);
          return res.status(404).send('Hugo un error en la consulta de pelicula');
        }
        //primero devolvemos el nombre de la competencia:
        var response = {
          'peliculas': peliculaResult,
          'competencia': competenciaResult[0].nombre
        }
        res.send(JSON.stringify(response));
      });

    });
},
  guardarVotos: function(req, res) {
    var idCompetencia = req.params.id;
    var pelicula = req.body;
    var idPelicula = pelicula.idPelicula;

    var sql = 'insert into voto (pelicula_id, competencia_id) values ("' + idPelicula + '", "' + idCompetencia + '")';

    conexion.query(sql, function(err, result, fields) {
      if(err) {
        console.log('Hubo un error en la consulta, ' , err.message);
        return res.status(404).send('Hugo un error en la consulta de pelicula');
      }
      res.json(result);
    })
  },
  mostrarResultados: function(req, res) {
    var idCompetencia = req.params.id;
    var sql = 'select pelicula_id, competencia_id, competencia.nombre, pelicula.titulo, pelicula.poster, pelicula.id, count(*) votos from voto join pelicula on voto.pelicula_id =  pelicula.id join competencia on voto.competencia_id = competencia.id where competencia_id = ' + idCompetencia + ' group by pelicula_id order by votos desc;'

    conexion.query(sql, function(err, result, fields) {
      if (result == '') {
        console.log('Esta competencia no tiene votos');
        return res.status(404).send('Esta competencia todavía no tiene votos!');
      }
      if(err) {
        console.log('Hubo un error en la consulta, ' , err.message);
        return res.status(404).send('Hugo un error en la consulta de pelicula');
      }
      var response = {
        'competencia' : result[0].nombre,
        'resultados': result
      }
      res.send(JSON.stringify(response));
    });
  },
  eliminarVotos: function(req, res) {

    var idCompetencia = req.params.id;
    var sql = 'delete from voto where competencia_id = ' + idCompetencia;

    conexion.query(sql, function(err, result, fiedls) {
      console.log(result);
      if(err) {
        console.log('Hubo un error en la consulta, ' , err.message);
        return res.status(404).send('Hugo un error en el reinicio de la competencia');
      }
      var response = {
        'resultado' : result
      }
      res.json(response);
    });
  }
}

var controladorDatos = {
  competencias: function(req, res) {
    var sql = 'select * from competencia';
    conexion.query(sql, function(err, result, fields) {
      if (err) {
        console.log('Hubo un error en la consulta, ' , err.message);
        return res.status(404).send('Hugo un error en la consulta');
      }
      res.send(JSON.stringify(result));
    });
  },
  generos: function(req, res) {
    var sql = 'select * from genero';
    conexion.query(sql, function(err, result, fields) {
      if (err) {
        console.log('Hubo un error en la consulta, ' , err.message);
        return res.status(404).send('Hugo un error en la consulta');
      }
      res.send(JSON.stringify(result));
    });
  },
  actores: function(req, res) {
    var sql = 'select * from actor';
    conexion.query(sql, function(err, result, fields) {
      if (err) {
        console.log('Hubo un error en la consulta, ' , err.message);
        return res.status(404).send('Hugo un error en la consulta');
      }
      res.send(JSON.stringify(result));
    });
  },
  directores: function(req, res) {
    var sql = 'select * from director';
    conexion.query(sql, function(err, result, fields) {
      if (err) {
        console.log('Hubo un error en la consulta, ' , err.message);
        return res.status(404).send('Hugo un error en la consulta');
      }
      res.send(JSON.stringify(result));
    });
  }
}

module.exports =  {
  controlador: controlador,
  controladorDatos: controladorDatos
}
