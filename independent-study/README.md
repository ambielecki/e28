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

Quite simply, an image is the blueprint for our docker container.

Sources:
[Docker - Overview](https://docs.docker.com/engine/docker-overview/)


#### Containers

Sources:  
[Docker - What is a Container](https://www.docker.com/resources/what-container)


#### Volumes

### Why Use Docker over XAMPP?
### Other Options (VMs)

## Installation

### System Requirements
<https://docs.docker.com/docker-for-windows/install/>
<https://docs.docker.com/docker-for-mac/install/>

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

### docker-compose.yml
### Dockerfile
### Linking your files (volumes)
<https://docs.docker.com/docker-for-mac/osxfs-caching/>
### Other Services (MySQL)
<https://medium.com/@crmcmullen/how-to-run-mysql-8-0-with-native-password-authentication-502de5bac661>

## Important Commands

### Opening a terminal
<https://docs.docker.com/engine/reference/commandline/exec/>
<https://docs.docker.com/docker-for-mac/dashboard/>
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