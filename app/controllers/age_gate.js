/*
* Opening App screen - prompts user to enter age or login to the app using facebook
*/

if(Ti.Platform.name == "android" )
{
	//var columns = [];
	//columns[0] = Ti.UI.createPickerColumn();
	//columns[1] = Ti.UI.createPickerColumn();
	//date picker
	var date_data = [];
	for(var i = 1;i < 32; i++)
 	{
 		date_data.push(Ti.UI.createPickerRow({title:i}));
 		//columns[0].addRow(Ti.UI.createPickerRow({title:i}));
 	}
 	$.day_picker.add(date_data);
	
	//month_picker
	var month_data = [];
	var months=new Array("January","February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
 	for(var i = 0;i < 12; i++)
 	{
 		month_data.push(Ti.UI.createPickerRow({title:months[i], value:i, fontSize:6, horizontalWrap:true}));
 		//columns[1].addRow(Ti.UI.createPickerRow({title:months[i], value:i, fontSize:6, horizontalWrap:true}));
 	}
 	$.month_picker.add(month_data);
 	//$.month_picker.setColumns(columns);
 	
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
else if (Ti.Platform.name == "iPhone OS" )
{
	var picker = Ti.UI.createPicker({
	  type:Ti.UI.PICKER_TYPE_DATE,
	  minDate:new Date(1900, 0, 0, 0, 0, 0, 0),
	  maxDate:new Date(new Date().getFullYear(), 11, 31, 0, 0, 0, 0),
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
	
	if(Ti.Platform.name == "iPhone OS" &&  Ti.Platform.displayCaps.platformHeight == 480)
	{	
		$.banner_img.height="150dp";
	}
	else if(Ti.Platform.name == "iPhone OS" &&  Ti.Platform.displayCaps.platformHeight > 480)
	{
		$.drinkaware_img.top = "40dp";
	}
}
else if (Ti.Platform.name == "mobileweb" )
{
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
 	//Ti.API.info('month picker column length: ' + $.month_picker.columns[0].rows.length);
 	
 	//date picker
	var year_data = [];
	for(var i = 1900;i <= new Date().getFullYear(); i++)
 	{
 		year_data.push(Ti.UI.createPickerRow({title:i}));
 	}
 	$.year_picker.add(year_data);
 	//Ti.API.info("year row count: " + $.year_picker.getColumns()[0].rowCount);
 	$.year_picker.setSelectedRow(0, $.year_picker.getColumns()[0].rowCount-1, false);
 	//Ti.API.info('year picker column length: ' + $.year_picker.columns[0].rows.length);
}
	
$.age_gate.addEventListener('close', function(e){
	Ti.API.info('age gate window closed');
});
$.age_gate.addEventListener('open', function(e){
	Ti.API.info('age gate window opened');
});

//$.picker.setMinDate(new Date(1900, 0, 0, 0, 0, 0, 0));
//$.picker_view.anchorPoint =  {x:0.5, y:1};
//var birthdate = new Date();

//var month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/*$.picker.addEventListener('change',function(e){
  Ti.API.info("User selected date: " + e.value.toLocaleString());
});*/

var month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
	else if(Ti.Platform.name == "mobileweb" )
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
			indexWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
		}
		else
		{
			Alloy.Globals.parent.open();
		}
		if(Ti.Platform.name == "android" )
		{
			$.age_gate.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
		}
		else
		{
			$.age_gate.close();
		}
    }
    else
    {
    	//alert("Under 18");
    	if(Ti.Platform.name != "mobileweb" )
		{
			var dialog = Ti.UI.createAlertDialog({
			    message: "You must be at least 18 years old to use The Perfect Mix app!",
			    ok: 'OK',
			    title: 'Error'
			  }).show();
		 }
		 else
		 {
		 	alert("You must be at least 18 years old to use The Perfect Mix app!");
		 }
    }
}

function TandCBtnHandler(e){
	//alert("Terms and Conditions clicked");
	var terms_and_conditions = Alloy.createController('terms_and_conditions').getView();
	if(Ti.Platform.name == "android")
	{
		//terms_and_conditions.open({modal:true, activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
		terms_and_conditions.open({/*modal:true, */activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		terms_and_conditions.open({modal:true});
	}
}

//var fb = require('facebook');
//fb.appid = Alloy.Globals.appid;
//fb.permissions = Alloy.Globals.permissions;
//fb.forceDialogAuth = false;

function facebookLoginHandler(e){
	//var alertString = "FACEBOOK return: ";
	//alertString += ", code: " + e.code.toString();
	//alert(alertString);
	 if (e.success) {
    	//alert('Logged In');
    	 Ti.API.info("FACEBOOK login success: " + e.toString());
         Ti.App.Properties.setBool('over18', true);
         Alloy.Globals.parent.open();
         $.age_gate.close();
         Alloy.Globals.fb.removeEventListener('login', facebookLoginHandler);
       //  alert('success');
    } else if (e.error) {
    	Ti.API.info("FACEBOOK login error: " + e.toString());
        //alert("Facebook error: " + e.error);
        var dialog = Ti.UI.createAlertDialog({
		    message: "ERROR: " + e.error,
		    ok: 'Ok',
		    title: 'Facebook'
		  }).show();
    } else if (e.cancelled) {
    	Ti.API.info("FACEBOOK login cancel: " + e.toString());
        alert("Cancelled");
    }
    else if(e.code != 0) // some error has occured, use old login system
    {
    	Alloy.Globals.fb.forceDialogAuth = true;
		Alloy.Globals.fb.authorize();
    }
    else
    {
    	Ti.API.info("FACEBOOK return: " + e.toString());
    	//alert("FACEBOOK return: " + e.toString());
    }
}

if(Ti.Platform.name != "mobileweb")
{
	Alloy.Globals.fb.addEventListener('login', facebookLoginHandler);
}

	
function facebookBtnHandler(e){
	//var fb = require('facebook');
	//fb.appid = Alloy.Globals.appid;
	//fb.permissions = Alloy.Globals.permissions;
	 
	 //Ti.API.info("Logged in: " + fb.loggedIn);
	
	/*if(fb.loggedIn == true)
	{
		fb.logout();
		Ti.API.info("Logged out ");
	}*/
	
	//alert("Facebook button pressed");
	 
	
	//Alloy.Globals.fb.appid = "183073991901631";
//	Alloy.Globals.fb.permissions = ["email"];
	//Alloy.Globals.fb.forceDialogAuth = false;


	Ti.API.info("FACEBOOK authorise, is it logged in: " + Alloy.Globals.fb.getLoggedIn() );
	if(!Alloy.Globals.fb.getLoggedIn())
	{
		Alloy.Globals.fb.authorize();
	}
	else
	{
		Ti.App.Properties.setBool('over18', true);
         Alloy.Globals.parent.open();
         $.age_gate.close();
         Alloy.Globals.fb.removeEventListener('login', facebookLoginHandler);
	}
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
		
		//$.picker_view.height = Ti.UI.FILL;
		$.picker_view.height = "300dp";
		$.picker_view.bottom = 0;
		Ti.API.info("height after animation: " + $.picker_view.height + ", bottom: " + $.picker_view.bottom );
	}
	
}
