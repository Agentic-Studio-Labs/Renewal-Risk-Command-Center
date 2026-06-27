# Setup Guide

This guide sets up the Renewal Risk Command Center demo with Guild, Slack, Google Sheets, and Google Docs.

## Prerequisites

- A Guild account and workspace.
- Guild CLI installed and authenticated.
- A Slack workspace where you can install/connect the Guild Slack app.
- A Google account that can read the demo spreadsheet and create Google Docs.
- Node.js and npm for local TypeScript development.

## Install And Authenticate Guild CLI

Install the Guild CLI using the current Guild instructions for your environment, then authenticate:

```bash
guild auth login
guild doctor
```

Select or confirm the workspace used for testing:

```bash
guild workspace list
guild workspace select <owner/workspace-name>
guild workspace current
```

## Configure The Guild npm Registry

Guild packages are served from the Guild npm registry. For local development, copy the example npm config:

```bash
cp .npmrc.example .npmrc
npm install
```

`.npmrc` is ignored so local registry/auth configuration does not need to be committed.

## Connect Required Credentials

In Guild, open the workspace credentials page and connect these integrations:

- `guildai~slack`
- `guildlabs~google-spreadsheets-oauth`
- `guildlabs~google-docs-oauth`

`guildlabs~google-drive` alone is not enough. Guild treats Google Drive, Google Spreadsheets, and Google Docs as separate integrations with separate OAuth credentials.

You can verify connected credentials from the CLI:

```bash
guild credentials list --owner <guild-user-or-org>
```

Expected integrations:

```text
guildai~slack
guildlabs~google-spreadsheets-oauth
guildlabs~google-docs-oauth
```

## Prepare The Spreadsheet

Create a Google Sheet with a tab named `Accounts`.

Use the columns in `examples/accounts.csv`:

```text
Account,Segment,Owner,Renewal Date,ARR,Health Score,Risk Status,Primary Risk,Recommended Action,Executive Sponsor,Last Touch,Notes
```

Share the spreadsheet with the Google account used for the Guild Google Spreadsheets OAuth credential.

Update `agent.ts` if you use a different spreadsheet ID or range:

```ts
google_spreadsheets_oauth_spreadsheets_values_get
```

Current demo range:

```text
Accounts!A:L
```

## Configure Slack

Create or choose a Slack channel, for example:

```text
#renewal-risk
```

Configure a Guild Slack `app_mention` trigger for the workspace agent. If the trigger asks for channels, select the Slack channel used for the demo.

The agent uses the incoming Slack webhook payload's `event.channel` value when available, so it does not need to search Slack by channel name for webhook-triggered runs.

## Publish The Agent

From the repo root:

```bash
guild agent save -A --message "Initial renewal risk command center" --publish --wait --bump patch
```

The command stages changes, commits, pushes, validates, and publishes the agent.

For a validation-only draft:

```bash
guild agent save -A --message "Validate renewal risk command center" --wait --bump patch
```

## Smoke Tests

Read the spreadsheet without posting to Slack:

```bash
guild chat \
  --agent <owner>~<agent-name> \
  --workspace <owner/workspace-name> \
  --once \
  "Run a credentials smoke test only: read Accounts!A:L from spreadsheet <spreadsheet-id> using Google Sheets, then stop. Do not post to Slack or create Google Docs."
```

Run the real Slack demo:

```text
@Guild run a renewal-risk scan
```

Approve the proposal:

```text
@Guild APPROVE
```

## Troubleshooting

If Sheets access fails, confirm `guildlabs~google-spreadsheets-oauth` is connected and that the OAuth account can open the spreadsheet.

If Docs creation fails, confirm `guildlabs~google-docs-oauth` is connected and that the OAuth account can create documents.

If Slack cannot find the channel, confirm the Slack trigger is configured for the expected channel. For Slack-triggered sessions, the agent should use `event.channel` directly.

If Slack messages show website previews, confirm `slack_chat_post_message` calls include or are instructed to use `unfurl_links: false` and `unfurl_media: false`.
