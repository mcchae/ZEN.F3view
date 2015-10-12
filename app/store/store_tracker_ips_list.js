
Ext.define('NFW2.store.store_tracker_ips_list', {
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
            storeId: 'store_tracker_ips_list',
            proxy: {
                type: 'jsonp',
                timeout: 1800000,
                url: '/api/FtDBMgr/getIPSTracker',
                reader: {
                    type: 'json',
                    rootProperty: 'retval',
                    totalProperty: 'retval.total_cnt'
                }
            },
            fields: [
                {
                    type: 'int',
                    name: 'num'
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
                    name: 'byte'
                },
                {
                    name: 'cnt'
                },
                {
                    name: 'fsid'
                },
                {
                    name: 'byte_per'
                },
                {
                    name: 'cnt_per'
                },
                {
                    name: 'dport'
                },
                {
                    name: 'detail_list'
                },
                {
                    name: 'total_list'
                },
                {
                    name: 'total_cnt'
                },
                {
                    name: 'priority'
                },
                {
                    name: 'priority1_count_per'
                },
                {
                    name: 'priority2_count_per'
                },
                {
                    name: 'priority3_count_per'
                },
                {
                    name: 'priority4_count_per'
                },
                {
                    name: 'priority1_bytes_per'
                },
                {
                    name: 'priority2_bytes_per'
                },
                {
                    name: 'priority3_bytes_per'
                },
                {
                    name: 'priority4_bytes_per'
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
        var _store_t = Ext.data.StoreManager.lookup("store_tracker_ips_total");
        _store_t.loadData(records[0].data.total_list);
    }

});