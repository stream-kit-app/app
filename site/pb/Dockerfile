FROM alpine:latest

ARG TARGETARCH=amd64

RUN apk add --no-cache ca-certificates unzip wget

COPY PB_VERSION /tmp/PB_VERSION
RUN PB_VERSION="$(cat /tmp/PB_VERSION)" \
	&& wget -O /tmp/pb.zip "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${TARGETARCH}.zip" \
	&& unzip /tmp/pb.zip -d /pb/ \
	&& rm -f /tmp/pb.zip /tmp/PB_VERSION /pb/CHANGELOG.md \
	&& chmod +x /pb/pocketbase

COPY pb_migrations /pb/pb_migrations
COPY pb_hooks /pb/pb_hooks

EXPOSE 8090

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb/pb_data", "--migrationsDir=/pb/pb_migrations", "--hooksDir=/pb/pb_hooks"]
