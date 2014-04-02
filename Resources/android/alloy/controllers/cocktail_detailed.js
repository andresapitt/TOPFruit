function Controller() {
    function PixelsToDPUnits(ThePixels) {
        return ThePixels / (Titanium.Platform.displayCaps.dpi / 194);
    }
    function updateRatingStars(rating) {
        for (var i = 0; 5 > i; i++) cocktail_rating_stars[i].image = rating > i ? "/images/common/full_star.png" : "/images/common/empty_star.png";
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
        animation.bottom = "-260dp";
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
            animation.bottom = "-260dp";
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
                $.fav_heart.image = "/images/favs/heart_full.png";
                return false;
            }
            $.fav_heart.image = "/images/favs/heart_outline.png";
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
        $.cocktail_detailed.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
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
        layout: "composite",
        height: "100%",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        modal: false,
        title: "DRINK RECIPE",
        id: "cocktail_detailed"
    });
    $.__views.cocktail_detailed && $.addTopLevelView($.__views.cocktail_detailed);
    $.__views.__alloyId71 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId71"
    });
    $.__views.cocktail_detailed.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId72"
    });
    $.__views.__alloyId71.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId73"
    });
    $.__views.__alloyId71.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId74"
    });
    $.__views.__alloyId73.add($.__views.__alloyId74);
    closeWindow ? $.__views.__alloyId74.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId74!click!closeWindow"] = true;
    $.__views.__alloyId75 = Ti.UI.createLabel(function() {
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
            text: "DRINK RECIPE",
            color: "#313646",
            id: "__alloyId75"
        });
        return o;
    }());
    $.__views.__alloyId73.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId76"
    });
    $.__views.__alloyId73.add($.__views.__alloyId76);
    goToHome ? $.__views.__alloyId76.addEventListener("click", goToHome) : __defers["$.__views.__alloyId76!click!goToHome"] = true;
    $.__views.__alloyId83 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "50dp",
        id: "__alloyId83"
    });
    $.__views.cocktail_detailed.add($.__views.__alloyId83);
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
    $.__views.recipe_title_label = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "18dp"
            },
            top: "15dp",
            left: "5dp",
            right: "5dp",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "25dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "32dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        _.extend(o, {
            id: "recipe_title_label"
        });
        return o;
    }());
    $.__views.cocktail_scroll.add($.__views.recipe_title_label);
    $.__views.how_to_make_it = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            left: "5dp",
            right: "5dp",
            height: Ti.UI.SIZE,
            backgroundColor: "#fff",
            borderRadius: 0,
            borderColor: "#d1d1d1",
            borderWidth: 1,
            layout: "vertical",
            top: "10dp",
            width: Ti.UI.FILL
        });
        Alloy.isTablet && _.extend(o, {
            left: "10dp",
            right: "10dp",
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            backgroundColor: "#fff",
            borderRadius: 0,
            borderColor: "#d1d1d1",
            borderWidth: 1,
            layout: "vertical",
            top: "10dp"
        });
        _.extend(o, {
            id: "how_to_make_it"
        });
        return o;
    }());
    $.__views.cocktail_scroll.add($.__views.how_to_make_it);
    $.__views.__alloyId86 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId86"
    });
    $.__views.how_to_make_it.add($.__views.__alloyId86);
    $.__views.fav_heart = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            top: "10dp",
            right: "10dp",
            width: "25dp"
        });
        Alloy.isTablet && _.extend(o, {
            top: "10dp",
            right: "10dp",
            width: "25dp",
            height: "25dp"
        });
        _.extend(o, {
            id: "fav_heart",
            image: "/images/favs/heart_outline.png"
        });
        return o;
    }());
    $.__views.__alloyId86.add($.__views.fav_heart);
    fav_clicked ? $.__views.fav_heart.addEventListener("click", fav_clicked) : __defers["$.__views.fav_heart!click!fav_clicked"] = true;
    $.__views.__alloyId87 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "14dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "24dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "How to make it",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            id: "__alloyId87"
        });
        return o;
    }());
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
    $.__views.recipe_image_ani_view = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            left: "-30%",
            width: "30%",
            height: "160dp",
            top: "10dp"
        });
        Alloy.isTablet && _.extend(o, {
            left: "-30%",
            width: "30%",
            height: "240dp",
            top: "10dp"
        });
        _.extend(o, {
            id: "recipe_image_ani_view"
        });
        return o;
    }());
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
    $.__views.__alloyId90 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "14dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "24dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Description",
            left: "12dp",
            id: "__alloyId90"
        });
        return o;
    }());
    $.__views.cocktail_desc_container.add($.__views.__alloyId90);
    $.__views.cocktail_desc = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "11dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "15dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "20dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Description",
            id: "cocktail_desc"
        });
        return o;
    }());
    $.__views.cocktail_desc_container.add($.__views.cocktail_desc);
    $.__views.glassware_container = Ti.UI.createView({
        id: "glassware_container",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.how_to_view.add($.__views.glassware_container);
    $.__views.__alloyId91 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "14dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "24dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Glassware",
            left: "12dp",
            id: "__alloyId91"
        });
        return o;
    }());
    $.__views.glassware_container.add($.__views.__alloyId91);
    $.__views.glassware = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "11dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "15dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "20dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Glassware info",
            id: "glassware"
        });
        return o;
    }());
    $.__views.glassware_container.add($.__views.glassware);
    $.__views.ingredients_container = Ti.UI.createView({
        id: "ingredients_container",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.how_to_view.add($.__views.ingredients_container);
    $.__views.__alloyId92 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "14dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "24dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Ingredients",
            left: "12dp",
            id: "__alloyId92"
        });
        return o;
    }());
    $.__views.ingredients_container.add($.__views.__alloyId92);
    $.__views.ingredients = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "11dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "15dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "20dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Ingredients info",
            id: "ingredients"
        });
        return o;
    }());
    $.__views.ingredients_container.add($.__views.ingredients);
    $.__views.method_container = Ti.UI.createView({
        id: "method_container",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.how_to_view.add($.__views.method_container);
    $.__views.__alloyId93 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "14dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "24dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Method",
            left: "12dp",
            id: "__alloyId93"
        });
        return o;
    }());
    $.__views.method_container.add($.__views.__alloyId93);
    $.__views.method = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "11dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "15dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "20dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Method info",
            id: "method"
        });
        return o;
    }());
    $.__views.method_container.add($.__views.method);
    $.__views.garnish_container = Ti.UI.createView({
        id: "garnish_container",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.how_to_view.add($.__views.garnish_container);
    $.__views.__alloyId94 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "14dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "24dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Garnish",
            left: "12dp",
            id: "__alloyId94"
        });
        return o;
    }());
    $.__views.garnish_container.add($.__views.__alloyId94);
    $.__views.garnish = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "11dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "15dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "20dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Garnish info",
            id: "garnish"
        });
        return o;
    }());
    $.__views.garnish_container.add($.__views.garnish);
    $.__views.__alloyId95 = Ti.UI.createView({
        height: "10dp",
        width: "140dp",
        id: "__alloyId95"
    });
    $.__views.how_to_make_it.add($.__views.__alloyId95);
    $.__views.video_container = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            left: "5dp",
            right: "5dp",
            height: Ti.UI.SIZE,
            backgroundColor: "#fff",
            borderRadius: 0,
            borderColor: "#d1d1d1",
            borderWidth: 1,
            layout: "vertical",
            top: "10dp",
            width: Ti.UI.FILL
        });
        Alloy.isTablet && _.extend(o, {
            left: "10dp",
            right: "10dp",
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            backgroundColor: "#fff",
            borderRadius: 0,
            borderColor: "#d1d1d1",
            borderWidth: 1,
            layout: "vertical",
            top: "10dp"
        });
        _.extend(o, {
            id: "video_container",
            layout: "composite"
        });
        return o;
    }());
    $.__views.cocktail_scroll.add($.__views.video_container);
    $.__views.recipe_container_bottom = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            left: "5dp",
            right: "5dp",
            height: Ti.UI.SIZE,
            backgroundColor: "#fff",
            borderRadius: 0,
            borderColor: "#d1d1d1",
            borderWidth: 1,
            layout: "vertical",
            top: "10dp",
            width: Ti.UI.FILL
        });
        Alloy.isTablet && _.extend(o, {
            left: "10dp",
            right: "10dp",
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            backgroundColor: "#fff",
            borderRadius: 0,
            borderColor: "#d1d1d1",
            borderWidth: 1,
            layout: "vertical",
            top: "10dp"
        });
        _.extend(o, {
            id: "recipe_container_bottom"
        });
        return o;
    }());
    $.__views.cocktail_scroll.add($.__views.recipe_container_bottom);
    $.__views.__alloyId96 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "14dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "24dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Rating",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            id: "__alloyId96"
        });
        return o;
    }());
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
    $.__views.rating_cta = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "11dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "15dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "20dp"
            },
            top: "2dp",
            left: "12dp",
            right: "5dp",
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Rate this recipe",
            id: "rating_cta",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            top: "5dp"
        });
        return o;
    }());
    $.__views.__alloyId98.add($.__views.rating_cta);
    $.__views.__alloyId99 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "14dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "24dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Comments",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            id: "__alloyId99"
        });
        return o;
    }());
    $.__views.recipe_container_bottom.add($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createView({
        height: "1",
        width: "140dp",
        backgroundColor: "#d1d1d1",
        id: "__alloyId100"
    });
    $.__views.recipe_container_bottom.add($.__views.__alloyId100);
    $.__views.__alloyId101 = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            top: "10dp",
            color: "#fff",
            backgroundColor: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "16dp"
            },
            width: "200dp",
            height: "34dp",
            borderRadius: 8
        });
        Alloy.isTablet && _.extend(o, {
            top: "10dp",
            color: "#fff",
            backgroundColor: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            width: "240dp",
            height: "50dp",
            borderRadius: 8
        });
        _.extend(o, {
            title: "Add Comments / Review",
            id: "__alloyId101"
        });
        return o;
    }());
    $.__views.recipe_container_bottom.add($.__views.__alloyId101);
    submitCommentBtnHandler ? $.__views.__alloyId101.addEventListener("click", submitCommentBtnHandler) : __defers["$.__views.__alloyId101!click!submitCommentBtnHandler"] = true;
    $.__views.recipe_social_container = Ti.UI.createView({
        id: "recipe_social_container",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    $.__views.recipe_container_bottom.add($.__views.recipe_social_container);
    $.__views.__alloyId102 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "14dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        Alloy.isHandheld && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "24dp"
            },
            top: "10dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.LEFT,
            touchEnabled: false
        });
        _.extend(o, {
            text: "Social",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            id: "__alloyId102"
        });
        return o;
    }());
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
    $.__views.twitterBtn_recipe = Ti.UI.createButton(function() {
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
            width: "140dp",
            height: "50dp",
            backgroundColor: "#d1d1d1",
            borderRadius: 8,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            color: "#fff",
            tintColor: "#fff"
        });
        _.extend(o, {
            id: "twitterBtn_recipe",
            image: "/images/icons/twitterbird.png",
            title: "Twitter"
        });
        return o;
    }());
    $.__views.twitterParent_recipe.add($.__views.twitterBtn_recipe);
    $.__views.facebookParent_recipe = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "facebookParent_recipe"
    });
    $.__views.social_hor_view_recipe.add($.__views.facebookParent_recipe);
    $.__views.facebookBtn_recipe = Ti.UI.createButton(function() {
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
            width: "140dp",
            height: "50dp",
            backgroundColor: "#d1d1d1",
            borderRadius: 8,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            color: "#fff",
            tintColor: "#fff"
        });
        _.extend(o, {
            id: "facebookBtn_recipe",
            image: "/images/icons/facebookIcon.png",
            title: "Facebook"
        });
        return o;
    }());
    $.__views.facebookParent_recipe.add($.__views.facebookBtn_recipe);
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
    $.__views.rating_picker = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            height: "240dp",
            bottom: "-240dp",
            width: Ti.UI.FILL,
            backgroundColor: "#fff"
        });
        Alloy.isTablet && _.extend(o, {
            height: "260dp",
            bottom: "-260dp",
            width: Ti.UI.FILL,
            backgroundColor: "#fff"
        });
        _.extend(o, {
            id: "rating_picker"
        });
        return o;
    }());
    $.__views.cocktail_detailed.add($.__views.rating_picker);
    $.__views.__alloyId106 = Ti.UI.createView({
        layout: "vertical",
        top: "0dp",
        height: Ti.UI.SIZE,
        id: "__alloyId106"
    });
    $.__views.rating_picker.add($.__views.__alloyId106);
    $.__views.__alloyId107 = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
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
            }
        });
        Alloy.isTablet && _.extend(o, {
            height: "60dp",
            backgroundColor: "#eee",
            borderRadius: 0,
            borderColor: "#898989",
            borderWidth: 1,
            width: Ti.UI.FILL,
            color: Alloy.Globals.PrimaryColor,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontSize: "24dp",
                fontFamily: Alloy.Globals.BoldFont
            }
        });
        _.extend(o, {
            title: "TAP TO CLOSE",
            id: "__alloyId107"
        });
        return o;
    }());
    $.__views.__alloyId106.add($.__views.__alloyId107);
    closeRatingHandler ? $.__views.__alloyId107.addEventListener("click", closeRatingHandler) : __defers["$.__views.__alloyId107!click!closeRatingHandler"] = true;
    $.__views.rating_title = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "10dp",
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "16dp"
            }
        });
        Alloy.isTablet && _.extend(o, {
            top: "10dp",
            color: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.MainFont,
                fontSize: "20dp"
            }
        });
        _.extend(o, {
            text: "Tap a star to rate",
            id: "rating_title",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            top: "30dp"
        });
        return o;
    }());
    $.__views.__alloyId106.add($.__views.rating_title);
    $.__views.__alloyId108 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: "20dp",
        bottom: "20dp",
        id: "__alloyId108"
    });
    $.__views.__alloyId106.add($.__views.__alloyId108);
    $.__views.star_1 = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            left: "4dp",
            right: "4dp",
            width: "25dp"
        });
        Alloy.isTablet && _.extend(o, {
            left: "4dp",
            right: "4dp",
            width: "25dp",
            height: "25dp"
        });
        _.extend(o, {
            id: "star_1",
            image: "/images/common/empty_star.png",
            star_id: "1"
        });
        return o;
    }());
    $.__views.__alloyId108.add($.__views.star_1);
    star_clicked ? $.__views.star_1.addEventListener("click", star_clicked) : __defers["$.__views.star_1!click!star_clicked"] = true;
    $.__views.star_2 = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            left: "4dp",
            right: "4dp",
            width: "25dp"
        });
        Alloy.isTablet && _.extend(o, {
            left: "4dp",
            right: "4dp",
            width: "25dp",
            height: "25dp"
        });
        _.extend(o, {
            id: "star_2",
            image: "/images/common/empty_star.png",
            star_id: "2"
        });
        return o;
    }());
    $.__views.__alloyId108.add($.__views.star_2);
    star_clicked ? $.__views.star_2.addEventListener("click", star_clicked) : __defers["$.__views.star_2!click!star_clicked"] = true;
    $.__views.star_3 = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            left: "4dp",
            right: "4dp",
            width: "25dp"
        });
        Alloy.isTablet && _.extend(o, {
            left: "4dp",
            right: "4dp",
            width: "25dp",
            height: "25dp"
        });
        _.extend(o, {
            id: "star_3",
            image: "/images/common/empty_star.png",
            star_id: "3"
        });
        return o;
    }());
    $.__views.__alloyId108.add($.__views.star_3);
    star_clicked ? $.__views.star_3.addEventListener("click", star_clicked) : __defers["$.__views.star_3!click!star_clicked"] = true;
    $.__views.star_4 = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            left: "4dp",
            right: "4dp",
            width: "25dp"
        });
        Alloy.isTablet && _.extend(o, {
            left: "4dp",
            right: "4dp",
            width: "25dp",
            height: "25dp"
        });
        _.extend(o, {
            id: "star_4",
            image: "/images/common/empty_star.png",
            star_id: "4"
        });
        return o;
    }());
    $.__views.__alloyId108.add($.__views.star_4);
    star_clicked ? $.__views.star_4.addEventListener("click", star_clicked) : __defers["$.__views.star_4!click!star_clicked"] = true;
    $.__views.star_5 = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            left: "4dp",
            right: "4dp",
            width: "25dp"
        });
        Alloy.isTablet && _.extend(o, {
            left: "4dp",
            right: "4dp",
            width: "25dp",
            height: "25dp"
        });
        _.extend(o, {
            id: "star_5",
            image: "/images/common/empty_star.png",
            star_id: "5"
        });
        return o;
    }());
    $.__views.__alloyId108.add($.__views.star_5);
    star_clicked ? $.__views.star_5.addEventListener("click", star_clicked) : __defers["$.__views.star_5!click!star_clicked"] = true;
    $.__views.__alloyId111 = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            top: "10dp",
            color: "#fff",
            backgroundColor: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "16dp"
            },
            width: "200dp",
            height: "34dp",
            borderRadius: 8
        });
        Alloy.isTablet && _.extend(o, {
            top: "10dp",
            color: "#fff",
            backgroundColor: Alloy.Globals.PrimaryColor,
            font: {
                fontFamily: Alloy.Globals.BoldFont,
                fontSize: "20dp"
            },
            width: "240dp",
            height: "50dp",
            borderRadius: 8
        });
        _.extend(o, {
            title: "Submit Rating",
            id: "__alloyId111"
        });
        return o;
    }());
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
        var new_height = "194dp";
        new_height = PixelsToDPUnits(194 * (Ti.Platform.displayCaps.platformWidth / 320));
        var video_thumbnail_image = Alloy.Globals.Utils.RemoteImage({
            image: "http://img.youtube.com/vi/" + cocktail.video + "/hqdefault.jpg",
            defaultImage: "images/cocktails/glass.png",
            checkRetina: false,
            height: new_height,
            width: Ti.UI.FILL
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
        video_play.image = "/images/common/play_btn.png";
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
        $.facebookParent_recipe.addEventListener("click", function() {
            var canOpen = Ti.Platform.openURL("fb://profile/" + cocktail.facebook);
            false == canOpen && Ti.UI.createAlertDialog({
                message: "Sorry, you must first have the facebook app installed on this device to click this button.",
                ok: "Ok, thanks!",
                title: "Facebook Error"
            }).show();
        });
    }
    if (null == cocktail.twitter || "" == cocktail.twitter) $.social_hor_view_recipe.remove($.twitterParent_recipe); else {
        showSocialSection = true;
        $.twitterParent_recipe.addEventListener("click", function() {
            var canOpen = Ti.Platform.openURL("twitter://user?user_id=" + cocktail.twitter);
            false == canOpen && Ti.UI.createAlertDialog({
                message: "Sorry, you must first have the twitter app installed on this device to click this button.",
                ok: "Ok, thanks!",
                title: "Twitter Error"
            }).show();
        });
    }
    showSocialSection || $.recipe_container_bottom.remove($.recipe_social_container);
    var ratings_star_style = $.createStyle({
        classes: [ "star_icon" ]
    });
    var cocktail_rating_stars = new Array();
    for (var i = 0; 5 > i; i++) {
        cocktail_rating_stars[i] = Ti.UI.createImageView();
        cocktail_rating_stars[i].image = "/images/common/empty_star.png";
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