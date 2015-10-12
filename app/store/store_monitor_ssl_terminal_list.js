
Ext.define('NFW2.store.store_monitor_ssl_terminal_list', {
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
            pageSize: 100,
            storeId: 'store_monitor_ssl_terminal_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('client_mgt_config')
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
                    name: 'depart'
                },
                {
                    name: 'client_type'
                },
                {
                    name: 'hardware_serial'
                },
                {
                    name: 'trust_ip'
                },
                {
                    name: 'active_state'
                },
                {
                    name: 'device_change_state'
                },
                {
                    name: 'connected_tun'
                },
                {
                    name: 'allow_state'
                },
                {
                    name: 'tunnel_id'
                },
                {
                    name: 'client_id'
                },
                {
                    name: 'device_key'
                },
                {
                    name: '_id'
                },
                {
                    name: 'mac'
                }
            ]
        }, cfg)]);
    }
});