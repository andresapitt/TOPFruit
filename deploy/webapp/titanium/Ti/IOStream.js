define(["Ti/_/declare","Ti/_/Evented","Ti/Buffer","Ti/Filesystem"],function(t,e,i,n){return t("Ti.IOStream",e,{constructor:function(t){t=t||{},this._data=t.data||"",this._mode=t.mode||n.MODE_APPEND},close:function(){this._closed=!0},isReadable:function(){return!this._closed},isWriteable:function(){return!this._closed&&(this._mode===n.MODE_WRITE||this._mode===n.MODE_APPEND)},read:function(t,e,n){if(this.isReadable()){var s=this._data,r=n||s.length,a=t.append(new i({value:s.substring(e||0,r)}));return this._data=s.substring(r),a}return 0},write:function(t,e,i){if(this.isWriteable()){var n=t.value;return e=0|e,i=i||n.length,this._data+=n.substring(e,i),i-e}return 0}})});