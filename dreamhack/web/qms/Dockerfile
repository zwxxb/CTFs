FROM node:20.10.0-slim

COPY ./app/src /app
COPY ./app/flag /flag
WORKDIR /app

RUN apt-get update
RUN apt-get install wget gdebi-core libcurl4 -y
RUN wget http://ftp.us.debian.org/debian/pool/main/o/openssl/libssl1.1_1.1.1n-0+deb10u3_amd64.deb
RUN gdebi --non-interactive libssl1.1_1.1.1n-0+deb10u3_amd64.deb
RUN apt-get clean

RUN npm i

EXPOSE 5000

CMD ["node", "index.js"]