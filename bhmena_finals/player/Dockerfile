# Base image for PHP, MySQL, RabbitMQ, and Nginx
FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/html

# Install dependencies and PHP extensions
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions amqp

RUN apt-get update && apt-get install -y \
    git \
    curl \
    mariadb-server \
    rabbitmq-server \
    nginx \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    libicu-dev \
    libpq-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd intl zip && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2.7.9 /usr/bin/composer /usr/bin/composer

# Copy application code
COPY . /var/www/html

# Install PHP dependencies
RUN composer install --no-scripts --no-autoloader
RUN composer dump-autoload

# Copy Nginx configuration
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Webhook
COPY webhook /usr/webhook
RUN cd /usr/webhook && npm init -y && npm install express sqlite3 uuid --no-package-lock
RUN mkdir -p /app/webhooks/

# mailhog
RUN curl -L -o /usr/local/bin/mailhog https://github.com/mailhog/MailHog/releases/download/v1.0.1/MailHog_linux_amd64 && \
    chmod +x /usr/local/bin/mailhog

# Expose necessary ports
EXPOSE 80 3306 5672 15672 9000

# Copy entrypoint script
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Start services via entrypoint
CMD ["/usr/local/bin/entrypoint.sh"]
