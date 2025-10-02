FROM node:20 AS builder

ENV NODE_ENV production

WORKDIR /var/www/apps/auth
COPY . /var/www/apps/auth

RUN npm install --omit=optional

RUN npm run build


FROM node:20 AS prod

ENV NODE_ENV production

WORKDIR /var/www/apps/auth
COPY --from=builder /var/www/apps/auth/dist /var/www/apps/auth
COPY --from=builder /var/www/apps/auth/node_modules /var/www/apps/auth/node_modules

CMD node /var/www/apps/auth/index.js

