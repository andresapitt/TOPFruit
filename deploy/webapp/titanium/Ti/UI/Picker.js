define(["Ti/_/declare","Ti/_/event","Ti/_/has","Ti/UI/View","Ti/_/UI/Widget","Ti/UI","Ti/_/lang","Ti/_/dom","Ti/_/ready"],function(t,e,i,n,s,u,r,o,a){var h=require.is,c=6,l=o.unitize(c),_={},d=require.on,m=t(s,{constructor:function(){function t(){e!==n.value&&(e=n.value,s.fireEvent("change",{value:n.valueAsDate}))}var e,n=this._input=o.create("input",{style:{left:l,top:l,right:l,bottom:l,position:"absolute"}},this.domNode),s=this;s._handles=[d(n,i("touch")?"touchend":"click",t),d(n,"keyup",t)]},destroy:function(){e.off(this._handles),s.prototype.destroy.apply(this,arguments)},_getContentSize:function(){return _[this.type]},properties:{type:{set:function(t){return this._input.type=t}},min:{set:function(t){return this._input.min=r.val(t,""),t}},max:{set:function(t){return this._input.max=r.val(t,""),t}},value:{set:function(t){try{this._input.valueAsDate=t}catch(e){}}}}});return a(function(){var t=o.create("input",{style:{height:u.SIZE,width:u.SIZE}},document.body);["Date","Time","DateTime"].forEach(function(e){try{t.type=e}catch(i){}_[e]={width:t.clientWidth+2*c,height:t.clientHeight+2*c}}),o.detach(t)}),t("Ti.UI.Picker",n,{constructor:function(){this.layout="constrainingHorizontal",this._columns=[],this._getBorderFromCSS()},_currentColumn:null,_addColumn:function(t){this._columns.push(t),t._parentPicker=this;for(var e=0,i=this._columns.length,n=this.width===u.SIZE?u.SIZE:100/i+"%",s=this.height===u.SIZE?u.SIZE:"100%";i>e;e++)t=this._columns[e],t.width=n,t.height=s,t._setCorners(0===e,e===i-1,l);t._pickerChangeEventListener=r.hitch(this,function(t){var e={column:t.column,columnIndex:this._columns.indexOf(t.column),row:t.row,rowIndex:t.rowIndex};if(this.type===u.PICKER_TYPE_PLAIN){var i=[];for(var n in this._columns){var s=this._columns[n].selectedRow;s&&i.push(s.title)}e.selectedValue=i}this.fireEvent("change",e)}),t.addEventListener("change",t._pickerChangeEventListener),this._add(t),this._publish(t)},_updateColumnHeights:function(){var t,e=0;for(t in this._columns)e=Math.max(e,this._columns[t]._getTallestRowHeight());for(t in this._columns)this._columns[t]._setTallestRowHeight(e)},_defaultWidth:u.SIZE,_defaultHeight:u.SIZE,add:function(t){if(h(t,"Array"))for(var e in t)this.add(t[e]);else r.isDef(t.declaredClass)&&("Ti.UI.PickerColumn"===t.declaredClass?this._addColumn(t):"Ti.UI.PickerRow"===t.declaredClass&&(null===this._currentColumn&&this._addColumn(this._currentColumn=u.createPickerColumn()),this._currentColumn.addRow(t)))},destroy:function(){this._dateTimeInput&&this._dateTimeInput.destroy(),s.prototype.destroy.apply(this,arguments)},getSelectedRow:function(t){var e=this._columns[t];return e&&e.selectedRow},setSelectedRow:function(t,e){var i=this._columns[t];i&&(i.selectedRow=i.rows[e])},properties:{columns:{get:function(){return this._columns},set:function(t){this._removeAllChildren();for(var e in this._columns){var i=this._columns[e];i.removeEventListener(i._pickerChangeEventListener),i._parentPicker=void 0}this._columns=[],t&&this.add(t)}},maxDate:{set:function(t){return this._dateTimeInput&&(this._dateTimeInput.max=t),t}},minDate:{set:function(t){return this._dateTimeInput&&(this._dateTimeInput.min=t),t}},type:{set:function(t,e){function i(t){var e=n._dateTimeInput=new m({type:t,width:u.INHERIT,height:u.INHERIT});e.addEventListener("change",function(t){n.__values__.properties.value=t.value,n.fireEvent("change",t)}),e.min=n.min,e.max=n.max,n._add(e)}var n=this;if(t!==e)switch(this.columns=void 0,this._dateTimeInput=null,t){case u.PICKER_TYPE_DATE:i("Date");break;case u.PICKER_TYPE_TIME:i("Time");break;case u.PICKER_TYPE_DATE_AND_TIME:i("DateTime")}return t},value:u.PICKER_TYPE_PLAIN},value:{set:function(t){return this._dateTimeInput&&(this._dateTimeInput.value=t),t}}}})});