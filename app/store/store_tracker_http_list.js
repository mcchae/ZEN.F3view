
Ext.define('NFW2.store.store_tracker_http_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pageSize: 100,
            storeId: 'store_tracker_http_list',
            proxy: {
                type: 'jsonp',
                timeout: 1800000,
                url: '/api/FtDBMgr/getHTTPTracker',
                reader: {
                    type: 'json',
                    rootProperty: 'retval',
                    totalProperty: 'retval.total_cnt'
                }
            },
            fields: [
                {
                    name: 'num',
                    sortType: 'asInt'
                },
                {
                    name: 'sip'
                },
                {
                    name: 'dip'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'date'
                },
                {
                    name: 'time'
                },
                {
                    name: 'dport'
                },
                {
                    name: 'service'
                },
                {
                    name: 'category'
                },
                {
                    name: 'accessCnt_sum'
                },
                {
                    name: 'url'
                },
                {
                    name: 'outbts_per'
                },
                {
                    name: 'outbts_sum'
                },
                {
                    name: 'bytes_per'
                },
                {
                    name: 'accessCnt_per'
                },
                {
                    name: 'inbts_sum'
                },
                {
                    name: 'inbts_per'
                },
                {
                    name: 'event'
                },
                {
                    name: 'total_bytes'
                },
                {
                    name: 'total_accessCnt'
                }
            ],
            listeners: {
                load: {
                    fn: me.onJsonpstoreLoad,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onJsonpstoreLoad: function(store, records, successful, eOpts) {
        if(store.data.length < 1){ return false; }

        store.loadData(records[0].data.detail_list);
        var _store_t = Ext.data.StoreManager.lookup("store_tracker_http_total");
        _store_t.loadData(records[0].data.total_list);
    }

});