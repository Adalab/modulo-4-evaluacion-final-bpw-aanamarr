CREATE DATABASE objetos_perdidos;

USE objetos_perdidos;

CREATE TABLE objetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    ubicacion VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    estado VARCHAR(20) NOT NULL,
    contacto VARCHAR(255) NOT NULL
);
