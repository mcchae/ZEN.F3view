
Ext.define('NFW2.store.store_tracker_app', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_app',
            data: [
                {
                    name: '애플리케이션 이름',
                    val: 'sid'
                },
                {
                    name: '애플리케이션 범주',
                    val: 'category'
                },
                {
                    name: '애플리케이션 기술',
                    val: 'technology'
                },
                {
                    name: '애플리케이션 목적',
                    val: 'purpose'
                },
                {
                    name: '출발지',
                    val: 'sip'
                },
                {
                    name: '목적지',
                    val: 'dip'
                },
                {
                    name: '서비스',
                    val: 'protocol'
                },
                {
                    name: '출발지 국가코드',
                    val: 'source_country'
                },
                {
                    name: '목적지 국가코드',
                    val: 'dest_country'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'sid'){
                            return __zen('application_name');
                        }else if(rec.data.val === 'category'){
                            return __zen('app_category');
                        }else if(rec.data.val === 'technology'){
                            return __zen('app_technology');
                        }else if(rec.data.val === 'purpose'){
                            return __zen('app_purpose');
                        }else if(rec.data.val === 'sip'){
                            return __zen('src');
                        }else if(rec.data.val === 'dip'){
                            return __zen('dest');
                        }else if(rec.data.val === 'protocol'){
                            return __zen('service');
                        }else if(rec.data.val === 'source_country'){
                            return __zen('source_country');
                        }else{
                            return __zen('dest_country');
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