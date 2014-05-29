define(["Ti/_","Ti/_/Evented","Ti/_/has","Ti/_/lang","Ti/_/ready","Ti/_/style","Ti/_/dom","Ti/_/event","Ti/_/has","Ti/_/Gestures/DoubleTap","Ti/_/Gestures/Dragging","Ti/_/Gestures/LongPress","Ti/_/Gestures/Pinch","Ti/_/Gestures/SingleTap","Ti/_/Gestures/Swipe","Ti/_/Gestures/TouchCancel","Ti/_/Gestures/TouchEnd","Ti/_/Gestures/TouchMove","Ti/_/Gestures/TouchStart","Ti/_/Gestures/TwoFingerTap"],function(e,t,i,o,n,r,_,a,i,T,u,s,E,c,d,l,I,h,N,A){var m,R,f,L=window,g=document,O=g.body,U=require.on,p=require.is,y="2DMatrix,ActivityIndicator,AlertDialog,Animation,Button,EmailDialog,ImageView,Label,OptionDialog,Picker,PickerColumn,PickerRow,ProgressBar,ScrollableView,ScrollView,Slider,Switch,Tab,TabGroup,TableView,TableViewRow,TableViewSection,TextArea,TextField,View,WebView,Window",C={},P=r.set,v=navigator.userAgent.toLowerCase().match(/(iphone|android)/),D=v&&"iphone"===v[0],S={},b=function(){Ti.UI._recalculateLayout(),m=0},w=b,G=_.unitize,Y=[N,I,h,l,u,c,T,s,E,d,A];return U(O,"touchmove",function(e){e.preventDefault()}),y.split(",").forEach(function(e){C["create"+e]=function(t){return new(require("Ti/UI/"+e))(t)}}),!navigator.standalone&&v&&(w=function(){if(!m){m=1;var e,t=0|require("Ti/Gesture").isPortrait,i=S[t];i||(D?(i=L.innerHeight+60,L.screen.availHeight-i>50&&(i+=50)):i=L.outerHeight/(L.devicePixelRatio||0),S[t]=i),P(O,"height",i+"px"),D?(L.scrollTo(0,0),b()):e=setInterval(function(){L.scrollTo(0,-1),L.innerHeight+1>=i&&(clearTimeout(e),b())},50)}},n(w),U(L,"orientationchange",w),U(L,"touchstart",w)),n(10,function(){setTimeout(function(){function e(e,t){var i,o,n,_=0,a=Y.length,T=[],u=t._elements;if(u&&u.length){for(r||require.mix(t,{touches:"mouseup"===t.type?[]:[t],targetTouches:[],changedTouches:[t]});a>_;_++)if(n=Y[_]["process"+e]){o=n(t,u);for(i in o)T[i]||(T[i]=[]),T[i]=T[i].concat(o[i])}Ti.UI._fireGestureEvents(T,u)}}var t=Ti.UI._container=Ti.UI.createView({left:0,top:0}),o=t.domNode,n=t._layoutCoefficients,r=i("touch"),_=0;n.width.x1=1,n.height.x1=1,t._measuredTop=0,t._measuredLeft=0,o.id="TiUIContainer",P(o,"overflow","hidden"),O.appendChild(o),(R=g.getElementById("splash"))&&t.addEventListener("postlayout",function(){setTimeout(function(){P(R,{position:"absolute",width:G(t._measuredWidth),height:G(t._measuredHeight),left:0,top:0,right:"",bottom:""})},10)}),w(),U(o,r?"touchstart":"mousedown",function(t){var i=[U(L,r?"touchmove":"mousemove",function(t){(r||_)&&e("TouchMoveEvent",t)}),U(L,r?"touchend":"mouseup",function(t){_=0,e("TouchEndEvent",t),a.off(i)}),r&&U(L,"touchcancel",function(t){e("TouchCancelEvent",t),a.off(i)})];_=1,e("TouchStartEvent",t)})},1)}),U(L,"resize",function(){Ti.UI._recalculateLayout()}),o.setObject("Ti.UI",t,C,{_addWindow:function(e,t){return this._container.add(e.modal?e._modalParentContainer:e),t&&this._setWindow(e),R&&_.destroy(R),e},_setWindow:function(e){this.__values__.constants.currentWindow=e},_removeWindow:function(e){return this._container.remove(e.modal?e._modalParentContainer:e),e},_fireGestureEvents:function(e,t){for(var i,o,n,r,_,a=0,T=Y.length,u=0;t[u]&&!t[u]._isPublished;)u++;t[u]||(u=0);for(a in e)for(i=0,T=e[a].length;T>i;i++)_=e[a][i],p(_.x,"Number")&&p(_.y,"Number")?(r=this._container.convertPointToView({x:_.x,y:_.y},t[u]),o=r?r.x:_.x,n=r?r.y:_.y):o=n=void 0,_.x=o,_.y=n,_.bubbles=!0,_.cancelBubble=!1,t[u].fireEvent(a,_)},_layoutSemaphore:0,_nodesToLayout:[],_startLayout:function(){this._layoutSemaphore++},_finishLayout:function(){0===--this._layoutSemaphore&&this._triggerLayout(!0)},_elementLayoutCount:0,_triggerLayout:function(e,t){function o(){n._elementLayoutCount=0;var e,t,o,r,_,a,T,u,s,E,c=n._nodesToLayout,d=[],l=!1,I=n._container,h=c.length;for(i("ti-instrumentation")&&(n._layoutInstrumentationTest=instrumentation.startTest("Layout")),s=0;h>s;s++)if(e=c[s],e._isAttachedToActiveWin()){for(T=[e];T.length>0;){t=T.pop(),t._markedForLayout=!0,_=t._children;for(E in _)a=_[E],("composite"!==t.layout||a._needsMeasuring||t._layout._isDependentOnParent(a))&&T.push(a)}if(e===I)l=!0;else for(o=e;;){if(o._markedForLayout=!0,r=o,o=o._parent,u=!1,!o||o===I){l=!0;break}for(o._hasSizeDimensions()||o._needsMeasuring||(!o._markedForLayout&&!~d.indexOf(o)&&d.push(o),u=!0),T=[o];T.length>0;){t=T.pop(),_=t._children;for(E in _)a=_[E],a!==r&&("composite"!==t.layout||a._needsMeasuring||t._layout._isDependentOnParent(a))&&(a._markedForLayout=!0,T.push(a))}if(u)break}}if(l){var N=I.__values__.properties,A=I._measuredWidth=N.width=L.innerWidth,m=I._measuredHeight=N.height=L.innerHeight;I._measuredSandboxWidth=A,I._measuredSandboxHeight=m,I.fireEvent("postlayout"),P(I.domNode,{width:A+"px",height:m+"px"}),I._layout._doLayout(I,A,m,!1,!1)}for(s=0;s<d.length;s++)t=d[s],t._layout._doLayout(t,t._measuredWidth-t._borderLeftWidth-t._borderRightWidth,t._measuredHeight-t._borderTopWidth-t._borderBottomWidth,t._parent._layout._getWidth(t,t.width)===Ti.UI.SIZE,t._parent._layout._getHeight(t,t.height)===Ti.UI.SIZE);i("ti-instrumentation")&&instrumentation.stopTest(n._layoutInstrumentationTest,n._elementLayoutCount+" out of approximately "+document.getElementById("TiUIContainer").getElementsByTagName("*").length+" elements laid out."),n._layoutInProgress=!1,n._layoutTimer=null,n._nodesToLayout=[],n.fireEvent("postlayout")}var n=this;~n._nodesToLayout.indexOf(e)||(n._nodesToLayout.push(e),t?(clearTimeout(n._layoutTimer),n._layoutInProgress=!0,o()):1===n._nodesToLayout.length&&(n._layoutInProgress=!0,n._layoutTimer=setTimeout(o,10)))},_recalculateLayout:function(){f||(f=require("Ti/Gesture")),f._updateOrientation();var e=this._container;e&&(e.width=L.innerWidth,e.height=L.innerHeight)},properties:{backgroundColor:{set:function(e){return this._container.backgroundColor=e}},backgroundImage:{set:function(e){return P(O,"backgroundImage",e?r.url(e):"")}},currentTab:void 0},convertUnits:function(t,i){var o=_.computeSize(t,0,!1);switch(i){case Ti.UI.UNIT_MM:o*=10;case Ti.UI.UNIT_CM:return o/(.0393700787*e.dpi*10);case Ti.UI.UNIT_IN:return o/e.dpi;case Ti.UI.UNIT_DIP:return 96*o/e.dpi;case Ti.UI.UNIT_PX:return o;default:return 0}},constants:{currentWindow:void 0,UNKNOWN:0,FACE_DOWN:1,FACE_UP:2,PORTRAIT:3,UPSIDE_PORTRAIT:4,LANDSCAPE_LEFT:5,LANDSCAPE_RIGHT:6,INPUT_BORDERSTYLE_NONE:0,INPUT_BORDERSTYLE_LINE:1,INPUT_BORDERSTYLE_BEZEL:2,INPUT_BORDERSTYLE_ROUNDED:3,KEYBOARD_DEFAULT:2,KEYBOARD_EMAIL:3,KEYBOARD_NUMBER_PAD:6,KEYBOARD_PHONE_PAD:7,KEYBOARD_URL:8,NOTIFICATION_DURATION_LONG:1,NOTIFICATION_DURATION_SHORT:2,PICKER_TYPE_DATE:2,PICKER_TYPE_DATE_AND_TIME:3,PICKER_TYPE_PLAIN:4,PICKER_TYPE_TIME:5,RETURNKEY_DEFAULT:0,RETURNKEY_DONE:1,RETURNKEY_EMERGENCY_CALL:2,RETURNKEY_GO:3,RETURNKEY_GOOGLE:4,RETURNKEY_JOIN:5,RETURNKEY_NEXT:6,RETURNKEY_ROUTE:7,RETURNKEY_SEARCH:8,RETURNKEY_SEND:9,RETURNKEY_YAHOO:10,TEXT_ALIGNMENT_CENTER:"center",TEXT_ALIGNMENT_RIGHT:"right",TEXT_ALIGNMENT_LEFT:"left",TEXT_AUTOCAPITALIZATION_ALL:3,TEXT_AUTOCAPITALIZATION_NONE:0,TEXT_AUTOCAPITALIZATION_SENTENCES:2,TEXT_AUTOCAPITALIZATION_WORDS:1,TEXT_VERTICAL_ALIGNMENT_BOTTOM:"bottom",TEXT_VERTICAL_ALIGNMENT_CENTER:"center",TEXT_VERTICAL_ALIGNMENT_TOP:"top",ANIMATION_CURVE_EASE_IN:1,ANIMATION_CURVE_EASE_IN_OUT:0,ANIMATION_CURVE_EASE_OUT:2,ANIMATION_CURVE_LINEAR:3,SIZE:"auto",FILL:"fill",INHERIT:"inherit",UNIT_PX:"px",UNIT_MM:"mm",UNIT_CM:"cm",UNIT_IN:"in",UNIT_DIP:"dp",_LAYOUT_COMPOSITE:"composite",_LAYOUT_VERTICAL:"vertical",_LAYOUT_HORIZONTAL:"horizontal",_LAYOUT_CONSTRAINING_VERTICAL:"constrainingVertical",_LAYOUT_CONSTRAINING_HORIZONTAL:"constrainingHorizontal"}})});