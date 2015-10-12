
Ext.define('NFW2.store.store_logserver_syslog', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_logserver_syslog',
            fields: [
                {
                    name: 'division'
                },
                {
                    name: 'item'
                },
                {
                    name: 'rowspan'
                },
                {
                    name: 'group'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});