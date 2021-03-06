function Controller() {
    function DisplayDrinks(newJSON) {
        var drinks_json;
        drinks_json = null != newJSON ? JSON.parse(newJSON) : JSON.parse(drinks_json_text);
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
        var resultAspectRatio = 120 / 90;
        var pixelHeight = Math.floor(pixelWidth * resultAspectRatio);
        horizontal_drink_view_style.height = Math.floor(pixelHeight).toString() + "px";
        Ti.API.info("row left " + horizontal_drink_view_style.left + ", height: " + horizontal_drink_view_style.right);
        var single_drink_view_style = $.createStyle({
            classes: [ "drink_single_view" ]
        });
        var divide = 320 / 90;
        var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
        single_drink_view_style.width = Math.floor(pixelWidth).toString() + "px";
        var resultAspectRatio = 120 / 90;
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
        for (var i = 0; drinks_json.length > i; i += 3) {
            Ti.API.info("Drink " + i + " Title: " + drinks_json[i].Drink.title);
            var horizontal_drink_view = Ti.UI.createView();
            horizontal_drink_view.applyProperties(horizontal_drink_view_style);
            $.drink_types.add(horizontal_drink_view);
            for (y = i; i + 3 > y && drinks_json.length > y; y++) {
                Ti.API.info("Drink " + y + " Title: " + drinks_json[y].Drink.title);
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
                    image: drinks_json[y].Drink.image,
                    defaultImage: "images/category_images/generic.png",
                    height: Ti.UI.SIZE,
                    width: Ti.UI.SIZE
                });
                overlay_drink_image.applyProperties(single_drink_image_style_bottle);
                single_drink_view.add(overlay_drink_image);
                var drink_single_label = Ti.UI.createLabel({
                    text: drinks_json[y].Drink.title
                });
                drink_single_label.applyProperties(single_drink_title_style);
                single_drink_view.add(drink_single_label);
                drinks_json[y].Drink.topCategory = 0 >= drinks_json[y].Drink.subcategories.length ? true : false;
                single_drink_view.drinkData = drinks_json[y].Drink;
                single_drink_view.addEventListener("click", openDrinks);
            }
        }
    }
    function openDrinks(e) {
        Ti.API.info("Drink selection made: " + e.source.drinkData.title);
        if (0 >= e.source.drinkData.subcategories.length) {
            Ti.API.info("No drink sub category, open cocktail display");
            e.source.drinkData.topCategory = true;
            var resultsWin = Alloy.createController("cocktail_results", e.source.drinkData).getView();
            resultsWin.open({
                activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
                activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
            });
        } else {
            Ti.API.info("There are drink sub categories, open more options");
            e.source.drinkData.topCategory = false;
            var sub_categoryWin = Alloy.createController("drinks_sub_category", e.source.drinkData).getView();
            sub_categoryWin.open({
                activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
                activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
            });
        }
    }
    function openSearch() {
        var searchWin = Alloy.createController("search").getView();
        searchWin.open({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
        });
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.drinks_categories);
        Alloy.Globals.windowStack.splice(a, 1);
        $.drinks_categories.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "drinks_categories";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.drinks_categories = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        height: "100%",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        modal: false,
        title: "COCKTAILS",
        id: "drinks_categories"
    });
    $.__views.drinks_categories && $.addTopLevelView($.__views.drinks_categories);
    $.__views.__alloyId167 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        id: "__alloyId167"
    });
    $.__views.drinks_categories.add($.__views.__alloyId167);
    $.__views.__alloyId168 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId168"
    });
    $.__views.__alloyId167.add($.__views.__alloyId168);
    $.__views.__alloyId169 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId169"
    });
    $.__views.__alloyId167.add($.__views.__alloyId169);
    $.__views.__alloyId170 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId170"
    });
    $.__views.__alloyId169.add($.__views.__alloyId170);
    closeWindow ? $.__views.__alloyId170.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId170!click!closeWindow"] = true;
    $.__views.__alloyId171 = Ti.UI.createLabel(function() {
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
            text: "COCKTAILS",
            color: "#313646",
            id: "__alloyId171"
        });
        return o;
    }());
    $.__views.__alloyId169.add($.__views.__alloyId171);
    $.__views.__alloyId172 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId172"
    });
    $.__views.__alloyId169.add($.__views.__alloyId172);
    goToHome ? $.__views.__alloyId172.addEventListener("click", goToHome) : __defers["$.__views.__alloyId172!click!goToHome"] = true;
    $.__views.__alloyId179 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        id: "__alloyId179"
    });
    $.__views.drinks_categories.add($.__views.__alloyId179);
    $.__views.__alloyId180 = Ti.UI.createScrollView({
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
        id: "__alloyId180"
    });
    $.__views.drinks_categories.add($.__views.__alloyId180);
    $.__views.drink_types = Ti.UI.createView({
        id: "drink_types",
        layout: "vertical",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId180.add($.__views.drink_types);
    $.__views.__alloyId181 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId181"
    });
    $.__views.__alloyId180.add($.__views.__alloyId181);
    $.__views.__alloyId182 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: "#747474",
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "18dp"
            },
            top: "2dp",
            height: Ti.UI.SIZE
        });
        Alloy.isTablet && _.extend(o, {
            color: "#747474",
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "22dp"
            },
            height: Ti.UI.SIZE,
            top: "10dp"
        });
        _.extend(o, {
            text: "Alternatively",
            id: "__alloyId182"
        });
        return o;
    }());
    $.__views.__alloyId181.add($.__views.__alloyId182);
    $.__views.__alloyId184 = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            backgroundColor: Alloy.Globals.PrimaryColor,
            color: "#fff",
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "18dp"
            },
            width: "220dp",
            height: "45dp",
            borderRadius: 8,
            top: "4dp",
            bottom: "6dp"
        });
        Alloy.isTablet && _.extend(o, {
            backgroundColor: Alloy.Globals.PrimaryColor,
            color: "#fff",
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "22dp"
            },
            width: "260dp",
            height: "50dp",
            borderRadius: 8,
            tintColor: "#fff",
            bottom: "10dp"
        });
        _.extend(o, {
            title: "Search Cocktails",
            image: "/images/icons/search-white.png",
            id: "__alloyId184"
        });
        return o;
    }());
    $.__views.__alloyId181.add($.__views.__alloyId184);
    openSearch ? $.__views.__alloyId184.addEventListener("click", openSearch) : __defers["$.__views.__alloyId184!click!openSearch"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var drinks_json_text = "";
    Alloy.Globals.Utils.GetAppData("/client/idl/perfect-mix/drinks/drinks/viewjson", "data/Drinks.txt", DisplayDrinks);
    $.drinks_categories.addEventListener("close", function() {});
    $.drinks_categories.addEventListener("open", function() {
        Alloy.Globals.windowStack.push($.drinks_categories);
    });
    $.drinks_categories.addEventListener("androidback", function() {
        $.drinks_categories.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.drinks_categories);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId170!click!closeWindow"] && $.__views.__alloyId170.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId172!click!goToHome"] && $.__views.__alloyId172.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId176!click!closeWindow"] && $.__views.__alloyId176.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId178!click!goToHome"] && $.__views.__alloyId178.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId183!click!openSearch"] && $.__views.__alloyId183.addEventListener("click", openSearch);
    __defers["$.__views.__alloyId184!click!openSearch"] && $.__views.__alloyId184.addEventListener("click", openSearch);
    __defers["$.__views.__alloyId185!click!openSearch"] && $.__views.__alloyId185.addEventListener("click", openSearch);
    __defers["$.__views.__alloyId187!click!goToHome"] && $.__views.__alloyId187.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId189!click!closeWindow"] && $.__views.__alloyId189.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;