
Ext.define('NFW2.store.store_antispam_ipfilter', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_antispam_ipfilter',
            data: [
                {
                    num: 30,
                    address: 'Any',
                    action: '1'
                }
            ],
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'num'
                },
                {
                    name: 'address'
                },
                {
                    name: 'action'
                },
                {
                    convert: function(v, rec) {
                        return rec.data['@num'];
                    },
                    name: 'sort_num'
                }
            ]
        }, cfg)]);
    }
});