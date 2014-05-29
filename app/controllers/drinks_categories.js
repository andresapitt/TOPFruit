/*
 * 
 * 
 * Drinks categories display screen
 * 
 * 
 */

var drinks_categories_images = {
	whiskey: "images/category_images/whiskey.png", 
	vodka:"images/category_images/vodka.png", 
	champagne:"images/category_images/champ.png",
	rum:"images/category_images/rum.png", 
	gin:"images/category_images/gin.png", 
	generics:"images/category_images/generics.png", 
	classics:"images/category_images/malibu.png", 
	other:"images/category_images/other.png", 
	tequila:"images/category_images/tequila.png"
};

var drinks_json_text = ""; 
Alloy.Globals.Utils.GetAppData("/client/idl/perfect-mix/drinks/drinks/viewjson", "data/Drinks.txt", DisplayDrinks);

function DisplayDrinks(newJSON)
{
	var drinks_json;
	if(newJSON != null)
	{
		drinks_json = JSON.parse(newJSON);
	}
	else
	{
		drinks_json = JSON.parse(drinks_json_text);
	}
	
	var horizontal_drink_view_style = $.createStyle({
		classes: ["horizontal_drinks_nav_view"],
	});
	
	if(Ti.Platform.name == "android" )
	{
		var divide = 320 / 10;
		var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
		horizontal_drink_view_style.left = Math.floor(pixelWidth).toString() + "px";
		horizontal_drink_view_style.right = Math.floor(pixelWidth).toString() + "px";
		horizontal_drink_view_style.top = Math.floor(pixelWidth).toString() + "px";
		divide = 320 / 90;
		pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
		var resultAspectRatio = 120 / 90 ;
		var pixelHeight =  Math.floor(pixelWidth * resultAspectRatio);
		horizontal_drink_view_style.height =  Math.floor(pixelHeight).toString() + "px";
		Ti.API.info("row left " + horizontal_drink_view_style.left + ", height: " + horizontal_drink_view_style.right);
	}
	
	var single_drink_view_style = $.createStyle({
		classes: ["drink_single_view"],
	});
	
	if(Ti.Platform.name == "android" )
	{
		var divide = 320 / 90;
		var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
		single_drink_view_style.width = Math.floor(pixelWidth).toString() + "px";
		var resultAspectRatio = 120 / 90 ;
		var resultHeight =  Math.floor(pixelWidth * resultAspectRatio);
		single_drink_view_style.height = resultHeight.toString() + "px";
		divide = 320 / 5;
		pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
		single_drink_view_style.left = Math.floor(pixelWidth).toString() + "px";
		single_drink_view_style.right = Math.floor(pixelWidth).toString() + "px";
	}
	
	var single_drink_image_style = $.createStyle({
		classes: ["drink_image"],
	});
	if(Ti.Platform.name == "android" )
	{
		var divide = 320 / 90;
		var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
		single_drink_image_style.width = Math.floor(pixelWidth).toString() + "px";
		var resultAspectRatio = 95 / 90 ;
		var pixelheight =  Math.floor(pixelWidth * resultAspectRatio);
		single_drink_image_style.height = Math.floor(pixelheight).toString() + "px";
		single_drink_image_style.height.top = 0;
	}
	
	var single_drink_title_style = $.createStyle({
		classes: ["drink_title"],
	});
	
	if(Ti.Platform.name == "android" )
	{
		var divide = 320 / 90;
		var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
		var resultAspectRatio = 95 / 90 ;
		var pixelheight =  Math.floor(pixelWidth * resultAspectRatio);
		single_drink_title_style.top = Math.floor(pixelheight+2).toString() + "px";
		var fontSizeRatio = 90 / 14;
		var fontSize = Math.floor(pixelWidth / fontSizeRatio);
		single_drink_title_style.font = { fontFamily:Alloy.Globals.MainFont, fontSize:fontSize.toString()+"px"};
	}
	var single_drink_image_style_bottle = $.createStyle({
		classes: ["drink_image_bottle"],
	});
	if(Ti.Platform.name == "android" )
	{
		var divide = 320 / 90;
		var pixelWidth = Ti.Platform.displayCaps.platformWidth / divide;
		var resultAspectRatio = 95 / 90 ;
		var pixelheight =  Math.floor(pixelWidth * resultAspectRatio);
		single_drink_image_style_bottle.height = Math.floor(pixelheight).toString() + "px";
	}
	
	
	for(var i = 0; i < drinks_json.length; i += 3)
	{
		Ti.API.info("Drink " + i + " Title: " + drinks_json[i].Drink.title);
		var horizontal_drink_view = Ti.UI.createView();
		horizontal_drink_view.applyProperties(horizontal_drink_view_style);
		$.drink_types.add(horizontal_drink_view);
		
		for(y = i; y < i+3 && y < drinks_json.length; y++ )
		{
			Ti.API.info("Drink " + y + " Title: " + drinks_json[y].Drink.title);
			var single_drink_view = Ti.UI.createView();
			single_drink_view.applyProperties(single_drink_view_style);
			horizontal_drink_view.add(single_drink_view);
			if(Ti.Platform.name == "mobileweb" )
			{
				var drink_image = Ti.UI.createImageView({image:"./images/common/highlight_circle.png"});
			}
			else
			{
				var drink_image = Ti.UI.createImageView({image:"/images/common/highlight_circle.png"});
			}
			drink_image.applyProperties(single_drink_image_style);
			single_drink_view.add(drink_image);
			
			var overlay_drink_image = Alloy.Globals.Utils.RemoteImage({
			  image: drinks_json[y].Drink.image,
			  defaultImage:'images/category_images/generic.png',
			  height:Ti.UI.SIZE, 
			  width:Ti.UI.SIZE
			});
			if(Ti.Platform.name == "mobileweb" )
			{
				overlay_drink_image.defaultImage = "./images/category_images/generic.png";
			}
			overlay_drink_image.applyProperties(single_drink_image_style_bottle);
			single_drink_view.add(overlay_drink_image);
			
			
			var drink_single_label = Ti.UI.createLabel({text:drinks_json[y].Drink.title});
			drink_single_label.applyProperties(single_drink_title_style);
			single_drink_view.add(drink_single_label);
			
			if(drinks_json[y].Drink.subcategories.length <= 0){
				drinks_json[y].Drink.topCategory = true;
			}
			else
			{
				drinks_json[y].Drink.topCategory = false;
			}
			single_drink_view.drinkData = drinks_json[y].Drink;
			single_drink_view.addEventListener('click', openDrinks);
					
			//$.drink_types.add(single_drink_view);
		}
		
	}
}

