Products.Deutsch.Aufgaben.Semester1.Aufgabe007 = {};
Products.Deutsch.Aufgaben.Semester1.Aufgabe007.Diktattext = new Process("Diktattext", function(){

var arWorterbuch = null;
var arSatze = null;

var arTxt = null;
var linieInkrement = null;
	
function textTransformieren( txt ){
	arWorterbuch = [];
	arSatze = [];
	linieInkrement = 0;
	
	txt = (txt+"").trim();
	
	if ( txt ){
		
		while (txt.indexOf('  ') != -1 ){
			txt = txt.replace('  ', ' ');
		}
		
		arTxt = txt.replace('\r','\n').replace('\n\n','\n').split('\n');
		
		for (var i=0; i<arTxt.length; i++){
			var linie = arTxt[i].trim();
			
			if (!linie) continue;
			
			arSatze.push(linie);
			
			var arLinieWorter = linie.split(' ');
			
			for (var j=0; j<arLinieWorter.length; j++ ){
				if ( arWorterbuch.indexOf( arLinieWorter[ j ] ) == -1 ){
					arWorterbuch.push(arLinieWorter[j]);
				}
			}
		}
		
	}	
}	
	
function process_SatzGenerieren(fld){
	var ar = null;
	var i = null;
	if ( grdKnopfe.field("Typ").getValue() == "Wörter" ){
		ar = arWorterbuch;
		i = Math.floor(Math.random() * (ar.length));
	} else {
		ar = arSatze;
		i = linieInkrement;		
		if ( linieInkrement == arSatze.length ){
			linieInkrement = 0;
		}
	}	
	
	fld.satzZuWorter_de = ar[i];
	//fld.satzZuWorter_pt = ar[i][1];		
}


function process_SatzAktualisieren(){
	var fld = grdSatz.field('Satz');
	process_SatzGenerieren(fld);
	fld.setValue("");
	fld.warning();
	fld.setFocus();
	
	//grdText.field('Übersetzung').setValue(fld.satzZuWorter_pt);
}

function clearString(str){
	return str.toLowerCase().trim().replace('  ', ' ').replace('.','').replace('?','');
}

function satzenWorterVergleichen( fld, valueToCompare ){
	if ( valueToCompare ){
		if ( clearString(valueToCompare+'') == clearString(fld.satzZuWorter_de) ){
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

var grdSatz = new Grid("grdSatz", this);
grdSatz.title = "Hören Sie die Satz und schreiben Sie der Antwort";
grdSatz.fieldAlign = 'V';
grdSatz.onDefineFields.push( function( grd ){

	var fld = grd.addField("Satz","text");
	//fld.label = undefined;
	fld.onAfterChange.push( function( fld ){
		satzenWorterVergleichen( fld, fld.getValue() );
	} );
	fld.onKeyUp.push( function ( fld, charCode, value ){
		if ( charCode == 13 ){
			textToSpeech(fld.satzZuWorter_de, 'de' );
		} else {
			if ( value && value.trim() && (charCode > 64 && charCode < 91) ){
				var result = satzenWorterVergleichen( fld, value );
				//if ( result ){
				//	process_SatzAktualisieren();
				//	textToSpeech( fld.satzZuWorter_de, 'de' );					
				//}
			}	
		}
		
	} );	
	
	var label = new Label("labelSinger");
	label.text = '<img src="./../fw/pic/play-circle-128.png" width=25 height=25/">';
	label.onClick.push( function( lbl ){ 
		var antwort = fld.parent.field('Satz').satzZuWorter_de;
		if ( antwort ){
			textToSpeech(antwort, 'de' );
			lbl.fieldObject.setFocus();
		}	
	} );
	grd.process.addLabel(label);	
	
	label.fieldObject = fld;
	fld.label = label.html();	

} );	


var grdText = new Grid("grdText", this);
grdText.title = "Enfügen Sie die Text...";
grdText.fieldAlign = 'V';
grdText.canMinimize = true;
grdText.onDefineFields.push( function( grd ){

	var fld = grd.addField("Text","text");
	fld.label = undefined;
	fld.height = 8;
	fld.onAfterChange.push(function(fld){
		grdSatz.field('Satz').satzZuWorter_de = null;
		var vl = fld.getValue();
		textTransformieren( vl );	
		process_SatzAktualisieren();
	});

} );	


var grdKnopfe = new Grid("grdKnopfe", this);
grdKnopfe.title = undefined;
grdKnopfe.fieldAlign = 'H';
grdKnopfe.onDefineFields.push( function( grd ){
	
	var fld = grd.addField("Weiter >>","button");
	fld.onClick.push( function( fld ){		
		if ( arWorterbuch.length || arSatze.length ){
			process_SatzAktualisieren();	
			textToSpeech( grdSatz.field('Satz').satzZuWorter_de, 'de' );		
			if ( grdKnopfe.field("Typ").getValue() == "Sätze" ){
				linieInkrement++;		
				linieInkrement = linieInkrement > arSatze.length ? arSatze.length : linieInkrement;		
			}
		}	
	} );
	
	var fld = grd.addField("<< Vorher","button");
	fld.onClick.push( function( fld ){		
		if ( arSatze.length ){
			if ( grdKnopfe.field("Typ").getValue() == "Sätze" ){
				linieInkrement--;
				linieInkrement = linieInkrement < 0 ? 0 : linieInkrement;		
			}
			process_SatzAktualisieren();	
			textToSpeech( grdSatz.field('Satz').satzZuWorter_de, 'de' );		
		}	
	} );

	fld = grd.addField("Antwort","button");
	fld.onClick.push( function( fld ){
		var antwort = grdSatz.field('Satz').satzZuWorter_de;
		if ( antwort ){
			grdSatz.field('Satz').setValue( antwort );
			textToSpeech( antwort, 'de' );
		}	
	} );
	
	fld = grd.addField("Typ","Select");
	fld.options = [ ["Wörter","Wörter"], ["Sätze","Sätze"] ];
	fld.onAfterChange.push( function( fld ){		
		if ( arWorterbuch.length || arSatze.length ){
			process_SatzAktualisieren();	
			textToSpeech( grdSatz.field('Satz').satzZuWorter_de, 'de' );
			if ( grdKnopfe.field("Typ").getValue() == "Sätze" ){
				linieInkrement++;		
			}			
		}
	} );
	
} );	

Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.create.call(this,null);

this.addInteraction( "interacaoUnica", function(){
	grdSatz.write();
	grdKnopfe.write();
	grdText.write();
	grdText.minimize();
	//process_SatzAktualisieren();
	
	Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.write.call(this);
} );



} );