function Controller() {
    function closeBtnHandler() {
        $.terms_and_conditions.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
        });
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
        layout: "vertical",
        height: "100%",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        modal: false,
        id: "terms_and_conditions"
    });
    $.__views.terms_and_conditions && $.addTopLevelView($.__views.terms_and_conditions);
    $.__views.__alloyId386 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId386"
    });
    $.__views.terms_and_conditions.add($.__views.__alloyId386);
    $.__views.__alloyId387 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId387"
    });
    $.__views.__alloyId386.add($.__views.__alloyId387);
    $.__views.__alloyId388 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId388"
    });
    $.__views.__alloyId386.add($.__views.__alloyId388);
    $.__views.__alloyId389 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId389"
    });
    $.__views.__alloyId388.add($.__views.__alloyId389);
    closeBtnHandler ? $.__views.__alloyId389.addEventListener("click", closeBtnHandler) : __defers["$.__views.__alloyId389!click!closeBtnHandler"] = true;
    $.__views.__alloyId390 = Ti.UI.createLabel(function() {
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
            text: "TERMS AND CONDITIONS",
            color: "#313646",
            id: "__alloyId390"
        });
        return o;
    }());
    $.__views.__alloyId388.add($.__views.__alloyId390);
    $.__views.__alloyId396 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId396"
    });
    $.__views.terms_and_conditions.add($.__views.__alloyId396);
    $.__views.scrollText = Ti.UI.createScrollView({
        layout: "vertical",
        bottom: "0dp",
        top: "1dp",
        width: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        disableBounce: true,
        id: "scrollText",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false"
    });
    $.__views.terms_and_conditions.add($.__views.scrollText);
    $.__views.TandC_Text = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "10dp",
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            left: "10dp",
            right: "10dp",
            color: Alloy.Globals.PrimaryColor,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            font: {
                fontSize: "12dp",
                fontFamily: Alloy.Globals.Mainfont
            }
        });
        Alloy.isTablet && _.extend(o, {
            top: "10dp",
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            left: "15dp",
            right: "15dp",
            color: Alloy.Globals.PrimaryColor,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            font: {
                fontSize: "14dp",
                fontFamily: Alloy.Globals.Mainfont
            }
        });
        _.extend(o, {
            text: "",
            id: "TandC_Text"
        });
        return o;
    }());
    $.__views.scrollText.add($.__views.TandC_Text);
    $.__views.__alloyId397 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: "0dp",
        id: "__alloyId397"
    });
    $.__views.scrollText.add($.__views.__alloyId397);
    $.__views.drinkaware_img = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            bottom: "0dp",
            height: "60dp",
            width: Ti.UI.SIZE,
            left: "0dp"
        });
        Alloy.isTablet && _.extend(o, {
            height: "100dp",
            left: "0dp",
            width: Ti.UI.SIZE
        });
        _.extend(o, {
            id: "drinkaware_img",
            image: "/images/age_gate/drinkaware.png"
        });
        return o;
    }());
    $.__views.__alloyId397.add($.__views.drinkaware_img);
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
    __defers["$.__views.__alloyId389!click!closeBtnHandler"] && $.__views.__alloyId389.addEventListener("click", closeBtnHandler);
    __defers["$.__views.__alloyId394!click!closeBtnHandler"] && $.__views.__alloyId394.addEventListener("click", closeBtnHandler);
    __defers["$.__views.close_Btn!click!closeBtnHandler"] && $.__views.close_Btn.addEventListener("click", closeBtnHandler);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;