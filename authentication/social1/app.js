var server = require("cloudcms-server/server");

/**
 * This gets displayed once the server starts up.
 */
server.report(function(callback) {

    var cpuCount = require('os').cpus().length;

    // provide some debug info
    console.log("");
    console.log("Social Login Example Started");
    console.log("");
    console.log("Node Version: " + process.version);
    console.log("Server Version: " + process.env.CLOUDCMS_APPSERVER_PACKAGE_VERSION);
    console.log("Server Mode: " + process.env.CLOUDCMS_APPSERVER_MODE);
    console.log("Server Base Path: " + process.env.CLOUDCMS_APPSERVER_BASE_PATH);
    console.log("Gitana Scheme: " + process.env.GITANA_PROXY_SCHEME);
    console.log("Gitana Host: " + process.env.GITANA_PROXY_HOST);
    console.log("Gitana Port: " + process.env.GITANA_PROXY_PORT);
    console.log("Temp Directory: " + process.env.CLOUDCMS_TEMPDIR_PATH);
    console.log("CPU Count: " + cpuCount);
    console.log("Store Configuration: " + process.env.CLOUDCMS_STORE_CONFIGURATION);
    console.log("Broadcast Provider: " + process.env.CLOUDCMS_BROADCAST_TYPE);
    console.log("Cache Provider: " + process.env.CLOUDCMS_CACHE_TYPE);
    console.log("LaunchPad Mode: " + process.env.CLOUDCMS_LAUNCHPAD_SETUP);
    console.log("");
    console.log("Web Server: http://localhost:" + process.env.PORT);
    console.log("");

    callback();
});

/**
 * Start the Server
 */
server.start({
    "setup": "single",
    "welcome": {
        "enabled": true,
        "file": "index.html"
    },
    "session": {
        "enabled": true,
        "type": "file"
    },
    "auth": {
        "enabled": true,
        "providers": {
            "facebook": {
                "enabled": true,
                "successRedirect": "/index.html",
                "failureRedirect": "/index.html",
                "callbackUrl": "/auth/facebook/callback",
                "appId": process.env.SAMPLE_FACEBOOK_APP_ID,
                "appSecret": process.env.SAMPLE_FACEBOOK_APP_SECRET,
                "passTicket": true,
                "passToken": true,
                "autoRegister": true
            },
            "twitter": {
                "enabled": true,
                "successRedirect": "/index.html",
                "failureRedirect": "/index.html",
                "callbackUrl": "/auth/twitter/callback",
                "consumerKey": process.env.SAMPLE_TWITTER_CONSUMER_KEY,
                "consumerSecret": process.env.SAMPLE_TWITTER_CONSUMER_SECRET,
                "passTicket": true,
                "passToken": true,
                "autoRegister": true
            },
            "linkedin": {
                "enabled": true,
                "successRedirect": "/index.html",
                "failureRedirect": "/index.html",
                "callbackUrl": "/auth/linkedin/callback",
                "apiKey": process.env.SAMPLE_LINKEDIN_API_KEY,
                "apiSecret": process.env.SAMPLE_LINKEDIN_API_SECRET,
                "passTicket": true,
                "passToken": true,
                "autoRegister": true
            }
        }
    }
});
