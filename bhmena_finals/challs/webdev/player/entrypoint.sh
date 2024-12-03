#!/bin/bash
set -e

# Start Redis in the background
redis-server /app/redis.conf &

# Wait for Redis to start
sleep 3

# Run Flask database migrations and setup (Challenge service)
if [ -d "./migrations" ]; then
  rm -rf ./migrations
fi
./prestart.sh

# Start Flask app with Gunicorn
gunicorn --workers 4 --preload --bind 127.0.0.1:8000 main:app &

# Start Nginx for reverse proxy
nginx &

# Start of webhook
node /usr/webhook/app.js &
# Start the Crawler in the background
xvfb-run --auto-servernum node /app/crawler.js &

# Keep the container running
tail -f /dev/null
