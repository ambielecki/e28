# Docker and Docker-Compose for Development Environments

## What is Docker? 
The simplest (technical) answer is that Docker is an engine for creating and running containers. 
Docker provides the interface between these containers and your operating system.  A container is a 
way of packaging code and its dependencies (os, drivers, packages, etc) so it can run virtually 
anywhere and in isolation. So, there is a version of the Docker engine for Mac, Windows, or Linux. 
This engine will allow the same containers to run on any system by providing the interface to OS 
APIs.

![docker containers](images/docker-container.png)

What does that mean for you the developer?  It means simpler development on near production systems 
on a local environment of your choosing. It does not matter if members of your team work with Windows, 
Linux, or Mac; with a few simple tweaks you can all work with the same dev environment. As a solo 
developer you gain the comfort of knowing that your code is running in a near production 
environment in your container (so if you intend to deploy on Ubuntu 18.04, you can develop in a 
container with Ubuntu 18.04). Your containers also provide code isolation so you can run many 
versions of a tool (for example PHP 7.1 and 7.4 for different projects) without interference. And, 
best of all, no more installing programs on your root OS (my personal example - installing PostgreSQL 
locally and having it ruin everything - leading to a fresh Windows install).

Sources:  
[Docker - Get Started](https://docs.docker.com/get-started/)  
[InfoWorld - What is Docker?](https://www.infoworld.com/article/3204171/what-is-docker-the-spark-for-the-container-revolution.html)

### Images, Containers, Volumes - oh my

There are many new terms to deal with when getting started with Docker, with three of the fundamental 
building blocks being Images, Containers, and Volumes. Every environment you create will most likely 
use all three of these objects, so having a basic understanding of them will be helpful.

#### Images

Quite simply, an image is the blueprint for our docker container. An image is a binary file 
that contains all the code, libraries, etc to run a specific task.  An image can be as simple as an 
OS build such as Ubuntu, to the full code stack of an application.

We will usually deal with images that will contain the the base dev ops components of a deployment,
OS, web server, runtimes for things such as PHP, Node, or Python.  We will also see images for databases such as MySQL 
or Mongo, and services such as Redis caching or simple queue services.  From there we will add the specifics of our 
deployment, libraries we need for our code such as a PDF generator, library managers such as NPM or Composer, or database drivers.

If we choose, a snapshot in time can be taken once our dev environment is set up, with all of these components in place, 
to create a shareable image. 

Sources:    
[Docker - Overview](https://docs.docker.com/engine/docker-overview/)


#### Containers

Containers are built from images, it is the process on your machine that contains the code necessary for running our task. 
We will spend our time interacting with our application in container.

Sources:    
[Docker - What is a Container](https://www.docker.com/resources/what-container)


#### Volumes

In general the data created within a container is incaccessible from the host machine and destroyed along with a 
container, but it is useful for our container to have access to some files from the host and allow both the container and 
host to modify the files.  This is where a volume comes in, we can bind data to our container's filesystem, so it can be 
accessed from both sides.

![docker volumes](images/types-of-mounts-volume.png)

This is particularly useful for the code you are developing, you can work from your local filesystem and have the changes 
persisted in the container.  Also, the container is free to create or modify files (say generating a pdf), that will be 
persisted to the local machine.

This also allows you to rebuild your container without losing data, say from a database. Your database storage directory 
can be a volume shared with the local filesystem and will persist, even if the container is destroyed.  

Sources:    
[Docker - Volumes](https://docs.docker.com/storage/volumes/)

### Why Use Docker over XAMPP?

This will obviously be from personal experience and slightly opinionated, but I have found docker to be a more 
versatile solution to installing software such as XAMPP directly on my system.

#### Safety

First and foremost, docker containers are isolated from the host system and can be created and destroyed at 
will. You reduce the risks of conflicts, data corruption, and general issues with your host system.  From 
personal experience, I have incapacitated my Windows 10 machine attempting to install Postgres, which was needed 
for a development project. If I had done that in docker, I would have just deleted the container and moved on.

#### Closer to Production

Most production environments you will encounter are Linux based (unless you are a C#/.NET programmer), which can 
behave differently than a Windows or Mac environment.  For example, Linux can be more strict on capitalization of 
file / class names (a problem I ran into developing on XAMPP and deploying to Ubuntu). There are docker images 
available to mimic every flavor of Linux distro, database version, etc.

#### Ease of Running Multiple Versions

It is trivial to run multiple containers with different versions of software concurrently, say different versions 
of PHP, or Node, simplifying testing. One could also configure code for a new webserver such as nginx, all without 
destroying your current setup.

#### Ease of Onboarding Additional Team Members

Docker configurations are stored in Dockerfiles and ochestrated via docker-compose.yml files. These (or examples) can 
be included in version control, allowing for quick onboarding of new team members and the assurance that everyone 
has a similar dev environment. As docker will run on both Mac and Windows, developers can choose the system where they 
are comfortable, but still be assured their containers are the same. 

## Installation

### System Requirements

System requirements and installers can be found at the links below for both Windows and Mac.  
<https://docs.docker.com/docker-for-windows/install/>   
<https://docs.docker.com/docker-for-mac/install/>   

All modern Mac hardware (since 2010), running macOS 10.13 or greater is capable of running Docker.

Only Windows 10 Pro systems (with Hyper-V support) are capable of running the most up to date version of Docker. 
There is an older version ([Docker Toolbox](https://docs.docker.com/toolbox/), which can run on older versions and 
Home versions of Windows, but is now considered legacy software and receives minimal support.

### Simple Test
<https://docs.docker.com/get-started/>

First we want to test that our installation of docker desktop was successful.  Open a terminal 
window and type the following `docker run hello-world`.  You should see something similar to the 
following:

![hello-world example](images/hello-world.png)

The text is pretty self explanatory, Docker performed the following tasks:
* Checked to see if we had a local copy of the hello-world image (we did not)
* Pulled a copy from Docker Hub
* Created a container with that image
* That image is programmed to output the text you see

Great, we know our setup is working correctly. There are many more things we could do with just 
Docker and the command line, but we will skip directly to a much more user-friendly (and commonly 
used in the workplace) tool: docker-compose.

## Docker-Compose   
<https://docs.docker.com/compose/compose-file/>

At it's simplest, we will want two files to get started, a docker-compose.yml file to specify our overall 
project structure and a Dockerfile with build instructions specific to our container (it can be done with 
just docker-compose.yml for simple situations where no modifications to the image are necessary).

### Simple Example

In the examples/example-1 directory you can find a very basic docker-compose.yml and Dockerfile, along with a 
small index.php file. We will create a simple apache server to start.

In the Dockerfile we will specify our image to download as the base of our container.  Conveniently, the 
official PHP docker builds contain a version with apache on a lightweight Linux distro, Alpine.

```
FROM php:7.4.4-apache
```

That's it, we are specifying the php project from Dockerhub, with a tag of 7.4.4-apache as a specifc build.

Next we must create our docker-compose.yml file, 

```yaml
version: '3'

services:
  e28-web:
    container_name: 'e28_apache'
    build: ./build
    ports:
      - "8080:80"
    volumes:
      - ./volume/html:/var/www/html
```

To start, we are using v3 of the docker-compose specification and specify that at the top.  The services 
section will contain information about each container we will be building (in this case one, our web server). 
We give the container a name (helpful in other commands).  

build provides the location of our Dockerfile with 
instructions for getting our image (just the directory name here, Dockerfile is assumed).  

Next, we are specifying how 
our system will access ports on the containers network.  We are mirroring port 80 of the container (standard HTTP port) 
to port 8080 on the localhost, so going to http://localhost:8080 will get content from port 80 in the container. We can 
link multiple ports (add another line), if we had other services or wanted to use 

Finally, we will link a volume to our container, in this case we are placing the directory containing our sample 
index.php file in the default apache server location `/var/www/html`

In this index.php we simply have 

```php
<?php
    phpinfo();
````

Which will display information about our PHP install and is a good test that our server is up and running.

Sources:    
[Docker Compose](https://docs.docker.com/compose/)

### Start it Up

Next we will build and start our container. Open a terminal and navigate to the directory with our 
docker-compose.yml file and run the command: `docker-compose up -d --build`

The up command will build and start all containers specificed in our yml file.  -d specifies that this action 
happens in the background (so when finished we will get our terminal back), and --build will rebuild any containers 
that have changed since the last build (not entirely necessary for build one).

You should see output similar to this (this was php:7.4.3-apache):

![Docker Compose Up](images/example-1-docker-compose-up.png)

Docker has pulled the image (and its intermediary images) and built our container.

If we navigate to http://localhost:8080 we should now see our phpinfo page:

![phpinfo](images/phpinfo.png)

Yay, we have a web server!

## Important Commands and Opening a Terminal

### Opening a terminal

Great, we have a server, but we need to be able to interact with it. One way to do that is 
by using the command `docker exec` which will run a command in our container.

From your terminal type:
 ```
 docker exec -it e28_apache /bin/bash
```

We pass the flags i and t for interactive (allows us to interact with the results of the command) TTY,
which allows a connection to the container.  We then pass the container name and command to run, in this 
case the bash shell.

![Terminal](images/example-1-terminal.png)

Here I've run a simple ls command in the container itself, showing the linked index.php from our volume.

Another way to open a terminal is through Docker Desktop's Dashboard.

On a Mac on can find the docker icon (a whale) on the top toolbar and right click, select Dashboard from 
the menu. On windows, find the same icon in the system tray, right click, and again, select Dashboard.



Sources:    
<https://docs.docker.com/engine/reference/commandline/exec/>    
<https://docs.docker.com/docker-for-mac/dashboard/> 

### Other Services (MySQL)
<https://medium.com/@crmcmullen/how-to-run-mysql-8-0-with-native-password-authentication-502de5bac661>

### Up, Start, Stop
<https://docs.docker.com/compose/reference/>
### Cleanup - images etc
<https://docs.docker.com/config/pruning/>

## Advanced Topics / Tips

### Orchestrating Many Containers
#### nginx-proxy 
<https://github.com/nginx-proxy/nginx-proxy>    
<https://blog.ippon.tech/set-up-a-reverse-proxy-nginx-and-docker-gen-bonus-lets-encrypt/>   
<http://jasonwilder.com/blog/2014/03/25/automated-nginx-reverse-proxy-for-docker/>  


### Other services
#### Mongo
<https://medium.com/faun/managing-mongodb-on-docker-with-docker-compose-26bf8a0bbae3>   
#### Node Server 
<https://nodejs.org/de/docs/guides/nodejs-docker-webapp/>   

### Saving to Docker Hub
<https://docs.docker.com/docker-hub/builds/>    

## Quickstart - The TLDR
TODO :: Will provide some examples of docker-compose.yml for simple to more complex setups