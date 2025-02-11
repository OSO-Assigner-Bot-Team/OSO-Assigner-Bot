FROM node:23-bullseye-slim AS base
WORKDIR /usr/src/application

# Clone source files
COPY --chown=node:node commands/ commands/
COPY --chown=node:node src/ src/
COPY --chown=node:node deploy-commands.js .
COPY --chown=node:node index.js .
COPY --chown=node:node package.json .
COPY --chown=node:node .env .

# Setting up Yarn
RUN yarn set version stable

FROM base AS builder
RUN yarn install
RUN yarn node ./deploy-commands.js

FROM base AS runner
RUN yarn workspaces focus --all --production
RUN chown node:node /usr/src/application

USER node
CMD ["yarn", "node", "index.js"]