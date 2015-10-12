
Ext.define('NFW2.store.store_log_system', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_log_system',
            fields: [
                {
                    name: 'index'
                },
                {
                    name: 'description'
                },
                {
                    name: 'dip'
                },
                {
                    name: 'direction'
                },
                {
                    name: 'dport'
                },
                {
                    name: 'event'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'sip'
                },
                {
                    name: 'sport'
                },
                {
                    name: 'timestamp'
                },
                {
                    name: 'timestamp1'
                },
                {
                    name: 'timestamp2'
                },
                {
                    name: 'user'
                },
                {
                    name: 'logid'
                },
                {
                    name: 'name'
                },
                {
                    name: 'histLogId'
                }
            ]
        }, cfg)]);
    }
});