
Ext.define('NFW2.store.store_monitor_daemon_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_daemon_list',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'pid'
                },
                {
                    name: 'status'
                },
                {
                    name: 'start_time'
                },
                {
                    name: 'end_time'
                },
                {
                    name: 'cpu'
                },
                {
                    name: 'mem'
                },
                {
                    name: '3rdParty'
                },
                {
                    name: 'desc'
                }
            ]
        }, cfg)]);
    }
});