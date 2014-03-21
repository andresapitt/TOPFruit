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
    $.__views.__alloyId352 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        id: "__alloyId352"
    });
    $.__views.news.add($.__views.__alloyId352);
    $.__views.__alloyId353 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId353"
    });
    $.__views.__alloyId352.add($.__views.__alloyId353);
    $.__views.__alloyId354 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId354"
    });
    $.__views.__alloyId352.add($.__views.__alloyId354);
    $.__views.__alloyId355 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId355"
    });
    $.__views.__alloyId354.add($.__views.__alloyId355);
    closeWindow ? $.__views.__alloyId355.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId355!click!closeWindow"] = true;
    $.__views.__alloyId356 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "NEWS",
        id: "__alloyId356"
    });
    $.__views.__alloyId354.add($.__views.__alloyId356);
    $.__views.__alloyId357 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId357"
    });
    $.__views.__alloyId354.add($.__views.__alloyId357);
    goToHome ? $.__views.__alloyId357.addEventListener("click", goToHome) : __defers["$.__views.__alloyId357!click!goToHome"] = true;
    $.__views.__alloyId358 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        id: "__alloyId358"
    });
    $.__views.news.add($.__views.__alloyId358);
    $.__views.__alloyId359 = Ti.UI.createScrollView({
        top: "0dp",
        layout: "vertical",
        bottom: "0dp",
        width: Ti.UI.FILL,
        contentWidth: "auto",
        contentHeight: Ti.UI.SIZE,
        disableBounce: true,
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: false,
        backgroundColor: "#efefef",
        id: "__alloyId359"
    });
    $.__views.news.add($.__views.__alloyId359);
    $.__views.__alloyId360 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: "67dp",
        borderRadius: 0,
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        id: "__alloyId360"
    });
    $.__views.__alloyId359.add($.__views.__alloyId360);
    openEvents ? $.__views.__alloyId360.addEventListener("click", openEvents) : __defers["$.__views.__alloyId360!click!openEvents"] = true;
    $.__views.__alloyId363 = Ti.UI.createImageView({
        left: "20dp",
        image: "./images/icons/events.png",
        id: "__alloyId363"
    });
    $.__views.__alloyId360.add($.__views.__alloyId363);
    $.__views.__alloyId364 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "85dp",
        text: "UPCOMING EVENTS",
        id: "__alloyId364"
    });
    $.__views.__alloyId360.add($.__views.__alloyId364);
    $.__views.__alloyId367 = Ti.UI.createImageView({
        right: "10dp",
        image: "./images/common/chevron.png",
        id: "__alloyId367"
    });
    $.__views.__alloyId360.add($.__views.__alloyId367);
    $.__views.__alloyId368 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: "67dp",
        borderRadius: 0,
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        id: "__alloyId368"
    });
    $.__views.__alloyId359.add($.__views.__alloyId368);
    openBestBars ? $.__views.__alloyId368.addEventListener("click", openBestBars) : __defers["$.__views.__alloyId368!click!openBestBars"] = true;
    $.__views.__alloyId371 = Ti.UI.createImageView({
        left: "20dp",
        image: "./images/icons/bestbars.png",
        id: "__alloyId371"
    });
    $.__views.__alloyId368.add($.__views.__alloyId371);
    $.__views.__alloyId372 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "85dp",
        text: "WORLDS BEST BARS",
        id: "__alloyId372"
    });
    $.__views.__alloyId368.add($.__views.__alloyId372);
    $.__views.__alloyId375 = Ti.UI.createImageView({
        right: "10dp",
        image: "./images/common/chevron.png",
        id: "__alloyId375"
    });
    $.__views.__alloyId368.add($.__views.__alloyId375);
    $.__views.__alloyId376 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: "67dp",
        borderRadius: 0,
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        id: "__alloyId376"
    });
    $.__views.__alloyId359.add($.__views.__alloyId376);
    openCompetitions ? $.__views.__alloyId376.addEventListener("click", openCompetitions) : __defers["$.__views.__alloyId376!click!openCompetitions"] = true;
    $.__views.__alloyId379 = Ti.UI.createImageView({
        left: "20dp",
        image: "./images/icons/comp.png",
        id: "__alloyId379"
    });
    $.__views.__alloyId376.add($.__views.__alloyId379);
    $.__views.__alloyId380 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "85dp",
        text: "COMPETITIONS",
        id: "__alloyId380"
    });
    $.__views.__alloyId376.add($.__views.__alloyId380);
    $.__views.__alloyId383 = Ti.UI.createImageView({
        right: "10dp",
        image: "./images/common/chevron.png",
        id: "__alloyId383"
    });
    $.__views.__alloyId376.add($.__views.__alloyId383);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Opening News Page");
    $.news.addEventListener("close", function() {
        Ti.API.info("News window closed");
    });
    $.news.addEventListener("open", function() {
        Ti.API.info("News window opened");
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
    __defers["$.__views.__alloyId349!click!closeWindow"] && $.__views.__alloyId349.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId351!click!goToHome"] && $.__views.__alloyId351.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId355!click!closeWindow"] && $.__views.__alloyId355.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId357!click!goToHome"] && $.__views.__alloyId357.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId360!click!openEvents"] && $.__views.__alloyId360.addEventListener("click", openEvents);
    __defers["$.__views.__alloyId368!click!openBestBars"] && $.__views.__alloyId368.addEventListener("click", openBestBars);
    __defers["$.__views.__alloyId376!click!openCompetitions"] && $.__views.__alloyId376.addEventListener("click", openCompetitions);
    __defers["$.__views.__alloyId385!click!goToHome"] && $.__views.__alloyId385.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId387!click!closeWindow"] && $.__views.__alloyId387.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;