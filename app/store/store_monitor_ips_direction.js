
Ext.define('NFW2.store.store_monitor_ips_direction', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_ips_direction',
            data: [
                {
                    text: 'c->s',
                    value: 'cs'
                },
                {
                    text: 's->c',
                    value: 'sc'
                }
            ],
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});