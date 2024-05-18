import type { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import {
  getConfig,
  generatePolicy,
  getCredentialsFromAuthToken,
} from '@libs/index';

const config = getConfig();

const basicAuthorizer = async (event: APIGatewayTokenAuthorizerEvent) => {
  console.log('!!! Event: ', JSON.stringify(event, null, 2));

  const { authorizationToken, methodArn } = event;

  try {
    if (!authorizationToken) {
      return generatePolicy(authorizationToken, 'Deny', methodArn);
    }

    const [username, password] =
      getCredentialsFromAuthToken(authorizationToken);

    const isValidCredentials =
      username === config.username && password === config.password;

    console.log('!!! username: ', username, ' password: ', password);

    if (!isValidCredentials) {
      return generatePolicy(authorizationToken, 'Deny', methodArn);
    }

    return generatePolicy(authorizationToken, 'Allow', methodArn);
  } catch (error) {
    console.log('!!! error: ', JSON.stringify(error, null, 2));

    return generatePolicy('Error', 'Deny', '*');
  }
};

export const main = basicAuthorizer;
