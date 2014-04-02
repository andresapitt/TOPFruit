function Controller() {
    function DisplayBrands(newJSON) {
        function openBrand(e) {
            var brand_desc_Win;
            var brand_desc_Win;
            var brand_desc_Win = Alloy.createController("brand_desc", e.row.brand_data).getView();
            brand_desc_Win.open({
                activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
                activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
            });
        }
        var brands_json;
        brands_json = null != newJSON ? JSON.parse(newJSON) : JSON.parse(brands_json_text);
        for (var i = 0; brands_json.length > i; i++) Ti.API.info("Brand " + i + " Title: " + brands_json[i].Brand.title);
        brands_json.sort(function(a, b) {
            var textA = a.Brand.title.toUpperCase();
            var textB = b.Brand.title.toUpperCase();
            return textB > textA ? -1 : textA > textB ? 1 : 0;
        });
        Ti.API.info("AFTER SORT ");
        for (var i = 0; brands_json.length > i; i++) Ti.API.info("Brand " + i + " Title: " + brands_json[i].Brand.title);
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = 0; str.length > i; i++) {
            var is_letter_active = false;
            var nextChar = str.charAt(i);
            for (var y = 0; brands_json.length > y; y++) {
                var first_char_brand = brands_json[y].Brand.title.charAt(0);
                if (nextChar == first_char_brand) {
                    is_letter_active = true;
                    Ti.API.info("Char active: " + nextChar);
                }
            }
            if (is_letter_active) {
                Ti.API.info("Adding table view: " + nextChar);
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
                for (var y = 0; brands_json.length > y; y++) {
                    var first_char_brand = brands_json[y].Brand.title.charAt(0);
                    if (nextChar == first_char_brand) {
                        var brand_row = Ti.UI.createTableViewRow({
                            brand_name: brands_json[y].Brand.title
                        });
                        brand_row.brand_data = brands_json[y].Brand;
                        var brand_row_view = Ti.UI.createView();
                        var brand_row_label = Ti.UI.createLabel({
                            text: brands_json[y].Brand.title.toUpperCase()
                        });
                        brand_row_label.applyProperties(row_label_style);
                        brand_row_view.add(brand_row_label);
                        var brand_image = Alloy.Globals.Utils.RemoteImage({
                            image: brands_json[y].Brand.thumb_image_url,
                            defaultImage: "images/cocktails/glass.png"
                        });
                        brand_image.applyProperties(row_image_style);
                        brand_row_view.add(brand_image);
                        brand_row_view.applyProperties(row_view_style);
                        brand_row.add(brand_row_view);
                        brand_row.brand_name = brands_json[y].Brand.title;
                        table_view_section.add(brand_row);
                    }
                }
                $.brand_table.appendSection(table_view_section);
            }
        }
        $.brand_table.addEventListener("click", openBrand);
    }
    function closeWindow() {
        var a = Alloy.Globals.windowStack.indexOf($.brands);
        Alloy.Globals.windowStack.splice(a, 1);
        $.brands.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
    }
    function goToHome(e) {
        Alloy.Globals.goToHome(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "brands";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.brands = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        height: "100%",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        modal: false,
        title: "OUR BRANDS",
        id: "brands"
    });
    $.__views.brands && $.addTopLevelView($.__views.brands);
    $.__views.__alloyId54 = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        top: "0dp",
        id: "__alloyId54"
    });
    $.__views.brands.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        opacity: "1",
        id: "__alloyId55"
    });
    $.__views.__alloyId54.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId56"
    });
    $.__views.__alloyId54.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createView({
        backgroundImage: "/images/icons/back.png",
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId57"
    });
    $.__views.__alloyId56.add($.__views.__alloyId57);
    closeWindow ? $.__views.__alloyId57.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId57!click!closeWindow"] = true;
    $.__views.__alloyId58 = Ti.UI.createLabel(function() {
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
            text: "OUR BRANDS",
            color: "#313646",
            id: "__alloyId58"
        });
        return o;
    }());
    $.__views.__alloyId56.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createView({
        backgroundImage: "/images/icons/home.png",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "30dp",
        width: "30dp",
        id: "__alloyId59"
    });
    $.__views.__alloyId56.add($.__views.__alloyId59);
    goToHome ? $.__views.__alloyId59.addEventListener("click", goToHome) : __defers["$.__views.__alloyId59!click!goToHome"] = true;
    $.__views.__alloyId66 = Ti.UI.createView({
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundImage: "/images/common/color_sep.png",
        top: "0dp",
        id: "__alloyId66"
    });
    $.__views.brands.add($.__views.__alloyId66);
    $.__views.searchbar = Ti.UI.createSearchBar({
        backgroundColor: "#efefef",
        barColor: "#cbcbcb",
        id: "searchbar",
        height: "44dp",
        top: "0dp"
    });
    $.__views.brand_table = Ti.UI.createTableView({
        hideSearchOnSelection: false,
        filterAttribute: "brand_name",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        searchHidden: false,
        separatorInsets: {
            left: 0,
            right: 0
        },
        search: $.__views.searchbar,
        id: "brand_table",
        top: "1dp"
    });
    $.__views.brands.add($.__views.brand_table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/brands/brands/viewjson", "data/Brands.txt", DisplayBrands);
    var brands_json_text = "";
    $.brands.addEventListener("close", function() {
        Ti.API.info("brands closed");
    });
    $.brands.addEventListener("open", function() {
        Ti.API.info("brands opened");
        $.searchbar.blur();
        Alloy.Globals.windowStack.push($.brands);
    });
    $.brands.addEventListener("androidback", function() {
        $.brands.close({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
        var a = Alloy.Globals.windowStack.indexOf($.brands);
        Alloy.Globals.windowStack.splice(a, 1);
    });
    __defers["$.__views.__alloyId57!click!closeWindow"] && $.__views.__alloyId57.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId59!click!goToHome"] && $.__views.__alloyId59.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId63!click!closeWindow"] && $.__views.__alloyId63.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId65!click!goToHome"] && $.__views.__alloyId65.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId68!click!goToHome"] && $.__views.__alloyId68.addEventListener("click", goToHome);
    __defers["$.__views.__alloyId70!click!closeWindow"] && $.__views.__alloyId70.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;