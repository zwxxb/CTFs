FROM php:8.0-apache AS final

RUN apt-get update && apt-get install -y socat libpng-dev libfontconfig
COPY src /var/www/html/
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf
COPY 000-default.conf /etc/apache2/sites-enabled/000-default.conf
COPY ports.conf /etc/apache2/ports.conf
COPY apache2.conf /etc/apache2/apache2.conf
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data && \
    chown -R www-data:www-data /var/www/html
EXPOSE 80

FROM pwn.red/jail
COPY --from=final / /srv
COPY docker-entrypoint.sh /srv/app/run
COPY hook.sh /jail/hook.sh
RUN chmod +x /srv/app/run /jail/hook.sh && \
    touch /srv/flag.txt && chmod 777 /srv/flag.txt && \
    chmod -R 777 /srv/app && chmod -R 777 /srv/var/log/apache2 && \
    echo "127.0.0.1 debuerreotype localhost app" >> /srv/etc/hosts
ENV JAIL_PIDS=0 JAIL_CPU=0 JAIL_MEM=0 JAIL_TIME=0 JAIL_TMP_SIZE=100M JAIL_DEV=null,zero,urandom
