//$.drinks_sub_category.title = "I'm a page title! :P";

var sub_category = arguments[0] || {};

var cocktail_category = sub_category.ID || 'Category not received';
//$.recipeTitle.text = args.title || 'Title not received';
Ti.API.info("Cocktail category: " + cocktail_category);

$.drinks_sub_category.title = sub_category.title.toUpperCase();

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

var single_drink_image_style_bottle = $.createStyle({
	classes: ["drink_image_bottle"],
});


for(var i = 0; i < sub_category.subcategories.length; i += 3)
{
	//Ti.API.info("Sub-category: " + i + ", title: " + sub_category.subcategories[i].title);
	
	var horizontal_drink_view = Ti.UI.createView();
	horizontal_drink_view.applyProperties(horizontal_drink_view_style);
	$.drink_types_sub.add(horizontal_drink_view);
	
	for(y = i; y < i+3 && y < sub_category.subcategories.length; y++ )
	{
		Ti.API.info("Drink " + y + " Title: " + sub_category.subcategories[y].title);
		var single_drink_view = Ti.UI.createView();
		single_drink_view.applyProperties(single_drink_view_style);
		horizontal_drink_view.add(single_drink_view);
		
		var drink_image = Ti.UI.createImageView({image:"images/common/highlight_circle.png"});
		drink_image.applyProperties(single_drink_image_style);
		single_drink_view.add(drink_image);
		
		/*
		var overlay_drink_image = Ti.UI.createImageView();
		overlay_drink_image.applyProperties(single_drink_image_style_bottle);
		
		if( Ti.Platform.displayCaps.density == 'high')
		{
	    	var image_url = sub_category.subcategories[y].image_thumb;
	    	var basename = image_url.replace(/\\/g,'/').replace( /.*\//, '' );
            var segment = basename.split('.');
            image_url = image_url.replace(basename, segment[0]+'@2x.'+segment[1]);
            Ti.API.info("full image path: " + image_url);
            overlay_drink_image.image =	image_url;
	    }
	    else{
			overlay_drink_image.image =	sub_category.subcategories[y].image_thumb;
	    }
	    
		overlay_drink_image.defaultImage = "images/category_images/generic.png";	
		*/
		
		var overlay_drink_image = Alloy.Globals.Utils.RemoteImage({
		  image: sub_category.subcategories[y].image_thumb,
		  defaultImage:'images/category_images/generic.png'
		});
		overlay_drink_image.applyProperties(single_drink_image_style_bottle);
		
		single_drink_view.add(overlay_drink_image);
		
		var drink_single_label = Ti.UI.createLabel({text:sub_category.subcategories[y].title});
		drink_single_label.applyProperties(single_drink_title_style);
		single_drink_view.add(drink_single_label);
		
		single_drink_view.drinkData = sub_category.subcategories[y];
		single_drink_view.addEventListener('click', openDrinks);
	}
}

function openDrinks(e){
	Ti.API.info("Drink selection made: " + e.source.drinkData.title );

	var resultsWin = Alloy.createController('cocktail_results',  e.source.drinkData ).getView();
	Alloy.Globals.parent.openWindow(resultsWin);

}


function closeWindow(e)
{
	$.drinks_sub_category.close();
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

$.drinks_sub_category.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.drinks_sub_category);
	Alloy.Globals.windowStack.splice(a,1);
});

$.drinks_sub_category.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.drinks_sub_category);
});
