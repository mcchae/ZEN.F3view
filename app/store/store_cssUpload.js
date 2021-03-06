
Ext.define('NFW2.store.store_cssUpload', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_cssUpload',
            proxy: {
                type: 'ajax',
                url: '/fileList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});