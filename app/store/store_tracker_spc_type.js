
Ext.define('NFW2.store.store_tracker_spc_type', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_spc_type',
            data: [
                {
                    name: '범위 중 특정시간',
                    val: '0'
                },
                {
                    name: '범위 중 통합시간',
                    val: '1'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === '0'){
                            return __zen('specific_range');
                        }else{
                            return __zen('specific_integration');
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