const mongoose = require('mongoose');
const User = require('./models/User');  // Asegúrate de que la ruta al modelo es correcta

// Conexión a MongoDB
mongoose.connect('mongodb+srv://PruebaCluster:LX8PEJM389NDAH92RQDH22JR@shippings.vd57m.mongodb.net/?retryWrites=true&w=majority&appName=shippings', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado a MongoDB');

    // Función para generar usuarios aleatorios (puedes personalizar los datos)
    const generateUsers = (num) => {
      const users = [];
      for (let i = 0; i < num; i++) {
        users.push({
          name: `Usuario ${i + 1}`,
          email: `usuario${i + 1}@example.com`,
          password: `password${i + 1}`,
        });
      }
      return users;
    };

    // Agregar 100 usuarios
    const usersToAdd = generateUsers(100);

    // Insertar usuarios en la base de datos
    User.insertMany(usersToAdd)
      .then((docs) => {
        console.log(`${docs.length} usuarios agregados.`);
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error('Error al agregar usuarios:', error);
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error('Error de conexión:', error);
  });
