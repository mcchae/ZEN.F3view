
Ext.define('NFW2.view.NFW2_monitor_basic', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_basic',

    requires: [
        'NFW2.view.NFW2_monitor_basicViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Hidden',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    config: {
        obj_d: {
            data: ''
        }
    },

    viewModel: {
        type: 'nfw2_monitor_basic'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_basic',
    width: 700,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm_monitor_basic',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            cls: 'lb_bg',
                            width: 200,
                            items: [
                                {
                                    xtype: 'label',
                                    bind: {
                                        text: '{eth_monitor}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            id: 'eth_list',
                            maxHeight: 500,
                            minHeight: 200,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            }
                        },
                        {
                            xtype: 'hiddenfield',
                            flex: 1,
                            id: 'eth_value',
                            fieldLabel: 'Label'
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

    on_btn_confirm: function(button, e, eOpts) {
        this.setObject();
    },

    on_btn_cancel: function(button, e, eOpts) {
        this.getObject();
    },

    onNFW2_monitor_basicAfterRender: function(component, eOpts) {
        this.getObject();

        var _store = Ext.data.StoreManager.lookup('store_eth_checkbox');
        _store.load();

        hideLoadMask();

    },

    setObject: function() {
        var me = this;



        var eth = "";

        var ar_eth = Ext.getCmp('eth_list').query('[checked="true"]');
        var len = ar_eth.length;

        if(len>8){prt_errMsg(__zen('eth_monitor')+ValidMaxCnt(8),null);return false;}

        for(var i=0;i<len;i++){
            eth += ";"+ar_eth[i].inputValue;

        }

        var mon = {
            eth:eth.substring(1)
        };

        var obj = {
            'mon': mon
        };


        var _params = {
            basename : Ext.encode('monitor_basic'),
            obj : Ext.encode(obj)
        };


        request_helper.xmlrpc_call_JsonP('ftuctrl','setObject',_params,

                                         function(response){

                                             Ext.Msg.alert(__weguardia,get_msg("msg_ok_add"));


                                             me.getObject();

                                         }
                                        );
    },

    getObject: function() {
        var me = this;

        var _params = {
            basename : Ext.encode('monitor_basic')
        };


        request_helper.xmlrpc_call_JsonP('ftuctrl','getObject', _params,
            function(response){


                if(!response){ return false;}

                 Ext.getCmp("eth_value").setValue(response.mon.eth);

                prt_errMsg(null,null);

          }

        );
    }

});