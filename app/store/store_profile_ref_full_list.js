
Ext.define('NFW2.store.store_profile_ref_full_list', {
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
            storeId: 'store_profile_ref_full_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    filter_type: Ext.encode('filter_based'),
                    search_info: Ext.encode({
                        category: [
                            'All'
                        ],
                        technology: [
                            'All'
                        ],
                        purpose: [
                            'All'
                        ],
                        content_type: [
                            'All'
                        ],
                        popularity: [
                            'All'
                        ],
                        released_date: [
                            'All'
                        ],
                        vendor: [
                            'All'
                        ],
                        protocols: [
                            'All'
                        ]
                    })
                },
                url: '/api/ftuctrl/findAppList',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'category'
                },
                {
                    name: 'vendor'
                },
                {
                    name: 'released_date'
                },
                {
                    name: 'popularity'
                },
                {
                    name: 'name'
                },
                {
                    name: 'references'
                },
                {
                    name: 'descriptions'
                },
                {
                    name: 'content_type'
                },
                {
                    name: 'rid'
                },
                {
                    name: '_id'
                },
                {
                    name: 'technology'
                },
                {
                    name: 'protocols'
                },
                {
                    name: 'revision'
                },
                {
                    name: 'purpose'
                },
                {
                    name: '_type'
                }
            ]
        }, cfg)]);
    }
});