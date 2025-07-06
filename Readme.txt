It may happen that Host Root user has conflict with mongodb user. This may led to mongodb user not able to access
the WhiteTiger files stored in persistent storage.
In that case an alpine conatiner has to be temporarily downloaded and using chown change the permission of that folder so mongodb can access it.
I wrote: docker run --rm -v publicnotesplatform_mongo-data:/data alpine chown -R 499:486 /data

Check the localhost:8404/stats -username: admin -password: admin, to see if Haproxy is working. In the second table see the Total column in 
session section. Refresh the login page at port 80 to see the Total number grow.

#pull ingress


# Clean up any broken installation
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
choco install kubernetes-helm (in administrator mode)
helm uninstall ingress-nginx -n ingress-nginx
kubectl delete namespace ingress-nginx

# Reinstall the official ingress-nginx
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx --create-namespace
