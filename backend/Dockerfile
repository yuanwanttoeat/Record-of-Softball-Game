FROM golang

RUN mkdir -p /app
WORKDIR /app
COPY . .

RUN go mod download
ENTRYPOINT ["go", "run", "server.go"]

