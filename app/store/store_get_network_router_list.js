
Ext.define('NFW2.store.store_get_network_router_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'store_get_network_router_list',
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/get_network_router_list',
                reader: {
                    type: 'json',
                    root: 'retval'
                }
            },
            fields: [
                {
                    name: 'num'
                },
                {
                    name: 'name'
                },
                {
                    name: 'setting',
                    sortType: 'asInt'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'period'
                },
                {
                    name: 'pool'
                },
                {
                    name: 'fail'
                },
                {
                    name: 'mac'
                },
                {
                    name: 'cid'
                }
            ]
        }, cfg)]);
    }
});