Products.English.Exercises.Semester1.Exercise007 = {};
Products.English.Exercises.Semester1.Exercise007.TextDictation = new Process("TextDictation", function(){

var arDictionary = null;
var arPhrase = null;

var arTxt = null;
var lineIncrement = null;
	
function textTransformation( txt ){
	arDictionary = [];
	arPhrase = [];
	lineIncrement = 0;
	
	txt = (txt+"").trim();
	
	if ( txt ){
		
		while (txt.indexOf('  ') != -1 ){
			txt = txt.replace('  ', ' ');
		}
		
		arTxt = txt.replace('\r','\n').replace('\n\n','\n').split('\n');
		
		for (var i=0; i<arTxt.length; i++){
			var linie = arTxt[i].trim();
			
			if (!linie) continue;
			
			arPhrase.push(linie);
			
			var arLineWords = linie.split(' ');
			
			for (var j=0; j<arLineWords.length; j++ ){
				if ( arDictionary.indexOf( arLineWords[ j ] ) == -1 ){
					arDictionary.push(arLineWords[j]);
				}
			}
		}
		
	}	
}	
	
function process_PhraseGenerator(fld){
	var ar = null;
	var i = null;
	if ( grdButtons.field("Type").getValue() == "Words" ){
		ar = arDictionary;
		i = Math.floor(Math.random() * (ar.length));
	} else {
		ar = arPhrase;
		i = lineIncrement;		
		if ( lineIncrement == arPhrase.length ){
			lineIncrement = 0;
		}
	}	
	
	fld.phraseToWords_us = ar[i];
	//fld.satzZuWorter_pt = ar[i][1];		
}


function process_PhraseReload(){
	var fld = grdPhrase.field("Phrase");
	process_PhraseGenerator(fld);
	fld.setValue("");
	fld.warning();
	fld.setFocus();
	
	//grdText.field('Übersetzung').setValue(fld.satzZuWorter_pt);
}

function clearString(str){
	return str.toLowerCase().trim().replace('  ', ' ').replace('.','').replace('?','');
}

function phrasesComparison( fld, valueToCompare ){
	if ( valueToCompare ){
		if ( clearString(valueToCompare+'') == clearString(fld.phraseToWords_us) ){
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

var grdPhrase = new Grid("grdPhrase", this);
grdPhrase.title = "Listen the phrases and write them bellow:";
grdPhrase.fieldAlign = 'V';
grdPhrase.onDefineFields.push( function( grd ){

	var fld = grd.addField("Phrase","text");
	//fld.label = undefined;
	fld.onAfterChange.push( function( fld ){
		phrasesComparison( fld, fld.getValue() );
	} );
	fld.onKeyUp.push( function ( fld, charCode, value ){
		if ( charCode == 13 ){
			textToSpeech(fld.phraseToWords_us, 'en-US' );
		} else {
			if ( value && value.trim() && (charCode > 64 && charCode < 91) ){
				var result = phrasesComparison( fld, value );
				//if ( result ){
				//	process_PhraseReload();
				//	textToSpeech( fld.phraseToWords_us, 'en-US' );					
				//}
			}	
		}
		
	} );	
	
	var label = new Label("labelSinger");
	label.text = '<img src="./../fw/pic/play-circle-128.png" width=25 height=25/">';
	label.onClick.push( function( lbl ){ 
		var antwort = fld.parent.field("Phrase").phraseToWords_us;
		if ( antwort ){
			textToSpeech(antwort, 'en-US' );
			lbl.fieldObject.setFocus();
		}	
	} );
	grd.process.addLabel(label);	
	
	label.fieldObject = fld;
	fld.label = label.html();	

} );	


var grdText = new Grid("grdText", this);
grdText.title = "Paste hier the text...";
grdText.fieldAlign = 'V';
grdText.canMinimize = true;
grdText.onDefineFields.push( function( grd ){

	var fld = grd.addField("Text","text");
	fld.label = undefined;
	fld.height = 8;
	fld.onAfterChange.push(function(fld){
		grdPhrase.field("Phrase").phraseToWords_us = null;
		var vl = fld.getValue();
		textTransformation( vl );	
		process_PhraseReload();
	});

} );	


var grdButtons = new Grid("grdButtons", this);
grdButtons.title = undefined;
grdButtons.fieldAlign = 'H';
grdButtons.onDefineFields.push( function( grd ){
	
	var fld = grd.addField("Next >>","button");
	fld.onClick.push( function( fld ){		
		if ( arDictionary.length || arPhrase.length ){
			process_PhraseReload();	
			textToSpeech( grdPhrase.field("Phrase").phraseToWords_us, 'en-US' );		
			if ( grdButtons.field("Type").getValue() == "Phrases" ){
				lineIncrement++;		
				lineIncrement = lineIncrement > arPhrase.length ? arPhrase.length : lineIncrement;		
			}
		}	
	} );
	
	var fld = grd.addField("<< Prior","button");
	fld.onClick.push( function( fld ){		
		if ( arPhrase.length ){
			if ( grdButtons.field("Type").getValue() == "Phrases" ){
				lineIncrement--;
				lineIncrement = lineIncrement < 0 ? 0 : lineIncrement;		
			}
			process_PhraseReload();	
			textToSpeech( grdPhrase.field("Phrase").phraseToWords_us, 'en-US' );		
		}	
	} );

	fld = grd.addField("Answer","button");
	fld.onClick.push( function( fld ){
		var antwort = grdPhrase.field("Phrase").phraseToWords_us;
		if ( antwort ){
			grdPhrase.field("Phrase").setValue( antwort );
			textToSpeech( antwort, 'en-US' );
		}	
	} );
	
	fld = grd.addField("Type","Select");
	fld.options = [ ["Words","Words"], ["Phrases","Phrases"] ];
	fld.onAfterChange.push( function( fld ){		
		if ( arDictionary.length || arPhrase.length ){
			process_PhraseReload();	
			textToSpeech( grdPhrase.field("Phrase").phraseToWords_us, 'en-US' );
			if ( grdButtons.field("Type").getValue() == "Phrases" ){
				lineIncrement++;		
			}			
		}
	} );
	
} );	

//Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.create.call(this,null);

this.addInteraction( "interacaoUnica", function(){
	grdPhrase.write();
	grdButtons.write();
	grdText.write();
	grdText.minimize();
	
	this.write("<br>");
	
	//process_PhraseReload();
	//Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.write.call(this);
} );



} );