
Ext.define('NFW2.store.store_tracker_ser_type', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_ser_type',
            data: [
                {
                    name: '통합',
                    val: '1'
                },
                {
                    name: '일일',
                    val: '0'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === '1'){
                            return __zen('integrated');
                        }else{
                            return __zen('daily');
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