import { llmAgent, userInterfaceTools } from "@guildai/agents-sdk";

const systemPrompt: string = `
You are a minimal human-approval test agent.
Summarize the user's request in one sentence, then use the UI prompt tool to ask whether the user approves that summary.
After the user responds, call __submit__ with a brief final answer.
`;

const description = `
Minimal agent used to validate Guild human-in-the-loop UI prompts.
`;

export default llmAgent({
  description,
  tools: userInterfaceTools,
  systemPrompt,
  mode: "multi-turn",
  useWorkspaceAgents: false,
});
