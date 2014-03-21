function Controller() {
    function DisplayTips(newJSON) {
        var tips_json;
        tips_json = null != newJSON ? JSON.parse(newJSON) : JSON.parse(tips_json_text);
        Ti.API.info("tips json length: " + tips_json.length);
        var tip_item_style = $.createStyle({
            classes: [ "tip_item" ]
        });
        var tipt_title_style = $.createStyle({
            classes: [ "tip_title" ]
        });
        var tip_image_style = $.createStyle({
            classes: [ "tip_image" ]
        });
        var tip_desc_style = $.createStyle({
            classes: [ "tip_desc" ]
        });
        var tip_text_style = $.createStyle({
            classes: [ "tip_text_view" ]
        });
        for (var i = 0; tips_json.length > i; i++) {
            Ti.API.info("Tip " + i + " Title: " + tips_json[i].Tip.title);
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
        $.tips.close();
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
        title: "TOP TIPS",
        id: "tips"
    });
    $.__views.tips && $.addTopLevelView($.__views.tips);
    $.__views.__alloyId423 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId423"
    });
    $.__views.tips.add($.__views.__alloyId423);
    $.__views.__alloyId424 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId424"
    });
    $.__views.__alloyId423.add($.__views.__alloyId424);
    $.__views.__alloyId425 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId425"
    });
    $.__views.__alloyId423.add($.__views.__alloyId425);
    $.__views.__alloyId426 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId426"
    });
    $.__views.__alloyId425.add($.__views.__alloyId426);
    closeWindow ? $.__views.__alloyId426.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId426!click!closeWindow"] = true;
    $.__views.__alloyId427 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "TOP TIPS",
        id: "__alloyId427"
    });
    $.__views.__alloyId425.add($.__views.__alloyId427);
    $.__views.__alloyId428 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId428"
    });
    $.__views.__alloyId425.add($.__views.__alloyId428);
    goToHome ? $.__views.__alloyId428.addEventListener("click", goToHome) : __defers["$.__views.__alloyId428!click!goToHome"] = true;
    $.__views.__alloyId429 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId429"
    });
    $.__views.tips.add($.__views.__alloyId429);
    $.__views.__alloyId430 = Ti.UI.createScrollView({
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
        id: "__alloyId430"
    });
    $.__views.tips.add($.__views.__alloyId430);
    $.__views.tip_item_container = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "5dp",
        right: "5dp",
        layout: "vertical",
        bottom: "10dp",
        id: "tip_item_container"
    });
    $.__views.__alloyId430.add($.__views.tip_item_container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/tips/tips/viewjson", "data/Tips.txt", DisplayTips);
    Ti.API.info("Tips open");
    $.tips.addEventListener("close", function() {
        Ti.API.info("tips closed");
    });
    $.tips.addEventListener("open", function() {
        Ti.API.info("tips opened");
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
    __defers["$.__views.__alloyId420!click!closeWindow"] && $.__views.__alloyId420.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId422!click!goToHome"] && $.__views.__alloyId422.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId426!click!closeWindow"] && $.__views.__alloyId426.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId428!click!goToHome"] && $.__views.__alloyId428.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId432!click!goToHome"] && $.__views.__alloyId432.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId434!click!closeWindow"] && $.__views.__alloyId434.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;