FROM node:20 AS base

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS release
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next
COPY --from=base /app .

EXPOSE 3000

CMD ["npm", "run", "dev"]
