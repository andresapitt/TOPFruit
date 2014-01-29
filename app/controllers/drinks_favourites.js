function closeWindow(e)
{
	$.drinks_favourites.close();
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

$.drinks_favourites.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.drinks_favourites);
	Alloy.Globals.windowStack.splice(a,1);
});

$.drinks_favourites.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.drinks_favourites);
});
