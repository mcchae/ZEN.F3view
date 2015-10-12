
Ext.define('NFW2.store.store_tracker_ips', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_ips',
            data: [
                {
                    name: '공격자',
                    val: 'sip'
                },
                {
                    name: '공격 목적지',
                    val: 'dip'
                },
                {
                    name: '서비스',
                    val: 'protocol'
                },
                {
                    name: 'FSID/공격명',
                    val: 'fsid'
                },
                {
                    name: '위험도',
                    val: 'priority'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'sip'){
                            return __zen('attacker');
                        }else if(rec.data.val === 'dip'){
                            return __zen('attack_dest');
                        }else if(rec.data.val === 'protocol'){
                            return __zen('service');
                        }else if(rec.data.val === 'fsid'){
                            return __zen('fsid_name');
                        }else{
                            return __zen('hazard');
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