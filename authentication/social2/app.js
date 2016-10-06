var server = require("cloudcms-server/server");

/**
 * This gets displayed once the server starts up.
 */
server.report(function(callback) {

    console.log("");
    console.log("Social Login Example #2 Started");
    console.log("");
    console.log("Node Version: " + process.version);
    console.log("Server Version: " + process.env.CLOUDCMS_APPSERVER_PACKAGE_VERSION);
    console.log("Server Mode: " + process.env.CLOUDCMS_APPSERVER_MODE);
    console.log("");
    console.log("Web Server: http://localhost:" + process.env.PORT);
    console.log("");

    callback();
});

// register some routes
server.routes(function(app, callback) {

    // page handler
    app.get("*.html", function(req, res) {

        var uri = req.path;

        var templateId = uri;
        if (templateId.indexOf("/") === 0) {
            templateId = templateId.substring(1);
        }
        var i = templateId.indexOf(".html");
        if (i > -1) {
            templateId = templateId.substring(0, i);
        }

        var templateConfig = {
            "title": "Page Title",
            "template": templateId
        };

        if (req.user) {
            templateConfig.user = req.user;
        }

        res.render(templateId + ".html", templateConfig);
    });

    callback();

});

/**
 * Start the Server
 */
server.start({
    "setup": "single",
    "viewEngine": "dust",
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
                "autoRegister": true
            },
            "twitter": {
                "enabled": true,
                "successRedirect": "/index.html",
                "failureRedirect": "/index.html",
                "callbackUrl": "/auth/twitter/callback",
                "consumerKey": process.env.SAMPLE_TWITTER_CONSUMER_KEY,
                "consumerSecret": process.env.SAMPLE_TWITTER_CONSUMER_SECRET,
                "autoRegister": true
            },
            "linkedin": {
                "enabled": true,
                "successRedirect": "/index.html",
                "failureRedirect": "/index.html",
                "callbackUrl": "/auth/linkedin/callback",
                "apiKey": process.env.SAMPLE_LINKEDIN_API_KEY,
                "apiSecret": process.env.SAMPLE_LINKEDIN_API_SECRET,
                "autoRegister": true
            }
        }
    }
});
