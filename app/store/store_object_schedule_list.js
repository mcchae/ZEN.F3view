
Ext.define('NFW2.store.store_object_schedule_list', {
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
            pageSize: 100,
            storeId: 'store_object_schedule_list',
            autoLoad: false,
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
                    name: 'month'
                },
                {
                    name: 'day'
                },
                {
                    name: 'week_list'
                },
                {
                    name: 'period'
                },
                {
                    name: 'time'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'lasthit'
                },
                {
                    name: 'lastupdate'
                }
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('object_schedule'),
                    //'cond': Ext.encode({'_kind':"object_schedule"}),
                    sort_list: Ext.encode([
                        [
                            '@num',
                            1
                        ]
                    ])
                },
                url: '/api/ftuctrl/getObjectList',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            listeners: {
                beforeload: {
                    fn: me.onDirectstoreBeforeLoad,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onDirectstoreBeforeLoad: function(store, operation, eOpts) {

    }

});