Ti.API.info("In cocktails result section");

var args = arguments[0] || {};
var cocktail_category = args.id || 'Category not received';
//$.recipeTitle.text = args.title || 'Title not received';
Ti.API.info("Cocktail category: " + cocktail_category);
var isTopCategory = true;
if(cocktail_category != "favourites")
{
	$.cocktail_results.title = args.title.toUpperCase();
	if(Ti.Platform.name == "android" )
	{
		$.cocktail_results_page_title.text = args.title.toUpperCase();
	}
	Ti.API.info("is this a top category? " + args.topCategory);
	isTopCategory = args.topCategory;
}
else if(cocktail_category == "favourites")
{
	$.cocktail_results.title = "FAVOURITES";
	if(Ti.Platform.name == "android" )
	{
		$.cocktail_results_page_title.text = "FAVOURITES";
	}
}

var rel_cocktails = [];
var cocktailViews = [];
var drinks_json_text = ""; 
Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/cocktails/cocktails/viewjson", "data/Cocktails.txt", displayCocktails);


/*
var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/Cocktails.txt");  
 
var drinks_json_text = ""; 
 
// If the file exists
if (readFile.exists()){  
	Ti.API.info("Drinks json local text file exists");
	drinks_json_text = readFile.read();
}
else{
	alert("Drinks json local text file not found");
}
*/


//displayCocktails();
	
