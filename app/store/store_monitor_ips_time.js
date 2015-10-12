
Ext.define('NFW2.store.store_monitor_ips_time', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_ips_time',
            data: [
                {
                    time: '1'
                },
                {
                    time: '2'
                },
                {
                    time: '5'
                },
                {
                    time: '10'
                },
                {
                    time: '30'
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