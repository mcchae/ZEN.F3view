
Ext.define('NFW2.store.store_portscan_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_portscan_action',
            data: [
                {
                    name: '탐지',
                    val: 1
                },
                {
                    name: '1:N 차단',
                    val: 2
                },
                {
                    name: '1:1 차단',
                    val: 3
                },
                {
                    name: '1:1 출발지 포트 가변 차단',
                    val: 4
                },
                {
                    name: 'N:1 차단',
                    val: 5
                },
                {
                    name: '패킷을 버림',
                    val: 6
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