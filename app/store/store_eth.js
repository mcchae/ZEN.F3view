
Ext.define('NFW2.store.store_eth', {
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
            storeId: 'store_eth',
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/get_pname_list',
                reader: {
                    type: 'json',
                    root: 'retval'
                }
            },
            fields: [
                {
                    name: 'name'
                }
            ],
            listeners: {
                load: {
                    fn: me.onJsonpstoreLoad,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onJsonpstoreLoad: function(store, records, successful, eOpts) {
        var me = this;
        me.insert(0,{name:"Any"});
    }

});