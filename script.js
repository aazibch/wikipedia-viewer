/*jshint browser: true, devel: true, jquery: true*/
$(document).ready(function () {
    $("#home-search-button").on("click", function () {
        var searchVal = $("#home-search-field").val();
        $("#results-search-field").val(searchVal);
        getData(searchVal);
    });

    $("#results-search-button").on("click", function () {
        var searchVal = $("#results-search-field").val();
        $(this).blur();
        getData(searchVal);
    });

    $("#results-app-title, #home-button").on("click", function () {
        $("#home-search-field").val("");
        $("#results-content").addClass("hidden");
        $("#home-content").removeClass("hidden");
    });
    
    $("#home-search-form, #results-search-form").submit(function () {
        return false;
    });

    $("#home-search-field").keyup(function (event) {
        if (event.which === 13) {
            $("#home-search-button").click();
        }
    });

    $("#results-search-field").keyup(function (event) {
        if (event.which === 13) {
            $("#results-search-button").click();
        }
    });
    
    function getData (searchVal) {
        $.getJSON("https://en.wikipedia.org/w/api.php/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + searchVal + "&srlimit=10&callback=?", function (data) {
            if (!$("#home-content").hasClass("hidden")) {
                $("#home-content").addClass("hidden");
                $("#results-content").removeClass("hidden");
            }
            
            if (data.query.search.length === 0) {
                $("#results-main-section").html('<div class="container text-center"> <p id="no-results-message">There were no results matching the query.</p> </div>');
            } else {
                $("#results-main-section").html('<div class="container"> <div id="results"> </div> </div>');

                data.query.search.forEach(function (result) {
                    $("#results").append('<a href="https://en.wikipedia.org/?curid=' +
                     result.pageid + '" target="_blank"> <h1 class="h4">' +
                     result.title + '</h1> </a> <p>' +
                     result.snippet + '</p>');
                });
            }
        });
    }
});