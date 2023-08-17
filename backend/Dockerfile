# Use the official Node.js image as the base image
FROM node:17

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files to the container
COPY . .

# Expose the port your backend is listening on
EXPOSE 3001

# Start the backend server
CMD [ "npm", "run", "dev" ]
