//Alloy.Globals.parent = $.index;

Alloy.Globals.parent = $.win1;

$.win1.addEventListener('open', indexOpen);

var ageGaitSuccess = Ti.App.Properties.getBool('over18', false);

// if the age gait hasn't been successfully passed yet show the age gait screen
if(!ageGaitSuccess)
{
	var age_gate = Alloy.createController('age_gate').getView();
	
	setTimeout(function(e) {
	    age_gate.open();
	}, 2000);
	
	//age_gate.open();
}
else //open home page of app
{
	//$.win1.open();
	setTimeout(function(e) {
	    $.win1.open();
	}, 2000);
}


//	Ti.API.info("Is this modal? " + $.win1.modal);
	
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
		
	//if(Ti.Platform.name != "mobileweb")
	//{
		Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/mixes/mixes/viewjson", "data/FeaturedMix.txt", displayMixOfTheMonth);
	//}
		
	function displayMixOfTheMonth(newJSON)
	{
		Ti.API.info("I'm in the mix of the month display area");
		//alert('returned JSON!');
		Ti.API.info("Add mix of the month stuff");
		
		var featuredMix = JSON.parse(newJSON);
		
		var type = "GENERIC";
		if( featuredMix[0].Mix.type == 1)
			type = "ABSOLUT";
		else if( featuredMix[0].Mix.type == 2)
			type = "JAMESON";
		else if( featuredMix[0].Mix.type == 3)
			type = "MALIBU";
		
		Ti.API.info("Mix of the month type: " + featuredMix[0].Mix.type);
		var genericBG_Image = "/images/home_screen/mix_month_bg.png";
		if(Ti.Platform.name == "mobileweb")
		{
			genericBG_Image = "."+genericBG_Image;
		}
		switch(featuredMix[0].Mix.type)
		{
			case "0":
				Ti.API.info('mix of the month type GENERIC');
				var mix_title_style_font = $.createStyle({
				    font: {
						fontFamily:Alloy.Globals.BoldFont,
						fontSize:Alloy.Globals.MainFontSize
					},
					width:Ti.UI.FILL, 
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					color:featuredMix[0].Mix.title_font_colour
				});
				$.mix_title.applyProperties(mix_title_style_font);
				var mix_subtitle_style_font = $.createStyle({
				    font: {
						fontFamily:Alloy.Globals.MainFont,
						fontSize:Alloy.Globals.MainFontSize
					},
					width:Ti.UI.FILL, 
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					color:featuredMix[0].Mix.subtitle_font_colour
				});
				$.mix_desc.applyProperties(mix_subtitle_style_font);
				break;
			case "1":
				Ti.API.info('mix of the month type ABSOLUT');
				var mix_title_style_font = $.createStyle({
				    font: {
						fontFamily:Alloy.Globals.AbsolutFontLight,
						fontSize:Alloy.Globals.MainFontSize
					},
					width:Ti.UI.FILL, 
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					color:featuredMix[0].Mix.title_font_colour,
				});
				$.mix_title.applyProperties(mix_title_style_font);
				var mix_subtitle_style_font = $.createStyle({
				    font: {
						fontFamily:Alloy.Globals.AbsolutFontBold,
						fontSize:Alloy.Globals.MainFontSize
					},
					width:Ti.UI.FILL, 
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					color:featuredMix[0].Mix.subtitle_font_colour
				});
				$.mix_desc.applyProperties(mix_subtitle_style_font);
				genericBG_Image = "/images/home_screen/absolut_bg.png";
				if(Ti.Platform.name == "mobileweb")
				{
					genericBG_Image = "."+genericBG_Image;
				}
				break;
			case "2":
			 	Ti.API.info('mix of the month type JAMESON');
			 	var mix_title_style_font = $.createStyle({
				    font: {
						fontFamily:Alloy.Globals.JamesonFontLight,
						fontSize:Alloy.Globals.MainFontSize,
					//	fontWeight:'bold'
					},
					width:Ti.UI.FILL, 
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					color:featuredMix[0].Mix.title_font_colour,
				});
				$.mix_title.applyProperties(mix_title_style_font);
				var mix_subtitle_style_font = $.createStyle({
				    font: {
						fontFamily:Alloy.Globals.JamesonFontBold,
						fontSize:Alloy.Globals.MainFontSize,
					//	fontWeight:'normal'
					},
					width:Ti.UI.FILL, 
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					color:featuredMix[0].Mix.subtitle_font_colour
				});
				$.mix_desc.applyProperties(mix_subtitle_style_font);
				genericBG_Image = "/images/home_screen/jameson_bg.png";
				if(Ti.Platform.name == "mobileweb")
				{
					genericBG_Image = "."+genericBG_Image;
				}
				break;
			case "3":
				Ti.API.info('mix of the month type MALIBU');
				var mix_title_style_font = $.createStyle({
				    font: {
						fontFamily:Alloy.Globals.MalibuFontLight,
						fontSize:Alloy.Globals.MainFontSize
					},
					width:Ti.UI.FILL, 
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					color:featuredMix[0].Mix.title_font_colour,
				});
				$.mix_title.applyProperties(mix_title_style_font);
				var mix_subtitle_style_font = $.createStyle({
				    font: {
						fontFamily:Alloy.Globals.MalibuFontBold,
						fontSize:Alloy.Globals.MainFontSize
					},
					width:Ti.UI.FILL, 
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					color:featuredMix[0].Mix.subtitle_font_colour
				});
				$.mix_desc.applyProperties(mix_subtitle_style_font);
				genericBG_Image = "/images/home_screen/malibu_bg.png";
				if(Ti.Platform.name == "mobileweb")
				{
					genericBG_Image = "."+genericBG_Image;
				}
				break;
		}
		
		$.mix_title.text = featuredMix[0].Mix.title;
		$.mix_desc.text = featuredMix[0].Mix.subtitle;
		
		
		if(Ti.Platform.name == "mobileweb")
		{
			if(featuredMix[0].Mix.background != null && featuredMix[0].Mix.background != "")
			{
				$.mix_banner_image_container.backgroundImage = featuredMix[0].Mix.background;
			}
			else
			{
				$.mix_banner_image_container.backgroundImage = genericBG_Image;
			}
		}
		else
		{
			if(featuredMix[0].Mix.background != null && featuredMix[0].Mix.background != "")
			{
				var mix_of_the_month_banner_image_view = Alloy.Globals.Utils.RemoteImage({
					image: featuredMix[0].Mix.background,
					defaultImage:genericBG_Image,
					width:Ti.UI.FILL, 
					height:Ti.UI.FILL,
					touchEnabled:false
				});
			}
			else
			{
				var mix_of_the_month_banner_image_view = Alloy.Globals.Utils.RemoteImage({
					image: genericBG_Image,
					width:Ti.UI.FILL, 
					height:Ti.UI.FILL,
					touchEnabled:false
				});
			}
			$.mix_banner_image_container.add(mix_of_the_month_banner_image_view);
		}
			
		var mix_of_the_month_image_view;
		if(Ti.Platform.name == "mobileweb" )
		{
			mix_of_the_month_image_view = Alloy.Globals.Utils.RemoteImage({
				image: featuredMix[0].Mix.image,
				defaultImage:'./images/cocktails/glass.png',
				width:Ti.UI.FILL, 
				height:Ti.UI.SIZE,
				touchEnabled:false
			});
		}
		else{
			mix_of_the_month_image_view = Alloy.Globals.Utils.RemoteImage({
				image: featuredMix[0].Mix.image,
				defaultImage:'/images/cocktails/glass.png',
				width:Ti.UI.FILL, 
				height:Ti.UI.SIZE,
				opacity:0,
				touchEnabled:false
			});
		}
		$.mix_bottle_image_container.add(mix_of_the_month_image_view);
		Ti.API.info('mix of the month bottle opacity: ' + mix_of_the_month_image_view.opacity);
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
		
		$.mix_of_month_view.cocktailData = featuredMix[0].Mix.cocktails.Cocktail;
		
		$.mix_of_month_view.addEventListener('click', function(e){
			Ti.API.info("mix of the month clicked");
			//var recipeWin = Alloy.createController('cocktail_detailed', e.source.cocktailData).getView();
			var recipeWin = Alloy.createController('cocktail_detailed', featuredMix[0].Mix.cocktails.Cocktail).getView();
			if(Ti.Platform.name == "android" )
			{
				Ti.API.info('android open recipe!');
				recipeWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
			}
			else if(Ti.Platform.name == "mobileweb" )
			{
				recipeWin.open();
			}
			else
			{
		   		Alloy.Globals.parent.openWindow(recipeWin);
			}
		});
	}


}


