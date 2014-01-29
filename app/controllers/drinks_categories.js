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

var horizontal_drink_view_style = $.createStyle({
	classes: ["horizontal_drinks_nav_view"],
});
var single_drink_view_style = $.createStyle({
	classes: ["drink_single_view"],
});
var single_drink_image_style = $.createStyle({
	classes: ["drink_image"],
});
var single_drink_title_style = $.createStyle({
	classes: ["drink_title"],
});


for(var i = 0; i < drinks_json.drinks.length; i += 3)
{
	Ti.API.info("Drink " + i + " Title: " + drinks_json.drinks[i].title);
	var horizontal_drink_view = Ti.UI.createView();
	horizontal_drink_view.applyProperties(horizontal_drink_view_style);
	$.drink_types.add(horizontal_drink_view);
	
	for(y = i; y < i+3 && y < drinks_json.drinks.length; y++ )
	{
		Ti.API.info("Drink " + y + " Title: " + drinks_json.drinks[y].title);
		var single_drink_view = Ti.UI.createView();
		single_drink_view.applyProperties(single_drink_view_style);
		horizontal_drink_view.add(single_drink_view);
		
		var drink_image = Ti.UI.createImageView();
		drink_image.applyProperties(single_drink_image_style);
		single_drink_view.add(drink_image);
		
		var drink_single_label = Ti.UI.createLabel({text:drinks_json.drinks[y].title});
		drink_single_label.applyProperties(single_drink_title_style);
		single_drink_view.add(drink_single_label);
		
		single_drink_view.drinkData = drinks_json.drinks[y];
		single_drink_view.addEventListener('click', openDrinks);
				
		//$.drink_types.add(single_drink_view);
	}
	
}

function openDrinks(e){
	Ti.API.info("Drink selection made: " + e.source.drinkData.title );
	if(e.source.drinkData.subcategories.length <= 0){
		Ti.API.info('No drink sub category, open cocktail display');
		var resultsWin = Alloy.createController('cocktail_results', { category : e.source.drinkData.ID }).getView();
    	Alloy.Globals.parent.openWindow(resultsWin);
	}
	else
	{
		Ti.API.info('There are drink sub categories, open more options');
	}
}



function openSearch(e){
	var searchWin = Alloy.createController('search').getView();
    Alloy.Globals.parent.openWindow(searchWin);
}

function closeWindow(e)
{
	$.drinks_categories.close();
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

$.drinks_categories.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.drinks_categories);
	Alloy.Globals.windowStack.splice(a,1);
});

$.drinks_categories.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.drinks_categories);
});
