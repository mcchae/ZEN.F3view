
Ext.define('NFW2.store.store_firewall_etc_network_type', {
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
            storeId: 'store_firewall_etc_network_type',
            data: [
                {
                    name: 'Single',
                    value: 'single'
                },
                {
                    name: 'Range',
                    value: 'range'
                },
                {
                    name: 'Netmask',
                    value: 'netmask'
                }
            ],
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
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