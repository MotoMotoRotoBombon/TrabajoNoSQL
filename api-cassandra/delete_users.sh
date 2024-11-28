#!/bin/bash
# Script para eliminar un usuario específico en Cassandra

# Verifica que se haya pasado un ID como argumento
if [ -z "$1" ]; then
    echo "Uso: ./delete_user.sh <user_id>"
    exit 1
fi

USER_ID=$1

echo "Eliminando usuario con ID $USER_ID de la tabla 'users'..."

# Ejecuta el comando DELETE en Cassandra
echo "DELETE FROM test_keyspace.users WHERE id = $USER_ID;" | docker exec -i cassandra cqlsh

echo "Usuario con ID $USER_ID eliminado."
