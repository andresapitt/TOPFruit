Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/competitions/competitions/viewjson", "data/Competitions.txt", DisplayCompetitions);
var competitions_json_text = ""; 

function DisplayCompetitions(newJSON)
{
	var competition_json;
	if(newJSON != null)
	{
		competition_json = JSON.parse(newJSON);
	}
	else
	{
		competition_json = JSON.parse(competitions_json_text);
	}
	
	var competition_view_style = $.createStyle({
		classes: ["competition_item"],
	});
	
	var competition_title_style = $.createStyle({
		classes: ["competition_title"],
	});
	
	var competition_seperator_style = $.createStyle({
		classes: ["competition_separator"],
	});
	
	var competition_image_style = $.createStyle({
		classes: ["competition_image"],
	});
	var competition_arrow_style = $.createStyle({
		classes: ["competition_arrow"],
	});
	
	for(var i = 0; i < competition_json.length; i++)
	{
		Ti.API.info("Competition " + i + " Title: " + competition_json[i].Competition.title);
		var competition_item_view = Ti.UI.createView();
		var vertical_competition_container = Ti.UI.createView({layout:'vertical', height:"67dp", left:"72dp", right:"20dp", touchEnabled:false});
		competition_item_view.add(vertical_competition_container);
		
		var competition_title_label = Ti.UI.createLabel({text:competition_json[i].Competition.title.toUpperCase()});
		competition_title_label.applyProperties(competition_title_style);
		vertical_competition_container.add(competition_title_label);
		competition_item_view.applyProperties(competition_view_style);
		
		var competition_image_view = Alloy.Globals.Utils.RemoteImage({
		  image: competition_json[i].Competition.thumb_image_url,
		  defaultImage:'/images/placeholders/ph_events.png'
		});
		competition_image_view.applyProperties(competition_image_style);
		competition_item_view.add(competition_image_view);
		
		var competition_arrow_view = Ti.UI.createImageView({image:"/images/common/chevron.png"});
		competition_arrow_view.applyProperties(competition_arrow_style);
		competition_item_view.add(competition_arrow_view);
		
		competition_item_view.competitionData = competition_json[i].Competition;
		competition_item_view.addEventListener('click', openCompetitionDescription);
		
		$.competition_item_container_sc.add(competition_item_view);
		
		if(i != competition_json.length - 1)
		{
			var competition_sep_view = Ti.UI.createView();
			competition_sep_view.applyProperties(competition_seperator_style);
			$.competition_item_container_sc.add(competition_sep_view);
		}
	}
}


function openCompetitionDescription(e){
	
	//Ti.API.info("Opening event description, title: " + e.source.eventData.title);
	var competition_desc_Win = Alloy.createController('competition_desc', e.source.competitionData).getView();
	if(Ti.Platform.name == "android" )
	{
		competition_desc_Win.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else
	{
    	Alloy.Globals.parent.openWindow(competition_desc_Win);
    }
}

function closeWindow(e)
{
	if(Ti.Platform.name == "android" )
	{
		$.competitions.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.competitions.close();
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

$.competitions.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.competitions);
	Alloy.Globals.windowStack.splice(a,1);
});

$.competitions.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.competitions);
});

$.competitions.addEventListener('androidback', function(e){
	$.competitions.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
});