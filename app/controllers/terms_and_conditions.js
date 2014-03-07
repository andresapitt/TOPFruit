Ti.API.info("Terms and Conditions opened");

var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/T_and_Cs.txt");  
 
var TandC_Text = ""; 
 
// If the file exists
if (readFile.exists()){  
	Ti.API.info("Terms and Conditions files exists");
	TandC_Text = readFile.read();
}
else{
	alert("Terms and Conditions text file not found");
}

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

$.TandC_Text.text = TandC_Text.text;

