
Ext.define('NFW2.store.store_monitor_bandwidth_time', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_bandwidth_time',
            data: [
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
                    time: '40'
                },
                {
                    time: '50'
                },
                {
                    time: '60'
                },
                {
                    time: '70'
                },
                {
                    time: '80'
                },
                {
                    time: '90'
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