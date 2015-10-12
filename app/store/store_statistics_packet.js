
Ext.define('NFW2.store.store_statistics_packet', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_statistics_packet',
            fields: [
                {
                    name: 'time'
                },
                {
                    name: 'ps64'
                },
                {
                    name: 'ps128'
                },
                {
                    name: 'ps256'
                },
                {
                    name: 'ps512'
                },
                {
                    name: 'ps1024'
                },
                {
                    name: 'ps1500'
                },
                {
                    name: 'ps_total'
                }
            ]
        }, cfg)]);
    }
});