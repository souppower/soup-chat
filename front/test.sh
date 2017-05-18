#!/bin/bash -Ceu

cd `dirname $0`

yarn test
yarn run lint:sass
yarn run lint:ts
