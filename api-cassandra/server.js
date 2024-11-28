const express = require('express');
const { connect, client } = require('./config/cassandra'); // Importa la función connect y el cliente de Cassandra
const { v4: uuidv4 } = require('uuid'); // Para generar UUIDs para nuevos usuarios

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON

// Conectar a Cassandra
connect();

// Endpoint para la ruta raíz
app.get('/', (req, res) => {
  res.send('¡API de Cassandra funcionando!');
});

// 1. Ver todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Error al obtener usuarios.");
  }
});

// 2. Ver un usuario por ID
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';

  try {
    const result = await client.execute(query, [userId], { prepare: true });
    if (result.rowLength === 0) {
      res.status(404).send("Usuario no encontrado.");
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    res.status(500).send("Error al obtener usuario.");
  }
});

// 3. Agregar un nuevo usuario
app.post('/users', async (req, res) => {
  const { name } = req.body;
  const id = uuidv4();
  const query = 'INSERT INTO users (id, name) VALUES (?, ?)';

  try {
    await client.execute(query, [id, name], { prepare: true });
    res.status(201).json({ id, name });
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    res.status(500).send("Error al agregar usuario.");
  }
});

// 4. Actualizar un usuario por ID
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;
  const query = 'UPDATE users SET name = ? WHERE id = ?';

  try {
    await client.execute(query, [name, userId], { prepare: true });
    res.send("Usuario actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).send("Error al actualizar usuario.");
  }
});

// 5. Eliminar un usuario por ID
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM users WHERE id = ?';

  try {
    await client.execute(query, [userId], { prepare: true });
    res.send("Usuario eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).send("Error al eliminar usuario.");
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
