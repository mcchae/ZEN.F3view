
Ext.define('NFW2.store.store_monitor_tracker_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_tracker_action',
            data: [
                {
                    name: '전체',
                    val: 'all'
                },
                {
                    name: 'Accept',
                    val: 'accept'
                },
                {
                    name: 'IPSec',
                    val: 'ipsec'
                },
                {
                    name: 'Deny',
                    val: 'deny'
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