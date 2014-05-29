/*
 * 
 * Terms and Conditions Screen
 * 
 */

function closeBtnHandler(e){
	
	if(Ti.Platform.name == "android" )
	{
		$.terms_and_conditions.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else
	{
		$.terms_and_conditions.close();
	}
	
}

$.terms_and_conditions.addEventListener('androidback', function(e){
	$.terms_and_conditions.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
});

