FROM node:12.18.4

COPY . /app
WORKDIR /app

RUN npm i
RUN npm run build

EXPOSE 8000
CMD ["npm","start"]