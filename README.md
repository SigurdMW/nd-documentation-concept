# Documentation concept for ND
Documentation concept for Norsk Display that generates PDF files and HTML from markdown. 

## Setting up Github Actions
w/Heroku: https://github.com/actions/heroku/issues/10

## Deployment to Heroku:
This repo has actions that deploys changes to Heroku when the `master` branch is updated.
[Guide to setup of GitHub Actions to Heroku](https://dev.to/mscccc/github-actions-deploy-to-heroku-22np)

## Set up
1) Follow [Heroku CLI Guide to deploy with GIT](https://devcenter.heroku.com/articles/git#creating-a-heroku-remote)
2) When this is done locally, generate a token and setup your action.

### Get a new Heroku token 
1) Use Heroku CLI to generate token (heroku authorizations:create)
2) copy the `Token` in to GitHub repo settings/secrets with name `HEROKU_API_KEY`
3) Add script `.github/nodejs.yml`:
```yml
name: Node.js CI

on:
  push:
    branches:
      - master

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js 12.x
      uses: actions/setup-node@v1
      with:
        node-version: "12.x"
    - run: npm install
    - run: npm run build --if-present
    - name: Deploy to Heroku
      env:
        HEROKU_API_TOKEN: ${{ secrets.HEROKU_API_TOKEN }}
        HEROKU_APP_NAME: ${{ secrets.APP_NAME }}
      run: git push https://heroku:$HEROKU_API_TOKEN@git.heroku.com/$HEROKU_APP_NAME.git origin/master:master
```