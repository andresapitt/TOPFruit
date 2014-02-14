
var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/Events.txt");  
 
var events_json_text = ""; 
 
// If the file exists
if (readFile.exists()){  
	Ti.API.info("Events json local text file exists");
	events_json_text = readFile.read();
}
else{
	alert("Events json local text file not found");
}

var events_json = JSON.parse(events_json_text);

var event_view_style = $.createStyle({
	classes: ["event_item"],
});

var event_title_style = $.createStyle({
	classes: ["event_title"],
});

var event_seperator_style = $.createStyle({
	classes: ["event_separator"],
});

var event_image_style = $.createStyle({
	classes: ["event_image"],
});
var event_arrow_style = $.createStyle({
	classes: ["event_arrow"],
});

var event_time_style = $.createStyle({
	classes: ["event_time"],
});



for(var i = 0; i < events_json.events.length; i++)
{
	Ti.API.info("Event " + i + " Title: " + events_json.events[i].title);
	var event_item_view = Ti.UI.createView();
	var event_title_label = Ti.UI.createLabel({text:events_json.events[i].title.toUpperCase()});
	event_title_label.applyProperties(event_title_style);
	event_item_view.add(event_title_label);
	event_item_view.applyProperties(event_view_style);
	
	var event_time_label = Ti.UI.createLabel({text:events_json.events[i].when});
	event_time_label.applyProperties(event_time_style);
	event_item_view.add(event_time_label);
	
	/*var event_image_view = Ti.UI.createImageView();
	event_image_view.image = "/images/placeholders/ph_events.png";
	event_image_view.applyProperties(event_image_style);
	event_item_view.add(event_image_view);*/
	
	var event_image_view = Alloy.Globals.Utils.RemoteImage({
	  image: events_json.events[i].thumb_image_url,
	  defaultImage:'/images/placeholders/ph_events.png'
	});
	event_image_view.applyProperties(event_image_style);
	event_item_view.add(event_image_view);
	
	var event_arrow_view = Ti.UI.createImageView({image:"/images/common/chevron.png"});
	event_arrow_view.applyProperties(event_arrow_style);
	event_item_view.add(event_arrow_view);
	
	event_item_view.eventData = events_json.events[i];
	event_item_view.addEventListener('click', openEventDescription);
	
	$.event_item_container.add(event_item_view);
	
	if(i != events_json.events.length - 1)
	{
		var event_sep_view = Ti.UI.createView();
		event_sep_view.applyProperties(event_seperator_style);
		$.event_item_container.add(event_sep_view);
	}
}


function openEventDescription(e){
	Ti.API.info("Opening event description, title: " + e.source.eventData.title);
	var event_desc_Win = Alloy.createController('event_desc', e.source.eventData).getView();
    Alloy.Globals.parent.openWindow(event_desc_Win);
	
}


function closeWindow(e)
{
	$.events.close();
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

$.events.addEventListener('close', function(e){
	Ti.API.info('Events window closed');
	
	var a = Alloy.Globals.windowStack.indexOf($.events);
	Alloy.Globals.windowStack.splice(a,1);
});

$.events.addEventListener('open', function(e){
	Ti.API.info('Events window opened');
	
	Alloy.Globals.windowStack.push($.events);
});
