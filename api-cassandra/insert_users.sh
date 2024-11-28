#!/bin/bash
# Script para insertar usuarios en Cassandra con nombres aleatorios

TOTAL_USERS=100  # Cambia esto al número total de usuarios que deseas insertar
BATCH_SIZE=10    # Tamaño del lote (número de usuarios por lote)

# Lista de nombres aleatorios
NAMES=("Alice" "Bob" "Charlie" "Diana" "Eve" "Frank" "Grace" "Hank" "Ivy" "Jack" "Karen" "Leo" "Mona" "Nina" "Oscar" "Paul" "Quincy" "Rachel" "Sam" "Tina" "Uma" "Victor" "Wendy" "Xander" "Yara" "Zane")

batches=$((TOTAL_USERS / BATCH_SIZE)) # Calcula el número de lotes

for ((batch=1; batch<=batches; batch++))
do
    echo "Insertando lote $batch de usuarios..."
    for ((i=1; i<=BATCH_SIZE; i++))
    do
        # Genera el UUID usando uuidgen
        user_id=$(uuidgen)
        
        # Selecciona un nombre aleatorio de la lista
        random_index=$((RANDOM % ${#NAMES[@]}))
        user_name="${NAMES[$random_index]}_$(( (batch - 1) * BATCH_SIZE + i ))"
        
        # Inserta el usuario en Cassandra ejecutando cqlsh dentro del contenedor
        echo "INSERT INTO test_keyspace.users (id, name) VALUES ($user_id, '$user_name');" | docker exec -i cassandra cqlsh
    done
done
