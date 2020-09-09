import test from 'ava';
import * as string from '../../src';
test('string', function(assert){
	var c = '7';
	var n = 10;
	var mul = string.mul;

	var lfill = string.__lfill__(c, n, mul);
	var rfill = string.__rfill__(c, n, mul);

	t.deepEqual(lfill('jjj'), '7777777jjj', 'lfill');
	t.deepEqual(rfill('jjj'), 'jjj7777777', 'rfill');
});