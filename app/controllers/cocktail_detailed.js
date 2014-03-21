Ti.API.info("Recipe detail screen opened");

var args = arguments[0] || {};
var cocktail = args || 'Category not received';


Ti.API.info("Cocktail category: " + cocktail.title);

$.recipe_title_label.text = cocktail.title;

if(cocktail.glass != null && cocktail.glass != "")
{
	Ti.API.info("cocktail glassware info: " + cocktail.glass);
	var glassText = "";
	
	for(var i = 0; i < cocktail.glass.length; i += 2)
	{
		if(i > 0)
		{
			glassText += "\n";
		}
		glassText += cocktail.glass[i].Glass.title;
	}
	$.glassware.text = glassText;
}
else{
	Ti.API.info("No cocktail glass info");
	$.how_to_view.remove($.glassware_container);
}
if(cocktail.description != null && cocktail.description != "")
{
	Ti.API.info("cocktail description info: " + cocktail.description);
	$.cocktail_desc.text = cocktail.description;
}
else{
	Ti.API.info("No cocktail description info");
	$.how_to_view.remove($.cocktail_desc_container);
}
if(cocktail.ingredients != null && cocktail.ingredients != "")
{
	Ti.API.info("cocktail ingredients info: " + cocktail.ingredients);
	$.ingredients.text = cocktail.ingredients;
}
else{
	Ti.API.info("No cocktail ingredients info");
	$.how_to_view.remove($.ingredients_container);
}
if(cocktail.method != null && cocktail.method != "")
{
	Ti.API.info("cocktail method info: " + cocktail.method);
	$.method.text = cocktail.method;
}
else{
	Ti.API.info("No cocktail method info");
	$.how_to_view.remove($.method_container);
}
if(cocktail.garnish != null && cocktail.garnish != "")
{
	Ti.API.info("cocktail garnish info: " + cocktail.garnish);
	$.garnish.text = cocktail.garnish;
}
else{
	Ti.API.info("No cocktail garnish info");
	$.how_to_view.remove($.garnish_container);
}
if(cocktail.video != null && cocktail.video != "")
{
	Ti.API.info("cocktail video info: " + cocktail.video);
	/*$.video_url_link.text = cocktail.video_url;
	$.video_url_link.addEventListener('click', function(e){
		Ti.API.info("youtube link clicked");
		Alloy.createWidget('ytPlayer').play(cocktail.video_url);
	});
	*/
	
	if(Ti.Platform.name == "android" )
	{
		
		var new_height = "194dp";
		new_height = PixelsToDPUnits((Ti.Platform.displayCaps.platformWidth / 320 ) * 194);
		
		function PixelsToDPUnits(ThePixels)
		{
		  return (ThePixels / (Titanium.Platform.displayCaps.dpi / 194));
		}
		var video_thumbnail_image = Alloy.Globals.Utils.RemoteImage({
		  image: "http://img.youtube.com/vi/" + cocktail.video + "/hqdefault.jpg",
		  defaultImage:'images/cocktails/glass.png',
		  checkRetina:false,
		  height: new_height,
		 // height: Ti.UI.FILL
		});
	}
	else if(Ti.Platform.name == "mobileweb" )
	{
		var video_thumbnail_image = Alloy.Globals.Utils.RemoteImage({
		  image: "http://img.youtube.com/vi/" + cocktail.video + "/hqdefault.jpg",
		  defaultImage:'images/cocktails/glass.png',
		  checkRetina:false,
		  width: Ti.UI.FILL,
		  top:0
		//  height:'194dp'
		 // height: Ti.UI.FILL
		});
	}
	else
	{
		var video_thumbnail_image = Alloy.Globals.Utils.RemoteImage({
		  image: "http://img.youtube.com/vi/" + cocktail.video + "/hqdefault.jpg",
		  defaultImage:'images/cocktails/glass.png',
		  checkRetina:false,
		  width: Ti.UI.FILL,
		 // height: Ti.UI.FILL
		});
	}
	
	//video_thumbnail_image.width = "100%";
	$.video_container.add(video_thumbnail_image);
	//video_thumbnail_image.height = Ti.UI.SIZE;
	
	$.video_container.addEventListener('click', function(e){
		Ti.API.info("youtube link clicked");
		
		//if rating is open then close it
		var animation = Titanium.UI.createAnimation();
		animation.bottom = "-240dp";
		animation.duration = 300;
		animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
		$.rating_picker.animate(animation);
		
		Alloy.createWidget('ytPlayer').play(cocktail.video);
	});
	
	var video_play = Ti.UI.createImageView();
	if (Titanium.Platform.name == 'mobileweb') {
		video_play.image = "./images/common/play_btn.png";
	}
	else{
		video_play.image = "/images/common/play_btn.png";
	}
	video_play.touchEnabled = false;
	$.video_container.add(video_play);
	//video_play.height = "10%";
	video_play.width = Ti.UI.SIZE;
	video_play.height = Ti.UI.SIZE;
	//event_image_view.applyProperties(event_image_style);
	
	
}
else
{
	Ti.API.info("No cocktail video info");
	$.cocktail_scroll.remove($.video_container);
}

