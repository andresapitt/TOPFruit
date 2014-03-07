//Alloy.Globals.parent = $.index;

Alloy.Globals.parent = $.win1;

function doClick(e) {
    alert($.label.text);
}

var ageGaitSuccess = Ti.App.Properties.getBool('over18', false);

$.win1.addEventListener('open', indexOpen);

// if the age gait hasn't been successfully passed yet show the age gait screen
if(!ageGaitSuccess)
{
	var age_gate = Alloy.createController('age_gate').getView();
	age_gate.open();
}
else //open home page of app
{
	//get mix of month info and display it on screen
	var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/Drinks.txt");  
 
	var drinks_json_text = ""; 
	
	// If the file exists
	if (readFile.exists()){  
		Ti.API.info("Drinks json local text file exists");
		drinks_json_text = readFile.read();
		var drinks_json = JSON.parse(drinks_json_text);
		
	}
	else{
		alert("Drinks json local text file not found");
	}

/*
		//if ios and iphone 4 or under
		if(Ti.Platform.name == "iPhone OS" &&  Ti.Platform.displayCaps.platformHeight == 480)
		{
			Ti.API.info("I'm an iOS device with a 3.5 screen height");
		
			var new_menu_btn_style = $.createStyle({
			    height: '84dp'
			});
			
			//$.cocktails_home_btn.applyProperties(new_menu_btn_style);
			//$.search_home_btn.applyProperties(new_menu_btn_style);
			//$.tips_home_btn.applyProperties(new_menu_btn_style);
			//$.favourites_home_btn.applyProperties(new_menu_btn_style);
			//$.news_home_btn.applyProperties(new_menu_btn_style);
			//$.brand_home_btn.applyProperties(new_menu_btn_style);
			
			$.menu_row_1.applyProperties(new_menu_btn_style);
			$.menu_row_2.applyProperties(new_menu_btn_style);
			$.menu_row_3.applyProperties(new_menu_btn_style);
			
			var new_index_image_style = $.createStyle({
			    height: '164dp'
			});
			
			$.mix_of_month_view.applyProperties(new_index_image_style);
		}
	
	*/
	$.win1.open();
	
	
}


function indexOpen(e)
{
	if(Ti.Platform.name == "iPhone OS" &&  Ti.Platform.displayCaps.platformHeight == 480)
		{
			Ti.API.info("I'm an iOS device with a 3.5 screen height");
		
			var new_menu_btn_style = $.createStyle({
			    height: '84dp'
			});
			
			//$.cocktails_home_btn.applyProperties(new_menu_btn_style);
			//$.search_home_btn.applyProperties(new_menu_btn_style);
			//$.tips_home_btn.applyProperties(new_menu_btn_style);
			//$.favourites_home_btn.applyProperties(new_menu_btn_style);
			//$.news_home_btn.applyProperties(new_menu_btn_style);
			//$.brand_home_btn.applyProperties(new_menu_btn_style);
			
			$.menu_row_1.applyProperties(new_menu_btn_style);
			$.menu_row_2.applyProperties(new_menu_btn_style);
			$.menu_row_3.applyProperties(new_menu_btn_style);
			
			var new_index_image_style = $.createStyle({
			    height: '164dp'
			});
			
			$.mix_of_month_view.applyProperties(new_index_image_style);
		}

	Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/cocktails/cocktails/viewjson", "data/Cocktails.txt", displayMixOfTheMonth);
	
	function displayMixOfTheMonth(newJSON)
	{
		Ti.API.info("I'm in the mix of the month display area");
		
		Ti.API.info("Add mix of the month stuff");
		
		$.mix_title.text = 'Mix of the month';
		$.mix_desc.text = 'Tipperary';
		
		var mix_of_the_month_banner_image_view = Alloy.Globals.Utils.RemoteImage({
				//image: drinks_json.mix_of_the_month.image_background,
				image: "/images/home_screen/mix_month_bg.png",
				defaultImage:'/images/home_screen/mix_month_bg.png',
				width:Ti.UI.FILL, 
				height:Ti.UI.FILL,
			//	backgroundColor:'red'
			});
		$.mix_banner_image_container.add(mix_of_the_month_banner_image_view);
		
		var mix_of_the_month_image_view = Alloy.Globals.Utils.RemoteImage({
			//	image: drinks_json.mix_of_the_month.image_bottle,
				image:"/images/category_images/champ.png",
				defaultImage:'/images/placeholders/ph_events.png',
				width:Ti.UI.FILL, 
				height:Ti.UI.SIZE,
				opacity:0
			});
		$.mix_bottle_image_container.add(mix_of_the_month_image_view);
			
		//$.mix_of_the_month_anim_view.anchorPoint = {x:0, y:0};
		var animation = Titanium.UI.createAnimation();
		animation.right = "5dp";
		animation.opacity = 1;
		animation.duration = 800;
		animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
		
		$.mix_of_the_month_anim_view.animate(animation, function(e){
			var fadeAnimation =  Titanium.UI.createAnimation();
			fadeAnimation.opacity = 1;
			fadeAnimation.duration = 800;
			fadeAnimation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
			mix_of_the_month_image_view.animate(fadeAnimation);
		});
		
		$.mix_of_month_view.addEventListener('click', function(e){
			Ti.API.info("mix of the month clicked");
			var recipeWin = Alloy.createController('cocktail_detailed', e.source.cocktailData).getView();
			if(Ti.Platform.name == "android" )
			{
				recipeWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
			}
			else
			{
		   		Alloy.Globals.parent.openWindow(recipeWin);
			}
		});
	
		
	}
}


function openFavourites(e){
	//var drinksFavWin = Alloy.createController('drinks_favourites').getView();
    //$.win1.openWindow(drinksFavWin);
    
    var drinksFavWin = Alloy.createController('cocktail_results',  {id:"favourites"} ).getView();
    if(Ti.Platform.name == "android" )
	{
		drinksFavWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else
	{
		$.win1.openWindow(drinksFavWin);
	}
    	
}

function openDrinks(e){
	var drinksWin = Alloy.createController('drinks_categories').getView();
	if(Ti.Platform.name == "android" )
	{
		drinksWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else
	{
    	$.win1.openWindow(drinksWin);
    }
}

function openSearch(e){
	var searchWin = Alloy.createController('search').getView();
	if(Ti.Platform.name == "android" )
	{
		searchWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else
	{
    	$.win1.openWindow(searchWin);
    }
}

function openTips(e){
	var tipsWin = Alloy.createController('tips').getView();
	if(Ti.Platform.name == "android" )
	{
		tipsWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else
	{
    	$.win1.openWindow(tipsWin);
    }
}

function openBrands(e){
	var brandsWin = Alloy.createController('brands').getView();
	if(Ti.Platform.name == "android" )
	{
		brandsWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else
	{
    	$.win1.openWindow(brandsWin);
    }
}

function openNews(e){
	
	var newsWin = Alloy.createController('news').getView();
	if(Ti.Platform.name == "android" )
	{
		newsWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else
	{
    	$.win1.openWindow(newsWin);
    }
}
function openTandCs(e)
{
	var terms_and_conditions = Alloy.createController('terms_and_conditions').getView();
	if(Ti.Platform.name == "android" )
	{
		terms_and_conditions.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		terms_and_conditions.open({modal:true});
	}
}
