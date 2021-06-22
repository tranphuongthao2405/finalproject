FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]

RUN ls
RUN npm install 

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]