
Ext.define('NFW2.store.store_monitor_tracker_type', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_tracker_type',
            data: [
                {
                    name: 'Select',
                    val: ''
                },
                {
                    name: 'IP 주소',
                    val: 'ip'
                },
                {
                    name: '도메인',
                    val: 'domain'
                },
                {
                    name: '국가',
                    val: 'country'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val !== ''){
                            return __zen(rec.data.val);
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