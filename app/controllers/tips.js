

var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/Tips.txt");  
 
var tips_json_text = ""; 
 
// If the file exists
if (readFile.exists()){  
	Ti.API.info("Tips json local text file exists");
	tips_json_text = readFile.read();
}
else{
	alert("Tips json local text file not found");
}

var tips_json = JSON.parse(tips_json_text);

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

for(var i = 0; i < tips_json.tips.length; i++)
{
	Ti.API.info("Tip " + i + " Title: " + tips_json.tips[i].title);
	
	var tip_item_view = Ti.UI.createView();
	tip_item_view.applyProperties(tip_item_style);
	
	var tip_text_view =  Ti.UI.createView();
	tip_text_view.applyProperties(tip_text_style);
	tip_item_view.add(tip_text_view);
	
	var tip_title_label = Ti.UI.createLabel({text: tips_json.tips[i].title.toUpperCase()});
	tip_title_label.applyProperties(tipt_title_style);
	tip_text_view.add(tip_title_label);
		
	var tip_desc_label = Ti.UI.createLabel({text:tips_json.tips[i].desc});
	tip_desc_label.applyProperties(tip_desc_style);
	tip_text_view.add(tip_desc_label);
	
	//var tip_image_view = Ti.UI.createImageView();
	//tip_image_view.image = "/images/placeholders/ph_events.png";
	//tip_image_view.applyProperties(tip_image_style);
	
	var tip_image_view = Alloy.Globals.Utils.RemoteImage({
	  image: tips_json.tips[i].image_thumb,
	  defaultImage:'/images/placeholders/ph_events.png'
	});
	tip_image_view.applyProperties(tip_image_style);
	tip_item_view.add(tip_image_view);
	
	
	
	$.tip_item_container.add(tip_item_view);
}

function closeWindow(e)
{
	$.tips.close();
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

$.tips.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.tips);
	Alloy.Globals.windowStack.splice(a,1);
});

$.tips.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.tips);
});
