const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'], // Cambia a 'cassandra' si se ejecuta en un entorno de red Docker
  localDataCenter: 'datacenter1',
  keyspace: 'test_keyspace' // Asegúrate de que este keyspace exista
});

async function connect() {
  try {
    await client.connect();
    console.log("Conectado a Cassandra.");
  } catch (error) {
    console.error("Error conectando a Cassandra:", error);
  }
}

// Exporta la función para usarla en otros archivos
module.exports = { connect, client };
