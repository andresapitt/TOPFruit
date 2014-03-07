
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


function openWorldsBestBars(e)
{
	Ti.Platform.openURL("http://www.worldsbestbars.com/");
}

function closeWindow(e)
{
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

$.best_bars.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.best_bars);
	Alloy.Globals.windowStack.splice(a,1);
});

$.best_bars.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.best_bars);
});

$.best_bars.addEventListener('androidback', function(e){
	$.best_bars.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
});
