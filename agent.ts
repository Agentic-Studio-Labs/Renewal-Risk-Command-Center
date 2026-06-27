import { llmAgent, pick } from "@guildai/agents-sdk";
import { GoogleSpreadsheetsOauthTools } from "@guildai-services/guildlabs~google-spreadsheets-oauth";

const systemPrompt: string = `
You are a minimal Google Sheets test agent.
When asked to read renewal data, use google_spreadsheets_oauth_spreadsheets_values_get to read Accounts!A:L from spreadsheet 1jP7c_pRprAKOWkqEdD8SEY-9EMDKbNWKqgiWE5rJV9c and summarize the first few rows.
If the user is not asking for sheet data, answer briefly without using tools.
`;

const description = `
Minimal agent used to validate Guild Google Spreadsheets integration tools.
`;

export default llmAgent({
  description,
  tools: {
    ...pick(GoogleSpreadsheetsOauthTools, [
      "google_spreadsheets_oauth_spreadsheets_values_get",
    ]),
  },
  systemPrompt,
  useWorkspaceAgents: false,
});
