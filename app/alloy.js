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



//var winStack = [];
//Ti.App.Properties.setList('Stack', winStack);
