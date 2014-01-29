var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/Drinks.txt");  
 
var drinks_json_text = ""; 
 
// If the file exists
if (readFile.exists()){  
	Ti.API.info("Cocktail json local text file exists");
	drinks_json_text = readFile.read();
}
else{
	alert("Cocktail json local text file not found");
}

var drinks_json = JSON.parse(drinks_json_text);

Ti.API.info("Cocktail json: " + drinks_json);
Ti.API.info("Cocktail json brands: " + drinks_json.cocktails);
Ti.API.info("Cocktail json length: " + drinks_json.cocktails.length);

for(var i = 0; i < drinks_json.cocktails.length; i++)
{
	Ti.API.info("Cocktail " + i + " Title: " + drinks_json.cocktails[i].title);
}
	
drinks_json.cocktails.sort(function(a, b) {
    var textA = a.title.toUpperCase();
    var textB = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
	
Ti.API.info("AFTER SORT ");
for(var i = 0; i < drinks_json.cocktails.length; i++)
{
	Ti.API.info("Cocktail " + i + " Title: " + drinks_json.cocktails[i].title);
}

//iterate through alphabet and see what letters are active
var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for(var i=0; i<str.length; i++)
{
	var is_letter_active = false;
	var nextChar = str.charAt(i);
	//Ti.API.info(" alphbet loop: " + nextChar);
	for(var y = 0; y < drinks_json.cocktails.length; y++)
	{
		var first_char_brand = drinks_json.cocktails[y].title.charAt(0);
		if(nextChar == first_char_brand)
		{
			is_letter_active = true;
			Ti.API.info("Char active: " + nextChar);
		}
	}
	if(is_letter_active)
	{
		Ti.API.info("Adding table view: " + nextChar);
		var table_view_section = Ti.UI.createTableViewSection(/*{headerTitle:nextChar + " - header test" }*/);
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
		table_view_section.setHeaderView(headerView);
		$.search_table.appendSection(table_view_section);
		
		var row_label_style = $.createStyle({
        	classes: ["row_label"],
  		});
  		var row_view_style = $.createStyle({
        	classes: ["row_view"],
  		});
  		var row_image_style = $.createStyle({
        	classes: ["row_brand_image"],
  		});
		
		for(var y = 0; y < drinks_json.cocktails.length; y++)
		{
			var first_char_brand = drinks_json.cocktails[y].title.charAt(0);
			if(nextChar == first_char_brand)
			{
				//is_letter_active = true;
				//Ti.API.info("Char active: " + nextChar);
				var brand_row = Ti.UI.createTableViewRow(/*{title:brands_json.brands[y].title}*/);
				var brand_row_view = Ti.UI.createView();
				var brand_row_label = Ti.UI.createLabel({text:drinks_json.cocktails[y].title.toUpperCase()});
				brand_row_label.applyProperties(row_label_style);
				brand_row_view.add(brand_row_label);
				var brand_image = Ti.UI.createImageView({image:drinks_json.cocktails[y].search_thumb_url});
				brand_image.applyProperties(row_image_style);
				brand_row_view.add(brand_image);
				brand_row_view.applyProperties(row_view_style);
				brand_row.add(brand_row_view);
				brand_row.cocktail_name = drinks_json.cocktails[y].title;
				table_view_section.add(brand_row);
			}
		}
	}
}


$.search_table.filterAttribute="cocktail_name";

function closeWindow(e)
{
	$.search.close();
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

$.search.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.search);
	Alloy.Globals.windowStack.splice(a,1);
});

$.search.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.search);
});