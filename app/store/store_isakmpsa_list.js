
Ext.define('NFW2.store.store_isakmpsa_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'store_isakmpsa_list',
            proxy: {
                type: 'jsonp',
                limitParam: '',
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    root: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'name'
                },
                {
                    name: '@cid'
                }
            ]
        }, cfg)]);
    }
});