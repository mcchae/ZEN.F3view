
Ext.define('NFW2.store.store_antivirus_filter', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_antivirus_filter',
            data: [
                {
                    chk: 'on',
                    item: '*'
                }
            ],
            fields: [
                {
                    name: '@num',
                    sortType: 'asInt'
                },
                {
                    name: 'chk'
                },
                {
                    name: 'item'
                }
            ]
        }, cfg)]);
    }
});