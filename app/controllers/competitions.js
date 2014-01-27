function closeWindow(e)
{
	$.competitions.close();
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

$.competitions.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.competitions);
	Alloy.Globals.windowStack.splice(a,1);
});

$.competitions.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.competitions);
});
