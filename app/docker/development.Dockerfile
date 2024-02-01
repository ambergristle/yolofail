FROM oven/bun:1.0-slim as base
WORKDIR /usr/app

RUN apt-get update -y && apt-get install -y

FROM base AS install
# install dependencies into temp directory
# this will cache them and speed up future builds
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=development
# bext.js collects completely anonymous telemetry data about general usage 
# learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# run the app
# note: Don't expose ports here, compose will handle that for us
CMD [ "bun", "dev" ]
