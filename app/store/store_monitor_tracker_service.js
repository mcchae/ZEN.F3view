
Ext.define('NFW2.store.store_monitor_tracker_service', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_tracker_service',
            data: [
                {
                    name: '전체',
                    val: 'all'
                },
                {
                    name: 'TCP',
                    val: 6
                },
                {
                    name: 'UDP',
                    val: 17
                },
                {
                    name: 'ICMP',
                    val: 1
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'all'){
                            return __zen('all');
                        }
                    },
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});