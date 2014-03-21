function Controller() {
    function closeBtnHandler() {
        $.terms_and_conditions.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "terms_and_conditions";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.terms_and_conditions = Ti.UI.createWindow({
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
        id: "terms_and_conditions"
    });
    $.__views.terms_and_conditions && $.addTopLevelView($.__views.terms_and_conditions);
    $.__views.__alloyId410 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId410"
    });
    $.__views.terms_and_conditions.add($.__views.__alloyId410);
    $.__views.__alloyId411 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId411"
    });
    $.__views.__alloyId410.add($.__views.__alloyId411);
    $.__views.__alloyId412 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId412"
    });
    $.__views.__alloyId410.add($.__views.__alloyId412);
    $.__views.__alloyId413 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId413"
    });
    $.__views.__alloyId412.add($.__views.__alloyId413);
    closeBtnHandler ? $.__views.__alloyId413.addEventListener("click", closeBtnHandler) : __defers["$.__views.__alloyId413!click!closeBtnHandler"] = true;
    $.__views.__alloyId414 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "TERMS AND CONDITIONS",
        id: "__alloyId414"
    });
    $.__views.__alloyId412.add($.__views.__alloyId414);
    $.__views.__alloyId415 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId415"
    });
    $.__views.terms_and_conditions.add($.__views.__alloyId415);
    $.__views.scrollText = Ti.UI.createScrollView({
        layout: "vertical",
        bottom: "0dp",
        width: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        disableBounce: true,
        top: "1dp",
        id: "scrollText",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false"
    });
    $.__views.terms_and_conditions.add($.__views.scrollText);
    $.__views.TandC_Text = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "14dp"
        },
        top: "10dp",
        height: Ti.UI.SIZE,
        left: "10dp",
        right: "10dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "",
        id: "TandC_Text"
    });
    $.__views.scrollText.add($.__views.TandC_Text);
    $.__views.__alloyId416 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: "0dp",
        id: "__alloyId416"
    });
    $.__views.scrollText.add($.__views.__alloyId416);
    $.__views.drinkaware_img = Ti.UI.createImageView({
        bottom: "0dp",
        height: "60dp",
        width: Ti.UI.SIZE,
        left: "0dp",
        id: "drinkaware_img",
        image: "/images/age_gate/drinkaware.png"
    });
    $.__views.__alloyId416.add($.__views.drinkaware_img);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Terms and Conditions opened");
    var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "data/T_and_Cs.txt");
    var TandC_Text = "";
    if (readFile.exists()) {
        Ti.API.info("Terms and Conditions files exists");
        TandC_Text = readFile.read();
    } else alert("Terms and Conditions text file not found");
    $.terms_and_conditions.addEventListener("androidback", function() {
        $.terms_and_conditions.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
    });
    $.TandC_Text.text = TandC_Text.text;
    __defers["$.__views.__alloyId408!click!closeBtnHandler"] && $.__views.__alloyId408.addEventListener("click", closeBtnHandler);
    __defers["$.__views.__alloyId413!click!closeBtnHandler"] && $.__views.__alloyId413.addEventListener("click", closeBtnHandler);
    __defers["$.__views.close_Btn!click!closeBtnHandler"] && $.__views.close_Btn.addEventListener("click", closeBtnHandler);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;