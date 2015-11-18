/**
 * @author sunag / http://www.sunag.com.br/
 */

THREE.NodeJoin = function( x, y, w, z ) {
	
	THREE.NodeGL.call( this, 'fv1' );
	
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
	
};

THREE.NodeJoin.prototype = Object.create( THREE.NodeGL.prototype );
THREE.NodeJoin.prototype.constructor = THREE.NodeJoin;

THREE.NodeJoin.inputs = ['x','y','z','w'];

THREE.NodeJoin.prototype.getNumElements = function() {
	
	var inputs = THREE.NodeJoin.inputs;
	var i = inputs.length;
	
	while (i--) {
		if ( this[ inputs[i] ] !== undefined ) {
			++i;
			break;
		}
	}
	
	return Math.max(i, 2);
	
};

THREE.NodeJoin.prototype.getType = function() {
	
	return this.getFormatByLength( this.getNumElements() );
	
};

THREE.NodeJoin.prototype.generate = function( material, shader, output ) {
	
	var type = this.getType();
	var length = this.getNumElements();
	
	var inputs = THREE.NodeJoin.inputs;
	var outputs = [];
	
	for(var i = 0; i < length; i++) {
	
		var elm = this[inputs[i]];
		
		outputs.push( elm ? elm.build( material, shader, 'fv1' ) : '0.' );
	
	}
	
	var code = this.getFormatConstructor(length) + '(' + outputs.join(',') + ')';
	
	return this.format( code, type, output );

};