FROM --platform=linux/amd64 node:20-alpine AS build

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

FROM --platform=linux/amd64 nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]