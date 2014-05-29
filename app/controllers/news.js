/*
 * 
 * News screen 
 * Gives the users the options of viewing events, competitions and Worlds Best Bars
 * 
 */

function openEvents(e)
{
	var eventsWin = Alloy.createController('events').getView();
	if(Ti.Platform.name == "android" )
	{
		eventsWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else if(Ti.Platform.name == "mobileweb" )
	{
		eventsWin.open();
	}
	else
	{
		Alloy.Globals.parent.openWindow(eventsWin);
	}
}

function openBestBars(e)
{
	var bestBarsWin = Alloy.createController('best_bars').getView();
	if(Ti.Platform.name == "android" )
	{
		bestBarsWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else if(Ti.Platform.name == "mobileweb" )
	{
		bestBarsWin.open();
	}
	else
	{
    	Alloy.Globals.parent.openWindow(bestBarsWin);
	}
}

function openBarSmarts(e)
{
	var barSmartsWin = Alloy.createController('bar_smarts').getView();
	if(Ti.Platform.name == "android" )
	{
		barSmartsWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else if(Ti.Platform.name == "mobileweb" )
	{
		barSmartsWin.open();
	}
	else
	{
    	Alloy.Globals.parent.openWindow(barSmartsWin);
    }
}

function openCompetitions(e)
{
	var compWin = Alloy.createController('competitions').getView();
	if(Ti.Platform.name == "android" )
	{
		compWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
	}
	else if(Ti.Platform.name == "mobileweb" )
	{
		compWin.open();
	}
	else
	{
    	Alloy.Globals.parent.openWindow(compWin);
   	}
}

function closeWindow(e)
{
	var a = Alloy.Globals.windowStack.indexOf($.news);
	Alloy.Globals.windowStack.splice(a,1);
	if(Ti.Platform.name == "android" )
	{
		$.news.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	}
	else
	{
		$.news.close();
	}
}

function goToHome(e)
{
	Alloy.Globals.goToHome(e);
}


$.news.addEventListener('close', function(e){
});

$.news.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.news);
	
});

$.news.addEventListener('androidback', function(e){
	$.news.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
	var a = Alloy.Globals.windowStack.indexOf($.news);
	Alloy.Globals.windowStack.splice(a,1);
});


