FROM node:20.10-alpine3.18

WORKDIR /app

COPY *.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 9000

CMD ["npm", "start"]