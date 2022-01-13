function ProcessRunner( process, document ){
	this.process = process;
	this.process.document = document;
	this.document = document;
}

var Prrp = ProcessRunner.prototype;

Prrp.runStep = function( step ){
	if ( this._lastStep ){
		//this._hideLastStep
	}	
	step.document = this.document;
	step.run();	
	this._lastStep = step.name;
}

Prrp.run = function( step ){	
	this._prepareExecution();

	this.process.run();
	
	var firstStep = this.process.getStepByIndex(0); 
	this.runStep( firstStep );
}

Prrp.dispachButtonOnclick = function( name ){
	var arOb = name.split('.');
	var grd = this.process.getGridByName( arOb[0] );
	var button = grd.getFieldByName( arOb[1] );		
	if ( button.onClick.length ){
		button.onClick[0]( button );
	}	
}

Prrp.dispachLabelOnclick = function( name ){
	var label = this.process.label( name );		
	if ( label.onClick.length ){
		label.onClick[0]( label );
	}	
}


Prrp.dispachFieldOnAfterChange = function( name, newValue ){
	var arOb = name.split('.');
	var grd = this.process.getGridByName( arOb[0] );
	var fld = grd.getFieldByName( arOb[1] );
	
	var beforeChangeValue = null;	
	var oldValue = fld.value;
	
	if ( fld.onBeforeChange.length ){
		beforeChangeValue = fld.onBeforeChange[0]( fld, oldValue, newValue );
		if ( beforeChangeValue == oldValue ){
			return 
		}
	}	

	fld.value = newValue;
	
	if ( fld.onAfterChange.length ){
		fld.onAfterChange[0]( fld, oldValue, newValue );
	}	
}

Prrp.dispatchSetFieldValueFromFramework = function( name, value ){
	var element = this.document.getElementById(name);
	element.value = value;
}

Prrp.dispachFieldOnKeyDown = function( name, event ){
	var arOb = name.split('.');
	var grd = this.process.getGridByName( arOb[0] );
	var fld = grd.getFieldByName( arOb[1] );
		
	if ( fld.onKeyDown.length ){
		
		//if ( $ ){
		//	$(document).off('keydown').on('keydown',function(event){
				if (event){
					var input = document.getElementById(name);
					var v = input.value;

					var charCode = event.charCode || event.which; 
					fld.onKeyDown[0]( fld, charCode, (v||"") );	
					event.stopPropagation();
					event = null;				
				}	
		//	} );		
		//}	
	}
}


Prrp.dispachFieldOnKeyPress = function( name, event ){
	var arOb = name.split('.');
	var grd = this.process.getGridByName( arOb[0] );
	var fld = grd.getFieldByName( arOb[1] );
		
	if ( fld.onKeyPress.length ){
		
		//if ( $ ){
		//	$(document).off('keypress').on('keypress',function(event){
				if (event){
					var input = document.getElementById(name);
					var v = input.value;

					var charCode = event.charCode || event.which; 
					fld.onKeyPress[0]( fld, charCode, (v||"") );	
					event.stopPropagation();
					event = null;
				}	
		//	} );		
		//}	
	}	
}
	
Prrp.dispachFieldOnKeyUp = function( name, event ){
	var arOb = name.split('.');
	var grd = this.process.getGridByName( arOb[0] );
	var fld = grd.getFieldByName( arOb[1] );
		
	if ( fld.onKeyUp.length ){		
		if (event){
			//var input = document.getElementById(name);
			//$(input).off('keyup').on('keyup',function(event){
				if (event){
					var input = document.getElementById(name);
					var v = input.value;

					var charCode = event.charCode || event.which; 
					fld.onKeyUp[0]( fld, charCode, (v||"") );	
					event.stopPropagation();				
					event = null;
				}				
			//} );		
		}	
		
	}	
}

	
	
Prrp.dispatchFieldClearFeedbacksFromFramework = function( name ){
	var element = this.document.getElementById(name);

	var ec = element.classList;
	ec.remove("form-control-success");
	ec.remove("form-control-danger");
	ec.remove("form-control-warning");
	
	var eppc = element.parentNode.parentNode.classList;
	eppc.remove("has-success");
	eppc.remove("has-danger");
	eppc.remove("has-warning");
}

Prrp.dispatchSetFieldFocusFromFramework = function( name ){
	var element = this.document.getElementById(name);
	element.focus();
}

Prrp.dispatchSetFieldLabel = function( name, label ){
	var element = this.document.getElementById('label'+name);
	element.innerHTML = label;
}


Prrp.dispatchFieldSuccessFromFramework = function( name ){
	//var element = $('#'+name);
	var element = this.document.getElementById(name);

	this.dispatchFieldClearFeedbacksFromFramework( name );
	
	element.classList.add("form-control-success");
	element.parentNode.parentNode.classList.add("has-success");
}
Prrp.dispatchFieldDangerFromFramework = function( name ){
	//var element = $('#'+name);
	var element = this.document.getElementById(name);
	
	this.dispatchFieldClearFeedbacksFromFramework( name );
	
	element.classList.add("form-control-danger");	
	element.parentNode.parentNode.classList.add("has-danger");
}
Prrp.dispatchFieldWarningFromFramework = function( name ){
	//var element = $('#'+name);
	var element = this.document.getElementById(name);
	
	this.dispatchFieldClearFeedbacksFromFramework( name );
	
	element.classList.add("form-control-warning");	
	element.parentNode.parentNode.classList.add("has-warning");
}


