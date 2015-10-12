
Ext.define('NFW2.store.store_nat64_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pageSize: 100,
            storeId: 'store_nat64_list',
            autoLoad: false,
            fields: [
                {
                    type: 'int',
                    name: '@num'
                },
                {
                    name: '@uid',
                    sortType: 'asInt'
                },
                {
                    name: '@use'
                },
                {
                    name: '@type'
                },
                {
                    name: 'desc'
                },
                {
                    convert: function(v, rec) {
                        return disp_obj(v,0);
                    },
                    name: 'src'
                },
                {
                    convert: function(v, rec) {
                        return disp_obj_single(v,0);
                    },
                    name: 'xsrc'
                },
                {
                    convert: function(v, rec) {
                        return disp_obj(v,1);
                    },
                    name: 'service'
                },
                {
                    name: 'lasthit'
                }
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('firewall_nat64'),
                    sort_list: Ext.encode([
                        [
                            '@num',
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