
Ext.define('NFW2.store.store_monitor_arp_v6_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pageSize: 100,
            storeId: 'store_monitor_arp_v6_list',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'mac'
                },
                {
                    name: 'flags'
                }
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    type_info: Ext.encode({
                        name: 'arp',
                        ip_type: 'ipv6'
                    })
                },
                url: '/api/ftuctrl/getNetworkUsage',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            }
        }, cfg)]);
    }
});