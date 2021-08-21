# Stage 1 - the build process
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY package-lock.json ./package-lock.json
COPY package.json ./package.json
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/django.conf /etc/nginx/conf.d