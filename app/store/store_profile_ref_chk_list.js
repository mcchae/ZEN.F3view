
Ext.define('NFW2.store.store_profile_ref_chk_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_profile_ref_chk_list',
            fields: [
                {
                    name: 'category'
                },
                {
                    name: 'technology'
                },
                {
                    name: 'purpose'
                },
                {
                    name: 'content_type'
                },
                {
                    name: 'popularity'
                },
                {
                    name: 'vendor'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'released_date'
                },
                {
                    name: 'name'
                },
                {
                    name: 'rid'
                },
                {
                    name: '_id'
                },
                {
                    name: 'revision'
                },
                {
                    name: 'references'
                },
                {
                    name: 'descriptions'
                },
                {
                    name: '_type'
                }
            ]
        }, cfg)]);
    }
});