/*
 * 
 * Cocktails search page
 * Allows the user to search for a cocktail by entering search text
 * 
 */

Alloy.Globals.Utils.GetAppData("/client/idl/perfect-mix/cocktails/cocktails/viewjson", "data/Cocktails.txt", displayCocktails);
var drinks_json_text = ""; 

function displayCocktails(newJSON)
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
	
	drinks_json.sort(function(a, b) {
	    var textA = a.Cocktail.title.toUpperCase();
	    var textB = b.Cocktail.title.toUpperCase();
	    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});

	//iterate through alphabet and see what letters are active
	var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for(var i=0; i<str.length; i++)
	{
		var is_letter_active = false;
		var nextChar = str.charAt(i);
		//Ti.API.info(" alphbet loop: " + nextChar);
		for(var y = 0; y < drinks_json.length; y++)
		{
			var first_char_brand = drinks_json[y].Cocktail.title.charAt(0);
			if(nextChar == first_char_brand)
			{
				is_letter_active = true;
			}
		}
		if(is_letter_active)
		{
			var hasFirstBeenAdded = false;
			var headerView = Ti.UI.createView();
			var style = $.createStyle({
	        	classes: ["table_header"],
	  		});
	    	headerView.applyProperties(style);
	    	var topSeparator = Ti.UI.createView();
	    	var separator_style_top = $.createStyle({
	        	classes: ["table_separator", "top"],
	  		});
	  		topSeparator.applyProperties(separator_style_top);
	    	headerView.add(topSeparator);
	    	var header_label = Ti.UI.createLabel({text: nextChar});
	    	var header_label_style = $.createStyle({
	        	classes: ["table_header_label"],
	  		});
	  		if(Ti.Platform.name == "android"){
				var fontSizeRatio = 320 / 16;
				var fontSize = Math.floor(Ti.Platform.displayCaps.platformWidth  / fontSizeRatio);
				header_label_style.font = { fontFamily:Alloy.Globals.BoldFont, fontSize:fontSize.toString()+"px"};
	  		}
	  		header_label.applyProperties(header_label_style);
	    	headerView.add(header_label);
	    	var bottomSeparator = Ti.UI.createView();
	    	var separator_style_bottom = $.createStyle({
	        	classes: ["table_separator", "bottom"],
	  		});
	  		bottomSeparator.applyProperties(separator_style_bottom);
	    	headerView.add(bottomSeparator);
	    	
			var table_view_section = Ti.UI.createTableViewSection({headerView:headerView});
			
			var row_label_style = $.createStyle({
	        	classes: ["row_label"],
	  		});
	  		if(Ti.Platform.name == "android"){
				var fontSizeRatio = 320 / 14;
				var fontSize = Math.floor(Ti.Platform.displayCaps.platformWidth  / fontSizeRatio);
				row_label_style.font = { fontFamily:Alloy.Globals.BoldFont, fontSize:fontSize.toString()+"px"};
	  		}
	  		var row_view_style = $.createStyle({
	        	classes: ["row_view"],
	  		});
	  		var row_image_style = $.createStyle({
	        	classes: ["row_brand_image"],
	  		});
			
			for(var y = 0; y < drinks_json.length; y++)
			{
				var first_char_brand = drinks_json[y].Cocktail.title.charAt(0);
				if(nextChar == first_char_brand)
				{
					var brand_row = Ti.UI.createTableViewRow(/*{title:brands_json.brands[y].title}*/ {cocktail_name : drinks_json[y].Cocktail.title} );
					var brand_row_view = Ti.UI.createView();
					var brand_row_label = Ti.UI.createLabel({text:drinks_json[y].Cocktail.title.toUpperCase()});
					brand_row_label.applyProperties(row_label_style);
					brand_row_view.add(brand_row_label);
					
					var brand_image = Alloy.Globals.Utils.RemoteImage({
					  image: drinks_json[y].Cocktail.search_thumb_url,
					   defaultImage:'images/cocktails/glass.png'
					});
					
					brand_image.applyProperties(row_image_style);
					brand_row_view.add(brand_image);
				
					brand_row_view.applyProperties(row_view_style);
					brand_row.add(brand_row_view);
					brand_row.cocktailData = drinks_json[y].Cocktail;
					if(Ti.Platform.name == "mobileweb" )
					{
						brand_row_view.cocktailData = drinks_json[y].Cocktail;
						brand_row.addEventListener('click', openRecipe);
					}
					//Ti.API.info("about to add border: " + hasFirstBeenAdded.toString());
					if(Ti.Platform.name == "android" && hasFirstBeenAdded == true)
					{
						Ti.API.info("I'm adding bottom seperator");
						var bottomSeparator = Ti.UI.createView();
				    	var separator_style_bottom = $.createStyle({
				        	classes: ["table_separator", "top"],
				  		});
				  		bottomSeparator.applyProperties(separator_style_bottom);
				    	brand_row.add(bottomSeparator);
					}
					table_view_section.add(brand_row);
					hasFirstBeenAdded = true;
				}
			}
			$.search_table.appendSection(table_view_section);
		}
	}
	
	if(Ti.Platform.name != "mobileweb" )
	{
		$.search_table.addEventListener('click', openRecipe);
	}
}

function openRecipe(e){
	
	if(Ti.Platform.name == "android" )
	{
		var recipeWin = Alloy.createController('cocktail_detailed', e.row.cocktailData).getView();
		recipeWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else if(Ti.Platform.name == "mobileweb" )
	{
		var recipeWin = Alloy.createController('cocktail_detailed',  e.source.cocktailData).getView();
		recipeWin.open();
	}
	else
	{
		var recipeWin = Alloy.createController('cocktail_detailed', e.row.cocktailData).getView();
    	Alloy.Globals.parent.openWindow(recipeWin);
    }
}

function closeWindow(e)
{
	var a = Alloy.Globals.windowStack.indexOf($.search);
	Alloy.Globals.windowStack.splice(a,1);
	if(Ti.Platform.name == "android" )
	{
		$.search.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.search.close();
	}
}

function goToHome(e)
{
	Alloy.Globals.goToHome(e);
}

$.search.addEventListener('close', function(e){
});

$.search.addEventListener('open', function(e){
	if(Ti.Platform.name != "mobileweb")
	{
		$.searchbar.blur();
	}
	Alloy.Globals.windowStack.push($.search);
});

$.search.addEventListener('androidback', function(e){
	$.search.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.search);
	Alloy.Globals.windowStack.splice(a,1);
});
