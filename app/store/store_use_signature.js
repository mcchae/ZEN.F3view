
Ext.define('NFW2.store.store_use_signature', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_use_signature',
            fields: [
                {
                    name: '@fsid'
                },
                {
                    name: '@type'
                },
                {
                    name: 'signature_name'
                },
                {
                    name: 'hazard'
                },
                {
                    name: 'detection_num'
                },
                {
                    name: 'detection_time'
                },
                {
                    name: 'block_time'
                },
                {
                    name: 'block_type'
                },
                {
                    name: 'group_id'
                },
                {
                    name: '_num'
                },
                {
                    name: 'signature_list'
                },
                {
                    name: 'action'
                },
                {
                    name: '_id'
                },
                {
                    name: 'audit'
                },
                {
                    name: 'use'
                }
            ]
        }, cfg)]);
    }
});