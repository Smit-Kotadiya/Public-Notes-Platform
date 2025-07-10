
This is a setup guide to lauching this Web-based Public Notes Platform application

***<span color=red>IMPORTANT
If in /backend/frontend there is a file Login.html rename it to login.html</span>***

It can be done in two ways:
1. Using Docker and Haproxy
2. Using Kubernetes and Minikube

## Using Docker and Haproxy

In the CLI, the working direcrory should be in the root directory 
public-notes-platform/>
Command:
  docker-compose build
     //once built, type
  docker compose up

If you see the error Cannor GET /app/frontend/login.html

It is because, the name of login file in container is "Login.html" and Index.js is looking for "login.html"
#tried to change the file name in root directory but did not work

Now we need to manually rename the file

docker ps | grep ...
Docker exec -it  bash
mv frontend/Login.html frontend/login.html

  

Open [Link Text](localhost:80)

To check if load-balancer  is working, open in another tab:
[Link Text](localhost:8404/stats)

In the second table, under Session section, check for Total, the more you will refresh the browser at port 80 , the more the Number for total will increase for both the versions of app.


## Using Kubernetes and Minikube:

Be on root directory
public-notes-platform/>
Commands:
minikube start

#optional, if already ingress enabled
minikube addons enable ingress

create namespace pnp-smit

eval $(minikube docker-env)

Docker build -t pnp-app:latest ./backend

Docker build -t pnp-mongo:latest ./mongo

kubectl apply -f ./k8s --namespace=pnp-smit

Check if all the pods are running, if yes the go with changing in /etc/hosts the localhost IP setup:

minikube ip

sudo nano /etc/hosts

Add
(minikube ip) app.local

Save and exit

minikube tunnel

In browser open:
[Link Text](http://app.local)

If this shows error:
Cannot GET /app/frontend/login.html

It is because, the name of login file in container is "Login.html" and Index.js is looking for "login.html"
#tried to change the file name in root directory but did not work

Now we need to manually rename the file

Docker exec -it  bash
mv frontend/Login.html frontend/login.html


How the App. works
You directly Land on Login page. If you are not registered, just write any E-mail and login, a new user account will be created for you.

Then you will land of Personal Feed page, here you can create your own Notes using "+" button. For hashtags, you can attach multiple tags with or without hashtags(they must be separated by commas). As soon you press create button it will ask for confirmation and note will be created.

After that you can see your notes on the same page, you have option to edit or delete your notes

From the upper left corner, you can navigate to Search Notes or Search User's Notes or Personal Feed/Create Notes page, each page have option to navigate to other two.

On Search Notes page you can search Notes by tags, there are two additional filters if you are searching with multiple tags
Match any tags: This will search for each tag individually and return all the Notes that contains any of these tags in the search field

Match all tags: This will return all the Notes, that specifically has all of the tags in the search field

Search User's Note
On this page you can see all the other User's with their username and their respective email, to view Notes of a particular user, click on his email.
You need to have atleast two User's registered to see any User their