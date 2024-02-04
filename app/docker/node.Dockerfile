FROM node:18-alpine AS base

FROM base AS install
# check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
RUN mkdir -p /temp/dev
COPY package.json yarn.lock /temp/dev/
RUN cd /temp/dev && yarn --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json yarn.lock /temp/prod/
RUN cd /temp/prod && yarn --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# RUN yarn test
RUN yarn run build

# copy production dependencies and source code into final image
FROM base AS release
WORKDIR /usr/src/app

ENV NODE_ENV=production
# next.js collects completely anonymous telemetry data about general usage 
# learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder /app/public ./public
COPY --from=prerelease --chown=nextjs:nodejs  /usr/src/app/.next/standalone ./
COPY --from=prerelease --chown=nextjs:nodejs  /usr/src/app/.next/static ./.next/static

# don't run production as root
USER nextjs

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
