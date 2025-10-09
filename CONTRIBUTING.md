Contributing Guidelines

Short rule — do NOT build or run the site locally

Rationale
- This repository is the canonical website source. Building/running locally can produce unintended environment differences (Ruby/Bundler/gems, node toolchains) and may cause accidental commits of generated files.
- To keep the repository stable for automated deployments, we avoid local builds unless necessary and done in an isolated environment.

What to do instead
- For small text/UI copy edits, update the source files (Markdown, Liquid templates, CSS) and open a PR. CI / preview environments will run the build.
- If you need to preview changes, use a disposable Docker environment or GitHub Codespaces with the exact Ruby/Bundler configuration. Example (recommended):
  - Use the repository's `Gemfile` and a pinned Bundler version inside a container or Codespace.

How to request a preview
- Open a PR and request a preview build (if available) or ask a maintainer to run a local preview in an approved environment.

Exceptions
- If you must build locally (complex JS/CSS changes, plugin debugging), first create a safety branch and stash or commit your WIP. Prefer running builds inside an isolated container or VM. Communicate on the PR and delete any generated artifacts before committing.

Contact
- For questions or help creating a reproducible preview, open an issue or mention a maintainer in the PR.

Note: The site builds reliably on GitHub Pages. Local builds require careful version matching (Ruby, Bundler, gems, and any Node toolchain) and may fail or produce different output if versions differ.
