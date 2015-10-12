
Ext.define('NFW2.store.store_modem', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_modem',
            data: [
                {
                    value: 'None',
                    name: 'None'
                },
                {
                    value: 'Samsung',
                    name: 'Samsung'
                },
                {
                    value: 'Hyundai',
                    name: 'Hyundai'
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