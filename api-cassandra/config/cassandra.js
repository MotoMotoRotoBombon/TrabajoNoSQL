const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_CONTACT_POINT || '127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'test_keyspace'
});

async function connect() {
  try {
    await client.connect();
    console.log("Conectado a Cassandra.");
  } catch (error) {
    console.error("Error conectando a Cassandra:", error);
  }
}

module.exports = { client, connect };
