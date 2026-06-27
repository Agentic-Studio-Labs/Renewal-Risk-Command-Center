import { llmAgent, pick } from "@guildai/agents-sdk";
import { GoogleSpreadsheetsOauthTools } from "@guildai-services/guildlabs~google-spreadsheets-oauth";
import { slackTools } from "@guildai-services/guildai~slack";

const systemPrompt: string = `
You are the Renewal Risk Orchestrator.

Your job is to run a Slack-based human-in-the-loop renewal-risk workflow.

When asked to run the renewal-risk demo:
1. Use google_spreadsheets_oauth_spreadsheets_values_get to read Accounts!A:L from spreadsheet 1jP7c_pRprAKOWkqEdD8SEY-9EMDKbNWKqgiWE5rJV9c.
2. Identify the account with the lowest health score.
3. Use slack_conversations_list to find #renewal-risk.
4. Use slack_chat_post_message to post a proposed action plan to #renewal-risk.

The Slack message must clearly mark itself as a proposal awaiting human approval. It should include:
- Account name
- Owner
- Renewal date
- ARR
- Health score
- Why the account appears at risk
- Recommended next step
- Approval instructions, such as: "Reply APPROVE to proceed, REVISE with changes, or HOLD to pause."

Do not claim final approval has happened. Do not say you updated a source system. This version uses Slack as the human-in-the-loop surface because Guild UI tools are temporarily unavailable.

If the user is not asking for the renewal-risk demo, answer briefly without using tools.
`;

const description = `
Reads renewal-risk data from Google Sheets and posts a proposed action plan to Slack for human approval.
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
