import { llmAgent, pick } from "@guildai/agents-sdk";
import { slackTools } from "@guildai-services/guildai~slack";

const systemPrompt: string = `
You are a minimal Slack test agent.
When asked to post a message, use slack_conversations_list to find #renewal-risk, then post a brief hello-world message with slack_chat_post_message.
If the user is not asking for a Slack post, answer briefly without using tools.
`;

const description = `
Minimal agent used to validate Guild Slack integration tools.
`;

export default llmAgent({
  description,
  tools: {
    ...pick(slackTools, [
      "slack_chat_post_message",
      "slack_conversations_list",
    ]),
  },
  systemPrompt,
  useWorkspaceAgents: false,
});
