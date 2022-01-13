Products.Deutsch.Aufgaben.Semester1.Aufgabe005 = {};
Products.Deutsch.Aufgaben.Semester1.Aufgabe005.WieSpatIstEs = new Process("WieSpatIstEs", function(){

function showClock( hour, min ){
	var $hands = $('#liveclock div.hand')
	window.requestAnimationFrame = window.requestAnimationFrame
								   || window.mozRequestAnimationFrame
								   || window.webkitRequestAnimationFrame
								   || window.msRequestAnimationFrame
								   || function(f){setTimeout(f, 60)}
	function updateclock(){
	
		var curdate = new Date();
		curdate.setHours(hour,min,5,0);
		
		$hands.filter('.inner_face').css({content: '23:30' })
		
		var hour_as_degree = ( curdate.getHours() + curdate.getMinutes()/60 ) / 12 * 360
		var minute_as_degree = curdate.getMinutes() / 60 * 360
		var second_as_degree = ( curdate.getSeconds() + curdate.getMilliseconds()/1000 ) /60 * 360
		
		$hands.filter('.hour').css({transform: 'rotate(' + hour_as_degree + 'deg)' })
		$hands.filter('.minute').css({transform: 'rotate(' + minute_as_degree + 'deg)' })
		$hands.filter('.second').css({transform: 'rotate(' + second_as_degree + 'deg)' })
		//requestAnimationFrame(updateclock)
	}
	requestAnimationFrame(updateclock);

}
	
function process_SatzGenerieren( fld ){
	var hrs = Math.floor(Math.random() * 24);
	var min = Math.floor(Math.random() * 60);
	
	fld.satzZuWorter = Products.Deutsch.HilfsmittelFunktionen.zeitZuWorter( hrs, min );
	fld.satzZuWorter_hrs = hrs;
	fld.satzZuWorter_min = min;
	
	hrs = hrs+'';
	min = min+'';
	
	fld.setLabel((hrs.length==1?'0'+hrs:hrs) + ":" + (min.length==1?'0'+min:min));
	
	showClock(fld.satzZuWorter_hrs, fld.satzZuWorter_min);
}


function process_SatzAktualisieren(){
	var fld = grdSatz.field('Satz');
	process_SatzGenerieren( fld );
	fld.setValue("Es ist");
	fld.warning();
	fld.setFocus();
}

function satzenWorterVergleichen( fld, valueToCompare ){
	if ( valueToCompare ){
		if ( (valueToCompare+'').toLowerCase().trim().replace('  ', ' ') == fld.satzZuWorter.toLowerCase().trim().replace('  ', ' ') ){
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
grdSatz.title = "Wie spät ist es?";
grdSatz.fieldAlign = 'V';
grdSatz.onDefineFields.push( function( grd ){

	var fld = grd.addField("Satz","text");
	fld.label = "";
	fld.onAfterChange.push( function ( fld ){
		satzenWorterVergleichen( fld, fld.getValue() ); 
	} );
	fld.onKeyUp.push( function ( fld, charCode, value ){
		if ( value && value.trim() && (charCode > 64 && charCode < 91) ){
			var result = satzenWorterVergleichen( fld, value );
			if ( result ){				
				textToSpeech( fld.satzZuWorter, 'de' );					
			}
		}	
	} );	
} );	

var grdButtons = new Grid("grdButtons", this);
grdButtons.title = undefined;
grdButtons.fieldAlign = 'H';
grdButtons.onDefineFields.push( function( grd ){	
	var fld = grd.addField("Weiter","button");
	fld.label = undefined;
	fld.onClick.push( function( fld ){
		process_SatzAktualisieren();
	} );
	
	fld = grd.addField("Antworte","button");
	fld.label = undefined;
	fld.onClick.push( function( fld ){		
		var text = grdSatz.field('Satz').satzZuWorter;
		grdSatz.field('Satz').setValue( text );
		textToSpeech( text, 'de' );
	} );
} );	

function zeitZuWorterSpatEsIst(fld){
	var stunden = grdZeit.field('Stunden').getValue();
	var minuten = grdZeit.field('Minuten').getValue();
	
	if ( stunden && minuten ){
	
		stunden = parseInt(stunden);
		minuten = parseInt(minuten);
	
		if ( stunden !== undefined && minuten !== undefined ){	
			grdZeit.field("Antworte").setValue(Products.Deutsch.HilfsmittelFunktionen.zeitZuWorter( stunden, minuten ));
		} 

	}		
};		

var grdZeit = new Grid("grdZeit", this);
grdZeit.title = "Oder sagen Sie wie es ist spät!";
grdZeit.fieldAlign = 'H';
grdZeit.onDefineFields.push( function( grd ){

	var fld = grd.addField("Stunden","text");
	fld.onAfterChange.push( function( fld ){
		zeitZuWorterSpatEsIst(fld);		
	} );
	
	fld = grd.addField("Minuten","text");
	fld.onAfterChange.push( function( fld ){
		zeitZuWorterSpatEsIst(fld);		
	} );
	
	fld = grd.addField("Antworte","text");
	fld.readOnly = true;
	
} );	

var grdGram = Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.create.call(this,
		"Das sind korrekte Beispiele: " + '\r\n' +
		"00:55 -> Es ist fünf vor ein" + "\r\n" +
		"02:45 -> Es ist Viertel vor drei" + "\r\n" +
		"02:59 -> Es ist eins vor drei" + "\r\n" +
		"07:11 -> Es ist elf nach sieben" + "\r\n" +
		"07:47 -> Es ist dreizehn vor acht" + "\r\n" +
		"07:54 -> Es ist sechs vor acht" + "\r\n" +
		"08:05 -> Es ist fünf nach acht" + "\r\n" +
		"08:20 -> Es ist zwanzig nach acht" + "\r\n" +
		"11:08 -> Es ist acht nach elf" + "\r\n" +
		"13:35 -> Es ist fünf nach halb zwei" + "\r\n" +
		"14:13 -> Es ist dreizehn nach zwei" + "\r\n" +
		"14:44 -> Es ist sechzehn vor drei" + "\r\n" +
		"15:30 -> Es ist halb vier" + "\r\n" +
		"16:21 -> Es ist neun vor halb fünf" + "\r\n" +
		"18:22 -> Es ist acht vor halb sieben" + "\r\n" +
		"20:53 -> Es ist sieben vor neun" + "\r\n" +
		"22:13 -> Es ist dreizehn nach zehn"	
);
grdGram.canMinimize = false;
grdGram.field("Leher-Tipps").height = 8;

this.addInteraction( "interacaoUnica", function(){
	var divs = 	
			'<div>' +
				'<div id="liveclock" class="outer_face">'+
				'	<div class="marker oneseven"></div>'+
				'	<div class="marker twoeight"></div>'+
				'	<div class="marker fourten"></div>'+
				'	<div class="marker fiveeleven"></div>'+
				'	<div class="inner_face">'+
				'		<div class="hand hour"></div>'+
				'		<div class="hand minute"></div>'+
				'		<div class="hand second"></div>'+
				'	</div>'+
				'</div>'+
			'</div><br>';
	
	this.write( divs );
	
	grdSatz.write();
	grdButtons.write();
	process_SatzAktualisieren();
	
	grdZeit.write();
	
	Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.write.call(this);	
	
	var fld = grdSatz.field('Satz')	
	showClock(fld.satzZuWorter_hrs, fld.satzZuWorter_min);
	
	fld.setFocus();
	fld.setValue('Es ist');	
} );



} );