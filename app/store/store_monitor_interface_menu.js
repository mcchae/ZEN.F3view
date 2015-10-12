
Ext.define('NFW2.store.store_monitor_interface_menu', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_monitor_interface_menu',
            data: [
                {
                    name: '링크 Up',
                    val: 'yes'
                },
                {
                    name: '전체',
                    val: 'no'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});