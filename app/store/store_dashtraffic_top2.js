
Ext.define('NFW2.store.store_dashtraffic_top2', {
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
            storeId: 'store_dashtraffic_top2',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'detect'
                },
                {
                    name: 'block'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'sport'
                },
                {
                    name: 'num'
                }
            ]
        }, cfg)]);
    }
});