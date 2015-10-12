
Ext.define('NFW2.store.store_upload_file_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_upload_file_list',
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/upgradefileList',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'time'
                },
                {
                    name: 'size'
                }
            ]
        }, cfg)]);
    }
});