FROM phusion/passenger-full:0.9.15

COPY . /home/app

#mongo install
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
RUN apt-get update
RUN apt-get install -y mongodb-org=3.0.1 mongodb-org-server=3.0.1 mongodb-org-shell=3.0.1 mongodb-org-mongos=3.0.1 mongodb-org-tools=3.0.1
RUN mkdir -p /data/db
EXPOSE 27017

#install meteor, eslint
RUN curl https://install.meteor.com/ | sh
RUN npm install -g eslint

