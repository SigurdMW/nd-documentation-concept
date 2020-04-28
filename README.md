# Documentation concept for ND
Documentation concept for Norsk Display that generates PDF files and HTML from markdown. 

## Deploy to Heroku
When the `master` branch is updated, Heroku is set up to build and deploy to https://nd-concept.herokuapp.com/

## Docker from local
1. `heroku container:login`
2. `heroku container:push web`
3. `heroku container:release web`