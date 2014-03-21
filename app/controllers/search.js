//var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/Drinks.txt");  
/*var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/Cocktails.txt");  
 
var drinks_json_text = ""; 
 
// If the file exists
if (readFile.exists()){  
	Ti.API.info("Cocktail json local text file exists");
	drinks_json_text = readFile.read();
}
else{
	alert("Cocktail json local text file not found");
}

displayCocktails();*/

//alert('search page opened');

Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/cocktails/cocktails/viewjson", "data/Cocktails.txt", displayCocktails);
var drinks_json_text = ""; 

function displayCocktails(newJSON)
{
	//$.search_table.addEventListener('click', openRecipe);
	var drinks_json;
	if(newJSON != null)
	{
		drinks_json = JSON.parse(newJSON);
	}
	else
	{
		drinks_json = JSON.parse(drinks_json_text);
	}
	
	
	for(var i = 0; i < drinks_json.length; i++)
	{
		Ti.API.info("Cocktail " + i + " Title: " + drinks_json[i].Cocktail.title);
	}
		
	drinks_json.sort(function(a, b) {
	    var textA = a.Cocktail.title.toUpperCase();
	    var textB = b.Cocktail.title.toUpperCase();
	    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});
		
	Ti.API.info("AFTER SORT ");
	for(var i = 0; i < drinks_json.length; i++)
	{
		Ti.API.info("Cocktail " + i + " Title: " + drinks_json[i].Cocktail.title);
	}
	
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
				Ti.API.info("Char active: " + nextChar);
			}
		}
		if(is_letter_active)
		{
			Ti.API.info("Adding table view: " + nextChar);
				//	$.brand_table.add(table_view_section);
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
	  		header_label.applyProperties(header_label_style);
	    	headerView.add(header_label);
	    	var bottomSeparator = Ti.UI.createView();
	    	var separator_style_bottom = $.createStyle({
	        	classes: ["table_separator", "bottom"],
	  		});
	  		bottomSeparator.applyProperties(separator_style_bottom);
	    	headerView.add(bottomSeparator);
	    	
	    //	var table_view_section = Ti.UI.createTableViewSection(/*{headerTitle:nextChar + " - header test" }*/);
	
		//	table_view_section.setHeaderView(headerView);
			var table_view_section = Ti.UI.createTableViewSection({headerView:headerView});
			
			
			
			var row_label_style = $.createStyle({
	        	classes: ["row_label"],
	  		});
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
					//is_letter_active = true;
					//Ti.API.info("Char active: " + nextChar);
					var brand_row = Ti.UI.createTableViewRow(/*{title:brands_json.brands[y].title}*/ {cocktail_name : drinks_json[y].Cocktail.title} );
					var brand_row_view = Ti.UI.createView();
					var brand_row_label = Ti.UI.createLabel({text:drinks_json[y].Cocktail.title.toUpperCase()});
					brand_row_label.applyProperties(row_label_style);
					brand_row_view.add(brand_row_label);
					
					//var brand_image = Ti.UI.createImageView({image:drinks_json.cocktails[y].search_thumb_url});
					
					var brand_image = Alloy.Globals.Utils.RemoteImage({
					  image: drinks_json[y].Cocktail.search_thumb_url,
					   defaultImage:'images/cocktails/glass.png'
					});
					
					brand_image.applyProperties(row_image_style);
					brand_row_view.add(brand_image);
					brand_row_view.applyProperties(row_view_style);
					brand_row.add(brand_row_view);
					brand_row.cocktailData = drinks_json[y].Cocktail;
					//brand_row.addEventListener('click', openRecipe);
					//brand_row.cocktail_name = drinks_json[y].Cocktail.title;
					if(Ti.Platform.name == "mobileweb" )
					{
						brand_row_view.cocktailData = drinks_json[y].Cocktail;
						brand_row.addEventListener('click', openRecipe);
					}
					table_view_section.add(brand_row);
				}
			}
			$.search_table.appendSection(table_view_section);
		}
	}
	
	
	//$.search_table.filterAttribute="cocktail_name";
	if(Ti.Platform.name != "mobileweb" )
	{
		$.search_table.addEventListener('click', openRecipe);
	}
}

function openRecipe(e){
	
	
	if(Ti.Platform.name == "android" )
	{
		Ti.API.info("Open detailed recipe! " + e.row.cocktailData.title);
		var recipeWin = Alloy.createController('cocktail_detailed', e.row.cocktailData).getView();
		recipeWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else if(Ti.Platform.name == "mobileweb" )
	{
		Ti.API.info("Open detailed recipe! " + e.source.cocktailData.title);
		var recipeWin = Alloy.createController('cocktail_detailed',  e.source.cocktailData).getView();
		recipeWin.open();
	}
	else
	{
		Ti.API.info("Open detailed recipe! " + e.row.cocktailData.title);
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

$.search.addEventListener('close', function(e){
	Ti.API.info("search closed");
	//var a = Alloy.Globals.windowStack.indexOf($.search);
	//Alloy.Globals.windowStack.splice(a,1);
});

$.search.addEventListener('open', function(e){
	Ti.API.info("search open");
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
