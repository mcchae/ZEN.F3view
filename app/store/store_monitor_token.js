
Ext.define('NFW2.store.store_monitor_token', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_token',
            data: [
                {
                    value: 'RxTx',
                    name: '인터페이스 별 TX, RX'
                },
                {
                    value: 'Tx',
                    name: '인터페이스 별 TX'
                },
                {
                    value: 'ComTxRx',
                    name: '통합 TX, RX'
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