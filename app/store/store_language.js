
Ext.define('NFW2.store.store_language', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_language',
            data: [
                {
                    value: 'ko',
                    name: 'Korean'
                },
				{
                    value: 'en',
                    name: 'English'
                },
				{
                    value: 'jp',
                    name: 'Japanese'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});