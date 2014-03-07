/*	function resetLayout(e){
		$.bar_smarts_banner_image.removeEventListener('postlayout', resetLayout);
		Ti.API.info("Image width: " + $.bar_smarts_banner_image.size.width);
		Ti.API.info("Image height: " + $.bar_smarts_banner_image.size.height);
		Ti.API.info("Banner width: " + $.bar_smarts_banner_image_view.size.width);
		var height_multipler = $.bar_smarts_banner_image_view.size.width / $.bar_smarts_banner_image.size.width;
		Ti.API.info("Height Multiplier: " + height_multipler);
		$.bar_smarts_banner_image.height = $.bar_smarts_banner_image.size.height * height_multipler;
	}

$.bar_smarts_banner_image.addEventListener('postlayout', resetLayout);*/

var new_height = "160dp";
if(Ti.Platform.name == "android" )
{
	new_height = PixelsToDPUnits((Ti.Platform.displayCaps.platformWidth / 320 ) * 160);
	
	function PixelsToDPUnits(ThePixels)
	{
	  return (ThePixels / (Titanium.Platform.displayCaps.dpi / 160));
	}
}
$.bar_smarts_banner_image.height = new_height;

function openBarSmarts(e)
{
	Ti.Platform.openURL("http://www.barsmarts.ie/");
}

function closeWindow(e)
{
	if(Ti.Platform.name == "android" )
	{
		$.bar_smarts.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.bar_smarts.close();
	}
}

function goToHome(e)
{
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
		}
		else
		{
			Alloy.Globals.windowStack[i].close({animated:false});
		}
	}
}

$.bar_smarts.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.bar_smarts);
	Alloy.Globals.windowStack.splice(a,1);
});

$.bar_smarts.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.bar_smarts);
});

$.bar_smarts.addEventListener('androidback', function(e){
	$.bar_smarts.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
});
