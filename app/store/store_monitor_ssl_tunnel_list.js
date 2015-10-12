
Ext.define('NFW2.store.store_monitor_ssl_tunnel_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pageSize: 20,
            storeId: 'store_monitor_ssl_tunnel_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('ssl_connected_user_config'),
                    cond: Ext.encode({
                        using_flag: 1
                    })
                },
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'login_id'
                },
                {
                    name: 'user_name'
                },
                {
                    name: 'tunnel_id'
                },
                {
                    name: 'client_id'
                },
                {
                    name: 'rent_ip'
                },
                {
                    name: 'trust_ip'
                },
                {
                    name: 'login_date'
                },
                {
                    name: 'tun_name'
                },
                {
                    name: 'using_flag'
                },
                {
                    name: '_id'
                }
            ]
        }, cfg)]);
    }
});