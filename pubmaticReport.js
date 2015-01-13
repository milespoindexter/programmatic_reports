//Main class
$data.Class.define('$pub.Types.Monthly', $data.Entity, null, {
    Id: { type: "id", key: true, computed: true, nullable: false },
    //"_id": { type: 'int', key: true, computed: true },
    "reportType" : { type: 'string' },
    "startDate" : { type: "Edm.DateTimeOffset" },
    "endDate" : { type: "Edm.DateTimeOffset" },
    "startStr" : { type: 'string' },
    "endStr" : { type: 'string' },
    "ts" : { type: "Edm.DateTimeOffset" },
    "adTagName" : { type: 'string' },
    "adTagId" : { type: 'int' },
    "campaignId" : { type: 'int' },
    "siteId" : { type: 'int' },
    "realTimeCampaign" : { type: "Edm.Boolean" },
    "networkId" : { type: 'int' },
    "adSizeId" : { type: 'int' },
    "networkName" : { type: 'string' },
    "date" : { type: 'string' },
    "siteName" : { type: 'string' },
    "demandPartnerId" : { type: 'int' },
    "pmStats_defaultImpr" : { type: 'int' },
    "pmStats_paidImpr" : { type: 'int' },
    "pmStats_ecpm" : { type: 'Edm.Double' },
    "pmStats_totalImpr" : { type: "Edm.Int64" },
    "pmStats_paidEcpm" : { type: 'int' },
    "pmStats_fillRate" : { type: 'int' },
    "pmStats_clicks" : { type: "Edm.Int64" },
    "pmStats_paidRevenue" : { type: 'int' },
    "pmStats_ctr" : { type: 'Edm.Double' },
    "pmStats_revenue" : { type: 'Edm.Double' },
    "networkStats_defaultImpr" : { type: 'int' },
    "networkStats_paidImpr" : { type: 'int' },
    "networkStats_ecpm" : { type: 'Edm.Double' },
    "networkStats_totalImpr" : { type: "Edm.Int64" },
    "networkStats_paidEcpm" : { type: 'int' },
    "networkStats_fillRate" : { type: 'int' },
    "networkStats_clicks" : { type: "Edm.Int64" },
    "networkStats_paidRevenue" : { type: 'int' },
    "networkStats_ctr" : { type: 'Edm.Double' },
    "networkStats_revenue" : { type: 'Edm.Double' }
}, null);

$data.Class.defineEx("$pub.Types.PubContext",  [$data.EntityContext,$data.ServiceBase], null, {
    monthly: { type: $data.EntitySet, elementType: $pub.Types.Monthly }
});

exports = $pub.Types.PubContext;

