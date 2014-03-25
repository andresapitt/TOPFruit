function Controller() {
    function DisplayEvents(newJSON) {
        var events_json;
        events_json = null != newJSON ? JSON.parse(newJSON) : JSON.parse(events_json_text);
        var eventsToShow = [];
        for (var i = 0; events_json.length > i; i++) {
            var parts = events_json[i].Event.finish_date.substring(0, 10).split("-");
            var event_finish_date = new Date(parts[0], parts[1] - 1, parts[2]);
            Ti.API.info("event finish date: " + events_json[i].Event.finish_date.substring(0, 10) + " (parsed) " + event_finish_date.toString());
            if (new Date() > event_finish_date) Ti.API.info("event " + i + " date is greater than current date"); else {
                Ti.API.info("event " + i + " date is less or equal to current date");
                eventsToShow.push(events_json[i]);
            }
        }
        var event_view_style = $.createStyle({
            classes: [ "event_item" ]
        });
        var event_title_style = $.createStyle({
            classes: [ "event_title" ]
        });
        var event_seperator_style = $.createStyle({
            classes: [ "event_separator" ]
        });
        var event_image_style = $.createStyle({
            classes: [ "event_image" ]
        });
        var event_arrow_style = $.createStyle({
            classes: [ "event_arrow" ]
        });
        var event_time_style = $.createStyle({
            classes: [ "event_time" ]
        });
        for (var i = 0; eventsToShow.length > i; i++) {
            Ti.API.info("Event " + i + " Title: " + eventsToShow[i].Event.title);
            var event_item_view = Ti.UI.createView();
            var vertical_event_container = Ti.UI.createView({
                layout: "vertical",
                height: "67dp",
                left: "72dp",
                right: "20dp",
                touchEnabled: false
            });
            event_item_view.add(vertical_event_container);
            var event_title_label = Ti.UI.createLabel({
                text: eventsToShow[i].Event.title.toUpperCase()
            });
            event_title_label.applyProperties(event_title_style);
            vertical_event_container.add(event_title_label);
            event_item_view.applyProperties(event_view_style);
            var event_time_label = Ti.UI.createLabel({
                text: eventsToShow[i].Event.date
            });
            event_time_label.applyProperties(event_time_style);
            vertical_event_container.add(event_time_label);
            var event_image_view = Alloy.Globals.Utils.RemoteImage({
                image: eventsToShow[i].Event.thumb_image_url,
                defaultImage: "/images/placeholders/ph_events.png"
            });
            event_image_view.applyProperties(event_image_style);
            event_item_view.add(event_image_view);
            var event_arrow_view;
            var event_arrow_view = Ti.UI.createImageView({
                image: "./images/common/chevron.png"
            });
            event_arrow_view.applyProperties(event_arrow_style);
            event_item_view.add(event_arrow_view);
            event_item_view.eventData = eventsToShow[i].Event;
            event_item_view.addEventListener("click", openEventDescription);
            $.event_item_container.add(event_item_view);
            if (i != events_json.length - 1) {
                var event_sep_view = Ti.UI.createView();
                event_sep_view.applyProperties(event_seperator_style);
                $.event_item_container.add(event_sep_view);
            }
        }
    }
    function openEventDescription(e) {
        Ti.API.info("Opening event description, title: " + e.source.eventData.title);
        var event_desc_Win = Alloy.createController("event_desc", e.source.eventData).getView();
        event_desc_Win.open();
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.events);
        Alloy.Globals.windowStack.splice(a, 1);
        $.events.close();
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "events";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.events = Ti.UI.createWindow({
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
        title: "UPCOMING EVENTS",
        id: "events"
    });
    $.__views.events && $.addTopLevelView($.__views.events);
    $.__views.__alloyId236 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId236"
    });
    $.__views.events.add($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId237"
    });
    $.__views.__alloyId236.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId238"
    });
    $.__views.__alloyId236.add($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId239"
    });
    $.__views.__alloyId238.add($.__views.__alloyId239);
    closeWindow ? $.__views.__alloyId239.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId239!click!closeWindow"] = true;
    $.__views.__alloyId240 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "UPCOMING EVENTS",
        id: "__alloyId240"
    });
    $.__views.__alloyId238.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId241"
    });
    $.__views.__alloyId238.add($.__views.__alloyId241);
    goToHome ? $.__views.__alloyId241.addEventListener("click", goToHome) : __defers["$.__views.__alloyId241!click!goToHome"] = true;
    $.__views.__alloyId242 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId242"
    });
    $.__views.events.add($.__views.__alloyId242);
    $.__views.event_view = Ti.UI.createScrollView({
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
        id: "event_view"
    });
    $.__views.events.add($.__views.event_view);
    $.__views.event_item_container = Ti.UI.createView({
        backgroundColor: "#fff",
        height: Ti.UI.SIZE,
        borderRadius: 0,
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        layout: "vertical",
        bottom: "10dp",
        id: "event_item_container"
    });
    $.__views.event_view.add($.__views.event_item_container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/events/events/viewjson", "data/Events.txt", DisplayEvents);
    var events_json_text = "";
    $.events.addEventListener("close", function() {
        Ti.API.info("Events window closed");
    });
    $.events.addEventListener("open", function() {
        Ti.API.info("Events window opened");
        Alloy.Globals.windowStack.push($.events);
    });
    $.events.addEventListener("androidback", function() {
        $.events.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.events);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId233!click!closeWindow"] && $.__views.__alloyId233.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId235!click!goToHome"] && $.__views.__alloyId235.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId239!click!closeWindow"] && $.__views.__alloyId239.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId241!click!goToHome"] && $.__views.__alloyId241.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId244!click!goToHome"] && $.__views.__alloyId244.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId246!click!closeWindow"] && $.__views.__alloyId246.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;