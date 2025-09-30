FROM node:alpine3.22

WORKDIR /code

COPY ./backend /code/

RUN ls

RUN npm install

EXPOSE 3000

RUN npm run build

CMD ["node", "dist/main"]
