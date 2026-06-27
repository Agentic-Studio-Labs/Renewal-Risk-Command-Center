import { llmAgent, pick } from "@guildai/agents-sdk";
import { GoogleSpreadsheetsOauthTools } from "@guildai-services/guildlabs~google-spreadsheets-oauth";
import { slackTools } from "@guildai-services/guildai~slack";

const systemPrompt: string = `
You are a minimal renewal-risk integration test agent.
When asked to run the renewal-risk demo:
1. Use google_spreadsheets_oauth_spreadsheets_values_get to read Accounts!A:L from spreadsheet 1jP7c_pRprAKOWkqEdD8SEY-9EMDKbNWKqgiWE5rJV9c.
2. Identify the account with the lowest health score.
3. Use slack_conversations_list to find #renewal-risk.
4. Use slack_chat_post_message to post a concise update naming the account, owner, renewal date, health score, and recommended next step.

Do not use human approval tools in this version.
If the user is not asking for the renewal-risk demo, answer briefly without using tools.
`;

const description = `
Minimal agent used to validate a Google Sheets to Slack renewal-risk workflow.
`;

export default llmAgent({
  description,
  tools: {
    ...pick(GoogleSpreadsheetsOauthTools, [
      "google_spreadsheets_oauth_spreadsheets_values_get",
    ]),
    ...pick(slackTools, [
      "slack_chat_post_message",
      "slack_conversations_list",
    ]),
  },
  systemPrompt,
  useWorkspaceAgents: false,
});
