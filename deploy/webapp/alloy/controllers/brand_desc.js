function Controller() {
    function openFacebookLike() {
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.brand_desc);
        Alloy.Globals.windowStack.splice(a, 1);
        $.brand_desc.close();
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "brand_desc";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.brand_desc = Ti.UI.createWindow({
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
        title: "ABOUT",
        id: "brand_desc"
    });
    $.__views.brand_desc && $.addTopLevelView($.__views.brand_desc);
    $.__views.__alloyId41 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId41"
    });
    $.__views.brand_desc.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId42"
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId43"
    });
    $.__views.__alloyId41.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId44"
    });
    $.__views.__alloyId43.add($.__views.__alloyId44);
    closeWindow ? $.__views.__alloyId44.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId44!click!closeWindow"] = true;
    $.__views.__alloyId45 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "ABOUT",
        id: "__alloyId45"
    });
    $.__views.__alloyId43.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId46"
    });
    $.__views.__alloyId43.add($.__views.__alloyId46);
    goToHome ? $.__views.__alloyId46.addEventListener("click", goToHome) : __defers["$.__views.__alloyId46!click!goToHome"] = true;
    $.__views.__alloyId47 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId47"
    });
    $.__views.brand_desc.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createScrollView({
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
        id: "__alloyId48"
    });
    $.__views.brand_desc.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: Ti.UI.SIZE,
        borderRadius: 4,
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        layout: "vertical",
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
    $.__views.brand_banner_image = Ti.UI.createView({
        id: "brand_banner_image",
        width: Ti.UI.FILL,
        bottom: "5dp",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId49.add($.__views.brand_banner_image);
    $.__views.brand_title = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "15dp",
        bottom: "10dp",
        top: "10dp",
        height: Ti.UI.SIZE,
        text: "...",
        id: "brand_title"
    });
    $.__views.__alloyId49.add($.__views.brand_title);
    $.__views.brand_desc_text = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "14dp"
        },
        top: "2dp",
        bottom: "5dp",
        height: Ti.UI.SIZE,
        left: "15dp",
        right: "15dp",
        textAlign: Ti.UI.LEFT,
        text: "...",
        id: "brand_desc_text"
    });
    $.__views.__alloyId49.add($.__views.brand_desc_text);
    $.__views.social_hor_view = Ti.UI.createView({
        layout: "horizontal",
        id: "social_hor_view",
        height: Ti.UI.SIZE,
        bottom: "10dp"
    });
    $.__views.__alloyId49.add($.__views.social_hor_view);
    $.__views.twitterParent = Ti.UI.createView({
        left: "5dp",
        right: "4dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "twitterParent"
    });
    $.__views.social_hor_view.add($.__views.twitterParent);
    $.__views.twitterBtn = Ti.UI.createButton({
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
        image: "./images/icons/twitterbird.png",
        title: "Twitter"
    });
    $.__views.twitterParent.add($.__views.twitterBtn);
    $.__views.facebookParent = Ti.UI.createView({
        left: "5dp",
        right: "4dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "facebookParent"
    });
    $.__views.social_hor_view.add($.__views.facebookParent);
    $.__views.facebookBtn = Ti.UI.createButton({
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
        image: "./images/icons/facebookIcon.png",
        title: "Facebook"
    });
    $.__views.facebookParent.add($.__views.facebookBtn);
    $.__views.websiteParent = Ti.UI.createView({
        left: "5dp",
        right: "4dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "websiteParent"
    });
    $.__views.social_hor_view.add($.__views.websiteParent);
    $.__views.websiteBtn = Ti.UI.createButton({
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
        image: "./images/icons/websiteIcon.png",
        title: "Website"
    });
    $.__views.websiteParent.add($.__views.websiteBtn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Opening brand desciption page");
    var args = arguments[0] || {};
    var brandName = args.title || "Title not received";
    Ti.API.info("Brand title: " + brandName);
    $.brand_title.text = args.title || "Title not received";
    $.brand_desc_text.text = args.description || "Description not received";
    if (null != args.banner_img_url && "" != args.banner_img_url) {
        var new_height = "160dp";
        Ti.API.info("new height: " + new_height);
        var brand_image_view = Alloy.Globals.Utils.RemoteImage({
            image: args.banner_img_url,
            defaultImage: "/images/placeholders/ph_events.png",
            height: new_height
        });
        $.brand_banner_image.add(brand_image_view);
    }
    if (null != args.twitter && "" != args.twitter) {
        Ti.API.info("Twitter link exists");
        $.twitterBtn.addEventListener("click", function() {
            var canOpenTwitter = Ti.Platform.canOpenURL("twitter://user?screen_name=" + args.twitter);
            canOpenTwitter ? Ti.Platform.openURL("twitter://user?screen_name=" + args.twitter) : alert("The twitter app must be installed to open this link.");
        });
    } else {
        $.social_hor_view.remove($.twitterParent);
        Ti.API.info("Twitter link NULL");
    }
    if (null != args.facebook && "" != args.facebook) {
        Ti.API.info("Facebook link exists");
        $.facebookBtn.addEventListener("click", openFacebookLike);
    } else {
        $.social_hor_view.remove($.facebookParent);
        Ti.API.info("Facebook link NULL");
    }
    if (null != args.website && "" != args.website) {
        Ti.API.info("Website link exists");
        $.websiteBtn.addEventListener("click", function() {
            Ti.API.info("Website button clicked! Go to: " + args.website);
            Ti.Platform.openURL(args.website);
        });
    } else {
        $.social_hor_view.remove($.websiteParent);
        Ti.API.info("Website link NULL");
    }
    $.brand_desc.addEventListener("close", function() {
        Ti.API.info("brands desc closed");
    });
    $.brand_desc.addEventListener("open", function() {
        Ti.API.info("brand desc opened");
        Alloy.Globals.windowStack.push($.brand_desc);
    });
    $.brand_desc.addEventListener("androidback", function() {
        $.brand_desc.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.brand_desc);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId38!click!closeWindow"] && $.__views.__alloyId38.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId40!click!goToHome"] && $.__views.__alloyId40.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId44!click!closeWindow"] && $.__views.__alloyId44.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId46!click!goToHome"] && $.__views.__alloyId46.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId51!click!goToHome"] && $.__views.__alloyId51.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId53!click!closeWindow"] && $.__views.__alloyId53.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;