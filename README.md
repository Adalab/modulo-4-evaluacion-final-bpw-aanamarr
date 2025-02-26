# 📦 API de Objetos Perdidos

Esta es una API REST creada con **Node.js**, **Express** y **MySQL** para gestionar objetos perdidos.  
Permite realizar operaciones CRUD sobre los objetos y almacenar información relevante.

## Tecnologías utilizadas
- **Node.js** con **Express.js**  
- **MySQL** con `mysql2/promise`  
- **dotenv** para variables de entorno  
- **CORS** para seguridad  
- (Opcional) `bcryptjs` y `jsonwebtoken` para autenticación  

---

##  Instalación y configuración

### 1️Clonar el repositorio
```sh
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

Instalar dependencias
sh
Copiar
Editar
npm install
3️Configurar el archivo .env
Crea un archivo .env en la raíz del proyecto y agrega:

ini
Copiar
Editar
DATABASE_HOST=127.0.0.1
DATABASE_USER=root
DATABASE_PASSWORD=tu_contraseña
DATABASE_NAME=objetos_perdidos
DATABASE_PORT=3306
PORT=5000
JWT_SECRET=clave_secreta_para_tokens
(Asegúrate de cambiar tu_contraseña y clave_secreta_para_tokens por valores reales.)

4️Crear la base de datos en MySQL
Ejecuta en MySQL Workbench:

sql
Copiar
Editar
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
(Opcional) Si quieres agregar usuarios para autenticación, usa:

sql
Copiar
Editar
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
5️Iniciar el servidor
sh
Copiar
Editar
npm run dev
El servidor se ejecutará en:

arduino
Copiar
Editar
http://localhost:5000
 Uso de la API
1️ Obtener todos los objetos
GET /objetos
 Respuesta esperada:

json
Copiar
Editar
{
  "info": { "count": 2 },
  "results": [
    {
      "id": 1,
      "tipo": "Celular",
      "descripcion": "iPhone 13 negro con funda roja",
      "ubicacion": "Parque Central",
      "fecha": "2025-02-26",
      "estado": "Perdido",
      "contacto": "correo@example.com"
    }
  ]
}
2️ Obtener un objeto por ID
GET /objetos/:id
 Ejemplo: GET http://localhost:5000/objetos/1
 Respuesta esperada (si el objeto existe):

json
Copiar
Editar
{
  "id": 1,
  "tipo": "Celular",
  "descripcion": "iPhone 13 negro con funda roja",
  "ubicacion": "Parque Central",
  "fecha": "2025-02-26",
  "estado": "Perdido",
  "contacto": "correo@example.com"
}
 Si el objeto no existe, devuelve:

json
Copiar
Editar
{
  "success": false,
  "message": "Objeto no encontrado"
}
3️ Insertar un objeto
POST /objetos
 Body (JSON):
 {
  "tipo": "Mochila",
  "descripcion": "Mochila negra con laptop",
  "ubicacion": "Biblioteca",
  "fecha": "2025-03-10",
  "estado": "Perdido",
  "contacto": "usuario@email.com"
}
Respuesta:
{
  "success": true,
  "message": "Objeto creado",
  "id": 3
}
Actualizar un objeto
PUT /objetos/:id
📌 Ejemplo: PUT http://localhost:5000/objetos/1
📌 Body (JSON):

json
Copiar
Editar
{
  "tipo": "Celular",
  "descripcion": "iPhone 13 negro con funda azul",
  "ubicacion": "Centro Comercial",
  "fecha": "2025-02-26",
  "estado": "Encontrado",
  "contacto": "nuevo-correo@example.com"
}
📌 Respuesta esperada:

json
Copiar
Editar
{
  "success": true,
  "message": "Objeto actualizado"
}
5️Eliminar un objeto
DELETE /objetos/:id
Ejemplo: DELETE http://localhost:5000/objetos/1
 Respuesta esperada:

json
Copiar
Editar
{
  "success": true,
  "message": "Objeto eliminado"
}

