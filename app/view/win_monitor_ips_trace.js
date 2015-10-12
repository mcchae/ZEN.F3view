
Ext.define('NFW2.view.win_monitor_ips_trace', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_monitor_ips_trace',

    requires: [
        'NFW2.view.win_monitor_ips_traceViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.TextArea'
    ],

    viewModel: {
        type: 'win_monitor_ips_trace'
    },
    cls: 'zen_win',
    height: 280,
    id: 'win_monitor_ips_trace',
    scrollable: true,
    width: 480,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
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
                    height: 200,
                    id: 'monitor_trace_con',
                    margin: '0 5 0 0',
                    scrollable: true,
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
                                    id: 'trace_ip',
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
                                    id: 'trace_area',
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
        afterrender: 'onWin_monitor_ips_traceAfterRender',
        destroy: 'onWin_monitor_ips_traceDestroy',
        resize: 'onWin_monitor_ips_traceResize'
    },

    onWin_monitor_ips_traceAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('win_monitor_ips_trace');
        me.setTitle(__zen('ip_traceroute'));
        Ext.getCmp('trace_ip').setText(me.val);

        var _params = {
            command_name : Ext.encode('traceroute'),
            args : Ext.encode(['-w','1',me.val])
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execBusyBoxCmd',
            _params,

            function(response){
                me.setting = response;
                me.interval = setInterval(me.get_trace, 1000);
        //         me.get_trace();
        //         var data = "";
        //         if(response !== ""){
        //             for(var i in response){
        //                 data += response[i];
        //                 data += "\n";
        //             }
        //         }
        //         Ext.getCmp('trace_area').setValue(data);
            }
        );


    },

    onWin_monitor_ips_traceDestroy: function(component, eOpts) {
        var me = this;

        clearInterval(me.interval);
    },

    onWin_monitor_ips_traceResize: function(window, width, height, eOpts) {
        Ext.getCmp('monitor_trace_con').setHeight(window.height-60);
        Ext.getCmp('trace_area').setWidth(window.width-30);
        Ext.getCmp('win_monitor_ips_trace').doLayout();
    },

    get_trace: function() {
        var me = Ext.getCmp('win_monitor_ips_trace');

        var _params = {
            filename : Ext.encode('/ferret/tmp/traceroute.txt')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,

            function(response){
                var in_text = "";
                for(var i in response){
                    if(response[i] === "_end_of_file_"){ clearInterval(me.interval); }
                    else{
                        in_text += response[i] + "\n";
                    }
                }

                if(Ext.getCmp('trace_area')){
                    Ext.getCmp('trace_area').setValue(in_text);
                }
                var t = Ext.getCmp('trace_area');
                t1 = t.getEl().down('textarea');
                t1.dom.scrollTop = 99999;
            }
        );
    }

});