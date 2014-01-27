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
	$.terms_and_conditions.close();
	
}


$.TandC_Text.text = TandC_Text.text;

