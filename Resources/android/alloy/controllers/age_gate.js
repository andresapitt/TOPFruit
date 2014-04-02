function Controller() {
    function submitBtnHandler() {
        var over18 = false;
        var currentDate = new Date();
        var birthdate = new Date();
        birthdate = new Date($.year_picker.getSelectedRow(0).title, $.month_picker.getSelectedRow(0).value, $.day_picker.getSelectedRow(0).title, 0, 0, 0, 0);
        Ti.API.info("birth date: " + birthdate.toString());
        if (currentDate.getFullYear() - birthdate.getFullYear() > 18) over18 = true; else if (18 == currentDate.getFullYear() - birthdate.getFullYear()) {
            var currentMonth = currentDate.getMonth();
            var birthMonth = birthdate.getMonth();
            if (currentMonth > birthMonth) over18 = true; else if (currentMonth == birthMonth) {
                var currentDate = currentDate.getDate();
                var birthdate = birthdate.getDate();
                currentDate >= birthdate && (over18 = true);
            }
        }
        if (over18) {
            Ti.App.Properties.setBool("over18", true);
            var indexWin = Alloy.createController("index").getView();
            indexWin.open({
                activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
                activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
            });
            $.age_gate.close({
                activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right,
                activityExitAnimation: Ti.App.Android.R.anim.slide_out_left
            });
        } else Ti.UI.createAlertDialog({
            message: "You must be at least 18 years old to use The Perfect Mix app!",
            ok: "OK",
            title: "Error"
        }).show();
    }
    function TandCBtnHandler() {
        var terms_and_conditions = Alloy.createController("terms_and_conditions").getView();
        terms_and_conditions.open({
            activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.App.Android.R.anim.slide_out_right
        });
    }
    function facebookLoginHandler(e) {
        if (e.success) {
            Ti.API.info("FACEBOOK login success: " + e.toString());
            Ti.App.Properties.setBool("over18", true);
            Alloy.Globals.parent.open();
            $.age_gate.close();
            Alloy.Globals.fb.removeEventListener("login", facebookLoginHandler);
        } else if (e.error) {
            Ti.API.info("FACEBOOK login error: " + e.toString());
            Ti.UI.createAlertDialog({
                message: "ERROR: " + e.error,
                ok: "Ok",
                title: "Facebook"
            }).show();
        } else e.cancelled ? Ti.API.info("FACEBOOK login cancel: " + e.toString()) : Ti.API.info("FACEBOOK return: " + e.toString());
    }
    function facebookBtnHandler() {
        Ti.API.info("FACEBOOK authorise, is it logged in: " + Alloy.Globals.fb.getLoggedIn());
        Alloy.Globals.fb.authorize();
    }
    function closeDateHandler() {
        $.picker_view.height = "0dp";
        birthdate = picker.getValue();
        var monthofbirth = birthdate.getMonth();
        var dateofbirth = birthdate.getDate();
        var yearofbirth = birthdate.getFullYear();
        Ti.API.info("Month of birth value: " + monthofbirth);
        $.month_birth.text = month[monthofbirth];
        $.date_birth.text = dateofbirth;
        $.year_birth.text = yearofbirth;
        var animation = Titanium.UI.createAnimation();
        animation.top = "0dp";
        animation.duration = 400;
        $.age_gate_view.animate(animation);
    }
    function dateBtnHandler(e) {
        Ti.API.info("android dd pressed: " + e.source.id);
        var picker = Ti.UI.createPicker({
            top: 0,
            color: "black"
        });
        var data = [];
        switch (e.source.id) {
          case "birth_date_dd":
            for (var i = 0; 32 > i; i++) data.push(Ti.UI.createPickerRow({
                title: i
            }));
            picker.add(data);
            break;

          case "birth_month_dd":
            var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            for (var i = 0; 12 > i; i++) data.push(Ti.UI.createPickerRow({
                title: months[i]
            }));
            picker.add(data);
            break;

          case "birth_year_dd":        }
        picker.selectionIndicator = true;
        e.source.add(picker);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "age_gate";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.age_gate = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        height: "100%",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        modal: false,
        id: "age_gate"
    });
    $.__views.age_gate && $.addTopLevelView($.__views.age_gate);
    $.__views.age_gate_view = Ti.UI.createScrollView({
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
        id: "age_gate_view"
    });
    $.__views.age_gate.add($.__views.age_gate_view);
    $.__views.__alloyId0 = Ti.UI.createView({
        layout: "vertical",
        top: "0dp",
        height: Ti.UI.SIZE,
        id: "__alloyId0"
    });
    $.__views.age_gate_view.add($.__views.__alloyId0);
    $.__views.banner_img = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            top: "60dp",
            height: "102dp",
            width: "320dp",
            bottom: "40dp"
        });
        Alloy.isTablet && _.extend(o, {
            top: "60dp",
            height: "204dp",
            width: "640dp",
            bottom: "60dp"
        });
        _.extend(o, {
            id: "banner_img",
            image: "/images/age_gate/age_gate_banner.png"
        });
        return o;
    }());
    $.__views.__alloyId0.add($.__views.banner_img);
    $.__views.__alloyId1 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            color: Alloy.Globals.PrimaryColor,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontSize: "16dp",
                fontFamily: Alloy.Globals.BoldFont
            }
        });
        Alloy.isTablet && _.extend(o, {
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            color: Alloy.Globals.PrimaryColor,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontSize: "22dp",
                fontFamily: Alloy.Globals.BoldFont
            }
        });
        _.extend(o, {
            text: "TO DISCOVER THE PERFECT MIX \nWE FIRST NEED TO CHECK YOUR AGE",
            id: "__alloyId1"
        });
        return o;
    }());
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.facebookBtn = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            width: "240dp",
            height: "40dp",
            color: "#fff",
            top: "8dp",
            backgroundColor: Alloy.Globals.FacebookColor,
            borderRadius: "4dp",
            font: {
                fontSize: "18dp",
                fontFamily: Alloy.Globals.MainFont
            },
            tintColor: "#fff"
        });
        Alloy.isHandheld && _.extend(o, {
            width: "240dp",
            height: "40dp",
            color: "#fff",
            top: "8dp",
            backgroundColor: Alloy.Globals.FacebookColor,
            borderRadius: 6,
            font: {
                fontSize: "18dp",
                fontFamily: Alloy.Globals.MainFont
            },
            tintColor: "#fff"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "300dp",
            height: "50dp",
            color: "#fff",
            top: "8dp",
            backgroundColor: Alloy.Globals.FacebookColor,
            borderRadius: 8,
            font: {
                fontSize: "22dp",
                fontFamily: Alloy.Globals.MainFont
            },
            tintColor: "#fff"
        });
        _.extend(o, {
            id: "facebookBtn",
            image: "/images/age_gate/facebook_Icon.png",
            title: "Login with Facebook"
        });
        return o;
    }());
    $.__views.__alloyId0.add($.__views.facebookBtn);
    facebookBtnHandler ? $.__views.facebookBtn.addEventListener("click", facebookBtnHandler) : __defers["$.__views.facebookBtn!click!facebookBtnHandler"] = true;
    $.__views.__alloyId3 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            color: Alloy.Globals.PrimaryColor,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontSize: "16dp",
                fontFamily: Alloy.Globals.BoldFont
            },
            top: "10dp"
        });
        Alloy.isTablet && _.extend(o, {
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            color: Alloy.Globals.PrimaryColor,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontSize: "22dp",
                fontFamily: Alloy.Globals.BoldFont
            }
        });
        _.extend(o, {
            text: "OR ENTER YOUR DOB",
            id: "__alloyId3"
        });
        return o;
    }());
    $.__views.__alloyId0.add($.__views.__alloyId3);
    $.__views.dob_picker = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        top: "10dp",
        width: Ti.UI.SIZE,
        id: "dob_picker"
    });
    $.__views.__alloyId0.add($.__views.dob_picker);
    $.__views.day_picker = Ti.UI.createPicker(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            backgroundColor: "#898989",
            left: "10dp",
            right: "10dp",
            height: "50dp",
            borderRadius: 8,
            bottom: "10dp"
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            backgroundColor: "#898989",
            left: "10dp",
            right: "10dp",
            height: "40dp",
            borderRadius: 6,
            bottom: "10dp"
        });
        _.extend(o, {
            id: "day_picker",
            selectionIndicator: "true",
            useSpinner: "false"
        });
        return o;
    }());
    $.__views.dob_picker.add($.__views.day_picker);
    $.__views.month_picker = Ti.UI.createPicker(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            backgroundColor: "#898989",
            left: "10dp",
            right: "10dp",
            height: "50dp",
            borderRadius: 8,
            bottom: "10dp"
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            backgroundColor: "#898989",
            left: "10dp",
            right: "10dp",
            height: "40dp",
            borderRadius: 6,
            bottom: "10dp"
        });
        _.extend(o, {
            id: "month_picker",
            selectionIndicator: "true",
            useSpinner: "false"
        });
        return o;
    }());
    $.__views.dob_picker.add($.__views.month_picker);
    $.__views.year_picker = Ti.UI.createPicker(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            backgroundColor: "#898989",
            left: "10dp",
            right: "10dp",
            height: "50dp",
            borderRadius: 8,
            bottom: "10dp"
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            backgroundColor: "#898989",
            left: "10dp",
            right: "10dp",
            height: "40dp",
            borderRadius: 6,
            bottom: "10dp"
        });
        _.extend(o, {
            id: "year_picker",
            selectionIndicator: "true",
            useSpinner: "false"
        });
        return o;
    }());
    $.__views.dob_picker.add($.__views.year_picker);
    $.__views.submitBtn = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            width: "160dp",
            height: "40dp",
            top: "12dp",
            color: "#fff",
            backgroundColor: Alloy.Globals.PrimaryColor,
            borderRadius: 6,
            font: {
                fontSize: "18dp",
                fontFamily: Alloy.Globals.MainFont
            }
        });
        Alloy.isTablet && _.extend(o, {
            width: "180dp",
            height: "50dp",
            top: "12dp",
            color: "#fff",
            backgroundColor: Alloy.Globals.PrimaryColor,
            borderRadius: 8,
            font: {
                fontSize: "22dp",
                fontFamily: Alloy.Globals.MainFont
            }
        });
        _.extend(o, {
            id: "submitBtn",
            title: "Submit"
        });
        return o;
    }());
    $.__views.__alloyId0.add($.__views.submitBtn);
    submitBtnHandler ? $.__views.submitBtn.addEventListener("click", submitBtnHandler) : __defers["$.__views.submitBtn!click!submitBtnHandler"] = true;
    $.__views.TandC_View = Ti.UI.createView({
        top: "10dp",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        layout: "vertical",
        id: "TandC_View"
    });
    $.__views.__alloyId0.add($.__views.TandC_View);
    $.__views.__alloyId8 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            color: "#898989",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontSize: "13dp",
                fontFamily: Alloy.Globals.MainFont
            }
        });
        Alloy.isTablet && _.extend(o, {
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            color: Alloy.Globals.PrimaryColor,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontSize: "22dp",
                fontFamily: Alloy.Globals.BoldFont
            }
        });
        _.extend(o, {
            text: "By entering the app you agree to our",
            id: "__alloyId8"
        });
        return o;
    }());
    $.__views.TandC_View.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: "110dp"
        });
        Alloy.isTablet && _.extend(o, {
            width: "175dp"
        });
        _.extend(o, {
            height: Ti.UI.SIZE,
            id: "__alloyId9"
        });
        return o;
    }());
    $.__views.TandC_View.add($.__views.__alloyId9);
    TandCBtnHandler ? $.__views.__alloyId9.addEventListener("click", TandCBtnHandler) : __defers["$.__views.__alloyId9!click!TandCBtnHandler"] = true;
    $.__views.__alloyId10 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            color: "#898989",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontSize: "13dp",
                fontFamily: Alloy.Globals.MainFont
            }
        });
        Alloy.isTablet && _.extend(o, {
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            color: Alloy.Globals.PrimaryColor,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontSize: "22dp",
                fontFamily: Alloy.Globals.BoldFont
            }
        });
        _.extend(o, {
            text: "terms & conditions",
            width: Ti.UI.SIZE,
            id: "__alloyId10"
        });
        return o;
    }());
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createView({
        height: "1dp",
        backgroundColor: "#898989",
        bottom: "1",
        id: "__alloyId11"
    });
    $.__views.__alloyId9.add($.__views.__alloyId11);
    $.__views.drinkaware_img = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            height: "60dp",
            width: Ti.UI.SIZE
        });
        Alloy.isTablet && _.extend(o, {
            height: "80dp",
            width: Ti.UI.SIZE
        });
        _.extend(o, {
            id: "drinkaware_img",
            image: "/images/age_gate/drinkaware.png",
            top: "5dp"
        });
        return o;
    }());
    $.__views.age_gate_view.add($.__views.drinkaware_img);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var picker;
    var date_data;
    var i;
    var month_data;
    var months;
    var i;
    var year_data;
    var i;
    var date_data = [];
    for (var i = 1; 32 > i; i++) date_data.push(Ti.UI.createPickerRow({
        title: i
    }));
    $.day_picker.add(date_data);
    var month_data = [];
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    for (var i = 0; 12 > i; i++) month_data.push(Ti.UI.createPickerRow({
        title: months[i],
        value: i
    }));
    $.month_picker.add(month_data);
    var year_data = [];
    for (var i = 1900; new Date().getFullYear() >= i; i++) year_data.push(Ti.UI.createPickerRow({
        title: i
    }));
    $.year_picker.add(year_data);
    Ti.API.info("year row count: " + $.year_picker.getColumns()[0].rowCount);
    $.year_picker.setSelectedRow(0, $.year_picker.getColumns()[0].rowCount - 1, false);
    $.age_gate.addEventListener("androidback", function() {
        Ti.API.info("back button pressed on age gate");
        var activity = Titanium.Android.currentActivity;
        activity.finish();
    });
    $.age_gate.addEventListener("close", function() {
        Ti.API.info("age gate window closed");
    });
    $.age_gate.addEventListener("open", function() {
        Ti.API.info("age gate window opened");
    });
    var month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    Alloy.Globals.fb.addEventListener("login", facebookLoginHandler);
    __defers["$.__views.facebookBtn!click!facebookBtnHandler"] && $.__views.facebookBtn.addEventListener("click", facebookBtnHandler);
    __defers["$.__views.facebookBtn!click!facebookBtnHandler"] && $.__views.facebookBtn.addEventListener("click", facebookBtnHandler);
    __defers["$.__views.birth_date_dd!click!dateBtnHandler"] && $.__views.birth_date_dd.addEventListener("click", dateBtnHandler);
    __defers["$.__views.birth_month_dd!click!dateBtnHandler"] && $.__views.birth_month_dd.addEventListener("click", dateBtnHandler);
    __defers["$.__views.birth_year_dd!click!dateBtnHandler"] && $.__views.birth_year_dd.addEventListener("click", dateBtnHandler);
    __defers["$.__views.submitBtn!click!submitBtnHandler"] && $.__views.submitBtn.addEventListener("click", submitBtnHandler);
    __defers["$.__views.__alloyId9!click!TandCBtnHandler"] && $.__views.__alloyId9.addEventListener("click", TandCBtnHandler);
    __defers["$.__views.picker_dob_submit!click!closeDateHandler"] && $.__views.picker_dob_submit.addEventListener("click", closeDateHandler);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;