FROM opensuse/leap:15.5


RUN zypper refresh &&\
    zypper install -y nodejs18 git &&\
    zypper install -y npm18 &&\
    ln -sf /usr/bin/node18 /usr/bin/node &&\
    ln -sf /usr/bin/npm18 /usr/bin/npm

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"]