function openFavourites(e){
    
    var drinksFavWin = Alloy.createController('cocktail_results',  {id:"favourites"} ).getView();
    if(Ti.Platform.name == "android" )
	{
		drinksFavWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else if(Ti.Platform.name == "mobileweb")
	{
		drinksFavWin.open();
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
	else if(Ti.Platform.name == "mobileweb")
	{
		drinksWin.open();
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
	else if(Ti.Platform.name == "mobileweb")
	{
		searchWin.open();
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
	else if(Ti.Platform.name == "mobileweb")
	{
		tipsWin.open();
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
	else if(Ti.Platform.name == "mobileweb")
	{
		brandsWin.open();
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
		Ti.API.info("ANDROID OPEN NEWS!");
		newsWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left, animated:true});
		/*newsWin.open({
		    activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
		    activityExitAnimation: Ti.Android.R.anim.slide_out_right,
		    modal:false
		});*/
		//newsWin.open({ activityEnterAnimation: Ti.Android.R.anim.slide_in_left, activityExitAnimation: Ti.Android.R.anim.slide_out_right});
	
		/*var win2 = Ti.UI.createWindow();
		win2.open({
		    activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
		    activityExitAnimation: Ti.Android.R.anim.slide_out_right
		});*/

	}
	else if(Ti.Platform.name == "mobileweb")
	{
		newsWin.open();
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
		terms_and_conditions.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right, animated:true});
	}
	else if(Ti.Platform.name == "mobileweb")
	{
		terms_and_conditions.open();
	}
	else
	{
		terms_and_conditions.open({modal:true});
	}
	
}
