var utils = require('./utils');
var Rx = require('Rx');

function createHoge(cb) {
	cb({value: utils.createBig()});
}

function createFuga(cb) {
	cb({value: utils.createBig()});
}

function execPiyo(hoge, fuga, cb) {
	cb();
}

function runnable(generator) {
	var g = generator((val) => {
		g.next(val);
	});
	g.next();
}


utils.memoryReport();
Rx.Observable.spawn(function *(){
	while (true) {
		var hoge = yield Rx.Observable.create((obs) => {
			createHoge((hoge) => {
				obs.onNext(hoge);
				obs.onCompleted();
			});
		});
		var fuga = yield Rx.Observable.create((obs) => {
			createFuga((fuga) => {
				obs.onNext(fuga);
				obs.onCompleted();
			})
		});
		yield Rx.Observable.create((obs) => {
			execPiyo(hoge, fuga, () => {
				utils.memoryReport();
				hoge.value = null;
				fuga.value = null;
				obs.onNext(0);
				obs.onCompleted();
			});
		});
	}
}).subscribe(()=>{console.log('hoge')});

/*

test3同様うまくいく

rss: 26,144,768, heapTotal: 11,327,232, heapUsed: 6,172,688
rss: 187,252,736 (+161,107,968), heapTotal: 171,398,912 (+160,071,680), heapUsed: 167,050,024 (+160,877,336)
rss: 347,385,856 (+160,133,120), heapTotal: 331,470,592 (+160,071,680), heapUsed: 327,096,616 (+160,046,592)
rss: 228,093,952 (-119,291,904), heapTotal: 212,448,768 (-119,021,824), heapUsed: 205,828,352 (-121,268,264)
rss: 388,169,728 (+160,075,776), heapTotal: 372,520,448 (+160,071,680), heapUsed: 365,866,816 (+160,038,464)
rss: 548,343,808 (+160,174,080), heapTotal: 532,592,128 (+160,071,680), heapUsed: 525,944,776 (+160,077,960)
rss: 188,624,896 (-359,718,912), heapTotal: 176,558,592 (-356,033,536), heapUsed: 165,860,096 (-360,084,680)
rss: 348,696,576 (+160,071,680), heapTotal: 336,630,272 (+160,071,680), heapUsed: 325,895,408 (+160,035,312)
rss: 508,776,448 (+160,079,872), heapTotal: 496,701,952 (+160,071,680), heapUsed: 485,926,456 (+160,031,048)
rss: 188,641,280 (-320,135,168), heapTotal: 176,558,592 (-320,143,360), heapUsed: 165,875,136 (-320,051,320)
rss: 348,733,440 (+160,092,160), heapTotal: 336,630,272 (+160,071,680), heapUsed: 325,928,880 (+160,053,744)
rss: 508,809,216 (+160,075,776), heapTotal: 496,701,952 (+160,071,680), heapUsed: 485,957,248 (+160,028,368)
rss: 668,983,296 (+160,174,080), heapTotal: 656,773,632 (+160,071,680), heapUsed: 646,053,208 (+160,095,960)
rss: 188,772,352 (-480,210,944), heapTotal: 176,558,592 (-480,215,040), heapUsed: 165,294,272 (-480,758,936)
rss: 348,848,128 (+160,075,776), heapTotal: 336,630,272 (+160,071,680), heapUsed: 325,324,328 (+160,030,056)
^C

*/
