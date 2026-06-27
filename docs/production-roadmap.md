# Production Roadmap

This demo uses Google Sheets as a lightweight stand-in for production customer systems. A production Renewal Risk Command Center would replace or augment the spreadsheet with live business integrations.

## Phase 1: Demo Workflow

Current repo:

- Google Sheets for account and renewal data.
- Slack for human approval.
- Google Docs for approved action plans.
- Guild for agent runtime, validation, publishing, and triggers.

This phase proves the workflow shape:

```text
Detect risk -> propose action -> require approval -> document plan -> notify team
```

## Phase 2: CRM Context

Replace spreadsheet-only account context with CRM reads.

Candidate data:

- Account owner
- Renewal opportunity
- Renewal date
- Current stage
- Last CSM activity
- Executive sponsor
- Open tasks and next steps

The agent can still use Slack approval and Google Docs output, but the proposal becomes grounded in CRM data instead of static rows.

## Phase 3: Finance Context

Add finance and billing data to make risk scoring more useful.

Candidate data:

- ARR
- Invoice status
- Payment risk
- Contract value
- Expansion/contraction history
- Discounting or procurement flags

This enables recommendations like finance review, procurement escalation, or executive commercial outreach.

## Phase 4: Product And Support Signals

Add usage and support signals.

Candidate product data:

- Active users
- Feature adoption
- License utilization
- Usage trend

Candidate support data:

- Open critical tickets
- SLA breaches
- Escalations
- Customer sentiment

This turns the agent from a spreadsheet scanner into a cross-functional renewal risk analyst.

## Phase 5: Durable Workflow State

For production, approval state should be durable and auditable.

Potential additions:

- Store proposal ID, approver, timestamp, and Slack thread.
- Store generated document ID.
- Track status: proposed, approved, revised, held, completed.
- Add idempotency so repeated Slack events do not duplicate docs.

Guild sessions provide useful runtime history, but production workflows should also persist business state in a system owned by the application or customer.

## Phase 6: Deterministic Guardrails

As the workflow grows, move critical control flow out of prompt-only instructions.

Examples:

- Validate approval commands before tool execution.
- Enforce required fields before creating documents.
- Use typed templates for proposal and document content.
- Add integration tests around demo fixtures.
- Separate read-only analysis from write actions.

The Guild agent remains the orchestration layer, while deterministic code handles state transitions and safety checks.
