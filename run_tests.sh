#!/bin/bash

set -e

IMAGE_ID=`cat /proc/sys/kernel/random/uuid`

docker build -t $IMAGE_ID .
docker run $IMAGE_ID /bin/bash /home/app/build_and_test.sh
