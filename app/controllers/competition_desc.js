/*
 * 
 * Competition Details Screen 
 * 
 */

var args = arguments[0] || {};
var compeitition_name = args.title || 'Title not received';
$.competition_title.text = args.title || 'Title not received';

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
	  height:new_height,
	  width:Ti.UI.FILL
	});
	
	$.competition_banner_image.add(competition_image_view);
}

//DESCRIPTION SECTION 
if(args.description != null && args.description != "")
{
	$.competition_desc_text.text = args.description;
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
	var a = Alloy.Globals.windowStack.indexOf($.competition_desc);
	Alloy.Globals.windowStack.splice(a,1);
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
	Alloy.Globals.goToHome(e);
}

$.competition_desc.addEventListener('close', function(e){
});

$.competition_desc.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.competition_desc);
});

$.competition_desc.addEventListener('androidback', function(e){
	$.competition_desc.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.competition_desc);
	Alloy.Globals.windowStack.splice(a,1);
});
