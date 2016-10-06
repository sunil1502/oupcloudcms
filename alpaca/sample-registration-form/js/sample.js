$(document).ready(function() {

    /**
     * Creates an Alpaca-powered form by loading schema and options information from Cloud CMS.
     *
     *   - the "schemaSource" can be either the QName or Node ID of a Type Definition or the key for a data list into
     *     which records should be placed.
     *
     *   - the "optionsSource" is the optional form key of a Cloud CMS Form bound to a definition.
     *
     * Everything else is just standard Alpaca code.
     *
     * See http://www.alpacajs.org for more information.
     *
     */
    $("#form").alpaca({
        "connector": {
            "id": "cloudcms",
            "config": {
                "clientKey": "",
                "clientSecret": "",
                "username": "",
                "password": "",
                "application": "",
                "baseURL": "https://api.cloudcms.com"
            }
        },
        "view": "bootstrap-create",
        "schemaSource": "registrations",
        "optionsSource": "master",
        "postRender": function(control) {

            var imageUrl = Alpaca.branch.getProxiedUri() + "/nodes/root/attachments/default?path=/Images/register-now.png";
            $(".header").append("<img src='" + imageUrl + "'/>");

            control.on("formSubmitSuccess", function() {
                window.location.href = "thankyou.html";
            });

            control.on("formSubmitFail", function() {
                // TODO: handle any server-side invalidation or connectivity issues...
            });

        }
    });

});
