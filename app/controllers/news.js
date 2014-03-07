Ti.API.info("Opening News Page");

function openEvents(e)
{
	var eventsWin = Alloy.createController('events').getView();
	if(Ti.Platform.name == "android" )
	{
		eventsWin.open({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_right, activityExitAnimation: Ti.App.Android.R.anim.slide_out_left});
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
	else
	{
    	Alloy.Globals.parent.openWindow(compWin);
   	}
}

function closeWindow(e)
{
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
	for(var i = 0; i < Alloy.Globals.windowStack.length; i++)
	{
		if(i == Alloy.Globals.windowStack.length-1)
		{
			if(Ti.Platform.name == "android" )
			{
				Alloy.Globals.windowStack[i].close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
			}
			else
			{
				Alloy.Globals.windowStack[i].close();
			}
		}
		else
		{
			Alloy.Globals.windowStack[i].close({animated:false});
		}
	}
}


$.news.addEventListener('close', function(e){
	Ti.API.info('News window closed');
	
	var a = Alloy.Globals.windowStack.indexOf($.news);
	Alloy.Globals.windowStack.splice(a,1);
});

$.news.addEventListener('open', function(e){
	Ti.API.info('News window opened');
	
	Alloy.Globals.windowStack.push($.news);
	
});

$.news.addEventListener('androidback', function(e){
	$.news.close({ activityEnterAnimation: Ti.App.Android.R.anim.slide_in_left, activityExitAnimation: Ti.App.Android.R.anim.slide_out_right});
});


