FROM node:18-alpine AS base
WORKDIR /usr/src/app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

FROM base AS install
# install dependencies into temp directory
# this will cache them and speed up future builds
RUN mkdir -p /temp/dev
COPY package.json yarn.lock /temp/dev/
RUN cd /temp/dev && yarn install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json yarn.lock /temp/prod/
RUN cd /temp/prod && yarn install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
# next.js collects completely anonymous telemetry data about general usage 
# learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# RUN yarn test
RUN yarn run build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN chown nextjs:nodejs .next

# copy production dependencies and source code into final image
FROM base AS release

# automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder /app/public ./public
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease --chown=nextjs:nodejs  /usr/src/app/.next/standalone ./
COPY --from=prerelease --chown=nextjs:nodejs  /usr/src/app/.next/static ./.next/static

# don't run production as root
USER nextjs

# environment variables must be redefined at run time
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# run the app
# note: Don't expose ports here, compose will handle that for us
# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["yarn", "start"]
