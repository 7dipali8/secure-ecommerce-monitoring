FROM node:22.22.3-alpine

WORKDIR /app

# Pin npm to the version verified with this project's lockfile
RUN npm install --global npm@11.11.1

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/main"]
