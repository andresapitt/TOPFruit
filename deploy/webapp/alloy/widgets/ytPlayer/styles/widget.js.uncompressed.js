function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ytPlayer/" + s : s.substring(0, index) + "/ytPlayer/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0007,
    key: "scrollView",
    style: {
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
        backgroundColor: "#efefef"
    }
}, {
    isClass: true,
    priority: 10000.0011,
    key: "desc_text",
    style: {
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "16dp"
        },
        top: "2dp",
        bottom: "10dp",
        height: Ti.UI.SIZE,
        left: "15dp",
        right: "15dp",
        textAlign: Ti.UI.LEFT
    }
}, {
    isClass: true,
    priority: 10000.0012,
    key: "desc_block",
    style: {
        backgroundColor: "#fff",
        height: Ti.UI.SIZE,
        borderRadius: "4dp",
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        layout: "vertical",
        bottom: "10dp"
    }
}, {
    isClass: true,
    priority: 10101.0003,
    key: "container",
    style: {
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
        navTintColor: Alloy.Globals.PrimaryColor
    }
}, {
    isClass: true,
    priority: 10101.0006,
    key: "page_title",
    style: {
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "20dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp"
    }
}, {
    isClass: true,
    priority: 10101.0008,
    key: "small_text",
    style: {
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "14dp"
        },
        top: "10dp",
        height: Ti.UI.SIZE,
        left: "10dp",
        right: "10dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
    }
}, {
    isClass: true,
    priority: 10101.0009,
    key: "commentBtn",
    style: {
        color: "#ffffff",
        font: {
            fontFamily: Alloy.Globals.BoldFont,
            fontSize: "14dp"
        },
        backgroundColor: Alloy.Globals.PrimaryColor,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "220dp",
        height: "35dp",
        borderRadius: 4,
        top: "10dp"
    }
}, {
    isClass: true,
    priority: 10101.001,
    key: "search_button",
    style: {
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
        bottom: "10dp"
    }
}, {
    isClass: true,
    priority: 10102.0013,
    key: "desc_block",
    style: {
        backgroundColor: "#fff",
        height: Ti.UI.SIZE,
        borderRadius: 4,
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "5dp",
        right: "5dp",
        layout: "vertical",
        bottom: "10dp"
    }
}, {
    isId: true,
    priority: 100000.0002,
    key: "videoPlayer",
    style: {
        backgroundColor: "#000",
        fullscreen: true,
        autoplay: true,
        scalingMode: Ti.Media.VIDEO_SCALING_ASPECT_FIT,
        mediaControlMode: Ti.Media.VIDEO_CONTROL_DEFAULT
    }
} ];