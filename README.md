# OSO Assigner Bot
This is the self-assigning bot for the production for Open Source Objects, built with [discord.js](https://discord.js.org/), [prisma](https://www.prisma.io/) and [sapphire](https://www.sapphirejs.dev/).

## Features
This will be updated as more features are added.
* ~~Create, view, edit, and delete jobs~~
* ~~Give and remove roles~~

## Build
First, run `git clone https://github.com/OSO-Assigner-Bot-Team/OSO-Assigner-Bot.git` in a command prompt/terminal.

This bot requires [Docker](https://www.docker.com/) and [yarn](https://yarnpkg.com/) to be installed on your computer. 

To install the packages this bot uses, simply run `yarn install` in a command prompt/terminal in the root directory of this repo.

To build use `yarn build` and then `yarn generate` to install the bot on your machine.

If you are using docker containers run `yarn build:docker`

### Developement builds

For development builds you can use `yarn dev` or `yarn dev:docker` it will build and run in one command

## Configure

For the bot to function correctly you need to provide `.env` file in the root directory of the project. 

```env
token=replace-with-token
clientId=replace-with-application-id
guildId=replace-with-server-id
```

## Run
To run the bot locally on your computer, simply run `yarn start` in a command prompt/terminal in the root directory of this repo. To stop running, press `Ctrl` + `C`.

For Docker run `yarn start:docker` so the container can start and `yarn stop:docker` to close the container

## Contribute
1. Fork the repo with the button in the top right.
2. `git clone https://github.com/<yourusername>/OSO-Assigner-Bot.git`
3. [Create a branch](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository) for each of your changes.
4. Do your thing!
5. [Create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) from your fork's branch to the main repo's `main` branch.

For communication and resources, join the team's [Discord server](https://discord.gg/CXud8wdczn).

The Open Source Objects Show is made in [this Discord server](https://discord.gg/HR9Fnas9ax). And the show you can watch [here on Youtube](https://www.youtube.com/@OpenSourceObjects).
