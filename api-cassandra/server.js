const express = require('express');
const { connect, client } = require('./config/cassandra'); // Importa la función connect y el cliente de Cassandra

const app = express();
const PORT = 3000;

app.use(express.json());

// Conecta a Cassandra
connect();

// Define un endpoint para la ruta raíz
app.get('/', (req, res) => {
  res.send('¡API de Cassandra funcionando!'); // Respuesta simple para la ruta raíz
});

// Define un endpoint para obtener usuarios
app.get('/users', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM users'); // Obtén todos los usuarios de la tabla
    res.json(result.rows); // Devuelve los usuarios como respuesta en formato JSON
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Error al obtener usuarios.");
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
