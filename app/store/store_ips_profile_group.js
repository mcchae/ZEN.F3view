
Ext.define('NFW2.store.store_ips_profile_group', {
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
            storeId: 'store_ips_profile_group',
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('ips_group'),
                    start_group_id: Ext.encode(0)
                },
                url: '/api/ftuctrl/getIPSGroup',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: '@id'
                },
                {
                    convert: function(v, rec) {
                        if(rec.data['@id'] === 1){ return __zen('dos_ddos'); }
                        if(rec.data['@id'] === 2){ return __zen('web'); }
                        if(rec.data['@id'] === 3){ return __zen('app_attack'); }
                        if(rec.data['@id'] === 4){ return __zen('protocol_anomaly'); }
                        if(rec.data['@id'] === 5){ return __zen('info_acquisite'); }
                        if(rec.data['@id'] === 6){ return __zen('overflow'); }
                        if(rec.data['@id'] === 7){ return __zen('warm'); }
                        if(rec.data['@id'] === 8){ return __zen('etc'); }

                        return v;
                    },
                    name: 'group_name'
                },
                {
                    name: 'count'
                }
            ]
        }, cfg)]);
    }
});