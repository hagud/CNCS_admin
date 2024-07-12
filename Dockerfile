FROM --platform=linux/amd64 node:20-alpine AS build

WORKDIR /app

COPY . .

RUN npm i

ENV REACT_APP_TYPE=prod

RUN npm run build

FROM --platform=linux/amd64 nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]