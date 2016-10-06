# Cloud CMS SDK - Workflow webhook server sample

This directory contains a sample node.js, express application which can recieve and respond to Cloud CMS workflow webhook such as this:

"leave": [{
    "type": "webhook",
    "config": {
        "url": "https://ccms-webhook-server.herokuapp.com/api/taskValidationRandomFail"
    }
}]

## webhook-server
This is an npm enabled nodejs application. To build (resolves node dependencies) and run the app:

* npm install
* npm run

When run using npm run or from node.js server the port it will listen on defaults to 8080. If deployed to a hosting provider that supplies a process environment (process.env.PORT) such as heroku.com then the port will likely be 80.

The API endpoint list can be found here:
  http://localhost:8080/api

Endpoints:  
* "GET/POST: /api/taskValidationAlwaysSucceed  Always returns HTTP 200 and { 'message': 'success' }",
* "GET/POST: /api/taskValidationAlwaysFail  Always returns HTTP 400 and { 'message': 'fail' }",
* "GET/POST: /api/taskValidationRandomFail  Randomly succeeds roughly 50% of the time it is called. Fails the other 50%"

Workflow webhook calls will always be a POST but this server responds to any HTTP method (GET for example).
