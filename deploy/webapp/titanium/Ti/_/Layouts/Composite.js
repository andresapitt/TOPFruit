define(["Ti/_/Layouts/Base","Ti/_/declare","Ti/UI","Ti/_/lang"],function(e,t,i,d){var a=d.isDef,o="px",h=Math.round;return t("Ti._.Layouts.Composite",e,{_doLayout:function(e,t,d,a,r){var n,_,x,u,s,f,g,l,m,p,c,b,W,y,N,L,H,S,w={width:0,height:0},I=e._children,T=0,v=[],C=[],E=I.length,z=this._measureNode;for(T=0;E>T;T++)n=e._children[T],n._alive&&n.domNode?(n._markedForLayout&&((n._preLayout&&n._preLayout(t,d,a,r)||n._needsMeasuring)&&z(n,n,n._layoutCoefficients,this),_=n._layoutCoefficients,x=_.width,m=_.minWidth,u=_.height,p=_.minHeight,s=_.sandboxWidth,f=_.sandboxHeight,l=_.left,g=_.top,b=x.x1*t+x.x2,void 0!==m.x1&&(b=Math.max(b,m.x1*t+m.x2)),W=u.x1*d+u.x2,void 0!==p.x1&&(W=Math.max(W,p.x1*d+p.x2)),c=n._getContentSize?n._getContentSize(b,W):n._layout._doLayout(n,isNaN(b)?t:b-n._borderLeftWidth-n._borderRightWidth,isNaN(W)?d:W-n._borderTopWidth-n._borderBottomWidth,isNaN(b),isNaN(W)),isNaN(b)&&(b=c.width+n._borderLeftWidth+n._borderRightWidth,void 0!==m.x1&&(b=Math.max(b,m.x1*t+m.x2))),isNaN(W)&&(W=c.height+n._borderTopWidth+n._borderBottomWidth,void 0!==p.x1&&(W=Math.max(W,p.x1*d+p.x2))),a&&0!==l.x1?v.push(n):L=l.x1*t+l.x2*b+l.x3,r&&0!==g.x1?C.push(n):H=g.x1*d+g.x2*W+g.x3,n._measuredSandboxWidth=N=s.x1*d+s.x2+b+(isNaN(L)?0:L),n._measuredSandboxHeight=y=f.x1*d+f.x2+W+(isNaN(H)?0:H),n._measuredWidth=b,n._measuredHeight=W,n._measuredLeft=L,n._measuredTop=H),n._measuredSandboxWidth>w.width&&(w.width=n._measuredSandboxWidth),n._measuredSandboxHeight>w.height&&(w.height=n._measuredSandboxHeight)):this.handleInvalidState(n,e);for(E=v.length,T=0;E>T;T++)n=v[T],l=n._layoutCoefficients.left,s=n._layoutCoefficients.sandboxWidth,n._measuredLeft=L=l.x1*w.width+l.x2*b+l.x3,n._measuredSandboxWidth=N=s.x1*d+s.x2+n._measuredWidth+L,N=n._measuredSandboxWidth,N>w.width&&(w.width=N);for(E=C.length,T=0;E>T;T++)n=C[T],g=n._layoutCoefficients.top,f=n._layoutCoefficients.sandboxHeight,n._measuredTop=H=g.x1*w.height+g.x2*W+g.x3,n._measuredSandboxHeight=y=f.x1*d+f.x2+n._measuredHeight+H,y=n._measuredSandboxHeight,y>w.height&&(w.height=y);for(E=I.length,T=0;E>T;T++)n=I[T],n._markedForLayout&&(i._elementLayoutCount++,S=n.domNode.style,S.zIndex=n.zIndex,S.left=h(n._measuredLeft)+o,S.top=h(n._measuredTop)+o,S.width=h(n._measuredWidth-n._borderLeftWidth-n._borderRightWidth)+o,S.height=h(n._measuredHeight-n._borderTopWidth-n._borderBottomWidth)+o,n._markedForLayout=!1,n.fireEvent("postlayout"));return this._computedSize=w},_getWidth:function(e,t){return!a(t)&&a(e.left)+a(e.center&&e.center.x)+a(e.right)<2&&(t=e._defaultWidth),t===i.INHERIT?e._parent._parent&&e._parent._parent._layout._getWidth(e._parent,e._parent.width)===i.SIZE?i.SIZE:i.FILL:t},_getHeight:function(e,t){return!a(t)&&a(e.top)+a(e.center&&e.center.y)+a(e.bottom)<2&&(t=e._defaultHeight),t===i.INHERIT?e._parent._parent&&e._parent._parent._layout._getHeight(e._parent,e._parent.height)===i.SIZE?i.SIZE:i.FILL:t},_isDependentOnParent:function(e){var t=e._layoutCoefficients;return!isNaN(t.width.x1)&&0!==t.width.x1||!isNaN(t.height.x1)&&0!==t.height.x1||0!==t.left.x1||0!==t.top.x1},_doAnimationLayout:function(e,t){var i=e._parent._measuredWidth,d=e._parent._measuredHeight,a=t.width.x1*i+t.width.x2,o=t.height.x1*d+t.height.x2;return{width:a,height:o,left:t.left.x1*i+t.left.x2*a+t.left.x3,top:t.top.x1*d+t.top.x2*o+t.top.x3}},_measureNode:function(e,t,d,a){e._needsMeasuring=!1;for(var o,h,r,n,_,x,u,s,f,g,l,m,p,c=a.getValueType,b=a.computeValue,W=a._getWidth(e,t.width),y=c(W),N=b(W,y),L=t._minWidth,H=c(L),S=b(L,H),w=a._getHeight(e,t.height),I=c(w),T=b(w,I),v=t._minHeight,C=c(v),E=b(v,C),z=t.left,F=c(z),M=b(z,F),Z=t.center&&t.center.x,A=c(Z),R=b(Z,A),k=t.right,B=c(k),V=b(k,B),D=t.top,O=c(D),P=b(D,O),U=t.center&&t.center.y,j=c(U),q=b(U,j),G=t.bottom,J=c(G),K=b(G,J),Q=d.sandboxWidth,X=d.sandboxHeight,Y=[[y,N,F,M,A,R,B,V],[I,T,O,P,j,q,J,K]],$=0;2>$;$++)n=Y[$],_=n[0],x=n[1],u=n[2],s=n[3],f=n[4],g=n[5],l=n[6],m=n[7],o=h=0,_===i.SIZE?o=h=0/0:_===i.FILL?(o=1,"%"===u?o-=s:"#"===u?h=-s:"%"===l?o-=m:"#"===l&&(h=-m)):"%"===_?o=x:"#"===_?h=x:"%"===u?"%"===f?o=2*(g-s):"#"===f?(o=-2*s,h=2*g):"%"===l?o=1-s-m:"#"===l&&(o=1-s,h=-m):"#"===u?"%"===f?(o=2*g,h=-2*s):"#"===f?h=2*(g-s):"%"===l?(o=1-m,h=-s):"#"===l&&(o=1,h=-m-s):"%"===f?"%"===l?o=2*(m-g):"#"===l&&(o=-2*g,h=2*m):"#"===f&&("%"===l?(o=2*m,h=-2*g):"#"===l&&(h=2*(m-g))),d[p=0===$?"width":"height"].x1=o,d[p].x2=h;Y={minWidth:[H,S,F,M,A,R,B,V],minHeight:[C,E,O,P,j,q,J,K]};for($ in Y)n=Y[$],_=n[0],x=n[1],u=n[2],s=n[3],f=n[4],g=n[5],l=n[6],m=n[7],o=h=r=0,_===i.SIZE?o=h=0/0:_===i.FILL?(o=1,"%"===u?o-=s:"#"===u?h=-s:"%"===l?o-=m:"#"===l&&(h=-m)):"%"===_?o=x:"#"===_?h=x:o=h=r=void 0,d[$].x1=o,d[$].x2=h,d[$].x3=r;for(Y=[[F,M,A,R,B,V],[O,P,j,q,J,K]],$=0;2>$;$++){if(n=Y[$],u=n[0],s=n[1],f=n[2],g=n[3],l=n[4],m=n[5],o=h=r=0,"%"===u)o=s;else if("#"===u)r=s;else if("%"===f)o=g,h=-.5;else if("#"===f)h=-.5,r=g;else if("%"===l)o=1-m,h=-1;else if("#"===l)o=1,h=-1,r=-m;else switch("left"===$?a._defaultHorizontalAlignment:a._defaultVerticalAlignment){case"center":o=.5,h=-.5;break;case"end":o=1,h=-1}d[p=0===$?"left":"top"].x1=o,d[p].x2=h,d[p].x3=r}Q.x1="%"===B?V:0,Q.x2="#"===B?V:0,X.x1="%"===J?K:0,X.x2="#"===J?K:0},_defaultHorizontalAlignment:"center",_defaultVerticalAlignment:"center"})});