function Grid(name, process){
	this.name = name;
	this.fields = [];
	this.fields.hash = {};
	process.addGrid( this );
	
	this.fieldAlign = 'h';
	
	this.onDefineFields = [];
};

//properties
Grid.prototype.title = "";
Grid.prototype.name = "";
Grid.prototype.fieldAlign = "";
Grid.prototype.canMinimize = "";

Grid.prototype.process = null;

//methods
Grid.prototype.onDefineFields = null;

Grid.prototype.fieldClassFactory = function( type ){
	if ( (type+"").toUpperCase() == "TEXT" ) return TextField;
	if ( (type+"").toUpperCase() == "SELECT" ) return SelectField;	
	if ( (type+"").toUpperCase() == "BUTTON" ) return ButtonField;	
};

Grid.prototype.addField = function( name, type, size ){
	if ( this.fields.hash[ name ] ){
		throw 'Field ' + name + ' already defined!';
	}
	
	var c = this.fieldClassFactory( type );
	var f =  new c(name,size);
	f.parent = this;
	this.fields.push( f );
	this.fields.hash[ f.name ] = f;
	return f;
}


Grid.prototype.getFieldByIndex = function ( index ){
	var ob = this.fields[ index ];
	return ob;
}
Grid.prototype.getFieldByName = function ( name ){
	var ob = this.fields.hash[ name ];
	return ob;
}
Grid.prototype.field = function ( indexOrName ){
	if ( typeof indexOrName == 'string' ) return this.getFieldByName( indexOrName );
	return this.getFieldByIndex( indexOrName );
}


//auxiliary methods;

Grid.prototype.clearFieldValues = function ( arExceptionFieldNames ){
	var flds = this.fields;
	for (var i=0; i < flds.length; i++){
		if ( arExceptionFieldNames && arExceptionFieldNames.indexOf(flds[i].name) != -1 ){
			continue;
		}	
		flds[i].setValue( null );
	}	
	return this;
}	
Grid.prototype.clearFieldFeedbacks = function ( arExceptionFieldNames ){
	var flds = this.fields;
	for (var i=0; i < flds.length; i++){
		if ( arExceptionFieldNames && arExceptionFieldNames.indexOf(flds[i].name) != -1 ){
			continue;
		}	
		flds[i].clearFeedbacks();
	}	
	return this;
}	


Grid.prototype.minimize = function(){	
	pr.dispatchGridMinimize( this.name );
}
Grid.prototype.maximize = function(){	
	pr.dispatchGridMaximize( this.name );
}


Grid.prototype.write = function(){	

	if ( this.onDefineFields.length ){
		this.onDefineFields[0]( this );
	}

	
	var classFieldAlign = "form-group";	
	if ( this.fieldAlign.toUpperCase() == "H" ){
		classFieldAlign = "form-group row";	
	}

	var classGridCollapse = '';
	var colapseHtml = '';
	if (this.canMinimize){
		colapseHtml = 'data-toggle="collapse" data-target="#innerDivGrid' + this.name + '" role="button"';
		classGridCollapse = ' collapse show';
	}
	
	var str = 
	'<div id="grid' + this.name + '">' + 
		/*'<form id=form' + this.name + '>' +*/ 
			( this.title !== undefined ? '<div class="form-group" id="titleDivGrid' + this.name + '" ' + colapseHtml + '><h5>' + this.title + '</h5></div>' : '' ) + 
			'<div class="grid' + classGridCollapse + '" id="innerDivGrid' + this.name + '">' +
				'<div class="' + classFieldAlign + '" >';			
			
		var group = "";
		
		for (var i=0; i < this.fields.length; i++ ){

			var fld = this.fields[i];
		
			if ( fld.newLine ){		
				str += '</div>' +
					   '<div class="' + classFieldAlign + '" >';			
				
			}
		
			if ( fld.group && fld.group != group ){
		
				str += 
					'<div class="' + classFieldAlign + '">' + 
						'<label for="formGroupExampleInput">' + fld.group + '</label>' + 
					'</div>';
					
				group = fld.group;		
				
			}		

			var html = fld.html();
			str += html;
		}
			
		str += '</div>' +
			'</div>' +
		/*'</form>' +*/
	'</div><div class="clearfix"></div>';

	if ( this.process.document ){
		var ele = this.process.document.getElementById("main_container");
		ele.innerHTML = (ele.innerHTML||"") + str;		
	}		
		
	return str;		
}