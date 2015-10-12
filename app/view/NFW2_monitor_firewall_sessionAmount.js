
Ext.define('NFW2.view.NFW2_monitor_firewall_sessionAmount', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_firewall_sessionamount',

    requires: [
        'NFW2.view.NFW2_monitor_firewall_sessionAmountViewModel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.button.Segmented',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    config: {
        flex: 1
    },

    viewModel: {
        type: 'nfw2_monitor_firewall_sessionamount'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_firewall_sessionAmount',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onPanelBeforeDestroy'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'panel',
                                flex: 1,
                                scrollable: true,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        cls: 'dv_monitor',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle'
                                        },
                                        items: [
                                            {
                                                xtype: 'toggleslide',
                                                resizeHandle: false,
                                                state: true,
                                                cls: 'custom-color-monitor',
                                                id: 'chk_btn',
                                                listeners: {
                                                    change: 'onChk_btnChange'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                set_data: function() {
                                                    var me = Ext.getCmp('NFW2_monitor_firewall_sessionAmount');

                                                    me.get_session_data();
                                                },
                                                cls: 'dv_timecount',
                                                html: 5,
                                                id: 'timeout',
                                                width: 55
                                            },
                                            {
                                                xtype: 'cycle',
                                                focusCls: 'btn_f',
                                                cls: 'sel_monitor',
                                                id: 'update_time',
                                                showText: true,
                                                menu: {
                                                    xtype: 'menu',
                                                    width: 120,
                                                    items: [
                                                        me.processMyCheckItem({
                                                            xtype: 'menucheckitem',
                                                            focusable: true,
                                                            listeners: {
                                                                checkchange: 'onMenucheckitemCheckChange3'
                                                            }
                                                        }),
                                                        me.processMyCheckItem1({
                                                            xtype: 'menucheckitem',
                                                            focusable: true,
                                                            checked: true,
                                                            listeners: {
                                                                checkchange: 'onMenucheckitemCheckChange2'
                                                            }
                                                        }),
                                                        me.processMyCheckItem2({
                                                            xtype: 'menucheckitem',
                                                            focusable: true,
                                                            listeners: {
                                                                checkchange: 'onMenucheckitemCheckChange1'
                                                            }
                                                        }),
                                                        me.processMyCheckItem3({
                                                            xtype: 'menucheckitem',
                                                            focusable: true,
                                                            listeners: {
                                                                checkchange: 'onMenucheckitemCheckChange'
                                                            }
                                                        })
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '10 0 0 10',
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
                                                            text: '{min_30}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick2'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{hour_1}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick1'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{hour_12}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{hour_24}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick3'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        height: 40,
                                        hidden: true,
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle',
                                            pack: 'end'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                margin: 5,
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        cls: 'lb_sq',
                                                        id: 'l_time',
                                                        text: '최종 수정 시간 :'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'combobox',
                                                flex: 1,
                                                hidden: true,
                                                itemId: 'cb_key',
                                                margin: 5,
                                                maxWidth: 300,
                                                fieldLabel: '항목',
                                                labelCls: 'lb_sq',
                                                labelSeparator: ' ',
                                                labelWidth: 50,
                                                value: 'session',
                                                editable: false,
                                                displayField: 'name',
                                                forceSelection: true,
                                                queryMode: 'local',
                                                store: 'store_monitor_session_key',
                                                valueField: 'value',
                                                multiSelect: true,
                                                listeners: {
                                                    change: 'onComboboxChange1'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                flex: 1,
                                                hidden: true,
                                                itemId: 'cb_item',
                                                margin: 5,
                                                maxWidth: 300,
                                                fieldLabel: '항목',
                                                labelCls: 'lb_sq',
                                                labelSeparator: ' ',
                                                labelWidth: 50,
                                                value: [
                                                    'avg',
                                                    'min',
                                                    'max'
                                                ],
                                                editable: false,
                                                displayField: 'name',
                                                forceSelection: true,
                                                queryMode: 'local',
                                                store: 'store_monitor_item',
                                                valueField: 'value',
                                                multiSelect: true,
                                                listeners: {
                                                    change: 'onComboboxChange'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                itemId: 'cb_seconds',
                                                margin: 5,
                                                width: 180,
                                                fieldLabel: '시간',
                                                labelCls: 'lb_sq',
                                                labelSeparator: ' ',
                                                labelWidth: 50,
                                                value: 1800,
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_monitor_seconds',
                                                valueField: 'value',
                                                listeners: {
                                                    change: 'onCb_secondsChange'
                                                }
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'chk_update',
                                                margin: '0 0 0 5',
                                                labelCls: 'lb_sq',
                                                boxLabel: '업데이트 주기 (초)',
                                                checked: true,
                                                listeners: {
                                                    change: 'onChk_updateChange'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                itemId: 'cb_update_interval',
                                                margin: 5,
                                                maxWidth: 300,
                                                width: 70,
                                                labelWidth: 150,
                                                value: 5000,
                                                editable: false,
                                                displayField: 'name',
                                                store: 'store_monitor_interval',
                                                valueField: 'value',
                                                listeners: {
                                                    change: 'onCb_update_intervalChange'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        hidden: true,
                                        scrollable: true,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'panel',
                                                flex: 1,
                                                border: false,
                                                hidden: true,
                                                id: 'pnl_traffic_session_chart',
                                                minWidth: 400,
                                                layout: 'fit'
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                hidden: true,
                                                id: 'gpn_traffic_session',
                                                margin: 10,
                                                scrollable: {
                                                    x: true,
                                                    y: true
                                                },
                                                width: 300,
                                                store: 'store_monitor_grid',
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return "<span style='color:" + record.data.color + ";font-weight:bold' >"+value+"</span>";

                                                        },
                                                        dataIndex: 'name',
                                                        text: '세션',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return "<span style='color:red;' >"+addComma(value)+"</span>";

                                                        },
                                                        dataIndex: 'max',
                                                        text: '최대',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return addComma(value);

                                                        },
                                                        dataIndex: 'avg',
                                                        text: '평균',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return addComma(value);

                                                        },
                                                        dataIndex: 'min',
                                                        text: '최소',
                                                        flex: 1
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        set_chart: function(record, type) {
                                            var me = Ext.getCmp('NFW2_monitor_firewall_sessionAmount');

                                            if(type === "cre"){
                                                if(me.myChart !== undefined){
                                                    me.myChart.clear();
                                                }
                                                var time = [];
                                                var avg = [];
                                                var buf_avg = [];
                                                var cac_avg = [];
                                                var fre_avg = [];
                                                var mem_use = [];
                                                var color = [
                                                '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                                                '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                                                '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                                                '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                                                ];

                                                for(var i in record){
                                                    avg.push(String(record[i].y));
                                                    time.push(record[i]._inc);
                                                }

                                                me.chart_option = {
                                                    tooltip : {
                                                        trigger: 'axis',
                                                        formatter: function(value){
                                                            var result = "";
                                                            if(value.length !== 0){
                                                                result += value[0][1];
                                                            }
                                                            for(var i in value){
                                                                var color_chk = 0;

                                                                result += '<br/><span style="color:'+color[i]+';">Session : ' + value[i][2] + '</span>';
                                                            }

                                                            return result;
                                                        },
                                                        backgroundColor : 'rgba(0,0,0,0.9)'
                                                    },
                                                    legend: {
                                                        data:[__zen('session')],
                                                        orient : 'vertical',
                                                        x :'right'
                                                    },
                                                    dataZoom : {
                                                        show : true,
                                                        realtime : true,
                                                        start : 0,
                                                        end : 100
                                                    },
                                                    grid : {
                                                        x : 110,
                                                        width : Ext.getCmp('session_con').wid-280
                                                    },
                                                    xAxis : [
                                                    {
                                                        type : 'category',
                                                        boundaryGap : false,
                                                        name : __zen('hours'),
                                                        data : time,
                                                        axisLabel : {
                                                            formatter: function(value){
                                                                var temp = value.split(' ');
                                                                var data = temp[1].split(':');
                                                                var result = data[0] + ":" + data[1];
                                                                return result;
                                                            }
                                                        }
                                                    }
                                                    ],
                                                    yAxis : [
                                                    {
                                                        type : 'value',
                                                        name :__zen('hours'),
                                                        splitArea : {
                                                            show:true,
                                                            areaStyle : {
                                                                color: [
                                                                'rgba(250,250,250,0.3)',
                                                                'rgba(200,200,200,0.3)'
                                                                ]
                                                            }
                                                        },
                                                        min : 0
                                                    }
                                                    ],
                                                    series : [
                                                    {
                                                        name:'Session',
                                                        type:'line',
                                                        data: avg,
                                                        symbol:'none',
                                                        smooth:true,
                                                        clickable: false

                                                    }
                                                    ],
                                                    animation : false,
                                                    noDataLoadingOption : {
                                                        text : '데이터가 없습니다',
                                                        effect : 'spin'

                                                    }
                                                };

                                                me.myChart.setOption(me.chart_option);
                                            }
                                            else{
                                                if(me.myChart._chartList.length !== 0){
                                                    me.myChart.addData([[0,record[record.length-1].y,false,false,record[record.length-1]._inc]]);
                                                }
                                            }
                                        },
                                        flex: 1,
                                        html: '<div id="session_chart" style="height:400px;"></div>',
                                        id: 'session_con',
                                        padding: 10,
                                        listeners: {
                                            afterrender: 'onContainerAfterRender',
                                            resize: 'onSession_conResize'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '30 0 0 30',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                cls: 'dv_mbox',
                                                margin: '0 3 0 0',
                                                padding: 10,
                                                width: 230,
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        margin: '10 0 20 0',
                                                        bind: {
                                                            text: '{session}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        cls: 'f_m_big',
                                                        id: 'ses_max',
                                                        margin: '20 0'
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        bind: {
                                                            text: '{maximum}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        cls: 'dv_mbox_in',
                                                        margin: '20 0',
                                                        padding: '20 0',
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'container',
                                                                margin: '0 15',
                                                                layout: {
                                                                    type: 'vbox',
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'f_m_small',
                                                                        id: 'ses_avg'
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        bind: {
                                                                            text: '{average}'
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                margin: '0 15',
                                                                layout: {
                                                                    type: 'vbox',
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'label',
                                                                        flex: 1,
                                                                        cls: 'f_m_small',
                                                                        id: 'ses_min'
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        flex: 1,
                                                                        bind: {
                                                                            text: '{minimum}'
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
        config.text = __zen('sec_2');

        return config;
    },

    processMyCheckItem1: function(config) {
        config.text = __zen('sec_5');

        return config;
    },

    processMyCheckItem2: function(config) {
        config.text = __zen('sec_10');

        return config;
    },

    processMyCheckItem3: function(config) {
        config.text = __zen('sec_30');

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_monitor_firewall_sessionAmount');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(me.btn_time === 43200){
            Ext.getCmp('chk_btn').state = true;
            Ext.getCmp('chk_btn').moveHandle(true);
            return false;
        }
        else{
        if(button.state === true){
            me.get_rrdFetchLast_session();
            monitor_timeout();
            //     var time = Ext.getCmp('update_time').text.split(' ');
            //     me.get_rrdFetchLast_cpu();
            //     timeout.interval = setInterval(me.get_rrdFetchLast_cpu, Number(time[0])*1000);
        }
        else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
        }
    },

    onMenucheckitemCheckChange3: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(2);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(5);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_sessionAmount');
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        me.btn_time = 1800;
        showCompLoadMask(Ext.getCmp('NFW2_monitor_firewall_sessionAmount'));
        me.get_rrdFetchLast_session();

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_sessionAmount');
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        me.btn_time = 3600;
        showCompLoadMask(Ext.getCmp('NFW2_monitor_firewall_sessionAmount'));
        me.get_rrdFetchLast_session();

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_sessionAmount');
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        me.btn_time = 43200;
        showCompLoadMask(Ext.getCmp('NFW2_monitor_firewall_sessionAmount'));
        me.get_rrdFetchLast_session();

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_sessionAmount');
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        me.btn_time = 86400;
        showCompLoadMask(Ext.getCmp('NFW2_monitor_firewall_sessionAmount'));
        me.get_rrdFetchLast_session();

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onComboboxChange1: function(field, newValue, oldValue, eOpts) {
        var me = this;

        // me.get_rrdFetchLast_session();

    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        // me.get_rrdFetchLast_session();

    },

    onCb_secondsChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        // me.get_rrdFetchLast_session();
    },

    onChk_updateChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        // me.get_rrdFetchLast_session();

    },

    onCb_update_intervalChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        // me.get_rrdFetchLast_session();

    },

    onContainerAfterRender: function(component, eOpts) {
        var con = Ext.getCmp('session_con');
        con.wid = document.body.clientWidth - 150;

        document.getElementById('session_chart').style.width = con.wid+"px";var me = Ext.getCmp('NFW2_monitor_system_cpu');
    },

    onSession_conResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        var me = this;

        if(me.myChart._option !== undefined){
            var get_chart = me.myChart.getOption();
            var wid = document.body.clientWidth - 150;
            me.chart_option.grid.width = wid-280;

            for(var i in get_chart.series){
                me.chart_option.series[i].data = get_chart.series[i].data;
            }

            me.myChart.setOption(me.chart_option, true);
            document.getElementById('session_chart').style.width = wid+"px";

            me.myChart.resize();
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.btn_time = 1800;
        me._data = [];
        me.myChart = echarts.init(document.getElementById('session_chart'),'macarons');
        component.get_rrdFetchLast_session();
        monitor_timeout();
    },

    onPanelBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('pnl_traffic_session_chart').items.items[0] !== undefined){

            Ext.getCmp('pnl_traffic_session_chart').items.items[0].fireEvent('clearInterval');

            Ext.getCmp('pnl_traffic_session_chart').removeAll();

            widget = "";
        }

    },

    get_rrdFetchLast_session: function() {
        var me =this;

        var _interval = null;

        var _seconds = me.btn_time;

        var _keys = ['session'];

        var time = Ext.getCmp('update_time').text.split(' ');

        var _num_dots = _seconds/Number(time[0]);

        if(_seconds > 3600)
        {
            //     Ext.getCmp('chk_btn').disable();
            if(Ext.getCmp('chk_btn').state !== true){
                Ext.getCmp('chk_btn').state = true;
                Ext.getCmp('chk_btn').moveHandle(true);
                //         Ext.getCmp('chk_btn').fireEvent('change',Ext.getCmp('chk_btn'));
            }

            _num_dots = 900;
        }
        else
        {
            //     Ext.getCmp('chk_btn').enable();
            //     Ext.getCmp('chk_btn').state = true;
            //     Ext.getCmp('chk_btn').moveHandle(true);

            if(Ext.getCmp('chk_btn').state)
            {
                _interval = Number(time[0]);
            }
        }

        var _tplList_data = [];
        var i,j,k;

        var session_max, session_avg, session_min;

        me._data = [];

        var _inc, _orig, _label = '';

        // var toolTipContent = '{_inc}<br>';

        // toolTipContent += '<font color="#369EAD">' + _keys[0] + '</font> : ' + '{y}<br>';

        var maked_chart = false;

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'rrdFetchLast',
            {
                rrd_name : Ext.encode('data_mon'),
                seconds : Ext.encode(_seconds),
                num_dots : Ext.encode(_num_dots)
            },
            function(response){

                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);

                for(i = 0 ; i < response.length ; i++){

                    _orig = response[i];
                    _label = unixTimeConvert(_orig['time'],'HM');

                    _inc = unixTimeConvert(_orig['time']);

                    me._data.push({x : null, y : parseInt(_orig[_keys[0]]), label : _label, _inc : _inc});
                }

                if(Ext.getCmp('session_con')){
                    Ext.getCmp('session_con').set_chart(me._data, "cre");
                }

                me.get_session_data();

            }
        );

    },

    get_session_data: function() {
        var me =this;

        var _interval = null;

        var _seconds = me.btn_time;

        var _keys = ['session'];

        var time = Ext.getCmp('update_time').text.split(' ');

        var _num_dots = _seconds/Number(time[0]);

        if(_seconds > 3600)
        {
            //     Ext.getCmp('chk_btn').disable();
            if(Ext.getCmp('chk_btn').state !== true){
                Ext.getCmp('chk_btn').state = true;
                Ext.getCmp('chk_btn').moveHandle(true);
            }

            _num_dots = 900;
        }
        else
        {
            //     Ext.getCmp('chk_btn').enable();

            if(Ext.getCmp('chk_btn').state)
            {
                _interval = Number(time[0]);
            }
        }

        var _tplList_data = [];
        var i,j,k;

        var session_max, session_avg, session_min;

        var _inc, _orig, _label = '';

        // var toolTipContent = '{_inc}<br>';

        // toolTipContent += '<font color="#369EAD">' + _keys[0] + '</font> : ' + '{y}<br>';

        var maked_chart = false;

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'rrdFetchLast',
            {
                rrd_name : Ext.encode('data_mon'),
                seconds : Ext.encode(me.down('combobox[itemId="cb_update_interval"]').getValue()/1000),
                num_dots : Ext.encode(1)
            },
            function(response){

                var _dataPoints = [];

                if(!maked_chart){
                    maked_chart = true;
                }

                _orig = response;
                _label = unixTimeConvert(_orig['time'],'HM');

                _inc = unixTimeConvert(_orig['time']);
                if(me._data){
                    if(me._data.length >= _num_dots)
                    {
                        me._data.shift();
                    }

                    me._data.push({x : null, y : parseInt(_orig[_keys[0]]), label : _label, _inc : _inc});

                    for(i=0; i<me._data.length; i++)
                    {
                        me._data[i].x = i;

                        if(i === 0)
                        {
                            session_max = me._data[i].y;
                            session_avg = me._data[i].y;
                            session_min = me._data[i].y;
                        }
                        else
                        {
                            if(session_max < me._data[i].y)
                            {
                                session_max = me._data[i].y;
                            }

                            if(session_min > me._data[i].y)
                            {
                                session_min =me._data[i].y;
                            }

                            session_avg += me._data[i].y;
                        }
                    }

                    session_avg = parseInt(session_avg/me._data.length);
                }
                _dataPoints.push(me._data);

                if(Ext.getCmp('ses_max')){ Ext.getCmp('ses_max').setText(session_max); }
                if(Ext.getCmp('ses_avg')){ Ext.getCmp('ses_avg').setText(session_avg); }
                if(Ext.getCmp('ses_min')){ Ext.getCmp('ses_min').setText(session_min); }
                if(Ext.getCmp('session_con')){
                    Ext.getCmp('session_con').set_chart(me._data, "add");
                }
                hideCompLoadMask(Ext.getCmp('NFW2_monitor_firewall_sessionAmount'));
            }
        );

    }

});