function Controller() {
    function indexOpen() {
        function displayMixOfTheMonth(newJSON) {
            var featuredMix = JSON.parse(newJSON);
            var type = "GENERIC";
            1 == featuredMix[0].Mix.type ? type = "ABSOLUT" : 2 == featuredMix[0].Mix.type ? type = "JAMESON" : 3 == featuredMix[0].Mix.type && (type = "MALIBU");
            var genericBG_Image = "/images/home_screen/mix_month_bg.png";
            switch (featuredMix[0].Mix.type) {
              case "0":
                var mix_title_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.BoldFont,
                        fontSize: Alloy.Globals.MainFontSize
                    },
                    width: Ti.UI.FILL,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: featuredMix[0].Mix.title_font_colour
                });
                $.mix_title.applyProperties(mix_title_style_font);
                var mix_subtitle_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.MainFont,
                        fontSize: Alloy.Globals.MainFontSize
                    },
                    width: Ti.UI.FILL,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: featuredMix[0].Mix.subtitle_font_colour
                });
                $.mix_desc.applyProperties(mix_subtitle_style_font);
                break;

              case "1":
                var mix_title_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.AbsolutFontLight,
                        fontSize: Alloy.Globals.MainFontSize
                    },
                    width: Ti.UI.FILL,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: featuredMix[0].Mix.title_font_colour
                });
                $.mix_title.applyProperties(mix_title_style_font);
                var mix_subtitle_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.AbsolutFontBold,
                        fontSize: Alloy.Globals.MainFontSize
                    },
                    width: Ti.UI.FILL,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: featuredMix[0].Mix.subtitle_font_colour
                });
                $.mix_desc.applyProperties(mix_subtitle_style_font);
                genericBG_Image = "/images/home_screen/absolut_bg.png";
                break;

              case "2":
                var mix_title_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.JamesonFontLight,
                        fontSize: Alloy.Globals.MainFontSize
                    },
                    width: Ti.UI.FILL,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: featuredMix[0].Mix.title_font_colour
                });
                $.mix_title.applyProperties(mix_title_style_font);
                var mix_subtitle_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.JamesonFontBold,
                        fontSize: Alloy.Globals.MainFontSize
                    },
                    width: Ti.UI.FILL,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: featuredMix[0].Mix.subtitle_font_colour
                });
                $.mix_desc.applyProperties(mix_subtitle_style_font);
                genericBG_Image = "/images/home_screen/jameson_bg.png";
                break;

              case "3":
                var mix_title_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.MalibuFontLight,
                        fontSize: Alloy.Globals.MainFontSize
                    },
                    width: Ti.UI.FILL,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: featuredMix[0].Mix.title_font_colour
                });
                $.mix_title.applyProperties(mix_title_style_font);
                var mix_subtitle_style_font = $.createStyle({
                    font: {
                        fontFamily: Alloy.Globals.MalibuFontBold,
                        fontSize: Alloy.Globals.MainFontSize
                    },
                    width: Ti.UI.FILL,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: featuredMix[0].Mix.subtitle_font_colour
                });
                $.mix_desc.applyProperties(mix_subtitle_style_font);
                genericBG_Image = "/images/home_screen/malibu_bg.png";
            }
            $.mix_title.text = featuredMix[0].Mix.title;
            $.mix_desc.text = featuredMix[0].Mix.subtitle;
            if (null != featuredMix[0].Mix.background && "" != featuredMix[0].Mix.background) var mix_of_the_month_banner_image_view = Alloy.Globals.Utils.RemoteImage({
                image: featuredMix[0].Mix.background,
                defaultImage: genericBG_Image,
                width: Ti.UI.FILL,
                height: Ti.UI.FILL,
                touchEnabled: false
            }); else var mix_of_the_month_banner_image_view = Alloy.Globals.Utils.RemoteImage({
                image: genericBG_Image,
                width: Ti.UI.FILL,
                height: Ti.UI.FILL,
                touchEnabled: false
            });
            $.mix_banner_image_container.add(mix_of_the_month_banner_image_view);
            var mix_of_the_month_image_view;
            mix_of_the_month_image_view = Alloy.Globals.Utils.RemoteImage({
                image: featuredMix[0].Mix.image,
                defaultImage: "/images/cocktails/glass.png",
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                opacity: 0,
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
                var recipeWin = Alloy.createController("cocktail_detailed", featuredMix[0].Mix.cocktails.Cocktail).getView();
                recipeWin.open({
                    activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
                    activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
                });
            });
        }
        Alloy.Globals.Utils.GetAppData("/client/idl/perfect-mix/mixes/mixes/viewjson", "data/FeaturedMix.txt", displayMixOfTheMonth);
    }
    function openFavourites() {
        var drinksFavWin = Alloy.createController("cocktail_results", {
            id: "favourites"
        }).getView();
        drinksFavWin.open({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
        });
    }
    function openDrinks() {
        var drinksWin = Alloy.createController("drinks_categories").getView();
        drinksWin.open({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
        });
    }
    function openSearch() {
        var searchWin = Alloy.createController("search").getView();
        searchWin.open({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
        });
    }
    function openTips() {
        var tipsWin = Alloy.createController("tips").getView();
        tipsWin.open({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
        });
    }
    function openBrands() {
        var brandsWin = Alloy.createController("brands").getView();
        brandsWin.open({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
        });
    }
    function openNews() {
        var newsWin = Alloy.createController("news").getView();
        newsWin.open({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_left,
            animated: true
        });
    }
    function openTandCs() {
        var terms_and_conditions = Alloy.createController("terms_and_conditions").getView();
        terms_and_conditions.open({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right,
            animated: true
        });
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
        layout: "vertical",
        height: "100%",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        modal: false,
        exitOnClose: "true",
        title: "HOME",
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    $.__views.__alloyId271 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        id: "__alloyId271"
    });
    $.__views.win1.add($.__views.__alloyId271);
    $.__views.__alloyId272 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId272"
    });
    $.__views.__alloyId271.add($.__views.__alloyId272);
    $.__views.__alloyId273 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId273"
    });
    $.__views.__alloyId271.add($.__views.__alloyId273);
    $.__views.__alloyId274 = Ti.UI.createView({
        backgroundImage: "/images/icons/tandc.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId274"
    });
    $.__views.__alloyId273.add($.__views.__alloyId274);
    openTandCs ? $.__views.__alloyId274.addEventListener("click", openTandCs) : __defers["$.__views.__alloyId274!click!openTandCs"] = true;
    $.__views.__alloyId275 = Ti.UI.createLabel(function() {
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
            text: "HOME",
            color: "#313646",
            id: "__alloyId275"
        });
        return o;
    }());
    $.__views.__alloyId273.add($.__views.__alloyId275);
    $.__views.__alloyId276 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        id: "__alloyId276"
    });
    $.__views.win1.add($.__views.__alloyId276);
    $.__views.__alloyId277 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId277"
    });
    $.__views.win1.add($.__views.__alloyId277);
    $.__views.mix_of_month_view = Ti.UI.createView({
        id: "mix_of_month_view",
        height: "40%",
        backgroundColor: "#ddd"
    });
    $.__views.__alloyId277.add($.__views.mix_of_month_view);
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
    $.__views.mix_title = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "18dp"
            },
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "22dp"
            },
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "28dp"
            },
            touchEnabled: false
        });
        _.extend(o, {
            text: "Mix of the Month  bloop bloop lboop blooopb",
            id: "mix_title"
        });
        return o;
    }());
    $.__views.mix_of_the_month_anim_view.add($.__views.mix_title);
    $.__views.mix_desc = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "18dp"
            },
            top: "2dp",
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "22dp"
            },
            top: "2dp",
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "24dp"
            },
            top: "2dp",
            touchEnabled: false
        });
        _.extend(o, {
            text: "Absolut Citron & Tonic bloop bloop lboop blooopb",
            id: "mix_desc"
        });
        return o;
    }());
    $.__views.mix_of_the_month_anim_view.add($.__views.mix_desc);
    $.__views.__alloyId278 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundColor: "#f00",
        backgroundImage: "/images/common/color_sep.png",
        id: "__alloyId278"
    });
    $.__views.__alloyId277.add($.__views.__alloyId278);
    $.__views.menu_row_1 = Ti.UI.createView({
        height: "20%",
        id: "menu_row_1",
        backgroundColor: "#fff",
        layout: "horizontal",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId277.add($.__views.menu_row_1);
    $.__views.cocktails_home_btn = Ti.UI.createView({
        width: "50%",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#b0b0b0",
        borderWidth: 1,
        id: "cocktails_home_btn"
    });
    $.__views.menu_row_1.add($.__views.cocktails_home_btn);
    openDrinks ? $.__views.cocktails_home_btn.addEventListener("click", openDrinks) : __defers["$.__views.cocktails_home_btn!click!openDrinks"] = true;
    $.__views.__alloyId279 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId279"
    });
    $.__views.cocktails_home_btn.add($.__views.__alloyId279);
    $.__views.__alloyId280 = Ti.UI.createImageView({
        height: "30%",
        image: "/images/icons/drinks.png",
        id: "__alloyId280"
    });
    $.__views.__alloyId279.add($.__views.__alloyId280);
    $.__views.__alloyId281 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "16dp"
            },
            top: "5dp"
        });
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "22dp"
            },
            top: "5dp"
        });
        _.extend(o, {
            text: "Cocktails",
            id: "__alloyId281"
        });
        return o;
    }());
    $.__views.__alloyId279.add($.__views.__alloyId281);
    $.__views.search_home_btn = Ti.UI.createView({
        width: "50%",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#b0b0b0",
        borderWidth: 1,
        id: "search_home_btn"
    });
    $.__views.menu_row_1.add($.__views.search_home_btn);
    openSearch ? $.__views.search_home_btn.addEventListener("click", openSearch) : __defers["$.__views.search_home_btn!click!openSearch"] = true;
    $.__views.__alloyId282 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId282"
    });
    $.__views.search_home_btn.add($.__views.__alloyId282);
    $.__views.__alloyId283 = Ti.UI.createImageView({
        height: "30%",
        image: "/images/icons/search.png",
        id: "__alloyId283"
    });
    $.__views.__alloyId282.add($.__views.__alloyId283);
    $.__views.__alloyId284 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "16dp"
            },
            top: "5dp"
        });
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "22dp"
            },
            top: "5dp"
        });
        _.extend(o, {
            text: "Search",
            id: "__alloyId284"
        });
        return o;
    }());
    $.__views.__alloyId282.add($.__views.__alloyId284);
    $.__views.menu_row_2 = Ti.UI.createView({
        height: "20%",
        id: "menu_row_2",
        backgroundColor: "#fff",
        layout: "horizontal",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId277.add($.__views.menu_row_2);
    $.__views.tips_home_btn = Ti.UI.createView({
        width: "50%",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#b0b0b0",
        borderWidth: 1,
        id: "tips_home_btn"
    });
    $.__views.menu_row_2.add($.__views.tips_home_btn);
    openTips ? $.__views.tips_home_btn.addEventListener("click", openTips) : __defers["$.__views.tips_home_btn!click!openTips"] = true;
    $.__views.__alloyId285 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId285"
    });
    $.__views.tips_home_btn.add($.__views.__alloyId285);
    $.__views.__alloyId286 = Ti.UI.createImageView({
        height: "30%",
        image: "/images/icons/tips.png",
        id: "__alloyId286"
    });
    $.__views.__alloyId285.add($.__views.__alloyId286);
    $.__views.__alloyId287 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "16dp"
            },
            top: "5dp"
        });
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "22dp"
            },
            top: "5dp"
        });
        _.extend(o, {
            text: "Top Tips",
            id: "__alloyId287"
        });
        return o;
    }());
    $.__views.__alloyId285.add($.__views.__alloyId287);
    $.__views.favourites_home_btn = Ti.UI.createView({
        width: "50%",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#b0b0b0",
        borderWidth: 1,
        id: "favourites_home_btn"
    });
    $.__views.menu_row_2.add($.__views.favourites_home_btn);
    openFavourites ? $.__views.favourites_home_btn.addEventListener("click", openFavourites) : __defers["$.__views.favourites_home_btn!click!openFavourites"] = true;
    $.__views.__alloyId288 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId288"
    });
    $.__views.favourites_home_btn.add($.__views.__alloyId288);
    $.__views.__alloyId289 = Ti.UI.createImageView({
        height: "30%",
        image: "/images/icons/fav.png",
        id: "__alloyId289"
    });
    $.__views.__alloyId288.add($.__views.__alloyId289);
    $.__views.__alloyId290 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "16dp"
            },
            top: "5dp"
        });
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "22dp"
            },
            top: "5dp"
        });
        _.extend(o, {
            text: "Favourites",
            id: "__alloyId290"
        });
        return o;
    }());
    $.__views.__alloyId288.add($.__views.__alloyId290);
    $.__views.menu_row_3 = Ti.UI.createView({
        height: "20%",
        id: "menu_row_3",
        backgroundColor: "#fff",
        layout: "horizontal",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId277.add($.__views.menu_row_3);
    $.__views.__alloyId291 = Ti.UI.createView({
        width: "50%",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#b0b0b0",
        borderWidth: 1,
        id: "__alloyId291"
    });
    $.__views.menu_row_3.add($.__views.__alloyId291);
    openNews ? $.__views.__alloyId291.addEventListener("click", openNews) : __defers["$.__views.__alloyId291!click!openNews"] = true;
    $.__views.__alloyId292 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId292"
    });
    $.__views.__alloyId291.add($.__views.__alloyId292);
    $.__views.__alloyId293 = Ti.UI.createImageView({
        height: "30%",
        image: "/images/icons/news.png",
        id: "__alloyId293"
    });
    $.__views.__alloyId292.add($.__views.__alloyId293);
    $.__views.__alloyId294 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "16dp"
            },
            top: "5dp"
        });
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "22dp"
            },
            top: "5dp"
        });
        _.extend(o, {
            text: "News",
            id: "__alloyId294"
        });
        return o;
    }());
    $.__views.__alloyId292.add($.__views.__alloyId294);
    $.__views.__alloyId295 = Ti.UI.createView({
        width: "50%",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#b0b0b0",
        borderWidth: 1,
        id: "__alloyId295"
    });
    $.__views.menu_row_3.add($.__views.__alloyId295);
    openBrands ? $.__views.__alloyId295.addEventListener("click", openBrands) : __defers["$.__views.__alloyId295!click!openBrands"] = true;
    $.__views.__alloyId296 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId296"
    });
    $.__views.__alloyId295.add($.__views.__alloyId296);
    $.__views.__alloyId297 = Ti.UI.createImageView({
        height: "30%",
        image: "/images/icons/ourbrands.png",
        id: "__alloyId297"
    });
    $.__views.__alloyId296.add($.__views.__alloyId297);
    $.__views.__alloyId298 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "16dp"
            },
            top: "5dp"
        });
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "22dp"
            },
            top: "5dp"
        });
        _.extend(o, {
            text: "Our Brands",
            id: "__alloyId298"
        });
        return o;
    }());
    $.__views.__alloyId296.add($.__views.__alloyId298);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.parent = $.win1;
    $.win1.addEventListener("open", indexOpen);
    var ageGaitSuccess = Ti.App.Properties.getBool("over18", false);
    if (ageGaitSuccess) setTimeout(function() {
        $.win1.open();
    }, 2e3); else {
        var age_gate = Alloy.createController("age_gate").getView();
        setTimeout(function() {
            age_gate.open();
        }, 2e3);
    }
    __defers["$.__views.cocktails_home_btn!click!openDrinks"] && $.__views.cocktails_home_btn.addEventListener("click", openDrinks);
    __defers["$.__views.search_home_btn!click!openSearch"] && $.__views.search_home_btn.addEventListener("click", openSearch);
    __defers["$.__views.tips_home_btn!click!openTips"] && $.__views.tips_home_btn.addEventListener("click", openTips);
    __defers["$.__views.favourites_home_btn!click!openFavourites"] && $.__views.favourites_home_btn.addEventListener("click", openFavourites);
    __defers["$.__views.news_home_btn!click!openNews"] && $.__views.news_home_btn.addEventListener("click", openNews);
    __defers["$.__views.brand_home_image!click!openBrands"] && $.__views.brand_home_image.addEventListener("click", openBrands);
    __defers["$.__views.__alloyId270!click!openTandCs"] && $.__views.__alloyId270.addEventListener("click", openTandCs);
    __defers["$.__views.__alloyId274!click!openTandCs"] && $.__views.__alloyId274.addEventListener("click", openTandCs);
    __defers["$.__views.cocktails_home_btn!click!openDrinks"] && $.__views.cocktails_home_btn.addEventListener("click", openDrinks);
    __defers["$.__views.search_home_btn!click!openSearch"] && $.__views.search_home_btn.addEventListener("click", openSearch);
    __defers["$.__views.tips_home_btn!click!openTips"] && $.__views.tips_home_btn.addEventListener("click", openTips);
    __defers["$.__views.favourites_home_btn!click!openFavourites"] && $.__views.favourites_home_btn.addEventListener("click", openFavourites);
    __defers["$.__views.__alloyId291!click!openNews"] && $.__views.__alloyId291.addEventListener("click", openNews);
    __defers["$.__views.__alloyId295!click!openBrands"] && $.__views.__alloyId295.addEventListener("click", openBrands);
    __defers["$.__views.__alloyId302!click!openTandCs"] && $.__views.__alloyId302.addEventListener("click", openTandCs);
    __defers["$.__views.cocktails_home_btn!click!openDrinks"] && $.__views.cocktails_home_btn.addEventListener("click", openDrinks);
    __defers["$.__views.search_home_btn!click!openSearch"] && $.__views.search_home_btn.addEventListener("click", openSearch);
    __defers["$.__views.tips_home_btn!click!openTips"] && $.__views.tips_home_btn.addEventListener("click", openTips);
    __defers["$.__views.favourites_home_btn!click!openFavourites"] && $.__views.favourites_home_btn.addEventListener("click", openFavourites);
    __defers["$.__views.__alloyId319!click!openNews"] && $.__views.__alloyId319.addEventListener("click", openNews);
    __defers["$.__views.__alloyId323!click!openBrands"] && $.__views.__alloyId323.addEventListener("click", openBrands);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;