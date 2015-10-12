
Ext.define('NFW2.store.store_timeserver', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_timeserver',
            data: [
                {
                    text: 'time.bora.net',
                    value: 'time.bora.net'
                },
                {
                    text: 'time.kriss.re.kr',
                    value: 'time.kriss.re.kr'
                },
                {
                    text: 'time.window.com',
                    value: 'time.window.com'
                },
                {
                    text: 'time.nist.gov',
                    value: 'time.nist.gov'
                },
                {
                    text: '시간동기화 서버 수동 설정',
                    value: 'manual_input'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.value === 'manual_input'){
                            return __zen('time_sync_setting');
                        }
                    },
                    name: 'text'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});