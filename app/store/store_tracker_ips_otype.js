
Ext.define('NFW2.store.store_tracker_ips_otype', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_ips_otype',
            data: [
                {
                    name: '탐지 건수',
                    val: 'cnt'
                },
                {
                    name: '탐지 바이트',
                    val: 'byte'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});