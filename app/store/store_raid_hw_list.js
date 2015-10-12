
Ext.define('NFW2.store.store_raid_hw_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_raid_hw_list',
            autoLoad: false,
            fields: [
                {
                    name: 'slave'
                },
                {
                    name: 'name'
                },
                {
                    name: '_num',
                    sortType: 'asInt'
                },
                {
                    name: 'prim'
                },
                {
                    name: 'mode'
                },
                {
                    name: 'p_hdd'
                },
                {
                    name: 's_hdd'
                }
            ]
        }, cfg)]);
    }
});