FROM opensuse/leap:15.5

WORKDIR /app

RUN zypper install -y wget tar shadow &&\
    groupadd -r mongodb &&\
    useradd -r -g mongodb -s /bin/false mongodb && \    
    mkdir -p /data/db && \
    chown -R mongodb:mongodb /data/db

RUN wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-suse15-7.0.21.tgz &&\
    zypper install -y gzip &&\
    tar -xvzf mongodb-linux-x86_64-suse15-7.0.21.tgz &&\
    mv mongodb-linux-x86_64-suse15-7.0.21 /opt/mongodb &&\
    ln -s /opt/mongodb/bin/* /usr/local/bin/ &&\
    rm mongodb-linux-x86_64-suse15-7.0.21.tgz

EXPOSE "27017"

USER mongodb
CMD ["mongod", "--bind_ip_all", "--dbpath", "/data/db"]