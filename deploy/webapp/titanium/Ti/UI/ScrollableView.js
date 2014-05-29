define(["Ti/_/declare","Ti/UI/View","Ti/_/dom","Ti/_/has","Ti/_/style","Ti/UI","Ti/_/browser"],function(e,t,n,i,o,r,a){var s=o.set,g=require.is,u=n.unitize,l=require.on,_=l.once,h=window,c={webkit:"webkitTransitionEnd",trident:"msTransitionEnd",gecko:"transitionend",presto:"oTransitionEnd"},d=c[a.runtime]||"transitionEnd",v=i("touch"),m=200,p=10,w=25,f=1e3,C=.5,P=2;return e("Ti.UI.ScrollableView",t,{constructor:function(){var e,t=this,n=0;t._add(t._contentContainer=r.createView({left:0,top:0,width:r.SIZE,height:"100%",layout:"constrainingHorizontal"})),e=t._contentContainer.domNode,t._add(t._pagingControlContainer=r.createView({width:"100%",height:20,bottom:0,backgroundColor:"black",opacity:0,touchEnabled:!1})),t._pagingControlContainer._add(t._pagingControlContentContainer=r.createView({width:r.SIZE,height:"100%",top:0,touchEnabled:!1,layout:"constrainingHorizontal"})),t.__values__.properties.views=[],t._viewToRemoveAfterScroll=-1,l(t,"postlayout",function(){t._animating||t._setTranslation(t.currentPage*-t._measuredWidth)}),l(e,v?"touchstart":"mousedown",function(i){var o=i.touches?i.touches[0].clientX:i.clientX,r=o,a=Date.now(),g=t._measuredWidth,u=function(e){var i=t.currentPage,a=r-o+n;g=t._measuredWidth,e.preventDefault(),r=e.touches?e.touches[0].clientX:e.clientX,t._setTranslation(i*-g+a),t.fireEvent("scroll",{currentPage:i,currentPageAsFloat:i-a/g,view:t.views[i]})},l=function(i){var c=Date.now(),T=m>c-a,b=t.currentPage,A=Math.abs(o-r)>(T?p:g/2),E=t.__values__.properties,V=Math.abs(r-o);h.removeEventListener(v?"touchmove":"mousemove",u),h.removeEventListener(v?"touchend":"mouseup",l),g=t._measuredWidth,t._animating=1,i.preventDefault(),A&&(o>r?b!==E.views.length-1&&b++:0!==b&&b--,V=g-V),t._showPagingControl(b),n=r-o+n,V=Math.max(w,Math.min(f,(T?C:P)*V)),s(e,"transition",V+"ms ease-out"),setTimeout(function(){_(e,d,function(){s(e,"transition",""),t._animating=0,E.currentPage=b,t._updatePagingControl(),t.fireEvent("scrollend",{currentPage:b,view:t.views[b]})}),t._setTranslation(b*-g)},1),t.fireEvent("dragend",{currentPage:b,view:t.views[b]})};t._showPagingControl(t.currentPage,1),i.preventDefault(),n=t._animating?n||0:0,s(e,"transition",""),t._setTranslation(t.currentPage*-g+n),t._animating=0,h.addEventListener(v?"touchmove":"mousemove",u),h.addEventListener(v?"touchend":"mouseup",l),t.fireEvent("dragstart")})},_setTranslation:function(e){s(this._contentContainer.domNode,"transform","translatez(0) translatex("+e+"px)")},_showPagingControl:function(e,t){var n=this;return n.showPagingControl?(n._pagingAnimation&&n._pagingAnimation.cancel(),n._pagingAnimation=n._pagingControlContainer.animate({duration:250,opacity:.75}),clearInterval(n._pagingTimeout),void(!t&&n.pagingControlTimeout>0?n._pagingTimeout=setTimeout(function(){n._pagingAnimation&&n._pagingAnimation.cancel(),n._pagingAnimation=n._pagingControlContainer.animate({duration:750,opacity:0},function(){n._pagingAnimation=void 0})},n.pagingControlTimeout):n._pagingAnimation=void 0)):void(n._pagingControlContainer.opacity=0)},_updatePagingControl:function(){var e=this._pagingControlContentContainer,t=this.views.length,n=this.pagingControlHeight/2;if(t!==e._numViews||n!==e._diameter){e._numViews=t,e._diameter=n,e._removeAllChildren();for(var i=0;i<this.views.length;i++)e._add(r.createView({width:n,height:n,left:5,right:5,backgroundColor:"#aaa",borderRadius:u(n/2)}));e._highlightedPage=-1}e._highlightedPage!==this.currentPage&&(e._highlightedPage<0||(e._children[e._highlightedPage].backgroundColor="#aaa"),e._children[this.currentPage].backgroundColor="#fff",e._highlightedPage=this.currentPage)},addView:function(e){e&&(e.width="100%",e.height="100%",this.views.push(e),this._contentContainer._add(e),1==this.views.length&&(this.__values__.properties.currentPage=0),this._updatePagingControl())},removeView:function(e){var t=g(e,"Number")?e:this.views.indexOf(e);0>t||t>=this.views.length||(t==this.currentPage&&1!==this.views.length?(this._viewToRemoveAfterScroll=t,this.scrollToView(t==this.views.length-1?--t:++t)):this._removeViewFromList(t))},_removeViewFromList:function(e){var t=this._contentContainer,n=this;e<this.currentPage&&n.__values__.properties.currentPage--,t._remove(n.views.splice(e,1)[0]),n.views.length||(n.__values__.properties.currentPage=-1),_(r,"postlayout",function(){setTimeout(function(){n._setTranslation(n.currentPage*-n._measuredWidth)},1)})},scrollToView:function(e,t){function n(){var e=o._contentContainer,n=e.domNode,r=-o.views[i]._measuredLeft,a=Math.max(w,Math.min(f,P*e._measuredWidth));o._updatePagingControl(),o._showPagingControl(i),t?(o._setTranslation(r),o.__values__.properties.currentPage=i):(s(n,"transition",a+"ms ease-out"),setTimeout(function(){_(n,d,function(){s(n,"transition",""),o._animating=0,o.__values__.properties.currentPage=i,o._updatePagingControl(),-1!==o._viewToRemoveAfterScroll&&(r+=o.views[o._viewToRemoveAfterScroll]._measuredWidth,o._removeViewFromList(o._viewToRemoveAfterScroll),o._viewToRemoveAfterScroll=-1),o.fireEvent("scrollend",{currentPage:i,view:o.views[i]})}),o._setTranslation(r)},1))}var i=g(e,"Number")?e:this.views.indexOf(e),o=this;0>i||i>=this.views.length||i==this.currentPage||(o._contentContainer.domNode.offsetWidth?n():_(o,"postlayout",n))},_defaultWidth:r.FILL,_defaultHeight:r.FILL,properties:{currentPage:{set:function(e,t){return e>=0&&e<this.views.length?(this.scrollToView(e,1),e):t},value:-1},pagingControlColor:{set:function(e){return this._pagingControlContainer.backgroundColor=e,e},value:"black"},pagingControlHeight:{set:function(e){return this._pagingControlContainer.height=e,e},value:20},pagingControlTimeout:{post:function(e){e||(this._pagingControlContainer.opacity=.75)},value:3e3},showPagingControl:!1,views:{set:function(e){if(g(e,"Array")){var t,n=0,i=e.length,o=this._contentContainer;for(o._removeAllChildren();i>n;n++)(t=e[n]).width="100%",t.height="100%",o._add(t);return this.__values__.properties.currentPage=i?0:-1,e}},post:"_updatePagingControl"}}})});