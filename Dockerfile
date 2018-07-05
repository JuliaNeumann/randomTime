FROM node:8
RUN mkdir /randomTime
ADD . /randomTime
WORKDIR /randomTime
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]