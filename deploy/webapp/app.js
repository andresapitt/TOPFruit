var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.API.info("in the alloy.js file");

Alloy.Globals.PrimaryColor = "#313646";

Alloy.Globals.FacebookColor = "#3b5998";

Alloy.Globals.MainFont = "'HelveticaNeue-Thin'";

Alloy.Globals.BoldFont = "'HelveticaNeueLT-BoldCond'";

Alloy.Globals.JamesonFontLight = "'JJLt-Regular'";

Alloy.Globals.JamesonFontBold = "'JJBl-Regular'";

Alloy.Globals.AbsolutFontLight = "'Absolut Script'";

Alloy.Globals.AbsolutFontBold = "'Absolut Headline'";

Alloy.Globals.MalibuFontLight = "'MalibuSlab-300'";

Alloy.Globals.MalibuFontBold = "'MalibuBrushcript-Medium'";

Alloy.Globals.MainFontSize = "18dp";

var json_data_cache_updates = new Array();

json_data_cache_updates.push({
    file: "data/Tips.txt",
    elapsed_time: 6e4
});

json_data_cache_updates.push({
    file: "data/Events.txt",
    elapsed_time: 6e4
});

json_data_cache_updates.push({
    file: "data/Competitions.txt",
    elapsed_time: 6e4
});

json_data_cache_updates.push({
    file: "data/Cocktails.txt",
    elapsed_time: 6e4
});

json_data_cache_updates.push({
    file: "data/Drinks.txt",
    elapsed_time: 6e4
});

json_data_cache_updates.push({
    file: "data/FeaturedMix.txt",
    elapsed_time: 6e4
});

Alloy.Globals.windowStack = new Array();

Ti.App.addEventListener("openWebURL", function(e) {
    Ti.API.info("URL link to open: " + e.UrlToOpen);
    Ti.Platform.openURL(e.UrlToOpen);
});

var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "data");

dir.createDirectory();

