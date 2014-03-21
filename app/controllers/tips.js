


Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/tips/tips/viewjson", "data/Tips.txt", DisplayTips);

Ti.API.info('Tips open');

/*var readFileFromCMS = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory , "data/Tips.txt");  
var tips_json_text = ""; 
var UTC_time = new Date().getTime();
var timePassedToUpdate = 96400000; //UTC DAY
Ti.API.info("current UTC time is: " + UTC_time);

if (readFileFromCMS.exists()){ 
	Ti.API.info("Tips json CMS file exists");
	if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE)
	{
		var toUpdate = false;
		var JsonSavedDate = Titanium.App.Properties.getList('JsonSaves', new Array());
		for(var i = 0; i < JsonSavedDate.length; i++)
		{
			var isMatch = false;
			if( JsonSavedDate[i].file == "data/Tips.txt")
			{
				isMatch = true;
				if(new Date().getTime() - JsonSavedDate[i].utc_date > timePassedToUpdate )
				{
					Ti.API.info("UTC Time has passed, update JSON from CMS");
					toUpdate = true;
					Alloy.Globals.Utils.RetrieveJson("http://www.vocal.ie/client/idl/perfect-mix/tips/tips/viewjson", "data/Tips.txt", DisplayTips);
				}
			}
		}
		if(!isMatch)
		{
			toUpdate = true;
			Alloy.Globals.Utils.RetrieveJson("http://www.vocal.ie/client/idl/perfect-mix/tips/tips/viewjson", "data/Tips.txt", DisplayTips);
		}
		if(!toUpdate)
		{
			Ti.API.info("UTC Time has not passed");
			tips_json_text = readFileFromCMS.read();
			DisplayTips();
		}
	}
	else{
		tips_json_text = readFileFromCMS.read();
		DisplayTips();
	}
}
else{
	
	if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE)
	{ 
		//try to retrieve JSON
		Ti.API.info("No CMS file. Internet found. Get online file");
		Alloy.Globals.Utils.RetrieveJson("http://www.vocal.ie/client/idl/perfect-mix/tips/tips/viewjson", "data/Tips.txt", DisplayTips);
	} 
	else
	{
		Ti.API.info("No CMS file. No internet. Get local file");
		var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/Tips.txt");  
		
		// If the file exists
		if (readFile.exists()){  
			Ti.API.info("Tips json local text file exists");
			tips_json_text = readFile.read();
			DisplayTips();
		}
		else{
			alert("Tips json local text file not found");
		}
	}
}
*/
function DisplayTips(newJSON)
{
	var tips_json;
	
	if(newJSON != null)
	{
		tips_json = JSON.parse(newJSON);
	}
	else
	{
		tips_json = JSON.parse(tips_json_text);
	}
	
	Ti.API.info('tips json length: ' + tips_json.length);
	
	var tip_item_style = $.createStyle({
		classes: ["tip_item"],
	});
	var tipt_title_style = $.createStyle({
		classes: ["tip_title"],
	});
	var tip_image_style = $.createStyle({
		classes: ["tip_image"],
	});
	var tip_desc_style = $.createStyle({
		classes: ["tip_desc"],
	});
	var tip_text_style =  $.createStyle({
		classes: ["tip_text_view"],
	});
	
	for(var i = 0; i < tips_json.length; i++)
	{
		Ti.API.info("Tip " + i + " Title: " + tips_json[i].Tip.title);
		
		var tip_item_view = Ti.UI.createView();
		tip_item_view.applyProperties(tip_item_style);
		
		var tip_text_view =  Ti.UI.createView();
		tip_text_view.applyProperties(tip_text_style);
		tip_item_view.add(tip_text_view);
		
		var tip_title_label = Ti.UI.createLabel({text: tips_json[i].Tip.title.toUpperCase()});
		tip_title_label.applyProperties(tipt_title_style);
		tip_text_view.add(tip_title_label);
			
		var tip_desc_label = Ti.UI.createLabel({text:tips_json[i].Tip.description});
		tip_desc_label.applyProperties(tip_desc_style);
		tip_text_view.add(tip_desc_label);
		
		//var tip_image_view = Ti.UI.createImageView();
		//tip_image_view.image = "/images/placeholders/ph_events.png";
		//tip_image_view.applyProperties(tip_image_style);
		
		var tip_image_view = Alloy.Globals.Utils.RemoteImage({
		  image: tips_json[i].Tip.image_thumb,
		  defaultImage:'/images/icons/tips.png'
		});
		tip_image_view.applyProperties(tip_image_style);
		tip_item_view.add(tip_image_view);
		
		$.tip_item_container.add(tip_item_view);
	}
}
function closeWindow(e)
{
	var a = Alloy.Globals.windowStack.indexOf($.tips);
	Alloy.Globals.windowStack.splice(a,1);
	if(Ti.Platform.name == "android" )
	{
		$.tips.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.tips.close();
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

$.tips.addEventListener('close', function(e){
	Ti.API.info("tips closed");
	//var a = Alloy.Globals.windowStack.indexOf($.tips);
	//Alloy.Globals.windowStack.splice(a,1);
});

$.tips.addEventListener('open', function(e){
	Ti.API.info("tips opened");
	Alloy.Globals.windowStack.push($.tips);
});

$.tips.addEventListener('androidback', function(e){
	$.tips.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.tips);
	Alloy.Globals.windowStack.splice(a,1);
});





