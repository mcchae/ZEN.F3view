
Ext.define('NFW2.store.store_monitor_ipsec_tunnel', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Integer'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pageSize: 50,
            storeId: 'store_monitor_ipsec_tunnel',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    func_name: Ext.encode('mod_vpn_monitor_tunnel_info'),
                    args: Ext.encode({
                        ip: '0',
                        'interface': '0'
                    })
                },
                url: '/api/ftuctrl/execKctrlFunc',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'active'
                },
                {
                    type: 'int',
                    name: 'de_bps'
                },
                {
                    type: 'int',
                    name: 'de_byte'
                },
                {
                    name: 'device'
                },
                {
                    type: 'int',
                    name: 'en_bps'
                },
                {
                    type: 'int',
                    name: 'en_byte'
                },
                {
                    name: 'expire_date'
                },
                {
                    name: 'index'
                },
                {
                    name: 'my_interface'
                },
                {
                    name: 'ip_url'
                },
                {
                    name: 'sa2_info'
                },
                {
                    name: 'status'
                },
                {
                    name: 'time'
                },
                {
                    name: 'subnet'
                },
                {
                    name: 'your_ip'
                },
                {
                    name: 'lifetime'
                }
            ]
        }, cfg)]);
    }
});