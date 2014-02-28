
//$.picker.setMaxDate(new Date());


if(Ti.Platform.name == "android" )
{
	//date picker
	var date_data = [];
	for(var i = 1;i < 32; i++)
 	{
 		date_data.push(Ti.UI.createPickerRow({title:i}));
 	}
 	$.day_picker.add(date_data);
	
	//month_picker
	var month_data = [];
	var months=new Array("January","February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
 	for(var i = 0;i < 12; i++)
 	{
 		month_data.push(Ti.UI.createPickerRow({title:months[i], value:i}));
 	}
 	$.month_picker.add(month_data);
 	
 	//date picker
	var year_data = [];
	for(var i = 1900;i <= new Date().getFullYear(); i++)
 	{
 		year_data.push(Ti.UI.createPickerRow({title:i}));
 	}
 	$.year_picker.add(year_data);
 	Ti.API.info("year row count: " + $.year_picker.getColumns()[0].rowCount);
 	$.year_picker.setSelectedRow(0, $.year_picker.getColumns()[0].rowCount-1, false);
 	
 	$.age_gate.addEventListener('androidback', function(e){
 		Ti.API.info("back button pressed on age gate");
 		var activity = Titanium.Android.currentActivity;
		activity.finish();
 	});
}
else
{
	var picker = Ti.UI.createPicker({
	  type:Ti.UI.PICKER_TYPE_DATE,
	  minDate:new Date(1900, 0, 0, 0, 0, 0, 0),
	  maxDate:new Date(),
	  //selectionIndicator:true,
	  useSpinner:true,
	  value:new Date(),
	  top:"10dp", 
	  bottom:"10dp",
		height: "200dp",
		width :"400dp"
	});
	
	$.picker_container.add(picker);
	$.picker_view.anchorPoint =  {x:0.5, y:1};
	
	picker.addEventListener('change',function(e){
	  Ti.API.info("User selected date: " + e.value.toLocaleString());
	});
}
	


//$.picker.setMinDate(new Date(1900, 0, 0, 0, 0, 0, 0));
//$.picker_view.anchorPoint =  {x:0.5, y:1};
//var birthdate = new Date();

//var month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/*$.picker.addEventListener('change',function(e){
  Ti.API.info("User selected date: " + e.value.toLocaleString());
});*/



function submitBtnHandler(e) {
	var over18 = false;
    var currentDate = new Date();
    var birthdate = new Date();
    //birthdate = $.picker.getValue();
    if(Ti.Platform.name == "android" )
	{
		birthdate = new Date($.year_picker.getSelectedRow(0).title, $.month_picker.getSelectedRow(0).value, $.day_picker.getSelectedRow(0).title, 0, 0, 0, 0);
		Ti.API.info("birth date: " + birthdate.toString());
	}
	else
	{
    	birthdate = picker.getValue();
	}

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
    	//alert("Over 18");
		Ti.App.Properties.setBool('over18', true);
		 
	    if(Ti.Platform.name == "android" )
		{
			var indexWin = Alloy.createController('index').getView();
			indexWin.open({ activityEnterAnimation: Ti.Android.R.anim.slide_in_left, activityExitAnimation: Ti.Android.R.anim.slide_out_right});
		}
		else
		{
			Alloy.Globals.parent.open();
		}
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
	
	//birthdate = $.picker.getValue();
	birthdate = picker.getValue();
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
	animation.duration = 400;
	$.age_gate_view.animate(animation);
}

function dateBtnHandler(e)
{
	if(Ti.Platform.name == "android" )
	{
		Ti.API.info("android dd pressed: " + e.source.id);
		var picker = Ti.UI.createPicker({
		  top:0,
		  color:"black"
		});
		var data = [];
		switch(e.source.id)
		{
			case "birth_date_dd":
			  //x="Today is Sunday";
			  //var months=new Array("January","February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
			 	for(var i = 0;i < 32; i++)
			 	{
			 		data.push(Ti.UI.createPickerRow({title:i}));
			 	}
			 	picker.add(data);
			  break;
			case "birth_month_dd":
			 // x="Today is Monday";
			 	var months=new Array("January","February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
			 	for(var i = 0;i < 12; i++)
			 	{
			 		data.push(Ti.UI.createPickerRow({title:months[i]}));
			 	}
			 	picker.add(data);
			 	//data[0]=Ti.UI.createPickerRow({title:'January'});
				//data[1]=Ti.UI.createPickerRow({title:'February'});
				//data[2]=Ti.UI.createPickerRow({title:'March'});
				//data[3]=Ti.UI.createPickerRow({title:'April'});
			  break;
			case "birth_year_dd":
			  //x="Today is Tuesday";
			  break;
		}
	
		
		
		picker.selectionIndicator = true;
		e.source.add(picker);
	}
	else
	{
		var animation = Titanium.UI.createAnimation();
	
		animation.top = "-78dp";	
	
		animation.duration = 400;
		$.age_gate_view.animate(animation);
		
		$.picker_view.height = Ti.UI.FILL;
	}
	
}
