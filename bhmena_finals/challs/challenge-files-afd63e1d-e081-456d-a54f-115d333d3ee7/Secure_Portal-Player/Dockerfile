FROM node:16

# Install dependencies
RUN apt-get update && apt-get install -y libpng-dev

# Set the working directory in the container
WORKDIR /app

# Copy the entire application code to the working directory
COPY src/ .


RUN npm init -y

# Install Node.js dependencies
# RUN npm install express express-session @prisma/client prisma mariadb
RUN npm install express express-session @prisma/client prisma mariadb jsonwebtoken body-parser
RUN npx prisma init

COPY schema.prisma prisma/schema.prisma
RUN npx prisma migrate dev --name init
# Expose the ports for Node.js (3000) and MariaDB (3306)
EXPOSE 3000 3306

# Command to run both Node.js app and MariaDB
CMD ["node","index.js"]

