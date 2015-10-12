
Ext.define('NFW2.store.store_logsearch_sort', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_logsearch_sort',
            data: [
                {
                    name: '내림차순',
                    val: 'desc'
                },
                {
                    name: '오름차순',
                    val: 'asc'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'desc'){
                            return __zen('desc_ord');
                        }else{
                            return __zen('ase');
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