FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install 
RUN npx prisma generate
RUN npm run build


EXPOSE 3000

CMD ["npm", "run", "dev"]