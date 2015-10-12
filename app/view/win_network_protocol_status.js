
Ext.define('NFW2.view.win_network_protocol_status', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_network_protocol_status',

    requires: [
        'NFW2.view.win_network_protocol_statusViewModel',
        'Ext.form.Panel',
        'Ext.form.field.TextArea'
    ],

    viewModel: {
        type: 'win_network_protocol_status'
    },
    cls: 'zen_win',
    height: 480,
    id: 'win_network_protocol_status',
    width: 480,
    title: 'RIP Status',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'network_protocol_form',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    height: 400,
                    id: 'network_protocol_con',
                    margin: '8 0 0 0',
                    width: 450,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textareafield',
                            flex: 1,
                            id: 'network_protocol',
                            readOnly: true,
                            editable: false
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_network_protocol_statusAfterRender',
        resize: 'onWin_network_protocol_statusResize'
    },

    onWin_network_protocol_statusAfterRender: function(component, eOpts) {
        var me = this;
        var func = "";
        var args = {};

        if(me.mode === "rip_status"){
            me.setTitle(__zen('rip_status'));
            func = "rip_show_status";
        }
        else if(me.mode === "ospf_neighbor"){
            me.setTitle(__zen('ospf_neighbor'));
            func = "ospf_show_neighbor";
        }
        else if(me.mode === "ospf_interface"){
            me.setTitle(__zen('ospf_inter'));
            func = "ospf_show_interface";
            args = me.args;
        }
        else if(me.mode === "ospf_database"){
            me.setTitle(__zen('ospf_database'));
            func = "ospf_show_database";
        }
        else if(me.mode === "ospf_route"){
            me.setTitle(__zen('ospf_route'));
            func = "ospf_show_route";
        }
        else if(me.mode === "bgp_neighbor"){
            me.setTitle(__zen('bgp_neighbor'));
            func = "bgp_show_neighbor";
            args = me.args;
        }
        else if(me.mode === "bgp_status"){
            me.setTitle(__zen('bgp_status'));
            func = "bgp_show_status";
        }

        var _params = {
            func_name : Ext.encode(func),
            args : Ext.encode(args)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _params,

            function(response){
                var data = "";
                if(response === ""){ data = __zen('nodata'); }
                else{ data = response; }

                if(Ext.getCmp('network_protocol')){
                    Ext.getCmp('network_protocol').setValue(data);
                }
            }
        );


    },

    onWin_network_protocol_statusResize: function(window, width, height, eOpts) {
        Ext.getCmp('network_protocol_con').setHeight(window.height-60);
        Ext.getCmp('network_protocol_con').setWidth(window.width-30);
        Ext.getCmp('win_network_protocol_status').doLayout();
    }

});