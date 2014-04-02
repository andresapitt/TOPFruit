function Controller() {
    function PixelsToDPUnits(ThePixels) {
        return ThePixels / (Titanium.Platform.displayCaps.dpi / 160);
    }
    function openTwitter() {
        var canOpen = Ti.Platform.openURL("twitter://user?screen_name=WorldsBestBars");
        false == canOpen && Ti.UI.createAlertDialog({
            message: "Sorry, you must first have the twitter app installed on this device to click this button.",
            ok: "Ok, thanks!",
            title: "Twitter Error"
        }).show();
    }
    function openFacebook() {
        var canOpen = Ti.Platform.openURL("fb://profile/149071961796732");
        false == canOpen && Ti.UI.createAlertDialog({
            message: "Sorry, you must first have the facebook app installed on this device to click this button.",
            ok: "Ok, thanks!",
            title: "Facebook Error"
        }).show();
    }
    function openEmail() {
        Ti.API.info("Submit best bars email");
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Perfect Mix - Best Bars Consideration ";
        emailDialog.toRecipients = [ "lisa@vstream.ie" ];
        emailDialog.ccRecipients = [];
        emailDialog.bccRecipients = [];
        emailDialog.messageBody = "";
        Ti.API.info("is it support? " + emailDialog.isSupported());
        emailDialog.addEventListener("complete", function(e) {
            Ti.API.info("email complete: " + e.code + ", result: " + e.result + ", success: " + e.success);
        });
        emailDialog.open();
    }
    function submitBarForConsideration() {
        Ti.Platform.openURL("http://www.worldsbestbars.com/bar-resource/login");
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.best_bars);
        Alloy.Globals.windowStack.splice(a, 1);
        $.best_bars.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "best_bars";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.best_bars = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        height: "100%",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        modal: false,
        title: "WORLDS BEST BARS",
        id: "best_bars"
    });
    $.__views.best_bars && $.addTopLevelView($.__views.best_bars);
    $.__views.__alloyId12 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId12"
    });
    $.__views.best_bars.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId14"
    });
    $.__views.__alloyId12.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    closeWindow ? $.__views.__alloyId15.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId15!click!closeWindow"] = true;
    $.__views.__alloyId16 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "22dp"
            },
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            left: "50dp",
            right: "50dp"
        });
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "28dp"
            },
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            left: "50dp",
            right: "50dp"
        });
        _.extend(o, {
            text: "WORLDS BEST BARS",
            color: "#313646",
            id: "__alloyId16"
        });
        return o;
    }());
    $.__views.__alloyId14.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId17"
    });
    $.__views.__alloyId14.add($.__views.__alloyId17);
    goToHome ? $.__views.__alloyId17.addEventListener("click", goToHome) : __defers["$.__views.__alloyId17!click!goToHome"] = true;
    $.__views.__alloyId24 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId24"
    });
    $.__views.best_bars.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createScrollView({
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
        id: "__alloyId25"
    });
    $.__views.best_bars.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            backgroundColor: "#fff",
            height: Ti.UI.SIZE,
            borderRadius: 0,
            borderColor: "#d1d1d1",
            borderWidth: 1,
            top: "10dp",
            left: "5dp",
            right: "5dp",
            layout: "vertical",
            bottom: "10dp"
        });
        Alloy.isTablet && _.extend(o, {
            backgroundColor: "#fff",
            height: Ti.UI.SIZE,
            borderRadius: 0,
            borderColor: "#d1d1d1",
            borderWidth: 1,
            top: "10dp",
            left: "10dp",
            right: "10dp",
            layout: "vertical",
            bottom: "10dp"
        });
        _.extend(o, {
            bottom: "10dp",
            id: "__alloyId26"
        });
        return o;
    }());
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.best_bars_banner_image_view = Ti.UI.createView({
        id: "best_bars_banner_image_view",
        bottom: "5dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId26.add($.__views.best_bars_banner_image_view);
    $.__views.best_bars_banner_image = Ti.UI.createImageView({
        id: "best_bars_banner_image",
        image: "/images/worldsbestbars/WBB_banner.png",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        bottom: "5dp"
    });
    $.__views.best_bars_banner_image_view.add($.__views.best_bars_banner_image);
    $.__views.__alloyId27 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "15dp"
            },
            top: "2dp",
            bottom: "5dp",
            height: Ti.UI.SIZE,
            left: "15dp",
            textAlign: Ti.UI.LEFT
        });
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "18dp"
            },
            top: "2dp",
            bottom: "5dp",
            height: Ti.UI.SIZE,
            left: "15dp",
            textAlign: Ti.UI.LEFT
        });
        _.extend(o, {
            text: "Think you are one of the World’s Best Bars?",
            top: "10dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            id: "__alloyId27"
        });
        return o;
    }());
    $.__views.__alloyId26.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            top: "0dp",
            color: "#fff",
            backgroundColor: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "16dp"
            },
            left: "5dp",
            right: "5dp",
            height: "40dp",
            borderRadius: 6,
            bottom: "10dp"
        });
        Alloy.isTablet && _.extend(o, {
            top: "0dp",
            color: "#fff",
            backgroundColor: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            left: "10dp",
            right: "10dp",
            height: "50dp",
            borderRadius: "4dp",
            bottom: "10dp"
        });
        _.extend(o, {
            title: "Submit your bar for consideration!",
            bottom: "10dp",
            top: "10dp",
            id: "__alloyId28"
        });
        return o;
    }());
    $.__views.__alloyId26.add($.__views.__alloyId28);
    submitBarForConsideration ? $.__views.__alloyId28.addEventListener("click", submitBarForConsideration) : __defers["$.__views.__alloyId28!click!submitBarForConsideration"] = true;
    $.__views.__alloyId29 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "15dp"
            },
            top: "2dp",
            bottom: "5dp",
            height: Ti.UI.SIZE,
            left: "15dp",
            textAlign: Ti.UI.LEFT
        });
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "18dp"
            },
            top: "2dp",
            bottom: "5dp",
            height: Ti.UI.SIZE,
            left: "15dp",
            textAlign: Ti.UI.LEFT
        });
        _.extend(o, {
            text: "If you are already on the site, tell us about your new cocktail or menu via",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            top: "20dp",
            id: "__alloyId29"
        });
        return o;
    }());
    $.__views.__alloyId26.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        bottom: "20dp",
        top: "10dp",
        id: "__alloyId30"
    });
    $.__views.__alloyId26.add($.__views.__alloyId30);
    $.__views.twitterParent = Ti.UI.createView({
        left: "10dp",
        right: "10dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "twitterParent"
    });
    $.__views.__alloyId30.add($.__views.twitterParent);
    $.__views.twitterBtn = Ti.UI.createButton({
        width: Ti.UI.SIZE,
        height: "34dp",
        backgroundColor: "none",
        borderRadius: 4,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "14dp"
        },
        color: "#fff",
        tintColor: "#fff",
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "0%"
            },
            endPoint: {
                x: "50%",
                y: "100%"
            },
            colors: [ {
                color: "#6db3e1",
                offset: 0
            }, {
                color: "#428ecf",
                offset: 1
            } ]
        },
        id: "twitterBtn",
        image: "/images/icons/twitterbird.png",
        title: "Twitter"
    });
    $.__views.twitterParent.add($.__views.twitterBtn);
    openTwitter ? $.__views.twitterBtn.addEventListener("click", openTwitter) : __defers["$.__views.twitterBtn!click!openTwitter"] = true;
    $.__views.facebookParent = Ti.UI.createView({
        left: "10dp",
        right: "10dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "facebookParent"
    });
    $.__views.__alloyId30.add($.__views.facebookParent);
    $.__views.facebookBtn = Ti.UI.createButton({
        width: Ti.UI.SIZE,
        height: "34dp",
        backgroundColor: "none",
        borderRadius: 4,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "14dp"
        },
        color: "#fff",
        tintColor: "#fff",
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "0%"
            },
            endPoint: {
                x: "50%",
                y: "100%"
            },
            colors: [ {
                color: "#4b69a5",
                offset: 0
            }, {
                color: "#253d7d",
                offset: 1
            } ]
        },
        id: "facebookBtn",
        image: "/images/icons/facebookIcon.png",
        title: "Facebook"
    });
    $.__views.facebookParent.add($.__views.facebookBtn);
    openFacebook ? $.__views.facebookBtn.addEventListener("click", openFacebook) : __defers["$.__views.facebookBtn!click!openFacebook"] = true;
    $.__views.websiteParent = Ti.UI.createView({
        left: "10dp",
        right: "10dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "websiteParent"
    });
    $.__views.__alloyId30.add($.__views.websiteParent);
    $.__views.websiteBtn = Ti.UI.createButton({
        width: Ti.UI.SIZE,
        height: "34dp",
        backgroundColor: "none",
        borderRadius: 4,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "14dp"
        },
        color: "#fff",
        tintColor: "#fff",
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "0%"
            },
            endPoint: {
                x: "50%",
                y: "100%"
            },
            colors: [ {
                color: "#414656",
                offset: 0
            }, {
                color: "#1e222e",
                offset: 1
            } ]
        },
        id: "websiteBtn",
        image: "/images/icons/websiteIcon.png",
        title: "Email"
    });
    $.__views.websiteParent.add($.__views.websiteBtn);
    openEmail ? $.__views.websiteBtn.addEventListener("click", openEmail) : __defers["$.__views.websiteBtn!click!openEmail"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var new_height = "160dp";
    new_height = PixelsToDPUnits(160 * (Ti.Platform.displayCaps.platformWidth / 320));
    $.best_bars_banner_image.height = new_height;
    $.best_bars.addEventListener("close", function() {
        Ti.API.info("best bars closed");
    });
    $.best_bars.addEventListener("open", function() {
        Ti.API.info("best bars opened");
        Alloy.Globals.windowStack.push($.best_bars);
    });
    $.best_bars.addEventListener("androidback", function() {
        $.best_bars.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.best_bars);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId15!click!closeWindow"] && $.__views.__alloyId15.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId17!click!goToHome"] && $.__views.__alloyId17.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId21!click!closeWindow"] && $.__views.__alloyId21.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId23!click!goToHome"] && $.__views.__alloyId23.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId28!click!submitBarForConsideration"] && $.__views.__alloyId28.addEventListener("click", submitBarForConsideration);
    __defers["$.__views.twitterBtn!click!openTwitter"] && $.__views.twitterBtn.addEventListener("click", openTwitter);
    __defers["$.__views.twitterBtn!click!openTwitter"] && $.__views.twitterBtn.addEventListener("click", openTwitter);
    __defers["$.__views.facebookBtn!click!openFacebook"] && $.__views.facebookBtn.addEventListener("click", openFacebook);
    __defers["$.__views.facebookBtn!click!openFacebook"] && $.__views.facebookBtn.addEventListener("click", openFacebook);
    __defers["$.__views.websiteBtn!click!openEmail"] && $.__views.websiteBtn.addEventListener("click", openEmail);
    __defers["$.__views.websiteBtn!click!openEmail"] && $.__views.websiteBtn.addEventListener("click", openEmail);
    __defers["$.__views.__alloyId32!click!goToHome"] && $.__views.__alloyId32.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId34!click!closeWindow"] && $.__views.__alloyId34.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;