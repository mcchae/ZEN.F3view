
Ext.define('NFW2.store.store_getMenuJson', {
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
            storeId: 'store_getMenuJson',
            proxy: {
                type: 'jsonp',
                url: '/api/ftH_menu/getMenuJson',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'record'
                }
            ]
        }, cfg)]);
    }
});