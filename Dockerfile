FROM node:lts

WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the container
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --no-prefer-frozen-lockfile

COPY . .

ENV NODE_ENV=production
RUN pnpm build

CMD ["node", "build/index.js"]
