FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install 
RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "dev"]