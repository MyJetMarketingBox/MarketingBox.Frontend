FROM node:14.18.1

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

#EXPOSE 3000

RUN chmod +x ./start.sh
ENTRYPOINT ["./start.sh"]
