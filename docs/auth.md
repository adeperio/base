### OAuth2 Setup - Google and Facebook apps

To sign-in using login with Google and Facebook, you will need to setup your app for OAuth with each provider.

#### Google

Google apps can be setup at console.developers.google.com.

In order to use get user information from Google sign-in, we need the following scopes enabled for your application:

* https://www.googleapis.com/auth/plus.login
* https://www.googleapis.com/auth/userinfo.email
* https://www.googleapis.com/auth/userinfo.profile

#### Facebook

Facebook apps can be setup for OAuth2 at https://developers.facebook.com/.

Facebook Oauth also needs the following scopes enabled:

* `email`
* `public_profile`

#### Other providers
Base OAuth is built on top of PassportJS functionality, and so other OAuth providers can be added via Passport strategies.

More providers are likely to appear on the Base roadmap.

Check out http://passportjs.org/ for more info.

##### Hosts File Setup

> Google and Facebook requires that the callback URI for your app actually goes to a live address.
> If running your app on localhost (i.e. `NODE_ENV=development`), OAuth providers will need a way to call back in your app.
> The easiest way to do this would be to edit your `HOSTS` file on your computer.

On a Mac, type the following in the terminal to edit your file

```shell
vi /etc/hosts
```
and in that file add the following line:

```shell
127.0.0.1 myapp.com
```

When specifying the callback URI's in your Google or Facebook developer consoles, make sure that domain name matches whats listed in your admin panel.

In your oauth provider developer consoles, you can also add multiple callback URIs.

This is useful if you have instances of Base on multiple environments and ports.

For example, Base runs on port `3000` when in development, so the callback URI for Base would be https://basestackjs.com:3000/auth/facebook/callback for the Facebook provider URI value.

> Also make sure that the callback URI exists as a route in your app. The default routes for the callback URI in Base are
> https://myapp.com/auth/facebook/callback
> https://myapp.com/auth/google/callback
