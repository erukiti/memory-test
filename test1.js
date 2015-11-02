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
				foo();
			});
		});
	});
}

utils.memoryReport();
foo();

/*
rss: 20,836,352, heapTotal: 9,275,392, heapUsed: 3,717,760
rss: 181,448,704 (+160,612,352), heapTotal: 169,347,072 (+160,071,680), heapUsed: 164,259,424 (+160,541,664)
rss: 341,790,720 (+160,342,016), heapTotal: 329,418,752 (+160,071,680), heapUsed: 324,562,464 (+160,303,040)
rss: 501,964,800 (+160,174,080), heapTotal: 489,490,432 (+160,071,680), heapUsed: 484,586,864 (+160,024,400)
rss: 422,457,344 (-79,507,456), heapTotal: 409,454,592 (-80,035,840), heapUsed: 404,012,496 (-80,574,368)
rss: 582,533,120 (+160,075,776), heapTotal: 569,526,272 (+160,071,680), heapUsed: 564,048,232 (+160,035,736)
rss: 742,604,800 (+160,071,680), heapTotal: 729,597,952 (+160,071,680), heapUsed: 724,072,920 (+160,024,688)
rss: 902,676,480 (+160,071,680), heapTotal: 889,669,632 (+160,071,680), heapUsed: 884,097,400 (+160,024,480)
rss: 1,062,903,808 (+160,227,328), heapTotal: 1,049,741,312 (+160,071,680), heapUsed: 1,044,162,776 (+160,065,376)
rss: 822,767,616 (-240,136,192), heapTotal: 810,665,728 (-239,075,584), heapUsed: 804,010,920 (-240,151,856)
rss: 982,937,600 (+160,169,984), heapTotal: 970,737,408 (+160,071,680), heapUsed: 964,069,032 (+160,058,112)
rss: 1,143,013,376 (+160,075,776), heapTotal: 1,130,809,088 (+160,071,680), heapUsed: 1,124,097,256 (+160,028,224)
rss: 1,303,461,888 (+160,448,512), heapTotal: 1,290,880,768 (+160,071,680), heapUsed: 1,284,231,856 (+160,134,600)
rss: 1,143,169,024 (-160,292,864), heapTotal: 1,130,809,088 (-160,071,680), heapUsed: 1,124,096,616 (-160,135,240)
rss: 1,303,240,704 (+160,071,680), heapTotal: 1,290,880,768 (+160,071,680), heapUsed: 1,284,125,744 (+160,029,128)
rss: 1,460,228,096 (+156,987,392), heapTotal: 1,450,952,448 (+160,071,680), heapUsed: 1,444,198,232 (+160,072,488)
rss: 1,380,864,000 (-79,364,096), heapTotal: 1,367,837,440 (-83,115,008), heapUsed: 1,363,773,888 (-80,424,344)
rss: 1,419,714,560 (+38,850,560), heapTotal: 1,407,855,360 (+40,017,920), heapUsed: 1,403,755,832 (+39,981,944)

<--- Last few GCs --->

   89633 ms: Scavenge 1376.9 (1414.9) -> 1376.9 (1414.9) MB, 0.1 / 0 ms (+ 3.3 ms in 1 steps since last GC) [allocation failure] [incremental marking delaying mark-sweep].
   90879 ms: Mark-sweep 1376.9 (1414.9) -> 1376.8 (1414.9) MB, 1246.5 / 0 ms (+ 3.4 ms in 2 steps since start of marking, biggest step 3.3 ms) [last resort gc].
   91822 ms: Mark-sweep 1376.8 (1414.9) -> 1376.8 (1414.9) MB, 942.7 / 0 ms [last resort gc].


<--- JS stacktrace --->

==== JS stack trace =========================================

Security context: 0x2ee7e0837399 <JS Object>
    2: InnerArrayMap(aka InnerArrayMap) [native array.js:~1001] [pc=0x16e4c2fe9e7b] (this=0x2ee7e0804131 <undefined>,bk=0x2dec0ce0f911 <JS Function (SharedFunctionInfo 0x2caf1b034f81)>,bl=0x2ee7e0804131 <undefined>,o=0x2dec0ce0c049 <JS Array[5000000]>,v=5000000)
    3: map [native array.js:~1022] [pc=0x16e4c2f51a77] (this=0x2dec0ce0c049 <JS Array[5000000]>,bk=0x2dec0ce0f911 <JS Function (Shared...

FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - process out of memory
Abort trap: 6
*/
