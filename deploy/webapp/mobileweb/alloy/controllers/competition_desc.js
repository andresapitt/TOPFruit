function Controller(){function i(){var i=Alloy.Globals.windowStack.indexOf(e.competition_desc);Alloy.Globals.windowStack.splice(i,1),e.competition_desc.close()}function o(i){Alloy.Globals.goToHome(i)}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="competition_desc",arguments[0]?arguments[0].__parentSymbol:null,arguments[0]?arguments[0].$model:null,arguments[0]?arguments[0].__itemTemplate:null;var e=this,t={},l={};e.__views.competition_desc=Ti.UI.createWindow({backgroundColor:"white",titleAttributes:{color:Alloy.Globals.PrimaryColor,font:{fontFamily:Alloy.Globals.MainFont,fontSize:"18dp"}},barColor:"#fff",layout:"vertical",height:"568dp",width:"320dp",navBarHidden:!0,orientationModes:[Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT],tintColor:Alloy.Globals.PrimaryColor,navTintColor:Alloy.Globals.PrimaryColor,title:"COMPETITION",id:"competition_desc"}),e.__views.competition_desc&&e.addTopLevelView(e.__views.competition_desc),e.__views.__alloyId138=Ti.UI.createView({height:"50dp",width:Ti.UI.FILL,top:"0dp",id:"__alloyId138"}),e.__views.competition_desc.add(e.__views.__alloyId138),e.__views.__alloyId139=Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.FILL,backgroundColor:"#fff",opacity:"1",id:"__alloyId139"}),e.__views.__alloyId138.add(e.__views.__alloyId139),e.__views.__alloyId140=Ti.UI.createView({width:Ti.UI.FILL,id:"__alloyId140"}),e.__views.__alloyId138.add(e.__views.__alloyId140),e.__views.__alloyId141=Ti.UI.createView({backgroundImage:"/images/icons/back.png",left:"10dp",top:"10dp",bottom:"10dp",height:"30dp",width:"30dp",id:"__alloyId141"}),e.__views.__alloyId140.add(e.__views.__alloyId141),i?e.__views.__alloyId141.addEventListener("click",i):l["$.__views.__alloyId141!click!closeWindow"]=!0,e.__views.__alloyId142=Ti.UI.createLabel({color:"#313646",font:{fontFamily:Alloy.Globals.MainFont,fontSize:"20dp"},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,left:"50dp",right:"50dp",text:"COMPETITION",id:"__alloyId142"}),e.__views.__alloyId140.add(e.__views.__alloyId142),e.__views.__alloyId143=Ti.UI.createView({backgroundImage:"/images/icons/home.png",right:"10dp",top:"10dp",bottom:"10dp",height:"30dp",width:"30dp",id:"__alloyId143"}),e.__views.__alloyId140.add(e.__views.__alloyId143),o?e.__views.__alloyId143.addEventListener("click",o):l["$.__views.__alloyId143!click!goToHome"]=!0,e.__views.__alloyId144=Ti.UI.createView({height:"1dp",width:Ti.UI.FILL,backgroundImage:"/images/common/color_sep.png",top:"0dp",id:"__alloyId144"}),e.__views.competition_desc.add(e.__views.__alloyId144),e.__views.comp_scroll_view=Ti.UI.createScrollView({top:"0dp",layout:"vertical",bottom:"0dp",width:Ti.UI.FILL,height:Ti.UI.FILL,contentWidth:"auto",contentHeight:Ti.UI.SIZE,disableBounce:!0,showVerticalScrollIndicator:!0,showHorizontalScrollIndicator:!1,backgroundColor:"#efefef",id:"comp_scroll_view"}),e.__views.competition_desc.add(e.__views.comp_scroll_view),e.__views.comp_item_block=Ti.UI.createView({backgroundColor:"#fff",height:Ti.UI.SIZE,borderRadius:4,borderColor:"#d1d1d1",borderWidth:1,top:"10dp",left:"5dp",right:"5dp",layout:"vertical",bottom:"10dp",id:"comp_item_block"}),e.__views.comp_scroll_view.add(e.__views.comp_item_block),e.__views.competition_banner_image=Ti.UI.createView({id:"competition_banner_image",width:Ti.UI.FILL,bottom:"5dp",height:Ti.UI.SIZE}),e.__views.comp_item_block.add(e.__views.competition_banner_image),e.__views.competition_title=Ti.UI.createLabel({color:Alloy.Globals.PrimaryColor,font:{fontFamily:Alloy.Globals.BoldFont,fontSize:"18dp"},left:"15dp",right:"15dp",bottom:"10dp",top:"10dp",height:Ti.UI.SIZE,id:"competition_title"}),e.__views.comp_item_block.add(e.__views.competition_title),e.__views.competition_desc_text=Ti.UI.createLabel({color:Alloy.Globals.PrimaryColor,font:{fontFamily:Alloy.Globals.MainFont,fontSize:"16dp"},top:"2dp",bottom:"10dp",height:Ti.UI.SIZE,left:"15dp",right:"15dp",textAlign:Ti.UI.LEFT,id:"competition_desc_text"}),e.__views.comp_item_block.add(e.__views.competition_desc_text),e.__views.competition_visit_site_btn=Ti.UI.createButton({top:"0dp",color:"#fff",backgroundColor:Alloy.Globals.PrimaryColor,font:{fontFamily:Alloy.Globals.BoldFont,fontSize:"16dp"},left:"5dp",right:"5dp",height:"40dp",borderRadius:4,bottom:"10dp",id:"competition_visit_site_btn",title:"VIEW COMPETITION"}),e.__views.comp_scroll_view.add(e.__views.competition_visit_site_btn),t.destroy=function(){},_.extend(e,e.__views);var d=arguments[0]||{};if(d.title||"Title not received",e.competition_title.text=d.title||"Title not received",null!=d.banner_img_url&&""!=d.banner_img_url){var n="160dp";Ti.API.info("new height: "+n);var a=Alloy.Globals.Utils.RemoteImage({image:d.banner_img_url,defaultImage:"/images/placeholders/ph_events.png",height:n,width:Ti.UI.FILL});e.competition_banner_image.add(a)}null!=d.description&&""!=d.description&&(e.competition_desc_text.text=d.description),null!=d.more_info_url&&""!=d.more_info_url?e.competition_visit_site_btn.addEventListener("click",function(){Ti.API.info("Competition website button clicked! Go to: "+d.more_info_url),Ti.Platform.openURL(d.more_info_url)}):e.comp_scroll_view.remove(e.competition_visit_site_btn),e.competition_desc.addEventListener("close",function(){}),e.competition_desc.addEventListener("open",function(){Alloy.Globals.windowStack.push(e.competition_desc)}),e.competition_desc.addEventListener("androidback",function(){e.competition_desc.close({activityEnterAnimation:Ti.App.Android.R.anim.slide_in_left,activityExitAnimation:Ti.App.Android.R.anim.slide_out_right});var i=Alloy.Globals.windowStack.indexOf(e.competition_desc);Alloy.Globals.windowStack.splice(i,1)}),l["$.__views.__alloyId135!click!closeWindow"]&&e.__views.__alloyId135.addEventListener("click",i),l["$.__views.__alloyId137!click!goToHome"]&&e.__views.__alloyId137.addEventListener("click",o),l["$.__views.__alloyId141!click!closeWindow"]&&e.__views.__alloyId141.addEventListener("click",i),l["$.__views.__alloyId143!click!goToHome"]&&e.__views.__alloyId143.addEventListener("click",o),l["$.__views.__alloyId146!click!goToHome"]&&e.__views.__alloyId146.addEventListener("click",o),l["$.__views.__alloyId148!click!closeWindow"]&&e.__views.__alloyId148.addEventListener("click",i),_.extend(e,t)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;