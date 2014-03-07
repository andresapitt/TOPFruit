Ti.API.info("Opening competition page");

var args = arguments[0] || {};
var compeitition_name = args.title || 'Title not received';
Ti.API.info("Comp title: " + compeitition_name);

$.competition_title.text = args.title || 'Title not received';
$.competition_desc_text.text = args.description || 'Description not received';


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
	
	var competition_image_view = Alloy.Globals.Utils.RemoteImage({
	  image: args.banner_img_url,
	  defaultImage:'/images/placeholders/ph_events.png',
	  height:new_height
	});
	
	/*
	function resetLayout(e){
		competition_image_view.removeEventListener('postlayout', resetLayout);
		Ti.API.info("Image width: " + competition_image_view.size.width);
		Ti.API.info("Image height: " + competition_image_view.size.height);
		Ti.API.info("Banner width: " + $.competition_banner_image.size.width);
		var height_multipler = $.competition_banner_image.size.width / competition_image_view.size.width;
		Ti.API.info("Height Multiplier: " + height_multipler);
		competition_image_view.height = competition_image_view.size.height * height_multipler;
	}*/

	//competition_image_view.addEventListener('postlayout', resetLayout);
	
	$.competition_banner_image.add(competition_image_view);
}



if(args.more_info_url != null && args.more_info_url != "")
{
	$.competition_visit_site_btn.addEventListener('click', function(e){
		Ti.API.info("Competition website button clicked! Go to: " + args.more_info_url);
			Ti.Platform.openURL(args.more_info_url);
	});
}
else
{
	$.comp_scroll_view.remove($.competition_visit_site_btn);
}


function closeWindow(e)
{
	if(Ti.Platform.name == "android" )
	{
		$.competition_desc.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.competition_desc.close();
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

$.competition_desc.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.competition_desc);
	Alloy.Globals.windowStack.splice(a,1);
});

$.competition_desc.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.competition_desc);
});

$.competition_desc.addEventListener('androidback', function(e){
	$.competition_desc.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
});