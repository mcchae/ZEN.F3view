
Ext.define('NFW2.store.store_monitor_update_min', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_update_min',
            data: [
                {
                    time: '5'
                },
                {
                    time: '10'
                },
                {
                    time: '20'
                },
                {
                    time: '30'
                },
                {
                    time: '60'
                }
            ],
            fields: [
                {
                    name: 'time'
                }
            ]
        }, cfg)]);
    }
});