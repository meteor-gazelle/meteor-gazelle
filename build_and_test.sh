#!/bin/bash

set -e
cd /home/app
#test
meteor --test

#lint: somethings broken
#eslint .
