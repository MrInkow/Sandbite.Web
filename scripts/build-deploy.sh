#!/usr/bin/env sh
set -eu

rm -rf dist
mkdir -p dist

cp index.html kona.html piha.html 404.html robots.txt sitemap.xml dist/
cp -R assets dist/assets
find dist -name .DS_Store -delete
