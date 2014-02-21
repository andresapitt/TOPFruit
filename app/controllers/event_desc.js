Ti.API.info("Opening event desciption page");

var args = arguments[0] || {};
var eventName = args.title || 'Title not received';
//$.recipeTitle.text = args.title || 'Title not received';
Ti.API.info("Event title: " + eventName);
$.event_title.text = args.title || 'Title not received';

if(args.banner_img_url != null && args.banner_img_url != "")
{
	var event_image_view = Alloy.Globals.Utils.RemoteImage({
	  image: args.banner_img_url,
	  defaultImage:'/images/placeholders/ph_events.png'
	});
	$.event_banner_image.add(event_image_view);
}
//WHERE SECTION
if(args.where != null && args.where != "")
{
	$.event_where_text.text = args.where;
}
else{
	$.event_desc_parent.remove($.event_where_view);
}
//WHEN SECTION 
if(args.when != null && args.when != "")
{
	$.event_when_text.text = args.when;
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
if(args.desc != null && args.desc != "")
{
	$.event_desc_text.text = args.desc;
}
else{
	$.event_desc_parent.remove($.event_desc_view);
}

function visitSiteBtnHandler(e){
	Ti.Platform.openURL(args.more_info_url);
}


if(args.longitude != null && args.latitude != null)
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
	    height:"200dp"
	});
	$.event_map_view.add(mapview);
	
}
else{
	$.event_decs_scrollview.remove($.event_map_view);
}


function closeWindow(e)
{
	$.event_desc.close();
}

function goToHome(e)
{
	for(var i = 0; i < Alloy.Globals.windowStack.length; i++)
	{
		if(i == Alloy.Globals.windowStack.length-1)
		{
			Alloy.Globals.windowStack[i].close();
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