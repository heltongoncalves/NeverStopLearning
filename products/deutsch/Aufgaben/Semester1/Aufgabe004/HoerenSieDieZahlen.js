Products.Deutsch.Aufgaben.Semester1.Aufgabe004 = {};
Products.Deutsch.Aufgaben.Semester1.Aufgabe004.HoerenSieDieZahlen = new Process("HoerenSieDieZahlen", function(){

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
		f.worterZuZahlen = nummer+'';		
		//f.setLabel( f.labelObject.html() );
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
	
	fld = grd.addField("Voice","Select");
	fld.label = undefined;
	fld.options = [ [ "de", "Deutschland Deutsch" ] ];
	
	fld = grd.addField("Generieren","button");
	fld.label = undefined;
	fld.onClick.push( function ( fld ){
		process_ZahlenGenerieren( fld );
	} );
	
	fld = grd.addField("Antworten","button")
	fld.label = undefined;
	fld.onClick.push( function ( fld ){
		 for (var i=1; i<=maxZahlen; i++){
			var f = grdZahlen.field("zahlen"+i);		
			f.setValue( f.worterZuZahlen );
			f.success();
		}
	} );
	
	//grd.addField("Zeit Angriff Modus","button").onClick.push( function ( fld ){	} );
	
} );

function zahlenWorterVergleichen( fld, valueToCompare ){
	if ( valueToCompare ){
		if ( (valueToCompare+'').toLowerCase().trim().replace('  ', ' ') == fld.worterZuZahlen ){
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
grdZahlen.title = "Hören und schreiben Sie die Zahlen";
grdZahlen.fieldAlign = 'h';
for (var i=1; i<=maxZahlen; i++){
	
	var fld = grdZahlen.addField("zahlen" + i,"text");
	fld.onAfterChange.push( function( fld ){ 
		zahlenWorterVergleichen( fld, fld.getValue() ); 
	} );
	fld.onKeyUp.push( function ( fld, charCode, value ){
		if ( charCode == 13 ){
			textToSpeech(fld.zahlenZuWorter, grdVar.field("Voice").getValue() );
		} else {
			if ( value && value.trim() && (charCode > 47 && charCode < 58) ){
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
					textToSpeech( nextField.zahlenZuWorter, grdVar.field("Voice").getValue() );					
				}
			}	
		}
	} );
	
	var label = new Label("label" + i);
	label.text = '<img src="./../fw/pic/play-circle-128.png" width=20 height=20/">';
	label.onClick.push( function( lbl ){ 
		textToSpeech(lbl.fieldObject.zahlenZuWorter, grdVar.field("Voice").getValue() );
		lbl.fieldObject.setFocus();
	} );
	this.addLabel(label);	
	
	label.fieldObject = fld;
	
	fld.label = label.html();
}	

Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.create.call(this,null);

this.addInteraction( "interacaoUnica", function(){
	grdVar.write();
	grdZahlen.write();	
	
	process_ZahlenGenerieren( grdVar.field('Zahlen') );
	
	grdZahlen.field("zahlen1").setFocus();	
	
	Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.write.call(this);

} );



} );