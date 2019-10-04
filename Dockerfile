FROM node:8

WORKDIR /app

COPY tslint.json nest-cli.json tsconfig.json package.json nest-cli.json tsconfig.build.json /app/
COPY ./src /app/src
COPY ./test /app/test

RUN npm install
#RUN npm run build to be run on the production

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
