
Ext.define('NFW2.store.store_ips_protocol', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ips_protocol',
            data: [
                {
                    text: 'TCP',
                    value: 'TCP'
                },
                {
                    text: 'UDP',
                    value: 'UDP'
                },
                {
                    text: 'IP',
                    value: 'IP'
                },
                {
                    text: 'ICMP',
                    value: 'ICMP'
                }
            ],
            fields: [
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});