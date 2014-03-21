function Controller() {
    function openBarSmarts() {
        Ti.Platform.openURL("http://www.barsmarts.ie/");
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.bar_smarts);
        Alloy.Globals.windowStack.splice(a, 1);
        $.bar_smarts.close();
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bar_smarts";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.bar_smarts = Ti.UI.createWindow({
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
        title: "BAR SMARTS",
        id: "bar_smarts"
    });
    $.__views.bar_smarts && $.addTopLevelView($.__views.bar_smarts);
    $.__views.__alloyId18 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId18"
    });
    $.__views.bar_smarts.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId20"
    });
    $.__views.__alloyId18.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    closeWindow ? $.__views.__alloyId21.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId21!click!closeWindow"] = true;
    $.__views.__alloyId22 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "BAR SMARTS",
        id: "__alloyId22"
    });
    $.__views.__alloyId20.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId23"
    });
    $.__views.__alloyId20.add($.__views.__alloyId23);
    goToHome ? $.__views.__alloyId23.addEventListener("click", goToHome) : __defers["$.__views.__alloyId23!click!goToHome"] = true;
    $.__views.__alloyId24 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId24"
    });
    $.__views.bar_smarts.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createScrollView({
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
        id: "__alloyId25"
    });
    $.__views.bar_smarts.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: Ti.UI.SIZE,
        borderRadius: "4dp",
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        layout: "vertical",
        bottom: "10dp",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.bar_smarts_banner_image_view = Ti.UI.createView({
        id: "bar_smarts_banner_image_view",
        bottom: "5dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId26.add($.__views.bar_smarts_banner_image_view);
    $.__views.bar_smarts_banner_image = Ti.UI.createImageView({
        id: "bar_smarts_banner_image",
        image: "/images/brands/jameson_banner.png",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        bottom: "5dp"
    });
    $.__views.bar_smarts_banner_image_view.add($.__views.bar_smarts_banner_image);
    $.__views.__alloyId27 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "14dp"
        },
        top: "2dp",
        bottom: "5dp",
        height: Ti.UI.SIZE,
        left: "15dp",
        textAlign: Ti.UI.LEFT,
        text: "Be a part of the new revolution in spirits and cocktails. BarSmarts is a one-of-a-kind online bartender education and certification program sponsored by Pernod Ricard.",
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createButton({
        top: "0dp",
        color: "#fff",
        backgroundColor: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "16dp"
        },
        width: Ti.UI.FILL,
        left: "5dp",
        right: "5dp",
        height: "40dp",
        borderRadius: "4dp",
        bottom: "10dp",
        title: "GO TO BAR SMARTS WEBSITE",
        id: "__alloyId28"
    });
    $.__views.__alloyId25.add($.__views.__alloyId28);
    openBarSmarts ? $.__views.__alloyId28.addEventListener("click", openBarSmarts) : __defers["$.__views.__alloyId28!click!openBarSmarts"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var new_height = "160dp";
    $.bar_smarts_banner_image.height = new_height;
    $.bar_smarts.addEventListener("close", function() {
        Ti.API.info("bar smarts closed");
    });
    $.bar_smarts.addEventListener("open", function() {
        Ti.API.info("bar smarts opened");
        Alloy.Globals.windowStack.push($.bar_smarts);
    });
    $.bar_smarts.addEventListener("androidback", function() {
        $.bar_smarts.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.bar_smarts);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId15!click!closeWindow"] && $.__views.__alloyId15.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId17!click!goToHome"] && $.__views.__alloyId17.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId21!click!closeWindow"] && $.__views.__alloyId21.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId23!click!goToHome"] && $.__views.__alloyId23.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId28!click!openBarSmarts"] && $.__views.__alloyId28.addEventListener("click", openBarSmarts);
    __defers["$.__views.__alloyId30!click!goToHome"] && $.__views.__alloyId30.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId32!click!closeWindow"] && $.__views.__alloyId32.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;