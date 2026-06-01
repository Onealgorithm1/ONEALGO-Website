# Third-Party Notices

This project is intended to integrate third-party open-source software without copying complete upstream repositories into this repository unless a separate license and compliance review approves vendoring.

Each third-party component remains subject to its original license terms.

| Component | Repository | Expected License | Intended Use | Integration Method | Notes |
|---|---|---:|---|---|---|
| OpenJarvis | https://github.com/open-jarvis/OpenJarvis | Apache-2.0, pending direct verification before production use | Agent runtime and orchestration layer | Git submodule or dependency | Preserve upstream LICENSE and NOTICE files. Track commit used. |
| Obsidian | https://obsidian.md | Proprietary application with plugin ecosystem | Local knowledge vault | Local installation | Do not commit private vault data unless approved. |
| Obsidian Mind | https://github.com/breferrari/obsidian-mind | MIT, pending direct verification before production use | Persistent agent memory vault pattern | Later phase | Preserve upstream license. |
| Obsidian Skills | https://github.com/kepano/obsidian-skills | MIT, pending direct verification before production use | Obsidian interaction guidance for agents | Later phase | Preserve upstream license. |
| Obsidian Second Brain | https://github.com/eugeniughelbur/obsidian-second-brain | MIT, pending direct verification before production use | Obsidian-based second-brain structure | Later phase | Preserve upstream license. |

## Rules

- Do not copy entire third-party repositories into this repository by default.
- Prefer Git submodules, package dependencies, or documented installation steps.
- Preserve all upstream license files, notices, and attribution requirements.
- Track the exact commit or version used for each third-party dependency.
- Review GPL, AGPL, SSPL, BUSL, or unclear/no-license projects before use.
- Do not commit secrets, tokens, private client data, or sensitive compliance evidence.

## Current Phase

Phase 1 is limited to OpenJarvis only. Obsidian and related memory plugins will be added after OpenJarvis is installed and tested locally.
