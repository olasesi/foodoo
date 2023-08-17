# Use the official Node.js image as the base image
FROM node:17

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files to the container
COPY . .

# Build the React app
# RUN npm run build

# Expose the port your React app is served on
EXPOSE 3000

# Serve the React app using a lightweight web server (like serve)
CMD [ "npm", "start" ]
