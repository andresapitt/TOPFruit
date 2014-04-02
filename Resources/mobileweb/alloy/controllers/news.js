function Controller() {
    function openEvents() {
        var eventsWin = Alloy.createController("events").getView();
        eventsWin.open();
    }
    function openBestBars() {
        var bestBarsWin = Alloy.createController("best_bars").getView();
        bestBarsWin.open();
    }
    function openCompetitions() {
        var compWin = Alloy.createController("competitions").getView();
        compWin.open();
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.news);
        Alloy.Globals.windowStack.splice(a, 1);
        $.news.close();
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "news";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.news = Ti.UI.createWindow({
        backgroundColor: "white",
        titleAttributes: {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "18dp"
            }
        },
        barColor: "#fff",
        layout: "vertical",
        height: "568dp",
        width: "320dp",
        navBarHidden: true,
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        tintColor: Alloy.Globals.PrimaryColor,
        navTintColor: Alloy.Globals.PrimaryColor,
        title: "NEWS",
        id: "news"
    });
    $.__views.news && $.addTopLevelView($.__views.news);
    $.__views.__alloyId333 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        id: "__alloyId333"
    });
    $.__views.news.add($.__views.__alloyId333);
    $.__views.__alloyId334 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId334"
    });
    $.__views.__alloyId333.add($.__views.__alloyId334);
    $.__views.__alloyId335 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId335"
    });
    $.__views.__alloyId333.add($.__views.__alloyId335);
    $.__views.__alloyId336 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId336"
    });
    $.__views.__alloyId335.add($.__views.__alloyId336);
    closeWindow ? $.__views.__alloyId336.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId336!click!closeWindow"] = true;
    $.__views.__alloyId337 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "NEWS",
        id: "__alloyId337"
    });
    $.__views.__alloyId335.add($.__views.__alloyId337);
    $.__views.__alloyId338 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId338"
    });
    $.__views.__alloyId335.add($.__views.__alloyId338);
    goToHome ? $.__views.__alloyId338.addEventListener("click", goToHome) : __defers["$.__views.__alloyId338!click!goToHome"] = true;
    $.__views.__alloyId339 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        id: "__alloyId339"
    });
    $.__views.news.add($.__views.__alloyId339);
    $.__views.__alloyId340 = Ti.UI.createScrollView({
        top: "0dp",
        layout: "vertical",
        bottom: "0dp",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentWidth: "auto",
        contentHeight: Ti.UI.SIZE,
        disableBounce: true,
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: false,
        backgroundColor: "#efefef",
        id: "__alloyId340"
    });
    $.__views.news.add($.__views.__alloyId340);
    $.__views.__alloyId341 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: "67dp",
        borderRadius: 0,
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        id: "__alloyId341"
    });
    $.__views.__alloyId340.add($.__views.__alloyId341);
    openEvents ? $.__views.__alloyId341.addEventListener("click", openEvents) : __defers["$.__views.__alloyId341!click!openEvents"] = true;
    $.__views.__alloyId344 = Ti.UI.createImageView({
        left: "20dp",
        image: "./images/icons/events.png",
        id: "__alloyId344"
    });
    $.__views.__alloyId341.add($.__views.__alloyId344);
    $.__views.__alloyId345 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "85dp",
        text: "UPCOMING EVENTS",
        id: "__alloyId345"
    });
    $.__views.__alloyId341.add($.__views.__alloyId345);
    $.__views.__alloyId348 = Ti.UI.createImageView({
        right: "10dp",
        image: "./images/common/chevron.png",
        id: "__alloyId348"
    });
    $.__views.__alloyId341.add($.__views.__alloyId348);
    $.__views.__alloyId349 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: "67dp",
        borderRadius: 0,
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        id: "__alloyId349"
    });
    $.__views.__alloyId340.add($.__views.__alloyId349);
    openBestBars ? $.__views.__alloyId349.addEventListener("click", openBestBars) : __defers["$.__views.__alloyId349!click!openBestBars"] = true;
    $.__views.__alloyId352 = Ti.UI.createImageView({
        left: "20dp",
        image: "./images/icons/bestbars.png",
        id: "__alloyId352"
    });
    $.__views.__alloyId349.add($.__views.__alloyId352);
    $.__views.__alloyId353 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "85dp",
        text: "WORLDS BEST BARS",
        id: "__alloyId353"
    });
    $.__views.__alloyId349.add($.__views.__alloyId353);
    $.__views.__alloyId356 = Ti.UI.createImageView({
        right: "10dp",
        image: "./images/common/chevron.png",
        id: "__alloyId356"
    });
    $.__views.__alloyId349.add($.__views.__alloyId356);
    $.__views.__alloyId357 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: "67dp",
        borderRadius: 0,
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        id: "__alloyId357"
    });
    $.__views.__alloyId340.add($.__views.__alloyId357);
    openCompetitions ? $.__views.__alloyId357.addEventListener("click", openCompetitions) : __defers["$.__views.__alloyId357!click!openCompetitions"] = true;
    $.__views.__alloyId360 = Ti.UI.createImageView({
        left: "20dp",
        image: "./images/icons/comp.png",
        id: "__alloyId360"
    });
    $.__views.__alloyId357.add($.__views.__alloyId360);
    $.__views.__alloyId361 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "85dp",
        text: "COMPETITIONS",
        id: "__alloyId361"
    });
    $.__views.__alloyId357.add($.__views.__alloyId361);
    $.__views.__alloyId364 = Ti.UI.createImageView({
        right: "10dp",
        image: "./images/common/chevron.png",
        id: "__alloyId364"
    });
    $.__views.__alloyId357.add($.__views.__alloyId364);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Opening News Page");
    $.news.addEventListener("close", function() {
        Ti.API.info("News window closed");
    });
    $.news.addEventListener("open", function() {
        Ti.API.info("News window opened");
        Ti.API.info("News window opened, activity? " + $.news.activity);
        Alloy.Globals.windowStack.push($.news);
    });
    $.news.addEventListener("androidback", function() {
        $.news.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.news);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId330!click!closeWindow"] && $.__views.__alloyId330.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId332!click!goToHome"] && $.__views.__alloyId332.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId336!click!closeWindow"] && $.__views.__alloyId336.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId338!click!goToHome"] && $.__views.__alloyId338.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId341!click!openEvents"] && $.__views.__alloyId341.addEventListener("click", openEvents);
    __defers["$.__views.__alloyId349!click!openBestBars"] && $.__views.__alloyId349.addEventListener("click", openBestBars);
    __defers["$.__views.__alloyId357!click!openCompetitions"] && $.__views.__alloyId357.addEventListener("click", openCompetitions);
    __defers["$.__views.__alloyId366!click!goToHome"] && $.__views.__alloyId366.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId368!click!closeWindow"] && $.__views.__alloyId368.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;