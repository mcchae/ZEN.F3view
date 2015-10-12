
Ext.define('NFW2.store.store_portscan_sense', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_portscan_sense',
            data: [
                {
                    name: '하',
                    val: 'low'
                },
                {
                    name: '중',
                    val: 'medium'
                },
                {
                    name: '상',
                    val: 'high'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});