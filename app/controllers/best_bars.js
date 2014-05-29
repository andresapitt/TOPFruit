/*
 * 
 * Best bars screen from inside the news section of the app
 * 
 */

var new_height = "160dp";
if(Ti.Platform.name == "android" )
{
	new_height = PixelsToDPUnits((Ti.Platform.displayCaps.platformWidth / 320 ) * 160);
	
	function PixelsToDPUnits(ThePixels)
	{
	  return (ThePixels / (Titanium.Platform.displayCaps.dpi / 160));
	}
	
	
	if(Ti.Platform.name == "android" )
	{
		var divide = 320 / 85;
		var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
		$.twitterBtn.width = Math.floor(pixelWidth).toString() + "px";
		$.facebookBtn.width = Math.floor(pixelWidth).toString() + "px";
		$.websiteBtn.width = Math.floor(pixelWidth).toString() + "px";
		
		if(Ti.Platform.name == "android"){
			var fontSizeRatio = 320 / 14;
			var fontSize = Math.floor(Ti.Platform.displayCaps.platformWidth  / fontSizeRatio);
			$.twitterBtn.font = { fontFamily:Alloy.Globals.BoldFont, fontSize:fontSize.toString()+"px"};
			$.facebookBtn.font = { fontFamily:Alloy.Globals.BoldFont, fontSize:fontSize.toString()+"px"};
			$.websiteBtn.font = { fontFamily:Alloy.Globals.BoldFont, fontSize:fontSize.toString()+"px"};
			/*var borderRatio = 320/10;
			var borderSize = Math.floor(Ti.Platform.displayCaps.platformWidth  / fontSizeRatio);
			$.twitterParent.left = Math.floor(borderSize).toString() + "px";
			$.twitterParent.right = Math.floor(borderSize).toString() + "px";
			$.facebookParent.left = Math.floor(borderSize).toString() + "px";
			$.facebookParent.right = Math.floor(borderSize).toString() + "px";
			$.websiteParent.left = Math.floor(borderSize).toString() + "px";
			$.websiteParent.right = Math.floor(borderSize).toString() + "px";*/
  		}
	  		
		/*horizontal_drink_view_style.left = Math.floor(pixelWidth).toString() + "px";
		horizontal_drink_view_style.right = Math.floor(pixelWidth).toString() + "px";
		horizontal_drink_view_style.top = Math.floor(pixelWidth).toString() + "px";
		divide = 320 / 90;
		pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
		var resultAspectRatio = 120 / 90 ;
		var pixelHeight =  Math.floor(pixelWidth * resultAspectRatio);
		horizontal_drink_view_style.height =  Math.floor(pixelHeight).toString() + "px";
		Ti.API.info("row left " + horizontal_drink_view_style.left + ", height: " + horizontal_drink_view_style.right);*/
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
}

$.best_bars.addEventListener('close', function(e){
});

$.best_bars.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.best_bars);
});

$.best_bars.addEventListener('androidback', function(e){
	$.best_bars.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.best_bars);
	Alloy.Globals.windowStack.splice(a,1);
});
