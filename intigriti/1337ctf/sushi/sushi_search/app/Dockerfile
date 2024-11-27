FROM node:18

WORKDIR /app

COPY . .

RUN npm install
RUN apt-get update && apt-get install -y libnss3 \
libgdk-pixbuf2.0-0 \
libxss1 \
libgtk-3-0 \
libgbm1 \
libasound2 \
libatk-bridge2.0-0 \
libatk1.0-0 \
libcups2 \
libdrm2 \
libxcomposite1 \
libxdamage1 \
libxrandr2 \
libxshmfence1 \
libpango-1.0-0 \
libpangocairo-1.0-0 \
libpangoft2-1.0-0 \
curl
RUN npx puppeteer browsers install chrome

CMD ["node", "index.js"]
