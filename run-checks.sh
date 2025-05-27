#!/bin/bash

echo "=== Running ESLint ==="
npm run lint

echo -e "\n\n=== Running Prettier Format ==="
npm run format

echo -e "\n\n=== Running ESLint again after formatting ==="
npm run lint

echo -e "\n\n=== Running Build ==="
npm run build

echo -e "\n\n=== All checks completed ==="