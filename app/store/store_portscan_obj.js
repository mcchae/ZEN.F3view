
Ext.define('NFW2.store.store_portscan_obj', {
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
            storeId: 'store_portscan_obj',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    show_type: Ext.encode('src'),
                    etc_info: Ext.encode({
                        port_scan: true,
                        skip_iprange: true
                    }),
                    limit: Ext.encode(null)
                },
                url: '/api/ftuctrl/findObjectList',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list'
                }
            },
            listeners: {
                load: {
                    fn: me.onJsonpstoreLoad,
                    scope: me
                }
            },
            fields: [
                {
                    convert: function(v, rec) {
                        return rec.get("otype")+":"+v;
                    },
                    name: 'cid'
                },
                {
                    name: 'name'
                },
                {
                    name: 'otype'
                }
            ]
        }, cfg)]);
    },

    onJsonpstoreLoad: function(store, records, successful, eOpts) {
        var me = Ext.getCmp("portscan");

        var re = [];

        if(me.type === "src"){

            var record = me.s_record;

            for(var i=0; i<store.getCount(); i++){

                var cid = store.data.items[i].data.cid;

                if(!record[cid]){
                    re.push(store.data.items[i]);
                }
            }

            store.loadData(re);


        }else if(me.type === "dest"){

            var record = me.d_record;

            for(var i=0; i<store.getCount(); i++){

                var cid = store.data.items[i].data.cid;

                if(!record[cid]){
                    re.push(store.data.items[i]);
                }
            }

            store.loadData(re);
        }
    }

});