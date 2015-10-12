
Ext.define('NFW2.store.store_timesync', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_timesync',
            data: [
                {
                    text: '시스템 시간 직접 설정',
                    value: 'static'
                },
                {
                    text: '시간 서버와 동기화',
                    value: 'sync'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.value === 'static'){
                            return __zen('system_manual_setting');
                        }else{
                            return __zen('time_server_sync');
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