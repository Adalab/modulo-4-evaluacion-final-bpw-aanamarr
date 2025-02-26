const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");

//crear servidor
const server = express();
require("dotenv").config();
console.log("Conectando base de datos:", process.env.DATABASE_NAME);

//configurar el servidor
server.use(cors());
server.use(express.json());

// conexión con MySQL

// Función para probar la conexión con la base de datos(BD)
async function getDBconnection() {
    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
    });
    await connection.connect();
    console.log("Conexión exitosa a la base de datos");
    return connection;
}
getDBconnection();

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


server.get('/objetos', async (req, res) => {
    try {
        const conn = await getDBconnection();
        const select = "SELECT * FROM objetos";  
        const [result] = await conn.query(select);

        res.status(200).json({
            info: { count: result.length }, // Número de elementos
            results: result, // Datos obtenidos
        });

        conn.end();  // Cierra la conexión después de usarla
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json(error);
    }
});

//Obtener objeto por su ID
server.get('/objetos/:id', async (req, res) => {
    try {
        const conn = await getDBconnection();
        //const id parametro de la URL
        const {id} = req.params;
        const selectId = 'SELECT * FROM objetos WHERE id = ? ';
        const [result] = await conn.query(selectId, [id]);
        conn.end();
        res.status(200).json(result[0]);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json(error);
    }
});


//Crear un objeto
server.post('/objetos', async (req, res) => {
    try {
        const conn = await getDBconnection();
        const { tipo, descripcion, ubicacion, fecha, estado, contacto } = req.body;
        console.log(tipo, descripcion, ubicacion, fecha, estado, contacto);//insertar objeto en BD
        const sqlInsert = `
            INSERT INTO objetos (tipo, descripcion, ubicacion, fecha, estado, contacto) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        //Ejecutar la consulta
        const [result] = await conn.query(sqlInsert, [tipo, descripcion, ubicacion, fecha, estado, contacto]);
        console.log(result);

        //Respuesta
        if (result) {//success
            res.status(201).json({
                success: true,
                message: "Objeto creado",
                id: result.insertId,
            });
        } else {//error
            res.status(400).json({ 
                success: false, 
                message: "Error al crear objeto" 
            });
        }
        //cerrar conexion
        conn.end();
    } catch (error) {
        console.error("Error al crear objeto:", error);
        res.status(500).json(error);
    }   
});

//Actualizar un objeto
server.put('/objetos/:id', async (req, res) => {
    const { id }= req.params;
    const { tipo, descripcion, ubicacion, fecha, estado, contacto } = req.body;

    try {
        const conn = await getDBconnection();
        const updateObjeto = `UPDATE objetos SET tipo = ?, descripcion = ?, ubicacion = ?, fecha = ?, estado = ?, contacto = ? WHERE id = ?`;
        const [result] = await conn.query(updateObjeto, [tipo, descripcion, ubicacion, fecha, estado, contacto, id]);
        //affectedRows: número de filas afectadas
        if (result.affectedRows > 0) {
            res.status(200).json({
                success: true,
                message: "Objeto actualizado",
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error al actualizar objeto",
            });
        }
        conn.end();
    } catch (error) {
        console.error("Error al actualizar objeto:", error);
        res.status(500).json(error);
    }
});

//Eliminar un objeto
server.delete('/objetos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const conn = await getDBconnection();
        const deleteObjeto = `DELETE FROM objetos WHERE id = ?`;
        const [result] = await conn.query(deleteObjeto, [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({
                success: true,
                message: "Objeto eliminado",
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error al eliminar objeto",
            });
        }
        conn.end();
    } catch (error) {
        console.error("Error al eliminar objeto:", error);
        res.status(500).json(error);
    }
});

//He intentado hacer el Registro y login de usuarios pero siempre me da error y no he podido solucionarlo
/*server.post('/registro', async (req, res) => {
    try {
        const conn = await getDBconnection();
        const { nombre, email, password } = req.body;

        // Verificar si el usuario ya existe
        const [existe] = await conn.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (existe.length > 0) {
            conn.end();
            return res.status(400).json({ success: false, message: "El email ya está registrado" });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insertar usuario BD
        const insertQuery = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
        const [result] = await conn.query(insertQuery, [nombre, email, hashedPassword]);

        conn.end();

        res.status(201).json({ 
            success: true, 
            message: "Usuario registrado exitosamente", 
            userId: result.insertId 
        });

    } catch (error) {
        console.error("Error no se ha podido registrar:", error);
        res.status(500).json(error);
    }
});*/