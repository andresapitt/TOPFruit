function closeWindow(e)
{
	$.best_bars.close();
}

function goToHome(e)
{
	for(var i = 0; i < Alloy.Globals.windowStack.length; i++)
	{
		if(i == Alloy.Globals.windowStack.length-1)
		{
			Alloy.Globals.windowStack[i].close();
		}
		else
		{
			Alloy.Globals.windowStack[i].close({animated:false});
		}
	}
}

$.best_bars.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.best_bars);
	Alloy.Globals.windowStack.splice(a,1);
});

$.best_bars.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.best_bars);
});
