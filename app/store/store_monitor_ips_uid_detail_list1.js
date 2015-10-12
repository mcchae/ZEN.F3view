
Ext.define('NFW2.store.store_monitor_ips_uid_detail_list1', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_ips_uid_detail_list1',
            fields: [
                {
                    name: 'ip'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'detect'
                },
                {
                    name: 'block'
                },
                {
                    name: 'percent'
                },
                {
                    name: 'id'
                },
                {
                    name: 'details'
                }
            ]
        }, cfg)]);
    }
});