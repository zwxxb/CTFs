FROM php:8.1-apache

# Install essential packages (libssl-dev included) but skip docker-php-ext-install for OpenSSL
RUN apt-get update && apt-get install -y \
    libssl-dev \
    libxml2-dev \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www/html

# Copy challenge files
COPY challenge/ .
COPY flag.txt /flag.txt
RUN chown www-data:www-data /flag.txt && chmod 400 /flag.txt

# Configure Apache
RUN a2enmod rewrite
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 555 /var/www/html

EXPOSE 80
