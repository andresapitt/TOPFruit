//$.drinks_sub_category.title = "I'm a page title! :P";

var sub_category = arguments[0] || {};

var cocktail_category = sub_category.id || 'Category not received';
//$.recipeTitle.text = args.title || 'Title not received';
Ti.API.info("Cocktail category: " + cocktail_category);

$.drinks_sub_category.title = sub_category.title.toUpperCase();

if(Ti.Platform.name == "android" )
{
	$.drinks_sub_category_page_title.text = sub_category.title.toUpperCase();
}

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

Ti.API.info('subcategories length: ' + sub_category.subcategories.length);
for(var i = 0; i < sub_category.subcategories.length; i += 3)
{
	Ti.API.info("Sub-category: " + i + ", title: " + sub_category.subcategories[i].Subcategory.title);
	
	var horizontal_drink_view = Ti.UI.createView();
	horizontal_drink_view.applyProperties(horizontal_drink_view_style);
	$.drink_types_sub.add(horizontal_drink_view);
	
	for(var y = i; y < i+3 && y < sub_category.subcategories.length; y++ )
	{
		Ti.API.info("Drink " + y + " Title: " + sub_category.subcategories[y].Subcategory.title);
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
		  image: sub_category.subcategories[y].Subcategory.image,
		  defaultImage:'images/category_images/generic.png'
		});
		overlay_drink_image.applyProperties(single_drink_image_style_bottle);
		
		single_drink_view.add(overlay_drink_image);
		
		var drink_single_label = Ti.UI.createLabel({text:sub_category.subcategories[y].Subcategory.title});
		drink_single_label.applyProperties(single_drink_title_style);
		single_drink_view.add(drink_single_label);
		
		sub_category.subcategories[y].Subcategory.topCategory = false;
		single_drink_view.drinkData = sub_category.subcategories[y].Subcategory;
		single_drink_view.addEventListener('click', openDrinks);
	}
}


if(sub_category.facebook == null || sub_category.facebook == "")
{
	$.social_hor_view_subcategory.remove($.facebookParent_subcategory);
}
else
{
	$.facebookParent_subcategory.addEventListener('click', function(e)
	{
		if (Titanium.Platform.name == 'iPhone OS') {
			Ti.API.info("facebook home button clicked");
			var canOpenFacebook = Ti.Platform.canOpenURL("fb://profile/"+sub_category.facebook);
			if(canOpenFacebook)
			{
				Ti.Platform.openURL("fb://profile/"+sub_category.facebook);
			}
			else{
				//alert("The facebook app must be installed to open this link.");
				Ti.Platform.openURL("http://www.facebook.com/"+sub_category.facebook);
			}
		}
		else if (Titanium.Platform.name == 'android'){
			var canOpen = Ti.Platform.openURL("fb://profile/"+sub_category.facebook);
			
			if(canOpen == false)
			{
					var dialog = Ti.UI.createAlertDialog({
					    message: "Sorry, you must first have the facebook app installed on this device to click this button.",
					    ok: 'Ok, thanks!',
					    title: 'Facebook Error'
					  }).show();
			}
		}
	});
	
}

if(sub_category.twitter == null || sub_category.twitter == "")
{
	$.social_hor_view_subcategory.remove($.twitterParent_subcategory);
}
else
{
	$.twitterParent_subcategory.addEventListener('click', function(e){
		if (Titanium.Platform.name == 'iPhone OS') {
			Ti.API.info("twitter home button clicked");
			var canOpenTwitter = Ti.Platform.canOpenURL("twitter:///user?id="+sub_category.twitter);
			Ti.API.info("twitter home button clicked");
			
			if(canOpenTwitter)
			{
				Ti.Platform.openURL("twitter:///user?id="+sub_category.twitter);
			}
			else{
				alert("The twitter app must be installed to open this link.");
			}
		}
		else if (Titanium.Platform.name == 'android'){
			var canOpen = Ti.Platform.openURL("twitter://user?user_id="+sub_category.twitter);
			if(canOpen == false)
			{
					var dialog = Ti.UI.createAlertDialog({
					    message: "Sorry, you must first have the twitter app installed on this device to click this button.",
					    ok: 'Ok, thanks!',
					    title: 'Twitter Error'
					  }).show();
			}
		}
	});
}


function openDrinks(e){
	Ti.API.info("Drink selection made: " + e.source.drinkData.title );

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


function closeWindow(e)
{
	var a = Alloy.Globals.windowStack.indexOf($.drinks_sub_category);
	Alloy.Globals.windowStack.splice(a,1);
	if(Ti.Platform.name == "android" )
	{
		$.drinks_sub_category.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.drinks_sub_category.close();
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

$.drinks_sub_category.addEventListener('close', function(e){
	Ti.API.info("drinks subcategory closed");
	//var a = Alloy.Globals.windowStack.indexOf($.drinks_sub_category);
	//Alloy.Globals.windowStack.splice(a,1);
});

$.drinks_sub_category.addEventListener('open', function(e){
	Ti.API.info("drinks subcategory opened");
	try{
		Alloy.Globals.windowStack.push($.drinks_sub_category);
	}
	catch(e){
		Ti.API.info('push to window stack error: ' + e.toString());
	}
});

$.drinks_sub_category.addEventListener('androidback', function(e){
	$.drinks_sub_category.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.drinks_sub_category);
	Alloy.Globals.windowStack.splice(a,1);
});
