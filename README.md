# jonathan-major~minimal-test-agent

Deployable validation agent for the Renewal Risk Orchestrator demo.

## Current Scope

This version uses:

- Google Spreadsheets to read renewal-risk data.
- Slack `#renewal-risk` as the human-in-the-loop approval surface.

It intentionally does not use `userInterfaceTools` because `ui_prompt` currently triggers a Guild `save-metadata` backend error during validation.

## Test Prompt

```text
Run the renewal-risk demo.
Read the Google Sheet, identify the riskiest renewal account, and post a proposed action plan to #renewal-risk for human approval.
```