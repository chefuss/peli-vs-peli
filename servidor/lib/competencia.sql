DROP TABLE IF EXISTS `competencia`;

CREATE TABLE `competencia` (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50),
  PRIMARY KEY (id)
);

INSERT INTO `competencia` VALUES (1, '¿Cuál es la mejor película?'), (2, '¿Qué drama te hizo llorar más?'), (3, '¿Qué drama te hizo llorar más?'), (4, '¿Qué película tiene el actor más lindo?');
