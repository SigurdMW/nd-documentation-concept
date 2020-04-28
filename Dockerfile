FROM node:12

# Set the working directory to /app
WORKDIR /

# Copy the current directory contents into the container at /app
COPY . /


# Install any needed packages specified in package.json
RUN npm install

EXPOSE $PORT

# Run app when the container launches
CMD ["npm", "start"]