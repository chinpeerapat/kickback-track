FROM node:20 AS builder

ARG RAILWAY_TOKEN
ARG CLOUDFLARE_ANALYTICS_TOKEN
ENV NEXT_OUTPUT=standalone

WORKDIR /app
COPY . .

RUN npm ci

ENV NODE_ENV=production
RUN npx nx build web -c=production

FROM node:20-alpine AS runner
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/apps/web/public ./apps/web/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

ENV NODE_ENV production
ENV PORT 3000
# Make RAILWAY_TOKEN and CLOUDFLARE_ANALYTICS_TOKEN available at runtime
# Do NOT set the value here for secrets! Pass them with `docker run -e RAILWAY_TOKEN=... -e CLOUDFLARE_ANALYTICS_TOKEN=...`
ENV RAILWAY_TOKEN=
ENV CLOUDFLARE_ANALYTICS_TOKEN=

EXPOSE 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node apps/web/server.js

