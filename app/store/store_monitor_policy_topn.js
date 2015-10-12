
Ext.define('NFW2.store.store_monitor_policy_topn', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_policy_topn',
            data: [
                {
                    name: '10',
                    value: '10'
                },
                {
                    name: '20',
                    value: '20'
                },
                {
                    name: '50',
                    value: '50'
                },
                {
                    name: '100',
                    value: '100'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});