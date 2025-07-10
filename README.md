# 📝 Web-based Public Notes Platform – Setup Guide

This guide walks you through launching the Public Notes Platform web application using either Docker + HAProxy or Kubernetes + Minikube.

---

## ❗ IMPORTANT

If the file `/backend/frontend/Login.html` exists, rename it to `login.html`.  
This is required because the app expects lowercase `login.html`.

---

## 🚀 Launch Options

You can launch this application using one of the following methods:

1. [Using Docker and HAProxy](#-option-1-using-docker-and-haproxy)  
2. [Using Kubernetes and Minikube](#-option-2-using-kubernetes-and-minikube)

---

## 🐳 Option 1: Using Docker and HAProxy

### 📘 Step 1: Move to the project root directory

```bash
cd public-notes-platform/

docker-compose build
 #once built, then
docker compose up
```
❗If you see the error Cannor GET /app/frontend/login.html
   It is because, the name of login file in container is "Login.html" and Index.js is looking for "login.html"
   (tried to change the file name in root directory but did not work)

Now we need to manually rename the file

```bash
docker ps 
 #find the "Container ID" for "backend-frontend1" and run:
docker exec -it (container_id) bash
 #In bash type:
mv frontend/Login.html frontend/login.html
```
Do the same for backend-frontend2

## 🚀 Ready to Launch

Open [localhost](localhost:80)

To check if load-balancer  is working, open in another tab:
[localhost](localhost:8404/stats)

In the second table, under Session section, check for Total, the more you will refresh the browser at port 80 , the more the Number for total will increase for both the versions of app.

---

## 🐳 Option 1: Using Kubernetes and Minikube

### 📘 Step 1: Move to the project root directory

```bash
cd public-notes-platform

sudo chmod +x start.sh

./start.sh
  #start.sh contains following commands in the same sequence

    #minikube start
    #minikube addons enable ingress
    #create namespace pnp-smit
    #eval $(minikube docker-env)
    #docker build -t pnp-app:latest ./backend
    #docker build -t pnp-mongo:latest ./mongo
    #cd k8s
    #kubectl apply -f ./ --namespace=pnp-smit
    #minikube ip
```
Further commands:

  sudo nano /etc/hosts

  Add following line at the top:
  (minikube ip) app.local

Save and exit

minikube tunnel

In browser open:
[app.local](http://app.local)

❗If you see the error Cannor GET /app/frontend/login.html
   It is because, the name of login file in container is "Login.html" and Index.js is looking for "login.html"
   (tried to change the file name in root directory but did not work)

Now we need to manually rename the file

```bash
docker ps 
 #find the "Container ID" for "backend-frontend1" and run:
docker exec -it (container_id) bash
 #In bash type:
mv frontend/Login.html frontend/login.html
```
Do the same for backend-frontend2

Refresh the browser



# ⚙️How the App. works
        You directly Land on Login page. If you are not registered, just write any E-mail and login, a new user account will be created for you. Then the user will land on Personal Feed/Create Notes page.

  ## Personal Feed page/ Craete Notes
          here you can create your own Notes using "+" button. For hashtags, you can attach multiple tags with or without hashtags(they must be separated by commas). As soon you press create button it will ask for confirmation and note will be created.

          After that you can see your notes on the same page, you have option to edit or delete your notes

          From the upper left corner, you can navigate to Search Notes or Search User's Notes or Personal Feed/Create Notes page, each page have option to navigate to other two.
                  
  ## Search Notes:
          Here you can search Notes by tags, there are two additional filters if you are searching with multiple tags
            Match any tags: This will search for each tag individually and return all the Notes that contains any of these tags in the search field

            Match all tags: This will return all the Notes, that specifically has all of the tags in the search field

  ## Search User's Note:
          On this page you can see all the other User's with their username and their respective email, to view Notes of a particular user, click on his email.
          You need to have atleast two User's registered to see any User their