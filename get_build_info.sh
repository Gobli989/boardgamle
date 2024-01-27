#!/bin/bash

commit_id=$(git rev-parse --short HEAD)
time=$(date -Iseconds)

echo "{\"commit_id\": \"$commit_id\", \"time\": \"$time\"}" > dist/build_info.json