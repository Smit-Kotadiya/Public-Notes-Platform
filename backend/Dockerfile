FROM opensuse/leap:15.5

RUN zypper refresh && \
    zypper install -y nodejs18 git && \
    mkdir /app

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"]
