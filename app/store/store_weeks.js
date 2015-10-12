
Ext.define('NFW2.store.store_weeks', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_weeks',
            data: [
                {
                    value: 'mon',
                    name: '월요일'
                },
                {
                    value: 'tue',
                    name: '화요일'
                },
                {
                    value: 'wed',
                    name: '수요일'
                },
                {
                    value: 'thu',
                    name: '목요일'
                },
                {
                    value: 'fri',
                    name: '금요일'
                },
                {
                    value: 'sat',
                    name: '토요일'
                },
                {
                    value: 'sun',
                    name: '일요일'
                },
                {
                    value: 'every',
                    name: '매일'
                },
                
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    convert: function(v, rec) {
                        if(rec.data.value === 'every'){
                            return __zen('day_all');
                        }else{
                            return __zen('day_'+rec.data.value);
                        }
                    },
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});