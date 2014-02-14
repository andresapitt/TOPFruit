
var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/Drinks.txt");  
 
var drinks_json_text = ""; 
 
// If the file exists
if (readFile.exists()){  
	Ti.API.info("Drinks json local text file exists");
	drinks_json_text = readFile.read();
}
else{
	alert("Drinks json local text file not found");
}

var drinks_json = JSON.parse(drinks_json_text);
var all_cocktails = drinks_json.cocktails;
var rel_cocktails = [];

var currentFavs = Titanium.App.Properties.getList('favs', new Array());
if(currentFavs.length == 0)
{
	Ti.API.info("No favourites found");
}
else
{
	Ti.API.info(currentFavs.length + " favourites found");
	for(var i = 0; i < currentFavs.length; i ++)
	{
		for(var y = 0; y < all_cocktails.length; y++)
		{
			//Ti.API.info("Cocktail " + y + " Title: " + all_cocktails[y].title);
			var isMatch = false;
			if( all_cocktails[y].ID == currentFavs[i].id)
			{
				Ti.API.info("Fav cocktail: " + all_cocktails[y].title);
				rel_cocktails.push(all_cocktails[y]);
			}
		}
	}
}

if( rel_cocktails.length > 0)
{
	Ti.API.info("relevant cocktail count: " + rel_cocktails.length);
	
	var cocktail_image_style_bottle = $.createStyle({
		classes: ["cocktail_image_glass"],
	});
	var cocktail_item_white_banner_style = $.createStyle({
		classes: ["white_banner"],
	});
	
	
}
else
{
	Ti.API.info("No favourites found");
}


function closeWindow(e)
{
	$.drinks_favourites.close();
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

$.drinks_favourites.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.drinks_favourites);
	Alloy.Globals.windowStack.splice(a,1);
});

$.drinks_favourites.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.drinks_favourites);
});
