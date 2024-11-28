#!/bin/bash
# Script para actualizar el nombre de un usuario específico en Cassandra

# Verifica que se hayan pasado los argumentos necesarios (ID y nuevo nombre)
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Uso: ./update_user.sh <user_id> <nuevo_nombre>"
    exit 1
fi

USER_ID=$1
NEW_NAME=$2

echo "Actualizando usuario con ID $USER_ID a nombre $NEW_NAME en la tabla 'users'..."

# Ejecuta el comando UPDATE en Cassandra
echo "UPDATE test_keyspace.users SET name = '$NEW_NAME' WHERE id = $USER_ID;" | docker exec -i cassandra cqlsh

echo "Usuario con ID $USER_ID ha sido actualizado a nombre $NEW_NAME."
