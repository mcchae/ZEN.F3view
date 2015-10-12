
Ext.define('NFW2.store.store_firewall_object_qos', {
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
            pageSize: 100,
            storeId: 'store_firewall_object_qos',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('object_qos'),
                    search_info: Ext.encode({
                        
                    }),
                    sort_list: Ext.encode([
                        [
                            'name',
                            1
                        ]
                    ])
                },
                limitParam: '',
                url: '/api/ftuctrl/getObjectList',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@num',
                    sortType: 'asInt'
                },
                {
                    name: 'name'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'qdiscid'
                },
                {
                    name: 'bandwidth',
                    sortType: 'asInt'
                },
                {
                    name: 'option'
                },
                {
                    name: 'opttype'
                },
                {
                    name: 'optmin'
                },
                {
                    name: 'optmax'
                },
                {
                    convert: function(v, rec) {
                        return rec.data.bandwidth.min;
                    },
                    name: 'bandmin',
                    sortType: 'asInt'
                },
                {
                    convert: function(v, rec) {
                        return rec.data.bandwidth.max;
                    },
                    name: 'bandmax',
                    sortType: 'asInt'
                },
                {
                    name: 'optmid'
                },
                {
                    name: 'lasthit'
                },
                {
                    name: 'lastupdate'
                }
            ]
        }, cfg)]);
    }
});