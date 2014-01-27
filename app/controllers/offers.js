function closeWindow(e)
{
	$.offers.close();
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

$.offers.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.offers);
	Alloy.Globals.windowStack.splice(a,1);
});

$.offers.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.offers);
});
