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
            Alloy.Globals.parent.open();
            $.age_gate.close();
        } else alert("Under 18");
    }
    function TandCBtnHandler() {
        var terms_and_conditions = Alloy.createController("terms_and_conditions").getView();
        terms_and_conditions.open({
            modal: true
        });
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
        var animation = Titanium.UI.createAnimation();
        animation.top = "-78dp";
        animation.duration = 400;
        $.age_gate_view.animate(animation);
        $.picker_view.height = Ti.UI.FILL;
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
        id: "age_gate"
    });
    $.__views.age_gate && $.addTopLevelView($.__views.age_gate);
    $.__views.__alloyId0 = Ti.UI.createScrollView({
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
        id: "__alloyId0"
    });
    $.__views.age_gate.add($.__views.__alloyId0);
    $.__views.age_gate_view = Ti.UI.createView({
        layout: "vertical",
        top: "0dp",
        height: Ti.UI.SIZE,
        id: "age_gate_view"
    });
    $.__views.__alloyId0.add($.__views.age_gate_view);
    $.__views.banner_img = Ti.UI.createImageView({
        top: "20dp",
        height: "180dp",
        width: Ti.UI.FILL,
        id: "banner_img",
        image: "./images/age_gate/age_gate_banner.png"
    });
    $.__views.age_gate_view.add($.__views.banner_img);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: Alloy.Globals.PrimaryColor,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "16dp",
            fontFamily: Alloy.Globals.BoldFont
        },
        text: "TO DISCOVER THE PERFECT MIX \nWE FIRST NEED TO CHECK YOUR AGE",
        id: "__alloyId1"
    });
    $.__views.age_gate_view.add($.__views.__alloyId1);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: Alloy.Globals.PrimaryColor,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "16dp",
            fontFamily: Alloy.Globals.BoldFont
        },
        top: "10dp",
        text: "ENTER YOUR DOB",
        id: "__alloyId4"
    });
    $.__views.age_gate_view.add($.__views.__alloyId4);
    $.__views.dob_picker = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        top: "10dp",
        width: Ti.UI.SIZE,
        id: "dob_picker"
    });
    $.__views.age_gate_view.add($.__views.dob_picker);
    $.__views.day_picker = Ti.UI.createPicker({
        backgroundColor: "#898989",
        left: "8dp",
        right: "8dp",
        height: "120dp",
        borderRadius: 8,
        bottom: "10dp",
        top: "0dp",
        width: "85dp",
        id: "day_picker",
        type: Ti.UI.PICKER_TYPE_PLAIN
    });
    $.__views.dob_picker.add($.__views.day_picker);
    $.__views.month_picker = Ti.UI.createPicker({
        backgroundColor: "#898989",
        left: "8dp",
        right: "8dp",
        height: "120dp",
        borderRadius: 8,
        bottom: "10dp",
        top: "0dp",
        width: "85dp",
        id: "month_picker",
        type: Ti.UI.PICKER_TYPE_PLAIN
    });
    $.__views.dob_picker.add($.__views.month_picker);
    $.__views.year_picker = Ti.UI.createPicker({
        backgroundColor: "#898989",
        left: "8dp",
        right: "8dp",
        height: "120dp",
        borderRadius: 8,
        bottom: "10dp",
        top: "0dp",
        width: "85dp",
        id: "year_picker",
        type: Ti.UI.PICKER_TYPE_PLAIN
    });
    $.__views.dob_picker.add($.__views.year_picker);
    $.__views.submitBtn = Ti.UI.createButton({
        width: "160dp",
        height: "32dp",
        top: "8dp",
        color: "#fff",
        backgroundColor: Alloy.Globals.PrimaryColor,
        borderRadius: 4,
        font: {
            fontSize: "18dp",
            fontFamily: Alloy.Globals.MainFont
        },
        id: "submitBtn",
        title: "Submit"
    });
    $.__views.age_gate_view.add($.__views.submitBtn);
    submitBtnHandler ? $.__views.submitBtn.addEventListener("click", submitBtnHandler) : __defers["$.__views.submitBtn!click!submitBtnHandler"] = true;
    $.__views.TandC_View = Ti.UI.createView({
        top: "10dp",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        layout: "vertical",
        id: "TandC_View"
    });
    $.__views.age_gate_view.add($.__views.TandC_View);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#898989",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "13dp",
            fontFamily: Alloy.Globals.MainFont
        },
        text: "By entering the app you agree to our",
        id: "__alloyId8"
    });
    $.__views.TandC_View.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createView({
        width: "110dp",
        height: Ti.UI.SIZE,
        id: "__alloyId9"
    });
    $.__views.TandC_View.add($.__views.__alloyId9);
    TandCBtnHandler ? $.__views.__alloyId9.addEventListener("click", TandCBtnHandler) : __defers["$.__views.__alloyId9!click!TandCBtnHandler"] = true;
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#898989",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "13dp",
            fontFamily: Alloy.Globals.MainFont
        },
        text: "terms & conditions",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createView({
        height: "1dp",
        backgroundColor: "#898989",
        bottom: "1",
        id: "__alloyId11"
    });
    $.__views.__alloyId9.add($.__views.__alloyId11);
    $.__views.drinkaware_img = Ti.UI.createImageView({
        height: "55dp",
        width: Ti.UI.SIZE,
        id: "drinkaware_img",
        image: "./images/age_gate/drinkaware.png",
        top: "5dp"
    });
    $.__views.__alloyId0.add($.__views.drinkaware_img);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var date_data;
    var i;
    var month_data;
    var months;
    var i;
    var year_data;
    var i;
    var picker;
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
    $.year_picker.setSelectedRow(0, $.year_picker.getColumns()[0].rowCount - 1, false);
    $.age_gate.addEventListener("close", function() {
        Ti.API.info("age gate window closed");
    });
    $.age_gate.addEventListener("open", function() {
        Ti.API.info("age gate window opened");
    });
    var month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
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