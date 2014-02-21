Ti.API.info("Recipe detail screen opened");

var args = arguments[0] || {};
var cocktail = args || 'Category not received';
//$.recipeTitle.text = args.title || 'Title not received';
Ti.API.info("Cocktail category: " + cocktail.title);

$.recipe_title_label.text = cocktail.title;

if(cocktail.glass != null && cocktail.glass != "")
{
	Ti.API.info("cocktail glassware info: " + cocktail.glass);
	$.glassware.text = cocktail.glass;
}
else{
	Ti.API.info("No cocktail glass info");
	$.how_to_view.remove($.glassware_container);
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
if(cocktail.video_url != null && cocktail.video_url != "")
{
	Ti.API.info("cocktail video info: " + cocktail.video_url);
	/*$.video_url_link.text = cocktail.video_url;
	$.video_url_link.addEventListener('click', function(e){
		Ti.API.info("youtube link clicked");
		Alloy.createWidget('ytPlayer').play(cocktail.video_url);
	});
	*/
	
	
	var video_thumbnail_image = Alloy.Globals.Utils.RemoteImage({
	  image: "http://img.youtube.com/vi/" + cocktail.video_url + "/hqdefault.jpg",
	  defaultImage:'images/cocktails/glass.png',
	  checkRetina:false,
	  width: Ti.UI.FILL,
	 // height: Ti.UI.FILL
	});;
	
	//video_thumbnail_image.width = "100%";
	$.video_container.add(video_thumbnail_image);
	//video_thumbnail_image.height = Ti.UI.SIZE;
	
	video_thumbnail_image.addEventListener('click', function(e){
		Ti.API.info("youtube link clicked");
		
		//if rating is open then close it
		var animation = Titanium.UI.createAnimation();
		animation.bottom = "-240dp";
		animation.duration = 500;
		$.rating_picker.animate(animation);
		
		Alloy.createWidget('ytPlayer').play(cocktail.video_url);
	});
	
	var video_play = Ti.UI.createImageView();
	video_play.image = "/images/common/play_btn.png";
	video_play.touchEnabled = false;
	$.video_container.add(video_play);
	//video_play.height = "10%";
	video_play.width = Ti.UI.SIZE;
	//event_image_view.applyProperties(event_image_style);
	
	
}
else
{
	Ti.API.info("No cocktail video info");
	$.cocktail_scroll.remove($.video_container);
}

var ratings_star_style = $.createStyle({
		classes: ["star_icon"],
	});
	
for(var i = 0; i < 5; i++){
	var rating_star_image = Ti.UI.createImageView();
	rating_star_image.image = "/images/common/empty_star.png";
	rating_star_image.touchEnabled = false;
	//rating_star_image.left = "3dp";
	//rating_star_image.right = "3dp";
	//rating_star_image.width = "25dp";
	rating_star_image.applyProperties(ratings_star_style);
	$.rating_view.add(rating_star_image);
}

var currentRatings = Titanium.App.Properties.getList('ratings', new Array());
var currentFavs = Titanium.App.Properties.getList('favs', new Array());

if(currentRatings == null || currentRatings.length == 0 )
{
	Ti.API.info('Current ratings count is 0 or null - allowed to rate');
	
	$.rating_view.addEventListener('click', function(e){
		Ti.API.info("Cocktail rating clicked");
		var animation = Titanium.UI.createAnimation();
		animation.bottom = "0dp";
		animation.duration = 500;
		$.rating_picker.animate(animation);
	});
}
else if(currentRatings.length > 0)
{
	Ti.API.info('Current ratings are greater than one - check if allowed to rate');
	var canRate = true;
	for(var i = 0; i < currentRatings.length; i ++)
	{
		if(currentRatings[i].id == cocktail.ID)
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
			animation.duration = 500;
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
	animation.duration = 500;
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
			id:cocktail.ID, 
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
		animation.duration = 500;
		$.rating_picker.animate(animation);
		$.rating_view.touchEnabled = false;
		if( currentRating == 1)
		{
			$.rating_cta.text = "Your rating: " + currentRating + " star";
		}
		else{
			$.rating_cta.text = "Your rating: " + currentRating + " stars";
		}
	}
	
}

function submitCommentBtnHandler(e){
	Ti.API.info("Submit comment on recipe");
	//$.rating_picker.height = Ti.UI.FILL;

}

function updateFavIcon(){
	if(currentFavs.length >= 0)
	{
		for(var i = 0; i < currentFavs.length; i ++)
		{
			if(currentFavs[i].id == cocktail.ID)
			{
				Ti.API.info('cocktail in favorites');
				$.fav_heart.image = "/images/favs/heart_full.png";
				return false;
			}
		}
		$.fav_heart.image = "/images/favs/heart_outline.png";
	}
}
updateFavIcon();

function fav_clicked(e){
	alert("Favourite  heart clicked!!");
	Ti.API.info("Fav heart clicked ");
	if(currentFavs == null || currentFavs.length == 0)
	{
		Ti.API.info('No current favourites - add this cocktail to favourites');
		currentFavs.push({id:cocktail.ID});
	}
	else
	{
		for(var i = 0; i < currentFavs.length; i ++)
		{
			if(currentFavs[i].id == cocktail.ID)
			{
				Ti.API.info('Cocktail already in favorites - remove from list');
				currentFavs.splice(i, 1);
				Titanium.App.Properties.setList('favs', currentFavs);
				updateFavIcon();
				return false;
			}
		}
		currentFavs.push({id:cocktail.ID});
	}
	Titanium.App.Properties.setList('favs', currentFavs);
	updateFavIcon();
}


function closeWindow(e)
{
	$.cocktail_detailed.close();
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

$.cocktail_detailed.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.cocktail_detailed);
	Alloy.Globals.windowStack.splice(a,1);
});

$.cocktail_detailed.addEventListener('open', function(e){
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
	  image: cocktail.image_thumb,
	  defaultImage:'images/cocktails/glass.png'
	});
	//cocktail_image.applyProperties(cocktail_image_style_bottle);
	$.recipe_image_ani_view.add(cocktail_image);
	
	setTimeout(function(){
	   $.recipe_image_ani_view.animate(animation);
	}, 700);

	
});
