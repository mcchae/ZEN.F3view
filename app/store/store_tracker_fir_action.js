
Ext.define('NFW2.store.store_tracker_fir_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_fir_action',
            data: [
                {
                    name: '허용',
                    val: '1'
                },
                {
                    name: '차단',
                    val: '0'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === '1'){
                            return __zen('allow');
                        }else{
                            return __zen('deny');
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