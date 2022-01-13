function Field(name, size){
	this.name = name;
	this.label = name;
	this.size = size;
	
	this.onAfterChange = [];
	this.onBeforeChange = [];
	
	this.onKeyDown = [];
	this.onKeyPress = [];
	this.onKeyUp = [];
	
}

//properties
var fp = Field.prototype;
fp.label=
fp.type=
fp.name=
fp.size=
fp.group=
fp.parent=
fp.advice=
fp.value=
fp.readOnly=
fp.newLine= null;

//events
fp.onAfterChange = null;
fp.onBeforeChange = null;

fp.onKeyDown = null;
fp.onKeyPress = null;
fp.onKeyUp = null;


//public methods
fp.setValue = function( value ){
	this.value = value;	
	pr.dispatchSetFieldValueFromFramework( this._completeName(), value );
}
fp.getValue = function(){
	return this.value;	
}

fp.setFocus = function(){
	pr.dispatchSetFieldFocusFromFramework( this._completeName() );
}
fp.setLabel = function(label){
	this.label = label;	
	pr.dispatchSetFieldLabel( this._completeName(), label );
}


//public methods - feedbacks
fp.success = function(){
	pr.dispatchFieldSuccessFromFramework( this._completeName() );
}
fp.danger = function(){
	pr.dispatchFieldDangerFromFramework( this._completeName() );
}
fp.warning = function(){
	pr.dispatchFieldWarningFromFramework( this._completeName() );
}

fp.clearFeedbacks = function(){
	pr.dispatchFieldClearFeedbacksFromFramework( this._completeName() );
}

//private methods
fp._completeName = function _completeName(){
	return this.parent.name + '.' + this.name;
}
fp._formatLabel = function _formatLabel( label ){
	return label;
}

//abstract methods
fp.html = function(){};




function TextField(name, size){
	Field.call( this, name, size );
	this.type = 'text';
}

SjsFramework.inherits( TextField, Field );

TextField.prototype.height = null;

TextField.prototype.html = function(){
	var label = this.label || this._formatLabel( this.name );

	var classFieldAlign = "form-group row";	
	if ( this.parent.fieldAlign.toUpperCase() == "H" ){
		classFieldAlign = "form-group";	
	}
	
	var advice = "";
	if ( this.advice ){	
		advice = '<small class="form-text text-muted">' + this.advice + '</small>';
	}
	
	var name = this._completeName();		
	
	var disabledHtml = "";
	if ( this.readOnly ){
		disabledHtml = 'disabled="disabled"';
	}		
	
	var valueHtml = "";
	if ( this.value !== null && this.value !== undefined ){
		valueHtml = ""+this.value;
	}
	
	var eventsHTML = 'onKeyDown="pr.dispachFieldOnKeyDown(\'' + name + '\', event);return true;" ' +
					 'onKeyPress="pr.dispachFieldOnKeyPress(\'' + name + '\', event);return true;" ' +
	  			     'onKeyUp="pr.dispachFieldOnKeyUp(\'' + name + '\', event);return true;" ' +
					 'onChange="pr.dispachFieldOnAfterChange(\'' + name + '\',this.value)" ';
	
	
	var inputHtml = "";
	if ( this.height && this.height > 1 ){
		inputHtml = '<textarea class="form-control form-control-sm" rows="' + this.height + '" id="' + name + '" placeholder="" ' + eventsHTML + ' " ' + disabledHtml + '>' + valueHtml + '</textarea>';
	} else {
		inputHtml = '<input type="text" class="form-control form-control-sm" id="' + name + '" value="' + valueHtml + '" placeholder="" ' + eventsHTML + ' ' + disabledHtml + '>';
	}
	
	
	return 	'<div class="' + classFieldAlign + '">' + 
				( this.label === undefined ? '' : '<strong><label id="label' + name + '" class="custom-no-space-break col-sm-2 col-form-label">' + label + '</label></strong>' ) + 
				'<div class="col-sm-10">' + 
					inputHtml + 
					advice +
				'</div>' +
			'</div>';
}






