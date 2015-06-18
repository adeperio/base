## Security

Base uses Oauth2 as it's authentication framework, and specifically the authorization grant type. It leverages http://passportjs.org to provide authentication strategies to popular social authentication providers, and also to provide api end point protection using token bearer strategies.

The RFC for OAuth2 is a pretty hefty, but detailed resource if you want to go in depth into the requirements for the correct implementation of OAuth2 - https://tools.ietf.org/html/rfc6749

### SSL
In order to adhere to the OAuth2 spec, SSL and correct SSL error handling needs to be implemented.

The SSL approach on this project will be an evolving discussion and open to critique. The goals here are to provide an appropriate implementation of SSL out of the box for developers that:

1. Takes into account running environments.
2. A configuration that provides a good balance between security, ease of setup, and use-ability.
3. Where appropriate provide documentation on recommendations for developers to setup.
4. Ensure assumptions are well documented.

Currently the approach we are taking (again open for critique):

1. In NODE_ENV=production - TLS in production environments should be terminated at the load balancer level - This is something that we are leaving to the developer to manage and ensure is correctly setup.
2. In NODE_ENV=production - We enforce an SSL connection and disallow requests from http (see https://github.com/adeperio/base/issues/13)
3. In NODE_ENV=development - Base runs on http when in development
