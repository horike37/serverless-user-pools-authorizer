[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
# serverless-user-pools-authorizer
## Overview
This is a Serverless project that provides API Gateway Custome Authorizer using User Pools on Cognito.

## Install
To use this module, copy this folder under your Serverless project root folder. 

    $ git clone git@github.com:horike37/serverless-user-pools-authorizer.git

## Setup Custom Authorizer
Create some function and endpoint.

    $ serverless create function

Your project API, add this to the endpoint configuration in s-function.json:

    "authorizationType": "CUSTOM",
    "authorizerFunction": "user-pools-authorizer",
    
If you get a user infomation in Backend Lambda function, configuration in s-function.json:

    "requestTemplates": {
      "application/json": {
        "usename": "$context.authorizer.principalId"
      }
    }
