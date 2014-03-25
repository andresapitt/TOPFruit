function Controller() {
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.event_desc);
        Alloy.Globals.windowStack.splice(a, 1);
        $.event_desc.close();
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "event_desc";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.event_desc = Ti.UI.createWindow({
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
        title: "ABOUT EVENT",
        id: "event_desc"
    });
    $.__views.event_desc && $.addTopLevelView($.__views.event_desc);
    $.__views.__alloyId215 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId215"
    });
    $.__views.event_desc.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId216"
    });
    $.__views.__alloyId215.add($.__views.__alloyId216);
    $.__views.__alloyId217 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId217"
    });
    $.__views.__alloyId215.add($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId218"
    });
    $.__views.__alloyId217.add($.__views.__alloyId218);
    closeWindow ? $.__views.__alloyId218.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId218!click!closeWindow"] = true;
    $.__views.__alloyId219 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "ABOUT EVENT",
        id: "__alloyId219"
    });
    $.__views.__alloyId217.add($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId220"
    });
    $.__views.__alloyId217.add($.__views.__alloyId220);
    goToHome ? $.__views.__alloyId220.addEventListener("click", goToHome) : __defers["$.__views.__alloyId220!click!goToHome"] = true;
    $.__views.__alloyId221 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId221"
    });
    $.__views.event_desc.add($.__views.__alloyId221);
    $.__views.event_decs_scrollview = Ti.UI.createScrollView({
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
        id: "event_decs_scrollview"
    });
    $.__views.event_desc.add($.__views.event_decs_scrollview);
    $.__views.event_title = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "5dp",
        bottom: "0dp",
        top: "10dp",
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        right: "5dp",
        text: "...",
        id: "event_title"
    });
    $.__views.event_decs_scrollview.add($.__views.event_title);
    $.__views.event_desc_parent = Ti.UI.createView({
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
        id: "event_desc_parent"
    });
    $.__views.event_decs_scrollview.add($.__views.event_desc_parent);
    $.__views.event_banner_image = Ti.UI.createView({
        id: "event_banner_image",
        bottom: "5dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
    $.__views.event_desc_parent.add($.__views.event_banner_image);
    $.__views.event_where_view = Ti.UI.createView({
        id: "event_where_view",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.event_desc_parent.add($.__views.event_where_view);
    $.__views.__alloyId222 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "15dp",
        bottom: "0dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        text: "WHERE",
        id: "__alloyId222"
    });
    $.__views.event_where_view.add($.__views.__alloyId222);
    $.__views.event_where_text = Ti.UI.createLabel({
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
        text: "Jameson Factory, Smithfield, Dublin 2",
        id: "event_where_text"
    });
    $.__views.event_where_view.add($.__views.event_where_text);
    $.__views.event_when_view = Ti.UI.createView({
        id: "event_when_view",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.event_desc_parent.add($.__views.event_when_view);
    $.__views.__alloyId223 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "15dp",
        bottom: "0dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        text: "WHEN",
        id: "__alloyId223"
    });
    $.__views.event_when_view.add($.__views.__alloyId223);
    $.__views.event_when_text = Ti.UI.createLabel({
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
        text: "Thurs 4th - 6th Sun",
        id: "event_when_text"
    });
    $.__views.event_when_view.add($.__views.event_when_text);
    $.__views.event_admission_view = Ti.UI.createView({
        id: "event_admission_view",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.event_desc_parent.add($.__views.event_admission_view);
    $.__views.__alloyId224 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "15dp",
        bottom: "0dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        text: "ADMISSION",
        id: "__alloyId224"
    });
    $.__views.event_admission_view.add($.__views.__alloyId224);
    $.__views.event_admission_text = Ti.UI.createLabel({
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
        text: "$0.00",
        id: "event_admission_text"
    });
    $.__views.event_admission_view.add($.__views.event_admission_text);
    $.__views.event_desc_view = Ti.UI.createView({
        id: "event_desc_view",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.event_desc_parent.add($.__views.event_desc_view);
    $.__views.__alloyId225 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "15dp",
        bottom: "0dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        text: "DESCRIPTION",
        id: "__alloyId225"
    });
    $.__views.event_desc_view.add($.__views.__alloyId225);
    $.__views.event_desc_text = Ti.UI.createLabel({
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
        text: "This is the description",
        id: "event_desc_text"
    });
    $.__views.event_desc_view.add($.__views.event_desc_text);
    $.__views.location_header_title = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        left: "15dp",
        bottom: "0dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        text: "LOCATION",
        id: "location_header_title",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    });
    $.__views.event_decs_scrollview.add($.__views.location_header_title);
    $.__views.event_map_view = Ti.UI.createView({
        backgroundColor: "#fff",
        height: Ti.UI.SIZE,
        borderRadius: "6",
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        layout: "vertical",
        bottom: "10dp",
        id: "event_map_view"
    });
    $.__views.event_decs_scrollview.add($.__views.event_map_view);
    $.__views.event_visit_site_Btn = Ti.UI.createButton({
        top: "0dp",
        color: "#ffffff",
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
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "event_visit_site_Btn",
        title: "VISIT SITE"
    });
    $.__views.event_decs_scrollview.add($.__views.event_visit_site_Btn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Opening event desciption page");
    var args = arguments[0] || {};
    var eventName = args.title || "Title not received";
    Ti.API.info("Event title: " + eventName);
    $.event_title.text = args.title || "Title not received";
    if (null != args.banner_img_url && "" != args.banner_img_url) {
        var new_height = "160dp";
        Ti.API.info("new height: " + new_height);
        var event_image_view = Alloy.Globals.Utils.RemoteImage({
            image: args.banner_img_url,
            defaultImage: "/images/placeholders/ph_events.png",
            height: new_height
        });
        $.event_banner_image.add(event_image_view);
    }
    null != args.location && "" != args.location ? $.event_where_text.text = args.location : $.event_desc_parent.remove($.event_where_view);
    null != args.date && "" != args.date ? $.event_when_text.text = args.date : $.event_desc_parent.remove($.event_when_view);
    null != args.admission_fee && "" != args.admission_fee ? $.event_admission_text.text = args.admission_fee : $.event_desc_parent.remove($.event_admission_view);
    null != args.description && "" != args.description ? $.event_desc_text.text = args.description : $.event_desc_parent.remove($.event_desc_view);
    null != args.more_info_url && "" != args.more_info_url ? $.event_visit_site_Btn.addEventListener("click", function() {
        Ti.Platform.openURL(args.more_info_url);
    }) : $.event_decs_scrollview.remove($.event_visit_site_Btn);
    if (null != args.longitude && null != args.latitude) {
        var remoteMapImage = Ti.UI.createImageView({
            image: "http://maps.googleapis.com/maps/api/staticmap?center=" + args.latitude + "," + args.longitude + "&zoom=14&size=640x400&sensor=false&output=embed",
            width: Ti.UI.FILL,
            height: "200dp",
            borderRadius: 6
        });
        $.event_map_view.add(remoteMapImage);
    } else {
        $.event_decs_scrollview.remove($.event_map_view);
        $.event_decs_scrollview.remove($.location_header_title);
    }
    $.event_desc.addEventListener("close", function() {
        Ti.API.info("event desc closed");
    });
    $.event_desc.addEventListener("open", function() {
        Ti.API.info("event desc opened");
        Alloy.Globals.windowStack.push($.event_desc);
    });
    $.event_desc.addEventListener("androidback", function() {
        $.event_desc.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.event_desc);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId212!click!closeWindow"] && $.__views.__alloyId212.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId214!click!goToHome"] && $.__views.__alloyId214.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId218!click!closeWindow"] && $.__views.__alloyId218.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId220!click!goToHome"] && $.__views.__alloyId220.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId227!click!goToHome"] && $.__views.__alloyId227.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId229!click!closeWindow"] && $.__views.__alloyId229.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;