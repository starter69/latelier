#!/bin/bash
VERSION=`git describe --tags --abbrev=0`
echo Building ${VERSION}
docker build \
  --no-cache \
  -t jbl2024/latelier:${VERSION} \
  -t jbl2024/latelier:latest .
