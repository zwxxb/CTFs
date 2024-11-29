#!/bin/bash

docker rm -f love-death-pythonsql
docker build --tag=love-death-pythonsql .
docker run -p 1337:1337 --rm --name=love-death-pythonsql love-death-pythonsql -d