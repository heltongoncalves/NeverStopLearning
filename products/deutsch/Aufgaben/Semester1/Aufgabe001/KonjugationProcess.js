Products.Deutsch.Aufgaben.Semester1.Aufgabe001 = {};
Products.Deutsch.Aufgaben.Semester1.Aufgabe001.KonjugationProcess = new Process("KonjugationProcess", function(){


function konjugation_clearFields( fld, oldValue, newValue ){
	fld.parent.process.grid("grdKonjugationSingular").clearFieldValues().clearFieldFeedbacks().field("ich").setFocus();
	fld.parent.process.grid("grdKonjugationPlural").clearFieldValues().clearFieldFeedbacks();	
}

var grdVar = new Grid("grdVariables", this);
grdVar.title = "Wählen Sie eine Verb";
grdVar.fieldAlign = 'h';

grdVar.onDefineFields.push( function ( grd ){

	var fld = grd.addField("Verben","Select");
	fld.label = undefined;
	fld.options = [ ["Sein","Sein"], 
					["Heißen","Heißen"], 
					["Kommen","Kommen"],
					["Wohnen","Wohnen"],
					["Leben","Leben"],					
					["Arbeiten","Arbeiten"],
					["Haben","Haben"] ];
	fld.onAfterChange.push( konjugation_clearFields );

	fld = grd.addField("Modus","Select");
	fld.label = undefined;
	fld.options = [ ["Indikativ-Prasens","Indikativ-Präsens"] ];
	fld.onAfterChange.push( konjugation_clearFields );

	/*fld = grd.addField("Tempus","Select");
	fld.label = undefined;
	fld.options = [ ["Prasens","Präsens"] ];
	fld.onAfterChange.push( konjugation_clearFields );*/

	fld = grd.addField("Antworten","button")
	fld.label = undefined;
	fld.onClick.push( function ( fld ){
		konjugation_clearFields( fld );
		
		var process = fld.parent.process;
		var grdS = fld.parent.process.grid("grdKonjugationSingular");
		var grdP = fld.parent.process.grid("grdKonjugationPlural");
		
		var grdVar = fld.parent.process.grid("grdVariables");
		var verbName = grdVar.field("Verben").value;
		var modusName = grdVar.field("Modus").value.split('-')[0];
		var tempusName = grdVar.field("Modus").value.split('-')[1];

		var konjugation = Products.Deutsch.deutschVerben[verbName][modusName][tempusName];
		var singular = konjugation.Singular;
		var plural = konjugation.Plural;
		
		grdS.field("ich").setValue(singular[0]);
		grdS.field("du").setValue( singular[1] );
		grdS.field("er").setValue( singular[2] );
		grdS.field("sie").setValue( singular[3] );
		grdS.field("es").setValue( singular[4] );
		
		grdP.field("wir").setValue( plural[0] );
		grdP.field("ihr").setValue( plural[1] );
		grdP.field("sie").setValue( plural[2] );
		grdP.field("Sie").setValue( plural[3] );	
		
	} );
	
} );


var grdKonS = new Grid("grdKonjugationSingular", this);
grdKonS.title = "Singular";
grdKonS.fieldAlign = 'h';
grdKonS.addField("ich","text");
grdKonS.addField("du","text");
grdKonS.addField("er","text");
grdKonS.addField("sie","text");
grdKonS.addField("es","text");

function showFieldResult( fd, expectedValue){
	if ( (fd.value+'').toLowerCase() == expectedValue ){ 
		fd.success(); 
	} else { 
		fd.danger(); 
	}
}

var grdKonP = new Grid("grdKonjugationPlural", this);
grdKonP.title = "Plural";
grdKonP.fieldAlign = 'h';
grdKonP.addField("wir","text");
grdKonP.addField("ihr","text");
grdKonP.addField("sie","text");
grdKonP.addField("Sie","text");

var grdAction = new Grid("grdAction", this);
grdAction.title = undefined;
grdAction.fieldAlign = 'h';

fld = grdAction.addField("Scheck Antworten","button");
fld.label = undefined;
fld.onClick.push( function ( fld ){
	
	var process = fld.parent.process;
	var grdS = fld.parent.process.grid("grdKonjugationSingular");
	var grdP = fld.parent.process.grid("grdKonjugationPlural");
	
	var grdVar = fld.parent.process.grid("grdVariables");
	var verbName = grdVar.field("Verben").value;
	var modusName = grdVar.field("Modus").value.split('-')[0];
	var tempusName = grdVar.field("Modus").value.split('-')[1];
	
	var konjugation = Products.Deutsch.deutschVerben[verbName][modusName][tempusName];
	var singular = konjugation.Singular;
	var plural = konjugation.Plural;
	
	showFieldResult( grdS.field("ich"), singular[0] );
	showFieldResult( grdS.field("du"), singular[1] );
	showFieldResult( grdS.field("er"), singular[2] );
	showFieldResult( grdS.field("sie"), singular[3] );
	showFieldResult( grdS.field("es"), singular[4] );
	
	showFieldResult( grdP.field("wir"), plural[0] );
	showFieldResult( grdP.field("ihr"), plural[1] );
	showFieldResult( grdP.field("sie"), plural[2] );
	showFieldResult( grdP.field("Sie"), plural[3] );	
} );

fld = grdAction.addField("Weiter Verb","button");
fld.label = undefined;
fld.onClick.push( function ( fld ){
	var fldVerben = fld.parent.process.grid("grdVariables").field("Verben");
	var index = fldVerben.getIndexOfValue();
	if (index == ( fldVerben.options.length - 1 ) ){
		fldVerben.setValue( fldVerben.options[0][0] );		
	} else {
		fldVerben.setValue( fldVerben.options[index+1][0] );
	}	
	konjugation_clearFields( fld );
} );

Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.create.call(this,null);

this.addInteraction( "interacaoUnica", function(){
	grdVar.write();
	grdKonS.write();	
	grdKonP.write();	
	grdAction.write();	
	
	Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.write.call(this);

} );



} );