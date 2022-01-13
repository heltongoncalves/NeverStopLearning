function Activity( name, process, func ){
	this.name = name;
	this.func = func;
	process.addStep( this );
}


