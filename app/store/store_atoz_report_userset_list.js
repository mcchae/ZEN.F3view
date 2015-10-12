
Ext.define('NFW2.store.store_atoz_report_userset_list', {
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
            storeId: 'store_atoz_report_userset_list',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'email'
                },
                {
                    name: 'setting'
                },
                {
                    name: 'system'
                },
                {
                    name: 'tracker'
                },
                {
                    name: 'use'
                },
                {
                    name: 'id'
                },
                {
                    name: 'report_cnt'
                },
                {
                    name: 'report'
                }
            ]
        }, cfg)]);
    }
});