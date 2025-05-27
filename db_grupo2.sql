CREATE DATABASE db_grupo2;
USE db_grupo2;


CREATE TABLE usuarios (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(500) NOT NULL,
  contrasenia VARCHAR(200),
  fecha_de_nacimiento DATE,
  DNI INT UNSIGNED NOT NULL,
  foto_perfil TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO usuarios (title, contrasenia, fecha_de_nacimiento, DNI, foto_perfil)
VALUES ('emiliamernes@gmail.com','jagger','2000-12-02',42956902,'/images/fotoPerfil.jpg');
INSERT INTO usuarios (title, contrasenia, fecha_de_nacimiento, DNI, foto_perfil)
VALUES ('victoriawalton@gmail.com','flores','2002-10-22',42745902,'/images/fotoPerfil2.jpg');
INSERT INTO usuarios (title, contrasenia, fecha_de_nacimiento, DNI, foto_perfil)
VALUES ('onabeitia@gmail.com','caracol','2010-12-04',42956657,'/images/fotoPerfil3.jpg');
INSERT INTO usuarios (title, contrasenia, fecha_de_nacimiento, DNI, foto_perfil)
VALUES ('felichilo@gmail.com','pez','2005-11-24',42095657,'/images/fotoPerfil4.jpg');
INSERT INTO usuarios (title, contrasenia, fecha_de_nacimiento, DNI, foto_perfil)
VALUES ('orisabatini@gmail.com','estornudo','2000-07-07',42093857,'/images/fotoPerfil5.jpg');

CREATE TABLE productos (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT UNSIGNED NOT NULL,
  imagen_producto TEXT,
  nombre_producto VARCHAR(200),
  descripcion TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO productos (usuario_id, imagen_producto, nombre_producto, descripcion)
VALUES (1,'/images/products/anilloDoble.jpg','Anillo Doble','Anillo cubierto de oro, combinado con perlas naturales');
INSERT INTO productos (usuario_id, imagen_producto, nombre_producto, descripcion)
VALUES (1,'/images/products/anilloHeart.jpg','Anillo Heart','Anillo cubierto de oro, con corazoncitos ');
INSERT INTO productos (usuario_id, imagen_producto, nombre_producto, descripcion)
VALUES (2,'/images/products/aritosAmanfi.jpg','Aritos Amalfi','Aritos con perlas naturales');
INSERT INTO productos (usuario_id, imagen_producto, nombre_producto, descripcion)
VALUES (2,'/images/products/collarAmanfi.jpg','Collar Amalfi','Collar con perlas naturales, perfecto para combinar con el anillo doble y los aritos');
INSERT INTO productos (usuario_id, imagen_producto, nombre_producto, descripcion)
VALUES (3,'/images/products/collarHeart.jpg','Collar Heart','Collar cubierto de oro con un carazon');
INSERT INTO productos (usuario_id, imagen_producto, nombre_producto, descripcion)
VALUES (3,'/images/products/collarPearl.jpg','Collar Pearl','collar chunky con perlas y charms');
INSERT INTO productos (usuario_id, imagen_producto, nombre_producto, descripcion)
VALUES (4,'/images/products/collarRapunzel.jpg','Collar Rapunzel','Collar delicado con una flor al estilo rapunzel en el centro');
INSERT INTO productos (usuario_id, imagen_producto, nombre_producto, descripcion)
VALUES (4,'/images/products/comboAurora.jpg','Combo Aurora','Combo de anillos dorados como la princesa');
INSERT INTO productos (usuario_id, imagen_producto, nombre_producto, descripcion)
VALUES (5,'/images/products/comboGolden.jpg','Combo Golden','Set de collar y aros dorados con perlas');
INSERT INTO productos (usuario_id, imagen_producto, nombre_producto, descripcion)
VALUES (5,'/images/products/arosPearl.jpg','Aros Pearl','Aros de oro con perlas naturales');


CREATE TABLE comentarios (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT UNSIGNED NOT NULL,
  producto_id INT UNSIGNED NOT NULL,
  comentario TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (1,1,'¡Muy buen producto!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (4,1,'¡Muy lindo!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (3,1,'¡Muy brillante!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (3,2,'¡Perfecto!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (5,2,'¡Divino!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (5,3,'¡Ideal!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (2,3,'¡Me quedo perfecto!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (2,4,'¡Muy lindo para regalar!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (1,4,'¡Elegante!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (1,5,'¡Lindo!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (4,5,'¡Hermoso!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (3,5,'¡Muy fino!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (3,4,'¡Muy fino!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (1,3,'¡Muy fino!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (1,6,'¡Delicado!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (4,6,'¡Perfecto!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (2,6,'¡Lo amo!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (2,6,'¡Lo amo!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (5,7,'¡Perfecto regalo para san valentin!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (3,7,'¡Cool!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (3,8,'¡Cool!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (2,8,'¡Combinan perfecto!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (4,8,'¡Complemento ideal!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (4,9,'¡Complemento ideal!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (1,9,'!El mas lindo!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (2,9,'!Muy buena calidad!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (2,10,'!Muy buena calidad!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (5,10,'!Hermosos!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (3,10,'!Divinos!');
INSERT INTO comentarios (usuario_id, producto_id, comentario)
VALUES (3,2,'!Divinos!');

ALTER TABLE usuarios CHANGE COLUMN title email VARCHAR(500)




