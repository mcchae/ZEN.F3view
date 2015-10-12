
Ext.define('NFW2.view.NFW2_waitMsg', {
    extend: 'Ext.window.Window',
    alias: 'widget.nfw2_waitmsg',

    requires: [
        'NFW2.view.NFW2_waitMsgViewModel',
        'Ext.form.Label',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_waitmsg'
    },
    cls: 'zen_win',
    height: 460,
    id: 'NFW2_waitMsg',
    width: 450,
    closable: false,
    title: 'WeGuardia™ ZEN',
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center',
                        padding: 10
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'mt_infoBoldBlack',
                            hidden: true,
                            id: 'lb_policy_status',
                            margin: 5
                        },
                        {
                            xtype: 'container',
                            set_send_data: function() {
                                var me = Ext.getCmp('NFW2_waitMsg');
                                me.get_sendMsg();
                            },
                            flex: 1,
                            autoScroll: true,
                            cls: 'box_send_policy',
                            height: 340,
                            id: 'fta_state',
                            margin: 10,
                            padding: 15,
                            width: 410
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'label',
                    cls: 'lb_info',
                    hidden: true,
                    id: 'lb_policyInfo',
                    margin: '5 5 5 30',
                    bind: {
                        text: '{recon}'
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
                    flex: 1
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    id: 'btn_exit',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onBtn_exitClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_waitMsgAfterRender',
        beforedestroy: 'onNFW2_waitMsgBeforeDestroy'
    },

    onBtn_exitClick: function(button, e, eOpts) {
        clearInterval(Ext.getCmp('fta_state').interval);
        this.close();

    },

    onNFW2_waitMsgAfterRender: function(component, eOpts) {
        // Ext.getCmp('lb_policy_status').setText(get_msg('msg_send_wait'));
        this.getViewModel().setData({
                recon: __zen('msg_send_recon'),
                confirm: __zen('confirm')
            });

        //Ext.getCmp('btn_sendpolicy').setDisabled(true);
        this.load_sendMsg();

    },

    onNFW2_waitMsgBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('fta_state').interval);
    },

    get_sendMsg: function() {
        var me = this;


        request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getSendPolicyMsg',
                {},
                function(response){

                    var _policyMessage = "";

                    console.log("mxxxxx",response.sendpolicy_rt,response);

                    if(response.contents.length===0){
                        _policyMessage  = get_msg("msg_send_null");
                        Ext.getCmp('fta_state').update(_policyMessage);
                        Ext.getCmp('btn_sendpolicy').setDisabled(false);

                        clearInterval(Ext.getCmp('fta_state').interval);
                    }else{


                        for(var i in response.contents){

                            _policyMessage += response.contents[i]+'<p>';
                        }


                        Ext.getCmp('fta_state').update(_policyMessage);



                        if(response.sendpolicy_rt===2 || response.sendpolicy_rt===-1){ /*정책전송 완료 or 실패*/

                            //Ext.getCmp('btn_sendpolicy').setDisabled(false);

                            clearInterval(Ext.getCmp('fta_state').interval);
                        }

                    }


        });

    },

    load_sendMsg: function() {
         Ext.getCmp('fta_state').set_send_data();

            var chk_send_time = Number(2);

            Ext.getCmp('fta_state').interval = setInterval(send_count_time, 1000);

            function send_count_time(){
                chk_send_time--;
                if(chk_send_time === 0){ chk_send_time = Number(2); Ext.getCmp('fta_state').set_send_data(); }

            }
    }

});