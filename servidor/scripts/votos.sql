DROP TABLE IF EXISTS `voto`;

CREATE TABLE voto (
  id INT NOT NULL AUTO_INCREMENT,
  pelicula_id int(11) unsigned NOT NULL,
  competencia_id INT NOT NULL,
  FOREIGN KEY (pelicula_id) REFERENCES pelicula(id),
  FOREIGN KEY (competencia_id) REFERENCES competencia(id),
  PRIMARY KEY (id)
);
