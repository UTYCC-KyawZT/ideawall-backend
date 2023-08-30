FROM node:18.17.0-slim
WORKDIR /app
COPY . /app
RUN npm cache clean --force
RUN npm install
RUN npm i bcryptjs@2.4.3
RUN npm i body-parser@1.20.2
RUN npm i dotenv@16.3.1
RUN npm i express@4.18.2
RUN npm i jsonwebtoken@9.0.1
RUN npm i mongoose@7.4.0
RUN npm i nodemon@3.0.1
RUN npm i cors@2.8.5
RUN npm i morgan@1.10.0
EXPOSE 8000
CMD node app.js