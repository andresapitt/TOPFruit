Ti.API.info("Opening event desciption page");

var args = arguments[0] || {};
var eventName = args.title || 'Title not received';
//$.recipeTitle.text = args.title || 'Title not received';
Ti.API.info("Event title: " + eventName);
$.event_title.text = args.title || 'Title not received';

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
	var event_image_view = Alloy.Globals.Utils.RemoteImage({
	  image: args.banner_img_url,
	  defaultImage:'/images/placeholders/ph_events.png',
	  height:new_height
	});

	/*function resetLayout(e){
		event_image_view.removeEventListener('postlayout', resetLayout);
		//var height_multipler = $.event_banner_image.size.width / event_image_view.size.width;
		//event_image_view.height = event_image_view.size.height * height_multipler;
		event_image_view.height = new_height;
	}*/

	//event_image_view.addEventListener('postlayout', resetLayout);
	
	$.event_banner_image.add(event_image_view);

}
//WHERE SECTION
if(args.location != null && args.location != "")
{
	$.event_where_text.text = args.location;
}
else{
	$.event_desc_parent.remove($.event_where_view);
}
//WHEN SECTION 
if(args.date != null && args.date != "")
{
	$.event_when_text.text = args.date;
}
else{
	$.event_desc_parent.remove($.event_when_view);
}
//ADMISSION SECTION 
if(args.admission_fee != null && args.admission_fee != "")
{
	$.event_admission_text.text = args.admission_fee;
}
else{
	$.event_desc_parent.remove($.event_admission_view);
}
//DESCRIPTION SECTION 
if(args.description != null && args.description != "")
{
	$.event_desc_text.text = args.description;
}
else{
	$.event_desc_parent.remove($.event_desc_view);
}

if(args.more_info_url != null && args.more_info_url != "")
{
	$.event_visit_site_Btn.addEventListener('click', function(e){
		Ti.Platform.openURL(args.more_info_url);
	});
}
else
{
	$.event_decs_scrollview.remove($.event_visit_site_Btn);
}

if(args.longitude != null && args.latitude != null)
{
	if(Ti.Platform.name == "android" )
	{
		var Map = require('ti.map');
		var eventMapPinView = Map.createAnnotation({
		    latitude:args.latitude,
		    longitude:args.longitude,
		    title:args.title,
		    subtitle:args.where,
		    pincolor:Map.ANNOTATION_RED,
		    myid:1 // Custom property to uniquely identify this annotation.
		});
		
		var screenWidth = (Ti.Platform.displayCaps.platformHeight < Ti.Platform.displayCaps.platformWidth) ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth;
		
		var mapHeight = (screenWidth * 0.6) / Ti.Platform.displayCaps.logicalDensityFactor ;
		Ti.API.info("Platform width: " + screenWidth + ", map height: " + mapHeight + ", logical density factor: " + Ti.Platform.displayCaps.logicalDensityFactor );
		
		var mapview = Map.createView({
		    mapType: Map.NORMAL_TYPE,
		    region: {latitude:args.latitude, longitude:args.longitude,
		            latitudeDelta:0.01, longitudeDelta:0.01},
		    animate:true,
		    regionFit:true,
		    userLocation:true,
			annotations:[eventMapPinView],
		    height:mapHeight,
		     borderRadius:6,
		});
		$.event_map_view.add(mapview);
	}
	else
	{
		
		var Map = require('ti.map');
		
		var eventMapPinView = Map.createAnnotation({
		    latitude:args.latitude,
		    longitude:args.longitude,
		    title:args.title,
		    subtitle:args.where,
		    pincolor:Map.ANNOTATION_RED,
		    myid:1 // Custom property to uniquely identify this annotation.
		});
		
		var mapview = Map.createView({
		    mapType: Map.NORMAL_TYPE,
		    region: {latitude:args.latitude, longitude:args.longitude,
		            latitudeDelta:0.01, longitudeDelta:0.01},
		    animate:true,
		    regionFit:true,
		    userLocation:true,
		    annotations:[eventMapPinView],
		    height:"200dp",
		    backgroundColor:'#fff',
		    borderRadius:6,
		    tintColor:'#fff'
		});
		$.event_map_view.add(mapview);
	
	}
}
else{
	$.event_decs_scrollview.remove($.event_map_view);
	$.event_decs_scrollview.remove($.location_header_title);
}


function closeWindow(e)
{
	if(Ti.Platform.name == "android" )
	{
		$.event_desc.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.event_desc.close();
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

$.event_desc.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.event_desc);
	Alloy.Globals.windowStack.splice(a,1);
});

$.event_desc.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.event_desc);
});

$.event_desc.addEventListener('androidback', function(e){
	$.event_desc.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
});

