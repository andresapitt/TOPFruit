function closeWindow(e)
{
	$.bar_smarts.close();
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

$.bar_smarts.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.bar_smarts);
	Alloy.Globals.windowStack.splice(a,1);
});

$.bar_smarts.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.bar_smarts);
});
