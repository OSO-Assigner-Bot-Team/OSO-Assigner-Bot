# OSO Assigner Bot
This is the self-assigning bot for the production for Open Source Objects, built with [discord.js](https://discord.js.org/).

## Features
This will be updated as more features are added.
* Create, view, and delete jobs

## Install
First, run `git clone https://github.com/OSO-Assigner-Bot-Team/OSO-Assigner-Bot.git` in a command prompt/terminal.

This bot requires [Node.js](https://nodejs.org) and npm to be installed on your computer. Installing Node.js also automatically installs npm.

To install the packages this bot uses, simply run `npm install` in a command prompt/terminal in the root directory of this repo.

## Configure

For the bot to function correctly you need to provide `config.dev.json` file in the root directory of the project. 

```json
{
	"token": "replace-with-token",
	"clientId": "replace-with-application-id",
	"guildId": "replace-with-server-id"
}
```

## Run
To run the bot locally on your computer, simply run `node . ./config.dev.json` in a command prompt/terminal in the root directory of this repo. The first argument need to point towards `config.dev.json` to access the secret token. To stop running, press `Ctrl` + `C`.

## Contribute
1. Fork the repo with the button in the top right.
2. `git clone https://github.com/<yourusername>/OSO-Assigner-Bot.git`
3. [Create a branch](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository) for each of your changes.
4. Do your thing!
5. [Create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) from your fork's branch to the main repo's `main` branch.

For communication and resources, join the team's [Discord server](https://discord.gg/CXud8wdczn).

The Open Source Objects Show is made in [this Discord server](https://discord.gg/HR9Fnas9ax). And the show you can watch [here on Youtube](https://www.youtube.com/@OpenSourceObjects).
