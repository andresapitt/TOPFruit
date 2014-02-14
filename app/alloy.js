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
        savedFile.write(
          Ti.UI.createImageView({image:image.image,width:'auto',height:'auto'}).toImage()
        );
      }
      image.addEventListener('load',saveImage);
    }
    return image;
  }
};


//var winStack = [];
//Ti.App.Properties.setList('Stack', winStack);
