Products.Deutsch.Aufgaben.Semester1.Aufgabe002 = {};
Products.Deutsch.Aufgaben.Semester1.Aufgabe002.ZahlenZuWorter = new Process("ZahlenZuWorter", function(){

var maxZahlen = 4;

function zufallszahlGenerieren( fld ){

	var value = fld.parent.process.grid("grdVariables").field("Zahlen").getValue().split("-");
	var min = parseInt( value[0].replace('.','') );
	var max = parseInt( value[1].replace('.','') );

	return Math.floor(Math.random() * max) + min;
}

function process_ZahlenGenerieren( fld, oldValue, newValue ){
	 fld.parent.process.grid("grdZahlen").clearFieldValues().clearFieldFeedbacks().field("zahlen1").setFocus();	

	 var grdZahlen = fld.parent.process.grid("grdZahlen");
	 
	 for (var i=1; i<=maxZahlen; i++){
		var nummer = zufallszahlGenerieren( fld );
		var f = grdZahlen.field("zahlen"+i);		
		f.zahlenZuWorter = Products.Deutsch.HilfsmittelFunktionen.zahlenZuWorter( nummer+'' );
		f.setLabel(nummer);
		f.warning();
	}			 	 
	 
}

var grdVar = new Grid("grdVariables", this);
grdVar.title = "Wählen Sie die Zahlen";
grdVar.fieldAlign = 'h';

grdVar.onDefineFields.push( function ( grd ){

	var fld = grd.addField("Zahlen","Select");
	fld.label = undefined;
	fld.options = [ ["0-100","0-100"], 
					["101-1.000","101-1.000"], 
					["1.000-10.000","1.000-10.000"] ];
	fld.onAfterChange.push( process_ZahlenGenerieren );

	fld = grd.addField("Generieren","button");
	fld.label = undefined;
	fld.onClick.push( function ( fld ){
		process_ZahlenGenerieren( fld );
	} );
	
	fld = grd.addField("Antworten","button");
	fld.label = undefined;
	fld.onClick.push( function ( fld ){
		 for (var i=1; i<=maxZahlen; i++){
			var f = grdZahlen.field("zahlen"+i);		
			f.setValue( f.zahlenZuWorter );
			f.success();
		}
	} );
	
	//grd.addField("Zeit Angriff Modus","button").onClick.push( function ( fld ){	} );
	
} );

function zahlenWorterVergleichen( fld, valueToCompare ){
	if ( valueToCompare ){
		if ( (valueToCompare+'').toLowerCase().trim().replace('  ', ' ') == fld.zahlenZuWorter.toLowerCase().trim().replace('  ', ' ') ){
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

var grdZahlen = new Grid("grdZahlen", this);
grdZahlen.title = "Zahlen zu Worter";
grdZahlen.fieldAlign = 'h';
for (var i=1; i<=maxZahlen; i++){

	var fld = grdZahlen.addField("zahlen" + i,"text");
	fld.onAfterChange.push( function( fld ){
		zahlenWorterVergleichen( fld, fld.getValue() ); 
	} );
	fld.onKeyUp.push( function ( fld, charCode, value ){
		if ( charCode == 13 ){
			textToSpeech(fld.zahlenZuWorter, 'de' );
		} else {
			if ( value && value.trim() && (charCode > 64 && charCode < 91) ){
				var result = zahlenWorterVergleichen( fld, value );
				if ( result ){
					var indice = parseInt(fld.name.replace("zahlen",""));
					if ( indice < maxZahlen ){
						indice++;
					} else {
						indice = 1;						
					}
					fld.setValue(value);
					if (indice == 1){
						process_ZahlenGenerieren( fld );
					}					
					var nextField = fld.parent.field("zahlen"+indice)
					nextField.setFocus();
					textToSpeech( nextField.zahlenZuWorter, 'de' );					
				}
			}	
		}
	} );
	
	
}	

Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.create.call(this,null);

this.addInteraction( "interacaoUnica", function(){
	grdVar.write();
	grdZahlen.write();	
	
	process_ZahlenGenerieren( grdVar.field('Zahlen') );

	Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.write.call(this);
	
} );



} );