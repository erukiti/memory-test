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
				obs.onNext(0);
				obs.onCompleted();
			});
		});
	}
}).subscribe(()=>{console.log('hoge')});

/*

クリアしてないのでtest1同様失敗する

rss: 26,001,408, heapTotal: 11,327,232, heapUsed: 6,161,792
rss: 186,847,232 (+160,845,824), heapTotal: 171,398,912 (+160,071,680), heapUsed: 166,777,224 (+160,615,432)
rss: 347,246,592 (+160,399,360), heapTotal: 331,470,592 (+160,071,680), heapUsed: 327,085,592 (+160,308,368)
rss: 507,441,152 (+160,194,560), heapTotal: 491,542,272 (+160,071,680), heapUsed: 487,113,968 (+160,028,376)
rss: 468,078,592 (-39,362,560), heapTotal: 452,556,288 (-38,985,984), heapUsed: 445,832,216 (-41,281,752)
rss: 628,150,272 (+160,071,680), heapTotal: 612,627,968 (+160,071,680), heapUsed: 605,866,736 (+160,034,520)
rss: 788,221,952 (+160,071,680), heapTotal: 772,699,648 (+160,071,680), heapUsed: 765,895,432 (+160,028,696)
rss: 948,318,208 (+160,096,256), heapTotal: 932,771,328 (+160,071,680), heapUsed: 925,927,792 (+160,032,360)
rss: 1,108,549,632 (+160,231,424), heapTotal: 1,092,843,008 (+160,071,680), heapUsed: 1,086,036,712 (+160,108,920)
^C

*/
