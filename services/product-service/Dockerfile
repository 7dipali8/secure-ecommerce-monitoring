FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN echo "===== FILES INSIDE /app/src =====" && \
    find /app/src -type f | sort

RUN echo "===== SEARCH FOR PHANTOM FILES =====" && \
    find /app/src -type f | grep -E 'auth\.service|users\.service|users\.controller|user\.entity' || true

RUN npm run build
EXPOSE 3000

CMD ["node", "dist/main"]
