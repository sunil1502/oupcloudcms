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
        "schema": {
            "type": "object",
            "properties": {
                "username": {
                    "type": "string",
                    "title": "Username",
                    "required": true
                },
                "password": {
                    "type": "string",
                    "title": "Password",
                    "required": true,
                    "pattern": "^[a-zA-Z0-9_]+$"
                }
            }
        },
        "options": {
            "renderForm": true,
            "form": {
                "attributes": {
                    "action": "/auth/facebook",
                    "method": "post"
                },
                "buttons": {
                    "submit": {}
                }
            },
            "fields": {
                "username": {
                    "size": 20,
                    "label": "User Name"
                },
                "password": {
                    "type": "password",
                    "size": 20,
                    "label": "Password"
                }
            }
        }
    });

});
