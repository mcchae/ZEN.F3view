
Ext.define('NFW2.store.store_storeUpload', {
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
            storeId: 'store_storeUpload',
            proxy: {
                type: 'jsonp',
                url: '/api/ftH_menu/getMenuAttr',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'key'
                },
                {
                    name: 'classid'
                }
            ]
        }, cfg)]);
    }
});