
Ext.define('NFW2.store.store_log_manage_zip_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_log_manage_zip_list',
            fields: [
                {
                    name: 'num',
                    sortType: 'asInt'
                },
                {
                    name: 'name'
                },
                {
                    name: 'size'
                },
                {
                    name: 'logcnt'
                }
            ]
        }, cfg)]);
    }
});