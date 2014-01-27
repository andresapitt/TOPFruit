function closeWindow(e)
{
	$.events.close();
}

function goToHome(e)
{
	/*
	for(var i = Alloy.Globals.windowStack.length-1; i >= 0; i--)
	{
		//Ti.API.info("index to remove: " + i);
		//Ti.API.info("object at index: " + Alloy.Globals.windowStack[i]);
		if(i == Alloy.Globals.windowStack.length-1)
		{
			//Alloy.Globals.parent.closeWindow(Alloy.Globals.windowStack[i], {animated:true});
			Alloy.Globals.windowStack[i].close();
		}
		else
		{
			//Alloy.Globals.parent.closeWindow(Alloy.Globals.windowStack[i], {animated:false});
			Alloy.Globals.windowStack[i].close({animated:false});
		}
	}	*/
	for(var i = 0; i < Alloy.Globals.windowStack.length; i++)
	{
		//Ti.API.info("index to remove: " + i);
		//Ti.API.info("object at index: " + Alloy.Globals.windowStack[i]);
		if(i == Alloy.Globals.windowStack.length-1)
		{
			//Alloy.Globals.parent.closeWindow(Alloy.Globals.windowStack[i], {animated:true});
			Alloy.Globals.windowStack[i].close();
		}
		else
		{
			//Alloy.Globals.parent.closeWindow(Alloy.Globals.windowStack[i], {animated:false});
			Alloy.Globals.windowStack[i].close({animated:false});
		}
	}
}

$.events.addEventListener('close', function(e){
	Ti.API.info('News window closed');
	
	var a = Alloy.Globals.windowStack.indexOf($.events);
	Alloy.Globals.windowStack.splice(a,1);
});

$.events.addEventListener('open', function(e){
	Ti.API.info('News window opened');
	
	Alloy.Globals.windowStack.push($.events);
});
