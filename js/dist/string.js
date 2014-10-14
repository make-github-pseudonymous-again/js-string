(function(exports, undefined){

	'use strict';


/* js/src/fill.js */


var lfill_t = function(c, n, mul){


	var f = mul(c, n);

	return function(s){
		return (f + s).slice(-n);
	};

};



var rfill_t = function(c, n, mul){


	var f = mul(c, n);

	return function(s){
		return (s + f).slice(0, n);
	};

};

exports.lfill_t = lfill_t;
exports.rfill_t = rfill_t;
/* js/src/lempelziv.js */


/**
 * Simple lempelziv data compression algorithm implementation.
 */

var lempelziv_t = function(Trie, end){

	var lempelziv = {};

	lempelziv.encode = function(input, index, suffix){
		var j = 0;
		var tree = new Trie(), e = tree.empty(), pt = e, tmp;
		var i = 0, len = input.length;

		tree.put('', 0);

		for (; i < len; ++i) {

			for (; i < len; ++i) {
				tmp = pt.get(input, i);
				if (tmp === undefined) break;
				else pt = tmp;
			}

			if (i === len) break;

			pt.set(input, i, ++j);

			index.push(pt.value());
			suffix.push(input[i]);

			pt = e;
		}

		index.push(pt.value());
		suffix.push(end);
	};

	lempelziv.decode = function(index, suffix){
		var table = [[0, 0]], output = '';
		var i = 0, len = index.length, j, c, k, l, w;

		for (; i < len; ++i) {
			j = index[i];
			c = suffix[i];
			k = table[j][0];
			l = table[j][1];
			w = output.length;

			output += output.slice(k, l);

			if (c !== end) {
				table.push([w, w + l - k + 1]);
				output += c;
			}
		}

		return output;

	};

	return lempelziv;
};


exports.lempelziv_t = lempelziv_t;
/* js/src/palindrome.js */


var palindrome = function ( s, i, j ) {

	var m, n, k;

	n = j - i;
	m = Math.floor( n / 2 );

	for ( k = 0 ; k < m ; ++k ) {
		if ( s[i + k] !== s[j - k - 1] ) {
			return false;
		}
	}

	return true;

}

exports.palindrome = palindrome;

/* js/src/strmul.js */


var strmul = function(s, len){
	var a = new Array(len);
	while(len--) a[len] = s;
	return a.join('');
};

exports.strmul = strmul;
/* js/src/trie.js */

/**
 * Simple implementation of a trie.
 * Can only add elements to the structure.
 * The code function must map each symbol to its own natural number.
 *
 * @param {natural} degree cardinality of symbol set
 * @param {natural} code code function
 */

var simpletrie_t = function(degree, code){


	var Node = function(val){
		this.ad = new Array(degree);
		this.val = val;
	};

	Node.prototype.get = function(key, i){
		return this.ad[code(key, i)];
	};

	Node.prototype.set = function(key, i, val){
		return this.ad[code(key, i)] = new Node(val);
	};

	Node.prototype.value = function(){
		return this.val;
	};


	var Trie = function(){
		this.pt = new Node();
	};

	Trie.prototype.empty = function(){
		return this.pt;
	};

	Trie.prototype.put = function(key, val) {

		var i = 0, len = key.length, pt = this.pt, k;

		for (; i < len; ++i) {
			k = code(key, i);
			pt = pt.ad[k] === undefined ? pt.ad[k] = new Node() : pt.ad[k];
		}

		pt.val = val;

		return pt;
	};


	Trie.prototype.get = function(key) {

		var i = 0, len = key.length, pt = this.pt, k;

		for (; i < len; ++i) pt = pt.get(key, i);

		return pt;
	};


	return Trie;

};

exports.simpletrie_t = simpletrie_t;

})(typeof exports === 'undefined' ? this['string'] = {} : exports);
