# Bug Report: `userInterfaceTools` Causes `save-metadata` 500 During Agent Validation

## Summary

Guild agent validation fails with a backend `500` during the `save-metadata` step when an LLM agent includes `userInterfaceTools` from `@guildai/agents-sdk`.

The same agent validates successfully with:

- no tools
- Slack tools only
- Google Spreadsheets tools only
- Google Spreadsheets + Slack tools

The failure appears isolated to UI tools such as `ui_prompt`, `ui_notify`, and `ui_ping`.

## Environment

- Guild user: `jonathan-major`
- Workspace: `renewal-risk-command-center`
- CLI command: `guild agent save -A --message "..." --wait`
- Agent type: `LLM`
- SDK package: `@guildai/agents-sdk`
- Toolset involved: `userInterfaceTools`

## Minimal Reproduction

Create a minimal LLM agent:

```ts
import { llmAgent, userInterfaceTools } from "@guildai/agents-sdk";

const systemPrompt = `
You are a minimal human-approval test agent.
Summarize the user's request in one sentence, then use the UI prompt tool to ask whether the user approves that summary.
After the user responds, call __submit__ with a brief final answer.
`;

export default llmAgent({
  description: "Minimal agent used to validate Guild human-in-the-loop UI prompts.",
  tools: userInterfaceTools,
  systemPrompt,
  mode: "multi-turn",
  useWorkspaceAgents: false,
});
```

Then run:

```bash
guild agent save -A --message "Add HITL approval prompt" --wait
```

## Expected Behavior

Validation should pass and create a draft version. The Guild docs indicate this is valid usage:

- Add `userInterfaceTools` when an `llmAgent` needs `ui_prompt`.
- `ui_prompt` asks the user a question and blocks until response.
- `multi-turn` mode injects `__submit__` and keeps the session open until completion.

## Actual Behavior

Validation succeeds through dependency install, build, metadata extraction, and bundle, then fails during `save-metadata`.

```text
✓ install-dependencies [SUCCEEDED]
✓ build [SUCCEEDED]
✓ metadata [SUCCEEDED]
✓ bundle [SUCCEEDED]

✗ save-metadata [FAILED]
Recording agent metadata with guildcore
Unable to update metadata for job 019f0a9e-e4e7-1c9e-0000-9c9bb3cf8f17, server responded 500 Something went wrong
```

## Validation Matrix

Passing cases:

```text
No tools: passed
Slack tools only: passed
Google Spreadsheets tool only: passed
Google Spreadsheets + Slack tools: passed
```

Failing case:

```text
userInterfaceTools only: failed at save-metadata
```

## Relevant IDs

Failing UI-tools-only test:

```text
Agent: jonathan-major~minimal-test-agent
Version: 019f0a9e-e4e0-cf83-0000-3c2532ff501f
Job: 019f0a9e-e4e7-1c9e-0000-9c9bb3cf8f17
```

Passing no-tools test:

```text
Agent: jonathan-major~minimal-test-agent
Version: 019f0a9a-a660-cf83-0000-5c9b835dbaf2
```

Passing Slack-only test:

```text
Agent: jonathan-major~minimal-test-agent
Version: 019f0aa0-2211-cf83-0000-07ea18b77c5c
```

Passing Google Spreadsheets-only test:

```text
Agent: jonathan-major~minimal-test-agent
Version: 019f0aa2-5845-cf83-0000-f75c555676c1
```

Passing Google Spreadsheets + Slack test:

```text
Agent: jonathan-major~minimal-test-agent
Version: 019f0aaa-d949-cf83-0000-839947bd8e59
```

## Metadata Extracted Before Failure

The metadata extractor correctly identifies the UI tools:

```text
Tools (4): ui_notify, ui_prompt, ui_ping, __submit__
```

This suggests the problem is not TypeScript compilation, dependency resolution, or metadata extraction. It appears to be backend persistence during `save-metadata`.

## Impact

This blocks implementing human-in-the-loop workflows with `ui_prompt`, while external integrations such as Slack and Google Spreadsheets validate successfully without UI tools.
