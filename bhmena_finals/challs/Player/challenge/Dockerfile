FROM python:3.11-slim AS final

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -y update --fix-missing  && \
    apt-get -y install wget supervisor nginx curl socat && \
    wget https://pkg.osquery.io/deb/osquery_5.12.1-1.linux_amd64.deb && \
    apt install -y ./osquery_5.12.1-1.linux_amd64.deb && \
    rm -rf /var/lib/apt/lists/* && \
    rm osquery_5.12.1-1.linux_amd64.deb

# Switch working environment
WORKDIR /app
RUN mkdir -p /app/webhooks && chmod 777 -R /app/webhooks

# Add application
COPY src .

# Add the webhook
COPY webhook /webhook
WORKDIR /webhook
RUN pip3 install --ignore-installed --no-cache-dir flask osquery pyotp && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash -

RUN apt-get update && apt-get install -y nodejs && \
    npm config set strict-ssl false && \
    npm install

COPY supervisord.conf /etc/supervisord.conf
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["supervisord", "-c", "/etc/supervisord.conf"]