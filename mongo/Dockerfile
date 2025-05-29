FROM opensuse/leap:15.5

# Install tools and CA certificates
RUN zypper refresh && \
    zypper install -y wget tar gzip ca-certificates

# Download and extract MongoDB
RUN wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-6.0.6.tgz && \
    tar -xzf mongodb-linux-x86_64-6.0.6.tgz && \
    mv mongodb-linux-x86_64-6.0.6 /mongodb && \
    mkdir -p /data/db

# Expose MongoDB port
EXPOSE 27017

# Start MongoDB
CMD ["/mongodb/bin/mongod", "--dbpath", "/data/db", "--bind_ip_all"]