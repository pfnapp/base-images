# Application patch manifest conventions

Each `patches/<app>/runtime-manifest.json` describes the image declared by that
directory's Dockerfile. `tunables` contains variables consumed by the upstream
image. `required` means the image cannot perform its documented function
without a value; `optional` means upstream supplies a default or the feature is
disabled. `default` is only present when upstream documents a default. `example`
is a non-secret, syntactically valid sample. `safe` means the example is safe
for local validation and does not enable an external integration.

The patch Dockerfiles add no environment-variable wrapper or entrypoint.
Therefore there are no PFN wrapper variables; all listed variables are upstream
variables. Secrets are represented only by placeholders and are never supplied
by the samples.
