# Usa una imagen base de Node.js
FROM node:16

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto en el que la aplicación escucha
EXPOSE 3000

# Ejecutar la aplicación
CMD ["node", "app.js"]
