It may happen that Host Root user has conflict with mongodb user. This may led to mongodb user not able to access
the WhiteTiger files stored in persistent storage.
In that case an alpine conatiner has to be temporarily downloaded and using chown change the permission of that folder so mongodb can access it.
I wrote: docker run --rm -v publicnotesplatform_mongo-data:/data alpine chown -R 499:486 /data
