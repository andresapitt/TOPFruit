/*
 * 
 * Brand List Screen 
 * Accessed via the 'Our Brands' button in the main menu
 * 
 */

Alloy.Globals.Utils.GetAppData("/client/idl/perfect-mix/brands/brands/viewjson", "data/Brands.txt", DisplayBrands);
var brands_json_text = ""; 

function DisplayBrands(newJSON)
{
	var brands_json;
	
	if(newJSON != null)
	{
		brands_json = JSON.parse(newJSON);
	}
	else
	{
		brands_json = JSON.parse(brands_json_text);
	}
	
	for(var i = 0; i < brands_json.length; i++)
	{
		Ti.API.info("Brand " + i + " Title: " + brands_json[i].Brand.title);
	}

	brands_json.sort(function(a, b) {
	    var textA = a.Brand.title.toUpperCase();
	    var textB = b.Brand.title.toUpperCase();
	    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});
		
	Ti.API.info("AFTER SORT ");
	for(var i = 0; i < brands_json.length; i++)
	{
		Ti.API.info("Brand " + i + " Title: " + brands_json[i].Brand.title);
	}
	
	//iterate through alphabet and see what letters are active
	var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for(var i=0; i<str.length; i++)
	{
		var is_letter_active = false;
		var nextChar = str.charAt(i);
		for(var y = 0; y < brands_json.length; y++)
		{
			var first_char_brand = brands_json[y].Brand.title.charAt(0);
			if(nextChar == first_char_brand)
			{
				is_letter_active = true;
				Ti.API.info("Char active: " + nextChar);
			}
		}
		if(is_letter_active)
		{
			Ti.API.info("Adding table view: " + nextChar);
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
	    	var table_view_section = Ti.UI.createTableViewSection({headerView:headerView});
	
			//table_view_section.setHeaderView(headerView);
			
			
			var row_label_style = $.createStyle({
	        	classes: ["row_label"],
	  		});
	  		var row_view_style = $.createStyle({
	        	classes: ["row_view"],
	  		});
	  		var row_image_style = $.createStyle({
	        	classes: ["row_brand_image"],
	  		});
			
			for(var y = 0; y < brands_json.length; y++)
			{
				var first_char_brand = brands_json[y].Brand.title.charAt(0);
				if(nextChar == first_char_brand)
				{
					var brand_row = Ti.UI.createTableViewRow(/*{title:brands_json.brands[y].title}*/ {brand_name:brands_json[y].Brand.title});
					brand_row.brand_data = brands_json[y].Brand;
					var brand_row_view = Ti.UI.createView();
					var brand_row_label = Ti.UI.createLabel({text:brands_json[y].Brand.title.toUpperCase()});
					brand_row_label.applyProperties(row_label_style);
					brand_row_view.add(brand_row_label);
					
					var brand_image = Alloy.Globals.Utils.RemoteImage({
				  		image: brands_json[y].Brand.thumb_image_url,
				  	//	defaultImage:'images/cocktails/glass.png'
					});
					brand_image.applyProperties(row_image_style);
					brand_row_view.add(brand_image);
					brand_row_view.applyProperties(row_view_style);
					brand_row.add(brand_row_view);
					brand_row.brand_name = brands_json[y].Brand.title;
					if(Ti.Platform.name == "mobileweb" )
					{
						brand_row_view.brand_data = brands_json[y].Brand;
						brand_row.addEventListener('click', openBrand);
					}
					table_view_section.add(brand_row);
				}
			}
			
			$.brand_table.appendSection(table_view_section);
			
		}
	}
	
	if(Ti.Platform.name != "mobileweb" )
	{
		$.brand_table.addEventListener('click', openBrand);
	}
	
	function openBrand(e){
		
		if(Ti.Platform.name == "android" )
		{
			var brand_desc_Win = Alloy.createController('brand_desc', e.row.brand_data).getView();
			brand_desc_Win.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
		}
		else if(Ti.Platform.name == "mobileweb" )
		{
			var brand_desc_Win = Alloy.createController('brand_desc', e.source.brand_data).getView();
			brand_desc_Win.open();
		}
		else
		{
			var brand_desc_Win = Alloy.createController('brand_desc', e.row.brand_data).getView();
	    	Alloy.Globals.parent.openWindow(brand_desc_Win);
		}
	}
}

function closeWindow(e)
{
	var a = Alloy.Globals.windowStack.indexOf($.brands);
	Alloy.Globals.windowStack.splice(a,1);
	if(Ti.Platform.name == "android" )
	{
		$.brands.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.brands.close();
	}
}

function goToHome(e)
{
	Alloy.Globals.goToHome(e);
}

$.brands.addEventListener('close', function(e){
});

$.brands.addEventListener('open', function(e){
	if(Ti.Platform.name != "mobileweb")
	{
		$.searchbar.blur();
	}
	
	Alloy.Globals.windowStack.push($.brands);
	
});

$.brands.addEventListener('androidback', function(e){
	$.brands.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.brands);
	Alloy.Globals.windowStack.splice(a,1);
});
