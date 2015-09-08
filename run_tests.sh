#!/bin/bash

set -eu

function usage {
  echo "Usage $0 [OPTION]..."
  echo "Run meteor-gazelle test suite(s)"
  echo ""
  echo "  -t, --unit-tests  Only run unit tests"
  echo "  -l, --lint-tests  Only run eslint"
  echo ""
  echo "If no options are specified, unit tests and eslint will be run"
  exit
}

function process_options {
  i=1
  while [ $i -le $# ]; do
    case "${!i}" in
      -h|--help) usage;;
      -t|--unit-tests) run_unit_tests=1;;
      -l|--lint-tests) run_lint_tests=1;;
      -*) echo "Error: Unknown option ${!i}" && usage;;
    esac
    (( i++ ))
  done
}

function fail {
  echo "Error: $1"
  exit 1
}

function run_tests {
  # ensure environment is set up
  which meteor > /dev/null || fail "meteor command not found; run 'curl https://install.meteor.com | /bin/sh' to install meteor"
  which velocity > /dev/null || fail "velocity command not found; run 'npm install -g velocity-cli' to install velocity"
  [ -f settings.json ] || fail "settings.json not found; run 'cp settings.json.template settings.json'"

  # do the thing
  velocity test-package ./packages/* --settings settings.json --ci --release velocity:METEOR@1.1.0.3_1
}

function run_lint {
  # ensure environment is set up
  which eslint > /dev/null || fail "eslint command not found; run 'npm install -g eslint' to install eslint"
  which scss-lint > /dev/null || fail "scss-lint command not found; run gem install scss-lint to install scss-lint"

  # do the thing
  echo "Running eslint..."
  eslint .

  echo "Running scss-lint..."
  scss-lint .
}

process_options $@
if [ -z ${run_unit_tests:-""} ] && [ -z ${run_lint_tests:-""} ]; then
  # no options passed case
  run_tests
  run_lint
  exit
fi

if [ ${run_unit_tests:-0} -eq 1 ]; then
  run_tests
fi

if [ ${run_lint_tests:-0} -eq 1 ]; then
  run_lint
fi

