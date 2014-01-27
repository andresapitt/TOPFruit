Ti.API.info("Opening News Page");

function openEvents(e)
{
	var eventsWin = Alloy.createController('events').getView();
    Alloy.Globals.parent .openWindow(eventsWin);
}

function openBestBars(e)
{
	var bestBarsWin = Alloy.createController('best_bars').getView();
    Alloy.Globals.parent .openWindow(bestBarsWin);
}

function openBarSmarts(e)
{
	var barSmartsWin = Alloy.createController('bar_smarts').getView();
    Alloy.Globals.parent .openWindow(barSmartsWin);
}

function openCompetitions(e)
{
	var compWin = Alloy.createController('competitions').getView();
    Alloy.Globals.parent .openWindow(compWin);
}

function openOffers(e)
{
	var offersWin = Alloy.createController('offers').getView();
    Alloy.Globals.parent .openWindow(offersWin);
}


function closeWindow(e)
{
	$.news.close();
}

function goToHome(e)
{
	for(var i = Alloy.Globals.windowStack.length-1; i >= 0; i--)
	{
		//Ti.API.info("index to remove: " + i);
		//Ti.API.info("object at index: " + Alloy.Globals.windowStack[i]);
		Alloy.Globals.parent.closeWindow(Alloy.Globals.windowStack[i]);
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

