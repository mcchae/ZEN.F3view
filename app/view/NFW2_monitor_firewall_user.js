
Ext.define('NFW2.view.NFW2_monitor_firewall_user', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_firewall_user',

    requires: [
        'NFW2.view.NFW2_monitor_firewall_userViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_monitor_firewall_user'
    },
    cls: [
        'zen_body',
        'w_mask'
    ],
    id: 'monitor_user',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onMonitor_trackerBeforeDestroy'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        id: 'fm_user',
                        header: false,
                        items: [
                            {
                                xtype: 'container',
                                cls: 'dv_monitor',
                                layout: {
                                    type: 'hbox',
                                    align: 'middle'
                                },
                                items: [
                                    {
                                        xtype: 'toggleslide',
                                        resizeHandle: false,
                                        state: false,
                                        cls: 'custom-color-monitor',
                                        id: 'chk_btn',
                                        listeners: {
                                            change: 'onChk_btnChange'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        set_data: function() {
                                            var me = Ext.getCmp('monitor_user');

                                            me.get_monitor_user();
                                        },
                                        cls: 'dv_timecount',
                                        html: '10',
                                        id: 'timeout'
                                    },
                                    {
                                        xtype: 'cycle',
                                        focusCls: 'btn_f',
                                        cls: 'sel_monitor',
                                        id: 'update_time',
                                        width: 80,
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            items: [
                                                me.processMyCheckItem({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange'
                                                    }
                                                }),
                                                me.processMyCheckItem11({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange6'
                                                    }
                                                }),
                                                me.processMyCheckItem1({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange1'
                                                    }
                                                }),
                                                me.processMyCheckItem2({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange2'
                                                    }
                                                })
                                            ]
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'lb_m_none',
                                        hidden: true,
                                        id: 'user_data_error',
                                        bind: {
                                            text: '{user_msg3}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                margin: '10 0 0 10',
                                layout: 'table',
                                items: [
                                    me.processS_sort({
                                        xtype: 'cycle',
                                        focusCls: 'btn_f',
                                        cls: 'sel_monitor',
                                        id: 's_sort',
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 150,
                                            items: [
                                                me.processMyCheckItem3({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange3'
                                                    }
                                                }),
                                                me.processMyCheckItem5({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange5'
                                                    }
                                                }),
                                                me.processMyCheckItem4({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange4'
                                                    }
                                                })
                                            ]
                                        }
                                    }),
                                    me.processS_count({
                                        xtype: 'cycle',
                                        focusCls: 'btn_f',
                                        cls: 'sel_monitor',
                                        id: 's_count',
                                        margin: '0 0 0 10',
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            items: [
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '100',
                                                    focusable: true,
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange31'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '200',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange51'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '500',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange41'
                                                    }
                                                }
                                            ]
                                        }
                                    }),
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 40',
                                        iconCls: 'icb_filter',
                                        bind: {
                                            text: '{filter_apply}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 10',
                                        iconCls: 'icb_filter_x',
                                        bind: {
                                            text: '{filter_reset}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick1'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                id: 'con_grid',
                                margin: '5 0 0 0',
                                items: [
                                    {
                                        xtype: 'container',
                                        margin: '0 0 0 10',
                                        padding: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                bind: {
                                                    text: '{user_logout}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick2'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                margin: '0 0 0 5',
                                                bind: {
                                                    text: '{all_logout}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick21'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        id: 'grid_list',
                                        margin: '3 0 0 0',
                                        title: '',
                                        columnLines: true,
                                        sortableColumns: false,
                                        store: 'store_monitor_user_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        flex: 1,
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                id: 's_name',
                                                                flex: 1,
                                                                margin: '0 0 0 -9'
                                                            }
                                                        ]
                                                    }
                                                ],
                                                dataIndex: 'name',
                                                flex: 1,
                                                bind: {
                                                    text: '{obj_name}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        flex: 1,
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                id: 's_id',
                                                                flex: 1,
                                                                margin: '0 0 0 -9'
                                                            }
                                                        ]
                                                    }
                                                ],
                                                dataIndex: 'id',
                                                flex: 1,
                                                bind: {
                                                    text: '{id2}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        flex: 1,
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                id: 's_ip',
                                                                fieldInfo: '',
                                                                flex: 1,
                                                                maskRe: /[0-9.\/-]/,
                                                                margin: '0 0 0 -9',
                                                                listeners: {
                                                                    focus: function(component){
                                                                                        var str = disp_help_ip('all');
                                                                                        component.fieldInfo = str;
                                                                                        setTipFocus(Ext.getCmp("monitor_user"),component);
                                                                                    },
                                                                    blur: function(component){
                                                                                        setTipBlur(Ext.getCmp("monitor_user"),component);
                                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ],
                                                layout: 'hbox',
                                                dataIndex: 'ip',
                                                flex: 1,
                                                bind: {
                                                    text: '{ip_addr}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        flex: 1,
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                id: 's_user_name',
                                                                fieldInfo: '',
                                                                flex: 1,
                                                                margin: '0 0 0 -9'
                                                            }
                                                        ]
                                                    }
                                                ],
                                                layout: 'hbox',
                                                dataIndex: 'user_name',
                                                flex: 1,
                                                bind: {
                                                    text: '{name}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        flex: 1,
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                id: 's_user_depart',
                                                                fieldInfo: '',
                                                                flex: 1,
                                                                margin: '0 0 0 -9'
                                                            }
                                                        ]
                                                    }
                                                ],
                                                layout: 'hbox',
                                                dataIndex: 'user_depart',
                                                flex: 1,
                                                bind: {
                                                    text: '{depart}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        flex: 1,
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                id: 's_server',
                                                                flex: 1,
                                                                margin: '0 0 0 -9'
                                                            }
                                                        ]
                                                    }
                                                ],
                                                layout: 'hbox',
                                                sortable: false,
                                                dataIndex: 'srv',
                                                flex: 1,
                                                bind: {
                                                    text: '{auth_server}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                layout: 'hbox',
                                                sortable: false,
                                                dataIndex: 'ltime',
                                                flex: 1,
                                                bind: {
                                                    text: '{login}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                layout: 'hbox',
                                                dataIndex: 'to',
                                                flex: 1,
                                                bind: {
                                                    text: '{timeout}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    var t_stat = (record.data.byt_tx_r !== 0)?'width:'+record.data.byt_tx_r+'%':'border:none';
                                                    var bar_g = '<strong class="bar_g" style="'+t_stat+'"></strong>';

                                                    var r_stat = (record.data.byt_rx_r !== 0)?'width:'+record.data.byt_rx_r+'%':'border:none';
                                                    var bar_b = '<strong class="bar_b" style="'+r_stat+'"></strong>';

                                                    var bytes_tx = (record.data.byt_tx!=='')?byteConvert(record.data.byt_tx):'';
                                                    var bytes_rx = (record.data.byt_rx!=='')?byteConvert(record.data.byt_rx):'';

                                                    return '<div>'+bytes_tx+' / '+bytes_rx+'</div><div class="graph">'+bar_g+bar_b+'</div>';
                                                },
                                                minWidth: 140,
                                                dataIndex: 'bytes',
                                                flex: 1,
                                                bind: {
                                                    text: '{usage}(TX/RX)'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var r_stat = (record.data.sess_r !== 0)?'width:'+record.data.sess_r+'%':'border:none';
                                                    var bar_r = '<strong class="bar_r" style="'+r_stat+'"></strong>';

                                                    var val = (value!=='')?byteConvert(value):'';

                                                    return '<div>'+val+'</div><div class="graph">'+bar_r+'</div>';
                                                },
                                                minWidth: 130,
                                                dataIndex: 'sess',
                                                flex: 1,
                                                bind: {
                                                    text: '{session}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    var t_stat = (record.data.pkt_tx_r !== 0)?'width:'+record.data.pkt_tx_r+'%':'border:none';
                                                    var bar_g = '<strong class="bar_g" style="'+t_stat+'"></strong>';

                                                    var r_stat = (record.data.pkt_rx_r !== 0)?'width:'+record.data.pkt_rx_r+'%':'border:none';
                                                    var bar_b = '<strong class="bar_b" style="'+r_stat+'"></strong>';

                                                    var packets_tx = (record.data.pkt_tx!=='')?byteConvert(record.data.pkt_tx):'';
                                                    var packets_rx = (record.data.pkt_rx!=='')?byteConvert(record.data.pkt_rx):'';

                                                    return '<div>'+packets_tx+' / '+packets_rx+'</div><div class="graph">'+bar_g+bar_b+'</div>';
                                                },
                                                minWidth: 130,
                                                dataIndex: 'packets',
                                                flex: 1,
                                                bind: {
                                                    text: '{packet}(TX/RX)'
                                                }
                                            }
                                        ],
                                        viewConfig: {
                                            loadMask: false
                                        },
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel'
                                        }),
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                dock: 'bottom',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_monitor_user_list',
                                                listeners: {
                                                    beforechange: 'onPagingtoolbarBeforeChange'
                                                }
                                            }
                                        ],
                                        listeners: {
                                            cellclick: 'onGrid_listCellClick'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processMyCheckItem: function(config) {
        config.text = '5 '+__zen('sec');

        return config;
    },

    processMyCheckItem11: function(config) {
        config.text = '10 '+__zen('sec');

        return config;
    },

    processMyCheckItem1: function(config) {
        config.text = '30 '+__zen('sec');

        return config;
    },

    processMyCheckItem2: function(config) {
        config.text = '60 '+__zen('sec');

        return config;
    },

    processMyCheckItem3: function(config) {
        config.text = __zen('usage');

        return config;
    },

    processMyCheckItem5: function(config) {
        config.text = __zen('session');

        return config;
    },

    processMyCheckItem4: function(config) {
        config.text = __zen('packet');

        return config;
    },

    processS_sort: function(config) {
        config.prependText = __zen('align_criteria')+' : ';

        return config;
    },

    processS_count: function(config) {
        config.prependText = __zen('output_count')+' : ';

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('monitor_user');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            Ext.data.StoreManager.lookup("store_monitor_user_list").currentPage = 1;

            me.get_monitor_user();
            monitor_timeout();
        }else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        Ext.getCmp('timeout').setHtml(5);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange6: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        Ext.getCmp('timeout').setHtml(60);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange3: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_user");
        me.sort = 'bytes';

        me.get_monitor_user();
    },

    onMenucheckitemCheckChange5: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_user");
        me.sort = 'sessions';

        me.get_monitor_user();
    },

    onMenucheckitemCheckChange4: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_user");
        me.sort = 'packets';

        me.get_monitor_user();
    },

    onMenucheckitemCheckChange31: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_user");
        me.count = menucheckitem.text;

        me.get_monitor_user();
    },

    onMenucheckitemCheckChange51: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_user");
        me.count = menucheckitem.text;

        me.get_monitor_user();
    },

    onMenucheckitemCheckChange41: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_user");
        me.count = menucheckitem.text;

        me.get_monitor_user();
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp("monitor_user");

        me.btn_filter = true;
    },

    onButtonClick1: function(button, e, eOpts) {
        Ext.getCmp("fm_user").getForm().reset();

        var me = Ext.getCmp("monitor_user");

        me.btn_filter = false;
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.MessageBox.alert(__weguardia,get_msg('sel_logout'));
            return false;
        }else{

            Ext.MessageBox.confirm(__weguardia,get_msg('conf_logout'),function(btn){
                if(btn === "yes"){
                    var id = [];
                    for(var i=0; i<grid_chk.length; i++){
                        id.push(grid_chk[i].data.id);
                    }

                    var _params = {
                        func_name: Ext.encode('mod_monitor_fw_ua_user_logout'),
                        args: Ext.encode(id)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'execKctrlFunc',
                        _params,
                        function(response){

                            me.get_monitor_user(1);
                        }
                    );
                }
            });
        }
    },

    onButtonClick21: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        Ext.MessageBox.confirm(__weguardia,get_msg('conf_logout_all'),function(btn){
            if(btn === "yes"){

                var _params = {
                    func_name: Ext.encode('mod_monitor_fw_ua_user_logout'),
                    args: Ext.encode(null)
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'execKctrlFunc',
                    _params,
                    function(response){

                        me.get_monitor_user(1);
                    }
                );
            }
        });
    },

    onPagingtoolbarBeforeChange: function(pagingtoolbar, page, eOpts) {
        var me = this;

        me.get_monitor_user(page);

        return false;
    },

    onGrid_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;

        Ext.getCmp("chk_btn").state = false;
        Ext.getCmp("chk_btn").moveHandle(false);
        me.onChk_btnChange(Ext.getCmp("chk_btn"));
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        clearInterval(Ext.getCmp('timeout').interval);
        me.fieldInfo = makeZenTip();

        me.stime = '';
        me.etime = '';
        me.user_id = '';
        me.usre_ip = '';
        me.server = '';
        me.btn_filter = false;
        me.sort = 'bytes';
        me.count = 100;

        hideLoadMask();
    },

    onMonitor_trackerBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);
        Ext.data.StoreManager.lookup("store_monitor_user_list").removeAll();
    },

    get_monitor_user: function(start) {
        Ext.suspendLayouts();
        var me = this;

        var stime = null, etime = null, user_id = null, user_ip = null, server = null, name=null, u_name=null, u_depart=null;
        if(me.btn_filter === true){
            //stime = Ext.getCmp("s_stime").getValue();
            //etime = Ext.getCmp("s_etime").getValue();
            name = Ext.getCmp("s_name").getValue();
            user_id = Ext.getCmp("s_id").getValue();
            user_ip = Ext.getCmp("s_ip").getValue();
            u_name = Ext.getCmp("s_user_name").getValue();
            u_depart = Ext.getCmp("s_user_depart").getValue();
            server = Ext.getCmp("s_server").getValue();
        }

        var store = Ext.data.StoreManager.lookup("store_monitor_user_list");
        var cp = (start)?start:store.currentPage;

        store.getProxy().setExtraParam('func_name',Ext.encode('mod_monitor_fw_ua_user_show'));
        store.getProxy().setExtraParam('args',Ext.encode({
            'sort': me.sort,
            'stime': stime,
            'etime': etime,
            'name': name,
            'user_id': user_id,
            'user_ip': user_ip,
            'user_name': u_name,
            'user_depart': u_depart,
            'server': server
        }));
        me.mask('Loading...');
        store.getProxy().setExtraParam('limit',Ext.encode(Number(me.count)));
        store.currentPage = cp;
        store.pageSize = Number(me.count);
        store.load({callback : function(records, options, success) {
            if (success) {
                me.unmask();
                setTimeout(function(){ me.setWidth('100%'); },100);
            }
        }});


        Ext.resumeLayouts(true);
    }

});