
Ext.define('NFW2.view.NFW2_firewall_ipv6_dns64', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_ipv6_dns64',

    requires: [
        'NFW2.view.NFW2_firewall_ipv6_dns64ViewModel',
        'Ext.form.Panel',
        'Ext.panel.Tool',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.form.field.Tag',
        'Ext.toolbar.Toolbar'
    ],

    config: {
        obj_d: {
            data: ''
        }
    },

    viewModel: {
        type: 'nfw2_firewall_ipv6_dns64'
    },
    cls: 'zen_body',
    id: 'NFW2_firewall_ipv6_dns64',
    width: 900,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    id: 'form_dns64',
                    bind: {
                        title: '{title}'
                    },
                    tools: [
                        {
                            xtype: 'toggleslide',
                            onText: {
                                txt: __zen('toggle_on')
                            },
                            offText: {
                                txt: __zen('toggle_off')
                            },
                            resizeHandle: false,
                            state: true,
                            id: 'chk_dns64',
                            listeners: {
                                change: 'onToolChange'
                            }
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldInfo: 'IPv6 96bit',
                                            id: 'prefix',
                                            labelCls: 'lb_req',
                                            labelSeparator: ' ',
                                            labelWidth: 140,
                                            bind: {
                                                fieldLabel: '{prefix}'
                                            },
                                            listeners: {
                                                blur: 'onPrefixBlur',
                                                focus: 'onPrefixFocus'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '0 0 0 5',
                                            text: '/96'
                                        },
                                        {
                                            xtype: 'button',
                                            focusCls: 'btn_f',
                                            cls: 'btn_t',
                                            iconCls: 'icg_help',
                                            listeners: {
                                                render: 'onButtonRender'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '10 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'tagfield',
                                            id: 'v6_eth',
                                            labelCls: 'lb_req',
                                            labelSeparator: ' ',
                                            labelWidth: 140,
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: 'store_interface',
                                            transform: 'Ext.form.field.Tag',
                                            valueField: 'name',
                                            bind: {
                                                fieldLabel: '{eth}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            focusCls: 'btn_f',
                                            cls: 'btn_t',
                                            margin: '0 0 0 3',
                                            iconCls: 'icg_help',
                                            listeners: {
                                                render: 'onButtonRender1'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    cls: 'fld_info',
                                    margin: '0 0 10 165',
                                    width: 400,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'lb_info',
                                            bind: {
                                                text: '{info1}'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'lb_info',
                                            bind: {
                                                text: '{info2}'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            cls: 'fld_msg',
                            itemId: 'fld_msg'
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_confirm',
                            iconCls: 'ft_confirm_icl',
                            bind: {
                                text: '{confirm}'
                            },
                            listeners: {
                                click: 'on_btn_confirm'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_cancel',
                            bind: {
                                text: '{cancel}'
                            },
                            listeners: {
                                click: 'on_btn_cancel'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_monitor_basicAfterRender'
    },

    onToolChange: function(tool, state) {

        var _panel = tool.up('panel');
        var _state = (state===true)?false:true;

        _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(_state);});


    },

    onPrefixBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onPrefixFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onButtonRender: function(component, eOpts) {
        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: true,
            anchor : 'left',
            cls : 'tip_box',
            shadow: false,
            border : 0,
            html:__zen('dns64_tip1')

        });
    },

    onButtonRender1: function(component, eOpts) {
        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: true,
            anchor : 'left',
            cls : 'tip_box',
            shadow: false,
            border : 0,
            html:__zen('dns64_tip2')

        });
    },

    on_btn_confirm: function(button, e, eOpts) {
        this.setObject();
    },

    on_btn_cancel: function(button, e, eOpts) {
        this.getObject();
    },

    onNFW2_monitor_basicAfterRender: function(component, eOpts) {
        hideLoadMask();

        this.getObject();

        this.fieldInfo = makeZenTip();
    },

    setObject: function() {
        var me = this;

        var chk_dns64= Ext.getCmp('chk_dns64').state;


        var obj = {};



        if(chk_dns64 === false){
            obj = {"@use":"off"};
        }else{

            var prefix = Ext.getCmp('prefix').getValue();
            var eth = Ext.getCmp('v6_eth').getValue();


        if(prefix === ""){prefix = "64:ff9b::";  Ext.getCmp('prefix').setValue(prefix);}


        if(ValidIPv6(prefix)===false){prt_errMsg(ValidIP("IPv6"),null);return false;}


        if(prefix === ""){prefix = "64:ff9b::";  Ext.getCmp('prefix').setValue(prefix);}


             if(eth.length === 0){prt_errMsg("인터페이스 " + get_msg('err_required'),null);return false;}


            obj = {
                "@use":"on",
                "@prefix":prefix+"/96",
                "@ipv6":eth
            };
        }


        var _params = {
            basename : Ext.encode('firewall_dns64'),
            obj: Ext.encode(obj)
        };


        request_helper.xmlrpc_call_JsonP('ftuctrl','setObject',_params,
                                             function(response){
                                                 console.log(response);
                                                 if(response === true){
                                                     prt_errMsg("",null);

                                                     Ext.Msg.show({
                                            title: __weguardia,
                                            msg: get_msg('msg_ok_add'),
                                            width: 300,
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.window.MessageBox.INFO
                                        });
                                                 }
                                             });



    },

    getObject: function() {

        var eth = [];

        request_helper.xmlrpc_call_JsonP('ftuctrl','get_pname_list',{option : Ext.encode('all')},function(response){

            for(var i in response){
            eth.push({

                                    name: response[i].name

                                });


            }

            var _store = Ext.data.StoreManager.lookup('store_interface');
                            _store.loadData(eth);

        });


        var _params = {
            basename : Ext.encode('firewall_dns64')
        };


        request_helper.xmlrpc_call_JsonP('ftuctrl','getObject',_params,
                                             function(response){

                                                 if(response === null || response["@use"]==="off"){
                                                     Ext.getCmp('chk_dns64').toggle();
                                                     Ext.getCmp('prefix').setValue("64:ff9b::");}
                                                 else{
                                                     Ext.getCmp('prefix').setValue(response["@prefix"].split("/")[0]);
                                                      Ext.getCmp('v6_eth').setValue(response["@ipv6"]);
                                                 }

                                             });




    }

});