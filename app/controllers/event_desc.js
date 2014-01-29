Ti.API.info("Opening event desciption page");

var args = arguments[0] || {};
var eventName = args.title || 'Title not received';
//$.recipeTitle.text = args.title || 'Title not received';
Ti.API.info("Event title: " + eventName);
$.event_title.text = args.title || 'Title not received';
$.event_desc_text.text = args.desc || 'Description not received';

function closeWindow(e)
{
	$.event_desc.close();
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

$.event_desc.addEventListener('close', function(e){
	var a = Alloy.Globals.windowStack.indexOf($.event_desc);
	Alloy.Globals.windowStack.splice(a,1);
});

$.event_desc.addEventListener('open', function(e){
	Alloy.Globals.windowStack.push($.event_desc);
});