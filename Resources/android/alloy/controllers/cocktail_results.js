function Controller() {
    function displayCocktails(newJSON) {
        var rel_cocktails = [];
        var cocktailViews = [];
        var drinks_json_text = "";
        var all_cocktails;
        all_cocktails = null != newJSON ? JSON.parse(newJSON) : JSON.parse(drinks_json_text);
        var result_item_view_style = $.createStyle({
            classes: [ "result_item" ]
        });
        var pixelWidth = .47 * Ti.Platform.displayCaps.platformWidth;
        var resultAspectRatio = 147 / 152;
        var resultHeight = Math.floor(pixelWidth * resultAspectRatio);
        result_item_view_style.height = resultHeight.toString() + "px";
        var horizontal_results_view_style = $.createStyle({
            classes: [ "horizontal_results_nav_view" ]
        });
        var result_item_title_style = $.createStyle({
            classes: [ "result_title" ]
        });
        if ("favourites" != cocktail_category) for (var i = 0; all_cocktails.length > i; i++) {
            Ti.API.info("Cocktail " + i + " Title: " + all_cocktails[i].Cocktail.title);
            if (isTopCategory) {
                for (var y = 0; all_cocktails[i].Cocktail.drinks.length > y; y++) if (cocktail_category == all_cocktails[i].Cocktail.drinks[y].Drink.id) {
                    Ti.API.info("match is true for cocktail: " + all_cocktails[i].Cocktail.title);
                    rel_cocktails.push(all_cocktails[i].Cocktail);
                }
            } else for (var y = 0; all_cocktails[i].Cocktail.subcategories.length > y; y++) if (cocktail_category == all_cocktails[i].Cocktail.subcategories[y].Subcategory.id) {
                Ti.API.info("match is true for cocktail: " + all_cocktails[i].Cocktail.title);
                rel_cocktails.push(all_cocktails[i].Cocktail);
            }
        } else {
            var currentFavs = Titanium.App.Properties.getList("favs", new Array());
            if (0 == currentFavs.length) ; else {
                Ti.API.info(currentFavs.length + " favourites found");
                for (var i = 0; currentFavs.length > i; i++) for (var y = 0; all_cocktails.length > y; y++) if (all_cocktails[y].Cocktail.id == currentFavs[i].id) {
                    Ti.API.info("Fav cocktail: " + all_cocktails[y].title);
                    rel_cocktails.push(all_cocktails[y].Cocktail);
                }
            }
        }
        if (rel_cocktails.length > 0) {
            var cocktail_image_style_bottle = $.createStyle({
                classes: [ "cocktail_image_glass" ]
            });
            var cocktail_item_white_banner_style = $.createStyle({
                classes: [ "white_banner" ]
            });
            for (var i = 0; rel_cocktails.length > i; i += 2) {
                var horizontal_results_view = Ti.UI.createView();
                horizontal_results_view.applyProperties(horizontal_results_view_style);
                $.drink_results.add(horizontal_results_view);
                for (y = i; i + 2 > y && rel_cocktails.length > y; y++) {
                    var single_result_item_view = Ti.UI.createView();
                    single_result_item_view.applyProperties(result_item_view_style);
                    var cocktail_image = Alloy.Globals.Utils.RemoteImage({
                        image: rel_cocktails[y].image_thumb,
                        defaultImage: "images/cocktails/glass.png"
                    });
                    cocktail_image.applyProperties(cocktail_image_style_bottle);
                    single_result_item_view.add(cocktail_image);
                    var result_bottom_container = Ti.UI.createView();
                    result_bottom_container.height = Ti.UI.SIZE;
                    result_bottom_container.width = Ti.UI.FILL;
                    result_bottom_container.bottom = "0dp";
                    result_bottom_container.touchEnabled = false;
                    single_result_item_view.add(result_bottom_container);
                    var banner_bottom_view = Ti.UI.createView();
                    banner_bottom_view.applyProperties(cocktail_item_white_banner_style);
                    result_bottom_container.add(banner_bottom_view);
                    var result_item_title = Ti.UI.createLabel({
                        text: rel_cocktails[y].title.toUpperCase()
                    });
                    result_item_title.applyProperties(result_item_title_style);
                    result_bottom_container.add(result_item_title);
                    single_result_item_view.cocktailData = rel_cocktails[y];
                    single_result_item_view.addEventListener("click", openRecipeDetailed);
                    if ("favourites" == cocktail_category) {
                        var broken_heart_style = $.createStyle({
                            classes: [ "fav_heart_style" ]
                        });
                        var divide = 320 / 310;
                        var width = Ti.Platform.displayCaps.platformWidth / divide;
                        var imageRatio = 310 / 21;
                        var imageSize = Math.floor(width / imageRatio);
                        broken_heart_style.width = imageSize.toString() + "px";
                        broken_heart_style.height = imageSize.toString() + "px";
                        single_result_item_view.ID = rel_cocktails[y].id;
                        var brokenHeart_image = Ti.UI.createImageView();
                        brokenHeart_image.image = "/images/favs/heart_broken.png";
                        brokenHeart_image.applyProperties(broken_heart_style);
                        single_result_item_view.broken_heart_image = brokenHeart_image;
                        single_result_item_view.add(brokenHeart_image);
                    }
                    cocktailViews.push(single_result_item_view);
                    horizontal_results_view.add(single_result_item_view);
                }
            }
        } else {
            Ti.API.info("No relevant cocktails found");
            var no_results_style = $.createStyle({
                classes: [ "no_results" ]
            });
            var no_results_title_style = $.createStyle({
                classes: [ "no_results_title" ]
            });
            var no_result_item_view = Ti.UI.createView();
            no_result_item_view.applyProperties(no_results_style);
            if ("favourites" != cocktail_category) var result_item_title = Ti.UI.createLabel({
                text: "Sorry, no results were found. \nPlease try another category."
            }); else var result_item_title = Ti.UI.createLabel({
                text: "You haven't saved any favourites yet. \n\nSave your favourites by clicking on the heart icon in each recipe. \n\nDon't forget favourite recipes can be viewed even when you're not connected to the internet."
            });
            result_item_title.applyProperties(no_results_title_style);
            no_result_item_view.add(result_item_title);
            $.drink_results.add(no_result_item_view);
        }
        $.cocktail_results.addEventListener("focus", function() {
            if ("favourites" == cocktail_category) {
                var currentFavs = Titanium.App.Properties.getList("favs", new Array());
                for (var i = 0; cocktailViews.length > i; i++) if (0 == currentFavs.length) {
                    var animation = Titanium.UI.createAnimation();
                    animation.opacity = .5;
                    animation.duration = 300;
                    animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
                    cocktailViews[i].broken_heart_image.animate(animation);
                } else {
                    var isFav = false;
                    for (var y = 0; currentFavs.length > y; y++) if (cocktailViews[i].ID == currentFavs[y].id) {
                        var animation = Titanium.UI.createAnimation();
                        animation.opacity = 0;
                        animation.duration = 300;
                        animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN;
                        cocktailViews[i].broken_heart_image.animate(animation);
                        isFav = true;
                    }
                    if (!isFav) {
                        var animation = Titanium.UI.createAnimation();
                        animation.opacity = .5;
                        animation.duration = 300;
                        animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
                        cocktailViews[i].broken_heart_image.animate(animation);
                    }
                }
            }
        });
    }
    function openRecipeDetailed(e) {
        var recipeWin = Alloy.createController("cocktail_detailed", e.source.cocktailData).getView();
        recipeWin.open({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
        });
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.cocktail_results);
        Alloy.Globals.windowStack.splice(a, 1);
        $.cocktail_results.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "cocktail_results";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.cocktail_results = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        height: "100%",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        modal: false,
        title: "COCKTAILS",
        id: "cocktail_results"
    });
    $.__views.cocktail_results && $.addTopLevelView($.__views.cocktail_results);
    $.__views.__alloyId116 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        id: "__alloyId116"
    });
    $.__views.cocktail_results.add($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId117"
    });
    $.__views.__alloyId116.add($.__views.__alloyId117);
    $.__views.__alloyId118 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId118"
    });
    $.__views.__alloyId116.add($.__views.__alloyId118);
    $.__views.__alloyId119 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId119"
    });
    $.__views.__alloyId118.add($.__views.__alloyId119);
    closeWindow ? $.__views.__alloyId119.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId119!click!closeWindow"] = true;
    $.__views.cocktail_results_page_title = Ti.UI.createLabel(function() {
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
            id: "cocktail_results_page_title"
        });
        return o;
    }());
    $.__views.__alloyId118.add($.__views.cocktail_results_page_title);
    $.__views.__alloyId120 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId120"
    });
    $.__views.__alloyId118.add($.__views.__alloyId120);
    goToHome ? $.__views.__alloyId120.addEventListener("click", goToHome) : __defers["$.__views.__alloyId120!click!goToHome"] = true;
    $.__views.__alloyId126 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        id: "__alloyId126"
    });
    $.__views.cocktail_results.add($.__views.__alloyId126);
    $.__views.__alloyId127 = Ti.UI.createScrollView({
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
        id: "__alloyId127"
    });
    $.__views.cocktail_results.add($.__views.__alloyId127);
    $.__views.drink_results = Ti.UI.createView({
        id: "drink_results",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        bottom: "10dp"
    });
    $.__views.__alloyId127.add($.__views.drink_results);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var cocktail_category = args.id || "Category not received";
    var isTopCategory = true;
    if ("favourites" != cocktail_category) {
        $.cocktail_results.title = args.title.toUpperCase();
        $.cocktail_results_page_title.text = args.title.toUpperCase();
        isTopCategory = args.topCategory;
    } else if ("favourites" == cocktail_category) {
        $.cocktail_results.title = "FAVOURITES";
        $.cocktail_results_page_title.text = "FAVOURITES";
    }
    Alloy.Globals.Utils.GetAppData("/client/idl/perfect-mix/cocktails/cocktails/viewjson", "data/Cocktails.txt", displayCocktails);
    $.cocktail_results.addEventListener("close", function() {});
    $.cocktail_results.addEventListener("open", function() {
        Alloy.Globals.windowStack.push($.cocktail_results);
    });
    $.cocktail_results.addEventListener("androidback", function() {
        $.cocktail_results.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.cocktail_results);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId119!click!closeWindow"] && $.__views.__alloyId119.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId120!click!goToHome"] && $.__views.__alloyId120.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId124!click!closeWindow"] && $.__views.__alloyId124.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId125!click!goToHome"] && $.__views.__alloyId125.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId129!click!goToHome"] && $.__views.__alloyId129.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId131!click!closeWindow"] && $.__views.__alloyId131.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;