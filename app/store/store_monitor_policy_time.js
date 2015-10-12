
Ext.define('NFW2.store.store_monitor_policy_time', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_policy_time',
            data: [
                {
                    name: '1',
                    value: '1'
                },
                {
                    name: '2',
                    value: '2'
                },
                {
                    name: '5',
                    value: '5'
                },
                {
                    name: '10',
                    value: '10'
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