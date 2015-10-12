
Ext.define('NFW2.store.store_monitor_session_class', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_session_class',
            data: [
                {
                    name: 'ALL',
                    value: 'all'
                },
                {
                    name: 'IDS',
                    value: 'ids'
                },
                {
                    name: 'IPS',
                    value: 'ips'
                },
                {
                    name: 'WIPS',
                    value: 'wips'
                },
                {
                    name: 'DDOS',
                    value: 'ddos'
                },
                {
                    name: 'APP',
                   value: 'app'
                },
                {
                    name: '안티바이러스',
                    value: 'av'
                },
                {
                    name: '안티스팸',
                    value: 'as'
                },
                {
                    name: 'RTM',
                    value: 'rtm'
                },
                {
                    name: 'DMC',
                    value: 'dmc'
                },
                {
                    name: 'CLI',
                    value: 'cli'
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