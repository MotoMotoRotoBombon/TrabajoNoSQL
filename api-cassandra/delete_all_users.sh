#!/bin/bash
# Script para eliminar todos los usuarios de la tabla 'users' en Cassandra

echo "Eliminando todos los usuarios de la tabla 'users' en test_keyspace..."

# Ejecuta el comando TRUNCATE en Cassandra para eliminar todos los registros de la tabla
echo "TRUNCATE test_keyspace.users;" | docker exec -i cassandra cqlsh

echo "Todos los usuarios han sido eliminados."
