
Ext.define('NFW2.store.store_ipv6_group_obj', {
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
            storeId: 'store_ipv6_group_obj',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    show_type: Ext.encode('src'),
                    etc_info: Ext.encode({
                        is_ipv6: true
                    })
                },
                limitParam: ' ',
                url: '/api/ftuctrl/findObjectList',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list'
                }
            },
            fields: [
                {
                    name: 'cid'
                },
                {
                    name: 'name'
                },
                {
                    name: 'otype'
                }
            ]
        }, cfg)]);
    }
});