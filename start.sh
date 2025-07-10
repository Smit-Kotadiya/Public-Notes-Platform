#!bin/bash
minikube start

minikube addons enable ingress

kubectl create namespace pnp-smit

eval $(minikube docker-env)

docker build -t pnp-app ./backend

docker build -t pnp-mongo ./mongo

cd k8s

kubectl apply -f ./ --namespace=pnp-smit

kubect get pods --namespace=pnp-smit

