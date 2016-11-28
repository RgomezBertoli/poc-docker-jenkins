FROM ubuntu:14.04

## PREPARE ENVIROMENT ##
RUN apt-get update
RUN apt-get install -y firefox
RUN apt-get install -y python-pip  python-dev gcc 
RUN apt-get install -y xvfb
RUN apt-get install -y wget

## CREATE TEST LAUNCHER ##
RUN pip install robotframework
RUN pip install pycrypto
RUN pip install robotframework-selenium2library

## INCLUDING FIREFOX DRIVER TO PATH ##
RUN wget https://github.com/mozilla/geckodriver/releases/download/v0.11.1/geckodriver-v0.11.1-linux64.tar.gz
RUN tar -zxvf geckodriver-v0.11.1-linux64.tar.gz
RUN mv geckodriver /usr/bin/
RUN rm geckodriver-v0.11.1-linux64.tar.gz

## CREATE SSH SERVER ##
RUN apt-get install -y openssh-server

EXPOSE 8000