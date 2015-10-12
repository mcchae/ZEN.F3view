
Ext.define('NFW2.store.store_monitor_tracker_sort', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_tracker_sort',
            data: [
                {
                    name: '우선 순위',
                    val: 'num'
                },
                {
                    name: '정책 ID',
                    val: 'id'
                },
                {
                    name: 'BPS',
                    val: 'bps'
                },
                {
                    name: 'CPS',
                    val: 'cps'
                },
                {
                    name: 'PPS',
                    val: 'pps'
                },
                {
                    name: '사용량',
                    val: 'bytes'
                },
                {
                    name: '세션',
                    val: 'sessions'
                },
                {
                    name: '패킷',
                    val: 'packets'
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