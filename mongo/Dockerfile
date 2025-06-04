FROM opensuse/leap:15.5

WORKDIR /app

RUN zypper install -y wget tar && \
    mkdir -p /data/db && \
    chown -R $(whoami) /data/db

RUN wget https://repo.mongodb.org/zypper/suse/15/mongodb-org/5.0/x86_64/RPMS/mongodb-org-mongos-5.0.1-1.suse15.x86_64.rpm &&\
    wget https://repo.mongodb.org/zypper/suse/15/mongodb-org/5.0/x86_64/RPMS/mongodb-org-server-5.0.1-1.suse15.x86_64.rpm &&\
    wget https://repo.mongodb.org/zypper/suse/15/mongodb-org/5.0/x86_64/RPMS/mongodb-org-shell-5.0.1-1.suse15.x86_64.rpm

RUN rpm --import https://pgp.mongodb.com/server-5.0.asc &&\
    zypper install -y ./mongodb-org-*.rpm

EXPOSE "27017"

CMD ["mongod", "--bind_ip_all", "--dbpath", "/data/db"]
