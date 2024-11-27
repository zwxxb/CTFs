# Use Node.js base image
FROM node:18

RUN apt-get update && apt-get install curl
# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY . ./

RUN echo "$FLAG" > '/tmp/flag_'$(cat /dev/urandom | tr -cd 'a-f0-9' | head -c 32).txt
RUN export FLAG='none'

RUN npm init -y
# Install the dependencies inside the container
RUN npm ci

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]