function openDrinks(e){
	Ti.API.info("Drink selection made: " + e.source.drinkData.title );
	if(e.source.drinkData.subcategories.length <= 0){
		Ti.API.info('No drink sub category, open cocktail display');
		e.source.drinkData.topCategory = true;
		var resultsWin = Alloy.createController('cocktail_results',  e.source.drinkData ).getView();
		if(Ti.Platform.name == "android" )
		{
			resultsWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
		}
		else if(Ti.Platform.name == "mobileweb" )
		{
			resultsWin.open();
		}
		else
		{
    		Alloy.Globals.parent.openWindow(resultsWin);
    	}
	}
	else
	{
		Ti.API.info('There are drink sub categories, open more options');
		e.source.drinkData.topCategory = false;
		var sub_categoryWin = Alloy.createController('drinks_sub_category', e.source.drinkData ).getView();
		if(Ti.Platform.name == "android" )
		{
			sub_categoryWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
		}
		else if(Ti.Platform.name == "mobileweb" )
		{
			sub_categoryWin.open();
		}
		else
		{
    		Alloy.Globals.parent.openWindow(sub_categoryWin);
    	}
	}
}



function openSearch(e){
	var searchWin = Alloy.createController('search').getView();
	if(Ti.Platform.name == "android" )
	{
		searchWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else if(Ti.Platform.name == "mobileweb" )
	{
		searchWin.open();
	}
	else
	{
    	Alloy.Globals.parent.openWindow(searchWin);
	}
}

function closeWindow(e)
{
	var a = Alloy.Globals.windowStack.indexOf($.drinks_categories);
	Alloy.Globals.windowStack.splice(a,1);
	if(Ti.Platform.name == "android" )
	{
		$.drinks_categories.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else if(Ti.Platform.name == "mobileweb" )
	{
		$.drinks_categories.close();
	}
	else
	{
		$.drinks_categories.close();
	}
}

function goToHome(e)
{
	Alloy.Globals.goToHome(e);
}

$.drinks_categories.addEventListener('close', function(e){
});

$.drinks_categories.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.drinks_categories);
});

$.drinks_categories.addEventListener('androidback', function(e){
	$.drinks_categories.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.drinks_categories);
	Alloy.Globals.windowStack.splice(a,1);
});
