# Paso 1: Utilizar una imagen base con Node.js
FROM node:16.17.0 as build-step

# Paso 2: Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Paso 3: Copiar el package.json y instalar dependencias
COPY package.json /app
RUN npm install

# Paso 4: Copiar el resto del código fuente
COPY . /app

# Paso 5: Construir la aplicación para producción
RUN npm run build

# Paso 6: Utilizar una imagen base para el servidor (nginx)
FROM nginx:alpine

# Paso 7: Copiar los archivos de construcción al servidor nginx y el archivo de configuración de nginx
COPY --from=build-step /app/dist/* /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/nginx.conf

# Paso 8: Exponer el puerto en el que se ejecutará el contenedor
EXPOSE 80

# Paso 9: Iniciar el servidor nginx
CMD ["nginx", "-g", "daemon off;"]
