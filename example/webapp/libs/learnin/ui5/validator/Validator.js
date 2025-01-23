"use strict";sap.ui.define(["sap/base/util/deepExtend","sap/base/util/uid","sap/m/CheckBox","sap/m/ColumnListItem","sap/m/IconTabFilter","sap/m/Input","sap/ui/base/Object","sap/ui/core/Control","sap/ui/core/Element","sap/ui/core/LabelEnablement","sap/ui/core/library","sap/ui/core/message/ControlMessageProcessor","sap/ui/core/message/Message","sap/ui/model/json/JSONModel","sap/ui/layout/form/FormContainer","sap/ui/layout/form/FormElement","sap/ui/table/Column","sap/ui/table/Row","sap/ui/table/Table","sap/ui/model/ListBinding","sap/ui/model/SimpleType","sap/ui/model/ParseException","sap/ui/model/ValidateException","./SapMTableUtil"],function(e,t,i,n,a,s,r,o,l,d,g,c,u,f,h,_,I,p,T,V,y,C,m,S){function A(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const E=l["registry"];const R=g["MessageType"];const M=g["ValueState"];const x=A(S);const b=(t,i,n)=>{let a;return s=>{if(a){clearTimeout(a)}const r=e({},s);a=setTimeout(()=>i.call(t,r),n)}};const v=e=>{if(Array.isArray(e)){return e}return[e]};const w=e=>{if(e===null||e===undefined){throw new SyntaxError("Argument is not a Column or Columns.")}const t=v(e);if(t.some(e=>!(e instanceof I))){throw new SyntaxError("Argument is neither a Column nor Columns.")}};const B=r.extend("learnin.ui5.validator.Validator",{constructor:function e(t){r.prototype.constructor.call(this);this.RESOURCE_BUNDLE_KEY_REQUIRED_INPUT="learnin.ui5.validator.Validator.message.requiredInput";this.RESOURCE_BUNDLE_KEY_REQUIRED_SELECT="learnin.ui5.validator.Validator.message.requiredSelect";this._CUSTOM_DATA_KEY_FOR_IS_SET_VALUE_STATE_ERROR="learnin.ui5.validator.Validator.IS_SET_VALUE_STATE_ERROR";this._aTargetAggregations=["items","content","form","formContainers","formElements","fields","sections","subSections","app","pages","_grid","_page","cells","contentAreas"];this._mInvalidTableRowCols=new Map;this._mRegisteredValidator=new Map;this._mControlIdAttachedValidator=new Map;this._sTableIdAttachedRowsUpdated=new Set;this._fnDebouncedRenewValueStateInTable=null;if(t&&t.resourceBundle){this._resourceBundle=t.resourceBundle}if(t&&t.targetAggregations){if(Array.isArray(t.targetAggregations)){t.targetAggregations.forEach(e=>{if(!this._aTargetAggregations.includes(e)){this._aTargetAggregations.push(e)}})}else{if(!this._aTargetAggregations.includes(t.targetAggregations)){this._aTargetAggregations.push(t.targetAggregations)}}}this._useFocusoutValidation=true;if(t&&t.useFocusoutValidation===false){this._useFocusoutValidation=false}},validate:function e(t){let i=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{isDoConstraintsValidation:false};if(this._useFocusoutValidation){this._attachValidator(t)}return this._validate(t,i.isDoConstraintsValidation)},removeErrors:function e(t){if(!t){throw new SyntaxError}if(!(t instanceof o)&&!(t instanceof h)&&!(t instanceof _)&&!(t instanceof a)){return}const i=sap.ui.getCore().getMessageManager();const n=i.getMessageModel();const s=F.getMetadata().getName();const l=n.getProperty("/").filter(e=>r.isA(e,s));const d=t.getId();for(let e=0,t=l.length;e<t;e++){const t=l[e];const n=t.getValidationErrorControlIds();if(!n.some(e=>E.get(e))){i.removeMessages(t);continue}n.forEach(e=>{const n=E.get(e);if(this._isChildOrEqualControlId(n,d)){i.removeMessages(t)}})}this._mInvalidTableRowCols.forEach((e,t)=>{const i=E.get(t);if(i&&this._isChildOrEqualControlId(i,d)){this._mInvalidTableRowCols.delete(t)}});E.forEach((e,t)=>{if(e instanceof o&&this._isSetValueStateError(e)&&this._isChildOrEqualControlId(e,d)){this._clearValueStateIfNoErrors(e,this._resolveMessageTarget(e))}})},removeAttachedValidators:function e(t){if(!t){throw new SyntaxError}if(!(t instanceof o)&&!(t instanceof h)&&!(t instanceof _)&&!(t instanceof a)){return}const i=t.getId();this._mControlIdAttachedValidator.forEach((e,t)=>{const n=E.get(t);if(!n||!(n instanceof o)){return}if(this._isChildOrEqualControlId(n,i)){this._detachAllValidators(n)}});this._sTableIdAttachedRowsUpdated.forEach(e=>{const t=E.get(e);if(!t||!(t instanceof T)){return}if(this._isChildOrEqualControlId(t,i)){if(this._fnDebouncedRenewValueStateInTable){t.detachRowsUpdated(this._fnDebouncedRenewValueStateInTable,this)}t.detachSort(this._clearInValidRowColsInTable,this);t.detachFilter(this._clearInValidRowColsInTable,this);t.detachModelContextChange(this._clearInValidRowColsInTable,this);this._sTableIdAttachedRowsUpdated.delete(e)}})},registerValidator:function e(i,n,a,s,r,o){if(typeof i==="string"){return this._registerValidator(false,i,n,a,s,r,o)}return this._registerValidator(true,t(),i,n,a,s,r)},_registerValidator:function e(t,i,n,a,s,r,o){if(!(!Array.isArray(s)&&!Array.isArray(a)||Array.isArray(s)&&!Array.isArray(a)||Array.isArray(s)&&Array.isArray(a)&&a.length==s.length)){throw new SyntaxError}if(Array.isArray(s)&&o&&o.controlsMoreAttachValidator){throw new SyntaxError}if(o&&!o.isAttachValidator&&o.isAttachFocusoutValidationImmediately){throw new SyntaxError}const l={isAttachValidator:true,isAttachFocusoutValidationImmediately:true,isGroupedTargetControls:false,controlsMoreAttachValidator:null};const d=Object.assign({},l,o);let g=false;let c;if(!Array.isArray(s)&&s instanceof I&&s.getParent().getBinding("rows")&&s.getParent().getBinding("rows").getModel()instanceof f||Array.isArray(s)&&s[0]instanceof I&&s[0].getParent().getBinding("rows")&&s[0].getParent().getBinding("rows").getModel()instanceof f){if(Array.isArray(s)&&d.isGroupedTargetControls){throw new SyntaxError}g=true;c=e=>{w(e.targetControlOrControls);const t=v(e.targetControlOrControls);const i=t[0].getParent();const a=i.getBinding("rows");const s=a.getPath();const r=a.getModel().getProperty(s);const o=i.getRows();if(r.length===0||o.length===0){return true}const l=t.map(e=>e.getId());const d=[];i.getColumns().filter(e=>e.getVisible()).forEach((e,t)=>{if(l.includes(e.getId())){d.push(t)}});if(d.length===0){return true}const g=o[0].getCells().filter((e,t)=>d.includes(t));const c=g.map(e=>this._resolveBindingPropertyName(e));if(c.includes(undefined)){return true}const u=g.map(e=>this._getLabelText(e));const f=Array.isArray(e.targetControlOrControls);let h=true;if(e.isGroupedTargetControls){const i=[];const a=[];for(let e=0,t=r.length;e<t;e++){i.push(r[e][g[0].getBindingPath(c[0])]);a.push(e)}if(!n(i)){h=false;this._addMessageAndInvalidTableRowCol(t,s,a,e.messageTextOrMessageTexts,u,e.validateFunctionId)}}else{for(let i=0,a=r.length;i<a;i++){let a;if(f){a=g.map((e,t)=>r[i][e.getBindingPath(c[t])])}else{a=r[i][g[0].getBindingPath(c[0])]}if(n(a)){continue}h=false;this._addMessageAndInvalidTableRowCol(t,s,[i],e.messageTextOrMessageTexts,u,e.validateFunctionId)}}return h}}else{c=e=>{const t=e.targetControlOrControls;if(n(t)){return true}const i=e.messageTextOrMessageTexts;const a=e.validateFunctionId;if(Array.isArray(t)){if(e.isGroupedTargetControls){const e=Array.isArray(i)?i[0]:i;this._addMessage(t,e,a);for(let i=0;i<t.length;i++){this._setValueState(t[i],M.Error,e)}return false}for(let e=0;e<t.length;e++){const n=Array.isArray(i)?i[e]:i;this._addMessage(t[e],n,a);this._setValueState(t[e],M.Error,n)}}else{this._addMessage(t,i,a);this._setValueState(t,M.Error,i)}return false}}const u=r.getId();if(this._mRegisteredValidator.has(u)){const e=this._mRegisteredValidator.get(u);const r=e.find(e=>t&&e.isOriginalFunctionIdUndefined&&a===e.messageTextOrMessageTexts||!t&&!e.isOriginalFunctionIdUndefined&&e.validateFunctionId===i);if(r){r.testFunction=n;r.messageTextOrMessageTexts=a;r.targetControlOrControls=s;r.validateFunction=c;r.isGroupedTargetControls=d.isGroupedTargetControls;r.controlsMoreAttachValidator=d.controlsMoreAttachValidator;r.isOriginalFunctionIdUndefined=t;r.isAttachValidator=d.isAttachValidator}else{e.push({validateFunctionId:i,testFunction:n,messageTextOrMessageTexts:a,targetControlOrControls:s,validateFunction:c,isGroupedTargetControls:d.isGroupedTargetControls,controlsMoreAttachValidator:d.controlsMoreAttachValidator,isOriginalFunctionIdUndefined:t,isAttachValidator:d.isAttachValidator})}}else{this._mRegisteredValidator.set(u,[{validateFunctionId:i,testFunction:n,messageTextOrMessageTexts:a,targetControlOrControls:s,validateFunction:c,isGroupedTargetControls:d.isGroupedTargetControls,controlsMoreAttachValidator:d.controlsMoreAttachValidator,isOriginalFunctionIdUndefined:t,isAttachValidator:d.isAttachValidator}])}if(d.isAttachValidator&&d.isAttachFocusoutValidationImmediately){if(g){if(Array.isArray(s)){const e=s;const t=e[0].getParent();const r=e.map(e=>e.getId());const o=[];t.getColumns().filter(e=>e.getVisible()).forEach((e,t)=>{if(r.includes(e.getId())){o.push(t)}});if(o.length>0){t.getRows().forEach(e=>{const t=e.getCells().filter((e,t)=>o.includes(t));this._attachRegisteredValidator(t,n,a,i,d.isGroupedTargetControls,d.controlsMoreAttachValidator)})}}else{const e=s;const t=e.getParent();const r=t.getColumns().filter(e=>e.getVisible()).findIndex(t=>t.getId()===e.getId());if(r>0){const e=t.getRows().map(e=>e.getCells()[r]);if(d.isGroupedTargetControls){this._attachRegisteredValidator(e,n,a,i,d.isGroupedTargetControls,d.controlsMoreAttachValidator)}else{e.forEach(e=>{this._attachRegisteredValidator(e,n,a,i,d.isGroupedTargetControls,d.controlsMoreAttachValidator)})}}}}else{this._attachRegisteredValidator(s,n,a,i,d.isGroupedTargetControls,d.controlsMoreAttachValidator)}}return this},registerRequiredValidator:function e(i,n,a,s,r){if(typeof i==="string"){return this._registerRequiredValidator(i,n,a,s,r)}return this._registerRequiredValidator(t(),i,n,a,s)},_registerRequiredValidator:function e(t,i,n,a,s){const r={isAttachFocusoutValidationImmediately:false,isGroupedTargetControls:false,controlsMoreAttachValidator:null};const o=Object.assign({},r,s);let l;if(Array.isArray(n)){if(o.controlsMoreAttachValidator){throw new SyntaxError}if(o.isGroupedTargetControls){l=this._getRequiredErrorMessageTextByControl(n[0])}else{l=n.map(e=>this._getRequiredErrorMessageTextByControl(e))}}else{l=this._getRequiredErrorMessageTextByControl(n)}this.registerValidator(t,i,l,n,a,o);return this},unregisterValidator:function e(t,i){const n=i.getId();if(!this._mRegisteredValidator.has(n)){return this}const a=this._mRegisteredValidator.get(n);const s=a.findIndex(e=>e.validateFunctionId===t);if(s>=0){a.splice(s,1)}if(a.length===0){this._mRegisteredValidator.delete(n)}return this},_attachValidator:function e(t){if(!(t instanceof o||t instanceof h||t instanceof _||t instanceof a)){return}if(t instanceof o&&d.isRequired(t)){this._attachNotRegisteredValidator(t)}if(this._mRegisteredValidator.has(t.getId())){this._mRegisteredValidator.get(t.getId()).forEach(e=>{if(e.isAttachValidator){if(t instanceof T&&t.getBinding("rows")&&t.getBinding("rows").getModel()instanceof f){const i=t;if(Array.isArray(e.targetControlOrControls)){const t=e.targetControlOrControls;const n=t.map(e=>e.getId());const a=[];i.getColumns().filter(e=>e.getVisible()).forEach((e,t)=>{if(n.includes(e.getId())){a.push(t)}});if(a.length>0){i.getRows().forEach(t=>{const i=t.getCells().filter((e,t)=>a.includes(t));this._attachRegisteredValidator(i,e.testFunction,e.messageTextOrMessageTexts,e.validateFunctionId,e.isGroupedTargetControls,e.controlsMoreAttachValidator)})}}else{const t=e.targetControlOrControls;const n=i.getColumns().filter(e=>e.getVisible()).findIndex(e=>e.getId()===t.getId());if(n>0){const t=i.getRows().map(e=>e.getCells()[n]);if(e.isGroupedTargetControls){this._attachRegisteredValidator(t,e.testFunction,e.messageTextOrMessageTexts,e.validateFunctionId,e.isGroupedTargetControls,e.controlsMoreAttachValidator)}else{t.forEach(t=>{this._attachRegisteredValidator(t,e.testFunction,e.messageTextOrMessageTexts,e.validateFunctionId,e.isGroupedTargetControls,e.controlsMoreAttachValidator)})}}}}else{this._attachRegisteredValidator(e.targetControlOrControls,e.testFunction,e.messageTextOrMessageTexts,e.validateFunctionId,e.isGroupedTargetControls,e.controlsMoreAttachValidator)}}})}if(t instanceof T){const e=t.getBinding();if(e&&e instanceof V){const i=t.getRows();for(let t=0,n=e.getLength();t<n;t++){if(i[t]){const e=i[t].getCells();if(e){for(let t=0;t<e.length;t++){this._attachValidator(e[t])}}}}}}else{for(let e=0;e<this._aTargetAggregations.length;e++){const i=t.getAggregation(this._aTargetAggregations[e]);if(!i){continue}if(Array.isArray(i)){for(let e=0;e<i.length;e++){const t=i[e];if(t instanceof o||t instanceof h||t instanceof _||t instanceof a){this._attachValidator(t)}}}else if(i instanceof o||i instanceof h||i instanceof _||i instanceof a){this._attachValidator(i)}}}},_validate:function e(t,i){let n=true;const s=t.getId();if(!((t instanceof o||t instanceof h||t instanceof _||t instanceof a)&&t.getVisible())){if(!this._callRegisteredValidator(t)){n=false}return n}if(t instanceof T&&t.getBinding("rows")&&t.getBinding("rows").getModel()instanceof f){n=this._validateRequiredInSapUiTableTable(t)}else if(t instanceof T){const e=t.getBinding("rows");if(e&&e instanceof V){const a=t.getRows();for(let t=0,s=e.getLength();t<s;t++){if(a[t]){const e=a[t].getCells();if(e){for(let t=0;t<e.length;t++){if(!this._validate(e[t],i)){n=false}}}}}}}else{if(t instanceof o&&("getEnabled"in t&&typeof t.getEnabled==="function"&&t.getEnabled()||!("getEnabled"in t))){if(d.isRequired(t)){n=this._validateRequired(t)}if(i&&!this._isNullValue(t)){const e=this._resolveBindingPropertyName(t);const i=t.getBindingInfo(e);if(i&&"type"in i&&i.type instanceof y){const a=i.type;const s=t.getMetadata().getPropertyLikeSetting(e);let o=null;if("altTypes"in s&&Array.isArray(s.altTypes)){o=s.altTypes[0]}else if("type"in s){o=s.type}try{if(e==="dateValue"&&"getDateValue"in t&&typeof t.getDateValue==="function"){if(o){i.type.parseValue(t.getDateValue(),o)}i.type.validateValue(t.getDateValue())}else if(e==="value"&&"getValue"in t&&typeof t.getValue==="function"){if(o){i.type.parseValue(t.getValue(),o)}i.type.validateValue(t.getValue())}else if(e==="selectedKey"&&"getSelectedKey"in t&&typeof t.getSelectedKey==="function"){if(o){i.type.parseValue(t.getSelectedKey(),o)}i.type.validateValue(t.getSelectedKey())}else if(e==="selectedKeys"&&"getSelectedKeys"in t&&typeof t.getSelectedKeys==="function"){if(o){i.type.parseValue(t.getSelectedKeys(),o)}i.type.validateValue(t.getSelectedKeys())}else if(e==="selected"&&"getSelected"in t&&typeof t.getSelected==="function"){if(o){i.type.parseValue(t.getSelected(),o)}i.type.validateValue(t.getSelected())}else if(e==="selectedIndex"&&"getSelectedIndex"in t&&typeof t.getSelectedIndex==="function"){if(o){i.type.parseValue(t.getSelectedIndex(),o)}i.type.validateValue(t.getSelectedIndex())}else if(e==="selectedDates"&&"getSelectedDates"in t&&typeof t.getSelectedDates==="function"){if(o){i.type.parseValue(t.getSelectedDates(),o)}i.type.validateValue(t.getSelectedDates())}else if(e==="text"&&"getText"in t&&typeof t.getText==="function"){if(o){i.type.parseValue(t.getText(),o)}i.type.validateValue(t.getText())}}catch(e){if(e instanceof C||e instanceof m){if("message"in e&&typeof e.message==="string"){const i=sap.ui.getCore().getMessageManager();const a=F.getMetadata().getName();const s=i.getMessageModel().getProperty("/").some(i=>!r.isA(i,a)&&i.getControlId()===t.getId()&&i.getMessage()===e.message);if(!s){i.addMessages(new u({message:e.message,type:R.Error,additionalText:this._getLabelText(t),processor:new c,target:this._resolveMessageTarget(t),fullTarget:""}));if("setValueState"in t&&typeof t.setValueState==="function"){t.setValueState(M.Error)}if("setValueStateText"in t&&typeof t.setValueStateText==="function"){t.setValueStateText(e.message)}}n=false}}}}}}for(let e=0;e<this._aTargetAggregations.length;e++){const s=t.getAggregation(this._aTargetAggregations[e]);if(!s){continue}if(Array.isArray(s)){for(let e=0;e<s.length;e++){const t=s[e];if(t instanceof o||t instanceof h||t instanceof _||t instanceof a){if(!this._validate(t,i)){n=false}}}}else if(s instanceof o||s instanceof h||s instanceof _||s instanceof a){if(!this._validate(s,i)){n=false}}}}if(!this._callRegisteredValidator(t)){n=false}return n},_toVisibledColumnIndex:function e(t,i){const n=t.getColumns();const a=e=>{let t=0;for(let i=0,a=Math.min(n.length,e+1);i<a;i++){if(!n[i].getVisible()){t++}}return e-t};let s=i;let r=true;if(!Array.isArray(s)){r=false;s=[s]}const o=[];for(let e=0,t=s.length;e<t;e++){o.push(a(s[e]))}return o},_renewValueStateInTable:function e(t){const i=t.getSource();if(!(i instanceof T)){return}const n=this._mInvalidTableRowCols.get(i.getId());if(!n){return}const a=Array.from(new Set(n.map(e=>e.columnId)));let s=[];for(let e=0,t=a.length;e<t;e++){const t=E.get(a[e]);if(!t||!(t instanceof I)||!t.getVisible()){continue}s.push(i.indexOfColumn(t))}s=this._toVisibledColumnIndex(i,s);const r=i.getRows();for(let e=0,t=s.length;e<t;e++){for(let t=0,i=r.length;t<i;t++){this._setValueState(r[t].getCells()[s[e]],M.None,null)}}if(!("model"in i.getBindingInfo("rows"))){return}const o=i.getBindingInfo("rows").model;for(let e=0,t=n.length;e<t;e++){const t=E.get(n[e].columnId);if(!t||!(t instanceof I)||!t.getVisible()){continue}const a=this._toVisibledColumnIndex(i,i.indexOfColumn(t))[0];const s=i.getRows().find(t=>t.getCells()[a].getBindingContext(o).getPath()===n[e].rowPath);if(s){const t=s.getCells()[a];this._setValueState(t,M.Error,n[e].message)}}},_clearInValidRowColsInTable:function e(t){const i=t.getSource();if(!("getId"in i)||typeof i.getId!=="function"){return}const n=i.getId();if(this._mInvalidTableRowCols.has(n)){this._mInvalidTableRowCols.delete(n)}},_addMessageAndInvalidTableRowCol:function e(t,i,n,a,s,r){let o=false;const l=v(a);t.forEach((e,t)=>{const a=e.getParent().getId();const s=e.getId();let d=this._mInvalidTableRowCols.get(a);if(!d){d=[];this._mInvalidTableRowCols.set(a,d)}n.forEach(e=>{if(!d.some(t=>t.rowIndex===e&&t.columnId===s&&t.validateFunctionId===r)){d.push({rowPath:`${i}/${e}`,rowIndex:e,columnId:s,message:l[t],validateFunctionId:r})}else if(t===0){o=true}})});if(!o){this._addMessageByColumn(t[0],l[0],r,`${i}/${n[0]}`,s.join(", "))}},_attachTableRowsUpdater:function e(t){if(this._sTableIdAttachedRowsUpdated.has(t.getId())){return}if(!this._fnDebouncedRenewValueStateInTable){this._fnDebouncedRenewValueStateInTable=b(this,this._renewValueStateInTable,100)}t.attachRowsUpdated(this._fnDebouncedRenewValueStateInTable,this);t.attachSort(this._clearInValidRowColsInTable,this);t.attachFilter(this._clearInValidRowColsInTable,this);t.attachModelContextChange(this._clearInValidRowColsInTable,this);this._sTableIdAttachedRowsUpdated.add(t.getId())},_callRegisteredValidator:function e(t){let i=true;const n=t.getId();let a=false;if(this._mRegisteredValidator.has(n)){this._mRegisteredValidator.get(n).forEach(e=>{if(!e.validateFunction(e)){i=false;if(t instanceof T){a=true}}})}if(a){this._attachTableRowsUpdater(t)}return i},_attachNotRegisteredValidator:function e(t){if(!("attachSelectionFinish"in t)&&!("attachChange"in t)&&!("attachSelect"in t)){return}const i=t.getId();if(this._isAttachedValidator(i,"")){return}const n=this._getRequiredErrorMessageTextByControl(t);this._internalAttachValidator(t,"",n)},_attachRegisteredValidator:function e(t,i,n,a,s,r){let o;if(!Array.isArray(t)){o=[t]}else if(t.length===0){return}else{o=t}for(let e=0;e<o.length;e++){const t=o[e];const l=t.getId();if(this._isAttachedValidator(l,a)){continue}let d;if(s){d=Array.isArray(n)?n[0]:n}else{d=Array.isArray(n)?n[e]:n}const g={targetControl:t,messageText:d,test:i,controls:o,validateFunctionId:a,isGroupedTargetControls:s,messageTextOrMessageTexts:n};this._internalAttachValidator(t,a,g);if(r&&e===0){let e;if(!Array.isArray(r)){e=[r]}else{e=r}for(let t=0;t<e.length;t++){const i=e[t];const n=i.getId();if(this._isAttachedValidator(n,a)){continue}this._internalAttachValidator(i,a,g)}}}},_isAttachedValidator:function e(t,i){const n=this._mControlIdAttachedValidator.get(t);if(!n){return false}return n.includes(i)},_internalAttachValidator:function e(t,i,n){const a=t.getId();const s=()=>{const e=this._mControlIdAttachedValidator.get(a);if(e){e.push(i)}else{this._mControlIdAttachedValidator.set(a,[i])}};const r=e=>{if("attachSelectionFinish"in t&&typeof t.attachSelectionFinish==="function"){t.attachSelectionFinish(n,e,this);s()}else if("attachChange"in t&&typeof t.attachChange==="function"){t.attachChange(n,e,this);s()}else if("attachSelect"in t&&typeof t.attachSelect==="function"){t.attachSelect(n,e,this);s()}};if(i===""){r(this._notRegisteredValidator)}else{r(this._registeredvalidator)}},_detachAllValidators:function e(t){const i=t.getId();const n=this._mControlIdAttachedValidator.get(i);if(!n){return}const a=e=>{if("detachSelectionFinish"in t&&typeof t.detachSelectionFinish==="function"){t.detachSelectionFinish(e,this)}else if("detachChange"in t&&typeof t.detachChange==="function"){t.detachChange(e,this)}else if("detachSelect"in t&&typeof t.detachSelect==="function"){t.detachSelect(e,this)}};n.forEach(e=>{if(e===""){a(this._notRegisteredValidator)}else{a(this._registeredvalidator)}});this._mControlIdAttachedValidator.set(i,[])},_notRegisteredValidator:function e(t,i){const n=t.getSource();if(!(n instanceof o)){return}if(this._isNullValue(n)){if(this._isCellInSapUiTableTableBindedJsonModel(n)){this._setErrorCellInSapUiTableTable(n,i,"",false)}else{this._addMessage(n,i)}this._setValueState(n,M.Error,i)}else{if(this._isCellInSapUiTableTableBindedJsonModel(n)){this._clearErrorCellInSapUiTableTable(n,"",false)}else{this._removeMessageAndValueState(n,"")}}},_registeredvalidator:function e(t,i){const n=i.targetControl;const a=i.controls.length>1?i.controls:i.controls[0];let s;if(this._isCellInSapUiTableTableBindedJsonModel(n)&&i.isGroupedTargetControls){const e=n.getParent().getParent();const t=e.getBinding("rows");const a=t.getPath();const r=t.getModel().getProperty(a);const o=this._resolveBindingPropertyName(n);const l=[];for(let e=0;e<r.length;e++){l.push(r[e][n.getBindingPath(o)])}s=i.test(l)}else{s=i.test(a)}if(s){if(this._isCellInSapUiTableTableBindedJsonModel(n)){this._clearErrorCellInSapUiTableTable(i.controls,i.validateFunctionId,i.isGroupedTargetControls)}else{i.controls.forEach(e=>{this._removeMessageAndValueState(e,i.validateFunctionId)})}}else{if(this._isCellInSapUiTableTableBindedJsonModel(n)){this._setErrorCellInSapUiTableTable(i.controls,i.messageText,i.validateFunctionId,i.isGroupedTargetControls)}else if(i.isGroupedTargetControls){this._addMessage(i.controls,i.messageText,i.validateFunctionId);i.controls.forEach(e=>{this._setValueState(e,M.Error,i.messageText)})}else{this._addMessage(n,i.messageText,i.validateFunctionId);this._setValueState(n,M.Error,i.messageText)}}},_isCellInSapUiTableTableBindedJsonModel:function e(t){return t.getParent()&&t.getParent().getParent()instanceof T&&t.getParent().getParent().getBinding("rows")&&t.getParent().getParent().getBinding("rows").getModel()instanceof f},_setErrorCellInSapUiTableTable:function e(t,i,n,a){const s=Array.isArray(t)?t:[t];const r=s[0].getParent();if(!(r instanceof p)){return}const o=r.getParent();if(!(o instanceof T)){return}const l=s.map(e=>r.indexOfCell(e));const d=o.getColumns().filter(e=>e.getVisible()).filter((e,t)=>l.includes(t));const g=o.getBinding("rows");const c=g.getPath();const u=r.getIndex();const f=s.map(e=>this._getLabelText(e));let h=[u];if(Array.isArray(t)&&a){const e=g.getModel().getProperty(c).length;h=[];for(let t=0;t<e;t++){h.push(t)}}this._addMessageAndInvalidTableRowCol(d,c,h,i,f,n);s.forEach(e=>this._setValueState(e,M.Error,i));this._attachTableRowsUpdater(o)},_clearErrorCellInSapUiTableTable:function e(t,i,n){let a;if(!Array.isArray(t)){a=[t]}else if(n){a=[t[0]]}else{a=t}const s=a[0].getParent();const o=s.getParent();const l=o.getId();let d=this._mInvalidTableRowCols.get(l);if(!d){return}const g=a.map(e=>s.indexOfCell(e));const c=o.getColumns().filter(e=>e.getVisible()).filter((e,t)=>g.includes(t));const u=c.map(e=>e.getId());if(!("model"in o.getBindingInfo("rows"))){return}const f=o.getBindingInfo("rows").model;const h=o.getBinding("rows").getPath();const _=g.map(e=>s.getCells()[e].getBindingContext(f).getPath());if(Array.isArray(t)&&n){d=d.filter(e=>!u.includes(e.columnId)||e.validateFunctionId!==i)}else{d=d.filter(e=>!_.includes(e.rowPath)||!u.includes(e.columnId)||e.validateFunctionId!==i)}this._mInvalidTableRowCols.set(l,d);const I=sap.ui.getCore().getMessageManager();const p=I.getMessageModel();const T=F.getMetadata().getName();const V=p.getProperty("/").find(e=>r.isA(e,T)&&e.getControlId()===u[0]&&"fullTarget"in e&&(Array.isArray(t)&&n&&e.fullTarget===`${h}/0`||_.includes(e.fullTarget))&&"getValidateFunctionId"in e&&typeof e.getValidateFunctionId==="function"&&e.getValidateFunctionId()===i);if(V){I.removeMessages(V);if(Array.isArray(t)){t.forEach(e=>this._clearValueStateIfNoErrors(e,this._resolveMessageTarget(e)))}else{this._clearValueStateIfNoErrors(t,this._resolveMessageTarget(t))}}},_validateRequired:function e(t){if(!this._isNullValue(t)){return true}const i=this._getRequiredErrorMessageTextByControl(t);this._addMessage(t,i);this._setValueState(t,M.Error,i);return false},_validateRequiredInSapUiTableTable:function e(t){let i=true;const n=t.getBinding("rows");const a=n.getPath();const s=n.getModel().getProperty(a);const r=t.getRows();if(s.length>0&&r.length>0){const e=r[0].getCells().filter(e=>("getEnabled"in e&&typeof e.getEnabled==="function"&&e.getEnabled()||!("getEnabled"in e))&&d.isRequired(e));if(e.length>0){const n=e.map(e=>this._resolveBindingPropertyName(e));for(let o=0;o<s.length;o++){for(let l=0;l<e.length;l++){if(!n[l]){continue}const d=s[o][e[l].getBindingPath(n[l])];if(n[l]==="selectedIndex"&&d<0||n[l]!=="selectedIndex"&&(d===""||d===null||d===undefined)){i=false;const n=this._getRequiredErrorMessageTextByControl(e[l]);const s=r[0].indexOfCell(e[l]);const d=t.getColumns().filter(e=>e.getVisible())[s];this._addMessageAndInvalidTableRowCol([d],a,[o],n,[this._getLabelText(e[l])],"")}}}}}if(!i){this._attachTableRowsUpdater(t)}t.fireRowsUpdated();return i},_removeMessageAndValueState:function e(t,i){const n=sap.ui.getCore().getMessageManager();const a=n.getMessageModel();const s=F.getMetadata().getName();const o=t.getId();const l=a.getProperty("/").find(e=>r.isA(e,s)&&e.getValidationErrorControlIds().includes(o)&&e.getValidateFunctionId()===i);if(l){n.removeMessages(l)}this._clearValueStateIfNoErrors(t,this._resolveMessageTarget(t))},_clearValueStateIfNoErrors:function e(t,i){if(!("setValueState"in t)){return}const n=v(i);if(n.length===0){return}setTimeout(()=>{const e=sap.ui.getCore().getMessageManager().getMessageModel().getProperty("/");if(n.every(t=>e.some(e=>e.getTargets&&e.getTargets().includes(t)||e.getTarget()===t))){return}if(this._isCellInSapUiTableTableBindedJsonModel(t)){const e=t.getParent();const i=e.getParent();const n=i.getId();let a=this._mInvalidTableRowCols.get(n);if(!a){this._setValueState(t,M.None,null);return}const s=e.indexOfCell(t);const r=i.getColumns().filter(e=>e.getVisible())[s];const o=r.getId();const l=i.getBindingInfo("rows");const d="model"in l?String(l.model):undefined;const g=e.getCells()[s].getBindingContext(d).getPath();const c=a.find(e=>e.rowPath===g&&e.columnId===o);if(c){this._setValueState(t,M.Error,c.message);return}}this._setValueState(t,M.None,null)},1)},_isChildOrEqualControlId:function e(t,i){if(t.getId()===i){return true}let n=t;while(n.getParent()){if(n.getParent().getId()===i){return true}n=n.getParent()}return false},_resolveMessageTarget:function e(t){let i=[];if(Array.isArray(t)){i=t}else{i.push(t)}const n=i.map(e=>{if(e.getBinding("dateValue")){return e.getId()+"/dateValue"}if(e.getBinding("value")){return e.getId()+"/value"}if(e.getBinding("selectedKey")){return e.getId()+"/selectedKey"}if(e.getBinding("selectedKeys")){return e.getId()+"/selectedKeys"}if(e.getBinding("selected")){return e.getId()+"/selected"}if(e.getBinding("selectedIndex")){return e.getId()+"/selectedIndex"}if(e.getBinding("selectedDates")){return e.getId()+"/selectedDates"}if(e.getBinding("text")){return e.getId()+"/text"}return undefined});if(n.length>0){return n}return n[0]},_resolveBindingPropertyName:function e(t){if(t.getBinding("dateValue")){return"dateValue"}if(t.getBinding("value")){return"value"}if(t.getBinding("selectedKey")){return"selectedKey"}if(t.getBinding("selectedKeys")){return"selectedKeys"}if(t.getBinding("selected")){return"selected"}if(t.getBinding("selectedIndex")){return"selectedIndex"}if(t.getBinding("selectedDates")){return"selectedDates"}if(t.getBinding("text")){return"text"}return undefined},_isNullValue:function e(t){if(!("getValue"in t)&&!("getSelectedKey"in t)&&!("getSelectedKeys"in t)&&!("getSelected"in t)&&!("getSelectedIndex"in t)&&!("getSelectedDates"in t)){return false}if("getValue"in t||"getSelectedKey"in t||"getSelectedKeys"in t||"getSelected"in t){return!("getValue"in t&&typeof t.getValue==="function"&&t.getValue()||"getSelectedKey"in t&&typeof t.getSelectedKey==="function"&&t.getSelectedKey()||"getSelectedKeys"in t&&typeof t.getSelectedKeys==="function"&&t.getSelectedKeys().length>0||"getSelected"in t&&typeof t.getSelected==="function"&&t.getSelected())}if("getSelectedIndex"in t&&typeof t.getSelectedIndex==="function"&&t.getSelectedIndex()>=0){return false}if("getSelectedDates"in t&&typeof t.getSelectedDates==="function"){const e=t.getSelectedDates();if(e.length>0&&e[0].getStartDate()){return false}}return true},_getRequiredErrorMessageTextByControl:function e(t){const i="Required to input.";const n="Required to select.";if(t instanceof s){return this._getResourceText(this.RESOURCE_BUNDLE_KEY_REQUIRED_INPUT,i)}if("getSelectedKey"in t||"getSelectedKeys"in t||"getSelected"in t||"getSelectedIndex"in t||"getSelectedDates"in t){return this._getResourceText(this.RESOURCE_BUNDLE_KEY_REQUIRED_SELECT,n)}return this._getResourceText(this.RESOURCE_BUNDLE_KEY_REQUIRED_INPUT,i)},_getResourceText:function e(t,i){if(this._resourceBundle){return this._resourceBundle.getText(t)}return i},_getLabelText:function e(t){if(t instanceof i){const e=t.getParent();if(e&&e instanceof l){const t=d.getReferencingLabels(e);if(t&&t.length>0){const e=E.get(t[0]);if(e&&"getText"in e&&typeof e.getText==="function"){return e.getText()}}}}if(t.getParent){const e=t.getParent();if(e instanceof p){const i=e;const n=i.getParent();if(n instanceof T){const e=i.indexOfCell(t);if(e!==-1){const t=n.getColumns().filter(e=>e.getVisible())[e].getLabel();if(typeof t==="string"){return t}else if("getText"in t&&typeof t.getText==="function"){return t.getText()}}}return undefined}else if(e instanceof n){return x.getLabelText(t,e)}}const a=d.getReferencingLabels(t);if(a&&a.length>0){const e=E.get(a[0]);if("getText"in e&&typeof e.getText==="function"){return e.getText()}}return undefined},_addMessage:function e(t,i,n){let a;let s;if(Array.isArray(t)){a=t[0];s=t}else{a=t;s=[t]}const o=sap.ui.getCore().getMessageManager();const l=o.getMessageModel();const d=F.getMetadata().getName();const g=a.getId();const u=l.getProperty("/").some(e=>r.isA(e,d)&&e.getValidationErrorControlIds().includes(g)&&e.getValidateFunctionId()===n);if(u){return}o.addMessages(new F({message:i,type:R.Error,additionalText:this._getLabelText(a),processor:new c,target:this._resolveMessageTarget(t),fullTarget:"",validationErrorControlIds:s.map(e=>e.getId()),validateFunctionId:n||""}))},_addMessageByColumn:function e(t,i,n,a,s){sap.ui.getCore().getMessageManager().addMessages(new F({message:i,type:R.Error,additionalText:s,processor:new c,target:undefined,fullTarget:a,validationErrorControlIds:[t.getId()],validateFunctionId:n||""}))},_setValueState:function e(t,i,n){if("setValueState"in t&&typeof t.setValueState==="function"){t.setValueState(i);if(i===M.Error){this._markSetValueStateError(t)}else if(i===M.None){this._unmarkSetValueStateError(t)}}if("setValueStateText"in t&&typeof t.setValueStateText==="function"){t.setValueStateText(n)}},_isSetValueStateError:function e(t){return t.data(this._CUSTOM_DATA_KEY_FOR_IS_SET_VALUE_STATE_ERROR)==="true"},_markSetValueStateError:function e(t){t.data(this._CUSTOM_DATA_KEY_FOR_IS_SET_VALUE_STATE_ERROR,"true")},_unmarkSetValueStateError:function e(t){t.data(this._CUSTOM_DATA_KEY_FOR_IS_SET_VALUE_STATE_ERROR,null)}});const F=u.extend("learnin.ui5.validator.Validator._ValidatorMessage",{constructor:function e(t){if(t&&Array.isArray(t.target)){if(!u.prototype.getTargets){const e=t.target;if(t.target.length>0){t.target=t.target[0]}else{delete t.target}u.prototype.constructor.call(this,t);this.targets=e}else{u.prototype.constructor.call(this,t)}}else{u.prototype.constructor.call(this,t)}this.validationErrorControlIds=[];if(t&&t.validationErrorControlIds&&Array.isArray(t.validationErrorControlIds)&&t.validationErrorControlIds.length>0){this.validationErrorControlIds=t.validationErrorControlIds;if("addControlId"in this&&typeof this.addControlId==="function"){this.addControlId(t.validationErrorControlIds[0])}}this.validateFunctionId="";if(t&&t.validateFunctionId){this.validateFunctionId=t.validateFunctionId}},getTargets:function e(){if(u.prototype.getTargets){return u.prototype.getTargets.call(this)}if(this.targets){return this.targets}return[]},getValidationErrorControlIds:function e(){return this.validationErrorControlIds},getValidateFunctionId:function e(){return this.validateFunctionId}});return B});
//# sourceMappingURL=Validator.js.map