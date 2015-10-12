
Ext.define('NFW2.store.store_eth_checkbox', {
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
            storeId: 'store_eth_checkbox',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/get_pname_list',
                reader: {
                    type: 'json',
                    rootProperty: 'retval'
                }
            },
            fields: [
                {
                    name: 'name'
                }
            ],
            listeners: {
                load: {
                    fn: me.onJsonpstoreLoad,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onJsonpstoreLoad: function(store, records, successful, eOpts) {
        var i = 0;
        var eth_group = Ext.getCmp("eth_list");

        var eth_value = Ext.getCmp("eth_value").getValue();
        eth_value = (!eth_value)?"0;1;2;3":eth_value;

        var ar_value = (eth_value).split(";");


        for (var i = 0; i < records.length; i++) {

            var chk_list = Ext.create('Ext.form.field.Checkbox', {
                                boxLabel: records[i].data.name,
                                inputValue: (records[i].data.name).substring(3),
                checked:(ar_value.indexOf((records[i].data.name).substring(3))!== -1)?true:false
            });
            eth_group.add(chk_list);

        }

    }

});