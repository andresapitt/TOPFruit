//Alloy.Globals.parent = $.index;

Alloy.Globals.parent = $.win1;

function doClick(e) {
    alert($.label.text);
}


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

function openFavourites(e){
	//var drinksFavWin = Alloy.createController('drinks_favourites').getView();
    //$.win1.openWindow(drinksFavWin);
    
    var drinksFavWin = Alloy.createController('cocktail_results',  {ID:"favourites"} ).getView();
    $.win1.openWindow(drinksFavWin);
    	
}

function openDrinks(e){
	var drinksWin = Alloy.createController('drinks_categories').getView();
    $.win1.openWindow(drinksWin);
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
