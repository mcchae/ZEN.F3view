
Ext.define('NFW2.store.store_monitor_iptype', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_iptype',
            data: [
                {
                    name: 'IPv4',
                    value: 'v4'
                },
                {
                    name: 'IPv6',
                    value: 'v6'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.name === "IPv4"){ return __zen('ipv4'); }
                        else{ return __zen('ipv6'); }
                    },
                    name: 'name'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});