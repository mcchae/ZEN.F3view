
Ext.define('NFW2.store.store_monitor_checker_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_checker_list',
            fields: [
                {
                    name: 'interface'
                },
                {
                    name: 'link'
                },
                {
                    name: 'mpr'
                },
                {
                    name: 'status'
                },
                {
                    name: 'name'
                },
                {
                    name: 'mode'
                },
                {
                    name: 'upload'
                },
                {
                    name: 'download'
                },
                {
                    name: 'dest'
                }
            ]
        }, cfg)]);
    }
});