function Process( name, defineProcessFunction ){
	this.name = name;
	this._steps = [];
	this._steps.hash = {};
	
	this._grids = [];
	this._grids.hash = {};
	
	this._labels = [];
	this._labels.hash = {};

	this.onDefineProcess = [];	
	this.onDefineProcess.push( defineProcessFunction );
	
}

var Prp = Process.prototype;

Prp.onDefineProcess = null;
Prp._grids = null;
Prp._labels = null;
Prp._steps = null;
Prp.name = null;
Prp.document = null;


Prp.run = function (){
	this.onDefineProcess[0].call( this );
}

Prp.addStep = function( step ){
	step.process = this;
	this._steps.push( step );
	this._steps.hash[step.name] = step;
}
Prp.getStepByIndex = function( index ){
	var step = this._steps[ index ];
	return step;
}
Prp.getStepByName = function( name ){
	var step = this._steps.hash[ name ];
	return step;
}
Prp.addInteraction = function( name, func ){
	this.addStep( new Interaction( name, this, func ) );
};
Prp.write = function( text ){
	var ele = this.document.getElementById("main_container");
	ele.innerHTML = (ele.innerHTML||"") + text;			
}


/* Grid */
Prp.addGrid = function( grd ){
	grd.process = this;
	this._grids.push( grd );
	this._grids.hash[ grd.name ] = grd;
}
Prp.getGridByName = function( name ){
	var grd = this._grids.hash[ name ];
	return grd;
}
Prp.getGridByIndex = function( index ){
	var grd = this._grids[ index ];
	return grd;
}
Prp.grid = function( indexOrName ){
	if ( typeof indexOrName == 'string' ) return this.getGridByName( indexOrName );
	return this.getGridByIndex( indexOrName );
}

/* Label */
Prp.addLabel = function( lbl ){
	lbl.process = this;
	this._labels.push( lbl );
	this._labels.hash[ lbl.name ] = lbl;
}
Prp.getLabelByName = function( name ){
	var lbl = this._labels.hash[ name ];
	return lbl;
}
Prp.getLabelByIndex = function( index ){
	var lbl = this._labels[ index ];
	return lbl;
}
Prp.label = function( indexOrName ){
	if ( typeof indexOrName == 'string' ) return this.getLabelByName( indexOrName );
	return this.getLabelByIndex( indexOrName );
}


Prp.confirm = function( text, func ){
	var div = $('#__confirmDialog_text');
	div.html(text);	
	
	var process = this;
	$("#confirm-button").off('click').on('click', function() {
		func( process );		
		 $("#__confirmDialog").modal('hide');
	} );		

	var button = $('#__confirmDialogButton');
	button.click();
}

Prp.info = function( title, text ){
	$('#__infoDialog_text').html(title && text ? '<strong>' + title + '</strong> ' + text : title);
	$('#__infoDialogButton').click();
}
Prp.alert = function( title, text ){
	$('#__warningDialog_text').html(title && text ? '<strong>' + title + '</strong> ' + text : title);
	$('#__warningDialogButton').click();
}
Prp.success = function( title, text ){
	$('#__successDialog_text').html(title && text ? '<strong>' + title + '</strong> ' + text : title);
	$('#__successDialogButton').click();
}
Prp.danger = function( title, text ){
	$('#__dangerDialog_text').html(title && text ? '<strong>' + title + '</strong> ' + text : title);
	$('#__dangerDialogButton').click();
}