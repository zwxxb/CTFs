#!/bin/bash
set -e

# Start MySQL service
service mariadb start

# Initialize MySQL database and user permissions if not already created
mysql -uroot -prootpassword -e "CREATE DATABASE IF NOT EXISTS my_blog;"
mysql -uroot -prootpassword -e "CREATE USER IF NOT EXISTS 'symfony'@'%' IDENTIFIED BY 'symfony';"
mysql -uroot -prootpassword -e "GRANT ALL PRIVILEGES ON my_blog.* TO 'symfony'@'%';"
mysql -uroot -prootpassword -e "FLUSH PRIVILEGES;"

# Start RabbitMQ service
service rabbitmq-server start
mariadb -V
# Wait for MySQL to be fully ready
until mysql -h 127.0.0.1 -u symfony -psymfony -e "SELECT 1" > /dev/null 2>&1; do
  echo "Waiting for MySQL..."
  sleep 2
done

# Run migrations and seed an admin user
php bin/console make:migration
php bin/console doctrine:migrations:migrate --no-interaction
mysql -h 127.0.0.1 -u symfony -psymfony -e "USE my_blog; \
  INSERT INTO user (roles, email, username, password, is_verified) VALUES \
  ('[\"ROLE_ADMIN\"]', 'admin@blackhat.com', 'REDACTED', \
  'REDACTED', 0);"

# Create Flag
echo $FLAG > /etc/$FLAGNAME
chmod +r /etc/$FLAGNAME

# Start Nginx and PHP-FPM in the background
nginx &
php-fpm &
mailhog &

# Start the Messenger Worker in the background
php /var/www/html/bin/console messenger:consume async --memory-limit=512M &

# Keep the container running
tail -f /dev/null
