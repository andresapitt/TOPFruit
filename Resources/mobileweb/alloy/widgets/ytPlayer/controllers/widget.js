function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ytPlayer/" + s : s.substring(0, index) + "/ytPlayer/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function getVideo(id) {
        var client = Ti.Network.createHTTPClient();
        client.onload = function() {
            var json = this.responseText.substring(4, this.responseText.length);
            var response = JSON.parse(json);
            var isHighQuality = null != response.content["player_data"]["fmt_stream_map"];
            var streamUrl = isHighQuality ? response.content["player_data"]["fmt_stream_map"][0].url : "";
            isHighQuality || Ti.API.info("using low quality video because fmt_stream_map does not exist in json response, User-Agent probably is not being sent correctly");
            console.info("stream url: " + streamUrl);
            playVideo(streamUrl);
        };
        client.open("GET", "http://m.youtube.com/watch?ajax=1&layout=mobile&tsp=1&utcoffset=330&v=" + id);
        client.send();
    }
    function playVideo(url) {
        $.videoPlayer.setUrl(url);
        $.videoPlayer.addEventListener("complete", function() {
            Ti.API.info("video player complete");
            exports.close();
        });
        $.videoPlayer.addEventListener("fullscreen", function(e) {
            if (!e.entering) {
                Ti.API.info("video player fullscreen exit");
                exports.close();
            }
        });
    }
    new (require("alloy/widget"))("ytPlayer");
    this.__widgetId = "ytPlayer";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.videoPlayer = Ti.Media.createVideoPlayer({
        backgroundColor: "#000",
        fullscreen: true,
        autoplay: true,
        scalingMode: Ti.Media.VIDEO_SCALING_ASPECT_FIT,
        mediaControlMode: Ti.Media.VIDEO_CONTROL_DEFAULT,
        id: "videoPlayer",
        ns: Ti.Media
    });
    $.__views.videoPlayer && $.addTopLevelView($.__views.videoPlayer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.isPlaying = false;
    exports.play = function(id) {
        console.info("id: " + id);
        exports.isPlaying = true;
        getVideo(id);
    };
    exports.close = function() {
        Ti.API.info("closing video player");
        $.videoPlayer.hide();
        $.videoPlayer.release();
        $.videoPlayer = null;
        exports.isPlaying = false;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;