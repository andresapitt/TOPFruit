define(["Ti/_/declare","Ti/_/lang"],function(e,t){var n,c,h=50,a=Math.PI/6,o=.5,s=!1;return t.setObject("Ti._.Gestures.Swipe",{processTouchStartEvent:function(e){1==e.touches.length&&1==e.changedTouches.length?(s=!1,n={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY},c=Date.now()):n=null},processTouchEndEvent:function(e){if(0===e.touches.length&&1===e.changedTouches.length&&n){var t,u,i,l=e.changedTouches[0].clientX,r=e.changedTouches[0].clientY,g=Math.abs(n.x-l),T=Math.abs(n.y-r),d=Math.sqrt(Math.pow(n.x-l,2)+Math.pow(n.y-r,2));if(!s&&(s=d>h),s&&(t=h>=d||0===g||0===T?!0:g>T?Math.atan(T/g)<a:Math.atan(g/T)<a,t&&(u=g>T?n.x-l>0?"left":"right":n.y-r<0?"down":"up",i=Math.abs(d/(Date.now()-c)),i>o)))return{swipe:[{x:l,y:r,direction:u}]}}n=null},processTouchCancelEvent:function(){n=null}})});