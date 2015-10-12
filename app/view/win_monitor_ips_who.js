
Ext.define('NFW2.view.win_monitor_ips_who', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_monitor_ips_who',

    requires: [
        'NFW2.view.win_monitor_ips_whoViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.TextArea'
    ],

    viewModel: {
        type: 'win_monitor_ips_who'
    },
    cls: 'zen_win',
    height: 280,
    id: 'win_monitor_ips_who',
    scrollable: true,
    width: 480,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    height: 200,
                    id: 'monitor_whois_con',
                    width: 450,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '8 0 0 10',
                            items: [
                                {
                                    xtype: 'label',
                                    width: 100,
                                    text: 'IP'
                                },
                                {
                                    xtype: 'label',
                                    id: 'whois_ip',
                                    margin: '0 0 0 5'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '8 0 10 0',
                            scrollable: true,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    flex: 1,
                                    id: 'whois_area',
                                    labelSeparator: ' ',
                                    readOnly: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_monitor_ips_whoAfterRender',
        resize: 'onWin_monitor_ips_whoResize'
    },

    onWin_monitor_ips_whoAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('win_monitor_ips_who');
        me.setTitle(__zen('whois'));
        Ext.getCmp('whois_ip').setText(me.val);

        var _params = {
            command_name : Ext.encode('whois'),
            args : Ext.encode(["-h","whois.krnic.or.kr",me.val])
        };

        // showCompLoadMask(Ext.getCmp('win_monitor_ips_who'));
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execBusyBoxCmd',
            _params,

            function(response){
                //         hideLoadMask();
                var data = "";
                if(response !== ""){
                    for(var i in response){
                        data += response[i];
                        data += "\n";
                    }
                }
                else{
                    data += get_msg('err_whois');
                }

                Ext.getCmp('whois_area').setValue(data);
            }
        );
    },

    onWin_monitor_ips_whoResize: function(window, width, height, eOpts) {
        Ext.getCmp('monitor_whois_con').setHeight(window.height-60);
        Ext.getCmp('monitor_whois_con').setWidth(window.width-30);
        Ext.getCmp('win_monitor_ips_who').doLayout();
    }

});