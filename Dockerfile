FROM node:23-bullseye-slim AS base
WORKDIR /usr/src/application

# Clone source files
COPY --chown=node:node commands/ commands/
COPY --chown=node:node src/ src/
COPY --chown=node:node deploy-commands.js .
COPY --chown=node:node index.js .
COPY --chown=node:node package.json .
COPY --chown=node:node entrypoint.sh /entrypoint.sh
#COPY --chown=node:node .env .

ENV OAB_TOKEN=null
ENV OAB_GUILD=null
ENV OAB_CLIENT=null

# Setting up Yarn
RUN yarn set version stable

FROM base AS builder
RUN yarn install
RUN yarn node ./deploy-commands.js

FROM base AS runner
RUN yarn workspaces focus --all --production
RUN chmod +x /entrypoint.sh
RUN chown node:node /usr/src/application

USER node
ENTRYPOINT ["/entrypoint.sh"]