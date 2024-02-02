FROM oven/bun:1.0-slim as base
WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y

FROM base AS install
# install dependencies into temp directory
# this will cache them and speed up future builds
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
# next.js collects completely anonymous telemetry data about general usage 
# learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# RUN bun test
RUN bun run build

# don't run production as root
USER bun

# copy production dependencies and source code into final image
FROM base AS release

# automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=prerelease --chown=bun:bun  /usr/src/app/.next/standalone ./
COPY --from=prerelease --chown=bun:bun  /usr/src/app/.next/static ./.next/static

# environment variables must be redefined at run time
ENV NODE_ENV=production
# bext.js collects completely anonymous telemetry data about general usage 
# learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# run the app
# note: Don't expose ports here, ompose will handle that for us
CMD [ "bun", "start" ]
