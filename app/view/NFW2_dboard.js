
Ext.define('NFW2.view.NFW2_dboard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_dboard',

    requires: [
        'NFW2.view.NFW2_dboardViewModel',
        'NFW2.view.NFW2_dboardViewController',
        'Ext.panel.Panel',
        'Ext.button.Button',
        'Ext.XTemplate',
        'Ext.view.View',
        'Ext.form.Label',
        'Ext.form.field.Text'
    ],

    config: {
        quick_data: {
            
        },
        quick_log: {
            
        }
    },

    controller: 'nfw2_dboard',
    viewModel: {
        type: 'nfw2_dboard'
    },
    id: 'NFW2_dboard',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'panel',
            height: 450,
            id: 'pnl_dboard_top',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    id: 'pnl_dboard_chart',
                    margin: '0 10',
                    items: [
                        {
                            xtype: 'container',
                            cls: 'd_tit_summary',
                            id: 'd_tit',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'btn_nn_set',
                                    margin: '0 0 0 170',
                                    listeners: {
                                        click: {
                                            fn: 'onButtonClick111',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    set_summary_data: function() {


                                        var me = Ext.getCmp('NFW2_dboard');
                                        me.get_summary();

                                    },
                                    cls: 'dv_timecount',
                                    html: '10',
                                    id: 'summary_timeout',
                                    margin: '0 0 0 20',
                                    width: 55
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'd_frame',
                            height: 393,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox',
                                        padding: 15
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            data: {
                                                now: '',
                                                max: ''
                                            },
                                            height: 30,
                                            id: 'tbl_sum_header',
                                            tpl: [
                                                '<table class="tbl_summary_tit"><tr><td class="hed"></td><td>{now}</td><td>{max}</td></tr></table>'
                                            ]
                                        },
                                        {
                                            xtype: 'dataview',
                                            autoScroll: true,
                                            id: 'd_chart_grid',
                                            itemSelector: 'div.dv_summary',
                                            itemTpl: Ext.create('Ext.XTemplate', 
                                                '<tpl for=".">',
                                                '    <div class="dv_summary">',
                                                '        <table class="tbl_summary"><tr><td class="hed">{category}</td>',
                                                '            <td>{now:this.chgAddComma}</td>',
                                                '            <td title="{time}">{max:this.chgAddComma}</td>',
                                                '            </tr></table>',
                                                '    </div>',
                                                '</tpl>',
                                                {
                                                    chgAddComma: function(cnt) {
                                                        return addComma(cnt);
                                                    }
                                                }
                                            ),
                                            store: 'store_quickboard',
                                            listeners: {
                                                itemclick: 'onD_chart_gridItemClick'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margin: 5,
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'd_chart_info',
                                            id: 'd_chart_info',
                                            tpl: [
                                                '{category} {[__zen(\'max_yesterday\')]} : {y_max} {[__zen(\'max_today\')]} : {max}{time}'
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            html: '<div id="chart_area" style="margin-left:-25;width:520px;height:330px;"></div>',
                                            id: 'd_chart_area',
                                            listeners: {
                                                afterrender: 'onD_chart_areaAfterRender',
                                                beforedestroy: 'onD_chart_areaBeforeDestroy',
                                                resize: 'onD_chart_areaResize'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    listeners: {
                        resize: 'onPnl_dboard_chartResize'
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'panel',
                    dock: 'right',
                    id: 'pnl_dboard_alert',
                    margin: '0 10 0 0',
                    width: 400,
                    items: [
                        {
                            xtype: 'container',
                            cls: 'd_tit_alert',
                            items: [
                                {
                                    xtype: 'container',
                                    set_alarm_data: function() {


                                        var me = Ext.getCmp('NFW2_dboard');
                                        me.get_alarmMsg();

                                    },
                                    cls: 'dv_timecount',
                                    html: '10',
                                    id: 'alarm_timeout',
                                    margin: '0 0 0 330',
                                    width: 55
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'd_frame',
                            items: [
                                {
                                    xtype: 'dataview',
                                    autoScroll: true,
                                    height: 390,
                                    id: 'ct_alert_list',
                                    padding: 5,
                                    itemSelector: '.tbl_alert',
                                    itemTpl: [
                                        '<tpl for=".">',
                                        '    <table class="tbl_alert"><tr><td class="line"></td><td>',
                                        '        <!-- <div class="alert_lv{code}"></div>-->',
                                        '        <div class="t_date">{date} </div>',
                                        '         <div class="t_cont">{desc} </div>',
                                        '        </td></tr></table>',
                                        '</tpl>'
                                    ],
                                    store: 'store_alarm',
                                    listeners: {
                                        itemclick: 'onCt_alert_listItemClick'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    autoScroll: true,
                                    cls: 't_cont_detail',
                                    height: 90,
                                    hidden: true,
                                    id: 'ct_alert_detail',
                                    tpl: [
                                        '<div>{date}</div>',
                                        '<div>{desc}</div>',
                                        '',
                                        '<table>',
                                        '    <tr><td>{[__zen(\'src\')]}</td><td>{sip}({sport})</td><td>{[__zen(\'dest\')]}</td><td>{dip}({dport})</td></tr>',
                                        '    <tr><td>{[__zen(\'protocol\')]}</td><td>{protocol}</td><td></td><td></td></tr>',
                                        '</table>'
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            id: 'pnl_dboard_block',
            margin: '0 10',
            items: [
                {
                    xtype: 'container',
                    cls: 'd_tit_license'
                },
                {
                    xtype: 'container',
                    cls: 'd_frame',
                    height: 280,
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'container',
                            id: 'd_fw',
                            margin: '0 10 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_nn_set',
                                            listeners: {
                                                click: {
                                                    fn: 'onButtonClick3',
                                                    scope: 'controller'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_nn_monitor'
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_nn_log'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'd_license_fw',
                                    id: 'd_license_fw',
                                    overCls: 'd_license_fw_ov',
                                    listeners: {
                                        click: {
                                            fn: 'onButtonClick2',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_license',
                                    id: 'lb_dboard_lic_fw'
                                },
                                {
                                    xtype: 'toggleslide',
                                    state: true,
                                    cls: 'custom-color',
                                    id: 'btn_dboard_lic_fw',
                                    listeners: {
                                        change: {
                                            fn: 'onButtonChange',
                                            scope: 'controller'
                                        },
                                        beforechange: {
                                            fn: 'onBtn_dboard_lic_fwBeforeChange',
                                            scope: 'controller'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'd_ips',
                            margin: '0 10 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'd_license_ips',
                                    id: 'd_license_ips',
                                    overCls: 'd_license_ips_ov',
                                    listeners: {
                                        click: {
                                            fn: 'onButtonClick25',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_license',
                                    id: 'lb_dboard_lic_ips'
                                },
                                {
                                    xtype: 'toggleslide',
                                    state: true,
                                    cls: 'custom-color',
                                    id: 'btn_dboard_lic_ips',
                                    listeners: {
                                        change: {
                                            fn: 'onButtonChange1',
                                            scope: 'controller'
                                        },
                                        beforechange: {
                                            fn: 'onBtn_dboard_lic_ipsBeforeChange',
                                            scope: 'controller'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'd_ipsec',
                            margin: '0 10 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'd_license_vpn',
                                    id: 'd_license_ipsec',
                                    overCls: 'd_license_vpn_ov',
                                    listeners: {
                                        click: {
                                            fn: 'onButtonClick23',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_license',
                                    id: 'lb_dboard_lic_ipsec'
                                },
                                {
                                    xtype: 'toggleslide',
                                    state: true,
                                    cls: 'custom-color',
                                    id: 'btn_dboard_lic_ipsec',
                                    listeners: {
                                        change: {
                                            fn: 'onButtonChange111',
                                            scope: 'controller'
                                        },
                                        beforechange: {
                                            fn: 'onBtn_dboard_lic_ipsecBeforeChange',
                                            scope: 'controller'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'd_ssl',
                            margin: '0 10 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'd_license_ssl',
                                    id: 'd_license_ssl',
                                    overCls: 'd_license_ssl_ov',
                                    listeners: {
                                        click: {
                                            fn: 'onButtonClick22',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_license',
                                    id: 'lb_dboard_lic_ssl'
                                },
                                {
                                    xtype: 'toggleslide',
                                    state: true,
                                    cls: 'custom-color',
                                    id: 'btn_dboard_lic_ssl',
                                    listeners: {
                                        change: {
                                            fn: 'onButtonChange1111',
                                            scope: 'controller'
                                        },
                                        beforechange: {
                                            fn: 'onBtn_dboard_lic_sslBeforeChange',
                                            scope: 'controller'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'd_av',
                            margin: '0 10 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'd_license_av',
                                    id: 'd_license_av',
                                    overCls: 'd_license_av_ov',
                                    listeners: {
                                        click: {
                                            fn: 'onButtonClick21',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_license',
                                    id: 'lb_dboard_lic_av'
                                },
                                {
                                    xtype: 'toggleslide',
                                    state: true,
                                    cls: 'custom-color',
                                    id: 'btn_dboard_lic_av',
                                    listeners: {
                                        change: {
                                            fn: 'onButtonChange11111',
                                            scope: 'controller'
                                        },
                                        beforechange: {
                                            fn: 'onBtn_dboard_lic_avBeforeChange',
                                            scope: 'controller'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'd_as',
                            margin: '0 10 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'd_license_as',
                                    id: 'd_license_as',
                                    overCls: 'd_license_as_ov',
                                    listeners: {
                                        click: {
                                            fn: 'onButtonClick211',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_license',
                                    id: 'lb_dboard_lic_as'
                                },
                                {
                                    xtype: 'toggleslide',
                                    state: true,
                                    cls: 'custom-color',
                                    id: 'btn_dboard_lic_as',
                                    listeners: {
                                        change: {
                                            fn: 'onButtonChange111111',
                                            scope: 'controller'
                                        },
                                        beforechange: {
                                            fn: 'onBtn_dboard_lic_asBeforeChange',
                                            scope: 'controller'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'd_tracker',
                            margin: '0 10 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    focusCls: 'btn_f',
                                    cls: 'd_license_tracker',
                                    id: 'd_license_tracker',
                                    overCls: 'd_license_tracker_ov',
                                    listeners: {
                                        click: {
                                            fn: 'onButtonClick2111',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_license',
                                    id: 'lb_dboard_lic_tracker'
                                },
                                {
                                    xtype: 'toggleslide',
                                    state: true,
                                    cls: 'custom-color',
                                    id: 'btn_dboard_lic_tracker',
                                    listeners: {
                                        change: {
                                            fn: 'onButtonChange1111111',
                                            scope: 'controller'
                                        },
                                        beforechange: {
                                            fn: 'onBtn_dboard_lic_trackerBeforeChange',
                                            scope: 'controller'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 260,
                            width: 170,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_license_info',
                                    id: 'lb_license_info',
                                    bind: {
                                        text: '{state}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_license_re',
                                    id: 'btn_license_re',
                                    listeners: {
                                        click: {
                                            fn: 'onButtonClick10',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    id: 'btn_license_temp',
                                    bind: {
                                        text: '{demo}'
                                    },
                                    listeners: {
                                        click: {
                                            fn: 'onBtn_license_tempClick',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: 'cont_license_re',
                                    margin: '5 0 0 0',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: 'fd_hardware_license',
                                            labelAlign: 'top',
                                            labelSeparator: ' ',
                                            bind: {
                                                fieldLabel: '{key_hardware}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'ft_license_key',
                                            labelAlign: 'top',
                                            labelSeparator: ' ',
                                            bind: {
                                                fieldLabel: '{key_license}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            itemId: 'confirm_license',
                                            margin: '0 5 0 70',
                                            bind: {
                                                text: '{confirm}'
                                            },
                                            listeners: {
                                                click: {
                                                    fn: 'onButtonClick9',
                                                    scope: 'controller'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            bind: {
                                                text: '{cancel}'
                                            },
                                            listeners: {
                                                click: {
                                                    fn: 'onButtonClick8',
                                                    scope: 'controller'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: {
            fn: 'onPanelAfterRender',
            scope: 'controller'
        },
        beforedestroy: {
            fn: 'onNFW2_dboardBeforeDestroy',
            scope: 'controller'
        }
    },

    onD_chart_gridItemClick: function(dataview, record, item, index, e, eOpts) {
        Ext.getCmp('d_chart_area').record_id = record.id;
        Ext.getCmp('d_chart_area').record = record;
        Ext.getCmp('d_chart_info').update({"max":record.data.max,"time":record.data.time,"y_max":record.data.y_max,"category":record.data.category});

        get_dboard_chart_data(record);

    },

    onD_chart_areaAfterRender: function(component, eOpts) {
        Ext.getCmp('d_chart_area').record_id = '';
                var wid = document.body.clientWidth-880;
                document.getElementById('chart_area').style.width = wid+'px';
                Ext.getCmp('d_chart_area').myChart = echarts.init(document.getElementById('chart_area'),'macarons');
    },

    onD_chart_areaBeforeDestroy: function(component, eOpts) {
         clearInterval(Ext.getCmp('d_chart_area').interval);
    },

    onD_chart_areaResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        //document.getElementById('chart_area').style.width = '100%';
        //Ext.getCmp('d_chart_area').myChart.refresh();

    },

    onPnl_dboard_chartResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        var me = Ext.getCmp('d_chart_area');
                                    if(me.myChart._option !== undefined){
                                        var get_chart = me.myChart.getOption();
                                    var wid = document.body.clientWidth-900;
                                        for(var i in get_chart.series){
                                            me.chart_option.series[i].data = get_chart.series[i].data;
                                        }

                                        me.myChart.setOption(me.chart_option, true);
                                        document.getElementById('chart_area').style.width = wid+"px";

                                        me.myChart.resize();
                                    }
    },

    onCt_alert_listItemClick: function(dataview, record, item, index, e, eOpts) {

        if(Ext.getCmp('ct_alert_detail').hidden === true){
        Ext.getCmp('ct_alert_list').height = 300;
        Ext.getCmp('ct_alert_detail').show();
        }

        var data = record.data;
        Ext.getCmp('ct_alert_detail').update({"date":data.date,"desc":data.desc,"sip":data.sip,"sport":data.sport,"dip":data.dip,
                                             "dport":data.dport,"protocol":getProtocol(data.protocol),"user":data.user});
    },

    get_alarmMsg: function() {
        var items = [];

        request_helper.xmlrpc_call_JsonP(
            'FtDBMgr',
            'getAlertMsg',
            {},
            function(response){

                console.log("alarmsg",response);

                for (var i = 0; i < response.alert_list.length; ++i){
                    items.push({"date":response.alert_list[i].date,"desc":response.alert_list[i].description,"sip":response.alert_list[i].sip,
                                "dip":response.alert_list[i].dip,"sport":response.alert_list[i].sport,"dport":response.alert_list[i].dport,
                                "protocol":response.alert_list[i].protocol
                               });
                }


                if(Ext.getCmp('ct_alert_list')){

                Ext.getCmp('ct_alert_list').getStore().loadData(items);

                }
                // Ext.getCmp('ct_alert_list').update(newdata);

            });
    },

    get_summary: function() {
        var _me = this;
        var items = [];


        var ar_data_mon =  Ext.getCmp('NFW2_dboard').quick_data;

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'rrdFetchZENGrid', {},
            function(response){

                console.log("get_summary_response",response);


                for (var i = 0; i < ar_data_mon.length; ++i){

                    var now = null;
                    var max = null;
                    var time = null;
                    var y_max = null;

                    var is_today_data_now = (Object.keys(response.today_data_now).length===0)?false:true;
                    var is_today_data_max = (Object.keys(response.today_data_max).length===0)?false:true;
                    var is_yester_data = (Object.keys(response.yesterday_data_max).length===0)?false:true;
                    var is_today_log_now = (Object.keys(response.today_log_now).length===0)?false:true;
                    var is_today_log_max = (Object.keys(response.today_log_max).length===0)?false:true;
                    var is_yester_log = (Object.keys(response.yesterday_log_max).length===0)?false:true;



                    if(ar_data_mon[i] === "cpu"){

                        now =  (is_today_data_now)?(response.today_data_now.cpuidl).toFixed(2)+"%":0;
                        max =  (is_today_data_max)?(response.today_data_max.cpuidl[0]).toFixed(2)+"%":0;
                        time =  (is_today_data_max)?response.today_data_max.cpuidl[1]:"";
                        y_max =  (is_yester_data)?(response.yesterday_data_max.cpuidl).toFixed(2)+"%":0;


                    }else if(ar_data_mon[i] === "rx" || ar_data_mon[i] === "tx"){

                        var sum_now = null;
                        var sum_max = null;
                        var sum_y_max = null;

                        for(var k in response.today_data_now){
                            if(k.match(ar_data_mon[i])){

                                sum_now += (is_today_data_now)?response.today_data_now[k]:0;
                                sum_max += (is_today_data_max)?response.today_data_max[k][0]:0;
                                sum_y_max += (is_yester_data)?response.yesterday_data_max[k]:0;
                            }
                        }

                        now = chg_convert(ar_data_mon[i],sum_now);
                        max = chg_convert(ar_data_mon[i],sum_max);
                        time = "";
                        y_max = chg_convert(ar_data_mon[i],sum_y_max);



                    }else if(ar_data_mon[i] === "swpuse"){

                        now = (is_today_data_now)?chg_convert(ar_data_mon[i],response.today_data_now[ar_data_mon[i]]):0;
                        max = (is_today_data_max)?chg_convert(ar_data_mon[i],response.today_data_max[ar_data_mon[i]][0]):0;
                        time =  (is_today_data_max)?response.today_data_max[ar_data_mon[i]][1]:"";
                        y_max = (is_yester_data)?chg_convert(ar_data_mon[i],response.yesterday_data_max[ar_data_mon[i]]):0;


                    }else if(ar_data_mon[i] === "ipsec_in_tunnel"){

                        now = (is_today_log_now)?chg_convert(ar_data_mon[i],(response.today_log_now.ipsec_in_tunnel + response.today_log_now.ipsec_out_tunnel)):0;
                        max = (is_today_log_max)?chg_convert(ar_data_mon[i],(response.today_log_max.ipsec_in_tunnel[0] + response.today_log_max.ipsec_out_tunnel[0])):0;
                        time = "";
                        y_max = (is_yester_log)?chg_convert(ar_data_mon[i],(response.yesterday_log_max.ipsec_in_tunnel + response.yesterday_log_max.ipsec_out_tunnel)):0;


                    }else{

                        now = (is_today_log_now)?chg_convert(ar_data_mon[i],response.today_log_now[ar_data_mon[i]]):0;
                        max = (is_today_log_max)?chg_convert(ar_data_mon[i],response.today_log_max[ar_data_mon[i]][0]):0;
                        time =  (is_today_log_max)?response.today_log_max[ar_data_mon[i]][1]:"";
                        y_max = (is_yester_log)?chg_convert(ar_data_mon[i],response.yesterday_log_max[ar_data_mon[i]]):0;

                    }

                    if(ar_data_mon[i] === "session_drop_log" || ar_data_mon[i] === "ddos_detect" || ar_data_mon[i] === "ddos_block" ||
                       ar_data_mon[i] === "ips_detect" || ar_data_mon[i] === "ips_block" || ar_data_mon[i] === "av_detect" || ar_data_mon[i] === "av_block" ||
                      ar_data_mon[i] === "as_detect" || ar_data_mon[i] === "as_block"){
                        max = now;
                    }/*해당항목들은 누적치이므로 현재값이 최대값임*/


                    items.push({"id":ar_data_mon[i],
                                "now":now,
                                "max":max,
                                "time":(max!=="-" && time !=="")?" ("+unixTimeConvert(time,"YMDHM","GMT")+")":"",
                                "y_max":y_max,
                                "category":_me.chg_summary_name(ar_data_mon[i])
                               });



                }


                if(Ext.getCmp('d_chart_grid')){
                    Ext.getCmp('d_chart_grid').getStore().loadData(items);


                    //Ext.getCmp('d_chart_info').update({"max":items[0].max,"y_max":items[0].y_max});
                    var chart_record = items[0];
                    if(Ext.getCmp('d_chart_area').record_id === ""){
                        Ext.getCmp('d_chart_area').record_id = items[0].id;
                    }
                    console.log(Ext.getCmp('d_chart_area').record_id);
                    if(Ext.getCmp('d_chart_area').myChart._option === undefined){ get_dboard_chart_data(chart_record); }

                    if(Ext.getCmp('d_chart_info').data === null){
                        Ext.getCmp('d_chart_info').update({"max":items[0].max,"time":items[0].time,"y_max":items[0].y_max,"category":items[0].category});
                    }
                }

                //Ext.getCmp('dv_chart_grid').unmask();

            });


        function get_cpu_data(cpusys, cpunic, cpuusr){

            var reval = (cpusys +cpunic +cpuusr)*100;
            reval = (reval > 100)?100:reval;

            return reval.toFixed(2)+"%";
        }


        function chg_convert(id,value){

            value = Number(value);
            switch (id){
                case "root_dir":
                case "log_dir":
                    return formatkBytes(value);
                case "en_byte":
                case "de_byte":
                    return formatBytes(value);
                case "rx":
                case "tx":
                    return formatBytes(value);
                    // return (value >= 1000)?(value/1000).toFixed(2)+"G":value.toFixed(2);

                case "swpuse": return value.toFixed(2) + "%";
                default : return (value === 0)?"-":value.toFixed(0);
            }
        }

        function formatkBytes(kbytes) {
            if(kbytes < 1024) return kbytes.toFixed(2) + " K";
            else if(kbytes < 1048576) return(kbytes / 1024).toFixed(2) + " M";
            else if(kbytes < 1073741824) return(kbytes / 1048576).toFixed(2) + " G";
            else return(kbytes / 1073741824).toFixed(2) + " T";
        }

        function formatBytes(bytes) {
            if(bytes === 0){return "-";}
            if(bytes < 1000) return bytes.toFixed(2) + " ";
            else if(bytes < 1000000) return(bytes / 1000).toFixed(2) + " K";
            else if(bytes < 100000000) return(bytes / 1000000).toFixed(2) + " M";
            else  return(bytes / 100000000).toFixed(2) + " G";
        }





    },

    chg_summary_name: function(id) {
        switch(id){
                        case "cpu" : return "CPU";
                        case "swpuse" : return __zen('memory');
                        case "rx" : return "RX (bps)";
                        case "tx" : return "TX (bps)";
                        case "root_dir" : return __zen('disk')+"1 (Root)";
                        case "log_dir" : return __zen('disk')+"2 (Log)";
                        case "session_total" : return __zen('fw_session');
                        case "session_drop_log" : return __zen('fw_drop');
                        case "session_deny" : return __zen('fw_deny');
                        case "ddos_detect" : return "DDoS "+ __zen('detect');
                        case "ddos_block" : return "DDoS "+ __zen('deny');
                        case "ipsec_in_tunnel" : return "IPSec "+ __zen('tunnel');
                        case "en_byte" : return __zen('encryption')+" (bps)";
                        case "de_byte" : return __zen('decryption')+" (bps)";
                        case "ssl_tunnel" : return "SSL "+ __zen('tunnel');
                        case "ips_detect" : return "IPS "+ __zen('detect');
                        case "ips_block" : return "IPS "+ __zen('deny');
                        case "av_detect" : return __zen('av')+ " "+__zen('detect');
                        case "av_block" : return __zen('av')+ " "+ __zen('deny');
                        case "as_detect" : return __zen('as')+ " "+ __zen('detect');
                        case "as_block" : return __zen('as')+ " "+ __zen('deny');
                    }
    },

    get_quickdata: function() {
        clearInterval(Ext.getCmp('alarm_timeout').interval);
        alarm_timeout();

        var _me = this;
        var items = [];

        var _params = {
            basename : Ext.encode('monitor_dashboard')
        };

        //Ext.getCmp('d_chart_area').mask("loading..");

        var ar_quick_data = [];

        request_helper.xmlrpc_call_JsonP('ftuctrl','getObject',_params,

                                         function(response){

                                             console.log("get_quickdata",response);

                                             if(response === null){

                                                 ar_quick_data = ["cpu","swpuse","tx","rx","session_total","session_drop_log","session_deny","ipsec_in_tunnel"];


                                             }else{

                                                 if(response.summary.chk_comm_cpu){ar_quick_data.push("cpu");}
                                                 if(response.summary.chk_comm_mem){ar_quick_data.push("swpuse");}
                                                 if(response.summary.chk_comm_tx){ar_quick_data.push("tx");}
                                                 if(response.summary.chk_comm_rx){ar_quick_data.push("rx");}

                                                 if(response.summary.chk_comm_disk1){ar_quick_data.push("root_dir");}
                                                 if(response.summary.chk_comm_disk2){ar_quick_data.push("log_dir");}
                                                 if(response.summary.chk_comm_ses){ar_quick_data.push("session_total");}
                                                 if(response.summary.chk_comm_allow){ar_quick_data.push("session_drop_log");}
                                                 if(response.summary.chk_comm_deny){ar_quick_data.push("session_deny");}
                                                 if(response.summary.chk_ddos_detect){ar_quick_data.push("ddos_detect");}
                                                 if(response.summary.chk_ddos_block){ar_quick_data.push("ddos_block");}
                                                 if(response.summary.chk_ipsec_tunnel){ar_quick_data.push("ipsec_in_tunnel");}
                                                 if(response.summary.chk_ipsec_en){ar_quick_data.push("en_byte");}
                                                 if(response.summary.chk_ipsec_de){ar_quick_data.push("de_byte");}
                                                 if(response.summary.chk_ssl_tunnel){ar_quick_data.push("ssl_tunnel");}
                                                 if(response.summary.chk_ips_detect){ar_quick_data.push("ips_detect");}
                                                 if(response.summary.chk_ips_block){ar_quick_data.push("ips_block");}
                                                 if(response.summary.chk_av_detect){ar_quick_data.push("av_detect");}
                                                 if(response.summary.chk_av_block){ar_quick_data.push("av_block");}
                                                 if(response.summary.chk_as_detect){ar_quick_data.push("as_detect");}
                                                 if(response.summary.chk_as_block){ar_quick_data.push("as_block");}

                                             }



                                              Ext.getCmp('NFW2_dboard').quick_data = ar_quick_data;

                                             for (var i = 0; i < ar_quick_data.length; ++i){

        												  items.push({"id":ar_quick_data[i],
        															"now":'',
        															"max":'',
        															"y_max":'',
        															"category":_me.chg_summary_name(ar_quick_data[i])
        														   });


        											 }


        									Ext.getCmp('d_chart_grid').getStore().loadData(items);




                                             dboard_timeout();


                                         });

    }

});