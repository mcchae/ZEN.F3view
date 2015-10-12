
Ext.define('NFW2.view.win_dboard_set', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_dboard_set',

    requires: [
        'NFW2.view.win_dboard_setViewModel',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Display',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_dboard_set'
    },
    cls: 'zen_win',
    height: 600,
    width: 500,
    bodyPadding: 20,
    modal: true,
    defaultListenerScope: true,

    bind: {
        title: '{monitor}'
    },
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
                    margin: '0 40 0 0',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_comm_cpu',
                            boxLabel: 'CPU'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_comm_mem',
                            boxLabel: '메모리'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_comm_tx',
                            boxLabel: 'TX (bps)'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_comm_rx',
                            boxLabel: 'RX (bps)'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_comm_disk1',
                            boxLabel: '디스크1'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_comm_disk2',
                            boxLabel: '디스크2'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_comm_ses',
                            boxLabel: '방화벽 세션'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_comm_allow',
                            boxLabel: '방화벽 거부 패킷'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_comm_deny',
                            boxLabel: '방화벽 차단 세션'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_ddos_detect',
                            boxLabel: '탐지'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_ddos_block',
                            boxLabel: '차단'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_ipsec_tunnel',
                            boxLabel: '터널'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_ipsec_en',
                            boxLabel: '암호화'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_ipsec_de',
                            boxLabel: '복호화'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_ssl_tunnel',
                            boxLabel: '터널'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_ips_detect',
                            boxLabel: '탐지'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_ips_block',
                            boxLabel: '차단'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_av_detect',
                            boxLabel: '탐지'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_av_block',
                            boxLabel: '차단'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_as_detect',
                            boxLabel: '탐지'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_as_block',
                            boxLabel: '차단'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'displayfield',
                    id: 'win_dboard_set_total',
                    bind: {
                        fieldLabel: '{selected_cnt}'
                    }
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
                        click: 'onButtonClick1'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onButtonClick1: function(button, e, eOpts) {
        this.setObject();
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        this.getObject();
        chk_zenauth(null);
        Ext.getCmp('chk_comm_mem').setBoxLabel(__zen('memory'));
        Ext.getCmp('chk_comm_disk1').setBoxLabel(__zen('disk')+'1 (Root)');
        Ext.getCmp('chk_comm_disk2').setBoxLabel(__zen('disk')+'2 (Log)');
        Ext.getCmp('chk_comm_ses').setBoxLabel(__zen('fw_session'));
        Ext.getCmp('chk_comm_allow').setBoxLabel(__zen('fw_drop'));
        Ext.getCmp('chk_comm_deny').setBoxLabel(__zen('fw_deny'));
        Ext.getCmp('chk_ddos_detect').setBoxLabel('DDoS '+__zen('detect'));
        Ext.getCmp('chk_ddos_block').setBoxLabel('DDoS '+__zen('deny'));
        Ext.getCmp('chk_ipsec_tunnel').setBoxLabel('IPSec '+__zen('tunnel'));
        Ext.getCmp('chk_ipsec_en').setBoxLabel(__zen('encryption')+' (bps)');
        Ext.getCmp('chk_ipsec_de').setBoxLabel(__zen('decryption')+' (bps)');
        Ext.getCmp('chk_ssl_tunnel').setBoxLabel('SSL '+__zen('tunnel'));
        Ext.getCmp('chk_ips_detect').setBoxLabel('IPS '+__zen('detect'));
        Ext.getCmp('chk_ips_block').setBoxLabel('IPS '+__zen('deny'));
        Ext.getCmp('chk_av_detect').setBoxLabel(__zen('av')+" "+__zen('detect'));
        Ext.getCmp('chk_av_block').setBoxLabel(__zen('av')+" "+__zen('deny'));
        Ext.getCmp('chk_as_detect').setBoxLabel(__zen('as')+" "+__zen('detect'));
        Ext.getCmp('chk_as_block').setBoxLabel(__zen('as')+" "+__zen('deny'));
        Ext.getCmp('win_dboard_set_total').setFieldLabel(__zen('selected_cnt'));
        this.getViewModel().setData({
            monitor: __zen('monitor'),
            confirm: __zen('confirm'),
            cancel: __zen('cancel')
        });
    },

    getObject: function() {
        var _me = Ext.getCmp('NFW2_client');

        var zenLicense= _me.zenLicense;

        var _params = {
            basename : Ext.encode('monitor_dashboard')
        };


        request_helper.xmlrpc_call_JsonP('ftuctrl','getObject',_params,

                                         function(response){

                                             console.log("dashboard_set",response);

                                             if(response === null){

                                                 Ext.getCmp("chk_comm_cpu").setValue(true);
                                                 Ext.getCmp("chk_comm_mem").setValue(true);
                                                 Ext.getCmp("chk_comm_tx").setValue(true);
                                                 Ext.getCmp("chk_comm_rx").setValue(true);
                                                 Ext.getCmp("chk_comm_ses").setValue(true);
                                                 Ext.getCmp("chk_comm_deny").setValue(true);
                                                 Ext.getCmp("chk_comm_allow").setValue(true);
                                                 Ext.getCmp("chk_ipsec_tunnel").setValue(true);



                                             }else{



                                                 Ext.getCmp("chk_comm_cpu").setValue(response.summary.chk_comm_cpu);
                                                 Ext.getCmp("chk_comm_mem").setValue(response.summary.chk_comm_mem);
                                                 Ext.getCmp("chk_comm_tx").setValue(response.summary.chk_comm_tx);
                                                 Ext.getCmp("chk_comm_rx").setValue(response.summary.chk_comm_rx);
                                                 Ext.getCmp("chk_comm_disk1").setValue(response.summary.chk_comm_disk1);
                                                 Ext.getCmp("chk_comm_disk2").setValue(response.summary.chk_comm_disk2);
                                                 Ext.getCmp("chk_comm_ses").setValue(response.summary.chk_comm_ses);
                                                 Ext.getCmp("chk_comm_deny").setValue(response.summary.chk_comm_deny);
                                                 Ext.getCmp("chk_comm_allow").setValue(response.summary.chk_comm_allow);
                                                 Ext.getCmp("chk_ipsec_tunnel").setValue(response.summary.chk_ipsec_tunnel);
                                                 Ext.getCmp("chk_ipsec_en").setValue(response.summary.chk_ipsec_en);
                                                 Ext.getCmp("chk_ipsec_de").setValue(response.summary.chk_ipsec_de);
                                                 Ext.getCmp("chk_ssl_tunnel").setValue(response.summary.chk_ssl_tunnel);
                                                 Ext.getCmp("chk_ips_block").setValue(response.summary.chk_ips_block);
                                                 Ext.getCmp("chk_ips_detect").setValue(response.summary.chk_ips_detect);
                                                 Ext.getCmp("chk_ddos_block").setValue(response.summary.chk_ddos_block);
                                                 Ext.getCmp("chk_ddos_detect").setValue(response.summary.chk_ddos_detect);
                                                 Ext.getCmp("chk_av_block").setValue(response.summary.chk_av_block);
                                                 Ext.getCmp("chk_av_detect").setValue(response.summary.chk_av_detect);
                                                 Ext.getCmp("chk_as_block").setValue(response.summary.chk_as_block);
                                                 Ext.getCmp("chk_as_detect").setValue(response.summary.chk_as_detect);

                                             }

                                             Ext.getCmp('win_dboard_set_total').setValue(Ext.ComponentQuery.query("checkbox[checked]").length);

                                         }
                                        );


        if(zenLicense.ipsec !== "on"){
            Ext.getCmp("chk_ipsec_en").hide();
            Ext.getCmp("chk_ipsec_de").hide();
        }

        if(zenLicense.ssl !== "on"){
            Ext.getCmp("chk_ssl_tunnel").hide();
        }

        if(zenLicense.ips !== "on"){
            Ext.getCmp("chk_ips_block").hide();
            Ext.getCmp("chk_ips_detect").hide();
        }

        if(zenLicense.av !== "on"){
            Ext.getCmp("chk_av_block").hide();
            Ext.getCmp("chk_av_detect").hide();
        }

        if(zenLicense.as !== "on"){
            Ext.getCmp("chk_as_block").hide();
            Ext.getCmp("chk_as_detect").hide();
        }



    },

    setObject: function() {
        var me = this;


        if(Ext.ComponentQuery.query("checkbox[checked]").length > 9){
            Ext.Msg.alert(__weguardia,sel_max_count(9)); return false;
        }


        var summary = {
            chk_comm_cpu: Ext.getCmp('chk_comm_cpu').getValue(),
            chk_comm_mem: Ext.getCmp('chk_comm_mem').getValue(),
            chk_comm_tx: Ext.getCmp('chk_comm_tx').getValue(),
            chk_comm_rx: Ext.getCmp('chk_comm_rx').getValue(),
            chk_comm_disk1: Ext.getCmp('chk_comm_disk1').getValue(),
            chk_comm_disk2: Ext.getCmp('chk_comm_disk2').getValue(),
            chk_comm_ses: Ext.getCmp('chk_comm_ses').getValue(),
            chk_comm_deny: Ext.getCmp('chk_comm_deny').getValue(),
            chk_comm_allow: Ext.getCmp('chk_comm_allow').getValue(),
            chk_ddos_block: Ext.getCmp('chk_ddos_block').getValue(),
            chk_ddos_detect: Ext.getCmp('chk_ddos_detect').getValue(),
            chk_ipsec_tunnel: Ext.getCmp('chk_ipsec_tunnel').getValue(),
            chk_ipsec_en: Ext.getCmp('chk_ipsec_en').getValue(),
            chk_ipsec_de: Ext.getCmp('chk_ipsec_de').getValue(),
            chk_ssl_tunnel: Ext.getCmp('chk_ssl_tunnel').getValue(),
            chk_ips_block: Ext.getCmp('chk_ips_block').getValue(),
            chk_ips_detect: Ext.getCmp('chk_ips_detect').getValue(),
            chk_av_block: Ext.getCmp('chk_av_block').getValue(),
            chk_av_detect: Ext.getCmp('chk_av_detect').getValue(),
            chk_as_block: Ext.getCmp('chk_as_block').getValue(),
            chk_as_detect: Ext.getCmp('chk_as_detect').getValue()
        };

        var obj = {
            'summary': summary
        };

        var _params = {
            basename : Ext.encode('monitor_dashboard'),
            obj : Ext.encode(obj)
        };


        request_helper.xmlrpc_call_JsonP('ftuctrl','setObject',_params,

                                         function(response){

                                             me.close();


                                             Ext.getCmp('NFW2_dboard').get_quickdata();


                                         }
                                        );
    }

});