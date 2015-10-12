
Ext.define('NFW2.store.store_spd_ipv6_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pageSize: 100,
            storeId: 'store_spd_ipv6_list',
            autoLoad: false,
            fields: [
                {
                    type: 'int',
                    name: '@num'
                },
                {
                    name: '@uid',
                    sortType: 'asInt'
                },
                {
                    name: '@use'
                },
                {
                    convert: function(v, rec) {

                        return v["@cross_spd"];
                    },
                    mapping: 'etc',
                    name: 'cross_spd'
                },
                {
                    name: 'desc'
                },
                {
                    convert: function(v, rec) {
                        return disp_obj(v,0);
                    },
                    name: 'src'
                },
                {
                    convert: function(v, rec) {
                        return disp_obj(v,0);
                    },
                    name: 'dest'
                },
                {
                    convert: function(v, rec) {
                        return disp_obj(v,1);
                    },
                    name: 'service'
                },
                {
                    convert: function(v, rec) {
                        return v["@action"];
                    },
                    mapping: 'etc',
                    name: 'action'
                },
                {
                    convert: function(v, rec) {
                        return v["@timeout"];
                    },
                    mapping: 'etc',
                    name: 'timeout',
                    sortType: 'asInt'
                },
                {
                    convert: function(v, rec) {
                        return v["@loglevel"];
                    },
                    mapping: 'etc',
                    name: 'loglevel'
                },
                {
                    convert: function(v, rec) {
                        return v["#text"];
                    },
                    name: 'schedule'
                },
                {
                    convert: function(v, rec) {
                        return v["#text"];
                    },
                    name: 'header'
                },
                {
                    sortType: function(value) {
                        return ((value.qos["#text"]!=="")?1:"")+((value.session["#text"]!=="")?2:"");
                    },
                    name: 'resource'
                },
                {
                    sortType: function(value) {
                        return (value.ips["#text"]!=="")?1:"";
                    },
                    name: 'profile'
                },
                {
                    convert: function(v, rec) {
                        return v["@date"] + " "+((v["@time"]!=="")?v["@time"]+":00":"");
                    },
                    name: 'expire'
                },
                {
                    name: 'lasthit'
                }
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('firewall_filter_ipv6'),
                    sort_list: Ext.encode([
                        [
                            '@num',
                            1
                        ]
                    ])
                },
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            }
        }, cfg)]);
    }
});