
Ext.define('NFW2.store.store_antivirus_list', {
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
            storeId: 'store_antivirus_list',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('anti_virus')
                },
                url: '/api/ftuctrl/getObjectList',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'name'
                },
                {
                    name: '@cid'
                },
                {
                    name: 'mail'
                },
                {
                    name: 'http'
                },
                {
                    name: 'ftp'
                },
                {
                    name: '@num',
                    sortType: 'asInt'
                },
                {
                    convert: function(v, rec) {
                        return rec.data.mail.filter.length;
                    },
                    name: 'mailfiter'
                },
                {
                    convert: function(v, rec) {
                        return rec.data.ftp.filter.length;
                    },
                    name: 'ftpfilter'
                }
            ]
        }, cfg)]);
    }
});