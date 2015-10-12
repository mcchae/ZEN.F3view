
Ext.define('NFW2.store.store_network_ipspoofing_list', {
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
            storeId: 'store_network_ipspoofing_list',
            fields: [
                {
                    name: 'net'
                },
                {
                    name: '_num',
                    sortType: 'asInt'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'chk_use'
                }
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('network_spoofing'),
                    sort_list: Ext.encode([
                        [
                            '_num',
                            1
                        ]
                    ])
                },
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            }
        }, cfg)]);
    }
});