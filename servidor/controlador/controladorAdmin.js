var conexion = require('../lib/conexionbase');

var controladorAdmin = {
  crearCompetencia: function(req, res) {
    var nombreCompetencia = req.body.nombre;
    var generoCompetencia = (req.body.genero != '0') ? req.body.genero : null;
    var directorCompetencia =  (req.body.director != '0') ? req.body.director : null;
    var actorCompetencia = (req.body.actor != '0') ? req.body.actor : null;
    var sql = 'insert into competencia (nombre';
    var fieldsGenero = 'genero_id';
    var fieldsDirector = 'director_id';
    var fieldsActor = 'actor_id';
    var sqlValues = '"' + nombreCompetencia + '"';

    if (generoCompetencia !== null) {
      sql += ', ' + fieldsGenero;
      sqlValues += ', "' + generoCompetencia + '"';
    }
    if (directorCompetencia !== null) {
      sql += ', ' + fieldsDirector;
      sqlValues += ', "' + directorCompetencia + '"';
    }
    if (actorCompetencia !== null) {
      sql += ', ' + fieldsActor;
      sqlValues += ', "' + actorCompetencia + '"';
    }
    sql += ') values (' + sqlValues + ')';

    if(nombreCompetencia.length == ''){
		    return res.status(422).json('Debes colocar el nombre de la competencia');
	 }

    conexion.query(sql, function(err, result, fields) {
      if(err) {
        console.log('Hubo un error en la consulta, ' , err.message);
        return res.status(500).send('Hugo un error en la creación de la competencia');
      }
      //error de validacion
      res.json(result);
    })
  },
  eliminarCompetencia: function(req, res) {
    //una competencia queda guardada en la tabla competencias,
    //además en la tabla votos, tenemos guardada la relación a la competencia y la película.
    //tenemos que seleccionar todos los votos de la tabla voto que coincidan en comptentencia_id = idCompetencia;
    //luego tenemos que eliminar la competencia, de la tabla competencia, que tengan el idCompetencia;
    var idCompetencia = req.params.id;
    var sql = 'delete from voto where competencia_id = ' + idCompetencia;
    conexion.query(sql, function(err, result, fields) {

      if(err) {
        console.log('Hubo un error en la consulta, ' , err.message);
        return res.status(404).send('Hugo un error en el reinicio de la competencia');
      }

      var competenciaDelete = 'delete from competencia where competencia.id = "' + idCompetencia + '"';
      conexion.query(competenciaDelete, function(err, resultado, fields) {
        if(err) {
          console.log('Hubo un error en la consulta, ' , err.message);
          return res.status(404).send('Hugo un error en el reinicio de la competencia');
        }
        var response = {
          'resultado' : 'Competencia eliminada'
        }
        res.json(response);
      });
    });
  },
  editarCompetencia: function(req, res) {
    var idCompetencia = req.params.id;
    var nombreCompetencia = req.body.nombre;
    var sql = 'update competencia set nombre = "' + nombreCompetencia + '" where competencia.id = ' + idCompetencia;
    console.log(req.body);
    conexion.query(sql, function(err, result, fiedls){
      if(err) {
        console.log('Hubo un error en la consulta, ' , err.message);
        return res.status(404).send('Hugo un error en el reinicio de la competencia');
      }
      console.log(result);
      res.json(result);
    });
  }
}

module.exports =  {
  controladorAdmin : controladorAdmin
}
