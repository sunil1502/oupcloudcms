define(function(require, exports, module) {

    var $ = require("jquery");

    var Alpaca = $.alpaca;

    Alpaca.Fields.SampleField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.SampleField.prototype
     */
    {
        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "sample";
        },

        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function()
        {
            this.base();
        },

        afterRenderControl: function(model, callback)
        {
            var self = this;

            this.base(model, function() {
                self.on("ready", function(e){
                    // screen draw is done
                    if (self.options.dependentField)
                    {
                        // find the field and register a callback
                        var dep = self.top().getControlByPath(self.options.dependentField);
                        if (dep) {
                            self.subscribe(dep, function(value) {
                                self.setValue(value.toUpperCase());
                            });
                        }
                    }
                });
                callback();
            });
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function()
        {
            return this.base();
        }

        /* builder_helpers */
        ,

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {

            return Alpaca.merge(this.base(), {
                "properties": {
                    "dependentField": {
                        "title": "Dependent Field",
                        "description": "Name of the form field from which the value of this field will be derived",
                        "type": "string",
                        "default": "",
                        "readonly": true
                    }
                }
            });

        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "dependentField": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Sample Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Copy the value from a dependent form field and make it upper case";
        }

        /* end_builder_helpers */
    });

    Alpaca.registerMessages({
        "noDependentField": "No dependent field found"
    });
    
    Alpaca.registerFieldClass("sample-field", Alpaca.Fields.SampleField);

});

