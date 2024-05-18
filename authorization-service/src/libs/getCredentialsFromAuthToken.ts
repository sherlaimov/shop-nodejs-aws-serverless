export const getCredentialsFromAuthToken = (
  authToken: string
): [string, string] => {
  const base64String = authToken.replace('Basic ', '');
  const decodedAuthValue = Buffer.from(base64String, 'base64').toString(
    'utf-8'
  );
  const [username, password] = decodedAuthValue.split('=');
  return [username, password];
};
