FROM node:11

WORKDIR /app

COPY tslint.json nest-cli.json tsconfig.json package.json nest-cli.json tsconfig.build.json /app/
COPY ./src /app/src
COPY ./test /app/test
COPY i18n/ar/messages.json /app/i18n/ar/messages.json
COPY i18n/en/messages.json /app/i18n/en/messages.json

RUN npm install --silent
RUN npm run test
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
