
Ext.define('NFW2.store.store_daships_policy_set', {
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
            pageSize: 100,
            storeId: 'store_daships_policy_set',
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/getIPSDashboardConf',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    convert: function(v, rec) {
                        if(v.indexOf('ul') !== -1){ return v; }
                        return disp_obj(v,0);
                    },
                    name: 'src'
                },
                {
                    convert: function(v, rec) {
                        if(v.indexOf('ul') !== -1){ return v; }
                        return disp_obj(v,0);
                    },
                    name: 'dest'
                },
                {
                    name: '@uid'
                },
                {
                    name: '@use'
                },
                {
                    name: 'ips'
                },
                {
                    name: '@num'
                },
                {
                    name: 'desc'
                },
                {
                    convert: function(v, rec) {
                        if(v.indexOf('ul') !== -1){ return v; }
                        return disp_obj(v,0);
                    },
                    name: 'service'
                }
            ]
        }, cfg)]);
    }
});