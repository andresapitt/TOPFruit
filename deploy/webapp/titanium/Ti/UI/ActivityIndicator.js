define(["Ti/_/declare","Ti/_/lang","Ti/_/UI/Widget","Ti/_/dom","Ti/_/style","Ti/Locale","Ti/UI","Ti/UI/ActivityIndicatorStyle"],function(t,i,e,r,o,n,a,s){var c=.3,d=o.set;return t("Ti.UI.ActivityIndicator",e,{constructor:function(){var t=this._contentContainer=a.createView({layout:a._LAYOUT_CONSTRAINING_HORIZONTAL,width:a.SIZE,height:a.SIZE});this._add(t),e.prototype.hide.call(this),t._add(this._indicatorIndicator=a.createView()),t._add(this._indicatorMessage=a.createLabel()),this._createProngs()},_createProngs:function(){var t,i=0,e=this._prongs=[],o=this._indicatorIndicator,n=o.domNode,a=this.indicatorColor,s=this.indicatorDiameter,d=s/36;for(o.width=o.height=s;n.firstChild;)n.removeChild(n.firstChild);for(t=r.create("div",{className:"TiUIActivityIndicatorProngContainer",style:{transformOrigin:"0px 0px",transform:"scale("+d+")"}},n);12>i;i++)e.push(r.create("div",{className:"TiUIActivityIndicatorProng",style:{transform:"translate(16px,0px) rotate("+30*i+"deg)",transformOrigin:"2px 18px",opacity:c,backgroundColor:a}},t))},show:function(){e.prototype.show.call(this),this._timer=setInterval(i.hitch(this,"_animate"),100)},hide:function(){clearTimeout(this._timer),e.prototype.hide.call(this)},_currentProng:0,_animate:function(){var t=this._prongs[this._currentProng];12==++this._currentProng&&(this._currentProng=0),d(t,"transition",""),setTimeout(function(){d(t,"opacity",1),setTimeout(function(){d(t,"transition","opacity 500ms linear 0ms"),setTimeout(function(){d(t,"opacity",c)},1)},1)},1)},_defaultWidth:a.SIZE,_defaultHeight:a.SIZE,_messagePadding:0,properties:{color:{set:function(t){return this._indicatorMessage.color=t}},font:{set:function(t){return this._indicatorMessage.font=t}},indicatorColor:{post:"_createProngs",value:"#fff"},indicatorDiameter:{post:"_createProngs",value:36},message:{set:function(t){var i=this._indicatorMessage;return i.left=t?5:0,i.text=t}},messageid:{set:function(t){var i=this._indicatorMessage;return i.left=t?5:0,i.textid=t}},style:{set:function(t){this.indicatorColor=~[s.DARK,s.BIG_DARK].indexOf(t)?"#444":"#fff",this.indicatorDiameter=~[s.BIG,s.BIG_DARK].indexOf(t)?72:36}}}})});