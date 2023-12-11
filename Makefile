default: help

npm-fix: ## Run the fix_npm.sh file
	sh npm_fix.sh

help: ## This help message
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' -e 's/:.*#/: #/' | column -t -s '##'