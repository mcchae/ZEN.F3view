
Ext.define('NFW2.store.store_country_item', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_country_item',
            fields: [
                {
                    name: 'country_code'
                },
                {
                    name: 'country_desc'
                }
            ],
            proxy: {
                type: 'jsonp',
                limitParam: '0',
                url: '/api/ftuctrl/findCountryInfo',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list'
                }
            }
        }, cfg)]);
    }
});