var utils = require('./utils');

function createHoge(cb) {
	setTimeout(() => {
		cb({value: utils.createBig()});
	}, 0);
}

function createFuga(cb) {
	setTimeout(() => {
		cb({value: utils.createBig()});
	}, 0);
}

function execPiyo(hoge, fuga, cb) {
	setTimeout(() => {
		cb();
	}, 0);
}

utils.memoryReport();

function runnable(generator) {
	var g = generator((val) => {g.next(val);});
	g.next();
}

runnable(function *(next) {
	while (true) {
		var hoge = yield createHoge(next);
		var fuga = yield createFuga(next);
		yield execPiyo(hoge, fuga, next);
		utils.memoryReport();
		hoge.value = null;
		fuga.value = null;
	}
  console.dir('hoge');
});

/*

うまくいく

rss: 20,799,488, heapTotal: 9,275,392, heapUsed: 3,729,824
rss: 181,456,896 (+160,657,408), heapTotal: 169,347,072 (+160,071,680), heapUsed: 164,324,096 (+160,594,272)
rss: 341,540,864 (+160,083,968), heapTotal: 329,418,752 (+160,071,680), heapUsed: 324,367,440 (+160,043,344)
rss: 501,948,416 (+160,407,552), heapTotal: 489,490,432 (+160,071,680), heapUsed: 484,655,744 (+160,288,304)
rss: 262,418,432 (-239,529,984), heapTotal: 249,382,912 (-240,107,520), heapUsed: 244,066,760 (-240,588,984)
rss: 422,490,112 (+160,071,680), heapTotal: 409,454,592 (+160,071,680), heapUsed: 404,098,184 (+160,031,424)
rss: 582,561,792 (+160,071,680), heapTotal: 569,526,272 (+160,071,680), heapUsed: 564,164,344 (+160,066,160)
rss: 222,539,776 (-360,022,016), heapTotal: 210,396,928 (-359,129,344), heapUsed: 204,053,264 (-360,111,080)
rss: 182,525,952 (-40,013,824), heapTotal: 170,379,008 (-40,017,920), heapUsed: 164,052,360 (-40,000,904)
rss: 182,525,952, heapTotal: 170,379,008, heapUsed: 163,724,152 (-328,208)
rss: 342,618,112 (+160,092,160), heapTotal: 330,450,688 (+160,071,680), heapUsed: 323,759,336 (+160,035,184)
rss: 502,796,288 (+160,178,176), heapTotal: 490,522,368 (+160,071,680), heapUsed: 483,871,152 (+160,111,816)
rss: 262,676,480 (-240,119,808), heapTotal: 250,414,848 (-240,107,520), heapUsed: 243,743,576 (-240,127,576)
^C
*/
