workflow "Deploy to Heroku" {
  on = "push"
  resolves = "release"
}

action "login" {
  uses = "sjdonado/heroku@master"
  args = "container:login"
  secrets = ["HEROKU_API_KEY"]
}

action "push" {
  uses = "sjdonado/heroku@master"
  needs = "login"
  args = "container:push -a calm-fortress-1234 web"
  secrets = ["HEROKU_API_KEY"]
}

action "release" {
  uses = "sjdonado/heroku@master"
  needs = "push"
  args = "container:release -a calm-fortress-1234 web"
  secrets = ["HEROKU_API_KEY"]
}