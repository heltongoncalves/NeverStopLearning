Products.English.Exercises.Semester1.Exercise004 = {};
Products.English.Exercises.Semester1.Exercise004.ListenTheNumbers = new Process("ListenTheNumbers", function(){

var maxNumbers = 4;

function aleatoryNumberGenerator( fld ){

	var value = fld.parent.process.grid("grdVariables").field("Number").getValue().split("-");
	var min = parseInt( value[0].replace('.','') );
	var max = parseInt( value[1].replace('.','') );

	return Math.floor(Math.random() * max) + min;
}

function process_NumberGenerator( fld, oldValue, newValue ){
	 
	 fld.parent.process.grid("grdNumbers").clearFieldValues().clearFieldFeedbacks().field("number1").setFocus();	

	 var grdNumbers = fld.parent.process.grid("grdNumbers");
	 
	 for (var i=1; i<=maxNumbers; i++){
		var number = aleatoryNumberGenerator( fld );
		var f = grdNumbers.field("number"+i);		
		f.numberToWords = Products.English.EnglishAuxiliaryFunctions.numberToEnglish( number+'' );
		f.wordsToNumbers = number+'';		
		//f.setLabel( f.labelObject.html() );
		f.warning();
	}			 	 
	 
}

var grdVar = new Grid("grdVariables", this);
grdVar.title = "Choose the number range";
grdVar.fieldAlign = 'h';

grdVar.onDefineFields.push( function ( grd ){

	var fld = grd.addField("Number","Select");
	fld.label = undefined;
	fld.options = [ ["0-100","0-100"], 
					["101-1.000","101-1.000"], 
					["1.000-10.000","1.000-10.000"] ];
	fld.onAfterChange.push( process_NumberGenerator );
	
	fld = grd.addField("Voice","Select");
	fld.label = undefined;
	fld.options = [ 
		[ "en-US", "US English" ],
        [ "en-GB", "UK English" ] ];
	
	fld = grd.addField("Generate","button");
	fld.label = undefined;
	fld.onClick.push( function ( fld ){
		process_NumberGenerator( fld );
	} );
	
	fld = grd.addField("Answers","button");
	fld.label = undefined;
	fld.onClick.push( function ( fld ){
		 for (var i=1; i<=maxNumbers; i++){
			var f = grdNumbers.field("number"+i);		
			f.setValue( f.wordsToNumbers );
			f.success();
		}
	} );
	
	//grd.addField("Time atack mode","button").onClick.push( function ( fld ){} );
	
} );

function answersComparing( fld, valueToCompare ){
	if ( valueToCompare || fld.value ){
		if ( (valueToCompare+'').toLowerCase().trim().replace('  ', ' ') == fld.wordsToNumbers.toLowerCase().trim().replace('  ', ' ') ){
			fld.success();
			return true;
		} else {
			fld.danger();
			return false;
		}
	} else {
		fld.warning();
		return false;
	}
}


var grdNumbers = new Grid("grdNumbers", this);
grdNumbers.title = "Listen the numbers and write the answers";
grdNumbers.fieldAlign = 'h';
for (var i=1; i<=maxNumbers; i++){
	
	var fld = grdNumbers.addField("number" + i,"text");
	fld.onAfterChange.push( function ( fld ){
		answersComparing( fld, fld.getValue() );
	} );
	fld.onKeyUp.push( function ( fld, charCode, value ){
		if ( charCode == 13 ){
			textToSpeech( fld.numberToWords, grdVar.field("Voice").getValue() );
		} else {
			if ( value && value.trim() && (charCode > 47 && charCode < 58) ){
				var result = answersComparing( fld, value );
				if ( result ){
					var indice = parseInt(fld.name.replace("number",""));
					if ( indice < maxNumbers ){
						indice++;
					} else {
						indice = 1;						
					}
					fld.setValue(value);
					if ( indice == 1 ){
						process_NumberGenerator( fld );
					}					
					var nextField = fld.parent.field("number"+indice)
					nextField.setFocus();
					textToSpeech( nextField.numberToWords, grdVar.field("Voice").getValue() );					
				}
			}	
		}
	} );
	

	var label = new Label("label" + i);
	label.text = '<img src="./../fw/pic/play-circle-128.png" width=20 height=20/">';
	label.onClick.push( function( lbl ){ 
		textToSpeech( lbl.fieldObject.numberToWords, grdVar.field("Voice").getValue() );
		lbl.fieldObject.setFocus();
	} );
	this.addLabel(label);	
	
	label.fieldObject = fld;
	
	fld.label = label.html();
}	

this.addInteraction( "interacaoUnica", function(){
	grdVar.write();
	grdNumbers.write();	
	
	process_NumberGenerator( grdVar.field('Number') );
	
	grdNumbers.field("number1").setFocus();	
} );



} );