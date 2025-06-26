FROM opensuse/leap:15.5

WORKDIR /app

RUN zypper install -y libopenssl3 gzip wget tar shadow &&\
    groupadd -r mongodb &&\
    useradd -r -g mongodb -s /bin/false mongodb && \    
    mkdir -p /data/db && \
    chown -R mongodb:mongodb /data/db /app

#Installs Mongo Server - mongod
RUN wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-suse15-7.0.21.tgz &&\
    tar -xvzf mongodb-linux-x86_64-suse15-7.0.21.tgz &&\
    mv mongodb-linux-x86_64-suse15-7.0.21 /opt/mongodb &&\
    ln -s /opt/mongodb/bin/* /usr/local/bin/ &&\
    rm mongodb-linux-x86_64-suse15-7.0.21.tgz

#Installs Mongo Shell - mongosh
RUN wget https://downloads.mongodb.com/compass/mongosh-2.5.3-linux-x64-openssl3.tgz &&\
    tar -xzf mongosh-2.5.3-linux-x64-openssl3.tgz && \
    mv mongosh-2.5.3-linux-x64-openssl3/bin/mongosh /usr/local/bin/ && \
    chmod +x /usr/local/bin/mongosh && \
    rm -rf mongosh-2.5.3-linux-x64-openssl3*

EXPOSE "27017"

USER mongodb

CMD ["mongod", "--bind_ip_all", "--dbpath", "/data/db"]