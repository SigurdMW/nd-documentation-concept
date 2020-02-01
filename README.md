# Documentation concept for ND
Documentation concept for Norsk Display that generates PDF files and HTML from markdown. 

## Setting up Github Actions
w/Heroku: https://github.com/actions/heroku/issues/10

## Deployment to Heroku:
This repo has actions that deploys changes to Heroku when the `master` branch is updated.
[Guide to setup of GitHub Actions to Heroku](https://dev.to/mscccc/github-actions-deploy-to-heroku-22np)
### Get a new Heroku token 
1) Use Heroku CLI to generate token (heroku authorizations:create)
2) copy the `Token` in to GitHub repo settings/secrets with name `HEROKU_API_KEY`