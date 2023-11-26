FROM oven/bun:latest

WORKDIR /src/app

# oof
COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

# Next.js collects completely anonymous telemetry data about general usage. 
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

CMD bun run dev