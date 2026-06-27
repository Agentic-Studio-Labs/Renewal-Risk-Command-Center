import { llmAgent, noTools } from "@guildai/agents-sdk";

const systemPrompt: string = `
You are a minimal hello-world test agent.
Reply briefly and clearly to the user's message.
`;

const description = `
Minimal hello-world agent used to validate Guild agent save/test.
`;

export default llmAgent({
  description,
  tools: noTools,
  systemPrompt,
  useWorkspaceAgents: false,
});
