/*
 * 
 * 
 * Brand description Screen
 * 
 * 
 */

var args = arguments[0] || {};
var brandName = args.title || 'Title not received';
$.brand_title.text = args.title || 'Title not received';
$.brand_desc_text.text = args.description || 'Description not received';

if(Ti.Platform.name == "android" )
{
	var divide = 320 / 310; 
	var width = Ti.Platform.displayCaps.platformWidth / divide;
	var fontRatio = 310/14;
	var fontsize = Math.floor(width/fontRatio);
	var brand_desc_style = $.createStyle({
		font:{ fontFamily:Alloy.Globals.MainFont, fontSize: fontsize.toString() + "px"}
	});
	$.brand_desc_text.applyProperties(brand_desc_style);
	fontRatio = 310/18;
	fontsize = Math.floor(width/fontRatio);
	var brand_title_style = $.createStyle({
		font:{ fontFamily:Alloy.Globals.BoldFont, fontSize: fontsize.toString() + "px"}
	});
	$.brand_title.applyProperties(brand_title_style);
}

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
	  height:new_height,
	  width:Ti.UI.FILL
	});
	$.brand_banner_image.add(brand_image_view);
}

//Twitter btn
if(args.twitter != null && args.twitter != "" && args.twitter.trim() != "" )
{
	Ti.API.info("Twitter link exists");
	if(Titanium.Platform.name != 'mobileweb')
	{
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
		$.twitterBtn_brandDesc.html = '<a href="http://twitter.com/' + args.twitter + '" target="_blank"><div style="height:30px;"><img src="./images/icons/twitterbird@2x.png" style="width:25px;height:20px;top:5px;left:5px;"><span style="color:#fff;font-size:16px;line-height:30px;height:30px !important;vertical-align:top;">Twitter</span></div></a>';
	}
}
else{
 	$.social_hor_view.remove($.twitterParent);
}

//Facebook btn
if(args.facebook != null && args.facebook != "" && args.facebook.trim() != "" )
{
	if(Titanium.Platform.name != 'mobileweb')
	{
		$.facebookBtn.addEventListener('click', openFacebookLike);
	}
	else
	{
		$.facebookBtn_brandDesc.html = '<a href="http://www.facebook.com/' + args.facebook + '" target="_blank"><div style="height:30px;"><img src="./images/icons/facebookIcon@2x.png" style="width:20px;height:25px;left:3px;"><span style="color:#fff;font-size:16px;line-height:30px;height:30px !important;vertical-align:top;">Facebook</span></div></a>';
	}
}
else{
 	$.social_hor_view.remove($.facebookParent);
}

//Website btn
if(args.website != null && args.website != "" && args.website.trim() != "" )
{
	$.websiteBtn.addEventListener('click', function(e){
		Ti.Platform.openURL(args.website);
	});
}
else{
 	$.social_hor_view.remove($.websiteParent);
}

function openFacebookLike(e){
	
	if (Titanium.Platform.name == 'iPhone OS') {
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
	
}

$.brand_desc.addEventListener('close', function(e){
});

$.brand_desc.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.brand_desc);
});

$.brand_desc.addEventListener('androidback', function(e){
	$.brand_desc.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.brand_desc);
	Alloy.Globals.windowStack.splice(a,1);
});

