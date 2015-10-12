
Ext.define('NFW2.store.store_ip_srcdst_type', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ip_srcdst_type',
            data: [
                {
                    ip_type: 'any'
                },
                {
                    ip_type: 'single'
                },
                {
                    ip_type: 'range'
                },
                {
                    ip_type: 'netmask'
                }
            ],
            fields: [
                {
                    name: 'ip_type'
                }
            ]
        }, cfg)]);
    }
});