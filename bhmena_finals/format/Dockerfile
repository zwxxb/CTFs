FROM python:3.11-alpine
RUN apk add --no-cache --update mariadb mariadb-client supervisor gcc musl-dev mariadb-connector-c-dev openssl
RUN python -m pip install --upgrade pip
RUN mkdir -p /app
WORKDIR /app
COPY ./src .
RUN pip install -r requirements.txt
RUN adduser -S www-data -G www-data
RUN chown -R www-data:www-data /app
RUN chmod +x /app/run.py
ENV PYTHONDONTWRITEBYTECODE=1
EXPOSE 1337
RUN mkdir -p /var/log/supervisord && chown -R www-data:www-data /var/log/supervisord
COPY --chown=root config/supervisord.conf /etc/supervisord.conf
COPY --chown=root entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
COPY --chown=root start.sh /start.sh
RUN chmod +x /start.sh
ENTRYPOINT ["/entrypoint.sh"]
