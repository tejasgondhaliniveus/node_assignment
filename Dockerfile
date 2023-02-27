FROM node:latest
RUN apt update && apt install chromium libatk-bridge2.0-0 libgtk-3-0 -y
WORKDIR /home/niveus/local

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /home/niveus/local
RUN npm install

COPY . /home/niveus/local

EXPOSE 3000
CMD ["node", "server.js"]
