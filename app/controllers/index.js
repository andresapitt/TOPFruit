//Alloy.Globals.parent = $.index;

Alloy.Globals.parent = $.win1;

function doClick(e) {
    alert($.label.text);
}

//Ti.App.Properties.setBool('over18', false);

var ageGaitSuccess = Ti.App.Properties.getBool('over18', false);

// if the age gait hasn't been successfully passed yet show the age gait screen
if(!ageGaitSuccess)
{
	var age_gate = Alloy.createController('age_gate').getView();
	age_gate.open();
}
else //open home page of app
{
	//$.index.open();
	$.win1.open();
}

function openSearch(e){
	var searchWin = Alloy.createController('search').getView();
    $.win1.openWindow(searchWin);
}

function openTips(e){
	var tipsWin = Alloy.createController('tips').getView();
    $.win1.openWindow(tipsWin);
}


function openBrands(e){
	var brandsWin = Alloy.createController('brands').getView();
    $.win1.openWindow(brandsWin);
}


function openNews(e){
	var newsWin = Alloy.createController('news').getView();
    $.win1.openWindow(newsWin);
}
function openTandCs(e)
{
	var terms_and_conditions = Alloy.createController('terms_and_conditions').getView();
	terms_and_conditions.open({modal:true});
}
