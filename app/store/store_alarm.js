
Ext.define('NFW2.store.store_alarm', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_alarm',
            fields: [
                {
                    name: 'date'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'sip'
                },
                {
                    name: 'dip'
                },
                {
                    name: 'sport'
                },
                {
                    name: 'dport'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'user'
                }
            ]
        }, cfg)]);
    }
});