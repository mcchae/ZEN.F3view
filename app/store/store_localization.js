
Ext.define('NFW2.store.store_localization', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_localization',
            data: [
                {
                    value: 'kor',
                    name: 'kor'
                },
                {
                    value: 'eng',
                    name: 'eng'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});