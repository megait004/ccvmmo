#!/bin/bash

apt-get update && apt-get upgrade -y
apt-get --fix-broken install -y
apt-get -f install -y
dpkg --configure -a
apt-get install -y sqlite3 libsqlite3-dev build-essential python3
export NVM_VERSION="v0.40.3"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/$NVM_VERSION/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install --lts=iron
nvm use --lts=iron
nvm alias default lts/iron
npm install -g pm2
cd .output
rm -rf server/node_modules/better-sqlite3
npm install better-sqlite3
ln -sf /root/.output/node_modules/better-sqlite3 /root/.output/server/node_modules/better-sqlite3
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
