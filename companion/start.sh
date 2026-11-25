#!/bin/sh
cd "$(dirname "$0")" || exit 1
command -v node >/dev/null 2>&1 || { echo 'Install Node.js 22.13+ from https://nodejs.org/'; exit 1; }
[ -d node_modules/jose ] || npm ci --omit=dev --ignore-scripts --no-audit --no-fund || exit 1
exec node server.mjs
