Products.Deutsch.HilfsmittelFunktionen = {};
Products.Deutsch.HilfsmittelFunktionen.grdGrammatik = {};

Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.create = function( valueForFieldTipps ){
	var grdGram = new Grid("grdGram", this);
	grdGram.title = "Grammatik und Lehrer-Tipps...";
	grdGram.canMinimize = true;
	grdGram.fieldAlign = 'V';

	var fld = grdGram.addField("Leher-Tipps","text");
	fld.label = undefined;
	fld.height = 3;	
	fld.readOnly = true;	
	if ( valueForFieldTipps ){
		fld.value = valueForFieldTipps;
	}

	return grdGram;
}	

Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.write = function(){
	this.write("<br>");
	var grdGram = this.grid("grdGram");	
	grdGram.write();
	this.write('<br>');
	//grdGram.field("Leher-Tipps").success();	
	grdGram.minimize();
	return grdGram;
}




Products.Deutsch.HilfsmittelFunktionen.zahlenZuWorter = function zahlenZuWorter(arg_zahl){	
	if ( arg_zahl == "0" ) return 'null';	
	function kToStr(arg_zahl){
    var zahl = arg_zahl;
    if(zahl.substr(0,1)=='0'){zahl= zahl.substr(1,zahl.length);}
    if(zahl.substr(0,1)=='0'){zahl= zahl.substr(1,zahl.length);}
    if(zahl.substr(0,1)=='0'){zahl= zahl.substr(1,zahl.length);}
    var final = "";
    function sonderzahlen(sonder){
      sonder = parseInt(sonder);
      if(sonder == 10)return "zehn";
      if(sonder == 11)return "elf";
      if(sonder == 12)return "zwölf";
      if(sonder == 13)return "dreizehn";
      if(sonder == 14)return "vierzehn";
      if(sonder == 15)return "fünfzehn";
      if(sonder == 16)return "sechszehn";
      if(sonder == 17)return "siebzehn";
      if(sonder == 18)return "achtzehn";
      if(sonder == 19)return "neunzehn";
      return false;}
    var einzeln = Array("null","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun");
    var zehner = Array("null","zehn","zwanzig","dreißig","vierzig","fünfzig","sechzig","siebzig","achtzig","neunzig");
    if(zahl.length == 3){
      if(zahl=="000")return '';
      if(zahl.substr(0,1)=='1'){
        final += "einhundert";
      }else{
        final += einzeln[zahl.substr(0,1)] + "hundert";}
      if(zahl.substr(1,2)!="00"){
        if(zahl.substr(1,1)!='0'){
          if(((parseInt(zahl.substr(1,2)) > 19) || (parseInt(zahl.substr(1,2)) < 11)) && zahl.substr(2,1) != '0'){
            einzeln[1] = "ein";
            final += einzeln[parseInt(zahl.substr(2,1))] + "und" + zehner[parseInt(zahl.substr(1,1))];
          }else if((parseInt(zahl.substr(1,2)) < 20) && (parseInt(zahl.substr(1,2)) > 10)){
            final += sonderzahlen(zahl.substr(1,2));
          }else if(zahl.substr(2,1)=='0'){
          final += zehner[parseInt(zahl.substr(1,1))];
          }else{
            final += einzeln[parseInt(zahl.substr(2,1))];}
        }else{
          final += einzeln[parseInt(zahl.substr(2,1))];}}
    }else if(zahl.length==2){
      if(zahl=="00")return '';
      if(zahl.substr(0,1)!='0'){
        if(((parseInt(zahl.substr(0,2)) > 19) || (parseInt(zahl.substr(0,2)) < 11)) && zahl.substr(1,1) != '0'){
          einzeln[1] = "ein";
          final += einzeln[parseInt(zahl.substr(1,1))] + "und" + zehner[parseInt(zahl.substr(0,1))];
        }else if((parseInt(zahl.substr(0,2)) < 20) && (parseInt(zahl.substr(0,2)) > 10)){
          final += sonderzahlen(zahl.substr(0,2));
        }else if(zahl.substr(1,1)=='0'){
        final += zehner[parseInt(zahl.substr(0,1))];
        }else{
          final += einzeln[parseInt(zahl.substr(1,1))];}
      }else{
        final += einzeln[zahl];}
    }else if(zahl.length==1){
      if(zahl=='0')return '';
      final += einzeln[parseInt(zahl.substr(0,1))];}
    return final;}

	var ff = "";
  if(arg_zahl.length<4){
	  return kToStr(arg_zahl);
	}else if(arg_zahl.length<7){
		var f1 = kToStr(arg_zahl.substr(0,arg_zahl.length-3));
		var f2 = kToStr(arg_zahl.substr(arg_zahl.length-3,3));
		return f1 + "tausend" + f2;
	}else if(arg_zahl.length<10){
		var f1 = kToStr(arg_zahl.substr(0,arg_zahl.length-6));
		var f2 = kToStr(arg_zahl.substr(arg_zahl.length-6,3));
		var f3 = kToStr(arg_zahl.substr(arg_zahl.length-3,3));
		if(f1=='eins'){ff+="einemillion";}else{ff+=f1+"millionen";}
		if(f2=='eins'){ff+="eintausend";}else if(f2!=""){ff+=f2+"tausend";}
		ff+=f3;
		return ff;
	}else if(arg_zahl.length<13){
		var f1 = kToStr(arg_zahl.substr(0,arg_zahl.length-9));
		var f2 = kToStr(arg_zahl.substr(arg_zahl.length-9,3));
		var f3 = kToStr(arg_zahl.substr(arg_zahl.length-6,3));
		var f4 = kToStr(arg_zahl.substr(arg_zahl.length-3,3));
		if(f1=='eins'){ff+="einemilliarde";}else{ff+=f1+"milliarden";}
		if(f2=='eins'){ff+="einemillion";}else if(f2!=""){ff+=f2+"millionen";}
		if(f3=='eins'){ff+="eintausend";}else if(f3!=""){ff+=f3+"tausend";}
		ff+=f4;
		return ff;}
}


