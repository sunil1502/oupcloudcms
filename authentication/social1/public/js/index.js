$(document).ready(function() {

    // if we get a ticket in the URL, we authenticate in browser
    var ticket = Gitana.getCurrentQueryStringParameter("ticket");
    if (ticket)
    {
        Gitana.connect({
            "ticket": ticket
        }, function (err) {

            console.log("ERR: " + JSON.stringify(err));

            // this writes a cookie down into the browser
        });
    }

});
