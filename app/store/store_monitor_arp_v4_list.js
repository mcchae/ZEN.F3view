
Ext.define('NFW2.store.store_monitor_arp_v4_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pageSize: 1000,
            storeId: 'store_monitor_arp_v4_list',
            fields: [
                {
                    name: '@num',
                    sortType: 'asInt'
                },
                {
                    convert: function(v, rec) {
                        // var data = [];
                        // var temp = rec.data.split(' ');
                        // for(var j in temp){
                        //     if(temp[j] !== ""){ data.push(temp[j]); }
                        // }
                        // console.log(data[5]);
                        return v;//data[5];
                    },
                    name: 'interface'
                },
                {
                    convert: function(v, rec) {
                        // var data = [];
                        // var temp = rec.data.split(' ');
                        // for(var j in temp){
                        //     if(temp[j] !== ""){ data.push(temp[j]); }
                        // }
                        return v;//data[0];
                    },
                    name: 'ip'
                },
                {
                    convert: function(v, rec) {
                        // var data = [];
                        // var temp = rec.data.split(' ');
                        // for(var j in temp){
                        //     if(temp[j] !== ""){ data.push(temp[j]); }
                        // }
                        return v;//data[3];
                    },
                    name: 'mac'
                },
                {
                    convert: function(v, rec) {
                        // var data = [];
                        // var temp = rec.data.split(' ');
                        // for(var j in temp){
                        //     if(temp[j] !== ""){ data.push(temp[j]); }
                        // }
                        return v;//data[2];
                    },
                    name: 'flags'
                },
                {
                    convert: function(v, rec) {
                        // var data = [];
                        // var temp = rec.data.split(' ');
                        // for(var j in temp){
                        //     if(temp[j] !== ""){ data.push(temp[j]); }
                        // }
                        return v;//data[1];
                    },
                    name: 'hw'
                }
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    filename: Ext.encode('/proc/net/arp'),
                    start: Ext.encode(1),
                    limit: Ext.encode(1000)
                },
                url: '/api/ftuctrl/getFileContent',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total-1'
                }
            }
        }, cfg)]);
    }
});