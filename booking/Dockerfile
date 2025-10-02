FROM node:20 AS builder

ENV NODE_ENV production

WORKDIR /var/www/apps/booking
COPY . /var/www/apps/booking

RUN npm install --omit=optional

RUN npm run build


FROM node:20 AS prod

ENV NODE_ENV production

WORKDIR /var/www/apps/booking
COPY --from=builder /var/www/apps/booking/dist /var/www/apps/booking
COPY --from=builder /var/www/apps/booking/node_modules /var/www/apps/booking/node_modules

CMD node /var/www/apps/booking/index.js