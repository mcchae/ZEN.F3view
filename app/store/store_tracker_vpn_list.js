
Ext.define('NFW2.store.store_tracker_vpn_list', {
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
            storeId: 'store_tracker_vpn_list',
            proxy: {
                type: 'jsonp',
                timeout: 1800000,
                url: '/api/FtDBMgr/getVPNTracker',
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
                    name: 'country'
                },
                {
                    type: 'int',
                    name: 'sessionCnt_sum'
                },
                {
                    name: 'sessionCnt_per'
                },
                {
                    name: 'spd_id'
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
                    name: 'detail_list'
                },
                {
                    name: 'total_list'
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
                },
                beforeload: {
                    fn: me.onJsonpstoreBeforeLoad,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onJsonpstoreLoad: function(store, records, successful, eOpts) {
        hideLoadMask();

        if(store.data.length < 1){ return false; }

        store.loadData(records[0].data.detail_list);
        var _store_t = Ext.data.StoreManager.lookup("store_tracker_total");
        _store_t.loadData(records[0].data.total_list);
    },

    onJsonpstoreBeforeLoad: function(store, operation, eOpts) {
        showLoadMask();
    }

});