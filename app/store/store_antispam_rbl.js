
Ext.define('NFW2.store.store_antispam_rbl', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_antispam_rbl',
            data: [
                {
                    '@num': 1,
                    url: 'dnsbl.sorbs.net'
                }
            ],
            fields: [
                {
                    name: '@num',
                    sortType: 'asInt'
                },
                {
                    name: 'url'
                }
            ]
        }, cfg)]);
    }
});