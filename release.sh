#!/bin/bash

if [[ $# -ne 3 ]]
then
  printf "\n\nIllegal number of parameters, eg. ./release.sh GITHUB_REPO RELEASE_VERSION GITHUB_API_TOKEN\n"
  exit 2
fi

GITHUB_REPO=$1
RELEASE_VERSION=$2
GITHUB_API_TOKEN=$3

# Generate the assets
mkdir tmp
cp package.json tmp
cp -R dist tmp
cd tmp
tar -zcvf "../$GITHUB_REPO-$RELEASE_VERSION.tgz" .
zip -r "../$GITHUB_REPO-$RELEASE_VERSION.zip" .
cd ..
rm -Rf tmp

# Create the Github release
UPLOAD_URL=$(curl -s -X POST -H "Accept: application/vnd.github.v3+json" -H "Authorization: token $GITHUB_API_TOKEN" "https://api.github.com/repos/ICIJ/$GITHUB_REPO/releases" -d "{\"tag_name\": \"$RELEASE_VERSION\", \"target_commitish\": \"master\", \"name\": \"$RELEASE_VERSION\", \"body\": \"Create release $RELEASE_VERSION\", \"draft\": false, \"prerelease\": false}"  | jq '.upload_url')

if [ -z "$UPLOAD_URL" ] || [ "$UPLOAD_URL" = 'null' ]
then
  printf "\n\nThe release $RELEASE_VERSION already exists on repo $GITHUB_REPO\n"
  exit 1
fi

# Upload the assets to this release
UPLOAD_URL=$(echo "$UPLOAD_URL" | sed -r 's/"//g' | sed -r 's/\{\?name,label\}//g')
curl -m 100 -s -X POST -H "Accept: application/vnd.github.v3+json" -H "Authorization: token $GITHUB_API_TOKEN" -H "Content-Type:application/gzip" --data-binary @"./$GITHUB_REPO-$RELEASE_VERSION.tgz" "$UPLOAD_URL?name=$GITHUB_REPO-$RELEASE_VERSION.tgz&label=$GITHUB_REPO-$RELEASE_VERSION.tgz"
curl -m 100 -s -X POST -H "Accept: application/vnd.github.v3+json" -H "Authorization: token $GITHUB_API_TOKEN" -H "Content-Type:application/zip" --data-binary @"./$GITHUB_REPO-$RELEASE_VERSION.zip" "$UPLOAD_URL?name=$GITHUB_REPO-$RELEASE_VERSION.zip&label=$GITHUB_REPO-$RELEASE_VERSION.zip"

# Delete the generated assets
rm -Rf "$GITHUB_REPO-$RELEASE_VERSION.tgz" "datashare-plugin-site-alert-$RELEASE_VERSION.zip"
printf "\n\nDONE"
