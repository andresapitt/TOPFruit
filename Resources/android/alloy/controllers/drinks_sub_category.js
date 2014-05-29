function Controller() {
    function openDrinks(e) {
        Ti.API.info("Drink selection made: " + e.source.drinkData.title);
        var resultsWin = Alloy.createController("cocktail_results", e.source.drinkData).getView();
        resultsWin.open({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
        });
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.drinks_sub_category);
        Alloy.Globals.windowStack.splice(a, 1);
        $.drinks_sub_category.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "drinks_sub_category";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.drinks_sub_category = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        height: "100%",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        modal: false,
        title: "DRINKS",
        id: "drinks_sub_category"
    });
    $.__views.drinks_sub_category && $.addTopLevelView($.__views.drinks_sub_category);
    $.__views.__alloyId190 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        id: "__alloyId190"
    });
    $.__views.drinks_sub_category.add($.__views.__alloyId190);
    $.__views.__alloyId191 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId191"
    });
    $.__views.__alloyId190.add($.__views.__alloyId191);
    $.__views.__alloyId192 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId192"
    });
    $.__views.__alloyId190.add($.__views.__alloyId192);
    $.__views.__alloyId193 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId193"
    });
    $.__views.__alloyId192.add($.__views.__alloyId193);
    closeWindow ? $.__views.__alloyId193.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId193!click!closeWindow"] = true;
    $.__views.drinks_sub_category_page_title = Ti.UI.createLabel(function() {
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
            text: "DRINKS",
            color: "#313646",
            id: "drinks_sub_category_page_title"
        });
        return o;
    }());
    $.__views.__alloyId192.add($.__views.drinks_sub_category_page_title);
    $.__views.__alloyId194 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId194"
    });
    $.__views.__alloyId192.add($.__views.__alloyId194);
    goToHome ? $.__views.__alloyId194.addEventListener("click", goToHome) : __defers["$.__views.__alloyId194!click!goToHome"] = true;
    $.__views.__alloyId200 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        id: "__alloyId200"
    });
    $.__views.drinks_sub_category.add($.__views.__alloyId200);
    $.__views.__alloyId201 = Ti.UI.createScrollView({
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
        id: "__alloyId201"
    });
    $.__views.drinks_sub_category.add($.__views.__alloyId201);
    $.__views.drink_types_sub = Ti.UI.createView({
        id: "drink_types_sub",
        layout: "vertical",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId201.add($.__views.drink_types_sub);
    $.__views.__alloyId202 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId202"
    });
    $.__views.__alloyId201.add($.__views.__alloyId202);
    $.__views.social_hor_view_subcategory = Ti.UI.createView({
        layout: "horizontal",
        id: "social_hor_view_subcategory",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "10dp"
    });
    $.__views.__alloyId202.add($.__views.social_hor_view_subcategory);
    $.__views.twitterParent_subcategory = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "twitterParent_subcategory"
    });
    $.__views.social_hor_view_subcategory.add($.__views.twitterParent_subcategory);
    $.__views.__alloyId204 = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            width: "110dp",
            height: "36dp",
            backgroundColor: "#d1d1d1",
            borderRadius: 6,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "16dp"
            },
            color: "#fff",
            tintColor: "#fff",
            backgroundGradient: {
                type: "linear",
                startPoint: {
                    x: "50%",
                    y: "0%"
                },
                endPoint: {
                    x: "50%",
                    y: "100%"
                },
                colors: [ {
                    color: "#6db3e1",
                    offset: 0
                }, {
                    color: "#428ecf",
                    offset: 1
                } ]
            }
        });
        Alloy.isTablet && _.extend(o, {
            width: "200dp",
            height: "50dp",
            backgroundColor: "#d1d1d1",
            borderRadius: 8,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "22dp"
            },
            color: "#fff",
            tintColor: "#fff"
        });
        _.extend(o, {
            image: "/images/icons/twitterbird.png",
            title: "Twitter",
            id: "__alloyId204"
        });
        return o;
    }());
    $.__views.twitterParent_subcategory.add($.__views.__alloyId204);
    $.__views.facebookParent_subcategory = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "facebookParent_subcategory"
    });
    $.__views.social_hor_view_subcategory.add($.__views.facebookParent_subcategory);
    $.__views.__alloyId206 = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            width: "110dp",
            height: "36dp",
            backgroundColor: "#d1d1d1",
            borderRadius: 6,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "16dp"
            },
            color: "#fff",
            tintColor: "#fff",
            backgroundGradient: {
                type: "linear",
                startPoint: {
                    x: "50%",
                    y: "0%"
                },
                endPoint: {
                    x: "50%",
                    y: "100%"
                },
                colors: [ {
                    color: "#4b69a5",
                    offset: 0
                }, {
                    color: "#253d7d",
                    offset: 1
                } ]
            },
            left: "30dp"
        });
        Alloy.isTablet && _.extend(o, {
            width: "200dp",
            height: "50dp",
            backgroundColor: "#d1d1d1",
            borderRadius: 8,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "22dp"
            },
            color: "#fff",
            tintColor: "#fff"
        });
        _.extend(o, {
            image: "/images/icons/facebookIcon.png",
            title: "Facebook",
            id: "__alloyId206"
        });
        return o;
    }());
    $.__views.facebookParent_subcategory.add($.__views.__alloyId206);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var sub_category = arguments[0] || {};
    sub_category.id || "Category not received";
    $.drinks_sub_category.title = sub_category.title.toUpperCase();
    $.drinks_sub_category_page_title.text = sub_category.title.toUpperCase();
    var horizontal_drink_view_style = $.createStyle({
        classes: [ "horizontal_drinks_nav_view" ]
    });
    var divide = 32;
    var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
    horizontal_drink_view_style.left = Math.floor(pixelWidth).toString() + "px";
    horizontal_drink_view_style.right = Math.floor(pixelWidth).toString() + "px";
    horizontal_drink_view_style.top = Math.floor(pixelWidth).toString() + "px";
    divide = 320 / 90;
    pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
    var resultAspectRatio = 130 / 90;
    var pixelHeight = Math.floor(pixelWidth * resultAspectRatio);
    horizontal_drink_view_style.height = Math.floor(pixelHeight).toString() + "px";
    var single_drink_view_style = $.createStyle({
        classes: [ "drink_single_view" ]
    });
    var divide = 320 / 90;
    var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
    single_drink_view_style.width = Math.floor(pixelWidth).toString() + "px";
    var resultAspectRatio = 130 / 90;
    var resultHeight = Math.floor(pixelWidth * resultAspectRatio);
    single_drink_view_style.height = resultHeight.toString() + "px";
    divide = 64;
    pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
    single_drink_view_style.left = Math.floor(pixelWidth).toString() + "px";
    single_drink_view_style.right = Math.floor(pixelWidth).toString() + "px";
    var single_drink_image_style = $.createStyle({
        classes: [ "drink_image" ]
    });
    var divide = 320 / 90;
    var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
    single_drink_image_style.width = Math.floor(pixelWidth).toString() + "px";
    var resultAspectRatio = 95 / 90;
    var pixelheight = Math.floor(pixelWidth * resultAspectRatio);
    single_drink_image_style.height = Math.floor(pixelheight).toString() + "px";
    single_drink_image_style.height.top = 0;
    var single_drink_title_style = $.createStyle({
        classes: [ "drink_title" ]
    });
    var divide = 320 / 90;
    var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
    var resultAspectRatio = 95 / 90;
    var pixelheight = Math.floor(pixelWidth * resultAspectRatio);
    single_drink_title_style.top = Math.floor(pixelheight + 2).toString() + "px";
    var fontSizeRatio = 90 / 14;
    var fontSize = Math.floor(pixelWidth / fontSizeRatio);
    single_drink_title_style.font = {
        fontFamily: Alloy.Globals.MainFont,
        fontSize: fontSize.toString() + "px"
    };
    var single_drink_image_style_bottle = $.createStyle({
        classes: [ "drink_image_bottle" ]
    });
    var divide = 320 / 90;
    var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
    var resultAspectRatio = 95 / 90;
    var pixelheight = Math.floor(pixelWidth * resultAspectRatio);
    single_drink_image_style_bottle.height = Math.floor(pixelheight).toString() + "px";
    Ti.API.info("subcategories length: " + sub_category.subcategories.length);
    for (var i = 0; sub_category.subcategories.length > i; i += 3) {
        Ti.API.info("Sub-category: " + i + ", title: " + sub_category.subcategories[i].Subcategory.title);
        var horizontal_drink_view = Ti.UI.createView();
        horizontal_drink_view.applyProperties(horizontal_drink_view_style);
        $.drink_types_sub.add(horizontal_drink_view);
        for (var y = i; i + 3 > y && sub_category.subcategories.length > y; y++) {
            Ti.API.info("Drink " + y + " Title: " + sub_category.subcategories[y].Subcategory.title);
            var single_drink_view = Ti.UI.createView();
            single_drink_view.applyProperties(single_drink_view_style);
            horizontal_drink_view.add(single_drink_view);
            var drink_image;
            var drink_image = Ti.UI.createImageView({
                image: "/images/common/highlight_circle.png"
            });
            drink_image.applyProperties(single_drink_image_style);
            single_drink_view.add(drink_image);
            var overlay_drink_image = Alloy.Globals.Utils.RemoteImage({
                image: sub_category.subcategories[y].Subcategory.image,
                defaultImage: "images/category_images/generic.png"
            });
            overlay_drink_image.applyProperties(single_drink_image_style_bottle);
            single_drink_view.add(overlay_drink_image);
            var drink_single_label = Ti.UI.createLabel({
                text: sub_category.subcategories[y].Subcategory.title
            });
            drink_single_label.applyProperties(single_drink_title_style);
            single_drink_view.add(drink_single_label);
            sub_category.subcategories[y].Subcategory.topCategory = false;
            single_drink_view.drinkData = sub_category.subcategories[y].Subcategory;
            single_drink_view.addEventListener("click", openDrinks);
        }
    }
    null == sub_category.facebook || "" == sub_category.facebook || "" == sub_category.facebook.trim() ? $.social_hor_view_subcategory.remove($.facebookParent_subcategory) : $.facebookParent_subcategory.addEventListener("click", function() {
        var canOpen = Ti.Platform.openURL("fb://profile/" + sub_category.facebook);
        false == canOpen && Ti.UI.createAlertDialog({
            message: "Sorry, you must first have the facebook app installed on this device to click this button.",
            ok: "Ok, thanks!",
            title: "Facebook Error"
        }).show();
    });
    null == sub_category.twitter || "" == sub_category.twitter || "" == sub_category.twitter.trim() ? $.social_hor_view_subcategory.remove($.twitterParent_subcategory) : $.twitterParent_subcategory.addEventListener("click", function() {
        var canOpen = Ti.Platform.openURL("twitter://user?user_id=" + sub_category.twitter);
        false == canOpen && Ti.UI.createAlertDialog({
            message: "Sorry, you must first have the twitter app installed on this device to click this button.",
            ok: "Ok, thanks!",
            title: "Twitter Error"
        }).show();
    });
    $.drinks_sub_category.addEventListener("close", function() {});
    $.drinks_sub_category.addEventListener("open", function(e) {
        try {
            Alloy.Globals.windowStack.push($.drinks_sub_category);
        } catch (e) {
            Ti.API.info("push to window stack error: " + e.toString());
        }
    });
    $.drinks_sub_category.addEventListener("androidback", function() {
        $.drinks_sub_category.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.drinks_sub_category);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId193!click!closeWindow"] && $.__views.__alloyId193.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId194!click!goToHome"] && $.__views.__alloyId194.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId198!click!closeWindow"] && $.__views.__alloyId198.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId199!click!goToHome"] && $.__views.__alloyId199.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId208!click!goToHome"] && $.__views.__alloyId208.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId210!click!closeWindow"] && $.__views.__alloyId210.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;