function displayCocktails(newJSON)
	{
	//var drinks_json = JSON.parse(drinks_json_text);
	//var all_cocktails = drinks_json.cocktails;
	
	var all_cocktails;
	if(newJSON != null)
	{
		all_cocktails = JSON.parse(newJSON);
	}
	else
	{
		all_cocktails = JSON.parse(drinks_json_text);
	}
	
	var result_item_view_style = $.createStyle({
		classes: ["result_item"],
	});
	var horizontal_results_view_style = $.createStyle({
		classes: ["horizontal_results_nav_view"],
	});
	
	var result_item_title_style = $.createStyle({
		classes: ["result_title"],
	});
	
	//if not favourites 
	if(cocktail_category != "favourites")
	{
		for(var i = 0; i < all_cocktails.length; i++)
		{
			Ti.API.info("Cocktail " + i + " Title: " + all_cocktails[i].Cocktail.title);
			if(!isTopCategory)
			{
				for(var y = 0; y < all_cocktails[i].Cocktail.subcategories.length; y++)
				{
					if(cocktail_category == all_cocktails[i].Cocktail.subcategories[y].Subcategory.id)
					{
						Ti.API.info("match is true for cocktail: " + all_cocktails[i].Cocktail.title);
						rel_cocktails.push(all_cocktails[i].Cocktail);
					}
				}
			}
			else
			{
				for(var y = 0; y < all_cocktails[i].Cocktail.drinks.length; y++)
				{
					if(cocktail_category == all_cocktails[i].Cocktail.drinks[y].Drink.id)
					{
						Ti.API.info("match is true for cocktail: " + all_cocktails[i].Cocktail.title);
						rel_cocktails.push(all_cocktails[i].Cocktail);
					}
				}
			}
		}
	}
	else
	{
		Ti.API.info("favourites display");
		
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
					if( all_cocktails[y].Cocktail.id == currentFavs[i].id)
					{
						Ti.API.info("Fav cocktail: " + all_cocktails[y].title);
						rel_cocktails.push(all_cocktails[y].Cocktail);
					}
				}
			}
		}
	}
	
	
	if(rel_cocktails.length > 0 )
	{
		Ti.API.info("relevant cocktail count: " + rel_cocktails.length);
		
		var cocktail_image_style_bottle = $.createStyle({
			classes: ["cocktail_image_glass"],
		});
		var cocktail_item_white_banner_style = $.createStyle({
			classes: ["white_banner"],
		});
		
		
		for(var i = 0; i < rel_cocktails.length; i += 2)
		{
			var horizontal_results_view = Ti.UI.createView();
			horizontal_results_view.applyProperties(horizontal_results_view_style);
			$.drink_results.add(horizontal_results_view);
			
			for(y = i; y < i+2 && y < rel_cocktails.length; y++ )
			{
				var single_result_item_view = Ti.UI.createView();
				single_result_item_view.applyProperties(result_item_view_style);
				
				/*var cocktail_image = Ti.UI.createImageView({image:"images/cocktails/glass.png"});
				cocktail_image.applyProperties(cocktail_image_style_bottle);
				single_result_item_view.add(cocktail_image);*/
				
				var cocktail_image = Alloy.Globals.Utils.RemoteImage({
				  image: rel_cocktails[y].image_thumb,
				  defaultImage:'images/cocktails/glass.png'
				});
				cocktail_image.applyProperties(cocktail_image_style_bottle);
				single_result_item_view.add(cocktail_image);
				
				var result_bottom_container = Ti.UI.createView();
				result_bottom_container.height = Ti.UI.SIZE;
				result_bottom_container.width = Ti.UI.FILL;
				result_bottom_container.bottom = "0dp";
				result_bottom_container.touchEnabled = false;
				single_result_item_view.add(result_bottom_container);
				
				var banner_bottom_view = Ti.UI.createView();
				banner_bottom_view.applyProperties(cocktail_item_white_banner_style);
				result_bottom_container.add(banner_bottom_view);
				
				var result_item_title = Ti.UI.createLabel({text:rel_cocktails[y].title.toUpperCase()});
				result_item_title.applyProperties(result_item_title_style);
				result_bottom_container.add(result_item_title);
				
				
				single_result_item_view.cocktailData = rel_cocktails[y];
				single_result_item_view.addEventListener('click', openRecipeDetailed);
				
				
				if(cocktail_category == "favourites")
				{
					var broken_heart_style = $.createStyle({
						classes: ["fav_heart_style"],
					});
					single_result_item_view.ID = rel_cocktails[y].id;
					var brokenHeart_image = Ti.UI.createImageView();
					brokenHeart_image.image = "/images/favs/heart_broken.png";
					brokenHeart_image.applyProperties(broken_heart_style);
					single_result_item_view.broken_heart_image = brokenHeart_image;
					single_result_item_view.add(brokenHeart_image);
				}
				cocktailViews.push(single_result_item_view);
				
				horizontal_results_view.add(single_result_item_view);
			}
		}
	}
	else
	{
		Ti.API.info("No relevant cocktails found");
		var no_results_style = $.createStyle({
			classes: ["no_results"],
		});
		
		var no_results_title_style = $.createStyle({
			classes: ["no_results_title"],
		});
		
		var no_result_item_view = Ti.UI.createView();
		no_result_item_view.applyProperties(no_results_style);
		
		var result_item_title = Ti.UI.createLabel({text:"Sorry, no results were found. \nPlease try another category."});
		result_item_title.applyProperties(no_results_title_style);
		no_result_item_view.add(result_item_title);
				
		$.drink_results.add(no_result_item_view);
	}
	
	
	$.cocktail_results.addEventListener('focus', function(e){
		if(cocktail_category == "favourites")
		{
			Ti.API.info("favourites page has regained focus");
			var currentFavs = Titanium.App.Properties.getList('favs', new Array());
			for(var i = 0; i < cocktailViews.length; i ++)
			{
				Ti.API.info("Fav cocktail View: " + i);
				if(currentFavs.length == 0)
				{
					Ti.API.info("Fav cocktail View: " + i + " no longer a favourite" );
					//cocktailViews[i].broken_heart_image.image = "/images/favs/heart_broken.png";
					var animation = Titanium.UI.createAnimation();
					animation.opacity = 0.5;
					animation.duration = 300;
					animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
					cocktailViews[i].broken_heart_image.animate(animation);
				}
				else
				{
					Ti.API.info(currentFavs.length + " favourites found");
					var isFav = false;
					for(var y = 0; y < currentFavs.length; y ++)
					{
						if( cocktailViews[i].ID == currentFavs[y].id)
						{
							Ti.API.info("Cocktail View: " + i + " is a fav");
							//cocktailViews[i].broken_heart_image.opacity = 0;
							var animation = Titanium.UI.createAnimation();
							animation.opacity = 0;
							animation.duration = 300;
							animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN;
							cocktailViews[i].broken_heart_image.animate(animation);
							isFav = true;
						}
					}
					if(!isFav)
					{
						Ti.API.info("Fav cocktail View: " + i + " no longer a favourite" );
						//cocktailViews[i].broken_heart_image.image = "/images/favs/heart_broken.png";
						var animation = Titanium.UI.createAnimation();
						animation.opacity = 0.5;
						animation.duration = 300;
						animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
						cocktailViews[i].broken_heart_image.animate(animation);
					}
				}
			}
		}
	});
	
	
}

function openRecipeDetailed(e){
	Ti.API.info("Open detailed recipe! " + e.source.cocktailData.title);
	
	var recipeWin = Alloy.createController('cocktail_detailed', e.source.cocktailData).getView();
	if(Ti.Platform.name == "android" )
	{
		recipeWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else
	{
   		Alloy.Globals.parent.openWindow(recipeWin);
	}
    
}




function closeWindow(e)
{
	if(Ti.Platform.name == "android" )
	{
		$.cocktail_results.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.cocktail_results.close();
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

$.cocktail_results.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.cocktail_results);
	Alloy.Globals.windowStack.splice(a,1);
});

$.cocktail_results.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.cocktail_results);
});

$.cocktail_results.addEventListener('androidback', function(e){
	$.cocktail_results.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
});