Products.Deutsch.HilfsmittelFunktionen.zeitZuWorter = function zeitZuWorter(hrs, min, showOptionalerTeil ){

		var out = "Es ist ";
		
		var numbers = [
		  "eins", "zwei", "drei", "vier", "fünf", "sechs",      
		  "sieben", "acht", "neun", "zehn", "elf", "zwölf",      
		  "dreizehn", "vierzehn", "Viertel", "sechzehn",     // N.B: Viertel statt 15
		  "siebzehn", "achtzehn", "neunzehn", "zwanzig"                     
		];                                                      
		var inc = 0;       // stundeninkrement bei "vor/halb"-ausdrücken
		var am = true     // am/pm

	// fallselektion minuten 
	if (min == 0) out += "Punkt ";
	else if (min <= 20) out += numbers[min-1] + " nach ";
	else if (min > 20 && min < 30) {
	   out += numbers[29-min] + " vor halb ";
	   inc++;
	} else if (min == 30) {
	   out += "halb ";
	   inc++;
	}
	else if (min > 30 && min < 40) {
	   out += numbers[min-31] + " nach halb ";
	   inc++;
	}
	else if (min >= 40 && min <= 59) {
	   out += numbers[59-min] + " vor ";
	   inc++;
	}

	/* kompliziertere ausgabe */
	// numbers anpassen
	numbers[0] = "ein";          // nicht "einS" uhr
	numbers.unshift("zwölf");    // für 23:21-01:20 uhr

	// stundenausgabe
	if (hrs > 12) {
	   hrs -= 12;
	   am = false;
	}

	out += numbers[hrs+inc];

	if ( showOptionalerTeil ){
		/* optionaler teil */

		out += " Uhr";

		if (am && hrs < 6) out += " morgens";
		if (!am && hrs >= 6) out += " abends";
		if (hrs == 0 && min == 0) out = "Es ist Mitternacht";
		if (hrs == 12 && min == 0) out = "Es ist Mittag";		
	}	
	
	//out += ".";

	return out;
}




/* --------------------------------------------------------------------------- */
/* ---------------------   Deutsch Verben   ---------------------------------- */
/* --------------------------------------------------------------------------- */


Products.Deutsch.deutschVerben = {};

Products.Deutsch.deutschVerben.Sein = {
	Indikativ: {
		Prasens: { Singular: ['bin', 'bist', 'ist', 'ist', 'ist' ], Plural: ['sind', 'seid', 'sind', 'sind'] }
	}
};

Products.Deutsch.deutschVerben.Heißen = {
	Indikativ: {
		Prasens: { Singular : ['heiße', 'heißt', 'heißt', 'heißt', 'heißt' ], Plural: ['heißen', 'heißt', 'heißen', 'heißen'] }	
	}
};

Products.Deutsch.deutschVerben.Kommen = {
	Indikativ: {
		Prasens: { Singular : ['komme', 'kommst', 'kommt', 'kommt', 'kommt' ], Plural: ['kommen', 'kommt', 'kommen', 'kommen'] }	
	}
};

Products.Deutsch.deutschVerben.Wohnen = {
	Indikativ: {
		Prasens: { Singular : ['wohne', 'wohnst', 'wohnt', 'wohnt', 'wohnt' ], Plural: ['wohnen', 'wohnt', 'wohnen', 'wohnen'] }	
	}
};

Products.Deutsch.deutschVerben.Arbeiten = {
	Indikativ: {
		Prasens: { Singular : ['arbeite', 'arbeitest', 'arbeitet', 'arbeitet', 'arbeitet' ], Plural: ['arbeiten', 'arbeitet', 'arbeiten', 'arbeiten'] }	
	}
};

Products.Deutsch.deutschVerben.Leben = {
	Indikativ: {
		Prasens: { Singular : ['lebe', 'lebst', 'lebt', 'lebt', 'lebt' ], Plural: ['leben', 'lebt', 'leben', 'leben'] }	
	}
};

Products.Deutsch.deutschVerben.Haben = {
	Indikativ: {
		Prasens: { Singular : ['habe', 'hast', 'hat', 'hat', 'hat' ], Plural: ['haben', 'habt', 'haben', 'haben'] }	
	}
};