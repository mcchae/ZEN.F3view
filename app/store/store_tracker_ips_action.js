
Ext.define('NFW2.store.store_tracker_ips_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_ips_action',
            data: [
                {
                    name: '탐지',
                    val: 'detect'
                },
                {
                    name: '차단',
                    val: 'block'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'detect'){
                            return __zen('detect');
                        }else{
                            return __zen('block');
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