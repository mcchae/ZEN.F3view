
Ext.define('NFW2.store.store_network_router_multicast', {
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
            storeId: 'store_network_router_multicast',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('network_router_multicast')
                },
                url: '/api/ftuctrl/getObject',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'chk_use'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'action'
                },
                {
                    name: 'bootstrap_priority'
                },
                {
                    name: 'candidate_cycle'
                },
                {
                    name: 'candidate_priority'
                },
                {
                    name: 'static_address'
                },
                {
                    name: 'multiRP'
                },
                {
                    name: 'register_rate'
                },
                {
                    name: 'register_cycle'
                },
                {
                    name: 'data_rate'
                },
                {
                    name: 'data_cycle'
                }
            ]
        }, cfg)]);
    }
});