
Ext.define('NFW2.store.store_detectiondelicacy', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_detectiondelicacy',
            data: [
                {
                    text: '상',
                    value: 'high'
                },
                {
                    text: '중',
                    value: 'middle'
                },
                {
                    text: '하',
                    value: 'low'
                }
            ],
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});