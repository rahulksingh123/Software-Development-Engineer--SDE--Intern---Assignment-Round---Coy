# Part A — Two core feature suggestions for Coy


# 1. Private invite and crush-status tracker

**Feature:** Give users a simple status timeline for each invite or crush entry: *invite link created*, *invite opened* (only if privacy-safe and consented), *verification pending*, and *completed*. Include a one-tap option to resend or revoke an invite. Never show whether a particular person has liked you unless there is a mutual match; avoid status details that could indirectly expose someone else's choice.

**Why it matters:** A flow that involves OTP, email verification, and an invite link can leave users wondering whether they finished setup or need to do something next. Clear progress and recoverable invites reduce confusion and drop-off while preserving Coy's double-blind promise. Measure completion rate and invite-to-signup conversion without exposing private crush data.

## 2. Privacy controls and consent-first Discover

**Feature:** Let users explicitly opt in or out of being shown in Discover, with controls to hide their profile, block/report someone, and pause discovery without losing existing matches. Explain visibility before opting in; make reporting and blocking accessible from each card and match.

**Why it matters:** Coy handles sensitive romantic interest. A swipe-based extension introduces visibility to people outside the original invite/crush flow. Clear consent and safety controls prevent unexpected exposure, improve trust, and reduce harassment risk. Measure opt-in rate, blocks/reports per active user, and match quality rather than raw swipes.

## Product trade-off

Discover should be an **optional, clearly separated mode**. Existing crush interactions remain private. Neither the UI nor the API should reveal incoming likes unless the two people have mutually liked each other. The assignment prototype implements this backend privacy invariant, but not full account-level consent and moderation workflows.
