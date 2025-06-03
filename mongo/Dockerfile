FROM opensuse/leap:15.5

RUN zypper install -y wget tar && \
    mkdir -p /data/db && \
    chown -R $(whoami) /data/db

RUN wget https://repo.mongodb.org/zypper/suse/15/mongodb-org/5.0/x86_64/RPMS/mongodb-org-mongos-5.0.1-1.suse15.x86_64.rpm &&\
    wget https://repo.mongodb.org/zypper/suse/15/mongodb-org/5.0/x86_64/RPMS/mongodb-org-server-5.0.1-1.suse15.x86_64.rpm &&\
    wget https://repo.mongodb.org/zypper/suse/15/mongodb-org/5.0/x86_64/RPMS/mongodb-org-shell-5.0.1-1.suse15.x86_64.rpm &&\
    wget https://repo.mongodb.org/zypper/suse/15/mongodb-org/5.0/x86_64/RPMS/mongodb-org-tools-5.0.1-1.suse15.x86_64.rpm

RUN rpm --import https://pgp.mongodb.com/server-5.0.asc &&\
    zypper install ./mongodb-org-*.rpm &&\
    mongod --dbpath /data/db --fork --logpath /var/log/mongod.log &&\
    mongo

EXPOSE "27017"