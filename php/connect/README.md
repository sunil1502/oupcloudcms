# Cloud CMS PHP Connect Example

Welcome hero to the world of PHP.  Here you will find examples of how you can use PHP to connect to Cloud CMS.
Connecting to Cloud CMS generally involves doing the OAuth 2.0 dance.  It's a handshake between your client code,
the user and the backend API.

There a few different ways to do this dance - it's covered in much greater detail here:

    https://www.cloudcms.com/documentation/developers/authentication/authentication.html
    
There are several different "flows" that you can use to connect to Cloud CMS.  The most secure is the
"authorization code" flow which requires a few different redirects and some token and code exchanges in order
to achieve it.  Cloud CMS supports this as do many PHP OAuth 2.0 clients.

## The "password" flow

A more simple flow is the "password" flow which does everything in one fell swoop.  The password flow is also
referred to as the Resource Owner flow.  It is a safe and secure choice, in general, provided that your code
runs server-side or is compiled.  In the PHP world, this is often the case as PHP often serves as a means
for providing the application server in the three tier architecture.  The application server is server-side and
generally within your control, preventing important "secret" tokens from leaking out into the public.

As such, this folder provides an example of connecting to Cloud CMS using the resource owner "password" flow.
You will find this in the `password.php` file.

## Building

This folder uses Composer to manage the third-party dependency that it relies on.  There's just one and this is the
PHP League's OAuth 2.0 client:

    https://github.com/thephpleague/oauth2-client
    
There are a bunch of good OAuth 2.0 clients for PHP.  We just happened to choose this one.  Cloud CMS uses OAuth 2.0
straight up, lock, stock and barrel, so you should have no trouble connecting.  The sample code provided here
can be looked to as a reference for some of the basic ideas.

First, begin by grabbing Composer:

    curl -sS https://getcomposer.org/installer | php
    
Then, run Composer to pull in your third-party dependencies.

    php composer.phar install
    
Now edit the `password.php` file and drop in your API Keys information.  You can get this from Cloud CMS.  If you
don't know how, check out:

    https://www.cloudcms.com/developers.html
    
Fill in the values for:

    $clientKey = '';
    $clientSecret = '';
    $username = '';
    $password = '';
    
And then save your changes.

Finally, run things!

    php password.php
    
The HTTP client will do the OAuth 2.0 dance and pull back some information about your repositories using the
Cloud CMS API:

    https://api.cloudcms.com/docs
    
It will also show some OAuth 2.0 token information.

