#!/usr/bin/env bash

react-scripts build

aws s3 sync ./build s3://ginny-app.com

aws cloudfront create-invalidation \
    --distribution-id E1YBMT562J5IG \
    --paths "/"

echo "Done!"
