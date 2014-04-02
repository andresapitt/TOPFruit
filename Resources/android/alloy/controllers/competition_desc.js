function Controller() {
    function PixelsToDPUnits(ThePixels) {
        return ThePixels / (Titanium.Platform.displayCaps.dpi / 160);
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.competition_desc);
        Alloy.Globals.windowStack.splice(a, 1);
        $.competition_desc.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
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
        layout: "vertical",
        height: "100%",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        modal: false,
        title: "COMPETITION",
        id: "competition_desc"
    });
    $.__views.competition_desc && $.addTopLevelView($.__views.competition_desc);
    $.__views.__alloyId132 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId132"
    });
    $.__views.competition_desc.add($.__views.__alloyId132);
    $.__views.__alloyId133 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId133"
    });
    $.__views.__alloyId132.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId134"
    });
    $.__views.__alloyId132.add($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId135"
    });
    $.__views.__alloyId134.add($.__views.__alloyId135);
    closeWindow ? $.__views.__alloyId135.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId135!click!closeWindow"] = true;
    $.__views.__alloyId136 = Ti.UI.createLabel(function() {
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
            text: "COMPETITION",
            color: "#313646",
            id: "__alloyId136"
        });
        return o;
    }());
    $.__views.__alloyId134.add($.__views.__alloyId136);
    $.__views.__alloyId137 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId137"
    });
    $.__views.__alloyId134.add($.__views.__alloyId137);
    goToHome ? $.__views.__alloyId137.addEventListener("click", goToHome) : __defers["$.__views.__alloyId137!click!goToHome"] = true;
    $.__views.__alloyId144 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId144"
    });
    $.__views.competition_desc.add($.__views.__alloyId144);
    $.__views.comp_scroll_view = Ti.UI.createScrollView({
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
        id: "comp_scroll_view"
    });
    $.__views.competition_desc.add($.__views.comp_scroll_view);
    $.__views.comp_item_block = Ti.UI.createView(function() {
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
            id: "comp_item_block",
            bottom: "10dp"
        });
        return o;
    }());
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
    $.__views.competition_visit_site_btn = Ti.UI.createButton(function() {
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
            bottom: "10dp",
            width: Ti.UI.FILL
        });
        Alloy.isTablet && _.extend(o, {
            top: "0dp",
            color: "#fff",
            backgroundColor: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            width: Ti.UI.FILL,
            left: "10dp",
            right: "10dp",
            height: "50dp",
            borderRadius: "4dp",
            bottom: "10dp"
        });
        _.extend(o, {
            id: "competition_visit_site_btn",
            title: "VIEW COMPETITION",
            bottom: "10dp"
        });
        return o;
    }());
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
        new_height = PixelsToDPUnits(160 * (Ti.Platform.displayCaps.platformWidth / 320));
        Ti.API.info("new height: " + new_height);
        var competition_image_view = Alloy.Globals.Utils.RemoteImage({
            image: args.banner_img_url,
            defaultImage: "/images/placeholders/ph_events.png",
            height: new_height,
            width: Ti.UI.FILL
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
    __defers["$.__views.__alloyId135!click!closeWindow"] && $.__views.__alloyId135.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId137!click!goToHome"] && $.__views.__alloyId137.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId141!click!closeWindow"] && $.__views.__alloyId141.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId143!click!goToHome"] && $.__views.__alloyId143.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId146!click!goToHome"] && $.__views.__alloyId146.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId148!click!closeWindow"] && $.__views.__alloyId148.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;