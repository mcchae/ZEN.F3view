
Ext.define('NFW2.store.store_usage_log', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_usage_interface',
            fields: [
                {
                    name: 'time'
                },
                {
                    name: 'system'
                },
                {
                    name: 'network'
                },
                {
                    name: 'fw'
                },
                {
                    name: 'vpn'
                },
                {
                    name: 'ssl'
                },
                {
                    name: 'ips'
                },
                {
                    name: 'ddos'
                },
                {
                    name: 'waf'
                },
                {
                    name: 'av'
                },
                {
                    name: 'as'
                },
                {
                    name: 'system_usage'
                },
                {
                    name: 'packet_dist'
                },
                {
                    name: 'total'
                }
            ]
        }, cfg)]);
    }
});