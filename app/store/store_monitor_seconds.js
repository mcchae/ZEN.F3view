
Ext.define('NFW2.store.store_monitor_seconds', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_seconds',
            data: [
                {
                    value: 1800,
                    name: '30분'
                },
                {
                    value: 3600,
                    name: '1시간'
                },
                {
                    value: 43200,
                    name: '12시간'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});