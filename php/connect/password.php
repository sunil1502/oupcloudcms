<?php
    namespace CloudCMS\SDK;
    
    require __DIR__ . '/vendor/autoload.php';
    
    use League\OAuth2\Client\Provider\GenericProvider;
    
    // TODO: fill in your API Key information here!
    $clientKey = '';
    $clientSecret = '';
    $username = '';
    $password = '';

    // build an OAuth 2.0 provider
    $provider = new GenericProvider([
        'clientId'                => $clientKey,    // The client ID assigned to you by the provider
        'clientSecret'            => $clientSecret, 
        'urlAuthorize'            => 'https://api.cloudcms.com/oauth/authorize',
        'urlAccessToken'          => 'https://api.cloudcms.com/oauth/token',
        'redirectUri'             => 'http://example.com/your-redirect-url/',    
        'urlResourceOwnerDetails' => 'https://api.cloudcms.com'
    ]);

    // connect to Cloud CMS using OAuth 2.0 "password" flow
    // other flows are supported as well including authorization_code and implicit
    try 
    {    
        echo "\n";
        echo "Connecting to Cloud CMS...\n";
        
        // do the handshake
        $accessToken = $provider->getAccessToken('password', [
            'username' => $username,
            'password' => $password
        ]);

        // yay, we succesfully logged in...
        echo "Success!\n\n";
        
        // let's print out some details about our OAuth 2.0 tokens
        echo "Access Token: " . $accessToken->getToken() . "\n";
        echo "Refresh Token " . $accessToken->getRefreshToken() . "\n";
        echo "Expires: ". $accessToken->getExpires() . "\n";

        // request a list of repositories from Cloud CMS
        $request = $provider->getAuthenticatedRequest(
            'GET',
            'https://api.cloudcms.com/repositories',
            $accessToken
        );            
        $repositories = $provider->getResponse($request);
        
        // print out info about the repositories
        echo "\n";
        echo "Showing: " . sizeof($repositories["rows"]) . " of: " . $repositories["total_rows"] . " total repositories\n";
        for ($i = 0; $i < sizeof($repositories["rows"]); $i++)
        {
            $repository = $repositories["rows"][$i];
            $repositoryTitle = ($repository["title"] ? $repository["title"] : $repository["_doc"]);
            
            echo $i . "> " . $repositoryTitle . " (" . $repository["_doc"] . ")\n";
        }
        
        // inspect the raw array
        // var_dump($repositories);

        echo "\n";
    } 
    catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) 
    {
        echo "Failed to connect!\n";        
        
        // Failed to get the access token
        exit($e->getMessage());
    }

?>