function Controller() {
    function openTwitter() {
    }
    function openFacebook() {
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
        $.best_bars.close();
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
        title: "WORLDS BEST BARS",
        id: "best_bars"
    });
    $.__views.best_bars && $.addTopLevelView($.__views.best_bars);
    $.__views.__alloyId39 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId39"
    });
    $.__views.best_bars.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId40"
    });
    $.__views.__alloyId39.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId41"
    });
    $.__views.__alloyId39.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId42"
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
    closeWindow ? $.__views.__alloyId42.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId42!click!closeWindow"] = true;
    $.__views.__alloyId43 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "WORLDS BEST BARS",
        id: "__alloyId43"
    });
    $.__views.__alloyId41.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId44"
    });
    $.__views.__alloyId41.add($.__views.__alloyId44);
    goToHome ? $.__views.__alloyId44.addEventListener("click", goToHome) : __defers["$.__views.__alloyId44!click!goToHome"] = true;
    $.__views.__alloyId45 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId45"
    });
    $.__views.best_bars.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createScrollView({
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
        id: "__alloyId46"
    });
    $.__views.best_bars.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: Ti.UI.SIZE,
        borderRadius: 4,
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        layout: "vertical",
        bottom: "10dp",
        id: "__alloyId47"
    });
    $.__views.__alloyId46.add($.__views.__alloyId47);
    $.__views.best_bars_banner_image_view = Ti.UI.createView({
        id: "best_bars_banner_image_view",
        bottom: "5dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId47.add($.__views.best_bars_banner_image_view);
    $.__views.best_bars_banner_image = Ti.UI.createImageView({
        id: "best_bars_banner_image",
        image: "/images/worldsbestbars/WBB_banner.png",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        bottom: "5dp"
    });
    $.__views.best_bars_banner_image_view.add($.__views.best_bars_banner_image);
    $.__views.__alloyId48 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "16dp"
        },
        top: "10dp",
        bottom: "5dp",
        height: Ti.UI.SIZE,
        left: "10dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        right: "10dp",
        text: "Think you are one of the World’s Best Bars?",
        width: Ti.UI.FILL,
        id: "__alloyId48"
    });
    $.__views.__alloyId47.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createButton({
        top: "10dp",
        color: "#fff",
        backgroundColor: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "16dp"
        },
        left: "5dp",
        right: "5dp",
        height: "40dp",
        borderRadius: 4,
        bottom: "10dp",
        title: "Submit your bar for consideration!",
        id: "__alloyId49"
    });
    $.__views.__alloyId47.add($.__views.__alloyId49);
    submitBarForConsideration ? $.__views.__alloyId49.addEventListener("click", submitBarForConsideration) : __defers["$.__views.__alloyId49!click!submitBarForConsideration"] = true;
    $.__views.__alloyId50 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "16dp"
        },
        top: "20dp",
        bottom: "5dp",
        height: Ti.UI.SIZE,
        left: "10dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        right: "10dp",
        text: "If you are already on the site, tell us about your new cocktail or menu via",
        width: Ti.UI.FILL,
        id: "__alloyId50"
    });
    $.__views.__alloyId47.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        bottom: "20dp",
        top: "10dp",
        id: "__alloyId51"
    });
    $.__views.__alloyId47.add($.__views.__alloyId51);
    $.__views.twitterParent = Ti.UI.createView({
        left: "5dp",
        right: "4dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "twitterParent"
    });
    $.__views.__alloyId51.add($.__views.twitterParent);
    $.__views.twitterBtn = Ti.UI.createLabel({
        backgroundColor: "#d1d1d1",
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
        width: "93dp",
        height: "34dp",
        borderRadius: 4,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "12dp"
        },
        color: "#fff",
        tintColor: "#fff",
        id: "twitterBtn",
        html: '<a href="http://twitter.com/WorldsBestBars" target="_blank"><div style="height:30px;"><img src="./images/icons/twitterbird@2x.png" style="width:25px;height:20px;top:5px;left:5px;"><span style="color:#fff;font-size:16px;line-height:30px;height:30px !important;vertical-align:top;">Twitter</span></div></a>'
    });
    $.__views.twitterParent.add($.__views.twitterBtn);
    $.__views.facebookParent = Ti.UI.createView({
        left: "5dp",
        right: "4dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "facebookParent"
    });
    $.__views.__alloyId51.add($.__views.facebookParent);
    $.__views.facebookBtn = Ti.UI.createLabel({
        backgroundColor: "#d1d1d1",
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
        width: "93dp",
        height: "34dp",
        borderRadius: 4,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "12dp"
        },
        color: "#fff",
        tintColor: "#fff",
        id: "facebookBtn",
        html: '<a href="http://www.facebook.com/149071961796732" target="_blank"><div style="height:30px;"><img src="./images/icons/facebookIcon@2x.png" style="width:20px;height:25px;left:3px;"><span style="color:#fff;font-size:16px;line-height:30px;height:30px !important;vertical-align:top;">Facebook</span></div></a>'
    });
    $.__views.facebookParent.add($.__views.facebookBtn);
    $.__views.websiteParent = Ti.UI.createView({
        left: "5dp",
        right: "4dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "websiteParent"
    });
    $.__views.__alloyId51.add($.__views.websiteParent);
    $.__views.websiteBtn = Ti.UI.createLabel({
        backgroundColor: "#d1d1d1",
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
        width: "93dp",
        height: "34dp",
        borderRadius: 4,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "12dp"
        },
        color: "#fff",
        tintColor: "#fff",
        id: "websiteBtn",
        html: '<a href="mailto:lisa@vstream.ie?Subject=Perfect%20Mix%20-%20Best%20Bars%20Consideration" target="_top"><div style="height:30px;"><img src="./images/icons/websiteIcon@2x.png" style="width:25px;height:20px;top:5px;left:5px"><span style="color:#fff;font-size:16px;line-height:30px;height:30px !important;vertical-align:top;">Email</span></div></a>'
    });
    $.__views.websiteParent.add($.__views.websiteBtn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var new_height = "160dp";
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
    __defers["$.__views.__alloyId36!click!closeWindow"] && $.__views.__alloyId36.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId38!click!goToHome"] && $.__views.__alloyId38.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId42!click!closeWindow"] && $.__views.__alloyId42.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId44!click!goToHome"] && $.__views.__alloyId44.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId49!click!submitBarForConsideration"] && $.__views.__alloyId49.addEventListener("click", submitBarForConsideration);
    __defers["$.__views.twitterBtn!click!openTwitter"] && $.__views.twitterBtn.addEventListener("click", openTwitter);
    __defers["$.__views.twitterBtn!click!openTwitter"] && $.__views.twitterBtn.addEventListener("click", openTwitter);
    __defers["$.__views.facebookBtn!click!openFacebook"] && $.__views.facebookBtn.addEventListener("click", openFacebook);
    __defers["$.__views.facebookBtn!click!openFacebook"] && $.__views.facebookBtn.addEventListener("click", openFacebook);
    __defers["$.__views.websiteBtn!click!openEmail"] && $.__views.websiteBtn.addEventListener("click", openEmail);
    __defers["$.__views.websiteBtn!click!openEmail"] && $.__views.websiteBtn.addEventListener("click", openEmail);
    __defers["$.__views.__alloyId53!click!goToHome"] && $.__views.__alloyId53.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId55!click!closeWindow"] && $.__views.__alloyId55.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;