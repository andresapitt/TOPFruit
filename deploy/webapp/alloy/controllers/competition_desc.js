function Controller() {
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.competition_desc);
        Alloy.Globals.windowStack.splice(a, 1);
        $.competition_desc.close();
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "competition_desc";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.competition_desc = Ti.UI.createWindow({
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
        title: "COMPETITION",
        id: "competition_desc"
    });
    $.__views.competition_desc && $.addTopLevelView($.__views.competition_desc);
    $.__views.__alloyId159 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId159"
    });
    $.__views.competition_desc.add($.__views.__alloyId159);
    $.__views.__alloyId160 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId160"
    });
    $.__views.__alloyId159.add($.__views.__alloyId160);
    $.__views.__alloyId161 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId161"
    });
    $.__views.__alloyId159.add($.__views.__alloyId161);
    $.__views.__alloyId162 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId162"
    });
    $.__views.__alloyId161.add($.__views.__alloyId162);
    closeWindow ? $.__views.__alloyId162.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId162!click!closeWindow"] = true;
    $.__views.__alloyId163 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "COMPETITION",
        id: "__alloyId163"
    });
    $.__views.__alloyId161.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId164"
    });
    $.__views.__alloyId161.add($.__views.__alloyId164);
    goToHome ? $.__views.__alloyId164.addEventListener("click", goToHome) : __defers["$.__views.__alloyId164!click!goToHome"] = true;
    $.__views.__alloyId165 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId165"
    });
    $.__views.competition_desc.add($.__views.__alloyId165);
    $.__views.comp_scroll_view = Ti.UI.createScrollView({
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
        id: "comp_scroll_view"
    });
    $.__views.competition_desc.add($.__views.comp_scroll_view);
    $.__views.comp_item_block = Ti.UI.createView({
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
        id: "comp_item_block"
    });
    $.__views.comp_scroll_view.add($.__views.comp_item_block);
    $.__views.competition_banner_image = Ti.UI.createView({
        id: "competition_banner_image",
        width: Ti.UI.FILL,
        bottom: "5dp",
        height: Ti.UI.SIZE
    });
    $.__views.comp_item_block.add($.__views.competition_banner_image);
    $.__views.competition_title = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "15dp",
        right: "15dp",
        bottom: "10dp",
        top: "10dp",
        height: Ti.UI.SIZE,
        id: "competition_title"
    });
    $.__views.comp_item_block.add($.__views.competition_title);
    $.__views.competition_desc_text = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "16dp"
        },
        top: "2dp",
        bottom: "10dp",
        height: Ti.UI.SIZE,
        left: "15dp",
        right: "15dp",
        textAlign: Ti.UI.LEFT,
        id: "competition_desc_text"
    });
    $.__views.comp_item_block.add($.__views.competition_desc_text);
    $.__views.competition_visit_site_btn = Ti.UI.createButton({
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
        borderRadius: 4,
        bottom: "10dp",
        id: "competition_visit_site_btn",
        title: "VIEW COMPETITION"
    });
    $.__views.comp_scroll_view.add($.__views.competition_visit_site_btn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Opening competition page");
    var args = arguments[0] || {};
    var compeitition_name = args.title || "Title not received";
    Ti.API.info("Comp title: " + compeitition_name);
    $.competition_title.text = args.title || "Title not received";
    if (null != args.banner_img_url && "" != args.banner_img_url) {
        var new_height = "160dp";
        Ti.API.info("new height: " + new_height);
        var competition_image_view = Alloy.Globals.Utils.RemoteImage({
            image: args.banner_img_url,
            defaultImage: "/images/placeholders/ph_events.png",
            height: new_height
        });
        $.competition_banner_image.add(competition_image_view);
    }
    null != args.description && "" != args.description && ($.competition_desc_text.text = args.description);
    null != args.more_info_url && "" != args.more_info_url ? $.competition_visit_site_btn.addEventListener("click", function() {
        Ti.API.info("Competition website button clicked! Go to: " + args.more_info_url);
        Ti.Platform.openURL(args.more_info_url);
    }) : $.comp_scroll_view.remove($.competition_visit_site_btn);
    $.competition_desc.addEventListener("close", function() {
        Ti.API.info("Comp desc closed");
    });
    $.competition_desc.addEventListener("open", function() {
        Ti.API.info("Comp desc opened");
        Alloy.Globals.windowStack.push($.competition_desc);
    });
    $.competition_desc.addEventListener("androidback", function() {
        $.competition_desc.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.competition_desc);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId156!click!closeWindow"] && $.__views.__alloyId156.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId158!click!goToHome"] && $.__views.__alloyId158.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId162!click!closeWindow"] && $.__views.__alloyId162.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId164!click!goToHome"] && $.__views.__alloyId164.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId167!click!goToHome"] && $.__views.__alloyId167.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId169!click!closeWindow"] && $.__views.__alloyId169.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;