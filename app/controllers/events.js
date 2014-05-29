/*
 * 
 * Upcoming events list screen
 * 
 * 
 */


Alloy.Globals.Utils.GetAppData("/client/idl/perfect-mix/events/events/viewjson", "data/Events.txt", DisplayEvents);
var events_json_text = ""; 

function DisplayEvents(newJSON)
{
	var events_json;
	if(newJSON != null)
	{
		events_json = JSON.parse(newJSON);
	}
	else
	{
		events_json = JSON.parse(events_json_text);
	}
	
	var eventsToShow = [];
	
	for(var i = 0; i < events_json.length; i++)
	{
		var parts = (events_json[i].Event.finish_date.substring(0,10)).split('-');
		var event_finish_date = new Date(parts[0], parts[1]-1, parts[2]); 
		if(event_finish_date < new Date())
		{
		}
		else
		{
			eventsToShow.push(events_json[i]);
		}
	}
	
	eventsToShow.sort(function(a, b) {
	    var dateAString = (a.Event.finish_date.substring(0,10)).split('-');
	    var dateA = new Date(dateAString[0], dateAString[1]-1, dateAString[2]); 
	    var dateBString = (b.Event.finish_date.substring(0,10)).split('-');
	    var dateB = new Date(dateBString[0], dateBString[1]-1, dateBString[2]); 
	    return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
	});
	
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
	
	for(var i = 0; i < eventsToShow.length; i++)
	{
		var event_item_view = Ti.UI.createView();
		var vertical_event_container = Ti.UI.createView({layout:'vertical', height:"67dp", left:"72dp", right:"20dp", touchEnabled:false});
		event_item_view.add(vertical_event_container);
		
		var event_title_label = Ti.UI.createLabel({text:eventsToShow[i].Event.title.toUpperCase()});
		event_title_label.applyProperties(event_title_style);
		vertical_event_container.add(event_title_label);
		event_item_view.applyProperties(event_view_style);
		
		var event_time_label = Ti.UI.createLabel({text:eventsToShow[i].Event.date});
		event_time_label.applyProperties(event_time_style);
		vertical_event_container.add(event_time_label);
		
		var event_image_view = Alloy.Globals.Utils.RemoteImage({
		  image: eventsToShow[i].Event.thumb_image_url,
		  defaultImage:'/images/placeholders/ph_events.png'
		});
		event_image_view.applyProperties(event_image_style);
		event_item_view.add(event_image_view);
		if(Ti.Platform.name != "mobileweb" )
		{
			var event_arrow_view = Ti.UI.createImageView({image:"/images/common/chevron.png"});
		}
		else
		{
			var event_arrow_view = Ti.UI.createImageView({image:"./images/common/chevron.png"});
		}
		event_arrow_view.applyProperties(event_arrow_style);
		event_item_view.add(event_arrow_view);
		
		event_item_view.eventData = eventsToShow[i].Event;
		event_item_view.addEventListener('click', openEventDescription);
		
		$.event_item_container.add(event_item_view);
		
		if(i != events_json.length - 1)
		{
			var event_sep_view = Ti.UI.createView();
			event_sep_view.applyProperties(event_seperator_style);
			$.event_item_container.add(event_sep_view);
		}
	}
}


function openEventDescription(e){
	var event_desc_Win = Alloy.createController('event_desc', e.source.eventData).getView();
	if(Ti.Platform.name == "android" )
	{
		event_desc_Win.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left, modal:false});
	}
	else if(Ti.Platform.name == "mobileweb" )
	{
		event_desc_Win.open();
	}
	else
	{
    	Alloy.Globals.parent.openWindow(event_desc_Win);
    }
	
}


function closeWindow(e)
{
	var a = Alloy.Globals.windowStack.indexOf($.events);
	Alloy.Globals.windowStack.splice(a,1);
	if(Ti.Platform.name == "android" )
	{
		$.events.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.events.close();
	}
}

function goToHome(e)
{
	Alloy.Globals.goToHome(e);
}

$.events.addEventListener('close', function(e){
});

$.events.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.events);
});

$.events.addEventListener('androidback', function(e){
	$.events.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.events);
	Alloy.Globals.windowStack.splice(a,1);
});


