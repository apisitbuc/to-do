docker run --name redis -d -p 6379:6379 \
-e ALLOW_EMPTY_PASSWORD=yes \
bitnami/redis:latest
