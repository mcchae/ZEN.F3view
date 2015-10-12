
Ext.define('NFW2.store.store_antispam_spam', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_antispam_spam',
            fields: [
                {
                    name: '@num',
                    sortType: 'asInt'
                },
                {
                    name: 'type'
                },
                {
                    name: 'filter'
                },
                {
                    name: 'action'
                },
                {
                    convert: function(v, rec) {
                        return rec.data['@num'];
                    },
                    name: 'sort_num'
                }
            ]
        }, cfg)]);
    }
});