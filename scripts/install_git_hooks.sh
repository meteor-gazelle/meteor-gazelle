#!/bin/bash

set -eu

ls git_hooks | while read line; do
    if [ ! -f ../.git/hooks/$line ]; then
        touch ../.git/hooks/$line;
    fi;

    if [[ "$OSTYPE" == "darwin"* ]]; then
        hasher="md5 -r";
    else
        hasher=md5sum;
    fi;

    if [ "`${hasher} ../.git/hooks/$line | cut -f 1 -d " "`" != "`${hasher} git_hooks/$line | cut -f 1 -d " "`" ]; then
        cp git_hooks/$line ../.git/hooks/$line;
        chmod ugo+rx ../.git/hooks/$line;
        echo "Installing $line hook";
    fi;
done;
