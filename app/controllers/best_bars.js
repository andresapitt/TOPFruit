
/*function resetLayout(e){
	$.best_bars_banner_image.removeEventListener('postlayout', resetLayout);
	Ti.API.info("Image width: " + $.best_bars_banner_image.size.width);
	Ti.API.info("Image height: " + $.best_bars_banner_image.size.height);
	Ti.API.info("Banner width: " + $.best_bars_banner_image_view.size.width);
	var height_multipler = $.best_bars_banner_image_view.size.width / $.best_bars_banner_image.size.width;
	Ti.API.info("Height Multiplier: " + height_multipler);
	$.best_bars_banner_image.height = $.best_bars_banner_image.size.height * height_multipler;
}

$.best_bars_banner_image.addEventListener('postlayout', resetLayout);*/

var new_height = "160dp";
if(Ti.Platform.name == "android" )
{
	new_height = PixelsToDPUnits((Ti.Platform.displayCaps.platformWidth / 320 ) * 160);
	
	function PixelsToDPUnits(ThePixels)
	{
	  return (ThePixels / (Titanium.Platform.displayCaps.dpi / 160));
	}
}

$.best_bars_banner_image.height = new_height;

function openTwitter(e){
	if (Titanium.Platform.name == 'iPhone OS'){
			var canOpenTwitter = Ti.Platform.canOpenURL("twitter://user?screen_name=WorldsBestBars");
			if(canOpenTwitter)
			{
				Ti.Platform.openURL("twitter://user?screen_name=WorldsBestBars");
			}
			else{
				alert("The twitter app must be installed to open this link.");
			}
		}
		else if(Titanium.Platform.name == 'android')
		{
			var canOpen = Ti.Platform.openURL("twitter://user?screen_name=WorldsBestBars");
			
			if(canOpen == false)
			{
				var dialog = Ti.UI.createAlertDialog({
				    message: "Sorry, you must first have the twitter app installed on this device to click this button.",
				    ok: 'Ok, thanks!',
				    title: 'Twitter Error'
				  }).show();
			}
		}
}
function openFacebook(e){
	if (Titanium.Platform.name == 'iPhone OS') {
		Ti.API.info("facebook like button clicked");
		var canOpenFacebook = Ti.Platform.canOpenURL("fb://profile/149071961796732");
		if(canOpenFacebook)
		{
			Ti.Platform.openURL("fb://profile/149071961796732");
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
		var canOpen = Ti.Platform.openURL("fb://profile/149071961796732");
		
		if(canOpen == false)
		{
			var dialog = Ti.UI.createAlertDialog({
			    message: "Sorry, you must first have the facebook app installed on this device to click this button.",
			    ok: 'Ok, thanks!',
			    title: 'Facebook Error'
			  }).show();
		}
	}
	else if (Titanium.Platform.name == 'mobileweb'){
		//Ti.Platform.openURL("http://www.facebook.com");
	}
}

if (Titanium.Platform.name == 'mobileweb'){
	$.websiteBtn.html = '<a href="mailto:' + Alloy.Globals.ContactEmail + '?Subject=Perfect%20Mix%20-%20Best%20Bars%20Consideration" target="_top"><div style="height:30px;"><img src="./images/icons/websiteIcon@2x.png" style="width:25px;height:20px;top:5px;left:5px"><span style="color:#fff;font-size:16px;line-height:30px;height:30px !important;vertical-align:top;">Email</span></div></a>';
}

function openEmail(e){
	Ti.API.info("Submit best bars email");
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Perfect Mix - Best Bars Consideration ";
	//emailDialog.toRecipients = ['editor@worldsbestbars.com'];
	emailDialog.toRecipients = [Alloy.Globals.ContactEmail];
	emailDialog.ccRecipients = [];
	emailDialog.bccRecipients = [];
	emailDialog.messageBody = '';
	Ti.API.info("is it support? " + emailDialog.isSupported());
	
	emailDialog.addEventListener('complete', function(e){
		Ti.API.info("email complete: " + e.code + ", result: " + e.result + ", success: " + e.success);
	});
	emailDialog.open();
}


function submitBarForConsideration(e)
{
	Ti.Platform.openURL("http://www.worldsbestbars.com/bar-resource/login");
}


function openWorldsBestBars(e)
{
	Ti.Platform.openURL("http://www.worldsbestbars.com/");
}

function closeWindow(e)
{
	var a = Alloy.Globals.windowStack.indexOf($.best_bars);
	Alloy.Globals.windowStack.splice(a,1);
	if(Ti.Platform.name == "android" )
	{
		$.best_bars.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.best_bars.close();
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

$.best_bars.addEventListener('close', function(e){
	Ti.API.info("best bars closed");
	//var a = Alloy.Globals.windowStack.indexOf($.best_bars);
	//Alloy.Globals.windowStack.splice(a,1);
});

$.best_bars.addEventListener('open', function(e){
	Ti.API.info("best bars opened");
	Alloy.Globals.windowStack.push($.best_bars);
});

$.best_bars.addEventListener('androidback', function(e){
	$.best_bars.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.best_bars);
	Alloy.Globals.windowStack.splice(a,1);
});
