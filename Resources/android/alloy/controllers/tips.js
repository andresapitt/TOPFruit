function Controller() {
    function DisplayTips(newJSON) {
        var tips_json;
        tips_json = null != newJSON ? JSON.parse(newJSON) : JSON.parse(tips_json_text);
        var tip_item_style = $.createStyle({
            classes: [ "tip_item" ]
        });
        var tipt_title_style = $.createStyle({
            classes: [ "tip_title" ]
        });
        var divide = 320 / 238;
        var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
        var fontSizeRatio = 238 / 15;
        var fontSize = Math.floor(pixelWidth / fontSizeRatio);
        tipt_title_style.font = {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: fontSize.toString() + "px"
        };
        var tip_image_style = $.createStyle({
            classes: [ "tip_image" ]
        });
        var tip_desc_style = $.createStyle({
            classes: [ "tip_desc" ]
        });
        var divide = 320 / 238;
        var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
        var fontSizeRatio = 238 / 13;
        var fontSize = Math.floor(pixelWidth / fontSizeRatio);
        tip_desc_style.font = {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: fontSize.toString() + "px"
        };
        var tip_text_style = $.createStyle({
            classes: [ "tip_text_view" ]
        });
        for (var i = 0; tips_json.length > i; i++) {
            var tip_item_view = Ti.UI.createView();
            tip_item_view.applyProperties(tip_item_style);
            var tip_text_view = Ti.UI.createView();
            tip_text_view.applyProperties(tip_text_style);
            tip_item_view.add(tip_text_view);
            var tip_title_label = Ti.UI.createLabel({
                text: tips_json[i].Tip.title.toUpperCase()
            });
            tip_title_label.applyProperties(tipt_title_style);
            tip_text_view.add(tip_title_label);
            var tip_desc_label = Ti.UI.createLabel({
                text: tips_json[i].Tip.description
            });
            tip_desc_label.applyProperties(tip_desc_style);
            tip_text_view.add(tip_desc_label);
            var tip_image_view = Alloy.Globals.Utils.RemoteImage({
                image: tips_json[i].Tip.image_thumb,
                defaultImage: "/images/icons/tips.png"
            });
            tip_image_view.applyProperties(tip_image_style);
            tip_item_view.add(tip_image_view);
            $.tip_item_container.add(tip_item_view);
        }
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.tips);
        Alloy.Globals.windowStack.splice(a, 1);
        $.tips.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tips";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.tips = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        height: "100%",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        modal: false,
        title: "TOP TIPS",
        id: "tips"
    });
    $.__views.tips && $.addTopLevelView($.__views.tips);
    $.__views.__alloyId400 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId400"
    });
    $.__views.tips.add($.__views.__alloyId400);
    $.__views.__alloyId401 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId401"
    });
    $.__views.__alloyId400.add($.__views.__alloyId401);
    $.__views.__alloyId402 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId402"
    });
    $.__views.__alloyId400.add($.__views.__alloyId402);
    $.__views.__alloyId403 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId403"
    });
    $.__views.__alloyId402.add($.__views.__alloyId403);
    closeWindow ? $.__views.__alloyId403.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId403!click!closeWindow"] = true;
    $.__views.__alloyId404 = Ti.UI.createLabel(function() {
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
            text: "TOP TIPS",
            color: "#313646",
            id: "__alloyId404"
        });
        return o;
    }());
    $.__views.__alloyId402.add($.__views.__alloyId404);
    $.__views.__alloyId405 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId405"
    });
    $.__views.__alloyId402.add($.__views.__alloyId405);
    goToHome ? $.__views.__alloyId405.addEventListener("click", goToHome) : __defers["$.__views.__alloyId405!click!goToHome"] = true;
    $.__views.__alloyId412 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId412"
    });
    $.__views.tips.add($.__views.__alloyId412);
    $.__views.__alloyId413 = Ti.UI.createScrollView({
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
        id: "__alloyId413"
    });
    $.__views.tips.add($.__views.__alloyId413);
    $.__views.tip_item_container = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            height: Ti.UI.SIZE,
            left: "5dp",
            right: "5dp",
            layout: "vertical",
            bottom: "10dp"
        });
        Alloy.isTablet && _.extend(o, {
            height: Ti.UI.SIZE,
            left: "10dp",
            right: "10dp",
            layout: "vertical",
            bottom: "10dp"
        });
        _.extend(o, {
            id: "tip_item_container"
        });
        return o;
    }());
    $.__views.__alloyId413.add($.__views.tip_item_container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.Utils.GetAppData("/client/idl/perfect-mix/tips/tips/viewjson", "data/Tips.txt", DisplayTips);
    $.tips.addEventListener("close", function() {});
    $.tips.addEventListener("open", function() {
        Alloy.Globals.windowStack.push($.tips);
    });
    $.tips.addEventListener("androidback", function() {
        $.tips.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.tips);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId403!click!closeWindow"] && $.__views.__alloyId403.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId405!click!goToHome"] && $.__views.__alloyId405.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId409!click!closeWindow"] && $.__views.__alloyId409.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId411!click!goToHome"] && $.__views.__alloyId411.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId415!click!goToHome"] && $.__views.__alloyId415.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId417!click!closeWindow"] && $.__views.__alloyId417.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;