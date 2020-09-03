GITHUB_REPO="datashare-plugin-site-alert"

clean:
		rm -Rf ./dist ./tmp ${GITHUB_REPO}-*.zip ${GITHUB_REPO}-*.tgz

dist: clean
		npm run build

release: dist
		./release.sh ${GITHUB_REPO} ${RELEASE_VERSION} ${GITHUB_API_TOKEN}
