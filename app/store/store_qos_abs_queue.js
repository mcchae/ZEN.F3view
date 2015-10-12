
Ext.define('NFW2.store.store_qos_abs_queue', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_qos_abs_queue',
            data: [
                {
                    type: 'fifo',
                    name: 'FIFO'
                },
                {
                    type: 'sfq',
                    name: 'SFQ'
                },
                {
                    type: 'tbf',
                    name: 'TBF'
                }
            ],
            fields: [
                {
                    name: 'type'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});