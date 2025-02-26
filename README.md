# 📦 API de Objetos Perdidos

Esta es una API REST creada con **Node.js**, **Express** y **MySQL** para gestionar objetos perdidos.  
Permite realizar operaciones CRUD sobre los objetos y almacenar información relevante.

## Tecnologías utilizadas
- **Node.js** con **Express.js**  
- **MySQL** con `mysql2/promise`  
- **dotenv** para variables de entorno  
- **CORS** para seguridad  
- (Opcional) `bcryptjs` y `jsonwebtoken` para autenticación  

## Instalación y configuración

### 1. Clonar el repositorio
```sh
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2. Instalar dependencias
```sh
npm install
```

### 3. Configurar el archivo .env
Crea un archivo `.env` en la raíz del proyecto y agrega:
```ini
DATABASE_HOST=127.0.0.1
DATABASE_USER=root
DATABASE_PASSWORD=tu_contraseña
DATABASE_NAME=objetos_perdidos
DATABASE_PORT=3306
PORT=5000
JWT_SECRET=clave_secreta_para_tokens
```
(Asegúrate de cambiar `tu_contraseña` y `clave_secreta_para_tokens` por valores reales.)

### 4. Crear la base de datos en MySQL
Ejecuta en MySQL Workbench:
```sql
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
```

### 5. Iniciar el servidor
```sh
npm run dev
```
El servidor se ejecutará en:
```
http://localhost:5000
```

## Uso de la API

### 1. Obtener todos los objetos
**GET /objetos**
```json
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
```

### 2. Obtener un objeto por ID
**GET /objetos/:id**
Ejemplo: `GET http://localhost:5000/objetos/1`
```json
{
  "id": 1,
  "tipo": "Celular",
  "descripcion": "iPhone 13 negro con funda roja",
  "ubicacion": "Parque Central",
  "fecha": "2025-02-26",
  "estado": "Perdido",
  "contacto": "correo@example.com"
}
```
Si el objeto no existe, devuelve:
```json
{
  "success": false,
  "message": "Objeto no encontrado"
}
```

### 3. Insertar un objeto
**POST /objetos**
Body (JSON):
```json
{
  "tipo": "Mochila",
  "descripcion": "Mochila negra con laptop",
  "ubicacion": "Biblioteca",
  "fecha": "2025-03-10",
  "estado": "Perdido",
  "contacto": "usuario@email.com"
}
```
Respuesta:
```json
{
  "success": true,
  "message": "Objeto creado",
  "id": 3
}
```

### 4. Actualizar un objeto
**PUT /objetos/:id**
Ejemplo: `PUT http://localhost:5000/objetos/1`
Body (JSON):
```json
{
  "tipo": "Celular",
  "descripcion": "iPhone 13 negro con funda azul",
  "ubicacion": "Centro Comercial",
  "fecha": "2025-02-26",
  "estado": "Encontrado",
  "contacto": "nuevo-correo@example.com"
}
```
Respuesta esperada:
```json
{
  "success": true,
  "message": "Objeto actualizado"
}
```

### 5. Eliminar un objeto
**DELETE /objetos/:id**
Ejemplo: `DELETE http://localhost:5000/objetos/1`
Respuesta esperada:
```json
{
  "success": true,
  "message": "Objeto eliminado"
}
```

## API

### Endpoints

- `GET /objetos`: Obtener todos los objetos
- `GET /objetos/:id`: Obtener un objeto por ID
- `POST /objetos`: Crear un nuevo objeto
- `PUT /objetos/:id`: Actualizar un objeto
- `DELETE /objetos/:id`: Eliminar un objeto

### Parámetros de solicitud

- `tipo`: Tipo del objeto (requerido)
- `descripcion`: Descripción del objeto
- `ubicacion`: Ubicación donde se perdió el objeto (requerido)
- `fecha`: Fecha en que se perdió el objeto (requerido)
- `estado`: Estado del objeto (requerido)
- `contacto`: Información de contacto (requerido)

### Respuestas

- `200 OK`: Operación exitosa
- `201 Created`: Objeto creado
- `400 Bad Request`: Error en la solicitud
- `404 Not Found`: Objeto no encontrado
- `500 Internal Server Error`: Error del servidor

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama con tu funcionalidad: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza los cambios y commits necesarios.
4. Envía tus cambios a tu fork: `git push origin feature/nueva-funcionalidad`.
5. Crea un nuevo pull request en el repositorio original.

## Licencia

Este proyecto se encuentra bajo la licencia [MIT](LICENSE).

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```sh
npm test
```

Asegúrate de tener la base de datos configurada correctamente antes de ejecutar las pruebas.