function SelectField(name, size){
	Field.call( this, name, size );
	this.type = 'select';
}
SjsFramework.inherits( SelectField, Field );

SelectField.prototype.options = null;

SelectField.prototype.getIndexOfValue = function(){
	for (var i=0; i < this.options.length; i++ ){
		if ( this.options[i][0] === this.value ){
			return i;
		}
	}
}

SelectField.prototype.html = function(){
	var label = this.label || this._formatLabel( this.name );

	var classFieldAlign = "form-group row";	
	if ( this.parent.fieldAlign.toUpperCase() == "H" ){
		classFieldAlign = "form-group";	
	}
	
	var advice = "";
	if ( this.advice ){	
		advice = '<small class="form-text text-muted">' + this.advice + '</small>';
	}
	
	var name = this._completeName();	
	
	var eventsHTML = 'onKeyDown="pr.dispachFieldOnKeyDown(\'' + name + '\', event);return true;" ' +
					 'onKeyPress="pr.dispachFieldOnKeyPress(\'' + name + '\', event);return true;" ' +
	  			     'onKeyUp="pr.dispachFieldOnKeyUp(\'' + name + '\', event);return true;" ' +
					 'onChange="pr.dispachFieldOnAfterChange(\'' + name + '\',this.value)" ';
	
	var html = 	'<div class="' + classFieldAlign + '">' + 
				( this.label === undefined ? '' : '<label id="label' + name + '"class="custom-no-space-break col-sm-2 col-form-label"><strong>' + label + '</strong></label>' ) + 
				'<div class="col-sm-10">' +
				'<select class="custom-select" id="' + name + '" ' + eventsHTML + '>';
				  
	if ( this.options.length ){
		for (var i=0; i < this.options.length; i++){
			var option = this.options[i];
				html += '<option value="' + option[0] + '">' + option[1] + '</option>';
		}
		this.value = this.options[0][0];
	}		
				  
	html +=		'</select>' +
				advice +
			'</div>' +
			'</div>';
			
	return html;			
}









function ButtonField(name, size){
	Field.call( this, name, size );
	this.onClick = [];
	this.type = 'button';
}

ButtonField.prototype.onClick = null;

SjsFramework.inherits( ButtonField, Field );

ButtonField.prototype.html = function(){
	var label = this.label || this._formatLabel( this.name );
	
	var classFieldAlign = "form-group row";	
	if ( this.parent.fieldAlign.toUpperCase() == "H" ){
		classFieldAlign = "form-group";	
	}
	
	var advice = "";
	if ( this.advice ){	
		advice = '<small class="form-text text-muted">' + this.advice + '</small>';
	}
	
	var name = this._completeName();
	
	var showEmptyLabel = false;	
	if ( this.parent.fieldAlign.toUpperCase() == "H" && this.label !== undefined ){
		showEmptyLabel = true;
	}
	
	return 	'<div class="' + classFieldAlign + '">' + 
				( showEmptyLabel ? '<label id="emptyLabel' + name + '" class="col-sm-2 col-form-label">&nbsp;</label>' : '' ) + 
				'<div class="col-sm-10">' + 
					'<button type="button" class="btn btn-primary" id="' + name + '" onClick="pr.dispachButtonOnclick(\'' + name + '\')" >' + label + '</button>' + 
					advice +
				'</div>' +
			'</div>';
}










function Label(name, text){
	this.name = name;
	this.text = text;
	this.onClick = [];		
}

Label.prototype.name = null;
Label.prototype.text = null;
Label.prototype.process = null;

Label.prototype.onClick = null;

Label.prototype.html = function(){

	return 	'<div id="label' + this.name + '" onClick="pr.dispachLabelOnclick(\'' + this.name + '\')">' + 
				this.text +
			'</div>';
			
}