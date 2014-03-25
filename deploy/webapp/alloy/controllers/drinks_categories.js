function Controller() {
    function DisplayDrinks(newJSON) {
        var drinks_json;
        drinks_json = null != newJSON ? JSON.parse(newJSON) : JSON.parse(drinks_json_text);
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
                    image: "./images/common/highlight_circle.png"
                });
                drink_image.applyProperties(single_drink_image_style);
                single_drink_view.add(drink_image);
                var overlay_drink_image = Alloy.Globals.Utils.RemoteImage({
                    image: drinks_json[y].Drink.image,
                    defaultImage: "images/category_images/generic.png"
                });
                overlay_drink_image.defaultImage = "./images/category_images/generic.png";
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
            resultsWin.open();
        } else {
            Ti.API.info("There are drink sub categories, open more options");
            e.source.drinkData.topCategory = false;
            var sub_categoryWin = Alloy.createController("drinks_sub_category", e.source.drinkData).getView();
            sub_categoryWin.open();
        }
    }
    function openSearch() {
        var searchWin = Alloy.createController("search").getView();
        searchWin.open();
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.drinks_categories);
        Alloy.Globals.windowStack.splice(a, 1);
        $.drinks_categories.close();
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
        title: "COCKTAILS",
        id: "drinks_categories"
    });
    $.__views.drinks_categories && $.addTopLevelView($.__views.drinks_categories);
    $.__views.__alloyId173 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        id: "__alloyId173"
    });
    $.__views.drinks_categories.add($.__views.__alloyId173);
    $.__views.__alloyId174 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId174"
    });
    $.__views.__alloyId173.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId175"
    });
    $.__views.__alloyId173.add($.__views.__alloyId175);
    $.__views.__alloyId176 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId176"
    });
    $.__views.__alloyId175.add($.__views.__alloyId176);
    closeWindow ? $.__views.__alloyId176.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId176!click!closeWindow"] = true;
    $.__views.__alloyId177 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "COCKTAILS",
        id: "__alloyId177"
    });
    $.__views.__alloyId175.add($.__views.__alloyId177);
    $.__views.__alloyId178 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId178"
    });
    $.__views.__alloyId175.add($.__views.__alloyId178);
    goToHome ? $.__views.__alloyId178.addEventListener("click", goToHome) : __defers["$.__views.__alloyId178!click!goToHome"] = true;
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
    $.__views.__alloyId182 = Ti.UI.createLabel({
        color: "#747474",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "16dp"
        },
        top: "10dp",
        height: Ti.UI.SIZE,
        text: "Alternatively",
        id: "__alloyId182"
    });
    $.__views.__alloyId181.add($.__views.__alloyId182);
    $.__views.__alloyId185 = Ti.UI.createButton({
        backgroundColor: Alloy.Globals.PrimaryColor,
        color: "#ffffff",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "22dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "220dp",
        height: "40dp",
        borderRadius: 6,
        top: "10dp",
        bottom: "10dp",
        title: "Search Cocktails",
        image: "./images/icons/search-white.png",
        id: "__alloyId185"
    });
    $.__views.__alloyId181.add($.__views.__alloyId185);
    openSearch ? $.__views.__alloyId185.addEventListener("click", openSearch) : __defers["$.__views.__alloyId185!click!openSearch"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var drinks_json_text = "";
    Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/drinks/drinks/viewjson", "data/Drinks.txt", DisplayDrinks);
    $.drinks_categories.addEventListener("close", function() {
        Ti.API.info("Drinks categories closed");
    });
    $.drinks_categories.addEventListener("open", function() {
        Ti.API.info("Drinks categories opened");
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