Alloy.Globals.Utils = {
    _getExtension: function(fn) {
        var re = /(?:\.([^.]+))?$/;
        var tmpext = re.exec(fn)[1];
        return tmpext ? tmpext : "";
    },
    RemoteImage: function(a) {
        function saveImage(e) {
            image.removeEventListener("load", saveImage);
            Ti.API.info("image link string (iPHONE): " + image.image);
            var fileToSave = Ti.Filesystem.getFile(Titanium.Filesystem.applicationCacheDirectory, e.source.md5);
            fileToSave.write(e.source.toBlob());
            fileToSave = null;
        }
        a = a || {};
        var md5;
        var needsToSave = false;
        var savedFile;
        var image_url;
        var basename;
        var segment;
        var image;
        if (a.image) {
            if (false != a.checkRetina && "high" == Ti.Platform.displayCaps.density) {
                var image_url = a.image;
                var basename = image_url.replace(/\\/g, "/").replace(/.*\//, "");
                var segment = basename.split(".");
                image_url = image_url.replace(basename, segment[0] + "@2x." + segment[1]);
                Ti.API.info("full image path: " + image_url);
                a.image = image_url;
            }
            md5 = Ti.Utils.md5HexDigest(a.image) + this._getExtension(a.image);
            Ti.API.info("MD% string return: " + md5);
            savedFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationCacheDirectory, md5);
            if (savedFile.exists()) {
                Ti.API.info("Image file already cached");
                a.image = savedFile;
            } else {
                Ti.API.info("Image file needs to be downloaded");
                needsToSave = true;
            }
            savedFile = null;
        }
        var image = Ti.UI.createImageView(a);
        true === needsToSave && image.addEventListener("load", saveImage);
        image.width = a.width;
        image.height = a.height;
        image.opacity = a.opacity;
        image.touchEnabled = a.touchEnabled;
        return image;
    },
    RetrieveJson: function(url, saveFilePath, callback) {
        Ti.API.info("in json retrieve function, url: " + url);
        var xhr = Ti.Network.createHTTPClient();
        xhr.open("GET", url);
        xhr.onload = function() {
            Ti.API.info("Text Recieved" + this.responseText);
            var validJSON = null;
            try {
                validJSON = JSON.parse(this.responseText);
            } catch (e) {
                Ti.API.info("Invalid JSON recieved - use last saved JSON or local stored ( " + saveFilePath + " )");
            }
            if (null != validJSON) {
                Ti.API.info("Valid JSON recieved ( " + saveFilePath + " )");
                if (null != saveFilePath && "" != saveFilePath) {
                    Ti.API.info("Save JSON File at: " + saveFilePath);
                    var f = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, saveFilePath);
                    f.write(this.responseText);
                    var JsonSavedDate = Titanium.App.Properties.getList("JsonSaves", new Array());
                    if (0 == JsonSavedDate.length) {
                        Ti.API.info("No saved Json Dates found, save file '" + saveFilePath + "' at utc time: " + new Date().getTime());
                        JsonSavedDate.push({
                            file: saveFilePath,
                            utc_date: new Date().getTime()
                        });
                    } else {
                        var isMatch = false;
                        for (var i = 0; JsonSavedDate.length > i; i++) if (JsonSavedDate[i].file == saveFilePath) {
                            isMatch = true;
                            JsonSavedDate[i].utc_date = new Date().getTime();
                        }
                        isMatch || JsonSavedDate.push({
                            file: saveFilePath,
                            utc_date: new Date().getTime()
                        });
                    }
                    Titanium.App.Properties.setList("JsonSaves", JsonSavedDate);
                }
                null != callback && callback(this.responseText);
            } else {
                var return_json_text = "";
                var readFileFromCMS = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, saveFilePath);
                if (readFileFromCMS.exists()) {
                    return_json_text = readFileFromCMS.read();
                    callback(return_json_text);
                } else {
                    var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, saveFilePath);
                    if (readFile.exists()) {
                        return_json_text = readFile.read();
                        callback(return_json_text);
                    }
                }
            }
        };
        xhr.send();
    },
    GetAppData: function(url, saveFilePath, callback) {
        var readFileFromCMS = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, saveFilePath);
        var return_json_text = "";
        var UTC_time = new Date().getTime();
        var timePassedToUpdate = 6e4;
        Ti.API.info("current UTC time is: " + UTC_time);
        if (readFileFromCMS.exists()) if (Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
            var toUpdate = false;
            var JsonSavedDate = Titanium.App.Properties.getList("JsonSaves", new Array());
            var isMatch = false;
            for (var i = 0; JsonSavedDate.length > i; i++) if (JsonSavedDate[i].file == saveFilePath) {
                isMatch = true;
                Ti.API.info("match is true: " + JsonSavedDate[i].file + ", file path: " + saveFilePath);
                var update_cache_array = json_data_cache_updates.filter(function(obj) {
                    return obj.file == saveFilePath;
                });
                if (null != update_cache_array[0]) {
                    Ti.API.info("filter cache time update file: " + update_cache_array[0].file + ", time to update: " + update_cache_array[0].elapsed_time);
                    timePassedToUpdate = update_cache_array[0].elapsed_time;
                }
                if (new Date().getTime() - JsonSavedDate[i].utc_date > timePassedToUpdate) {
                    Ti.API.info("UTC Time has passed, update JSON from CMS");
                    toUpdate = true;
                    this.RetrieveJson(url, saveFilePath, callback);
                }
            }
            if (!isMatch) {
                Ti.API.info("Match is false");
                toUpdate = true;
                this.RetrieveJson(url, saveFilePath, callback);
            }
            if (!toUpdate) {
                Ti.API.info("To update is false");
                return_json_text = readFileFromCMS.read();
                callback(return_json_text);
            }
        } else {
            return_json_text = readFileFromCMS.read();
            callback(return_json_text);
        } else if (Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
            Ti.API.info("No CMS file. Internet found. Get online file");
            this.RetrieveJson(url, saveFilePath, callback);
        } else {
            var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, saveFilePath);
            if (readFile.exists()) {
                Ti.API.info("Json local text file exists: " + saveFilePath);
                return_json_text = readFile.read();
                callback(return_json_text);
            } else alert("Tips json local text file not found");
        }
    },
    updateCocktailRating: function(cocktail_id, rating) {
        function saveNewRating(cocktailJSON) {
            var fullCocktailsList = JSON.parse(cocktailJSON);
            for (var i = 0; fullCocktailsList.length > i; i++) fullCocktailsList[i].Cocktail.id == cocktail_id && (fullCocktailsList[i].Cocktail.rating = rating);
            var f = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "data/Cocktails.txt");
            f.write(JSON.stringify(fullCocktailsList));
        }
        this.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/cocktails/cocktails/viewjson", "data/Cocktails.txt", saveNewRating);
    }
};

Alloy.Globals.goToHome = function() {
    Ti.API.info("Go to home function, window stack count: " + Alloy.Globals.windowStack.length);
    var stackCount = Alloy.Globals.windowStack.length;
    for (var i = 0; stackCount > i; i++) if (i == stackCount - 1) {
        Ti.API.info("Close index: (top window) " + i);
        Alloy.Globals.windowStack[0].close();
        Alloy.Globals.windowStack.shift();
    } else {
        Ti.API.info("Close index: " + i);
        Alloy.Globals.windowStack[0].close();
        Alloy.Globals.windowStack.shift();
    }
};

Ti.Gesture.addEventListener("shake", function(e) {
    e.timestamp > 2e3;
});

Alloy.createController("index");