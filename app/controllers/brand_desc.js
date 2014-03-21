Ti.API.info("Opening brand desciption page");

var args = arguments[0] || {};
var brandName = args.title || 'Title not received';
//$.recipeTitle.text = args.title || 'Title not received';
Ti.API.info("Brand title: " + brandName);
$.brand_title.text = args.title || 'Title not received';
$.brand_desc_text.text = args.description || 'Description not received';

if(args.banner_img_url != null && args.banner_img_url != "")
{
	var new_height = "160dp";
	if(Ti.Platform.name == "android" )
	{
		new_height = PixelsToDPUnits((Ti.Platform.displayCaps.platformWidth / 320 ) * 160);
		
		function PixelsToDPUnits(ThePixels)
		{
		  return (ThePixels / (Titanium.Platform.displayCaps.dpi / 160));
		}
	}
	
	Ti.API.info('new height: ' + new_height);
	
	var brand_image_view = Alloy.Globals.Utils.RemoteImage({
	  image: args.banner_img_url,
	  defaultImage:'/images/placeholders/ph_events.png',
	  height:new_height
	});
	$.brand_banner_image.add(brand_image_view);
}

//Twitter btn
if(args.twitter != null && args.twitter != "" )
{
	Ti.API.info("Twitter link exists");
	$.twitterBtn.addEventListener('click', function(e){
		if (Titanium.Platform.name != 'android'){
			var canOpenTwitter = Ti.Platform.canOpenURL("twitter://user?screen_name="+args.twitter);
			if(canOpenTwitter)
			{
				Ti.Platform.openURL("twitter://user?screen_name="+args.twitter);
			}
			else{
				alert("The twitter app must be installed to open this link.");
			}
		}
		else 
		{
			var canOpen = Ti.Platform.openURL("twitter://user?screen_name="+args.twitter);
			
			if(canOpen == false)
			{
				var dialog = Ti.UI.createAlertDialog({
				    message: "Sorry, you must first have the twitter app installed on this device to click this button.",
				    ok: 'Ok, thanks!',
				    title: 'Twitter Error'
				  }).show();
			}
		}
		
	});
}
else{
 	$.social_hor_view.remove($.twitterParent);
	Ti.API.info("Twitter link NULL");
}

//Facebook btn
if(args.facebook != null && args.facebook != "" )
{
	Ti.API.info("Facebook link exists");
	$.facebookBtn.addEventListener('click', openFacebookLike);
	
}
else{
 	$.social_hor_view.remove($.facebookParent);
	Ti.API.info("Facebook link NULL");
}

//Website btn
if(args.website != null && args.website != "" )
{
	Ti.API.info("Website link exists");
	$.websiteBtn.addEventListener('click', function(e){
		Ti.API.info("Website button clicked! Go to: " + args.website);
		Ti.Platform.openURL(args.website);
	});
}
else{
 	$.social_hor_view.remove($.websiteParent);
	Ti.API.info("Website link NULL");
}

function openFacebookLike(e){
	if (Titanium.Platform.name == 'iPhone OS') {
		Ti.API.info("facebook like button clicked");
		var canOpenFacebook = Ti.Platform.canOpenURL("fb://profile/"+args.facebook);
		if(canOpenFacebook)
		{
			Ti.Platform.openURL("fb://profile/"+args.facebook);
		}
		else{
			//Ti.Platform.openURL("http://www.facebook.com/"+args.facebook);
			var dialog = Ti.UI.createAlertDialog({
			    message: "Sorry, you must first have the facebook app installed on this device to click this button.",
			    ok: 'Ok, thanks!',
			    title: 'Facebook'
			  }).show();
		}
	}
	else if (Titanium.Platform.name == 'android'){
		var canOpen = Ti.Platform.openURL("fb://profile/"+args.facebook);
		
		if(canOpen == false)
		{
			var dialog = Ti.UI.createAlertDialog({
			    message: "Sorry, you must first have the facebook app installed on this device to click this button.",
			    ok: 'Ok, thanks!',
			    title: 'Facebook Error'
			  }).show();
		}
	}
	
}


function closeWindow(e)
{
	var a = Alloy.Globals.windowStack.indexOf($.brand_desc);
	Alloy.Globals.windowStack.splice(a,1);
	if(Ti.Platform.name == "android" )
	{
		$.brand_desc.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.brand_desc.close();
	}
}

function goToHome(e)
{
	Alloy.Globals.goToHome(e);
	/*
	Ti.API.info("Go To Home: Stack Count = " + Alloy.Globals.windowStack.length );
	for(var i = 0; i < Alloy.Globals.windowStack.length; i++)
	{
		if(i == Alloy.Globals.windowStack.length-1)
		{
			if(Ti.Platform.name == "android" )
			{
				Alloy.Globals.windowStack[i].close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
			}
			else
			{
				Alloy.Globals.windowStack[i].close();
			}
			Ti.API.info("Close index: " + i );
		}
		else
		{
			if(Ti.Platform.name != "mobileweb" )
			{
				Alloy.Globals.windowStack[i].close({animated:false});
			}
			else
			{
				Alloy.Globals.windowStack[i].close();
			}
			Ti.API.info("Close index: " + i );
		}
	}*/
}

$.brand_desc.addEventListener('close', function(e){
	Ti.API.info("brands desc closed");
	//var a = Alloy.Globals.windowStack.indexOf($.brand_desc);
	//Alloy.Globals.windowStack.splice(a,1);
});

$.brand_desc.addEventListener('open', function(e){
	Ti.API.info("brand desc opened");
	Alloy.Globals.windowStack.push($.brand_desc);
});

$.brand_desc.addEventListener('androidback', function(e){
	$.brand_desc.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.brand_desc);
	Alloy.Globals.windowStack.splice(a,1);
});

