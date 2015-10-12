
Ext.define('NFW2.store.store_tracker_app_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_app_action',
            data: [
                {
                    name: '탐지',
                    val: '318963713'
                },
                {
                    name: '차단',
                    val: '318963714'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === '318963713'){
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