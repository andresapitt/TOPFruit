define(["Ti/_/declare","Ti/_/lang","Ti/_/Evented"],function(e,t,r){function n(e){throw new Error("Missing "+e+" argument")}function u(e,t){return e===o.TYPE_DOUBLE||e===o.TYPE_FLOAT?parseFloat(t):parseInt(t)}var o;return o=t.setObject("Ti.Codec",r,{decodeNumber:function(e){return(!e||!e.source)&&n("source"),e.type||n("type"),u(e.type,e.source.buffer)},decodeString:function(e){(!e||!e.source)&&n("source");var t=e.source.buffer||"",r=0|e.position,u=e.length;return t.substring(r,u&&r+u)},encodeNumber:function(e){return(!e||!e.source)&&n("source"),e.dest||n("dest"),e.type||n("type"),dest.append(new(require("Ti/Buffer"))({buffer:""+u(e.type,e.source.buffer)}))},encodeString:function(e){(!e||!e.source)&&n("source"),e.dest||n("dest");var t=e.source.buffer||"",r=0|e.destPosition;return t=new(require("Ti/Buffer"))({buffer:t.substring(0|e.sourcePosition,e.sourceLength||t.length)}),r?dest.insert(t,r):dest.append(t)},getNativeByteOrder:function(){return this.LITTLE_ENDIAN},constants:{BIG_ENDIAN:2,CHARSET_ASCII:"ascii",CHARSET_ISO_LATIN_1:"ios-latin-1",CHARSET_UTF16:"utf16",CHARSET_UTF16BE:"utf16be",CHARSET_UTF16LE:"utf16le",CHARSET_UTF8:"utf8",LITTLE_ENDIAN:1,TYPE_BYTE:"byte",TYPE_DOUBLE:"double",TYPE_FLOAT:"float",TYPE_INT:"int",TYPE_LONG:"long",TYPE_SHORT:"short"}})});