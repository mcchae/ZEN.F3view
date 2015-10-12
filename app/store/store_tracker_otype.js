
Ext.define('NFW2.store.store_tracker_otype', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_otype',
            data: [
                {
                    name: '누적 패킷',
                    val: 'packets_sum'
                },
                {
                    name: '누적 사용량',
                    val: 'bytes_sum'
                },
                {
                    name: '누적 세션',
                    val: 'sessionCnt_sum'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'packets_sum'){
                            return __zen('cum_packet');
                        }else if(rec.data.val === 'bytes_sum'){
                            return __zen('cum_usage');
                        }else if(rec.data.val === 'sessionCnt_sum'){
                            return __zen('cum_session');
                        }
                    },
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});