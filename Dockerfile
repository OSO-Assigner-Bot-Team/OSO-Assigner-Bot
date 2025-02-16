FROM node:22-bullseye-slim AS base
WORKDIR /usr/src/app

COPY --chown=node:node .yarn/ .yarn/
COPY --chown=node:node src/ src/
COPY --chown=node:node database/ database/
COPY --chown=node:node prisma/ prisma/


COPY --chown=node:node yarn.lock .
COPY --chown=node:node package.json .
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node .gitmodules .

RUN apt update -y && apt upgrade -y
RUN apt-get install -y build-essential \
    python3 python3-pip make g++ gcc \
    curl wget git unzip zip ca-certificates \
    openssl

# If Redis is in use
#RUN apt install -y redis

# If web scraping is in use
#RUN apt install -y chromium chromium-driver 

# If video or audio processing is involved
#RUN apt install -y ffmpeg

# If image processing is involved
#RUN apt-get install -y libvips libvips-dev


FROM base AS builder
COPY --chown=node:node tsconfig.json tsconfig.json
COPY --chown=node:node env.d.ts env.d.ts

RUN git config --global --add safe.directory /usr/src/app
RUN git init
RUN git submodule init
RUN git submodule update

RUN yarn install --immutable
RUN yarn dlx prisma generate
RUN yarn tsc --noEmitOnError

FROM base AS runner
COPY --chown=node:node .env .env
COPY --chown=node:node --from=builder /usr/src/app/dist dist
COPY --chown=node:node ./Entrypoint.sh Entrypoint.sh

RUN yarn workspaces focus --all --production
RUN chmod +x /usr/src/app/Entrypoint.sh
#RUN chown node:node /usr/src/application

RUN chown node:node /usr/src/app
USER node
ENTRYPOINT ["/usr/src/app/Entrypoint.sh"]