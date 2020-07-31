#!/bin/sh

brew install imagemagick
brew upgrade imagemagick

rm -rf ./compressed

aws s3 cp --recursive s3://nanaimages/processed/ ./compressed

cd ./compressed

mogrify -resize 1920 *.jpg

mogrify -resize 1920 *.jpeg

find . -type f -iname '*.jpg' -exec jpegoptim --strip-com --max=85 {} \;
find . -type f -iname '*.jpeg' -exec jpegoptim --strip-com --max=85 {} \;

aws s3 sync --delete --size-only . s3://nanaimages/processed/ --acl public-read --exclude "*build_log.txt" --exclude "*.idea*" --exclude "*.sh" --exclude "*.git*" --exclude "*.DS_Store"

cd ..

echo "DONE!"