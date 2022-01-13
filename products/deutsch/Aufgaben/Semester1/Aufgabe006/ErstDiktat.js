Products.Deutsch.Aufgaben.Semester1.Aufgabe006 = {};
Products.Deutsch.Aufgaben.Semester1.Aufgabe006.ErstDiktat = new Process("ErstDiktat", function(){

var strWorterbuch = "Deustch|Alemão;Sonnetag|Domingo;Montag|Segunda-feira;Dientag|Terça-feira;Mittwoch|Quarta-feira;Donnerstag|Quinta-feira;Freitag|Sexta-feira;Samtag|Sábado;Deutschstunde eins|Lição um;Guten Morgen|Bom dia;Guten Tag|Bom dia;Gute Nacht|Boa noite;Gute Abend|Boa noite;die|a;von|de;und|e;zu|para;in|em;war|foi;dass|que;seine|sua;er|ele;es|ele;mit|com;als|como;durch|por;für|para;ist|é;hatte|teve;aber|mas;die|que;auf|em;sein|ser;bei|em;nicht|não;sie|eles;aus|(a partir) de;waren|foram;ihre|seu;dies|este;oder|ou;haben|ter;Sie|você;ihr|sua;wer|que;alle|todos;ihm|ele;ein|um;so|assim;sind|são;eine|um;sie|ela;meine|meu;sie|eles;wir|nós;gewesen|sido;kein|não;mir|me;wenn|se;sagte|dito;dort|lá;wenn|quando;würde|seria;mehr|mais;Wille|vontade;einige|alguns;was|o que;in|em;hat|tem;könnte|poderia;als|que;aus|fora;dann|então;oben|para cima;seine|sua;Mann|homem;Zeit|tempo;jetzt|agora;zwei|dois;auf|sobre;diese|estes;nach|depois;Genau|exatamente;können|pode;nur|apenas;andere|outro;sehen|ver;so|tal;tun|fazer;groß|grande;sehr|muito;jeder|qualquer;Ihre|sua;über|sobre;gemacht|feito;unsere|nosso;gut|bem;erste|primeiro;am meisten|a maioria;wie|como;vor|antes;wenig|pouco;selbst|se;über|sobre;ohne|sem;eigene|próprio;diejenigen|aqueles;gut|bom;könnte|poder;Männer|homens;können|Poder;sollte|deveria;tat|fez;wo|onde;kommen|vir;Menschen|pessoas;Muss|obrigação;uns|nos;Tag|dia;lange|longo;viel|muito;nach unten|para baixo;gleich|mesmo;mr|mr;nie|nunca;sogar|mesmo;alt|velho;unter|embaixo;durch|através;immer noch|ainda;während|enquanto;viele|muitos;wissen|saber;jeder|cada;Leben|vida;drei|três;wie|como;Weg|maneira;Jahr|anos;kam|veio;König|rei;gehen|ir;Sein|ser;wieder|novamente;hier|aqui;machen|fazer;zurück|de volta;neu|novo;gegen|contra;gefunden|encontrado;noch|ainda;sagen|dizer;zu|também;letzte|passado;obwohl|embora;Kopf|cabeça;weg|longe;rechts|direito;Hand|mão;Ort|lugar;Gott|deus;ein anderer|outro;soll|deve;Land|país;Teil|parte;weit|longe;links|esquerda;Blick|olhos;bald|em breve;ging|foi;nehmen|tomar;jeder|cada;nur|somente;Macht|poder;Name|nome;bin|sou;Tod|morte;Welt|mundo;noch|nem;Sinn|mente;einmal|uma vez;ab|fora;unter|entre;dachte|pensamento;wem|quem;Haus|casa;bekommen|obter;nichts|nada;zwischen|entre;Hundert|cem;denken|pensar;beide|tanto;jung|jovem;da|porque;sah|serra;je|sempre;lassen|deixar;selbst|se;Kaiser|imperador;Fall|caso;arbeiten|trabalhar;deren|cuja;Krieg|guerra;nahm|levou;allgemein|geral;Stadt|cidade;Zustand|estado;Seite|lado;Sachen|coisas;immer|sempre;Tag|dia;so|assim;Gesicht|face;Nacht|noite;weniger|menos;geben|dar;gefragt|perguntou;Körper|corpo;auch|também;schien|parecia;vier|quatro;nicht|não;Sohn|filho;ganze|inteiro;namens|chamado;nicht|não;jedoch|contudo;lieben|amar;setzen|colocar;Tausend|mil;Hände|mãos;gesehen|visto;erzählen|dizer;fast|quase;schauen|olhar;Vater|pai;Herz|coração;wenige|poucos;bekam|tem;fünf|cinco;Natur|natureza;finden|encontrar;Öffentlichkeit|público;gehen|vai;Natürlich|Naturalmente, claro;vielleicht|talvez;Frau|mulher;seit|desde;mit|ter;Waffen|Arma;gehört|ouvido;sah|olhou;Alter|idade;gab|deu;warum|por que;Worte|palavras;Licht|luz;besser|melhor;Ende|final;Wasser|água;zwanzig|vinte;bis|até;andere|outros";
var arWorterbuch = strWorterbuch.split(';');
for (var i=0; i<arWorterbuch.length; i++){
	arWorterbuch[i] = arWorterbuch[i].split('|');
}

var strSatze=[
	"Können Sie mir Helfen?|Você poderia me ajudar?",
	"Entschuldigung|Com licença ou desculpe-me.",
	"Wie geht's?|Como você está? (m.i.c) ",
	"Wie geht es dir?|Como você está? (m.i.)",
	"Wie geht es Ihnen?|Como você está? (m.f.)",
	"Wie ist Ihr Namen?|Como é seu nome? (m.f.)",
	"Wie ist dein Namen?|Como é seu nome? (m.i.)",
	"Wie ist Ihr Vorname?|Como é seu primeiro nome? (m.f.)",
	"Wie ist Ihr Nachname?|Como é seu último nome? (m.f.)",
	"Wie ist dein Vorname?|Como é seu primeiro nome? (m.i.)",
	"Wie ist dein Nachname?|Como é seu último nome? (m.i.)",
	"Welcher Tag ist heute?|Qual dia é hoje?",
	"Ihr habt keine Lust|Você não tem vontade. (m.f.)",
	"Ich habe keine Lust|Eu não tenho vontade.",
	"Ich liebe dich|Eu amo você. ",
	"Ich liebe dich nicth mehr|Eu não te amo mais.  ",
	"Wie viel kostet das?|Quanto custa isso?",
	"Bitten, zeigen Sie mir die Speisekarte|Por favor, mostre-me o cardápio. (m.f.)",
	"Entschuldigung, zeigen Sie mir die Speisekarte|Com licença, mostre-me o cardápio. (m.f.)",
	"Entschuldigung, können Sie mir die Speisekarte zeigen.|Com licença, você poderia me mostrar o cardápio? (m.f.)",
	"Sie hat verschiedene Katzen.|Ela tem diferentes gatos.",
	"Er benutzt die öffenen Türen.|Ele utiliza as portas abertas.",
	"Er kennt den starken Gegner.|Ele conhece o forte oponente.",
	"Ich habe die höhere Zahl.|Eu tenho o número mais alto.",
	"Ich kenne ihn schon lange.|Eu o conheço há muito tempo.",
	"Wir sollten eine komplette Untersuchung machen.|Nós devemos fazer um exame completo.",
	"Wie spät ist es?|Que horas são?",
	"Ich habe die höhere Nummer.|Eu tenho o número mais alto.",
	"Er hat seine eigene Treppe.|Ele tem sua própria escada.",
	"Berufe aus vergangenen Zeiten.|Profissões de tempos passados.",
	"Sie nimmt das zweite Glas.|Ela pega o segundo copo.",
	"Das hohe Haus gehört zu mir.|A casa alta me pertence.",
	"Er kennt wichtige Leute.|Ele conhece pessoas importantes.",
	"Sie hat ihren eigenen Raum.|Ela tem sua própria sala.",
	"Hast du deine eigenen Verbindungen?|Você tem suas próprias conexões? (m.i.)",
	"Sie isst die gleiche Suppe wie ich.|Ela toma a mesma sopa que eu.",
	"Sie isst das gleiche Reis wie ich.|Ela come o mesmo arroz que eu.",
	"Ihr trinkt die gleiche Apfelsaft wie er.|Vocês tomam o mesmo suco de maçã que ele.",
	"Sie akzeptiert die kostenlose Schocolade.|Ela aceita o chocolate grátis.",
	"Er trifft einen ehemaligen Freund.|Ele conhece um ex-amigo.",
	"Die Balkone haben die gleiche Größe.|As varandas tem o mesmo tamanho.",
	"Ein bus ist kein Auto.|Um ônibus não é um carro.",
	"Sie ist schnell.|Ela é rápida.",
	"Er braucht den Rasirer.|Ele precisa de um barbeador.",
	"Ich sehe Zahlen.|Ei vejo números.",
	"Die Frauen essen die Tomaten.|As mulheres comem os tomates.",
	"Mag jemand Großbritannien?|Alguém gosta da Grã-Bretanha?",
	"Die Strecke ist kurz.|O trajeto é curto.",
	"Die Katze trinkt eure Milch.|O gato bebe o leite de vocês.",
	"Die Zahl ist hoch.|O número é alto.",
	"Ist das deine Bus?|É seu ônibus?",
	"Wo sind die Rasierer?|Onde está o barbeador?",
	"Großbritannien ist alt.|Grã-Bretanha é velha."];

var arSatze = [];	
for (var i=0; i<strSatze.length; i++){
	arSatze[i] = strSatze[i].split('|');
}	
	
	
function process_SatzGenerieren(fld){
	var ar = null;
	if ( grdKnopfe.field("Typ").getValue() == "Wörter" ){
		ar = arWorterbuch;
	} else {
		ar = arSatze;
	}	
	var i = Math.floor(Math.random() * (ar.length-1));
	fld.satzZuWorter_de = ar[i][0];
	fld.satzZuWorter_pt = ar[i][1];		
}


function process_SatzAktualisieren(){
	var fld = grdSatz.field('Satz');
	process_SatzGenerieren(fld);
	fld.setValue("");
	fld.warning();
	fld.setFocus();
	
	grdUbersetzung.field('Übersetzung').setValue(fld.satzZuWorter_pt);
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
		} /*else {
			if ( value && value.trim() && (charCode > 64 && charCode < 91) ){
				var result = satzenWorterVergleichen( fld, value );
				if ( result ){
					process_SatzAktualisieren();
					textToSpeech( fld.satzZuWorter_de, 'de' );					
				}
			}	
		}*/
	} );	
	
	var label = new Label("label" + i);
	label.text = '<img src="./../fw/pic/play-circle-128.png" width=20 height=20/">';
	label.onClick.push( function( lbl ){ 
		textToSpeech(fld.parent.field('Satz').satzZuWorter_de, 'de' );
		lbl.fieldObject.setFocus();
	} );
	grd.process.addLabel(label);	
	
	label.fieldObject = fld;
	fld.label = label.html();	

} );	


