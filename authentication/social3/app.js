var server = require("cloudcms-server/server");

/**
 * This gets displayed once the server starts up.
 */
server.report(function(callback) {

    console.log("");
    console.log("Social Login Example #3 Started");
    console.log("");
    console.log("Node Version: " + process.version);
    console.log("Server Version: " + process.env.CLOUDCMS_APPSERVER_PACKAGE_VERSION);
    console.log("Server Mode: " + process.env.CLOUDCMS_APPSERVER_MODE);
    console.log("");
    console.log("Web Server: http://localhost:" + process.env.PORT);
    console.log("");

    callback();
});

var doRender = function(req, res, filepath, title, _model)
{
    var model = {};
    if (_model) {
        for (var k in _model) {
            model[k] = _model[k];
        }
    }

    if (!model.title) {
        model.title = title;
    }

    if (req.user) {
        model.user = req.user;
    }

    res.render(filepath, model);
};

// register some routes
server.routes(function(app, callback) {

    // registration page
    app.get("/registration.html", function(req, res) {

        var info = req.flash("info");
        var formErrors = req.flash("formErrors");
        var formHasError = false;
        if (formErrors && formErrors.length > 0)
        {
            formHasError = true;
        }

        var model = {
            "messages": {
                "info": info ? info : ""
            },
            "form": {
                "errors": formErrors,
                "hasError": formHasError
            }
        };

        if (req.session && req.session.lastProviderInfo)
        {
            var providerInfo = req.session.lastProviderInfo;
            model.providerTitle = providerInfo.providerTitle;

            var userObject = providerInfo.userObject;

            model.username = userObject && userObject.name ? userObject.name : "";
            model.email = userObject && userObject.email ? userObject.email : "";
            model.firstName = userObject && userObject.firstName ? userObject.firstName : "";
            model.lastName = userObject && userObject.lastName ? userObject.lastName : "";
        }

        doRender(req, res, "registration.html", "Registration", model);
    });

    // index page
    app.get("/index.html", function(req, res) {

        var info = req.flash("info");

        var model = {
            "providerInfo": req.session.lastProviderInfo,
            "messages": {
                "info": info ? info : ""
            }
        };

        doRender(req, res, "index.html", "Home Page", model);
    });

    // error page
    app.get("/error.html", function(req, res) {

        var model = {
            "info": req.session.lastProviderInfo
        };

        doRender(req, res, "error.html", "Error Page", model);
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
                "registrationRedirect": "/registration.html",
                "callbackUrl": "/auth/facebook/callback",
                "appId": process.env.SAMPLE_FACEBOOK_APP_ID,
                "appSecret": process.env.SAMPLE_FACEBOOK_APP_SECRET
            },
            "twitter": {
                "enabled": true,
                "successRedirect": "/index.html",
                "failureRedirect": "/index.html",
                "registrationRedirect": "/registration.html",
                "callbackUrl": "/auth/twitter/callback",
                "consumerKey": process.env.SAMPLE_TWITTER_CONSUMER_KEY,
                "consumerSecret": process.env.SAMPLE_TWITTER_CONSUMER_SECRET
            },
            "linkedin": {
                "enabled": true,
                "successRedirect": "/index.html",
                "failureRedirect": "/index.html",
                "registrationRedirect": "/registration.html",
                "callbackUrl": "/auth/linkedin/callback",
                "apiKey": process.env.SAMPLE_LINKEDIN_API_KEY,
                "apiSecret": process.env.SAMPLE_LINKEDIN_API_SECRET
            }
        }
    }
});
