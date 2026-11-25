#!/bin/bash
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  echo "Plotline needs Node.js 22.13 or newer. Install the LTS version from https://nodejs.org/ then open this launcher again."
  open https://nodejs.org/
  read -r -p "Press Enter to close."
  exit 1
fi
node -e 'const [a,b]=process.versions.node.split(".").map(Number);if(a<22||(a===22&&b<13))process.exit(1)' || { echo "Update Node.js to version 22.13 or newer at https://nodejs.org/"; read -r; exit 1; }
if [ ! -d node_modules/jose ]; then
  npm ci --omit=dev --ignore-scripts --no-audit --no-fund || { echo "The helper dependency could not be installed. Check your internet connection and try again."; read -r; exit 1; }
fi
node server.mjs
read -r -p "Plotline helper stopped. Press Enter to close."
