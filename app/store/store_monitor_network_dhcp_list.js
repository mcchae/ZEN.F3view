
Ext.define('NFW2.store.store_monitor_network_dhcp_list', {
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
            pageSize: 1000,
            storeId: 'store_monitor_network_dhcp_list',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'lease'
                },
                {
                    name: 'starts'
                },
                {
                    name: 'ends'
                },
                {
                    name: 'mac'
                },
                {
                    name: 'host'
                }
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    filename: Ext.encode('/etc/ferret/conf/network/dhcpd.lease'),
                    start: Ext.encode(0),
                    limit: Ext.encode(1000)
                },
                url: '/api/ftuctrl/getFileContent',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total/11'
                }
            }
        }, cfg)]);
    }
});