Ti.API.info("Recipe detail screen opened");

var args = arguments[0] || {};
var cocktail = args || 'Category not received';
//$.recipeTitle.text = args.title || 'Title not received';
Ti.API.info("Cocktail category: " + cocktail.title);


$.recipe_title_label.text = cocktail.title;

function submitCommentBtnHandler(e){
	Ti.API.info("Submit comment on recipe");
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
	animation.duration = 600;
	animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
	/*var animationHandler = function() {
	  animation.removeEventListener('complete',animationHandler);
	  animation.backgroundColor = 'orange';
	  view.animate(animation);
	};
	animation.addEventListener('complete',animationHandler);*/
	$.recipe_image_ani_view.animate(animation);
});
