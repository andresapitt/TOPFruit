function ucfirst(e){return e?e[0].toUpperCase()+e.substr(1):e}function addNamespace(e){return(CONST.IMPLICIT_NAMESPACES[e]||CONST.NAMESPACE_DEFAULT)+"."+e}function processStyle(e,t,o,r,n){r=r||{},r.classes=o,t.apiName&&(r.apiName=t.apiName),t.id&&(r.id=t.id),t.applyProperties(exports.createStyle(e,r,n))}function isTabletFallback(){return Math.min(Ti.Platform.displayCaps.platformHeight,Ti.Platform.displayCaps.platformWidth)>=700}var _=require("alloy/underscore")._,Backbone=require("alloy/backbone"),CONST=require("alloy/constants");exports.version="1.3.0",exports._=_,exports.Backbone=Backbone;var DEFAULT_WIDGET="widget",TI_VERSION=Ti.version,MW320_CHECK=!0&&TI_VERSION>="3.2.0",IDENTITY_TRANSFORM=void 0,RESET={bottom:null,left:null,right:null,top:null,height:null,width:null,shadowColor:null,shadowOffset:null,backgroundImage:null,backgroundRepeat:null,center:null,layout:null,backgroundSelectedColor:null,backgroundSelectedImage:null,opacity:1,touchEnabled:!0,enabled:!0,horizontalWrap:!0,zIndex:0,backgroundColor:null,font:null,visible:!0,color:null,transform:null,backgroundGradient:{},borderColor:"transparent",borderRadius:null,borderWidth:null};exports.M=function(e,t,o){var r,n=(t||{}).config||{},s=n.adapter||{},l={},a={};s.type?(r=require("alloy/sync/"+s.type),l.sync=function(e,t,o){r.sync(e,t,o)}):l.sync=function(e,t){Ti.API.warn("Execution of "+e+"#sync() function on a model that does not support persistence"),Ti.API.warn("model: "+JSON.stringify(t.toJSON()))},l.defaults=n.defaults,o&&(a.migrations=o),r&&_.isFunction(r.beforeModelCreate)&&(n=r.beforeModelCreate(n,e)||n);var i=Backbone.Model.extend(l,a);return i.prototype.config=n,_.isFunction(t.extendModel)&&(i=t.extendModel(i)||i),r&&_.isFunction(r.afterModelCreate)&&r.afterModelCreate(i,e),i},exports.C=function(e,t,o){var r,n={model:o},s=(o?o.prototype.config:{})||{};s.adapter&&s.adapter.type?(r=require("alloy/sync/"+s.adapter.type),n.sync=function(e,t,o){r.sync(e,t,o)}):n.sync=function(e,t){Ti.API.warn("Execution of "+e+"#sync() function on a collection that does not support persistence"),Ti.API.warn("model: "+JSON.stringify(t.toJSON()))};var l=Backbone.Collection.extend(n);return l.prototype.config=s,_.isFunction(t.extendCollection)&&(l=t.extendCollection(l)||l),r&&_.isFunction(r.afterCollectionCreate)&&r.afterCollectionCreate(l),l},exports.UI={},exports.UI.create=function(controller,apiName,opts){opts=opts||{};var baseName,ns,parts=apiName.split(".");if(1===parts.length)baseName=apiName,ns=opts.ns||CONST.IMPLICIT_NAMESPACES[baseName]||CONST.NAMESPACE_DEFAULT;else{if(!(parts.length>1))throw"Alloy.UI.create() failed: No API name was given in the second parameter";baseName=parts[parts.length-1],ns=parts.slice(0,parts.length-1).join(".")}opts.apiName=ns+"."+baseName,baseName=baseName[0].toUpperCase()+baseName.substr(1);var style=exports.createStyle(controller,opts);return eval(ns)["create"+baseName](style)},exports.createStyle=function(e,t,o){var r,n;if(!t)return{};r=_.isArray(t.classes)?t.classes.slice(0):_.isString(t.classes)?t.classes.split(/\s+/):[],n=t.apiName,n&&-1===n.indexOf(".")&&(n=addNamespace(n));var s;s=require(e&&_.isObject(e)?"alloy/widgets/"+e.widgetId+"/styles/"+e.name:"alloy/styles/"+e);var l,a,i={};for(l=0,a=s.length;a>l;l++){var p=s[l],c=p.key;if(p.isApi&&-1===c.indexOf(".")&&(c=(CONST.IMPLICIT_NAMESPACES[c]||CONST.NAMESPACE_DEFAULT)+"."+c),p.isId&&t.id&&p.key===t.id||p.isClass&&_.contains(r,p.key));else{if(!p.isApi)continue;if(-1===p.key.indexOf(".")&&(p.key=addNamespace(p.key)),p.key!==n)continue}p.queries&&p.queries.formFactor&&!Alloy[p.queries.formFactor]||_.extend(i,p.style)}var u=_.omit(t,[CONST.CLASS_PROPERTY,CONST.APINAME_PROPERTY]);return _.extend(i,u),i[CONST.CLASS_PROPERTY]=r,i[CONST.APINAME_PROPERTY]=n,MW320_CHECK&&delete i[CONST.APINAME_PROPERTY],o?_.defaults(i,o):i},exports.addClass=function(e,t,o,r){if(!o)return void(r&&(MW320_CHECK&&delete r.apiName,t.applyProperties(r)));var n=t[CONST.CLASS_PROPERTY]||[],s=n.length;o=_.isString(o)?o.split(/\s+/):o;var l=_.union(n,o||[]);return s===l.length?void(r&&(MW320_CHECK&&delete r.apiName,t.applyProperties(r))):void processStyle(e,t,l,r)},exports.removeClass=function(e,t,o,r){o=o||[];var n=t[CONST.CLASS_PROPERTY]||[],s=n.length;if(!s||!o.length)return void(r&&(MW320_CHECK&&delete r.apiName,t.applyProperties(r)));o=_.isString(o)?o.split(/\s+/):o;var l=_.difference(n,o);return s===l.length?void(r&&(MW320_CHECK&&delete r.apiName,t.applyProperties(r))):void processStyle(e,t,l,r,RESET)},exports.resetClass=function(e,t,o,r){o=o||[],o=_.isString(o)?o.split(/\s+/):o,processStyle(e,t,o,r,RESET)},exports.createWidget=function(e,t,o){return"undefined"!=typeof t&&null!==t&&_.isObject(t)&&!_.isString(t)&&(o=t,t=DEFAULT_WIDGET),new(require("alloy/widgets/"+e+"/controllers/"+(t||DEFAULT_WIDGET)))(o)},exports.createController=function(e,t){return new(require("alloy/controllers/"+e))(t)},exports.createModel=function(e,t){return new(require("alloy/models/"+ucfirst(e)).Model)(t)},exports.createCollection=function(e,t){return new(require("alloy/models/"+ucfirst(e)).Collection)(t)},exports.isTablet=function(){return Math.min(Ti.Platform.displayCaps.platformHeight,Ti.Platform.displayCaps.platformWidth)>=400}(),exports.isHandheld=!exports.isTablet,exports.Globals={},exports.Models={},exports.Models.instance=function(e){return exports.Models[e]||(exports.Models[e]=exports.createModel(e))},exports.Collections={},exports.Collections.instance=function(e){return exports.Collections[e]||(exports.Collections[e]=exports.createCollection(e))},exports.CFG=require("alloy/CFG");