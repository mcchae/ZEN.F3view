
Ext.define('NFW2.store.store_object_service_port_list', {
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
            storeId: 'store_object_service_port_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('with_cid'),
                    cond: Ext.encode({
                        _kind: 'object_service_port'
                    }),
                    sort_list: Ext.encode([
                        [
                            'name',
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
            },
            fields: [
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
                    name: 'protocol'
                },
                {
                    name: '@cid'
                },
                {
                    name: 'lasthit'
                },
                {
                    name: 'lastupdate'
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
        setTimeout(function(){ Ext.getCmp("servicePort").setWidth('100%'); },100);
    }

});