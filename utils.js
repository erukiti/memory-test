var sprintf = require('sprintf');

// var utils = (function() {
// 	var _priv = 1;

// 	utils.hoge = () => {
// 		return _priv;
// 	}
// })

var utils = (() => {
	function utils() {}

	var _snapshot = undefined;
	var _Big = 'hoge'.repeat(1000).repeat(1000).repeat(10);

	utils.fmtKMGT = (n) => {
		var arr = [];
		while (n > 0) {
			if (n >= 1000) {
				arr.push(sprintf('%03d', n % 1000));
			} else {
				arr.push(n % 1000);
			}

			n = Math.floor(n / 1000);

		}
		return arr.reverse().join(',');
	};

	utils.memoryReport = () => {
		var usage = process.memoryUsage()
		var arr = []
		for (k in usage) {
			var v = usage[k];

			if (_snapshot && _snapshot[k] && _snapshot[k] < v) {
				arr.push(sprintf("%s: %s (+%s)", k, utils.fmtKMGT(v), utils.fmtKMGT(v - _snapshot[k])));
			} else if (_snapshot && _snapshot[k] && _snapshot[k] > v) {
				arr.push(sprintf("%s: %s (-%s)", k, utils.fmtKMGT(v), utils.fmtKMGT(_snapshot[k] - v)));
			} else {
				arr.push(sprintf("%s: %s",k, utils.fmtKMGT(v)));
			}
		}

		_snapshot = usage;

		console.log(arr.join(', '));
	};

	utils.createBig = () => {
		return Array(1000 * 1000 * 5).map(() => {
			return _Big.repeat(4);
		});

		// return new ArrayBuffer(1000 * 1000 * 1000 * 1000);

		// return Array(1000 * 1000 * 100).map(() => {
		// 	return _Big.repeat(4);
		// });

		// var ar = new ArrayBuffer(1000 * 1000 * 100);
		// ar[1000 * 1000 * 1000 * 100] = 2;
		// return ar;
	}

	return utils;
}).call(this);

module.exports = utils;

