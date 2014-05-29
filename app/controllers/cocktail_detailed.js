/*
 * 
 * Detailed Cocktail Description Page
 * 
 * 
 */

var args = arguments[0] || {};
var cocktail = args || 'Category not received';
$.recipe_title_label.text = cocktail.title;

if(Ti.Platform.name == "mobileweb" )
{
	$.recipe_container_bottom.remove($.rating_container);
}

if(Ti.Platform.name == "android" )
{
	var divide = 320 / 310; 
	var width = Ti.Platform.displayCaps.platformWidth / divide;
	var imageRatio = 310/25;
	var imageSize = Math.floor(width/imageRatio);
	var fav_heart_style = $.createStyle({
		width:imageSize.toString() + "px",
		height:imageSize.toString() + "px",
	});
	
	$.fav_heart.applyProperties(fav_heart_style);
}

if(cocktail.glass != null && cocktail.glass != "")
{
	var glassText = "";
	
	for(var i = 0; i < cocktail.glass.length; i++)
	{
		glassText +=  "\u2022" + " " + cocktail.glass[i].Glass.title + "\n";
	}
	$.glassware.text = glassText;
}
else{
	$.how_to_view.remove($.glassware_container);
}
if(cocktail.description != null && cocktail.description != "")
{
	$.cocktail_desc.text = cocktail.description;
}
else{
	$.how_to_view.remove($.cocktail_desc_container);
} 
if(cocktail.ingredients != null && cocktail.ingredients != "")
{
	var parsedIngredients = cocktail.ingredients.replace( /\r\n/g, "\n" ).replace( /\r/g, "\n" ).split( "\n" );
	
	$.ingredients.text = "";
	for(var i = 0; i < parsedIngredients.length; i++)
	{
		$.ingredients.text += "\u2022" + " " + parsedIngredients[i] + "\r\n";
	}
}
else{
	$.how_to_view.remove($.ingredients_container);
}
if(cocktail.method != null && cocktail.method != "")
{
	var parsedMethod = cocktail.method.replace( /\r\n/g, "\n" ).replace( /\r/g, "\n" ).split( "\n" );
	
	$.method.text = "";
	for(var i = 0; i < parsedMethod.length; i++)
	{
		$.method.text += "\u2022" + " " + parsedMethod[i] + "\r\n";
	}
}
else{
	$.how_to_view.remove($.method_container);
}
if(cocktail.garnish != null && cocktail.garnish != "")
{
	$.garnish.text = cocktail.garnish;
	var parsedGarnish = cocktail.garnish.replace( /\r\n/g, "\n" ).replace( /\r/g, "\n" ).split( "\n" );
	
	$.garnish.text = "";
	for(var i = 0; i < parsedGarnish.length; i++)
	{
		$.garnish.text += "\u2022" + " " + parsedGarnish[i] + "\r\n";
	}
}
else{
	$.how_to_view.remove($.garnish_container);
}
if(cocktail.video != null && cocktail.video != "")
{
	
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
		  width:Ti.UI.FILL
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
		});
	}
	else
	{
		var video_thumbnail_image = Alloy.Globals.Utils.RemoteImage({
		  image: "http://img.youtube.com/vi/" + cocktail.video + "/hqdefault.jpg",
		  defaultImage:'images/cocktails/glass.png',
		  checkRetina:false,
		  width: Ti.UI.FILL
		});
	}
	
	$.video_container.add(video_thumbnail_image);
	
	$.video_container.addEventListener('click', function(e){
		
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
	video_play.width = Ti.UI.SIZE;
	video_play.height = Ti.UI.SIZE;
	
	
}
else
{
	$.cocktail_scroll.remove($.video_container);
}

var showSocialSection = false;
if(cocktail.facebook == null || cocktail.facebook == "")
{
	$.social_hor_view_recipe.remove($.facebookParent_recipe);
}
else{
	showSocialSection = true;
	if(Titanium.Platform.name != 'mobileweb')
	{
		$.facebookParent_recipe.addEventListener('click', function(e)
		{
			if (Titanium.Platform.name == 'iPhone OS') {
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
	else
	{
		$.facebookBtn_cocktailDeet.html = '<a href="http://www.facebook.com/' + cocktail.facebook + '" target="_blank"><div style="height:30px;"><img src="./images/icons/facebookIcon@2x.png" style="width:20px;height:25px;left:3px;"><span style="color:#fff;font-size:16px;line-height:30px;height:30px !important;vertical-align:top;">Facebook</span></div></a>';
	}
}

if(cocktail.twitter == null || cocktail.twitter == "")
{
	$.social_hor_view_recipe.remove($.twitterParent_recipe);
}
else{
	showSocialSection = true;
	if(Titanium.Platform.name != 'mobileweb')
	{
		$.twitterParent_recipe.addEventListener('click', function(e){
			if (Titanium.Platform.name == 'iPhone OS') {
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
	else
	{
		$.twitterBtn_cocktailDeet.html = '<a href="http://twitter.com/' + cocktail.twitter + '" target="_blank"><div style="height:30px;"><img src="./images/icons/twitterbird@2x.png" style="width:25px;height:20px;top:5px;left:5px;"><span style="color:#fff;font-size:16px;line-height:30px;height:30px !important;vertical-align:top;">Twitter</span></div></a>';
	}
}

if(!showSocialSection){
	$.recipe_container_bottom.remove($.recipe_social_container);
}

var ratings_star_style = $.createStyle({
		classes: ["star_icon"],
	});
	
	
if(Ti.Platform.name == "android" )
{
	var divide = 320 / 310; 
	var width = Ti.Platform.displayCaps.platformWidth / divide;
	var imageRatio = 310/25;
	var imageSize = Math.floor(width/imageRatio);
	ratings_star_style.width = imageSize.toString() + "px";
	ratings_star_style.height = imageSize.toString() + "px";
	imageRatio = 310/4;
	imageSize = Math.floor(width/imageRatio);
	ratings_star_style.left = imageSize.toString() + "px";
	ratings_star_style.right = imageSize.toString() + "px";
	$.star_1.applyProperties(ratings_star_style);
	$.star_2.applyProperties(ratings_star_style);
	$.star_3.applyProperties(ratings_star_style);
	$.star_4.applyProperties(ratings_star_style);
	$.star_5.applyProperties(ratings_star_style);
}

	
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
		cocktail = recipe_data_array[0].Cocktail;
		updateRatingStars(cocktail.rating);
	}
}
Alloy.Globals.Utils.GetAppData("/client/idl/perfect-mix/cocktails/cocktails/viewjson", "data/Cocktails.txt", getCocktailData);
	
var currentRatings = Titanium.App.Properties.getList('ratings', new Array());
var currentFavs = Titanium.App.Properties.getList('favs', new Array());

if(currentRatings == null || currentRatings.length == 0 )
{
	$.rating_view.addEventListener('click', function(e){
		var animation = Titanium.UI.createAnimation();
		animation.bottom = "0dp";
		animation.duration = 300;
		animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
		$.rating_picker.animate(animation);
	});
}
else if(currentRatings.length > 0)
{
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
			var animation = Titanium.UI.createAnimation();
			animation.bottom = "0dp";
			animation.duration = 300;
			animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
			$.rating_picker.animate(animation);
		});
	}
}
	
var currentRating = 0;

function star_clicked(e){
	
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
		xhr.open("GET", Alloy.Globals.BaseUrl+"/client/idl/perfect-mix/cocktails/cocktails/saverating/hash:35e1b0e0b9bc289cc4d14a1f63ef9263/cocktail_id:" + cocktail.id + "/rating:"+currentRating);
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
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Perfect Mix - Comment: " + cocktail.title;
	emailDialog.toRecipients = [Alloy.Globals.ContactEmail];
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
	Ti.API.info("Fav heart clicked ");
	if(currentFavs == null || currentFavs.length == 0)
	{
		currentFavs.push({id:cocktail.id});
	}
	else
	{
		for(var i = 0; i < currentFavs.length; i ++)
		{
			if(currentFavs[i].id == cocktail.id)
			{
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
}

$.cocktail_detailed.addEventListener('close', function(e){
});

$.cocktail_detailed.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.cocktail_detailed);
	
	var animation = Titanium.UI.createAnimation();
	animation.left = "0dp";
	animation.duration = 700;
	animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;

	try
	{
		
		var cocktail_image = Alloy.Globals.Utils.RemoteImage({
		  image: cocktail.image,
		  defaultImage:'images/cocktails/glass.png',
		  height:Ti.UI.FILL,
		  width:Ti.UI.FILL
		});
		
		$.recipe_image_ani_view.add(cocktail_image);
		
	}
	catch(ex)
	{
		Ti.API.info('image drawing error: ' + ex.toString);
	}
	
	setTimeout(function(){
	   $.recipe_image_ani_view.animate(animation);
	}, 700);
});

$.cocktail_detailed.addEventListener('androidback', function(e){
	$.cocktail_detailed.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.cocktail_detailed);
	Alloy.Globals.windowStack.splice(a,1);
});
