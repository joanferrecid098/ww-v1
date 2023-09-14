FROM node:18

COPY package*.json .
RUN npm install
COPY . .

CMD ["ts-node", "main"]