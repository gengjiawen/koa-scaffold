FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the container
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies using Pnpm
RUN npm install -g pnpm && pnpm install --no-prefer-frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

ENV NODE_ENV=production
RUN pnpm build

# Specify the command to run the application when the container starts
CMD ["node", "build/index.js"]
