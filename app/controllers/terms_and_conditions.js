Ti.API.info("Terms and Conditions opened");
/*
if(Ti.Platform.name == "android" || Ti.Platform.name == "mobileweb")
{
	var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/T_and_Cs.html");  
}
else
{
	var readFile = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory , "data/T_and_Cs.txt");  
}
 
var TandC_Text = ""; 
 
// If the file exists
if (readFile.exists()){  
	Ti.API.info("Terms and Conditions files exists");
	TandC_Text = readFile.read();
}
else{
	alert("Terms and Conditions text file not found");
}
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

if(Ti.Platform.name == "android" || Ti.Platform.name == "mobileweb")
{
	//Ti.API.info("set html method, string is:" + TandC_Text);
	//$.TandC_Text.setHtml(TandC_Text);
}
else
{
	
	//$.TandC_Text.text = TandC_Text;
}


