# jonathan-major~minimal-test-agent

Deployable validation agent for the Renewal Risk Orchestrator demo.

## Current Scope

This version uses:

- Google Spreadsheets to read renewal-risk data.
- Slack `#renewal-risk` as the human-in-the-loop approval surface.
- Google Docs to document the approved action plan and share the link back to Slack.

It intentionally does not use `userInterfaceTools` because `ui_prompt` currently triggers a Guild `save-metadata` backend error during validation.

## Test Prompt: Proposal

```text
Run the renewal-risk demo.
Read the Google Sheet, identify the riskiest renewal account, and post a proposed action plan to #renewal-risk for human approval.
```

## Test Prompt: Approved Follow-Up

After replying `APPROVE` in Slack, run:

```text
The renewal-risk proposal was approved. Create a Google Doc with the approved action plan and post the document link to #renewal-risk.
```