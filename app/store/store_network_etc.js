
Ext.define('NFW2.store.store_network_etc', {
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
            storeId: 'store_network_etc',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'org_iface'
                },
                {
                    name: 'mirror_iface'
                },
                {
                    name: 'part1'
                },
                {
                    name: 'part2'
                }
            ]
        }, cfg)]);
    }
});