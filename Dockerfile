FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN echo "===== CONTEXT CHECK =====" && \
    pwd && \
    find /app -maxdepth 3 -type f | sort

RUN echo "===== SEARCH FOR PHANTOM FILES =====" && \
    find /app/src -type f | grep -E 'auth\.service|users\.service|users\.controller|user\.entity' || true

RUN npm run build
EXPOSE 3000

CMD ["node", "dist/main"]
