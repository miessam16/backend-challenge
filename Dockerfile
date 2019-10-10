FROM node:11

WORKDIR /app

COPY tslint.json nest-cli.json tsconfig.json package.json nest-cli.json tsconfig.build.json /app/
COPY ./src /app/src
COPY ./test /app/test
COPY i18n/ar/messages.json /app/i18n/ar/messages.json
COPY i18n/en/messages.json /app/i18n/en/messages.json

RUN npm install
#RUN npm run build to be run on the production

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
