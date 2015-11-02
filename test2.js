var utils = require('./utils');

function createHoge(cb) {
	cb(utils.createBig());
}

function createFuga(cb) {
	cb(utils.createBig());
}

function execPiyo(hoge, fuga, cb) {
	cb();
}

function foo() {
	createHoge((hoge) => {
		createFuga((fuga) => {
			execPiyo(hoge, fuga, (cb) => {
				utils.memoryReport();
				hoge = null;
				fuga = null;
				foo();
			});
		});
	});
}

utils.memoryReport();
foo();

/*

test1と同じ

*/
