#!/bin/sh
node server/dist/index.js &
serve -s client/dist -l 3000 &
wait -n
