Products.English.Exercises.Semester1.Exercise002 = {};
Products.English.Exercises.Semester1.Exercise002.NumbersToWords = new Process("NumbersToWords", function(){

var maxNumbers = 4;

function generateAleatoryNumber( fld ){

	var value = fld.parent.process.grid("grdVar").field("Number").getValue().split("-");
	var min = parseInt( value[0].replace('.','') );
	var max = parseInt( value[1].replace('.','') );

	return Math.floor(Math.random() * max) + min;
}

function process_NumberGenerator( fld, oldValue, newValue ){	
	 fld.parent.process.grid("grdNumbers").clearFieldValues().clearFieldFeedbacks().field("number1").setFocus();	
	 var grdNumbers = fld.parent.process.grid("grdNumbers");
	 
	 for (var i=1; i<=maxNumbers; i++){
		var number = generateAleatoryNumber( fld );
		var f = grdNumbers.field("number"+i);		
		f.numberToWords = Products.English.EnglishAuxiliaryFunctions.numberToEnglish( number+'' );
		f.setLabel(number);
		f.warning();
	}			 	 
	 
}

var grdVar = new Grid("grdVar", this);
grdVar.title = "Choose the number range:";
grdVar.fieldAlign = 'h';

grdVar.onDefineFields.push( function ( grd ){

	var fld = grd.addField("Number","Select");
	fld.label = undefined;
	fld.options = [ ["0-100","0-100"], 
					["101-1.000","101-1.000"], 
					["1.000-10.000","1.000-10.000"] ];
	fld.onAfterChange.push( process_NumberGenerator );

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
			f.setValue( f.numberToWords );
			f.success();
		}
	} );
	
	//grd.addField("Time attack mode","button").onClick.push( function ( fld ){} );
	
} );

function numbersAndWordsComparing( fld, valueToCompare ){
	if ( valueToCompare ){
		if ( (valueToCompare+'').trim().toLowerCase().replace('  ', ' ') == fld.numberToWords.trim().toLowerCase().replace('  ', ' ') ){
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
grdNumbers.title = "Convert numbers to words below:";
grdNumbers.fieldAlign = 'h';
for (var i=1; i<=maxNumbers; i++){
	var fld = grdNumbers.addField("number" + i,"text")
	fld.onAfterChange.push( function ( fld ){ 
		numbersAndWordsComparing( fld, fld.getValue() );
	} );
	fld.onKeyUp.push( function ( fld, charCode, value ){
		if ( charCode == 13 ){
			textToSpeech( fld.numberToWords, "en-US" );
		} else {
			if ( value && value.trim() && (charCode > 64 && charCode < 91) ){
				var result = numbersAndWordsComparing( fld, value );
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
					textToSpeech( nextField.numberToWords, "en-US" );					
				}
			}	
		}
	} );	
}	

this.addInteraction( "firstInteraction", function(){
	grdVar.write();
	grdNumbers.write();	
	
	process_NumberGenerator( grdVar.field('Number') );
} );


} );