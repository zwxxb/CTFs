# Base image for Python, Node, and Redis
FROM mcr.microsoft.com/playwright:v1.47.2-jammy

# Install Redis and Nginx
RUN apt-get update && apt-get install -y \
    redis-server \
    nginx \
    python3-pip \
    gunicorn \
    xvfb  && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/* 

# Set up directories and working directory
WORKDIR /app

# Install Python and Node dependencies
COPY developer_tools/requirements.txt /app/requirements.txt
COPY developer_tools/main.py /app/main.py
COPY developer_tools/app /app/app
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY crawler/package.json crawler/package-lock.json /app/
RUN npm install
RUN npx playwright install

# Add remaining application files
COPY crawler/crawler.js /app/
COPY crawler/run.sh /app/
COPY developer_tools/prestart.sh /app/prestart.sh
COPY redis/redis.conf /app/redis.conf
#COPY developer_tools/uwsgi.ini /app/uwsgi.ini
COPY entrypoint.sh /app/entrypoint.sh
COPY cert.pem key.pem /app/

# Set permissions and make scripts executable
RUN chmod +x /app/prestart.sh /app/run.sh /app/entrypoint.sh
#RUN chmod 777 /etc/redis/redis.conf /var/log/nginx
RUN chown -R www-data:www-data /var/log/nginx

COPY webhook /usr/webhook
RUN cd /usr/webhook && npm init -y && npm install express sqlite3 uuid --no-package-lock
RUN mkdir -p /app/webhooks/

# Nginx configuration for reverse proxy
COPY nginx.conf /etc/nginx/nginx.conf

# Expose necessary ports
EXPOSE 80 6379 1337

# Entrypoint to start all services
CMD ["/app/entrypoint.sh"]