Prrp.dispatchGridMinimize = function(name){
	var element = this.document.getElementById('innerDivGrid' + name);
	var ec = element.classList;
	ec.remove('in');
	ec.remove('show');
	ec.add('in');
}
Prrp.dispatchGridMaximize = function(name){
	var element = this.document.getElementById('innerDivGrid' + name);
	var ec = element.classList;
	ec.remove('in');
	ec.remove('show');
	ec.add('show');
}



Prrp._prepareExecution = function (){	
	this._writeConfirmDialogDiv();
	this._writeAlertDialogDivs();
}


Prrp._writeConfirmDialogDiv = function (){	

	var str = 
	'<button type="button" style="display:none" data-toggle="modal" data-target="#__confirmDialog" id="__confirmDialogButton"></button>' + 
	'<div aria-labelledby="myModalLabel" class="modal fade" id="__confirmDialog" role="dialog" tabindex="-1">' + 
		'<div class="modal-dialog" role="document">' + 
			'<div class="modal-content">' + 
				/*'<div class="modal-header">' + 
					'<h4 class="modal-title" id="#__confirmDialog_title">Title</h4>' + 
				'</div>' + */
				'<div class="modal-body" id="__confirmDialog_text">' + 
					'<p>Text</p>' + 
				'</div>' + 
				'<div class="modal-footer">' + 
					'<input type="hidden" id="RowId" value="">' + 
					'<button class="btn btn-default" data-dismiss="modal" type="button">Cancel</button>' + 
					'<button class="btn btn-danger" id="confirm-button" type="submit">Confirm</button>' + 
				'</div>' + 
			'</div><!-- end modal-content -->' + 
		'</div><!-- end modal-dialog -->' + 
	'</div><!-- end modal -->';

	var ele = this.document.getElementById("main_container");
	ele.innerHTML = (ele.innerHTML||"") + str;		
}


Prrp._writeAlertDialogDivs = function (){	

	var str = 
		'<button type="button" style="display:none" data-toggle="modal" data-target="#__successDialog" id="__successDialogButton"></button>' + 
		'<div aria-labelledby="myModalLabel" class="modal fade" id="__successDialog" role="dialog" tabindex="-1">' + 
			'<div class="modal-dialog" role="document">' + 
				'<div class="modal-content">' + 
					'<div class="alert alert-success" id="__successDialog">' +
					  '<strong>Success!</strong> Indicates a successful or positive action.' +
					'</div>' +
				'</div><!-- end modal-content -->' + 
			'</div><!-- end modal-dialog -->' + 
		'</div><!-- end modal -->' +

		'<button type="button" style="display:none" data-toggle="modal" data-target="#__infoDialog" id="__infoDialogButton"></button>' + 
		'<div aria-labelledby="myModalLabel" class="modal fade" id="__infoDialog" role="dialog" tabindex="-1">' + 
			'<div class="modal-dialog" role="document">' + 
				'<div class="modal-content">' + 
					'<div class="alert alert-info" id="__infoDialog_text">' +
					  '<strong>Info!</strong> Indicates a neutral informative change or action.' +
					'</div>' +
				'</div><!-- end modal-content -->' + 
			'</div><!-- end modal-dialog -->' + 
		'</div><!-- end modal -->' +

		'<button type="button" style="display:none" data-toggle="modal" data-target="#__warningDialog" id="__warningDialogButton"></button>' + 
		'<div aria-labelledby="myModalLabel" class="modal fade" id="__warningDialog" role="dialog" tabindex="-1">' + 
			'<div class="modal-dialog" role="document">' + 
				'<div class="modal-content">' + 
					'<div class="alert alert-warning" id="__warningDialog_text">' +
					  '<strong>Warning!</strong> Indicates a warning that might need attention.' +
					'</div>' +
				'</div><!-- end modal-content -->' + 
			'</div><!-- end modal-dialog -->' + 
		'</div><!-- end modal -->' +

		'<button type="button" style="display:none" data-toggle="modal" data-target="#__dangerDialog" id="__dangerDialogButton"></button>' + 
		'<div aria-labelledby="myModalLabel" class="modal fade" id="__dangerDialog" role="dialog" tabindex="-1">' + 
			'<div class="modal-dialog" role="document">' + 
				'<div class="modal-content">' + 
					'<div class="alert alert-danger" id="__dangerDialog">' +
					  '<strong>Danger!</strong> Indicates a dangerous or potentially negative action.' +
					'</div>' + 
				'</div><!-- end modal-content -->' + 
			'</div><!-- end modal-dialog -->' + 
		'</div><!-- end modal -->';

		
	var ele = this.document.getElementById("main_container");
	ele.innerHTML = (ele.innerHTML||"") + str;		
	
}	