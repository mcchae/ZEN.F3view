
Ext.define('NFW2.store.store_firewall_etc_list', {
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
            storeId: 'store_firewall_etc_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: 'firewall_etc'
                },
                url: '/api/ftuctrl/getObject',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'stateful'
                },
                {
                    name: 'multicast_forward'
                },
                {
                    name: 'voip_helper'
                },
                {
                    name: 'chk_duplicate'
                },
                {
                    name: 'duplicate_mode'
                }
            ]
        }, cfg)]);
    }
});