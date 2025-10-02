FROM node:20 AS builder

ENV NODE_ENV production

WORKDIR /var/www/apps/equipment
COPY . /var/www/apps/equipment

RUN npm install --omit=optional

RUN npm run build


FROM node:20 AS prod

ENV NODE_ENV production

WORKDIR /var/www/apps/equipment
COPY --from=builder /var/www/apps/equipment/dist /var/www/apps/equipment
COPY --from=builder /var/www/apps/equipment/node_modules /var/www/apps/equipment/node_modules

CMD node /var/www/apps/equipment/index.js