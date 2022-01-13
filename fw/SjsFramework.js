function SjsFramework(){}
SjsFramework.inherits = function inherits( thisClass, superClass ){
	for( var propName in superClass.prototype ) { 
		thisClass.prototype[ propName ] = superClass.prototype[ propName ];
	}
}