var showSocialSection = false;
if(cocktail.facebook == null || cocktail.facebook == "")
{
	$.social_hor_view_recipe.remove($.facebookParent_recipe);
}
else{
	showSocialSection = true;
	$.facebookParent_recipe.addEventListener('click', function(e)
	{
		if (Titanium.Platform.name == 'iPhone OS') {
			Ti.API.info("facebook home button clicked");
			var canOpenFacebook = Ti.Platform.canOpenURL("fb://profile/"+cocktail.facebook);
			if(canOpenFacebook)
			{
				Ti.Platform.openURL("fb://profile/"+cocktail.facebook);
			}
			else{
				//alert("The facebook app must be installed to open this link.");
				Ti.Platform.openURL("http://www.facebook.com/"+cocktail.facebook);
			}
		}
		else if (Titanium.Platform.name == 'android'){
			var canOpen = Ti.Platform.openURL("fb://profile/"+cocktail.facebook);
			
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

if(cocktail.twitter == null || cocktail.twitter == "")
{
	$.social_hor_view_recipe.remove($.twitterParent_recipe);
}
else{
	showSocialSection = true;
	$.twitterParent_recipe.addEventListener('click', function(e){
		if (Titanium.Platform.name == 'iPhone OS') {
			Ti.API.info("twitter home button clicked");
			var canOpenTwitter = Ti.Platform.canOpenURL("twitter:///user?id="+cocktail.twitter);
			Ti.API.info("twitter home button clicked");
			
			if(canOpenTwitter)
			{
				Ti.Platform.openURL("twitter:///user?id="+cocktail.twitter);
			}
			else{
				alert("The twitter app must be installed to open this link.");
			}
		}
		else if (Titanium.Platform.name == 'android'){
			var canOpen = Ti.Platform.openURL("twitter://user?user_id="+cocktail.twitter);
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

if(!showSocialSection){
	$.recipe_container_bottom.remove($.recipe_social_container);
}

var ratings_star_style = $.createStyle({
		classes: ["star_icon"],
	});
	
var cocktail_rating_stars = new Array();
for(var i = 0; i < 5; i++){
	cocktail_rating_stars[i] = Ti.UI.createImageView();
	if(Ti.Platform.name == "mobileweb" )
	{
		cocktail_rating_stars[i].image = "./images/common/empty_star.png";
	}
	else
	{
		cocktail_rating_stars[i].image = "/images/common/empty_star.png";
	}
	cocktail_rating_stars[i].touchEnabled = false;
	cocktail_rating_stars[i].applyProperties(ratings_star_style);
	$.rating_view.add(cocktail_rating_stars[i]);
}
	
	
function updateRatingStars(rating)
{
	for(var i = 0; i < 5; i++){
		if(i < rating)
		{
			if(Ti.Platform.name == "mobileweb" )
			{
				cocktail_rating_stars[i].image = "./images/common/full_star.png";
			}
			else
			{
				cocktail_rating_stars[i].image = "/images/common/full_star.png";
			}
		}
		else
		{
			if(Ti.Platform.name == "mobileweb" )
			{
				cocktail_rating_stars[i].image = "./images/common/empty_star.png";
			}
			else
			{
				cocktail_rating_stars[i].image = "/images/common/empty_star.png";
			}
		}
	}
}
//updateRatingStars(cocktail.rating);

function getCocktailData(cocktailsJson)
{
	var cocktail_json;
	if(cocktailsJson != null)
	{
		cocktail_json = JSON.parse(cocktailsJson);
	}
	var recipe_data_array = cocktail_json.filter(function( obj ) {
		  return obj.Cocktail.id == args.id;
		});
	if(recipe_data_array[0] != null)
	{
		Ti.API.info('detailed recipe found: ' + recipe_data_array[0].Cocktail.id );
		cocktail = recipe_data_array[0].Cocktail;
		updateRatingStars(cocktail.rating);
	}
	else{
		Ti.API.info('detailed recipe NOT found');
	}
}
Alloy.Globals.Utils.GetAppData("http://www.vocal.ie/client/idl/perfect-mix/cocktails/cocktails/viewjson", "data/Cocktails.txt", getCocktailData);
	
var currentRatings = Titanium.App.Properties.getList('ratings', new Array());
var currentFavs = Titanium.App.Properties.getList('favs', new Array());

if(currentRatings == null || currentRatings.length == 0 )
{
	Ti.API.info('Current ratings count is 0 or null - allowed to rate');
	
	$.rating_view.addEventListener('click', function(e){
		Ti.API.info("Cocktail rating clicked");
		var animation = Titanium.UI.createAnimation();
		animation.bottom = "0dp";
		animation.duration = 300;
		animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
		$.rating_picker.animate(animation);
	});
}
else if(currentRatings.length > 0)
{
	Ti.API.info('Current ratings are greater than one - check if allowed to rate');
	var canRate = true;
	for(var i = 0; i < currentRatings.length; i ++)
	{
		if(currentRatings[i].id == cocktail.id)
		{
			if( currentRatings[i].rating == 1)
			{
				$.rating_cta.text = "Your rating: " + currentRatings[i].rating + " star";
			}
			else{
				$.rating_cta.text = "Your rating: " + currentRatings[i].rating + " stars";
			}
			canRate = false;
		}
	}
	if(canRate){
		$.rating_view.addEventListener('click', function(e){
			Ti.API.info("Cocktail rating clicked");
			var animation = Titanium.UI.createAnimation();
			animation.bottom = "0dp";
			animation.duration = 300;
			animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
			$.rating_picker.animate(animation);
		});
	}
}
	
/*
$.rating_view.addEventListener('click', function(e){
	Ti.API.info("Cocktail rating clicked");
	var animation = Titanium.UI.createAnimation();
	animation.bottom = "0dp";
	animation.duration = 500;
	$.rating_picker.animate(animation);
});
*/
var currentRating = 0;

function star_clicked(e){
	Ti.API.info("Star clicked, id: " + e.source.star_id);
	
	switch (e.source.star_id)
	{
		case "1":
			currentRating = 1;
			$.rating_title.text = "Terrible";
			$.star_1.image = "/images/common/full_star.png";
			$.star_2.image = "/images/common/empty_star.png";
			$.star_3.image = "/images/common/empty_star.png";
			$.star_4.image = "/images/common/empty_star.png";
			$.star_5.image = "/images/common/empty_star.png";
		break;
		case "2":
			currentRating = 2;
			$.rating_title.text = "Poor";
			$.star_1.image = "/images/common/full_star.png";
			$.star_2.image = "/images/common/full_star.png";
			$.star_3.image = "/images/common/empty_star.png";
			$.star_4.image = "/images/common/empty_star.png";
			$.star_5.image = "/images/common/empty_star.png";
		break;
		case "3":
			currentRating = 3;
			$.rating_title.text = "Average";
			$.star_1.image = "/images/common/full_star.png";
			$.star_2.image = "/images/common/full_star.png";
			$.star_3.image = "/images/common/full_star.png";
			$.star_4.image = "/images/common/empty_star.png";
			$.star_5.image = "/images/common/empty_star.png";
		break;
		case "4":
			currentRating = 4;
			$.rating_title.text = "Very good";
			$.star_1.image = "/images/common/full_star.png";
			$.star_2.image = "/images/common/full_star.png";
			$.star_3.image = "/images/common/full_star.png";
			$.star_4.image = "/images/common/full_star.png";
			$.star_5.image = "/images/common/empty_star.png";
		break;
		case "5":
			currentRating = 5;
			$.rating_title.text = "Excellent";
			$.star_1.image = "/images/common/full_star.png";
			$.star_2.image = "/images/common/full_star.png";
			$.star_3.image = "/images/common/full_star.png";
			$.star_4.image = "/images/common/full_star.png";
			$.star_5.image = "/images/common/full_star.png";
		break;
	}
	
}

function closeRatingHandler(e){
	Ti.API.info("Close rating handler");
	var animation = Titanium.UI.createAnimation();
	if(Ti.Platform.name == "android" )
	{
		animation.bottom = "-260dp";
	}
	else
	{
		animation.bottom = "-240dp";
	}
	animation.duration = 300;
	animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
	$.rating_picker.animate(animation);
}

function submitRatingBtnHandler(e){
	Ti.API.info("Submit rating handler");
	if(currentRating == 0)
	{
		var dialog = Ti.UI.createAlertDialog({
		    message: "You must click on the stars to set a rating.",
		    ok: 'Ok',
		    title: 'Rating error'
		  }).show();
	}
	else{
		currentRatings.push({
			id:cocktail.id, 
			rating: currentRating
			});
		Titanium.App.Properties.setList('ratings', currentRatings);
		var animation = Titanium.UI.createAnimation();
		if(Ti.Platform.name == "android" )
		{
			animation.bottom = "-260dp";
		}
		else
		{
			animation.bottom = "-240dp";
		}
		animation.duration = 300;
		animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
		$.rating_picker.animate(animation);
		$.rating_view.touchEnabled = false;
		if( currentRating == 1)
		{
			$.rating_cta.text = "Your rating: " + currentRating + " star";
		}
		else{
			$.rating_cta.text = "Your rating: " + currentRating + " stars";
		}
		
		var xhr = Ti.Network.createHTTPClient();
		xhr.open("GET", "http://vocal.ie/client/idl/perfect-mix/cocktails/cocktails/saverating/hash:35e1b0e0b9bc289cc4d14a1f63ef9263/cocktail_id:" + cocktail.id + "/rating:"+currentRating);
		xhr.onload = function() {
			Ti.API.info("Text Recieved" + this.responseText);
		    
		    var validJSON = null;
		    try{
		    	validJSON = JSON.parse(this.responseText);
		    }
		    catch(e)
		    {
		    	Ti.API.info("Invalid JSON recieved from ratings");
		    }
		    if(validJSON != null)
		    {
		    	updateRatingStars(validJSON.average);
		    	Alloy.Globals.Utils.updateCocktailRating(validJSON.cocktail_id, validJSON.average);
		    }
		};
		xhr.send();
		
	}
	
}

function submitCommentBtnHandler(e){
	Ti.API.info("Submit comment on recipe");
	//$.rating_picker.height = Ti.UI.FILL;
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Perfect Mix - Comment: " + cocktail.title;
	emailDialog.toRecipients = ['lisa@vstream.ie'];
	emailDialog.messageBody = '';
	emailDialog.open();

}

function updateFavIcon(){
	if(currentFavs.length >= 0)
	{
		for(var i = 0; i < currentFavs.length; i ++)
		{
			if(currentFavs[i].id == cocktail.id)
			{
				Ti.API.info('cocktail in favorites');
				
				//$.fav_heart.image = "/images/favs/heart_full.png";
				if(Ti.Platform.name == "mobileweb" )
				{
					$.fav_heart.image = "./images/favs/heart_full.png";
				}
				else
				{
					$.fav_heart.image = "/images/favs/heart_full.png";
				}
				return false;
			}
		}
		if(Ti.Platform.name == "mobileweb" )
		{
			$.fav_heart.image = "./images/favs/heart_outline.png";
		}
		else
		{
			$.fav_heart.image = "/images/favs/heart_outline.png";
		}
	}
}
updateFavIcon();

function fav_clicked(e){
	//alert("Favourite  heart clicked!!");
	Ti.API.info("Fav heart clicked ");
	if(currentFavs == null || currentFavs.length == 0)
	{
		Ti.API.info('No current favourites - add this cocktail to favourites');
		currentFavs.push({id:cocktail.id});
	}
	else
	{
		for(var i = 0; i < currentFavs.length; i ++)
		{
			if(currentFavs[i].id == cocktail.id)
			{
				Ti.API.info('Cocktail already in favorites - remove from list');
				currentFavs.splice(i, 1);
				Titanium.App.Properties.setList('favs', currentFavs);
				updateFavIcon();
				return false;
			}
		}
		currentFavs.push({id:cocktail.id});
	}
	Titanium.App.Properties.setList('favs', currentFavs);
	updateFavIcon();
}


function closeWindow(e)
{
	var a = Alloy.Globals.windowStack.indexOf($.cocktail_detailed);
	Alloy.Globals.windowStack.splice(a,1);
	if(Ti.Platform.name == "android" )
	{
		$.cocktail_detailed.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.cocktail_detailed.close();
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

$.cocktail_detailed.addEventListener('close', function(e){
	Ti.API.info("cocktail desc closed");
	//var a = Alloy.Globals.windowStack.indexOf($.cocktail_detailed);
	//Alloy.Globals.windowStack.splice(a,1);
});

$.cocktail_detailed.addEventListener('open', function(e){
	Ti.API.info("Cocktail desc opened");
	Alloy.Globals.windowStack.push($.cocktail_detailed);
	
	var animation = Titanium.UI.createAnimation();
	animation.left = "0dp";
	animation.duration = 700;
	animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
	/*var animationHandler = function() {
	  animation.removeEventListener('complete',animationHandler);
	  animation.backgroundColor = 'orange';
	  view.animate(animation);
	};
	animation.addEventListener('complete',animationHandler);*/
	
	var cocktail_image = Alloy.Globals.Utils.RemoteImage({
	  image: cocktail.image,
	  defaultImage:'images/cocktails/glass.png',
	  height:Ti.UI.FILL
	});
	//cocktail_image.applyProperties(cocktail_image_style_bottle);
	$.recipe_image_ani_view.add(cocktail_image);
	
	setTimeout(function(){
	   $.recipe_image_ani_view.animate(animation);
	}, 700);
});

$.cocktail_detailed.addEventListener('androidback', function(e){
	$.cocktail_detailed.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.cocktail_detailed);
	Alloy.Globals.windowStack.splice(a,1);
});
