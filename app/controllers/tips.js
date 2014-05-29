/*
 * 
 * Tips Display Screen
 * 
 */

Alloy.Globals.Utils.GetAppData("/client/idl/perfect-mix/tips/tips/viewjson", "data/Tips.txt", DisplayTips);

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
	
	var tip_item_style = $.createStyle({
		classes: ["tip_item"],
	});
	var tipt_title_style = $.createStyle({
		classes: ["tip_title"],
	});
	if(Ti.Platform.name == "android" )
	{
		var divide = 320 / 238;
		var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
		var fontSizeRatio = 238 / 15;
		var fontSize = Math.floor(pixelWidth / fontSizeRatio);
		tipt_title_style.font = { fontFamily:Alloy.Globals.BoldFont, fontSize:fontSize.toString()+"px"};
	}
	var tip_image_style = $.createStyle({
		classes: ["tip_image"],
	});
	var tip_desc_style = $.createStyle({
		classes: ["tip_desc"],
	});
	if(Ti.Platform.name == "android" )
	{
		var divide = 320 / 238;
		var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
		var fontSizeRatio = 238 / 13;
		var fontSize = Math.floor(pixelWidth / fontSizeRatio);
		tip_desc_style.font = { fontFamily:Alloy.Globals.MainFont, fontSize:fontSize.toString()+"px"};
	}
	var tip_text_style =  $.createStyle({
		classes: ["tip_text_view"],
	});
	
	for(var i = 0; i < tips_json.length; i++)
	{
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
}

$.tips.addEventListener('close', function(e){
});

$.tips.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.tips);
});

$.tips.addEventListener('androidback', function(e){
	$.tips.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.tips);
	Alloy.Globals.windowStack.splice(a,1);
});





