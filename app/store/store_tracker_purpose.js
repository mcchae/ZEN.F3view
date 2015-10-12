
Ext.define('NFW2.store.store_tracker_purpose', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_purpose',
            data: [
                {
                    name: '이슈 추적',
                    val: '0'
                },
                {
                    name: '추이 파악',
                    val: '1'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === '0'){
                            return __zen('issue_track');
                        }else{
                            return __zen('progress_study');
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