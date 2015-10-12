
Ext.define('NFW2.store.store_filterset_type', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_filterset_type',
            data: [
                {
                    name: '정책 ID',
                    val: 'uid'
                },
                {
                    name: '시그너처 이름',
                    val: 'sig_name'
                },
                {
                    name: '공격자',
                    val: 'sip'
                },
                {
                    name: '목적지',
                    val: 'dip'
                },
                {
                    name: '공격자 포트',
                    val: 'sport'
                },
                {
                    name: '목적지 포트',
                    val: 'dport'
                },
                {
                    name: '행위',
                    val: 'action'
                },
                {
                    name: '위험도',
                    val: 'risk'
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