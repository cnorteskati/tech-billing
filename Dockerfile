FROM node:20-alpine

# Upgrade OS packages to ensure latest security patches
RUN apk --no-cache upgrade

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies and build the app
RUN npm install
RUN npm run build

# Expose the port and start the application
EXPOSE 3000
CMD ["npm", "start"]