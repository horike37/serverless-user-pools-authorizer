'use strict';
var aws = require( 'aws-sdk' );
var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({apiVersion: '2016-04-18',region: 'us-east-1'});

module.exports.handler = function(event, context, cb) {

  var params = {
    AccessToken:event.authorizationToken
  };

  cognitoidentityserviceprovider.getUser(params, function(err, data) {
    if (err) {
      context.succeed(generatePolicy('user', 'Deny', event.methodArn));
    } else {
      context.succeed(generatePolicy(data.Username, 'Allow', event.methodArn));
    }
  });
};

var generatePolicy = function(principalId, effect, resource) {
    
  var authResponse = {};
  authResponse.principalId = principalId;

  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
}