FROM opensuse/leap:15.5

# Install Node.js and Git
RUN zypper refresh && \
    zypper install -y nodejs npm

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./
RUN ls -al

# Install dependencies
RUN npm install

# Copy rest of the project files
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