var grdUbersetzung = new Grid("grdUbersetzung", this);
grdUbersetzung.title = "Übersetzung...";
grdUbersetzung.fieldAlign = 'V';
grdUbersetzung.canMinimize = true;
grdUbersetzung.onDefineFields.push( function( grd ){

	var fld = grd.addField("Übersetzung","text");
	fld.label = undefined;
	fld.readOnly = true;

} );	


var grdKnopfe = new Grid("grdKnopfe", this);
grdKnopfe.title = undefined;
grdKnopfe.fieldAlign = 'H';
grdKnopfe.onDefineFields.push( function( grd ){
	
	var fld = grd.addField("Weiter","button");
	fld.onClick.push( function( fld ){
		process_SatzAktualisieren();	
		textToSpeech( grdSatz.field('Satz').satzZuWorter_de, 'de' );
	} );
	
	fld = grd.addField("Antwort","button");
	fld.onClick.push( function( fld ){
		var antwort = grdSatz.field('Satz').satzZuWorter_de;
		grdSatz.field('Satz').setValue( antwort );
		textToSpeech( antwort, 'de' );
	} );
	
	fld = grd.addField("Typ","Select");
	fld.options = [ ["Wörter","Wörter"], ["Sätze","Sätze"] ];
	fld.onAfterChange.push( function( fld ){
		process_SatzAktualisieren();	
		textToSpeech( grdSatz.field('Satz').satzZuWorter_de, 'de' );
	} );
	
} );	

Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.create.call(this,null);

this.addInteraction( "interacaoUnica", function(){
	grdSatz.write();
	grdKnopfe.write();
	grdUbersetzung.write();
	grdUbersetzung.minimize();
	process_SatzAktualisieren();
	
	Products.Deutsch.HilfsmittelFunktionen.grdGrammatik.write.call(this);
} );



} );