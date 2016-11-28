FROM ubuntu:14.04

RUN apt-get update

## CREATE SSH SERVER ##
RUN apt-get install -y openssh-server
RUN apt-get install -y curl
RUN apt-get install -y git

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash
RUN apt-get install -y nodejs

RUN apt-get install -y build-essential

RUN npm install -g bower gulp

EXPOSE 8888