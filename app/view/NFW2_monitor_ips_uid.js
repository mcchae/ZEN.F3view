
Ext.define('NFW2.view.NFW2_monitor_ips_uid', {
    extend: 'Ext.container.Container',
    alias: 'widget.nfw2_monitor_ips_uid',

    requires: [
        'NFW2.view.NFW2_monitor_ips_uidViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.button.Segmented',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.view.Table',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_monitor_ips_uid'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_ips_uid',
    padding: 0,
    defaultListenerScope: true,

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        id: 'NFW2_monitor_ips_uid1',
                        padding: 0,
                        items: [
                            {
                                xtype: 'form',
                                cls: 'zen_body',
                                id: 'ips_uid_form',
                                bodyPadding: 0,
                                header: false,
                                title: 'My Form',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        cls: 'dv_monitor',
                                        id: 'ips_uid_timeout_con',
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
                                                    var me = Ext.getCmp('NFW2_monitor_ips_uid');

                                                    me.get_uid();
                                                },
                                                cls: 'dv_timecount',
                                                html: 10,
                                                id: 'timeout1',
                                                width: 55
                                            },
                                            {
                                                xtype: 'cycle',
                                                focusCls: 'btn_f',
                                                cls: 'sel_monitor',
                                                id: 'update_time2',
                                                showText: true,
                                                menu: {
                                                    xtype: 'menu',
                                                    width: 120,
                                                    items: [
                                                        me.processMyCheckItem({
                                                            xtype: 'menucheckitem',
                                                            focusable: true,
                                                            listeners: {
                                                                checkchange: 'onMenucheckitemCheckChange4'
                                                            }
                                                        }),
                                                        me.processMyCheckItem1({
                                                            xtype: 'menucheckitem',
                                                            focusable: true,
                                                            checked: true,
                                                            listeners: {
                                                                checkchange: 'onMenucheckitemCheckChange3'
                                                            }
                                                        }),
                                                        me.processMyCheckItem2({
                                                            xtype: 'menucheckitem',
                                                            focusable: true,
                                                            listeners: {
                                                                checkchange: 'onMenucheckitemCheckChange2'
                                                            }
                                                        }),
                                                        me.processMyCheckItem3({
                                                            xtype: 'menucheckitem',
                                                            focusable: true,
                                                            listeners: {
                                                                checkchange: 'onMenucheckitemCheckChange1'
                                                            }
                                                        }),
                                                        me.processMyCheckItem4({
                                                            xtype: 'menucheckitem',
                                                            focusable: true,
                                                            listeners: {
                                                                checkchange: 'onMenucheckitemCheckChange'
                                                            }
                                                        })
                                                    ]
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                cls: 'lb_m_none',
                                                hidden: true,
                                                id: 'uid_data_error',
                                                text: '정책 별 탐지/차단 모니터에 필요한 데이터가 없습니다'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'monitor_ips_uid_con',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                hidden: true,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        id: 'date_label',
                                                        text: '최종 수정 시간 :'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                hidden: true,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch',
                                                    pack: 'end'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        id: 'start_time',
                                                        width: 200,
                                                        fieldLabel: '시간',
                                                        labelSeparator: ' ',
                                                        editable: false,
                                                        displayField: 'name',
                                                        queryMode: 'local',
                                                        store: {
                                                            data: [
                                                                {
                                                                    name: '5분',
                                                                    value: 5
                                                                },
                                                                {
                                                                    name: '10분',
                                                                    value: 10
                                                                },
                                                                {
                                                                    name: '30분',
                                                                    value: 30
                                                                },
                                                                {
                                                                    name: '1시간',
                                                                    value: 60
                                                                },
                                                                {
                                                                    name: '5시간',
                                                                    value: 300
                                                                },
                                                                {
                                                                    name: '12시간',
                                                                    value: 720
                                                                },
                                                                
                                                            ],
                                                            fields: [
                                                                {
                                                                    name: 'name'
                                                                },
                                                                {
                                                                    name: 'value'
                                                                }
                                                            ]
                                                        },
                                                        valueField: 'value',
                                                        listeners: {
                                                            afterrender: 'onStart_timeAfterRender'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'checkboxfield',
                                                        id: 'update_chk',
                                                        margin: '0 0 0 5',
                                                        boxLabel: '업데이트 주기',
                                                        listeners: {
                                                            change: 'onUpdate_chkChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        id: 'update_time1',
                                                        margin: '0 0 2 5',
                                                        width: 70,
                                                        labelSeparator: ' ',
                                                        labelWidth: 120,
                                                        editable: false,
                                                        displayField: 'time',
                                                        queryMode: 'local',
                                                        store: {
                                                            data: [
                                                                {
                                                                    time: '5'
                                                                },
                                                                {
                                                                    time: '10'
                                                                },
                                                                {
                                                                    time: '20'
                                                                },
                                                                {
                                                                    time: '30'
                                                                },
                                                                {
                                                                    time: '60'
                                                                }
                                                            ],
                                                            fields: [
                                                                {
                                                                    name: 'time'
                                                                }
                                                            ]
                                                        },
                                                        valueField: 'time',
                                                        listeners: {
                                                            afterrender: 'onUpdate_timeAfterRender',
                                                            change: 'onUpdate_timeChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        margin: '5 0 0 5',
                                                        text: '(초)'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        hidden: true,
                                                        margin: '0 0 0 5',
                                                        width: 100,
                                                        text: '전체 차단 해제'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        id: 'ips_uid_set_con',
                                        margin: '10 0 3 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'segmentedbutton',
                                                cls: 'seg_monitor',
                                                items: [
                                                    {
                                                        enableToggle: true,
                                                        pressed: true,
                                                        bind: {
                                                            text: '{min_5}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{min_10}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick1'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{min_30}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick3'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{hour_1}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick4'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{hour_5}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick5'
                                                        }
                                                    },
                                                    {
                                                        hidden: true,
                                                        bind: {
                                                            text: '{hour_12}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick6'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'label',
                                                cls: 'lb_sq',
                                                hidden: true,
                                                id: 'ips_uid_board_label',
                                                text: '정책 별 탐지'
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                margin: '0 0 0 10',
                                                bind: {
                                                    text: '{filter_set}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick2'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                flex: 1,
                                                cls: 'lb_info',
                                                id: 'monitor_ips_filter_label',
                                                margin: '5 0 0 5',
                                                bind: {
                                                    text: '{filter_unused}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '5 0 0 0',
                                        scrollable: true,
                                        items: [
                                            {
                                                xtype: 'gridpanel',
                                                get_block: function(record, index) {
                                                    var me = Ext.getCmp('NFW2_monitor_ips_uid');

                                                    var _params = {};
                                                    if(me.mode === "board"){
                                                        _params = {
                                                            func_name : Ext.encode('mod_dashboard_ips_session_control'),
                                                            args : Ext.encode({'id':record.data.policy,'ip_type':2,'protocol':record.data.protocol,'type':record.data.block_type,'src_ip':record.data.sip,'src_port':record.data.sport,'dst_ip':record.data.dip,'dst_port':record.data.dport,'block_time':30})
                                                        };
                                                    }
                                                    else{
                                                        _params = {
                                                            func_name : Ext.encode('mod_monitor_ips_session_control'),
                                                            args : Ext.encode({'id':record.data.policy,'ip_type':2,'protocol':record.data.protocol,'type':record.data.block_type,'src_ip':record.data.sip,'src_port':record.data.sport,'dst_ip':record.data.dip,'dst_port':record.data.dport,'block_time':30})
                                                        };
                                                    }

                                                    request_helper.xmlrpc_call_JsonP(

                                                    'ftuctrl',
                                                    'execKctrlFunc',
                                                    _params,

                                                    function(response){
                                                        var store = Ext.data.StoreManager.lookup('store_monitor_ips_uid_list');
                                                        var temp = record.data;
                                                        temp.block_type = 16;

                                                        if(response){
                                                            store.removeAt(index,1);
                                                            store.insert(index, temp);
                                                        }
                                                    }
                                                    );
                                                },
                                                get_non_block: function(record, value, index) {
                                                    var me = Ext.getCmp('NFW2_monitor_ips_uid');
                                                    var _params = {};

                                                    if(me.mode === "board"){
                                                        _params = {
                                                            func_name : Ext.encode('mod_dashboard_ips_session_control'),
                                                            args : Ext.encode({'id':record.data.policy,'ip_type':2,'protocol':record.data.protocol,'type':Number(value[index].value),'src_ip':record.data.sip,'src_port':record.data.sport,'dst_ip':record.data.dip,'dst_port':record.data.dport,'block_time':30})
                                                        };
                                                    }
                                                    else{
                                                        _params = {
                                                            func_name : Ext.encode('mod_monitor_ips_session_control'),
                                                            args : Ext.encode({'id':record.data.policy,'ip_type':2,'protocol':record.data.protocol,'type':Number(value[index].value),'src_ip':record.data.sip,'src_port':record.data.sport,'dst_ip':record.data.dip,'dst_port':record.data.dport,'block_time':30})
                                                        };
                                                    }

                                                    request_helper.xmlrpc_call_JsonP(

                                                    'ftuctrl',
                                                    'execKctrlFunc',
                                                    _params,

                                                    function(response){
                                                        var store = Ext.data.StoreManager.lookup('store_monitor_ips_uid_list');
                                                        if(response){
                                                            var temp = record.data;
                                                            temp.block_type = Number(value[index].value);

                                                            if(response){
                                                                store.removeAt(index,1);
                                                                store.insert(index, temp);
                                                            }
                                                        }
                                                    }
                                                    );
                                                },
                                                id: 'monitor_ips_uid_grid',
                                                scrollable: true,
                                                header: false,
                                                title: 'My Grid Panel',
                                                columnLines: true,
                                                disableSelection: true,
                                                store: 'store_monitor_ips_uid_list',
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var d = new Date(value*1000);

                                                            var year = d.getFullYear();
                                                            var month = d.getMonth() + 1;
                                                            if(String(month).length === 1){ month = String(0)+month; }
                                                            var day = d.getDate();
                                                            if(String(day).length === 1){ day = String(0)+day; }
                                                            var hour = d.getHours();
                                                            if(String(hour).length === 1){ hour = String(0)+hour; }
                                                            var min = d.getMinutes();
                                                            if(String(min).length === 1){ min = String(0)+min; }
                                                            var sec = d.getSeconds();
                                                            if(String(sec).length === 1){ sec = String(0)+sec; }

                                                            return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
                                                        },
                                                        align: 'center',
                                                        dataIndex: 'time',
                                                        flex: 0.15,
                                                        bind: {
                                                            text: '{hours}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            // var bname = (record.data.basename)?record.data.basename:'filter_v4';
                                                            // var _type = bname.indexOf("v4");
                                                            // var _img = (_type===-1)?'v6':'v4';

                                                            if(value===0){ return "IDS_MODE"; }

                                                            return value;
                                                        },
                                                        align: 'center',
                                                        dataIndex: 'policy',
                                                        flex: 0.1,
                                                        bind: {
                                                            text: '{rule_id}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        align: 'center',
                                                        dataIndex: 'fsid',
                                                        flex: 0.1,
                                                        bind: {
                                                            text: '{fsid}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if(record.data.priority === 1){ return '<img src="../images/level_critical.png" border="0" height="14" style="margin-top:3;"/><span>'+" "+value+'</span>'; }
                                                            if(record.data.priority === 2){ return '<img src="../images/level_high.png" border="0" height="14" style="margin-top:3;"/><span>'+" "+value+'</span>'; }
                                                            if(record.data.priority === 3){ return '<img src="../images/level_normal.png" border="0" height="14" style="margin-top:3;"/><span>'+" "+value+'</span>'; }
                                                            else{ return '<img src="../images/level_low.png" border="0" height="14" style="margin-top:3;"/><span>'+" "+value+'</span>'; }
                                                        },
                                                        dataIndex: 'signature_name',
                                                        flex: 0.25,
                                                        bind: {
                                                            text: '{sig_name}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var who = '<button class="dbtn who" onclick="show_whois(\''+value+'\')"></button>';
                                                            var tra = '<button class="dbtn tra" onclick="show_trace(\''+value+'\')"></button>';

                                                            return who + tra + '<span>'+value+"("+record.data.sport+")"+'</span>';
                                                        },
                                                        dataIndex: 'sip',
                                                        flex: 0.15,
                                                        bind: {
                                                            text: '{attacker_port}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var who = '<button class="dbtn who" onclick="show_whois(\''+value+'\')"></button>';
                                                            var tra = '<button class="dbtn tra" onclick="show_trace(\''+value+'\')"></button>';

                                                            return who + tra +'<span>'+value+"("+record.data.dport+")"+'</span>';
                                                        },
                                                        dataIndex: 'dip',
                                                        flex: 0.15,
                                                        bind: {
                                                            text: '{dest_port_ips}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if(value === 16){
                                                                return __zen('detect');
                                                            }
                                                            else if(value === 6){
                                                                return "차단 종료";
                                                            }
                                                            else{
                                                                return __zen('deny');
                                                            }
                                                        },
                                                        align: 'center',
                                                        dataIndex: 'block_type',
                                                        flex: 0.1,
                                                        bind: {
                                                            text: '{action}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        minWidth: 80,
                                                        align: 'center',
                                                        dataIndex: 'block_count',
                                                        flex: 0.1,
                                                        bind: {
                                                            text: '{count}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        minWidth: 80,
                                                        align: 'center',
                                                        dataIndex: 'bytes',
                                                        flex: 0.1,
                                                        bind: {
                                                            text: '{bytes}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var me = Ext.getCmp('monitor_ips_uid_grid');
                                                            me['get_record'+rowIndex] = record;
                                                            me['get_index'+rowIndex] = rowIndex;

                                                            if(value === 6){
                                                                return "";
                                                            }
                                                            else if(value !== 16){
                                                                return '<input type="button" id="buttonid" value="해제" style="margin-left:5;width:100" onclick="Ext.getCmp(\'monitor_ips_uid_grid\').get_block(Ext.getCmp(\'monitor_ips_uid_grid\').get_record'+rowIndex+', Ext.getCmp(\'monitor_ips_uid_grid\').get_index'+rowIndex+')">';
                                                            }
                                                            else{
                                                                return '<select id="selectnon" style="width:80;"><option value="0">1:N</option><option value="1">N:1</option><option value="4">1:1</option><option value="3">1:1 출발지 포트 가변</option><option value="5">Drop</option></select><input type="button" id="buttonid2" value="적용" style="margin-left:5;" onclick="Ext.getCmp(\'monitor_ips_uid_grid\').get_non_block(Ext.getCmp(\'monitor_ips_uid_grid\').get_record'+rowIndex+', selectnon, Ext.getCmp(\'monitor_ips_uid_grid\').get_index'+rowIndex+')">';
                                                            }
                                                        },
                                                        minWidth: 160,
                                                        align: 'center',
                                                        dataIndex: 'block_type',
                                                        flex: 0.15,
                                                        bind: {
                                                            text: '{deny}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        align: 'center',
                                                        dataIndex: 'audit',
                                                        flex: 0.07,
                                                        bind: {
                                                            text: '{note}'
                                                        },
                                                        items: [
                                                            {
                                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                    console.log(record);
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ],
                                                viewConfig: {
                                                    getRowClass: function(record, rowIndex, rowParams, store) {
                                                        if(record.data.priority === 1){
                                                            Ext.Function.defer(function(){
                                                                this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                                            },100, this);

                                                            return 'stCri';
                                                        }
                                                    },
                                                    scrollable: false
                                                },
                                                listeners: {
                                                    cellclick: 'onMonitor_ips_uid_gridCellClick'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        id: 'ips_uid_test_con'
                                    }
                                ],
                                dockedItems: [
                                    {
                                        xtype: 'toolbar',
                                        flex: 1,
                                        dock: 'top',
                                        cls: 'zen_toolbar',
                                        id: 'ips_uid_toolbar',
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        cls: 'x-title-text',
                                                        bind: {
                                                            text: '{detect_per_policy}'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'label',
                                                cls: 'lb_info',
                                                id: 'monitor_ips_filter_label1',
                                                margin: '5 0 0 0',
                                                width: 150,
                                                bind: {
                                                    text: '{filter_unused}'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                bind: {
                                                    text: '{filter_set}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick7'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        listeners: {
                            afterrender: 'onPanelAfterRender',
                            _beforedestroy0: 'onNFW2_monitor_ips_uidDestroy',
                            _beforedestroy1: 'onNFW2_monitor_ips_uid1BeforeDestroy',
                            beforedestroy: function() {
                                var me = this,
                                    args = Ext.toArray(arguments, 0, -1);
                                args.unshift('_beforedestroy0');
                                me.fireEvent.apply(me, args);
                                args[0] = '_beforedestroy1';
                                me.fireEvent.apply(me, args);
                            },
                            beforerender: 'onNFW2_monitor_ips_uidBeforeRender'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processMyCheckItem: function(config) {
        config.text = __zen('sec_5');

        return config;
    },

    processMyCheckItem1: function(config) {
        config.text = __zen('sec_10');

        return config;
    },

    processMyCheckItem2: function(config) {
        config.text = __zen('sec_20');

        return config;
    },

    processMyCheckItem3: function(config) {
        config.text = __zen('sec_30');

        return config;
    },

    processMyCheckItem4: function(config) {
        config.text = __zen('sec_60');

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout1');
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        var time = Ext.getCmp('update_time2').text.split(' ');

        if(button.state === true){
            //     var _params = {
            //         mode : Ext.encode('policy_traffic'),
            //         time_info : Ext.encode({'time_mins':me.btn_time, 'update_secs':Number(time[0]), 'start_ts':0}),
            //         menu_type : Ext.encode('monitor')
            //     };

            request_helper.xmlrpc_call_JsonP(
                'FtDBMgr',
                'getServerTime',
                {},

                function(response2){
                    me.start_ts = response2;
                    me.get_uid();
                    me.monitor_timeout();
                }
            );
        }
        else{
            if(Ext.getCmp('win_monitor_ips_uid_detail')){
                Ext.getCmp('monitor_ips_uid_grid').setHeight(document.body.clientHeight-188);
                Ext.getCmp('win_monitor_ips_uid_detail').close();
            }
            clearInterval(timeout.interval);
            Ext.getCmp('timeout1').setHtml(Number(time[0]));
        }
    },

    onMenucheckitemCheckChange4: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.update_sec = 5;
        Ext.getCmp('timeout1').setHtml(5);

        clearInterval(Ext.getCmp('timeout1').interval);

        if(Ext.getCmp('chk_btn').state === true){ me.monitor_timeout(); }
    },

    onMenucheckitemCheckChange3: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.update_sec = 10;

        Ext.getCmp('timeout1').setHtml(10);

        clearInterval(Ext.getCmp('timeout1').interval);

        if(Ext.getCmp('chk_btn').state === true){ me.monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.update_sec = 20;

        Ext.getCmp('timeout1').setHtml(20);

        clearInterval(Ext.getCmp('timeout1').interval);

        if(Ext.getCmp('chk_btn').state === true){ me.monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.update_sec = 30;

        Ext.getCmp('timeout1').setHtml(30);

        clearInterval(Ext.getCmp('timeout1').interval);

        if(Ext.getCmp('chk_btn').state === true){ me.monitor_timeout(); }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.update_sec = 60;

        Ext.getCmp('timeout1').setHtml(60);

        clearInterval(Ext.getCmp('timeout1').interval);

        if(Ext.getCmp('chk_btn').state === true){ me.monitor_timeout(); }
    },

    onStart_timeAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('start_time').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("start_time").setValue(inter.items[0].data['value']);
        }
    },

    onUpdate_chkChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');

        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if(String(month).length === 1){ month = String(0)+month; }
        var day = d.getDate();
        if(String(day).length === 1){ day = String(0)+day; }
        var hour = d.getHours();
        if(String(hour).length === 1){ hour = String(0)+hour; }
        var min = d.getMinutes();
        if(String(min).length === 1){ min = String(0)+min; }
        var sec = d.getSeconds();
        if(String(sec).length === 1){ sec = String(0)+sec; }

        if(newValue){
            me.src_time = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
            me.year = year;
            me.month = month;
            me.day = day;
            me.hour = hour;
            me.min = min;
            me.sec = sec;
            me.filter = [];
            me.update_sec = Number(Ext.getCmp('update_time').getValue());

            var time = Number(Ext.getCmp('start_time').getValue());
            var update = Number(Ext.getCmp('update_time').getValue());

            var _params = {
                mode : Ext.encode('policy_detect'),
                time_info : Ext.encode({'time_mins':time, 'update_secs':update, 'start_ts':0}),
                menu_type : Ext.encode('monitor')
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getIPSDashboardMon',
                _params,

                function(response){
                    me.start_ts = response.start_ts;
                    me.get_uid();
                    if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_uid, 5000); }
                    if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_uid, 10000); }
                    if(Ext.getCmp('update_time').getValue() === "20"){ me.interval = setInterval(me.get_uid, 20000); }
                    if(Ext.getCmp('update_time').getValue() === "30"){ me.interval = setInterval(me.get_uid, 30000); }
                    if(Ext.getCmp('update_time').getValue() === "60"){ me.interval = setInterval(me.get_uid, 60000); }
                }
            );
        }
        else{
            clearInterval(me.interval);
        }
    },

    onUpdate_timeAfterRender: function(component, eOpts) {
        // var inter = Ext.getCmp('update_time').getStore().data;

        // if(inter.length > 0){
        //     Ext.getCmp("update_time").setValue(inter.items[1].data['time']);
        // }
    },

    onUpdate_timeChange: function(field, newValue, oldValue, eOpts) {
        // var me = Ext.getCmp('NFW2_monitor_ips_uid');

        // clearInterval(me.interval);

        // if(Ext.getCmp('update_chk').getValue()){
        //     if(newValue === "5"){ me.interval = setInterval(me.get_uid, 5000); }
        //     if(newValue === "10"){ me.interval = setInterval(me.get_uid, 10000); }
        //     if(newValue === "20"){ me.interval = setInterval(me.get_uid, 20000); }
        //     if(newValue === "30"){ me.interval = setInterval(me.get_uid, 30000); }
        //     if(newValue === "60"){ me.interval = setInterval(me.get_uid, 60000); }
        // }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');

        me.btn_time = 5;
        var time = Ext.getCmp('update_time2').text.split(' ');
        Ext.getCmp('timeout1').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout1').interval);
        // Ext.getCmp('NFW2_monitor_ips_uid').get_uid();
        if(Ext.getCmp('chk_btn').state === true){ me.monitor_timeout(); }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');

        me.btn_time = 10;
        var time = Ext.getCmp('update_time2').text.split(' ');
        Ext.getCmp('timeout1').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout1').interval);
        // Ext.getCmp('NFW2_monitor_ips_uid').get_uid();
        if(Ext.getCmp('chk_btn').state === true){ me.monitor_timeout(); }
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');

        me.btn_time = 30;
        var time = Ext.getCmp('update_time2').text.split(' ');
        Ext.getCmp('timeout1').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout1').interval);
        // Ext.getCmp('NFW2_monitor_ips_uid').get_uid();
        if(Ext.getCmp('chk_btn').state === true){ me.monitor_timeout(); }
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');

        me.btn_time = 60;
        var time = Ext.getCmp('update_time2').text.split(' ');
        Ext.getCmp('timeout1').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout1').interval);
        // Ext.getCmp('NFW2_monitor_ips_uid').get_uid();
        if(Ext.getCmp('chk_btn').state === true){ me.monitor_timeout(); }
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');

        me.btn_time = 300;
        var time = Ext.getCmp('update_time2').text.split(' ');
        Ext.getCmp('timeout1').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout1').interval);
        // Ext.getCmp('NFW2_monitor_ips_uid').get_uid();
        if(Ext.getCmp('chk_btn').state === true){ me.monitor_timeout(); }
    },

    onButtonClick6: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');

        me.btn_time = 720;
        var time = Ext.getCmp('update_time2').text.split(' ');
        Ext.getCmp('timeout1').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout1').interval);
        // Ext.getCmp('NFW2_monitor_ips_uid').get_uid();
        if(Ext.getCmp('chk_btn').state === true){ me.monitor_timeout(); }
    },

    onButtonClick2: function(button, e, eOpts) {
        var mode = Ext.getCmp('NFW2_monitor_ips_uid').mode;
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        var win = Ext.create('NFW2.view.win_monitor_ips_uid_filter',{
            mode : mode,
            get_filter : me.get_filter,
            modal : true
        });
        win.show();

        // clearInterval(Ext.getCmp('timeout1').interval);
        // if(Ext.getCmp('chk_btn').state === true){
        //     Ext.getCmp('chk_btn').state = false;
        //     Ext.getCmp('chk_btn').moveHandle(false);
        // }
    },

    onMonitor_ips_uid_gridCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');

        if(e.target.className !== 'dbtn tra' && e.target.className !== 'dbtn who' && cellIndex !== 9){
            if(me.mode === "board"){
                Ext.getCmp('con_top_grid').hide();
                if(Ext.getCmp('con_top').items.length < 3){
                    var win = Ext.create('NFW2.view.win_monitor_ips_uid_details',{
                        mode : "board",
                        record : record
                    });
                    Ext.getCmp('con_top').add(win);
                }
                else if(Ext.getCmp('con_top').items.length === 3){
                    Ext.getCmp('con_top').remove(Ext.getCmp('con_top').items.items[Ext.getCmp('con_top').items.items.length-1]);
                    var win = Ext.create('NFW2.view.win_monitor_ips_uid_details',{
                        mode : "board",
                        record : record
                    });
                    Ext.getCmp('con_top').add(win);
                }
            }
            else{
                if(!Ext.getCmp('win_monitor_ips_uid_detail')){
                    Ext.getCmp('monitor_ips_uid_grid').setHeight(document.body.clientHeight-488);
                    var win = Ext.create('NFW2.view.win_monitor_ips_uid_detail',{
                        width : Ext.getCmp('NFW2_monitor_ips_uid').getSize().width-40,
                        record : record,
                        before_scroll : me.before_scroll
                    });
                    win.show();
                    win.alignTo(Ext.getCmp('NFW2_monitor_ips_uid'), 'tl',[20,Number(document.body.clientHeight)-100+Number(document.body.scrollTop)-300]);//'tl',[10, e.xy[1]-20]);
                }
                else{
                    Ext.getCmp('win_monitor_ips_uid_detail').close();
                    Ext.getCmp('monitor_ips_uid_grid').setHeight(document.body.clientHeight-488);
                    var win = Ext.create('NFW2.view.win_monitor_ips_uid_detail',{
                        width : Ext.getCmp('NFW2_monitor_ips_uid').getSize().width-40,
                        record : record,
                        before_scroll : me.before_scroll
                    });
                    win.show();
                    win.alignTo(Ext.getCmp('NFW2_monitor_ips_uid'), 'tl',[20,Number(document.body.clientHeight)-100+Number(document.body.scrollTop)-300]);//'tl',[10, e.xy[1]-20]);
                }
            }
        }

    },

    onButtonClick7: function(button, e, eOpts) {
        var mode = Ext.getCmp('NFW2_monitor_ips_uid').mode;
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        var win = Ext.create('NFW2.view.win_monitor_ips_uid_filter',{
            mode : mode,
            get_filter : me.get_filter,
            modal : true
        });
        win.show();

        // clearInterval(Ext.getCmp('timeout').interval);
        // if(Ext.getCmp('chk_btn').state === true){
        //     Ext.getCmp('chk_btn').state = false;
        //     Ext.getCmp('chk_btn').moveHandle(false);
        // }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.get_detail = false;
        me.get_detail_data = [];
        me.get_filter = [];

        me.src_time = 0;
        me.filter = [];
        me.start_ts = 0;
        me.btn_time = 5;
        me.update_sec = 10;
        me.update_board = 5;
        var min_time = 5;

        if(me.mode === "board"){
            var time = Ext.getCmp('update_time').text.split(' ');
        }
        else{
            var time = Ext.getCmp('update_time2').text.split(' ');
        }

        // var _params = {
        //     mode : Ext.encode('policy_traffic'),
        //     time_info : Ext.encode({'time_mins':Number(time[0]), 'update_secs':min_time, 'start_ts':0}),
        //     menu_type : Ext.encode('monitor')
        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'getIPSDashboardMon',
        //     _params,

        //     function(response2){
        var _params2 = {};
        if(me.mode === "board"){
            Ext.getCmp('monitor_ips_uid_con').hide();
            Ext.getCmp('ips_uid_board_label').show();

            _params2 = {
                mode : Ext.encode('filtering'),
                menu_type : Ext.encode('dashboard')
            };
        }
        else{
            Ext.getCmp('monitor_ips_uid_grid').on('cellclick',function(){
                me.before_scroll = document.body.scrollTop;
            });

            Ext.fly(document).on("scroll", function(){
                if(Ext.getCmp('win_monitor_ips_uid_detail')){
                    var panel = Ext.getCmp('win_monitor_ips_uid_detail');
                    panel.setY(panel.getY()+document.body.scrollTop-me.before_scroll);
                    me.before_scroll = document.body.scrollTop;
                }
            });

            Ext.EventManager.onWindowResize(function(){
                if(Ext.getCmp('win_monitor_ips_uid_detail')){
                    Ext.getCmp('monitor_ips_uid_grid').setHeight(document.body.clientHeight-488);
                    var panel = Ext.getCmp('win_monitor_ips_uid_detail');
                    panel.setY(document.body.clientHeight+document.body.scrollTop-300);
                    panel.setWidth(document.body.clientWidth-150);
                    panel.doLayout();
                }
                else{
                    if(Ext.getCmp('monitor_ips_uid_grid')){
                        Ext.getCmp('monitor_ips_uid_grid').setHeight(document.body.clientHeight-188);
                    }
                }
            });
            Ext.getCmp('monitor_ips_uid_con').show();
            Ext.getCmp('ips_uid_board_label').hide();

            _params2 = {
                mode : Ext.encode('filtering'),
                menu_type : Ext.encode('monitor')
            };
        }

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getIPSDashboardConf',
            _params2,

            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                //         me.start_ts = response2.start_ts;
                me.get_filter = response.filter_list;

                if(response.filter_list.length  > 0){
                    Ext.getCmp('monitor_ips_filter_label').setText(__zen('filter_used'));
                    Ext.getCmp('monitor_ips_filter_label1').setText(__zen('filter_used'));
                }
                else{
                    Ext.getCmp('monitor_ips_filter_label').setText(__zen('filter_unused'));
                    Ext.getCmp('monitor_ips_filter_label1').setText(__zen('filter_unused'));
                }
            }
        );

        //     }
        // );

        // var _params = {
        //                     mode : Ext.encode('policy_traffic'),
        //     time_info : Ext.encode({'time_mins':5, 'update_secs':5, 'start_ts':0})
        //                 };

        //                 request_helper.xmlrpc_call_JsonP(
        //                     'ftuctrl',
        //                     'getIPSDashboardMon',
        //                     _params,

        //                     function(response){


        //                         }
        //                     );
    },

    onNFW2_monitor_ips_uidDestroy: function(component, eOpts) {
        if(Ext.getCmp('timeout1')){
            clearInterval(Ext.getCmp('timeout1').interval);
        }

        Ext.data.StoreManager.lookup('store_monitor_ips_uid_list').removeAll();
    },

    onNFW2_monitor_ips_uid1BeforeDestroy: function(component, eOpts) {
        if(Ext.getCmp('win_monitor_ips_uid_detail')){
            Ext.getCmp('win_monitor_ips_uid_detail').close();
        }
    },

    onNFW2_monitor_ips_uidBeforeRender: function(component, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');

        if(me.mode === "board"){
            Ext.getCmp('monitor_ips_uid_grid').autoScroll = true;
            //Ext.getCmp('monitor_ips_uid_grid').setHeight(185);
            Ext.getCmp('NFW2_monitor_ips_uid1').header = false;
            Ext.getCmp('ips_uid_form').bodyPadding = 0;
            Ext.getCmp('ips_uid_timeout_con').hide();
            Ext.getCmp('ips_uid_set_con').hide();
            Ext.getCmp('ips_uid_toolbar').show();
        }
        else{
            Ext.getCmp('ips_uid_timeout_con').show();
            Ext.getCmp('ips_uid_set_con').show();
            Ext.getCmp('ips_uid_toolbar').hide();
            Ext.getCmp('monitor_ips_uid_grid').setHeight(document.body.clientHeight-188);
            //     Ext.getCmp('ips_uid_form').bodyPadding = 10;
        }
    },

    get_uid: function() {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');

        var now_time = year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if(String(month).length === 1){ month = String(0)+month; }
        var day = d.getDate();
        if(String(day).length === 1){ day = String(0)+day; }
        var hour = d.getHours();
        if(String(hour).length === 1){ hour = String(0)+hour; }
        var min = d.getMinutes();
        if(String(min).length === 1){ min = String(0)+min; }
        var sec = d.getSeconds();
        if(String(sec).length === 1){ sec = String(0)+sec; }

        var topn_param = {};

        if(me.mode === "board"){
            var time = Ext.getCmp('update_time').text.split(' ');
        }
        else{
            var time = Ext.getCmp('update_time2').text.split(' ');
        }

        if(me.get_detail){
            var time_mins = me.btn_time;
            var update_secs = Number(time[0]);
            var _params = {};

            if(me.mode === "board"){
                topn_param = {'spd_id':me.get_detail_data[0],'sip':me.get_detail_data[1],'dip':me.get_detail_data[2]};

            }
            else{
                topn_param = {'spd_id':me.get_detail_data[0],'sip':me.get_detail_data[1],'dip':me.get_detail_data[2]};
            }
        }

        var time_mins = me.btn_time;
        var update_secs = Number(time[0]);

        if(me.mode === "board"){
            var update = update_secs;
            var min_time = me.btn_time;
            var times = Number(min_time);

            var _store_policy = Ext.data.StoreManager.lookup("store_daships_policy");

            var _params = {
                mode : Ext.encode('policy_combine'),
                time_info : Ext.encode({'time_mins':times, 'update_secs':me.update_board, 'start_ts':me.start_ts, 'period':update_secs}),
                menu_type : Ext.encode('dashboard'),
                topn_param : Ext.encode(topn_param)
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getIPSDashboardMon',
                _params,

                function(response){
                    if(response._traffic.list){
                        _store_policy.loadData(response._traffic.list);
                    }
                    var chk_policy = [];

                    for(var k in Ext.getCmp('NFW2_ips').p_uid){
                        var temp = String(k).split('_');

                        if(Ext.getCmp('NFW2_ips').p_uid[k] === true){
                            chk_policy.push(temp[1]);
                        }
                    }

                    var record = [];
                    if(response !== null){
                        for(var i in response._detect.list){
                            for(var l in chk_policy){
                                if(response._detect.list[i].spd_id === Number(chk_policy[l])){
                                    record.push({
                                        'time' : response._detect.list[i].time,
                                        'policy' : response._detect.list[i].spd_id,
                                        'fsid' : response._detect.list[i].fsid,
                                        'signature_name' : response._detect.list[i].signature_name,
                                        'sip' : response._detect.list[i].sip,
                                        'sport' : response._detect.list[i].sport,
                                        'dip' : response._detect.list[i].dip,
                                        'dport' : response._detect.list[i].dport,
                                        'block_count' : response._detect.list[i].block_counts,
                                        'bytes' : response._detect.list[i].block_bytes,
                                        'block_type' : response._detect.list[i].block_type,
                                        'protocol' : response._detect.list[i].protocol,
                                        'priority' : response._detect.list[i].priority,
                                        'sip_cc' : response._detect.list[i].sip_cc,
                                        'dip_cc' : response._detect.list[i].dip_cc
                                    });
                                }
                            }
                        }
                    }

                    var store = Ext.data.StoreManager.lookup('store_monitor_ips_uid_list');
                    store.loadData(record);
                    var _store_alarm = Ext.data.StoreManager.lookup("store_dashtraffic_alarm");
                    if(response._alarm.list){
                        _store_alarm.loadData(response._alarm.list);
                    }

                    if(response._topn.length !== 0){
                        var record_detail1 = [];
                        var record_detail2 = [];
                        var record_detail3 = [];

                        for(var i in response._topn.topn_src){
                            var detail1 = [];
                            for(var l in response._topn.topn_src[i].details){
                                detail1.push(response._topn.topn_src[i].details[l]);
                            }
                            record_detail1.push({
                                'id' : i,
                                'ip' : response._topn.topn_src[i].ip,
                                'protocol' : response._topn.topn_src[i].protocol,
                                'detect' : response._topn.topn_src[i].detect,
                                'block' : response._topn.topn_src[i].block,
                                'percent' : response._topn.topn_src[i].perc,
                                'details' : detail1

                            });
                        }

                        for(var j in response._topn.topn_dest){
                            var detail2 = [];
                            for(var m in response._topn.topn_dest[j].details){
                                detail2.push(response._topn.topn_dest[j].details[m]);
                            }
                            record_detail2.push({
                                'id' : j,
                                'ip' : response._topn.topn_dest[j].ip,
                                'protocol' : response._topn.topn_dest[j].protocol,
                                'detect' : response._topn.topn_dest[j].detect,
                                'block' : response._topn.topn_dest[j].block,
                                'percent' : response._topn.topn_dest[j].perc,
                                'details' : detail2
                            });
                        }

                        for(var k in response._topn.topn_priority){
                            var detail3 = [];
                            for(var n in response._topn.topn_priority[k].details){
                                detail3.push(response._topn.topn_priority[k].details[n]);
                            }
                            record_detail3.push({
                                'id' : k,
                                'priority' : response._topn.topn_priority[k].priority,
                                'percent' : response._topn.topn_priority[k].perc,
                                'details' : detail3
                            });
                        }

                        Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list1').loadData(record_detail1);
                        Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list2').loadData(record_detail2);
                        Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list3').loadData(record_detail3);
                    }
                    if(Ext.getCmp('con_top_grid').hidden === false){
                        me.get_attack(me.start_ts, me.update_board);
                    }

                    if(me.update_board < Number(me.btn_time*60)){
                        me.update_board += Number(time[0]);
                    }
                    else{
                        me.start_ts = response.start_ts+Number(time[0]);
                    }
                }
            );
        }
        else{
            var time_mins = me.btn_time;
            var update_secs = Number(time[0]);
            var time_info = [];

            var _params = {
                mode : Ext.encode('policy_combine'),
                time_info : Ext.encode({'time_mins':time_mins, 'update_secs':me.update_sec, 'start_ts':me.start_ts, 'period':update_secs}),
                menu_type : Ext.encode('monitor'),
                topn_param : Ext.encode(topn_param)
            };

            request_helper.xmlrpc_call_Ajax_Get(
                'ftuctrl',
                'getIPSDashboardMon',
                _params,

                function(response){
                    var record = [];
                    if(response._detect.list){
                        if(response._detect.list.length === 0){ Ext.getCmp('uid_data_error').show(); }
                        else{ Ext.getCmp('uid_data_error').hide(); }
                        for(var i in response._detect.list){
                            record.push({
                                'time' : response._detect.list[i].time,
                                'policy' : response._detect.list[i].spd_id,
                                'fsid' : response._detect.list[i].fsid,
                                'signature_name' : response._detect.list[i].signature_name,
                                'sip' : response._detect.list[i].sip,
                                'sport' : response._detect.list[i].sport,
                                'dip' : response._detect.list[i].dip,
                                'dport' : response._detect.list[i].dport,
                                'block_count' : response._detect.list[i].block_counts,
                                'bytes' : response._detect.list[i].block_bytes,
                                'block_type' : response._detect.list[i].block_type,
                                'protocol' : response._detect.list[i].protocol,
                                'priority' : response._detect.list[i].priority,
                                'sip_cc' : response._detect.list[i].sip_cc,
                                'dip_cc' : response._detect.list[i].dip_cc
                            });
                        }
                    }

                    var store = Ext.data.StoreManager.lookup('store_monitor_ips_uid_list');
                    if(Ext.getCmp('NFW2_monitor_ips_uid')){
                        store.loadData(record);
                    }

                    if(response._topn.length !== 0){
                        var record_detail1 = [];
                        var record_detail2 = [];
                        var record_detail3 = [];

                        for(var i in response._topn.topn_src){
                            var detail1 = [];
                            for(var l in response._topn.topn_src[i].details){
                                detail1.push(response._topn.topn_src[i].details[l]);
                            }
                            record_detail1.push({
                                'id' : i,
                                'ip' : response._topn.topn_src[i].ip,
                                'protocol' : response._topn.topn_src[i].protocol,
                                'detect' : response._topn.topn_src[i].detect,
                                'block' : response._topn.topn_src[i].block,
                                'percent' : response._topn.topn_src[i].perc,
                                'details' : detail1

                            });
                        }

                        for(var j in response._topn.topn_dest){
                            var detail2 = [];
                            for(var m in response._topn.topn_dest[j].details){
                                detail2.push(response._topn.topn_dest[j].details[m]);
                            }
                            record_detail2.push({
                                'id' : j,
                                'ip' : response._topn.topn_dest[j].ip,
                                'protocol' : response._topn.topn_dest[j].protocol,
                                'detect' : response._topn.topn_dest[j].detect,
                                'block' : response._topn.topn_dest[j].block,
                                'percent' : response._topn.topn_dest[j].perc,
                                'details' : detail2
                            });
                        }

                        for(var k in response._topn.topn_priority){
                            var detail3 = [];
                            for(var n in response._topn.topn_priority[k].details){
                                detail3.push(response._topn.topn_priority[k].details[n]);
                            }
                            record_detail3.push({
                                'id' : k,
                                'priority' : response._topn.topn_priority[k].priority,
                                'percent' : response._topn.topn_priority[k].perc,
                                'details' : detail3
                            });
                        }

                        Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list1').loadData(record_detail1);
                        Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list2').loadData(record_detail2);
                        Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list3').loadData(record_detail3);
                    }

                    if(me.update_sec < Number(me.btn_time*60)){
                        me.update_sec += Number(time[0]);
                    }
                    else{
                        me.start_ts = response.start_ts+Number(time[0]);
                    }
                }
            );
        }
    },

    get_attack: function(start_ts, update_sec) {
        var me = Ext.getCmp('NFW2_ips');
        var time = Ext.getCmp('update_time').text.split(' ');
        var att_limit = me.att_max+1;
        var port_limit = me.sport_max+1;
        var detect_limit = me.detect_max+1;
        var block_limit = me.block_max+1;

        var _params2 = {
            type : Ext.encode('all'),
            criteria : Ext.encode({}),
            time_info : Ext.encode({'time_mins':Ext.getCmp('NFW2_monitor_ips_uid').btn_time, 'update_secs':update_sec, 'start_ts':start_ts}),
            //     start_ts : Ext.encode(start_ts),
            //     end_ts : Ext.encode(datetime),
            detect_cnt : Ext.encode(0),
            block_cnt : Ext.encode(0),
            limit : Ext.encode({'attack':att_limit,'port':port_limit,'detect':detect_limit,'block':block_limit})
        };

        var record1 = [];
        var record2 = [];
        var record3 = [];
        var record4 = [];

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getMonitorIPSTOP10',
            _params2,

            function(response){
                var n = 1;
                for(var i in response.ips_list.attack){
                    if(i < me.att_max){
                        record1.push({
                            'num' : n++,
                            'src' : response.ips_list.attack[i].attacker,
                            'detect' : response.ips_list.attack[i].detect,
                            'block' : response.ips_list.attack[i].block
                        });
                    }
                }
                n = 1;
                for(var j in response.ips_list.port){
                    if(j < me.sport_max){
                        record2.push({
                            'num': n++,
                            'sport' : response.ips_list.port[j].dport,
                            'detect' : response.ips_list.port[j].detect,
                            'block' : response.ips_list.port[j].block,
                            'protocol' : response.ips_list.port[j].protocol
                        });
                    }
                }
                n = 1;
                for(var k in response.ips_list.detect){
                    if(k < me.detect_max){
                        if(Number(response.ips_list.detect[k].detect) > 0){
                            record3.push({
                                'num': n++,
                                'signature_name' : response.ips_list.detect[k].pattern_name,
                                'detect' : response.ips_list.detect[k].detect,
                                'block' : response.ips_list.detect[k].block,
                                'priority' : response.ips_list.detect[k].priority
                            });
                        }
                    }
                }
                n = 1;
                for(var l in response.ips_list.block){
                    if(l < me.block_max){
                        if(Number(response.ips_list.block[l].block) > 0){
                            record4.push({
                                'num': n++,
                                'signature_name' : response.ips_list.block[l].pattern_name,
                                'detect' : response.ips_list.block[l].detect,
                                'block' : response.ips_list.block[l].block,
                                'priority' : response.ips_list.block[l].priority
                            });
                        }
                    }
                }

                Ext.getCmp('ips_attack_grid').getStore().loadData(record1);
                Ext.getCmp('ips_port_grid').getStore().loadData(record2);
                Ext.getCmp('ips_detect_grid').getStore().loadData(record3);
                Ext.getCmp('ips_block_grid').getStore().loadData(record4);
                if(response.ips_list.attack){
                    if(response.ips_list.attack.length > me.att_max){
                        Ext.getCmp("btn_att_more").show();
                    }else{
                        Ext.getCmp("btn_att_more").hide();
                    }
                }
                if(response.ips_list.port){
                    if(response.ips_list.port.length > me.sport_max){
                        Ext.getCmp("btn_sport_more").show();
                    }else{
                        Ext.getCmp("btn_sport_more").hide();
                    }
                }
                if(response.ips_list.detect){
                    if(response.ips_list.detect.length > me.detect_max){
                        Ext.getCmp("btn_detect_more").show();
                    }else{
                        Ext.getCmp("btn_detect_more").hide();
                    }
                }
                if(response.ips_list.block){
                    if(response.ips_list.block.length > me.block_max){
                        Ext.getCmp("btn_block_more").show();
                    }else{
                        Ext.getCmp("btn_block_more").hide();
                    }
                }
            }
        );
    },

    monitor_timeout: function() {
        var time = Ext.getCmp('update_time2').text.split(' ');
        var chk_time = Number(time[0]);

        Ext.getCmp('timeout1').interval = setInterval(count_time, 1000);

        function count_time(){
            chk_time--;
            if(chk_time === 0){ chk_time = Number(time[0]); Ext.getCmp('timeout1').set_data(); }
            Ext.getCmp('timeout1').setHtml(chk_time);
        }
    }

});