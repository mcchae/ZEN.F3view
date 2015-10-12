
Ext.define('NFW2.store.store_tracker_http_otype', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_http_otype',
            data: [
                {
                    name: '누적 사용량',
                    val: 'bytes_sum'
                },
                {
                    name: '접속 건수',
                    val: 'accessCnt_sum'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'bytes_sum'){
                            return __zen('cum_usage');
                        }else{
                            return __zen('connection_cnt');
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