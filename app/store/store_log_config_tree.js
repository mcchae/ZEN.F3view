
Ext.define('NFW2.store.store_log_config_tree', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_log_config_tree',
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'leaf'
                },
                {
                    name: 'category'
                },
                {
                    name: 'event'
                },
                {
                    name: 'create'
                },
                {
                    name: 'send_mail'
                },
                {
                    name: 'syslog'
                },
                {
                    name: 'system'
                },
                {
                    name: 'smc_log'
                },
                {
                    name: '_id'
                },
                {
                    name: 'depth'
                }
            ]
        }, cfg)]);
    }
});