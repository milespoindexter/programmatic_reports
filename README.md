Programmatic Report Service:
2014-09-08
selfpropelledcity@gmail.com

Presents Programmatic Ad Sale reports from:
Google AdXchange
Pubmatic
LiveRail


Start server:  
cd /app/node_apps/programmatic_reports/
nohup node programmaticServer > programmatic.out &

Stop server:
ps aux | grep node
(then kill the node programmaticServer process)


AdXchange Reports:
GET:  	http://slcnpde125:3017/adx/reports   		//findAll
GET:    http://slcnpde125:3017/adx/reports/find 	//search all reports
GET:	http://slcnpde125:3017/adx/reports/:id		//findById
GET:    http://slcnpde125:3017/adx/reports/count	//count


LiveRail Reports:
GET:  	http://localhost:3017/liverail/reports   		//findAll
GET:    http://localhost:3017/liverail/reports/find 	//search all reports
GET:	http://localhost:3017/liverail/reports/:id		//findById
GET:    http://localhost:3017/liverail/reports/count	//count


Pubmatic Reports:
GET:  	http://slcnpde125:3017/pubmatic/reports   		//findAll
GET:    http://slcnpde125:3017/pubmatic/reports/find 	//search all reports
GET:	http://slcnpde125:3017/pubmatic/reports/:id		//findById
GET:    http://slcnpde125:3017/pubmatic/reports/count	//count

The find function does a starts_with type search.
This will find all reports with a start date in July 2014:
http://localhost:3017/adx/reports/find?key=startStr&val=2014-09-01

_____________________________________________________________________________
Google AdXchange TEST:
http://localhost:3017/adx/reports/find?key=reportType&val=AdXchangeTest

http://localhost:3017/adx/reports/find?key=startStr&val=2014-09-01&reportType=AdXchangeTest


_____________________________________________________________________________
Pubmatic TEST:
get all reports of one type:
http://localhost:3017/pubmatic/reports/find?reportType=getPublisherAdTagReport

http://localhost:3017/pubmatic/reports/find?key=startStr&val=2014-08-07&reportType=getPublisherAdTagReport
http://localhost:3017/pubmatic/reports/find?key=startStr&val=2014-08-07&reportType=getPublisherDetailedReport

Possible Pubmatic Report Types:
http://localhost:3017/pubmatic/reports/find?key=reportType&val=getPublisherDetailedReport
http://localhost:3017/pubmatic/reports/find?key=reportType&val=getPublisherAdTagReport
http://localhost:3017/pubmatic/reports/find?key=reportType&val=getPublisherDailyReport
http://localhost:3017/pubmatic/reports/find?key=reportType&val=getPublisherDailySiteReport
http://localhost:3017/pubmatic/reports/find?key=reportType&val=getPublisherDemandReport


_____________________________________________________________________________
LiveRail TEST:
This will find all reports with a start date in July 2014:
http://localhost:3017/liverail/reports/find?key=start_date&val=2014-07

http://localhost:3017/liverail/reports/find?key=reportName&val=platform_brand_advertiser_last_month_2014-07-01_2014-07-31

or just
http://localhost:3017/liverail/reports/find?key=reportName&val=platform_brand

http://localhost:3017/liverail/reports/find?key=startStr&val=2014-09-01
http://localhost:3017/liverail/reports/find?key=startStr&val=2014-09-01

MongoDB _____________________________________________________________
export:
mongoexport -d programmatic -c adx -o adxReports

import:
mongoimport -h localhost -d programmatic -c adx --file adxReports

export:
mongoexport -d programmatic -c pubmatic -o pubReports

import:
mongoimport -h localhost -d programmatic -c pubmatic --file pubReports


the whole db:
mongodump -d programmatic -o programmaticOut

cd programmaticOut

mongorestore -h localhost programmatic


