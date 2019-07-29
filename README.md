# Mason Slash Command for Slack

Interface with the [Mason](https://bymason.com/) Platform directly in Slack with `/mason`.

Built on [Now](https://zeit.co/docs).

:rocket:

## Prerequisites

- [Mason](https://platform.bymason.com/controller/) account
- [ZEIT](https://zeit.co) account and [Now CLI](https://zeit.co/docs#install-now-cli) ([Node](https://nodejs.org/en/download/) 8+)
- [Slack](https://slack.com/) account with a workspace to add your app to

## Setup

### Generate a Mason API key

1. On the Mason Platform Settngs page, create a new API key with the following options:
    * Name: `mason-slack`
    * Scopes: `fleet-read`
2. Securely store the generated key.
3. Then, using the Now CLI, run the following command from your terminal:

    * `$ now secrets add mason-api-key <YOUR_API_KEY>`

### Create a Slack app

1. Create an app at [https://api.slack.com/apps](https://api.slack.com/apps).
2. On the Basic Information page, copy the *Signing Secret*. Then, using the Now CLI, run the following command from your terminal:

    * `$ now secrets add slack-signing-secret <YOUR_SIGNING_SECRET>`

### Deploy

1. Clone this repository.
2. From the root directory of the cloned repository, use the Now CLI and run the following command from your terminal:
    * `$ now`
3. After the deployment completes, copy the URL to your deployed project. **This will be needed in *Add the `/mason` Slack Slash Command* below.**
    * Optionally, visit the project page in ZEIT and copy the 'ALIAS' URL

### Add the `/mason` Slack Slash Command

1. In Settings for your Slack app click on Slash Commands.
2. Click the 'Create New Command' button and fill in the following:
    * Command: `/mason`
    * Request URL: `<YOUR_ZEIT_PROJECT_URL>` (See *Deploy* above)
    * Short description: `Interface with the Mason Platform`
    * Usage hint: `help`
3. Save your new Slash Command

### Install your app

1. In Settings for your Slack app click on Install App and follow the prompts:
    * Click Install App to Workspace
    * Click Install

## Usage

Send `/mason` in Slack to use your new Slash Command.

## Features

- Get device information for a given device name

## Reference

- [Mason Platform](http://docs.bymason.com/)
- [ZEIT Now](https://zeit.co/docs/)
- [Slack Slash Commands](https://api.slack.com/slash-commands)
- [Slack request verification](https://api.slack.com/docs/verifying-requests-from-slack)
