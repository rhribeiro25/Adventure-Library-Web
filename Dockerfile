# ============================
# Build image — Node + Angular
# ============================
FROM node:22-alpine AS build

WORKDIR /project

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ============================
# Runtime image — Nginx
# ============================
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /project/dist/adventure-library-angular/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]