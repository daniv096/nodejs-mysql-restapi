CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee (
   id INT(11) NOT NULL AUTO_INCREMENT,
   name VARCHAR(45) DEFAULT NULL,
   salary INT(5) DEFAULT NULL,
   PRIMARY KEY(id)
);

DESCRIBE employee;

INSERT INTO employee VALUES 
(1, 'JOHN', 1000 ),
(2, 'PETER', 2000),
(3, 'MARY', 3000),
(4, 'JONE', 4000);

CREATE TABLE `xp_usuarios` (
  `usu_codigo` varchar(10) DEFAULT NULL,
  `usu_cedula` varchar(8) DEFAULT NULL,
  `usu_nombre` varchar(45) DEFAULT NULL,
  `usu_apellido` varchar(45) DEFAULT NULL,
  `usu_correo` varchar(0) DEFAULT NULL,
  `usu_clave` varchar(45) DEFAULT NULL,
  `usu_fchinc` date DEFAULT NULL,
  `usu_hash` blob,
  `usu_hashcedula` blob,
  `usu_hashfoto` blob,
  `usu_telefono` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`usu_codigo`),
  UNIQUE KEY `usu_codigo_UNIQUE` (`usu_codigo`),
  UNIQUE KEY `usu_cedula_UNIQUE` (`usu_cedula`)
) 

7EHAALSS8XD2C3Q1GLXVXM2G tokrn de rec twillo