function Controller() {
    function indexOpen() {
        function displayMixOfTheMonth(newJSON) {
            Ti.API.info("I'm in the mix of the month display area");
            Ti.API.info("Add mix of the month stuff");
            var featuredMix = JSON.parse(newJSON);
            var type = "GENERIC";
            1 == featuredMix[0].Mix.type ? type = "ABSOLUT" : 2 == featuredMix[0].Mix.type ? type = "JAMESON" : 3 == featuredMix[0].Mix.type && (type = "MALIBU");
            Ti.API.info("Mix of the month type: " + featuredMix[0].Mix.type);
            switch (featuredMix[0].Mix.type) {
              case "0":
                Ti.API.info("mix of the month type GENERIC");
                var mix_title_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.BoldFont,
                        fontSize: Alloy.Globals.MainFontSize
                    }
                });
                $.mix_title.applyProperties(mix_title_style_font);
                var mix_subtitle_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.MainFont,
                        fontSize: Alloy.Globals.MainFontSize
                    }
                });
                $.mix_desc.applyProperties(mix_subtitle_style_font);
                break;

              case "1":
                Ti.API.info("mix of the month type ABSOLUT");
                var mix_title_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.AbsolutFontBold,
                        fontSize: Alloy.Globals.MainFontSize
                    }
                });
                $.mix_title.applyProperties(mix_title_style_font);
                var mix_subtitle_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.AbsolutFontLight,
                        fontSize: Alloy.Globals.MainFontSize
                    }
                });
                $.mix_desc.applyProperties(mix_subtitle_style_font);
                break;

              case "2":
                Ti.API.info("mix of the month type JAMESON");
                var mix_title_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.JamesonFontBold,
                        fontSize: Alloy.Globals.MainFontSize
                    }
                });
                $.mix_title.applyProperties(mix_title_style_font);
                var mix_subtitle_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.JamesonFontLight,
                        fontSize: Alloy.Globals.MainFontSize
                    }
                });
                $.mix_desc.applyProperties(mix_subtitle_style_font);
                break;

              case "3":
                Ti.API.info("mix of the month type MALIBU");
                var mix_title_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.MalibuFontBold,
                        fontSize: Alloy.Globals.MainFontSize
                    }
                });
                $.mix_title.applyProperties(mix_title_style_font);
                var mix_subtitle_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.MalibuFontLight,
                        fontSize: Alloy.Globals.MainFontSize
                    }
                });
                $.mix_desc.applyProperties(mix_subtitle_style_font);
            }
            $.mix_title.text = featuredMix[0].Mix.title;
            $.mix_desc.text = featuredMix[0].Mix.subtitle;
            var mix_of_the_month_banner_image_view = Alloy.Globals.Utils.RemoteImage({
                image: featuredMix[0].Mix.background,
                defaultImage: "/images/home_screen/mix_month_bg.png",
                width: Ti.UI.FILL,
                height: Ti.UI.FILL,
                touchEnabled: false
            });
            mix_of_the_month_banner_image_view.defaultImage = "./images/home_screen/mix_month_bg.png";
            $.mix_banner_image_container.add(mix_of_the_month_banner_image_view);
            var mix_of_the_month_image_view;
            var mix_of_the_month_image_view = Alloy.Globals.Utils.RemoteImage({
                image: featuredMix[0].Mix.image,
                defaultImage: "./images/cocktails/glass.png",
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                touchEnabled: false
            });
            $.mix_bottle_image_container.add(mix_of_the_month_image_view);
            var animation = Titanium.UI.createAnimation();
            animation.right = "5dp";
            animation.opacity = 1;
            animation.duration = 800;
            animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
            $.mix_of_the_month_anim_view.animate(animation, function() {
                var fadeAnimation = Titanium.UI.createAnimation();
                fadeAnimation.opacity = 1;
                fadeAnimation.duration = 800;
                fadeAnimation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
                mix_of_the_month_image_view.animate(fadeAnimation);
            });
            $.mix_of_month_view.cocktailData = featuredMix[0].Mix.cocktails.Cocktail;
            $.mix_of_month_view.addEventListener("click", function() {
                Ti.API.info("mix of the month clicked");
                var recipeWin = Alloy.createController("cocktail_detailed", featuredMix[0].Mix.cocktails.Cocktail).getView();
                recipeWin.open();
            });
        }
        Alloy.Globals.Utils.GetAppData("http://vocal.ie/client/idl/perfect-mix/mixes/mixes/viewjson", "data/FeaturedMix.txt", displayMixOfTheMonth);
    }
    function openFavourites() {
        var drinksFavWin = Alloy.createController("cocktail_results", {
            id: "favourites"
        }).getView();
        drinksFavWin.open();
    }
    function openDrinks() {
        var drinksWin = Alloy.createController("drinks_categories").getView();
        drinksWin.open();
    }
    function openSearch() {
        var searchWin = Alloy.createController("search").getView();
        searchWin.open();
    }
    function openTips() {
        var tipsWin = Alloy.createController("tips").getView();
        tipsWin.open();
    }
    function openBrands() {
        var brandsWin = Alloy.createController("brands").getView();
        brandsWin.open();
    }
    function openNews() {
        var newsWin = Alloy.createController("news").getView();
        newsWin.open();
    }
    function openTandCs() {
        var terms_and_conditions = Alloy.createController("terms_and_conditions").getView();
        terms_and_conditions.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win1 = Ti.UI.createWindow({
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
        exitOnClose: "true",
        title: "HOME",
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    $.__views.__alloyId318 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        id: "__alloyId318"
    });
    $.__views.win1.add($.__views.__alloyId318);
    $.__views.__alloyId319 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId319"
    });
    $.__views.__alloyId318.add($.__views.__alloyId319);
    $.__views.__alloyId320 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId320"
    });
    $.__views.__alloyId318.add($.__views.__alloyId320);
    $.__views.__alloyId321 = Ti.UI.createView({
        backgroundImage: "/images/icons/tandc.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId321"
    });
    $.__views.__alloyId320.add($.__views.__alloyId321);
    openTandCs ? $.__views.__alloyId321.addEventListener("click", openTandCs) : __defers["$.__views.__alloyId321!click!openTandCs"] = true;
    $.__views.__alloyId322 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "HOME",
        id: "__alloyId322"
    });
    $.__views.__alloyId320.add($.__views.__alloyId322);
    $.__views.__alloyId323 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        id: "__alloyId323"
    });
    $.__views.win1.add($.__views.__alloyId323);
    $.__views.__alloyId324 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId324"
    });
    $.__views.win1.add($.__views.__alloyId324);
    $.__views.mix_of_month_view = Ti.UI.createView({
        id: "mix_of_month_view",
        height: "40%",
        backgroundColor: "#ddd"
    });
    $.__views.__alloyId324.add($.__views.mix_of_month_view);
    $.__views.mix_banner_image_container = Ti.UI.createView({
        id: "mix_banner_image_container",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    });
    $.__views.mix_of_month_view.add($.__views.mix_banner_image_container);
    $.__views.mix_bottle_image_container = Ti.UI.createView({
        id: "mix_bottle_image_container",
        left: "5dp",
        width: "30%",
        height: Ti.UI.SIZE
    });
    $.__views.mix_of_month_view.add($.__views.mix_bottle_image_container);
    $.__views.mix_of_the_month_anim_view = Ti.UI.createView({
        id: "mix_of_the_month_anim_view",
        height: Ti.UI.SIZE,
        layout: "vertical",
        width: "60%",
        right: "-25dp",
        opacity: "0"
    });
    $.__views.mix_of_month_view.add($.__views.mix_of_the_month_anim_view);
    $.__views.mix_title = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "18dp"
        },
        touchEnabled: false,
        text: "Mix of the Month  bloop bloop lboop blooopb",
        id: "mix_title"
    });
    $.__views.mix_of_the_month_anim_view.add($.__views.mix_title);
    $.__views.mix_desc = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        top: "2dp",
        touchEnabled: false,
        text: "Absolut Citron & Tonic bloop bloop lboop blooopb",
        id: "mix_desc"
    });
    $.__views.mix_of_the_month_anim_view.add($.__views.mix_desc);
    $.__views.__alloyId325 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundColor: "#f00",
        backgroundImage: "/images/common/color_sep.png",
        id: "__alloyId325"
    });
    $.__views.__alloyId324.add($.__views.__alloyId325);
    $.__views.menu_row_1 = Ti.UI.createView({
        height: "100dp",
        id: "menu_row_1",
        backgroundColor: "#fff",
        layout: "horizontal",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId324.add($.__views.menu_row_1);
    $.__views.cocktails_home_btn = Ti.UI.createView({
        width: "160dp",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#b0b0b0",
        borderWidth: 1,
        id: "cocktails_home_btn"
    });
    $.__views.menu_row_1.add($.__views.cocktails_home_btn);
    openDrinks ? $.__views.cocktails_home_btn.addEventListener("click", openDrinks) : __defers["$.__views.cocktails_home_btn!click!openDrinks"] = true;
    $.__views.__alloyId326 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId326"
    });
    $.__views.cocktails_home_btn.add($.__views.__alloyId326);
    $.__views.__alloyId327 = Ti.UI.createImageView({
        height: "30%",
        image: "./images/icons/drinks.png",
        id: "__alloyId327"
    });
    $.__views.__alloyId326.add($.__views.__alloyId327);
    $.__views.__alloyId328 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "16dp"
        },
        top: "5dp",
        text: "Cocktails",
        id: "__alloyId328"
    });
    $.__views.__alloyId326.add($.__views.__alloyId328);
    $.__views.search_home_btn = Ti.UI.createView({
        width: "160dp",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#b0b0b0",
        borderWidth: 1,
        id: "search_home_btn"
    });
    $.__views.menu_row_1.add($.__views.search_home_btn);
    openSearch ? $.__views.search_home_btn.addEventListener("click", openSearch) : __defers["$.__views.search_home_btn!click!openSearch"] = true;
    $.__views.__alloyId329 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId329"
    });
    $.__views.search_home_btn.add($.__views.__alloyId329);
    $.__views.__alloyId330 = Ti.UI.createImageView({
        height: "30%",
        image: "./images/icons/search.png",
        id: "__alloyId330"
    });
    $.__views.__alloyId329.add($.__views.__alloyId330);
    $.__views.__alloyId331 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "16dp"
        },
        top: "5dp",
        text: "Search",
        id: "__alloyId331"
    });
    $.__views.__alloyId329.add($.__views.__alloyId331);
    $.__views.menu_row_2 = Ti.UI.createView({
        height: "100dp",
        id: "menu_row_2",
        backgroundColor: "#fff",
        layout: "horizontal",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId324.add($.__views.menu_row_2);
    $.__views.tips_home_btn = Ti.UI.createView({
        width: "160dp",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#b0b0b0",
        borderWidth: 1,
        id: "tips_home_btn"
    });
    $.__views.menu_row_2.add($.__views.tips_home_btn);
    openTips ? $.__views.tips_home_btn.addEventListener("click", openTips) : __defers["$.__views.tips_home_btn!click!openTips"] = true;
    $.__views.__alloyId332 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId332"
    });
    $.__views.tips_home_btn.add($.__views.__alloyId332);
    $.__views.__alloyId333 = Ti.UI.createImageView({
        height: "30%",
        image: "./images/icons/tips.png",
        id: "__alloyId333"
    });
    $.__views.__alloyId332.add($.__views.__alloyId333);
    $.__views.__alloyId334 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "16dp"
        },
        top: "5dp",
        text: "Top Tips",
        id: "__alloyId334"
    });
    $.__views.__alloyId332.add($.__views.__alloyId334);
    $.__views.favourites_home_btn = Ti.UI.createView({
        width: "160dp",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#b0b0b0",
        borderWidth: 1,
        id: "favourites_home_btn"
    });
    $.__views.menu_row_2.add($.__views.favourites_home_btn);
    openFavourites ? $.__views.favourites_home_btn.addEventListener("click", openFavourites) : __defers["$.__views.favourites_home_btn!click!openFavourites"] = true;
    $.__views.__alloyId335 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId335"
    });
    $.__views.favourites_home_btn.add($.__views.__alloyId335);
    $.__views.__alloyId336 = Ti.UI.createImageView({
        height: "30%",
        image: "./images/icons/fav.png",
        id: "__alloyId336"
    });
    $.__views.__alloyId335.add($.__views.__alloyId336);
    $.__views.__alloyId337 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "16dp"
        },
        top: "5dp",
        text: "Favourites",
        id: "__alloyId337"
    });
    $.__views.__alloyId335.add($.__views.__alloyId337);
    $.__views.menu_row_3 = Ti.UI.createView({
        height: "100dp",
        id: "menu_row_3",
        backgroundColor: "#fff",
        layout: "horizontal",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId324.add($.__views.menu_row_3);
    $.__views.__alloyId338 = Ti.UI.createView({
        width: "160dp",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#b0b0b0",
        borderWidth: 1,
        id: "__alloyId338"
    });
    $.__views.menu_row_3.add($.__views.__alloyId338);
    openNews ? $.__views.__alloyId338.addEventListener("click", openNews) : __defers["$.__views.__alloyId338!click!openNews"] = true;
    $.__views.__alloyId339 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId339"
    });
    $.__views.__alloyId338.add($.__views.__alloyId339);
    $.__views.__alloyId340 = Ti.UI.createImageView({
        height: "30%",
        image: "./images/icons/news.png",
        id: "__alloyId340"
    });
    $.__views.__alloyId339.add($.__views.__alloyId340);
    $.__views.__alloyId341 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "16dp"
        },
        top: "5dp",
        text: "News",
        id: "__alloyId341"
    });
    $.__views.__alloyId339.add($.__views.__alloyId341);
    $.__views.__alloyId342 = Ti.UI.createView({
        width: "160dp",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#b0b0b0",
        borderWidth: 1,
        id: "__alloyId342"
    });
    $.__views.menu_row_3.add($.__views.__alloyId342);
    openBrands ? $.__views.__alloyId342.addEventListener("click", openBrands) : __defers["$.__views.__alloyId342!click!openBrands"] = true;
    $.__views.__alloyId343 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId343"
    });
    $.__views.__alloyId342.add($.__views.__alloyId343);
    $.__views.__alloyId344 = Ti.UI.createImageView({
        height: "30%",
        image: "./images/icons/ourbrands.png",
        id: "__alloyId344"
    });
    $.__views.__alloyId343.add($.__views.__alloyId344);
    $.__views.__alloyId345 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "16dp"
        },
        top: "5dp",
        text: "Our Brands",
        id: "__alloyId345"
    });
    $.__views.__alloyId343.add($.__views.__alloyId345);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.parent = $.win1;
    $.win1.addEventListener("open", indexOpen);
    var ageGaitSuccess = Ti.App.Properties.getBool("over18", false);
    if (ageGaitSuccess) $.win1.open(); else {
        var age_gate = Alloy.createController("age_gate").getView();
        age_gate.open();
    }
    __defers["$.__views.cocktails_home_btn!click!openDrinks"] && $.__views.cocktails_home_btn.addEventListener("click", openDrinks);
    __defers["$.__views.search_home_btn!click!openSearch"] && $.__views.search_home_btn.addEventListener("click", openSearch);
    __defers["$.__views.tips_home_btn!click!openTips"] && $.__views.tips_home_btn.addEventListener("click", openTips);
    __defers["$.__views.favourites_home_btn!click!openFavourites"] && $.__views.favourites_home_btn.addEventListener("click", openFavourites);
    __defers["$.__views.news_home_btn!click!openNews"] && $.__views.news_home_btn.addEventListener("click", openNews);
    __defers["$.__views.brand_home_image!click!openBrands"] && $.__views.brand_home_image.addEventListener("click", openBrands);
    __defers["$.__views.__alloyId289!click!openTandCs"] && $.__views.__alloyId289.addEventListener("click", openTandCs);
    __defers["$.__views.__alloyId293!click!openTandCs"] && $.__views.__alloyId293.addEventListener("click", openTandCs);
    __defers["$.__views.cocktails_home_btn!click!openDrinks"] && $.__views.cocktails_home_btn.addEventListener("click", openDrinks);
    __defers["$.__views.search_home_btn!click!openSearch"] && $.__views.search_home_btn.addEventListener("click", openSearch);
    __defers["$.__views.tips_home_btn!click!openTips"] && $.__views.tips_home_btn.addEventListener("click", openTips);
    __defers["$.__views.favourites_home_btn!click!openFavourites"] && $.__views.favourites_home_btn.addEventListener("click", openFavourites);
    __defers["$.__views.__alloyId310!click!openNews"] && $.__views.__alloyId310.addEventListener("click", openNews);
    __defers["$.__views.__alloyId314!click!openBrands"] && $.__views.__alloyId314.addEventListener("click", openBrands);
    __defers["$.__views.__alloyId321!click!openTandCs"] && $.__views.__alloyId321.addEventListener("click", openTandCs);
    __defers["$.__views.cocktails_home_btn!click!openDrinks"] && $.__views.cocktails_home_btn.addEventListener("click", openDrinks);
    __defers["$.__views.search_home_btn!click!openSearch"] && $.__views.search_home_btn.addEventListener("click", openSearch);
    __defers["$.__views.tips_home_btn!click!openTips"] && $.__views.tips_home_btn.addEventListener("click", openTips);
    __defers["$.__views.favourites_home_btn!click!openFavourites"] && $.__views.favourites_home_btn.addEventListener("click", openFavourites);
    __defers["$.__views.__alloyId338!click!openNews"] && $.__views.__alloyId338.addEventListener("click", openNews);
    __defers["$.__views.__alloyId342!click!openBrands"] && $.__views.__alloyId342.addEventListener("click", openBrands);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;