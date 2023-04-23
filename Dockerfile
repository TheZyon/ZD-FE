FROM nginx:alpine
COPY dist/ricette /usr/share/nginx/html
EXPOSE 4200
