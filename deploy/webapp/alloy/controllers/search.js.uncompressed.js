function Controller() {
    function displayCocktails(newJSON) {
        var drinks_json;
        drinks_json = null != newJSON ? JSON.parse(newJSON) : JSON.parse(drinks_json_text);
        drinks_json.sort(function(a, b) {
            var textA = a.Cocktail.title.toUpperCase();
            var textB = b.Cocktail.title.toUpperCase();
            return textB > textA ? -1 : textA > textB ? 1 : 0;
        });
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = 0; str.length > i; i++) {
            var is_letter_active = false;
            var nextChar = str.charAt(i);
            for (var y = 0; drinks_json.length > y; y++) {
                var first_char_brand = drinks_json[y].Cocktail.title.charAt(0);
                nextChar == first_char_brand && (is_letter_active = true);
            }
            if (is_letter_active) {
                var hasFirstBeenAdded = false;
                var headerView = Ti.UI.createView();
                var style = $.createStyle({
                    classes: [ "table_header" ]
                });
                headerView.applyProperties(style);
                var topSeparator = Ti.UI.createView();
                var separator_style_top = $.createStyle({
                    classes: [ "table_separator", "top" ]
                });
                topSeparator.applyProperties(separator_style_top);
                headerView.add(topSeparator);
                var header_label = Ti.UI.createLabel({
                    text: nextChar
                });
                var header_label_style = $.createStyle({
                    classes: [ "table_header_label" ]
                });
                header_label.applyProperties(header_label_style);
                headerView.add(header_label);
                var bottomSeparator = Ti.UI.createView();
                var separator_style_bottom = $.createStyle({
                    classes: [ "table_separator", "bottom" ]
                });
                bottomSeparator.applyProperties(separator_style_bottom);
                headerView.add(bottomSeparator);
                var table_view_section = Ti.UI.createTableViewSection({
                    headerView: headerView
                });
                var row_label_style = $.createStyle({
                    classes: [ "row_label" ]
                });
                var row_view_style = $.createStyle({
                    classes: [ "row_view" ]
                });
                var row_image_style = $.createStyle({
                    classes: [ "row_brand_image" ]
                });
                for (var y = 0; drinks_json.length > y; y++) {
                    var first_char_brand = drinks_json[y].Cocktail.title.charAt(0);
                    if (nextChar == first_char_brand) {
                        var brand_row = Ti.UI.createTableViewRow({
                            cocktail_name: drinks_json[y].Cocktail.title
                        });
                        var brand_row_view = Ti.UI.createView();
                        var brand_row_label = Ti.UI.createLabel({
                            text: drinks_json[y].Cocktail.title.toUpperCase()
                        });
                        brand_row_label.applyProperties(row_label_style);
                        brand_row_view.add(brand_row_label);
                        var brand_image = Alloy.Globals.Utils.RemoteImage({
                            image: drinks_json[y].Cocktail.search_thumb_url,
                            defaultImage: "images/cocktails/glass.png"
                        });
                        brand_image.applyProperties(row_image_style);
                        brand_row_view.add(brand_image);
                        brand_row_view.applyProperties(row_view_style);
                        brand_row.add(brand_row_view);
                        brand_row.cocktailData = drinks_json[y].Cocktail;
                        brand_row_view.cocktailData = drinks_json[y].Cocktail;
                        brand_row.addEventListener("click", openRecipe);
                        var bottomSeparator;
                        var separator_style_bottom;
                        table_view_section.add(brand_row);
                        hasFirstBeenAdded = true;
                    }
                }
                $.search_table.appendSection(table_view_section);
            }
        }
    }
    function openRecipe(e) {
        var recipeWin;
        var recipeWin;
        var recipeWin = Alloy.createController("cocktail_detailed", e.source.cocktailData).getView();
        recipeWin.open();
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.search);
        Alloy.Globals.windowStack.splice(a, 1);
        $.search.close();
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "search";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.search = Ti.UI.createWindow({
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
        title: "COCKTAIL SEARCH",
        id: "search"
    });
    $.__views.search && $.addTopLevelView($.__views.search);
    $.__views.__alloyId375 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        id: "__alloyId375"
    });
    $.__views.search.add($.__views.__alloyId375);
    $.__views.__alloyId376 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId376"
    });
    $.__views.__alloyId375.add($.__views.__alloyId376);
    $.__views.__alloyId377 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId377"
    });
    $.__views.__alloyId375.add($.__views.__alloyId377);
    $.__views.__alloyId378 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId378"
    });
    $.__views.__alloyId377.add($.__views.__alloyId378);
    closeWindow ? $.__views.__alloyId378.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId378!click!closeWindow"] = true;
    $.__views.__alloyId379 = Ti.UI.createLabel({
        color: "#313646",
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp",
        text: "COCKTAIL SEARCH",
        id: "__alloyId379"
    });
    $.__views.__alloyId377.add($.__views.__alloyId379);
    $.__views.__alloyId380 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId380"
    });
    $.__views.__alloyId377.add($.__views.__alloyId380);
    goToHome ? $.__views.__alloyId380.addEventListener("click", goToHome) : __defers["$.__views.__alloyId380!click!goToHome"] = true;
    $.__views.__alloyId381 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        id: "__alloyId381"
    });
    $.__views.search.add($.__views.__alloyId381);
    $.__views.search_table = Ti.UI.createTableView({
        hideSearchOnSelection: false,
        filterAttribute: "cocktail_name",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        searchHidden: false,
        separatorInsets: {
            left: 0,
            right: 0
        },
        id: "search_table"
    });
    $.__views.search.add($.__views.search_table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.Utils.GetAppData("/client/idl/perfect-mix/cocktails/cocktails/viewjson", "data/Cocktails.txt", displayCocktails);
    var drinks_json_text = "";
    $.search.addEventListener("close", function() {});
    $.search.addEventListener("open", function() {
        Alloy.Globals.windowStack.push($.search);
    });
    $.search.addEventListener("androidback", function() {
        $.search.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.search);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId372!click!closeWindow"] && $.__views.__alloyId372.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId374!click!goToHome"] && $.__views.__alloyId374.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId378!click!closeWindow"] && $.__views.__alloyId378.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId380!click!goToHome"] && $.__views.__alloyId380.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId383!click!goToHome"] && $.__views.__alloyId383.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId385!click!closeWindow"] && $.__views.__alloyId385.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;