FROM nginx:alpine

# Custom Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# HTML 파일 복사
COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80