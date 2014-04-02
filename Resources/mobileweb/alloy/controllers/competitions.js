function Controller() {
    function DisplayCompetitions(newJSON) {
        var competition_json;
        competition_json = null != newJSON ? JSON.parse(newJSON) : JSON.parse(competitions_json_text);
        var competition_view_style = $.createStyle({
            classes: [ "competition_item" ]
        });
        var competition_title_style = $.createStyle({
            classes: [ "competition_title" ]
        });
        var competition_seperator_style = $.createStyle({
            classes: [ "competition_separator" ]
        });
        var competition_image_style = $.createStyle({
            classes: [ "competition_image" ]
        });
        var competition_arrow_style = $.createStyle({
            classes: [ "competition_arrow" ]
        });
        for (var i = 0; competition_json.length > i; i++) {
            Ti.API.info("Competition " + i + " Title: " + competition_json[i].Competition.title);
            var competition_item_view = Ti.UI.createView();
            var vertical_competition_container = Ti.UI.createView({
                layout: "vertical",
                height: "67dp",
                left: "72dp",
                right: "20dp",
                touchEnabled: false
            });
            competition_item_view.add(vertical_competition_container);
            var competition_title_label = Ti.UI.createLabel({
                text: competition_json[i].Competition.title.toUpperCase()
            });
            competition_title_label.applyProperties(competition_title_style);
            vertical_competition_container.add(competition_title_label);
            competition_item_view.applyProperties(competition_view_style);
            var competition_image_view = Alloy.Globals.Utils.RemoteImage({
                image: competition_json[i].Competition.thumb_image_url,
                defaultImage: "/images/placeholders/ph_events.png"
            });
            competition_image_view.applyProperties(competition_image_style);
            competition_item_view.add(competition_image_view);
            var competition_arrow_view = Ti.UI.createImageView({
                image: "/images/common/chevron.png"
            });
            competition_arrow_view.image = "./images/common/chevron.png";
            competition_arrow_view.applyProperties(competition_arrow_style);
            competition_item_view.add(competition_arrow_view);
            competition_item_view.competitionData = competition_json[i].Competition;
            competition_item_view.addEventListener("click", openCompetitionDescription);
            $.competition_item_container_sc.add(competition_item_view);
            if (i != competition_json.length - 1) {
                var competition_sep_view = Ti.UI.createView();
                competition_sep_view.applyProperties(competition_seperator_style);
                $.competition_item_container_sc.add(competition_sep_view);
            }
        }
    }
    function openCompetitionDescription(e) {
        var competition_desc_Win = Alloy.createController("competition_desc", e.source.competitionData).getView();
        competition_desc_Win.open();
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.competitions);
        Alloy.Globals.windowStack.splice(a, 1);
        $.competitions.close();
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "competitions";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.competitions = Ti.UI.createWindow({
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
        title: "COMPETITIONS",
        id: "competitions"
    });
    $.__views.competitions && $.addTopLevelView($.__views.competitions);
    $.__views.__alloyId155 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId155"
    });
    $.__views.competitions.add($.__views.__alloyId155);
    $.__views.__alloyId156 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId156"
    });
    $.__views.__alloyId155.add($.__views.__alloyId156);
    $.__views.__alloyId157 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId157"
    });
    $.__views.__alloyId155.add($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId158"
    });
    $.__views.__alloyId157.add($.__views.__alloyId158);
    closeWindow ? $.__views.__alloyId158.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId158!click!closeWindow"] = true;
    $.__views.__alloyId159 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "COMPETITIONS",
        id: "__alloyId159"
    });
    $.__views.__alloyId157.add($.__views.__alloyId159);
    $.__views.__alloyId160 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId160"
    });
    $.__views.__alloyId157.add($.__views.__alloyId160);
    goToHome ? $.__views.__alloyId160.addEventListener("click", goToHome) : __defers["$.__views.__alloyId160!click!goToHome"] = true;
    $.__views.__alloyId161 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId161"
    });
    $.__views.competitions.add($.__views.__alloyId161);
    $.__views.__alloyId162 = Ti.UI.createScrollView({
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
        id: "__alloyId162"
    });
    $.__views.competitions.add($.__views.__alloyId162);
    $.__views.competition_item_container_sc = Ti.UI.createView({
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
        id: "competition_item_container_sc"
    });
    $.__views.__alloyId162.add($.__views.competition_item_container_sc);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/competitions/competitions/viewjson", "data/Competitions.txt", DisplayCompetitions);
    var competitions_json_text = "";
    $.competitions.addEventListener("close", function() {
        Ti.API.info("competitions closed");
    });
    $.competitions.addEventListener("open", function() {
        Ti.API.info("Competitions opened");
        Alloy.Globals.windowStack.push($.competitions);
    });
    $.competitions.addEventListener("androidback", function() {
        $.competitions.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.competitions);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId152!click!closeWindow"] && $.__views.__alloyId152.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId154!click!goToHome"] && $.__views.__alloyId154.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId158!click!closeWindow"] && $.__views.__alloyId158.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId160!click!goToHome"] && $.__views.__alloyId160.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId164!click!goToHome"] && $.__views.__alloyId164.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId166!click!closeWindow"] && $.__views.__alloyId166.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;