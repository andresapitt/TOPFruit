define(["Ti/_/has"],function(){function t(t,r){return[].concat(Array.prototype.slice.call(t,r||0))}function r(r,e){var o=t(arguments,2),s="string"==typeof e;return function(){var i=r||n,u=s?i[e]:e;return u&&u.apply(i,o.concat(t(arguments)))}}{var e,n=this;require.is}return{hitch:e=function(t,e){if(arguments.length>2)return r.apply(n,arguments);if(e||(e=t,t=null),"string"==typeof e){if(t=t||n,!t[e])throw['hitch: scope["',e,'"] is null (scope="',t,'")'].join("");return function(){return t[e].apply(t,arguments||[])}}return t?function(){return e.apply(t,arguments||[])}:e},isDef:function(t){return void 0!==t},mixProps:function(t,r,e,n){var o,s,i,u,p,a=r.__def__,_=a||r,f=/^constructor|__values__|__def__|declaredClass$/,c={properties:1,constants:0};n&&t.__def__||(t.__def__={});for(o in _)if(_.hasOwnProperty(o)&&!f.test(o))if(c.hasOwnProperty(o)){u=t.__def__[o]||(t.__def__[o]={}),s=_[o];for(i in s)p=u.hasOwnProperty(i),a&&p||(p||(u[i]=s[i]),function(r,n,o,s,i){var u=o&&"object"==typeof o,p=u&&o.get,a=u&&o.set,_=u&&o.post,f={get:function(){var t=this.__values__[r][n];return p?("string"==typeof p?this[p]:p).call(this,t):t},set:function(t){if(!i)throw new Error('Property "'+n+'" is read only');var e=this.__values__[r],o=[t,e[n],n];o[0]=e[n]=a?("string"==typeof a?this[a]:a).apply(this,o):t,_&&("function"==typeof _?_:this[_]).apply(this,o)},configurable:!0,enumerable:!0};u&&(p||a||_)?e&&(t.__values__[r][n]=o.value):"function"==typeof o?p=o:e&&(t.__values__[r][n]=o),Object.defineProperty(t,n,f),(i||n.toUpperCase()!==n)&&(t["get"+s]=f.get,i&&(t["set"+s]=f.set))}(o,i,s[i],i.substring(0,1).toUpperCase()+i.substring(1),c[o]))}else a&&(a.properties&&a.properties.hasOwnProperty(o)||a.constants&&a.constants.hasOwnProperty(o))||(n&&t.__def__.hasOwnProperty(o)||(t.__def__[o]=_[o]),t[o]=_[o]);return t},generateAccessors:function(t,r,e){function n(r){var e="get"+r.substring(0,1).toUpperCase()+r.substring(1);e in t.prototype||(t.prototype[e]=function(){return this[r]})}function o(r){var e="set"+r.substring(0,1).toUpperCase()+r.substring(1);e in t.prototype||(t.prototype[e]=function(t){return this[r]=t})}r&&r.split(",").forEach(n),e&&e.split(",").forEach(function(t){n(t),o(t)})},setObject:function(t){var r,e,n=t.split("."),o=n.pop(),s=window,i=0,u=n[i++];if(u)do s=u in s?s[u]:s[u]={};while(s&&(u=n[i++]));if(s&&o){e=o in s?s[o]:{};for(i=1;i<arguments.length;i++)r=arguments[i],r&&"object"==typeof r?(e.__values__||(e.__values__={constants:{},properties:{}}),this.mixProps(e,r,1)):e=r}return s[o]=e},toArray:t,urlEncode:function(t){var r,e,n,o,s=encodeURIComponent,i=[];for(r in t)if(t.hasOwnProperty(r))for(Array.isArray(e=t[r])||(e=[e]),r=s(r)+"=",n=0,o=e.length;o>n;)i.push(r+s(e[n++]));return i.join("&")},val:function(t,r){return void 0===t?r:t}}});