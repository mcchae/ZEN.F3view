
Ext.define('NFW2.store.store_filesystem_info', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_filesystem_info',
            fields: [
                {
                    name: 'Available'
                },
                {
                    name: 'Used'
                },
                {
                    name: 'Name'
                },
                {
                    name: 'Mounted_on'
                },
                {
                    name: 'blocks'
                },
                {
                    name: 'Use'
                }
            ]
        }, cfg)]);
    }
});