
Ext.define('NFW2.store.store_tracker_fir_mode', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_fir_mode',
            data: [
                {
                    name: '전체',
                    val: '0'
                },
                {
                    name: 'Internal',
                    val: '1'
                },
                {
                    name: 'External',
                    val: '2'
                },
                {
                    name: 'DMZ',
                    val: '3'
                },
                {
                    name: 'PAN',
                    val: '4'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === '0'){
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