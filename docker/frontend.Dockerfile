# docker/frontend.Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copia los archivos de tu frontend al contenedor
COPY frontend/frontend/package.json frontend/frontend/yarn.lock* ./
RUN yarn install --frozen-lockfile || yarn install

COPY frontend/frontend ./

# Construye la app Next.js
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
