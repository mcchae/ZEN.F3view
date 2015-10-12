
Ext.define('NFW2.store.store_logDetail', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_logDetail',
            fields: [
                {
                    name: 'module_type'
                },
                {
                    name: 'log_type'
                },
                {
                    name: 'subclass'
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
                    name: 'show'
                }
            ]
        }, cfg)]);
    }
});