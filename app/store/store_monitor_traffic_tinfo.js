
Ext.define('NFW2.store.store_monitor_traffic_tinfo', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_traffic_tinfo',
            fields: [
                {
                    name: 'eth0'
                },
                {
                    name: 'eth1'
                },
                {
                    name: 'eth2'
                },
                {
                    name: 'eth3'
                },
                {
                    name: 'eth4'
                },
                {
                    name: 'eth5'
                },
                {
                    name: 'eth6'
                },
                {
                    name: 'eth7'
                },
                {
                    name: 'tit1'
                },
                {
                    name: 'tit2'
                },
                {
                    name: 'tit3'
                },
                {
                    name: 'rowspan'
                },
                {
                    name: 'rowspan1'
                }
            ]
        }, cfg)]);
    }
});