
Ext.define('NFW2.store.store_tracker_sort', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_tracker_sort',
            data: [
                {
                    name: '내림차순',
                    val: '-1'
                },
                {
                    name: '오름차순',
                    val: '1'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === '1'){
                            return __zen('ase');
                        }else{
                            return __zen('desc_ord');
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