function Controller() {
    function openDrinks(e) {
        Ti.API.info("Drink selection made: " + e.source.drinkData.title);
        var resultsWin = Alloy.createController("cocktail_results", e.source.drinkData).getView();
        resultsWin.open();
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.drinks_sub_category);
        Alloy.Globals.windowStack.splice(a, 1);
        $.drinks_sub_category.close();
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
        title: "DRINKS",
        id: "drinks_sub_category"
    });
    $.__views.drinks_sub_category && $.addTopLevelView($.__views.drinks_sub_category);
    $.__views.__alloyId195 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        id: "__alloyId195"
    });
    $.__views.drinks_sub_category.add($.__views.__alloyId195);
    $.__views.__alloyId196 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId196"
    });
    $.__views.__alloyId195.add($.__views.__alloyId196);
    $.__views.__alloyId197 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId197"
    });
    $.__views.__alloyId195.add($.__views.__alloyId197);
    $.__views.__alloyId198 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId198"
    });
    $.__views.__alloyId197.add($.__views.__alloyId198);
    closeWindow ? $.__views.__alloyId198.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId198!click!closeWindow"] = true;
    $.__views.drinks_sub_category_page_title = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "DRINKS",
        id: "drinks_sub_category_page_title"
    });
    $.__views.__alloyId197.add($.__views.drinks_sub_category_page_title);
    $.__views.__alloyId199 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId199"
    });
    $.__views.__alloyId197.add($.__views.__alloyId199);
    goToHome ? $.__views.__alloyId199.addEventListener("click", goToHome) : __defers["$.__views.__alloyId199!click!goToHome"] = true;
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
    $.__views.twitterBtn_subCat = Ti.UI.createLabel({
        width: "105dp",
        height: "34dp",
        backgroundColor: "transparent",
        borderRadius: "2dp",
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "14dp"
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
        },
        id: "twitterBtn_subCat"
    });
    $.__views.twitterParent_subcategory.add($.__views.twitterBtn_subCat);
    $.__views.facebookParent_subcategory = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "facebookParent_subcategory"
    });
    $.__views.social_hor_view_subcategory.add($.__views.facebookParent_subcategory);
    $.__views.facebookBtn_subCat = Ti.UI.createLabel({
        width: "105dp",
        height: "34dp",
        backgroundColor: "transparent",
        borderRadius: "2dp",
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "14dp"
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
        left: "30dp",
        id: "facebookBtn_subCat"
    });
    $.__views.facebookParent_subcategory.add($.__views.facebookBtn_subCat);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var sub_category = arguments[0] || {};
    var cocktail_category = sub_category.id || "Category not received";
    Ti.API.info("Cocktail category: " + cocktail_category);
    $.drinks_sub_category.title = sub_category.title.toUpperCase();
    var horizontal_drink_view_style = $.createStyle({
        classes: [ "horizontal_drinks_nav_view" ]
    });
    var single_drink_view_style = $.createStyle({
        classes: [ "drink_single_view" ]
    });
    var single_drink_image_style = $.createStyle({
        classes: [ "drink_image" ]
    });
    var single_drink_title_style = $.createStyle({
        classes: [ "drink_title" ]
    });
    var single_drink_image_style_bottle = $.createStyle({
        classes: [ "drink_image_bottle" ]
    });
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
                image: "./images/common/highlight_circle.png"
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
    null == sub_category.facebook || "" == sub_category.facebook ? $.social_hor_view_subcategory.remove($.facebookParent_subcategory) : $.facebookBtn_subCat.html = '<a href="http://www.facebook.com/' + sub_category.facebook + '" target="_blank"><div style="height:30px;"><img src="./images/icons/facebookIcon@2x.png" style="width:20px;height:25px;left:3px;"><span style="color:#fff;font-size:16px;line-height:30px;height:30px !important;vertical-align:top;">Facebook</span></div></a>';
    null == sub_category.twitter || "" == sub_category.twitter ? $.social_hor_view_subcategory.remove($.twitterParent_subcategory) : $.twitterBtn_subCat.html = '<a href="http://twitter.com/' + sub_category.twitter + '" target="_blank"><div style="height:30px;"><img src="./images/icons/twitterbird@2x.png" style="width:25px;height:20px;top:5px;left:5px;"><span style="color:#fff;font-size:16px;line-height:30px;height:30px !important;vertical-align:top;">Twitter</span></div></a>';
    $.drinks_sub_category.addEventListener("close", function() {
        Ti.API.info("drinks subcategory closed");
    });
    $.drinks_sub_category.addEventListener("open", function(e) {
        Ti.API.info("drinks subcategory opened");
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