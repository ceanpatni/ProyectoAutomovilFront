
---

# DOCKERIZAR FRONTEND (ANGULAR 11)

## ProyectoAutomovilFront/Dockerfile

```dockerfile
# Etapa 1: construir aplicación Angular
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: servidor Nginx
FROM nginx:1.25
COPY --from=build /app/dist/proyecto-automovil-front /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
