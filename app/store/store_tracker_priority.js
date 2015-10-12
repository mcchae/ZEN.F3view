
Ext.define('NFW2.store.store_tracker_priority', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_priority',
            data: [
                {
                    name: '전체',
                    val: 'All'
                },
                {
                    name: 'Critical',
                    val: '1'
                },
                {
                    name: 'High',
                    val: '2'
                },
                {
                    name: 'Normal',
                    val: '3'
                },
                {
                    name: 'Low',
                    val: '4'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'All'){
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