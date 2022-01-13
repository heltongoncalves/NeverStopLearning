function Interaction( name, process, func ){
	this.name = name;
	this.func = func;
	process.addStep( this );
}
Interaction.prototype.name = null;
Interaction.prototype.func = null;
Interaction.prototype.process = null;

Interaction.prototype.run = function(){
	this.func.call( this.process );
}
