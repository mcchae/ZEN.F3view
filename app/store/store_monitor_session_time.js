
Ext.define('NFW2.store.store_monitor_session_time', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_session_time',
            data: [
                {
                    time: '5'
                },
                {
                    time: '10'
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