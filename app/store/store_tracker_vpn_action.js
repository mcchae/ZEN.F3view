
Ext.define('NFW2.store.store_tracker_vpn_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_vpn_action',
            data: [
                {
                    name: '암호화+복호화',
                    val: '0'
                },
                {
                    name: '암호화',
                    val: '1'
                },
                {
                    name: '복호화',
                    val: '2'
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