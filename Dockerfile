FROM cgr.dev/chainguard/node:latest-dev AS build-env
ADD . /app
WORKDIR /app
RUN npm install --omit=dev

FROM cgr.dev/chainguard/node:latest
COPY --from=build-env /app /app
WORKDIR /app
EXPOSE 5002
CMD ["node", "index.js"]
