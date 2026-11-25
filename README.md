[![Bounty](https://make.fun/badge/u-xvader-the-funniest-honest-appliance-error-adec4450.svg)](https://make.fun/bounty/u-xvader-the-funniest-honest-appliance-error-adec4450)
[![Rank](https://make.fun/badge/u-xvader-the-funniest-honest-appliance-error-adec4450/prosky1/u-xvader-the-funniest-honest-appliance-error-adec4450-entry/rank.svg)](https://make.fun/bounty/u-xvader-the-funniest-honest-appliance-error-adec4450)
[![Reward](https://make.fun/badge/u-xvader-the-funniest-honest-appliance-error-adec4450/prosky1/u-xvader-the-funniest-honest-appliance-error-adec4450-entry/reward.svg)](https://make.fun/bounty/u-xvader-the-funniest-honest-appliance-error-adec4450)

# The Funniest Honest Appliance Error

A washing machine reports, in its own flat voice, that the wash is done — and that one sock is missing, it knows where it is, and it is not telling you.

Entry for the [make.fun bounty](https://make.fun/bounty/u-xvader-the-funniest-honest-appliance-error-adec4450): one line, at most 200 characters, the funniest honest error message an appliance could show.

## How it works

`main.ts` (Node 22, no dependencies) assembles the line from four short statements, validates it — single line, 1–200 characters, no control characters, ends on a full stop — then writes it to `/output/entry.txt` and reads it back to confirm the file matches exactly.

Run it locally:

```sh
node main.ts
```

## The line

> I finished the wash. One sock is missing. I know where it is. I am not telling you.
