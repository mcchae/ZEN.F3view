
Ext.define('NFW2.store.store_monitor_packet_list', {
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
            groupField: 'name',
            storeId: 'store_monitor_packet_list',
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
                    name: 'start_time'
                },
                {
                    name: 'iface'
                },
                {
                    name: 'packet_count'
                },
                {
                    name: 'filter'
                },
                {
                    name: 'status'
                },
                {
                    name: 'id'
                },
                {
                    name: 'use'
                },
                {
                    name: 'progress'
                }
            ]
        }, cfg)]);
    }
});