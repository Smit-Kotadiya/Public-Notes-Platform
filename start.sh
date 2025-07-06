#!bin/bash

kubectl create namespace pnp-smit

kubectl apply -f app-deployment.yaml -n pnp-smit
kubectl apply -f app-service.yaml -n pnp-smit
kubectl apply -f app-ingress.yaml -n pnp-smit

#Used Helm because my native Architecture was not Compataible with Ingress's Architecture. Ingress-Nginx-Controller kept Crashing
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace

kubectl port-forward pod/ingress-nginx-controller-578c564c54-9mqqv 8080:80 -n ingress-nginx
