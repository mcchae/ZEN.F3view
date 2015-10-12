
Ext.define('NFW2.store.store_tracker_traffic', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_traffic',
            data: [
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
                    name: '보안 정책',
                    val: 'spd_id'
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
                        if(rec.data.val === 'sip'){
                            return __zen('src');
                        }else if(rec.data.val === 'dip'){
                            return __zen('dest');
                        }else if(rec.data.val === 'protocol'){
                            return __zen('service');
                        }else if(rec.data.val === 'spd_id'){
                            return __zen('sec_policy');
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