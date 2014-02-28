// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


Ti.API.info("in the alloy.js file");

//Ti.App.Properties.setBool('over18', false);

Alloy.Globals.PrimaryColor = "#313646";
Alloy.Globals.FacebookColor = "#3b5998";
if(Ti.Platform.osname == "iphone")
{
	Alloy.Globals.MainFont = "HelveticaNeue-Light";
	//Alloy.Globals.MainFont = "Helvetica 35 Thin";
	Alloy.Globals.BoldFont = "Helvetica Neue LT";
}
else{
	//Alloy.Globals.MainFont = "HelveticaNeue";
	Alloy.Globals.MainFont = "HelveticaNeue-Thin";
	Alloy.Globals.BoldFont = "HelveticaNeueLT-BoldCond";
}

//Alloy.Globals.fb = require('facebook');
//Alloy.Globals.fb.appid = "183073991901631";
//Alloy.Globals.fb.permissions = ["email"];
Alloy.Globals.appid = "183073991901631";
Alloy.Globals.permissions = ["email"];

Alloy.Globals.windowStack = new Array();

var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'data');
dir.createDirectory();

// Utils methods for saving / caching remote images
Alloy.Globals.Utils = {
  /* modified version of https://gist.github.com/1243697 */
  _getExtension: function(fn) {
    // from http://stackoverflow.com/a/680982/292947
    var re = /(?:\.([^.]+))?$/;
    var tmpext = re.exec(fn)[1];
    return (tmpext) ? tmpext : '';
  },
  RemoteImage: function(a){
    a = a || {};
    var md5;
    var needsToSave = false;
    var savedFile;
	Ti.API.info("image link string : " + a.image);
	if(Ti.Platform.name == "android" )
		{
			if(a.image){
				if(a.checkRetina != false)
				{
					Ti.API.info("density droid: "  + Ti.Platform.displayCaps.density);
					if( Ti.Platform.displayCaps.density == 'high' || Ti.Platform.displayCaps.density == 'xhigh')
					{
				    	var image_url = a.image;
				    	var basename = image_url.replace(/\\/g,'/').replace( /.*\//, '' );
				        var segment = basename.split('.');
				        image_url = image_url.replace(basename, segment[0]+'@2x.'+segment[1]);
				        Ti.API.info("full image path: " + image_url);
				        a.image =	image_url;
				    }
				}
			}
			var image = Ti.UI.createImageView(a);
			return image;
		}
		else
		{
			if(a.image){
				if(a.checkRetina != false)
				{
					if( Ti.Platform.displayCaps.density == 'high')
					{
				    	var image_url = a.image;
				    	var basename = image_url.replace(/\\/g,'/').replace( /.*\//, '' );
				        var segment = basename.split('.');
				        image_url = image_url.replace(basename, segment[0]+'@2x.'+segment[1]);
				        Ti.API.info("full image path: " + image_url);
				        a.image =	image_url;
				    }
				}
				md5 = Ti.Utils.md5HexDigest(a.image)+this._getExtension(a.image);
				  
				Ti.API.info("MD% string return: " + md5);
				savedFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,md5);
				if(savedFile.exists()){
					Ti.API.info("Image file already cached" );
					a.image = savedFile;
				} else {
					Ti.API.info("Image file needs to be downloaded" );
					needsToSave = true;
				}
		    }
		    var image = Ti.UI.createImageView(a);
			if(needsToSave === true){
				function saveImage(e){
			        image.removeEventListener('load',saveImage);
					//load high/low res version of image
					Ti.API.info("image link string : " + image.image);
					if(Ti.Platform.name == "android" )
					{
						savedFile.write( Ti.UI.createImageView({image:image.image, width:Ti.UI.SIZE, height:Ti.UI.SIZE}).toBlob() );
					}
					else
					{
						savedFile.write( Ti.UI.createImageView({image:image.image, width:Ti.UI.SIZE, height:Ti.UI.SIZE}).toImage() );
					}
		      }
		      image.addEventListener('load',saveImage);
		    }
		    return image;
   		}
	},
	RetrieveJson:function(url, saveFilePath, callback){
	 	Ti.API.info("in json retrieve function, url: " + url);
	 	var xhr = Ti.Network.createHTTPClient();
		xhr.open("GET", url);
		xhr.onload = function() {
		    Ti.API.info("Text Recieved" + this.responseText);
		    if(saveFilePath != null && saveFilePath != "")
		    {
		    	Ti.API.info("Save JSON File at: " + saveFilePath);
		    	var f = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory , saveFilePath);  
		    	f.write(this.responseText);
		    	var JsonSavedDate = Titanium.App.Properties.getList('JsonSaves', new Array());
		    	if(JsonSavedDate.length == 0)
				{
					Ti.API.info("No saved Json Dates found, save file '" + saveFilePath + "' at utc time: " + new Date().getTime());
					JsonSavedDate.push({file:saveFilePath, utc_date:new Date().getTime()});
				}
				else
				{
					var isMatch = false;
					for(var i = 0; i < JsonSavedDate.length; i++)
					{
						if( JsonSavedDate[i].file == saveFilePath)
						{
							isMatch = true;
							JsonSavedDate[i].utc_date = new Date().getTime();
						}
					}
					if(!isMatch)
					{
						JsonSavedDate.push({file:saveFilePath, utc_date:new Date().getTime()});
					}
				}
				Titanium.App.Properties.setList('JsonSaves', JsonSavedDate);
		    }
		    if(callback != null)
		    {
		    	callback(this.responseText);
		   	}
		};
		xhr.send();
	},
	GetAppData:function(url, saveFilePath, callback)
	{
		var readFileFromCMS = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory , saveFilePath);
		var return_json_text = ""; 
		var UTC_time = new Date().getTime();
		//var timePassedToUpdate = 96400000;
		var timePassedToUpdate = 10000;
		Ti.API.info("current UTC time is: " + UTC_time);
		
		if (readFileFromCMS.exists()){ 
			if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE)
			{
				var toUpdate = false;
				var JsonSavedDate = Titanium.App.Properties.getList('JsonSaves', new Array());
				var isMatch = false;
				for(var i = 0; i < JsonSavedDate.length; i++)
				{
					if( JsonSavedDate[i].file == saveFilePath)
					{
						isMatch = true;
						Ti.API.info('match is true: ' +  JsonSavedDate[i].file + ", file path: " + saveFilePath);
						if(new Date().getTime() - JsonSavedDate[i].utc_date > timePassedToUpdate )
						{
							Ti.API.info("UTC Time has passed, update JSON from CMS");
							toUpdate = true;
							this.RetrieveJson(url, saveFilePath, callback);
						}
					}
				}
				if(!isMatch)
				{
					Ti.API.info('Match is false');
					toUpdate = true;
					this.RetrieveJson(url, saveFilePath, callback);
				}
				if(!toUpdate)
				{
					Ti.API.info('To update is false');
					return_json_text = readFileFromCMS.read();
					callback(return_json_text);
				}
			}
			else{
				return_json_text = readFileFromCMS.read();
				callback(return_json_text);
			}
		}
		else
		{
			if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE)
			{ 
				Ti.API.info("No CMS file. Internet found. Get online file");
				this.RetrieveJson(url, saveFilePath, callback);
			} 
			else
			{
				var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , saveFilePath);  
				
				if (readFile.exists()){  
					Ti.API.info("Json local text file exists: " + saveFilePath);
					return_json_text = readFile.read();
					callback(return_json_text);
				}
				else{
					alert("Tips json local text file not found");
				}
			}
		}

	}
};


//var winStack = [];
//Ti.App.Properties.setList('Stack', winStack);
