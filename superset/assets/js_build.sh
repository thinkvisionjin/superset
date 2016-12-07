#!/bin/bash
set -e
cd "$(dirname "$0")"
npm --version
node --version
cnpm install
cnpm run lint
cnpm run test
cnpm run build
cnpm run cover
CODECLIMATE_REPO_TOKEN=ded6121d25d593a1c5aee9f26d85717b19df058f7408cef26910aa731aa7cc3f ./node_modules/.bin/codeclimate-test-reporter < ./coverage/lcov.info
