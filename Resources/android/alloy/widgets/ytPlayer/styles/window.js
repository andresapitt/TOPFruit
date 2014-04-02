function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ytPlayer/" + s : s.substring(0, index) + "/ytPlayer/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
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
    priority: 10101.0002,
    key: "container",
    style: {
        backgroundColor: "white",
        layout: "vertical",
        height: "100%",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        modal: false
    }
}, {
    isClass: true,
    priority: 10101.0005,
    key: "page_title",
    style: {
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "22dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp"
    }
}, {
    isClass: true,
    priority: 10102.0014,
    key: "desc_block",
    style: {
        backgroundColor: "#fff",
        height: Ti.UI.SIZE,
        borderRadius: 0,
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
    queries: {
        formFactor: "isTablet"
    },
    priority: 10112.0004,
    key: "page_title",
    style: {
        color: Alloy.Globals.PrimaryColor,
        font: {
            fontFamily: Alloy.Globals.MainFont,
            fontSize: "28dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "50dp",
        right: "50dp"
    }
}, {
    isClass: true,
    queries: {
        formFactor: "isTablet"
    },
    priority: 10112.0015,
    key: "desc_block",
    style: {
        backgroundColor: "#fff",
        height: Ti.UI.SIZE,
        borderRadius: 0,
        borderColor: "#d1d1d1",
        borderWidth: 1,
        top: "10dp",
        left: "10dp",
        right: "10dp",
        layout: "vertical",
        bottom: "10dp"
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "vidWin",
    style: {
        backgroundColor: "#000"
    }
} ];