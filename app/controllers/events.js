
Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/events/events/viewjson", "data/Events.txt", DisplayEvents);
var events_json_text = ""; 

/*var readFileFromCMS = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory , "Events.txt");  
var UTC_time = new Date().getTime();
var timePassedToUpdate = 96400000; //UTC DAY
Ti.API.info("current UTC time is: " + UTC_time);
var events_json_text = ""; 

if (readFileFromCMS.exists()){ 
	events_json_text = readFileFromCMS.read();
	DisplayBrands();
}
else
{
	if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE)
	{ 
		//try to retrieve JSON
		Alloy.Globals.Utils.RetrieveJson("http://www.vocal.ie/client/idl/perfect-mix/events/events/viewjson", "Events.txt", DisplayBrands);
	} 
	else
	{
		var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/Events.txt"); 
		// If the file exists
		if (readFile.exists()){  
			Ti.API.info("Events json local text file exists");
			events_json_text = readFile.read();
			DisplayBrands();
		}
		else{
			alert("Events json local text file not found");
		}
	}
}
*/
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
		//var event_finish_date = new Date(events_json[i].Event.finish_date.substring(0,10));
		var parts = (events_json[i].Event.finish_date.substring(0,10)).split('-');
		var event_finish_date = new Date(parts[0], parts[1]-1, parts[2]); 
		Ti.API.info('event finish date: ' + events_json[i].Event.finish_date.substring(0,10) + ' (parsed) ' + event_finish_date.toString());
		if(event_finish_date < new Date())
		{
			Ti.API.info("event " + i + " date is greater than current date");
		}
		else
		{
			Ti.API.info("event " + i + " date is less or equal to current date");
			eventsToShow.push(events_json[i]);
		}
	}
	
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
		Ti.API.info("Event " + i + " Title: " + eventsToShow[i].Event.title);
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
		
		/*var event_image_view = Ti.UI.createImageView();
		event_image_view.image = "/images/placeholders/ph_events.png";
		event_image_view.applyProperties(event_image_style);
		event_item_view.add(event_image_view);*/
		
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
	Ti.API.info("Opening event description, title: " + e.source.eventData.title);
	var event_desc_Win = Alloy.createController('event_desc', e.source.eventData).getView();
	if(Ti.Platform.name == "android" )
	{
		event_desc_Win.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
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

$.events.addEventListener('close', function(e){
	Ti.API.info('Events window closed');
	
	//var a = Alloy.Globals.windowStack.indexOf($.events);
	//Alloy.Globals.windowStack.splice(a,1);
});

$.events.addEventListener('open', function(e){
	Ti.API.info('Events window opened');
	
	Alloy.Globals.windowStack.push($.events);
});

$.events.addEventListener('androidback', function(e){
	$.events.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.events);
	Alloy.Globals.windowStack.splice(a,1);
});


