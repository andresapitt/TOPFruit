function Controller() {
    function updateRatingStars(rating) {
        for (var i = 0; 5 > i; i++) cocktail_rating_stars[i].image = rating > i ? "./images/common/full_star.png" : "./images/common/empty_star.png";
    }
    function getCocktailData(cocktailsJson) {
        var cocktail_json;
        null != cocktailsJson && (cocktail_json = JSON.parse(cocktailsJson));
        var recipe_data_array = cocktail_json.filter(function(obj) {
            return obj.Cocktail.id == args.id;
        });
        if (null != recipe_data_array[0]) {
            Ti.API.info("detailed recipe found: " + recipe_data_array[0].Cocktail.id);
            cocktail = recipe_data_array[0].Cocktail;
            updateRatingStars(cocktail.rating);
        } else Ti.API.info("detailed recipe NOT found");
    }
    function star_clicked(e) {
        Ti.API.info("Star clicked, id: " + e.source.star_id);
        switch (e.source.star_id) {
          case "1":
            currentRating = 1;
            $.rating_title.text = "Terrible";
            $.star_1.image = "/images/common/full_star.png";
            $.star_2.image = "/images/common/empty_star.png";
            $.star_3.image = "/images/common/empty_star.png";
            $.star_4.image = "/images/common/empty_star.png";
            $.star_5.image = "/images/common/empty_star.png";
            break;

          case "2":
            currentRating = 2;
            $.rating_title.text = "Poor";
            $.star_1.image = "/images/common/full_star.png";
            $.star_2.image = "/images/common/full_star.png";
            $.star_3.image = "/images/common/empty_star.png";
            $.star_4.image = "/images/common/empty_star.png";
            $.star_5.image = "/images/common/empty_star.png";
            break;

          case "3":
            currentRating = 3;
            $.rating_title.text = "Average";
            $.star_1.image = "/images/common/full_star.png";
            $.star_2.image = "/images/common/full_star.png";
            $.star_3.image = "/images/common/full_star.png";
            $.star_4.image = "/images/common/empty_star.png";
            $.star_5.image = "/images/common/empty_star.png";
            break;

          case "4":
            currentRating = 4;
            $.rating_title.text = "Very good";
            $.star_1.image = "/images/common/full_star.png";
            $.star_2.image = "/images/common/full_star.png";
            $.star_3.image = "/images/common/full_star.png";
            $.star_4.image = "/images/common/full_star.png";
            $.star_5.image = "/images/common/empty_star.png";
            break;

          case "5":
            currentRating = 5;
            $.rating_title.text = "Excellent";
            $.star_1.image = "/images/common/full_star.png";
            $.star_2.image = "/images/common/full_star.png";
            $.star_3.image = "/images/common/full_star.png";
            $.star_4.image = "/images/common/full_star.png";
            $.star_5.image = "/images/common/full_star.png";
        }
    }
    function closeRatingHandler() {
        Ti.API.info("Close rating handler");
        var animation = Titanium.UI.createAnimation();
        animation.bottom = "-240dp";
        animation.duration = 300;
        animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
        $.rating_picker.animate(animation);
    }
    function submitRatingBtnHandler() {
        Ti.API.info("Submit rating handler");
        if (0 == currentRating) Ti.UI.createAlertDialog({
            message: "You must click on the stars to set a rating.",
            ok: "Ok",
            title: "Rating error"
        }).show(); else {
            currentRatings.push({
                id: cocktail.id,
                rating: currentRating
            });
            Titanium.App.Properties.setList("ratings", currentRatings);
            var animation = Titanium.UI.createAnimation();
            animation.bottom = "-240dp";
            animation.duration = 300;
            animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
            $.rating_picker.animate(animation);
            $.rating_view.touchEnabled = false;
            $.rating_cta.text = 1 == currentRating ? "Your rating: " + currentRating + " star" : "Your rating: " + currentRating + " stars";
            var xhr = Ti.Network.createHTTPClient();
            xhr.open("GET", "http://vocal.ie/client/idl/perfect-mix/cocktails/cocktails/saverating/hash:35e1b0e0b9bc289cc4d14a1f63ef9263/cocktail_id:" + cocktail.id + "/rating:" + currentRating);
            xhr.onload = function() {
                Ti.API.info("Text Recieved" + this.responseText);
                var validJSON = null;
                try {
                    validJSON = JSON.parse(this.responseText);
                } catch (e) {
                    Ti.API.info("Invalid JSON recieved from ratings");
                }
                if (null != validJSON) {
                    updateRatingStars(validJSON.average);
                    Alloy.Globals.Utils.updateCocktailRating(validJSON.cocktail_id, validJSON.average);
                }
            };
            xhr.send();
        }
    }
    function submitCommentBtnHandler() {
        Ti.API.info("Submit comment on recipe");
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Perfect Mix - Comment: " + cocktail.title;
        emailDialog.toRecipients = [ "lisa@vstream.ie" ];
        emailDialog.messageBody = "";
        emailDialog.open();
    }
    function updateFavIcon() {
        if (currentFavs.length >= 0) {
            for (var i = 0; currentFavs.length > i; i++) if (currentFavs[i].id == cocktail.id) {
                Ti.API.info("cocktail in favorites");
                $.fav_heart.image = "./images/favs/heart_full.png";
                return false;
            }
            $.fav_heart.image = "./images/favs/heart_outline.png";
        }
    }
    function fav_clicked() {
        Ti.API.info("Fav heart clicked ");
        if (null == currentFavs || 0 == currentFavs.length) {
            Ti.API.info("No current favourites - add this cocktail to favourites");
            currentFavs.push({
                id: cocktail.id
            });
        } else {
            for (var i = 0; currentFavs.length > i; i++) if (currentFavs[i].id == cocktail.id) {
                Ti.API.info("Cocktail already in favorites - remove from list");
                currentFavs.splice(i, 1);
                Titanium.App.Properties.setList("favs", currentFavs);
                updateFavIcon();
                return false;
            }
            currentFavs.push({
                id: cocktail.id
            });
        }
        Titanium.App.Properties.setList("favs", currentFavs);
        updateFavIcon();
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.cocktail_detailed);
        Alloy.Globals.windowStack.splice(a, 1);
        $.cocktail_detailed.close();
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "cocktail_detailed";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.cocktail_detailed = Ti.UI.createWindow({
        backgroundColor: "white",
        titleAttributes: {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "18dp"
            }
        },
        barColor: "#fff",
        layout: "composite",
        height: "568dp",
        width: "320dp",
        navBarHidden: true,
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        tintColor: Alloy.Globals.PrimaryColor,
        navTintColor: Alloy.Globals.PrimaryColor,
        title: "DRINK RECIPE",
        id: "cocktail_detailed"
    });
    $.__views.cocktail_detailed && $.addTopLevelView($.__views.cocktail_detailed);
    $.__views.__alloyId77 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId77"
    });
    $.__views.cocktail_detailed.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId79"
    });
    $.__views.__alloyId77.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId80"
    });
    $.__views.__alloyId79.add($.__views.__alloyId80);
    closeWindow ? $.__views.__alloyId80.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId80!click!closeWindow"] = true;
    $.__views.__alloyId81 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "DRINK RECIPE",
        id: "__alloyId81"
    });
    $.__views.__alloyId79.add($.__views.__alloyId81);
    $.__views.__alloyId82 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId82"
    });
    $.__views.__alloyId79.add($.__views.__alloyId82);
    goToHome ? $.__views.__alloyId82.addEventListener("click", goToHome) : __defers["$.__views.__alloyId82!click!goToHome"] = true;
    $.__views.__alloyId84 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "50dp",
        id: "__alloyId84"
    });
    $.__views.cocktail_detailed.add($.__views.__alloyId84);
    $.__views.cocktail_scroll = Ti.UI.createScrollView({
        top: "51dp",
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
        id: "cocktail_scroll"
    });
    $.__views.cocktail_detailed.add($.__views.cocktail_scroll);
    $.__views.recipe_title_label = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "22dp"
        },
        top: "15dp",
        left: "5dp",
        right: "5dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "recipe_title_label"
    });
    $.__views.cocktail_scroll.add($.__views.recipe_title_label);
    $.__views.how_to_make_it = Ti.UI.createView({
        left: "5dp",
        right: "5dp",
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        borderRadius: "4dp",
        borderColor: "#d1d1d1",
        borderWidth: 1,
        layout: "vertical",
        top: "10dp",
        id: "how_to_make_it"
    });
    $.__views.cocktail_scroll.add($.__views.how_to_make_it);
    $.__views.__alloyId86 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId86"
    });
    $.__views.how_to_make_it.add($.__views.__alloyId86);
    $.__views.fav_heart = Ti.UI.createImageView({
        top: "10dp",
        right: "10dp",
        width: "25dp",
        id: "fav_heart",
        image: "./images/favs/heart_outline.png"
    });
    $.__views.__alloyId86.add($.__views.fav_heart);
    fav_clicked ? $.__views.fav_heart.addEventListener("click", fav_clicked) : __defers["$.__views.fav_heart!click!fav_clicked"] = true;
    $.__views.__alloyId87 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        top: "10dp",
        left: "5dp",
        right: "5dp",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        text: "How to make it",
        id: "__alloyId87"
    });
    $.__views.__alloyId86.add($.__views.__alloyId87);
    $.__views.__alloyId88 = Ti.UI.createView({
        height: "1",
        width: "140dp",
        backgroundColor: "#d1d1d1",
        bottom: "0dp",
        id: "__alloyId88"
    });
    $.__views.__alloyId86.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId89"
    });
    $.__views.how_to_make_it.add($.__views.__alloyId89);
    $.__views.recipe_image_ani_view = Ti.UI.createView({
        left: "-30%",
        width: "30%",
        height: "160dp",
        top: "10dp",
        id: "recipe_image_ani_view"
    });
    $.__views.__alloyId89.add($.__views.recipe_image_ani_view);
    $.__views.how_to_view = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: "70%",
        left: "30%",
        top: "0dp",
        id: "how_to_view"
    });
    $.__views.__alloyId89.add($.__views.how_to_view);
    $.__views.cocktail_desc_container = Ti.UI.createView({
        id: "cocktail_desc_container",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.how_to_view.add($.__views.cocktail_desc_container);
    $.__views.__alloyId90 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        top: "10dp",
        left: "12dp",
        right: "5dp",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.LEFT,
        touchEnabled: false,
        text: "Description",
        id: "__alloyId90"
    });
    $.__views.cocktail_desc_container.add($.__views.__alloyId90);
    $.__views.cocktail_desc = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "14dp"
        },
        top: "2dp",
        left: "12dp",
        right: "5dp",
        textAlign: Ti.UI.LEFT,
        touchEnabled: false,
        text: "Description",
        id: "cocktail_desc"
    });
    $.__views.cocktail_desc_container.add($.__views.cocktail_desc);
    $.__views.glassware_container = Ti.UI.createView({
        id: "glassware_container",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.how_to_view.add($.__views.glassware_container);
    $.__views.__alloyId91 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        top: "10dp",
        left: "12dp",
        right: "5dp",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.LEFT,
        touchEnabled: false,
        text: "Glassware",
        id: "__alloyId91"
    });
    $.__views.glassware_container.add($.__views.__alloyId91);
    $.__views.glassware = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "14dp"
        },
        top: "2dp",
        left: "12dp",
        right: "5dp",
        textAlign: Ti.UI.LEFT,
        touchEnabled: false,
        text: "Glassware info",
        id: "glassware"
    });
    $.__views.glassware_container.add($.__views.glassware);
    $.__views.ingredients_container = Ti.UI.createView({
        id: "ingredients_container",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.how_to_view.add($.__views.ingredients_container);
    $.__views.__alloyId92 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        top: "10dp",
        left: "12dp",
        right: "5dp",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.LEFT,
        touchEnabled: false,
        text: "Ingredients",
        id: "__alloyId92"
    });
    $.__views.ingredients_container.add($.__views.__alloyId92);
    $.__views.ingredients = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "14dp"
        },
        top: "2dp",
        left: "12dp",
        right: "5dp",
        textAlign: Ti.UI.LEFT,
        touchEnabled: false,
        text: "Ingredients info",
        id: "ingredients"
    });
    $.__views.ingredients_container.add($.__views.ingredients);
    $.__views.method_container = Ti.UI.createView({
        id: "method_container",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.how_to_view.add($.__views.method_container);
    $.__views.__alloyId93 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        top: "10dp",
        left: "12dp",
        right: "5dp",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.LEFT,
        touchEnabled: false,
        text: "Method",
        id: "__alloyId93"
    });
    $.__views.method_container.add($.__views.__alloyId93);
    $.__views.method = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "14dp"
        },
        top: "2dp",
        left: "12dp",
        right: "5dp",
        textAlign: Ti.UI.LEFT,
        touchEnabled: false,
        text: "Method info",
        id: "method"
    });
    $.__views.method_container.add($.__views.method);
    $.__views.garnish_container = Ti.UI.createView({
        id: "garnish_container",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.how_to_view.add($.__views.garnish_container);
    $.__views.__alloyId94 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        top: "10dp",
        left: "12dp",
        right: "5dp",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.LEFT,
        touchEnabled: false,
        text: "Garnish",
        id: "__alloyId94"
    });
    $.__views.garnish_container.add($.__views.__alloyId94);
    $.__views.garnish = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "14dp"
        },
        top: "2dp",
        left: "12dp",
        right: "5dp",
        textAlign: Ti.UI.LEFT,
        touchEnabled: false,
        text: "Garnish info",
        id: "garnish"
    });
    $.__views.garnish_container.add($.__views.garnish);
    $.__views.__alloyId95 = Ti.UI.createView({
        height: "10dp",
        width: "140dp",
        id: "__alloyId95"
    });
    $.__views.how_to_make_it.add($.__views.__alloyId95);
    $.__views.video_container = Ti.UI.createView({
        left: "5dp",
        right: "5dp",
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        borderRadius: "4dp",
        borderColor: "#d1d1d1",
        borderWidth: 1,
        layout: "composite",
        top: "10dp",
        id: "video_container"
    });
    $.__views.cocktail_scroll.add($.__views.video_container);
    $.__views.recipe_container_bottom = Ti.UI.createView({
        left: "5dp",
        right: "5dp",
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        borderRadius: "4dp",
        borderColor: "#d1d1d1",
        borderWidth: 1,
        layout: "vertical",
        top: "10dp",
        id: "recipe_container_bottom"
    });
    $.__views.cocktail_scroll.add($.__views.recipe_container_bottom);
    $.__views.__alloyId96 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        top: "10dp",
        left: "5dp",
        right: "5dp",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        text: "Rating",
        id: "__alloyId96"
    });
    $.__views.recipe_container_bottom.add($.__views.__alloyId96);
    $.__views.__alloyId97 = Ti.UI.createView({
        height: "1",
        width: "140dp",
        backgroundColor: "#d1d1d1",
        id: "__alloyId97"
    });
    $.__views.recipe_container_bottom.add($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId98"
    });
    $.__views.recipe_container_bottom.add($.__views.__alloyId98);
    $.__views.rating_view = Ti.UI.createView({
        id: "rating_view",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: "5dp"
    });
    $.__views.__alloyId98.add($.__views.rating_view);
    $.__views.rating_cta = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "14dp"
        },
        top: "5dp",
        left: "12dp",
        right: "5dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        text: "Rate this recipe",
        id: "rating_cta"
    });
    $.__views.__alloyId98.add($.__views.rating_cta);
    $.__views.__alloyId99 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        top: "10dp",
        left: "5dp",
        right: "5dp",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        text: "Feedback",
        id: "__alloyId99"
    });
    $.__views.recipe_container_bottom.add($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createView({
        height: "1",
        width: "140dp",
        backgroundColor: "#d1d1d1",
        id: "__alloyId100"
    });
    $.__views.recipe_container_bottom.add($.__views.__alloyId100);
    $.__views.__alloyId101 = Ti.UI.createButton({
        top: "10dp",
        color: "#ffffff",
        backgroundColor: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "14dp"
        },
        width: "220dp",
        height: "35dp",
        borderRadius: 4,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "Submit Feedback",
        id: "__alloyId101"
    });
    $.__views.recipe_container_bottom.add($.__views.__alloyId101);
    submitCommentBtnHandler ? $.__views.__alloyId101.addEventListener("click", submitCommentBtnHandler) : __defers["$.__views.__alloyId101!click!submitCommentBtnHandler"] = true;
    $.__views.recipe_social_container = Ti.UI.createView({
        id: "recipe_social_container",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    $.__views.recipe_container_bottom.add($.__views.recipe_social_container);
    $.__views.__alloyId102 = Ti.UI.createLabel({
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "18dp"
        },
        top: "10dp",
        left: "5dp",
        right: "5dp",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        text: "Social",
        id: "__alloyId102"
    });
    $.__views.recipe_social_container.add($.__views.__alloyId102);
    $.__views.__alloyId103 = Ti.UI.createView({
        height: "1",
        width: "140dp",
        backgroundColor: "#d1d1d1",
        id: "__alloyId103"
    });
    $.__views.recipe_social_container.add($.__views.__alloyId103);
    $.__views.social_hor_view_recipe = Ti.UI.createView({
        layout: "horizontal",
        id: "social_hor_view_recipe",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "10dp"
    });
    $.__views.recipe_social_container.add($.__views.social_hor_view_recipe);
    $.__views.twitterParent_recipe = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "twitterParent_recipe"
    });
    $.__views.social_hor_view_recipe.add($.__views.twitterParent_recipe);
    $.__views.twitterBtn_cocktailDeet = Ti.UI.createLabel({
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
        id: "twitterBtn_cocktailDeet"
    });
    $.__views.twitterParent_recipe.add($.__views.twitterBtn_cocktailDeet);
    $.__views.facebookParent_recipe = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "facebookParent_recipe"
    });
    $.__views.social_hor_view_recipe.add($.__views.facebookParent_recipe);
    $.__views.facebookBtn_cocktailDeet = Ti.UI.createLabel({
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
        id: "facebookBtn_cocktailDeet"
    });
    $.__views.facebookParent_recipe.add($.__views.facebookBtn_cocktailDeet);
    $.__views.__alloyId104 = Ti.UI.createView({
        height: "10dp",
        width: "140dp",
        id: "__alloyId104"
    });
    $.__views.recipe_container_bottom.add($.__views.__alloyId104);
    $.__views.__alloyId105 = Ti.UI.createView({
        height: "10dp",
        width: "140dp",
        id: "__alloyId105"
    });
    $.__views.cocktail_scroll.add($.__views.__alloyId105);
    $.__views.rating_picker = Ti.UI.createView({
        height: "240dp",
        bottom: "-240dp",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        id: "rating_picker"
    });
    $.__views.cocktail_detailed.add($.__views.rating_picker);
    $.__views.__alloyId106 = Ti.UI.createView({
        layout: "vertical",
        top: "0dp",
        height: Ti.UI.SIZE,
        id: "__alloyId106"
    });
    $.__views.rating_picker.add($.__views.__alloyId106);
    $.__views.__alloyId107 = Ti.UI.createButton({
        height: "40dp",
        backgroundColor: "#eee",
        borderRadius: 0,
        borderColor: "#898989",
        borderWidth: 1,
        width: Ti.UI.FILL,
        color: Alloy.Globals.PrimaryColor,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "16dp",
            fontFamily: Alloy.Globals.BoldFont
        },
        title: "TAP TO CLOSE",
        id: "__alloyId107"
    });
    $.__views.__alloyId106.add($.__views.__alloyId107);
    closeRatingHandler ? $.__views.__alloyId107.addEventListener("click", closeRatingHandler) : __defers["$.__views.__alloyId107!click!closeRatingHandler"] = true;
    $.__views.rating_title = Ti.UI.createLabel({
        top: "30dp",
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "18dp"
        },
        text: "Tap a star to rate",
        id: "rating_title",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    });
    $.__views.__alloyId106.add($.__views.rating_title);
    $.__views.__alloyId110 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: "20dp",
        bottom: "20dp",
        id: "__alloyId110"
    });
    $.__views.__alloyId106.add($.__views.__alloyId110);
    $.__views.star_1 = Ti.UI.createImageView({
        left: "4dp",
        right: "4dp",
        width: "25dp",
        id: "star_1",
        image: "./images/common/empty_star.png",
        star_id: "1"
    });
    $.__views.__alloyId110.add($.__views.star_1);
    star_clicked ? $.__views.star_1.addEventListener("click", star_clicked) : __defers["$.__views.star_1!click!star_clicked"] = true;
    $.__views.star_2 = Ti.UI.createImageView({
        left: "4dp",
        right: "4dp",
        width: "25dp",
        id: "star_2",
        image: "./images/common/empty_star.png",
        star_id: "2"
    });
    $.__views.__alloyId110.add($.__views.star_2);
    star_clicked ? $.__views.star_2.addEventListener("click", star_clicked) : __defers["$.__views.star_2!click!star_clicked"] = true;
    $.__views.star_3 = Ti.UI.createImageView({
        left: "4dp",
        right: "4dp",
        width: "25dp",
        id: "star_3",
        image: "./images/common/empty_star.png",
        star_id: "3"
    });
    $.__views.__alloyId110.add($.__views.star_3);
    star_clicked ? $.__views.star_3.addEventListener("click", star_clicked) : __defers["$.__views.star_3!click!star_clicked"] = true;
    $.__views.star_4 = Ti.UI.createImageView({
        left: "4dp",
        right: "4dp",
        width: "25dp",
        id: "star_4",
        image: "./images/common/empty_star.png",
        star_id: "4"
    });
    $.__views.__alloyId110.add($.__views.star_4);
    star_clicked ? $.__views.star_4.addEventListener("click", star_clicked) : __defers["$.__views.star_4!click!star_clicked"] = true;
    $.__views.star_5 = Ti.UI.createImageView({
        left: "4dp",
        right: "4dp",
        width: "25dp",
        id: "star_5",
        image: "./images/common/empty_star.png",
        star_id: "5"
    });
    $.__views.__alloyId110.add($.__views.star_5);
    star_clicked ? $.__views.star_5.addEventListener("click", star_clicked) : __defers["$.__views.star_5!click!star_clicked"] = true;
    $.__views.__alloyId111 = Ti.UI.createButton({
        top: "10dp",
        color: "#ffffff",
        backgroundColor: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "14dp"
        },
        width: "220dp",
        height: "35dp",
        borderRadius: 4,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "Submit Rating",
        id: "__alloyId111"
    });
    $.__views.__alloyId106.add($.__views.__alloyId111);
    submitRatingBtnHandler ? $.__views.__alloyId111.addEventListener("click", submitRatingBtnHandler) : __defers["$.__views.__alloyId111!click!submitRatingBtnHandler"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Recipe detail screen opened");
    var args = arguments[0] || {};
    var cocktail = args || "Category not received";
    Ti.API.info("Cocktail category: " + cocktail.title);
    $.recipe_title_label.text = cocktail.title;
    if (null != cocktail.glass && "" != cocktail.glass) {
        Ti.API.info("cocktail glassware info: " + cocktail.glass);
        var glassText = "";
        for (var i = 0; cocktail.glass.length > i; i++) glassText += "• " + cocktail.glass[i].Glass.title + "\n";
        $.glassware.text = glassText;
    } else {
        Ti.API.info("No cocktail glass info");
        $.how_to_view.remove($.glassware_container);
    }
    if (null != cocktail.description && "" != cocktail.description) {
        Ti.API.info("cocktail description info: " + cocktail.description);
        $.cocktail_desc.text = cocktail.description;
    } else {
        Ti.API.info("No cocktail description info");
        $.how_to_view.remove($.cocktail_desc_container);
    }
    if (null != cocktail.ingredients && "" != cocktail.ingredients) {
        Ti.API.info("cocktail ingredients info: " + cocktail.ingredients);
        var parsedIngredients = cocktail.ingredients.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
        $.ingredients.text = "";
        for (var i = 0; parsedIngredients.length > i; i++) $.ingredients.text += "• " + parsedIngredients[i] + "\r\n";
    } else {
        Ti.API.info("No cocktail ingredients info");
        $.how_to_view.remove($.ingredients_container);
    }
    if (null != cocktail.method && "" != cocktail.method) {
        Ti.API.info("cocktail method info: " + cocktail.method);
        var parsedMethod = cocktail.method.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
        $.method.text = "";
        for (var i = 0; parsedMethod.length > i; i++) $.method.text += "• " + parsedMethod[i] + "\r\n";
    } else {
        Ti.API.info("No cocktail method info");
        $.how_to_view.remove($.method_container);
    }
    if (null != cocktail.garnish && "" != cocktail.garnish) {
        Ti.API.info("cocktail garnish info: " + cocktail.garnish);
        $.garnish.text = cocktail.garnish;
        var parsedGarnish = cocktail.garnish.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
        $.garnish.text = "";
        for (var i = 0; parsedGarnish.length > i; i++) $.garnish.text += "• " + parsedGarnish[i] + "\r\n";
    } else {
        Ti.API.info("No cocktail garnish info");
        $.how_to_view.remove($.garnish_container);
    }
    if (null != cocktail.video && "" != cocktail.video) {
        Ti.API.info("cocktail video info: " + cocktail.video);
        var video_thumbnail_image;
        var video_thumbnail_image;
        var video_thumbnail_image = Alloy.Globals.Utils.RemoteImage({
            image: "http://img.youtube.com/vi/" + cocktail.video + "/hqdefault.jpg",
            defaultImage: "images/cocktails/glass.png",
            checkRetina: false,
            width: Ti.UI.FILL,
            top: 0
        });
        $.video_container.add(video_thumbnail_image);
        $.video_container.addEventListener("click", function() {
            Ti.API.info("youtube link clicked");
            var animation = Titanium.UI.createAnimation();
            animation.bottom = "-240dp";
            animation.duration = 300;
            animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
            $.rating_picker.animate(animation);
            Alloy.createWidget("ytPlayer").play(cocktail.video);
        });
        var video_play = Ti.UI.createImageView();
        video_play.image = "./images/common/play_btn.png";
        video_play.touchEnabled = false;
        $.video_container.add(video_play);
        video_play.width = Ti.UI.SIZE;
        video_play.height = Ti.UI.SIZE;
    } else {
        Ti.API.info("No cocktail video info");
        $.cocktail_scroll.remove($.video_container);
    }
    var showSocialSection = false;
    if (null == cocktail.facebook || "" == cocktail.facebook) $.social_hor_view_recipe.remove($.facebookParent_recipe); else {
        showSocialSection = true;
        $.facebookBtn_cocktailDeet.html = '<a href="http://www.facebook.com/' + cocktail.facebook + '" target="_blank"><div style="height:30px;"><img src="./images/icons/facebookIcon@2x.png" style="width:20px;height:25px;left:3px;"><span style="color:#fff;font-size:16px;line-height:30px;height:30px !important;vertical-align:top;">Facebook</span></div></a>';
    }
    if (null == cocktail.twitter || "" == cocktail.twitter) $.social_hor_view_recipe.remove($.twitterParent_recipe); else {
        showSocialSection = true;
        $.twitterBtn_cocktailDeet.html = '<a href="http://twitter.com/' + cocktail.twitter + '" target="_blank"><div style="height:30px;"><img src="./images/icons/twitterbird@2x.png" style="width:25px;height:20px;top:5px;left:5px;"><span style="color:#fff;font-size:16px;line-height:30px;height:30px !important;vertical-align:top;">Twitter</span></div></a>';
    }
    showSocialSection || $.recipe_container_bottom.remove($.recipe_social_container);
    var ratings_star_style = $.createStyle({
        classes: [ "star_icon" ]
    });
    var cocktail_rating_stars = new Array();
    for (var i = 0; 5 > i; i++) {
        cocktail_rating_stars[i] = Ti.UI.createImageView();
        cocktail_rating_stars[i].image = "./images/common/empty_star.png";
        cocktail_rating_stars[i].touchEnabled = false;
        cocktail_rating_stars[i].applyProperties(ratings_star_style);
        $.rating_view.add(cocktail_rating_stars[i]);
    }
    Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/cocktails/cocktails/viewjson", "data/Cocktails.txt", getCocktailData);
    var currentRatings = Titanium.App.Properties.getList("ratings", new Array());
    var currentFavs = Titanium.App.Properties.getList("favs", new Array());
    if (null == currentRatings || 0 == currentRatings.length) {
        Ti.API.info("Current ratings count is 0 or null - allowed to rate");
        $.rating_view.addEventListener("click", function() {
            Ti.API.info("Cocktail rating clicked");
            var animation = Titanium.UI.createAnimation();
            animation.bottom = "0dp";
            animation.duration = 300;
            animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
            $.rating_picker.animate(animation);
        });
    } else if (currentRatings.length > 0) {
        Ti.API.info("Current ratings are greater than one - check if allowed to rate");
        var canRate = true;
        for (var i = 0; currentRatings.length > i; i++) if (currentRatings[i].id == cocktail.id) {
            $.rating_cta.text = 1 == currentRatings[i].rating ? "Your rating: " + currentRatings[i].rating + " star" : "Your rating: " + currentRatings[i].rating + " stars";
            canRate = false;
        }
        canRate && $.rating_view.addEventListener("click", function() {
            Ti.API.info("Cocktail rating clicked");
            var animation = Titanium.UI.createAnimation();
            animation.bottom = "0dp";
            animation.duration = 300;
            animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
            $.rating_picker.animate(animation);
        });
    }
    var currentRating = 0;
    updateFavIcon();
    $.cocktail_detailed.addEventListener("close", function() {
        Ti.API.info("cocktail desc closed");
    });
    $.cocktail_detailed.addEventListener("open", function() {
        Ti.API.info("Cocktail desc opened");
        Alloy.Globals.windowStack.push($.cocktail_detailed);
        var animation = Titanium.UI.createAnimation();
        animation.left = "0dp";
        animation.duration = 700;
        animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
        try {
            var cocktail_image = Alloy.Globals.Utils.RemoteImage({
                image: cocktail.image,
                defaultImage: "images/cocktails/glass.png",
                height: Ti.UI.FILL,
                width: Ti.UI.FILL
            });
            $.recipe_image_ani_view.add(cocktail_image);
        } catch (ex) {
            Ti.API.info("image drawing error: " + ex.toString);
        }
        setTimeout(function() {
            $.recipe_image_ani_view.animate(animation);
        }, 700);
    });
    $.cocktail_detailed.addEventListener("androidback", function() {
        $.cocktail_detailed.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.cocktail_detailed);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId74!click!closeWindow"] && $.__views.__alloyId74.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId76!click!goToHome"] && $.__views.__alloyId76.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId80!click!closeWindow"] && $.__views.__alloyId80.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId82!click!goToHome"] && $.__views.__alloyId82.addEventListener("click", goToHome);
    __defers["$.__views.fav_heart!click!fav_clicked"] && $.__views.fav_heart.addEventListener("click", fav_clicked);
    __defers["$.__views.fav_heart!click!fav_clicked"] && $.__views.fav_heart.addEventListener("click", fav_clicked);
    __defers["$.__views.fav_heart!click!fav_clicked"] && $.__views.fav_heart.addEventListener("click", fav_clicked);
    __defers["$.__views.__alloyId101!click!submitCommentBtnHandler"] && $.__views.__alloyId101.addEventListener("click", submitCommentBtnHandler);
    __defers["$.__views.__alloyId107!click!closeRatingHandler"] && $.__views.__alloyId107.addEventListener("click", closeRatingHandler);
    __defers["$.__views.star_1!click!star_clicked"] && $.__views.star_1.addEventListener("click", star_clicked);
    __defers["$.__views.star_2!click!star_clicked"] && $.__views.star_2.addEventListener("click", star_clicked);
    __defers["$.__views.star_3!click!star_clicked"] && $.__views.star_3.addEventListener("click", star_clicked);
    __defers["$.__views.star_4!click!star_clicked"] && $.__views.star_4.addEventListener("click", star_clicked);
    __defers["$.__views.star_5!click!star_clicked"] && $.__views.star_5.addEventListener("click", star_clicked);
    __defers["$.__views.star_1!click!star_clicked"] && $.__views.star_1.addEventListener("click", star_clicked);
    __defers["$.__views.star_2!click!star_clicked"] && $.__views.star_2.addEventListener("click", star_clicked);
    __defers["$.__views.star_3!click!star_clicked"] && $.__views.star_3.addEventListener("click", star_clicked);
    __defers["$.__views.star_4!click!star_clicked"] && $.__views.star_4.addEventListener("click", star_clicked);
    __defers["$.__views.star_5!click!star_clicked"] && $.__views.star_5.addEventListener("click", star_clicked);
    __defers["$.__views.star_1!click!star_clicked"] && $.__views.star_1.addEventListener("click", star_clicked);
    __defers["$.__views.star_2!click!star_clicked"] && $.__views.star_2.addEventListener("click", star_clicked);
    __defers["$.__views.star_3!click!star_clicked"] && $.__views.star_3.addEventListener("click", star_clicked);
    __defers["$.__views.star_4!click!star_clicked"] && $.__views.star_4.addEventListener("click", star_clicked);
    __defers["$.__views.star_5!click!star_clicked"] && $.__views.star_5.addEventListener("click", star_clicked);
    __defers["$.__views.__alloyId111!click!submitRatingBtnHandler"] && $.__views.__alloyId111.addEventListener("click", submitRatingBtnHandler);
    __defers["$.__views.__alloyId113!click!goToHome"] && $.__views.__alloyId113.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId115!click!closeWindow"] && $.__views.__alloyId115.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;