
Ext.define('NFW2.store.store_tracker_app_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Integer'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pageSize: 100,
            storeId: 'store_tracker_app_list',
            proxy: {
                type: 'jsonp',
                timeout: 1800000,
                url: '/api/FtDBMgr/getAPPTracker',
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
                    name: 'source_country'
                },
                {
                    name: 'dest_country'
                },
                {
                    type: 'int',
                    name: 'sessionCnt_sum'
                },
                {
                    name: 'sessionCnt_per'
                },
                {
                    name: 'sid'
                },
                {
                    name: 'date'
                },
                {
                    name: 'time'
                },
                {
                    name: 'pktid'
                },
                {
                    name: 'bytesid'
                },
                {
                    name: 'sessionid'
                },
                {
                    name: 'inbts_sum'
                },
                {
                    name: 'inbts_per'
                },
                {
                    name: 'inpkts_sum'
                },
                {
                    name: 'inpkts_per'
                },
                {
                    name: 'dport'
                },
                {
                    name: 'direction'
                },
                {
                    name: 'service'
                },
                {
                    name: 'category'
                },
                {
                    name: 'detail_list'
                },
                {
                    name: 'total_list'
                },
                {
                    name: 'technology'
                },
                {
                    name: 'purpose'
                },
                {
                    name: 'outbts_sum'
                },
                {
                    name: 'outbts_per'
                },
                {
                    name: 'otpkts_sum'
                },
                {
                    name: 'otpkts_per'
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
        var _store_t = Ext.data.StoreManager.lookup("store_tracker_app_total");
        _store_t.loadData(records[0].data.total_list);
    }

});