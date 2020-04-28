FROM node:carbon

# Set the working directory to /app
WORKDIR /

# Install any needed packages specified in package.json
RUN npm install

EXPOSE $PORT

# Run app when the container launches
CMD ["npm", "start"]