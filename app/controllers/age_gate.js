
$.picker.setMaxDate(new Date());
$.picker.setMinDate(new Date(1900, 0, 0, 0, 0, 0, 0));
$.picker_view.anchorPoint =  {x:0.5, y:1};
var birthdate = new Date();

var month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$.picker.addEventListener('change',function(e){
  Ti.API.info("User selected date: " + e.value.toLocaleString());
});

function submitBtnHandler(e) {
	var over18 = false;
    var currentDate = new Date();
    birthdate = $.picker.getValue();

    if(currentDate.getFullYear() - birthdate.getFullYear() > 18)
    {
    	over18 = true;
    }
    else if(currentDate.getFullYear() - birthdate.getFullYear() == 18)
    {
    	var currentMonth = currentDate.getMonth();
    	var birthMonth = birthdate.getMonth();
    	if(currentMonth > birthMonth)
    	{
    		over18 = true;
    	}
    	else if(currentMonth == birthMonth)
    	{
    		var currentDate = currentDate.getDate();
    		var birthdate = birthdate.getDate();
    		if(currentDate >= birthdate)
    		{
    			over18 = true;
    		}
    	}
    }
    
    if(over18)
    {
    	alert("Over 18");
		Ti.App.Properties.setBool('over18', true);
		Alloy.Globals.parent.open();
		$.age_gate.close();
    }
    else
    {
    	alert("Under 18");
    }
}

function TandCBtnHandler(e){
	//alert("Terms and Conditions clicked");
	var terms_and_conditions = Alloy.createController('terms_and_conditions').getView();
	terms_and_conditions.open({modal:true});
}
	
function facebookBtnHandler(e){
	var fb = require('facebook');
	fb.appid = Alloy.Globals.appid;
	fb.permissions = Alloy.Globals.permissions;
	 
	 Ti.API.info("Logged in: " + fb.loggedIn);
	
	if(fb.loggedIn)
	{
		fb.logout();
		alert("logged out");
	}
	
	alert("Facebook button pressed");
	 
	fb.forceDialogAuth = false;
	
	fb.addEventListener('login', function(e) {
	    if (e.success) {
	    	alert('Logged In');
	         Ti.App.Properties.setBool('over18', true);
	         Alloy.Globals.parent.open();
	         $.age_gate.close();
	    } else if (e.error) {
	        alert("Facebook error: " + e.error);
	    } else if (e.cancelled) {
	        alert("Canceled");
	    }
	});
	 
	fb.authorize();
}

function closeDateHandler(e){
	
	$.picker_view.height = "0dp";
	Ti.API.info("Selected value: " + $.picker.getValue());
	
	birthdate = $.picker.getValue();
	var monthofbirth = birthdate.getMonth();
	var dateofbirth = birthdate.getDate();
	var yearofbirth = birthdate.getFullYear();
	Ti.API.info("Month of birth value: " + monthofbirth);
	$.month_birth.text = month[monthofbirth];
	$.date_birth.text = dateofbirth;
	$.year_birth.text = yearofbirth;
	
	//$.picker_view.anchorPoint =  {x:0.5, y:1};
	//var picker_animation = Titanium.UI.createAnimation();
	//picker_animation.top = "0dp";
	//picker_animation.duration = 500;
	
	//$.picker_view.animate(picker_animation);
	
	var animation = Titanium.UI.createAnimation();
	animation.top = "0dp";
	animation.duration = 500;
	$.age_gate_view.animate(animation);
}

function dateBtnHandler(e)
{
	
	var animation = Titanium.UI.createAnimation();
	animation.top = "-78dp";
	animation.duration = 500;
	$.age_gate_view.animate(animation);
	
	$.picker_view.height = Ti.UI.FILL;

	/*var picker = Ti.UI.createPicker({
	  top:50
	});
	var dates = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ];
	var column = Ti.UI.createPickerColumn();

	for(var i=0, ilen=dates.length; i<ilen; i++){
	  var row = Ti.UI.createPickerRow({
	    title: dates[i]
	  });
	  column.addRow(row);
	}

	picker.add(column);
	picker.selectionIndicator = true;
	
	$.age_gate.add(picker);
	$.age_gate.open();
	
	// must be after picker has been displayed
	picker.setSelectedRow(0, 2, false); // select Mangos
	*/
}
