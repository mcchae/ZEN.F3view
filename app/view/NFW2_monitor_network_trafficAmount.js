
Ext.define('NFW2.view.NFW2_monitor_network_trafficAmount', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_network_trafficamount',

    requires: [
        'NFW2.view.NFW2_monitor_network_trafficAmountViewModel',
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

    viewModel: {
        type: 'nfw2_monitor_network_trafficamount'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_network_trafficAmount',
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
                                                    var me = Ext.getCmp('NFW2_monitor_network_trafficAmount');

                                                    me.get_data();
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
                                                cls: 'seg_tab',
                                                items: [
                                                    {
                                                        enableToggle: true,
                                                        pressed: true,
                                                        bind: {
                                                            text: '{integrate_tx_rx}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick2'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{tx_rx_per_inter}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick1'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{tx_per_inter}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'segmentedbutton',
                                                cls: 'seg_monitor',
                                                margin: '0 0 0 30',
                                                items: [
                                                    {
                                                        enableToggle: true,
                                                        pressed: true,
                                                        bind: {
                                                            text: '{min_30}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick5'
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
                                                            text: '{hour_12}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick3'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{hour_24}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick6'
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
                                                        id: 'l_time',
                                                        text: '최종 수정 시간 :'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'combobox',
                                                itemId: 'cb_token',
                                                margin: 5,
                                                maxWidth: 300,
                                                fieldLabel: '표시형태',
                                                labelSeparator: ' ',
                                                labelWidth: 80,
                                                value: 'ComTxRx',
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_monitor_token',
                                                valueField: 'value',
                                                listeners: {
                                                    change: 'onCb_tokenChange'
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
                                                id: 'chk_update',
                                                itemId: 'chk_update',
                                                margin: '0 0 0 5',
                                                boxLabel: '업데이트 주기',
                                                checked: true,
                                                listeners: {
                                                    change: 'onChk_updateChange'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'cb_update_interval',
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
                                                    change: 'onCmb_updateTimeChange'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                margin: '5 0 0 5',
                                                text: '(초)'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        set_chart: function(record, type) {
                                            var me = Ext.getCmp('NFW2_monitor_network_trafficAmount');
                                            var color = [
                                            '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                                            '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                                            '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                                            '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                                            ];

                                            if(type === "cre"){
                                                if(me.myChart !== undefined){
                                                    me.myChart.clear();

                                                    var time = [];

                                                    if(me.btn_type === "ComTxRx"){
                                                        var avg1 = [];
                                                        var avg2 = [];

                                                        for(var j in record[0]){
                                                            time.push(record[0][j]._inc);
                                                            avg1.push(removeComma(record[0][j].traffic_avg));
                                                        }
                                                        for(var i in record[1]){
                                                            avg2.push(removeComma(record[1][i].traffic_avg));
                                                        }

                                                        //         var temp = record[i]._inc.split(' ');
                                                        //         var data = temp[1].split(':');
                                                        //         var result = data[0] + ":" + data[1];

                                                        //         time.push(record[i]._inc);

                                                        me.chart_option = {
                                                            tooltip : {
                                                                trigger: 'axis',
                                                                formatter: function(value){
                                                                    var result = "";
                                                                    var data = [__zen('integrate_tx'),__zen('integrate_rx')];
                                                                    if(value.length !== 0){
                                                                        result += value[0][1];
                                                                    }
                                                                    for(var i in value){
                                                                        var color_chk = 0;
                                                                        for(var j in data){
                                                                            if(data[j] === value[i][0]){ color_chk = j; }
                                                                        }
                                                                        result += '<br/><span style="color:'+color[color_chk]+';">'+value[i][0]+' : ' + value[i][2] + 'M</span>';
                                                                    }
                                                                    return result;
                                                                },
                                                                backgroundColor : 'rgba(0,0,0,0.9)'
                                                            },
                                                            legend: {
                                                                data:[__zen('integrate_tx'),__zen('integrate_rx')],
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
                                                                width : Ext.getCmp('chart_con').wid-280
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
                                                                name : __zen('usage')+"("+__zen('mbyte')+")",
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
                                                                name:__zen('integrate_tx'),
                                                                type:'line',
                                                                data: avg1,
                                                                symbol:'none',
                                                                smooth:true,
                                                                clickable: false

                                                            },
                                                            {
                                                                name:__zen('integrate_rx'),
                                                                type:'line',
                                                                data: avg2,
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
                                                    }
                                                    else if(me.btn_type === "RxTx"){
                                                        var avg = [];
                                                        var series = [];
                                                        var tooltip_name = [];

                                                        for(var z in record){
                                                            avg[z] = [];
                                                        }

                                                        for(var y in record[0]){
                                                            time.push(record[0][y]._inc);
                                                        }

                                                        for(var j in record){
                                                            for(var k in record[j]){
                                                                avg[j].push(removeComma(record[j][k].traffic_avg));
                                                            }
                                                        }

                                                        for(var i in record){
                                                            tooltip_name.push(record[i][0].tooltip_name);
                                                            series.push({
                                                                name : record[i][0].tooltip_name,
                                                                type : 'line',
                                                                data : avg[i],
                                                                symbol : 'none',
                                                                smooth: true,
                                                                clickale: false
                                                            });

                                                        }


                                                        me.chart_option = {
                                                            tooltip : {
                                                                trigger: 'axis',
                                                                formatter: function(value){
                                                                    var result = "";
                                                                    var data = tooltip_name;
                                                                    if(value.length !== 0){
                                                                        result += value[0][1];
                                                                    }
                                                                    for(var i in value){
                                                                        var color_chk = 0;
                                                                        for(var j in data){
                                                                            if(data[j] === value[i][0]){ color_chk = j; }
                                                                        }
                                                                        result += '<br/><span style="color:'+color[color_chk]+';">'+ value[i][0] +' : ' + value[i][2] + 'M</span>';
                                                                    }

                                                                    return result;
                                                                },
                                                                backgroundColor : 'rgba(0,0,0,0.9)'
                                                            },
                                                            legend: {
                                                                data:tooltip_name,
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
                                                                width : Ext.getCmp('chart_con').wid-280
                                                            },
                                                            xAxis : [
                                                            {
                                                                type : 'category',
                                                                boundaryGap : false,
                                                                name : '시간',
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
                                                                name : '사용량(Mbyte)',
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
                                                            series : series,
                                                            animation : false,
                                                            noDataLoadingOption : {
                                                                text : '데이터가 없습니다',
                                                                effect : 'spin'

                                                            }
                                                        };
                                                    }
                                                    else{
                                                        var avg = [];
                                                        var series = [];
                                                        var tooltip_name = [];

                                                        for(var z in record){
                                                            avg[z] = [];
                                                        }

                                                        for(var y in record[0]){
                                                            time.push(record[0][y]._inc);
                                                        }

                                                        for(var j in record){
                                                            for(var k in record[j]){
                                                                avg[j].push(removeComma(record[j][k].traffic_avg));
                                                            }
                                                        }

                                                        for(var i in record){
                                                            tooltip_name.push(record[i][0].tooltip_name);

                                                            series.push({
                                                                name : record[i][0].tooltip_name,
                                                                type : 'line',
                                                                data : avg[i],
                                                                symbol : 'none',
                                                                smooth: true,
                                                                clickale: false
                                                            });

                                                        }

                                                        me.chart_option = {
                                                            tooltip : {
                                                                trigger: 'axis',
                                                                formatter: function(value){
                                                                    var result = "";
                                                                    result += value[0][1];

                                                                    for(var i in value){
                                                                        result += '<br/><span style="color:'+color[i]+';">'+ value[i][0] +' : ' + value[i][2] + 'M</span>';
                                                                    }

                                                                    return result;
                                                                },
                                                                backgroundColor : 'rgba(0,0,0,0.9)'
                                                            },
                                                            legend: {
                                                                data:tooltip_name,
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
                                                                width : Ext.getCmp('chart_con').wid-280
                                                            },
                                                            xAxis : [
                                                            {
                                                                type : 'category',
                                                                boundaryGap : false,
                                                                name : '시간',
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
                                                                name : '사용량(Mbyte)',
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
                                                            series : series,
                                                            animation : false,
                                                            noDataLoadingOption : {
                                                                text : '데이터가 없습니다',
                                                                effect : 'spin'

                                                            }
                                                        };
                                                    }

                                                    me.myChart.setOption(me.chart_option,true);
                                                }
                                            }
                                            else{
                                                if(me.myChart._chartList.length !== 0){
                                                    if(record[1]){
                                                        if(me.btn_type === "ComTxRx"){
                                                            if(record[1][0]){
                                                                me.myChart.addData([[0,removeComma(record[1][0].avg),false,false,record[0][0][record[0][0].length-1]._inc],[1,record[1][1].avg,false,false,record[0][1][record[0][1].length-1]._inc]]);
                                                            }
                                                        }
                                                        else if(me.btn_type === "RxTx"){
                                                            var add_data = [];
                                                            for(var i in record[0]){
                                                                add_data.push([i,removeComma(record[1][i].avg),false,false,record[0][0][record[0][0].length-1]._inc]);
                                                            }

                                                            me.myChart.addData(add_data);
                                                        }
                                                        else{
                                                            var add_data = [];
                                                            for(var i in record[0]){
                                                                add_data.push([i,removeComma(record[1][i].avg),false,false,record[0][0][record[0][0].length-1]._inc]);
                                                            }

                                                            me.myChart.addData(add_data);
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        html: '<div id="amount_chart" style="height:400px;"></div>',
                                        id: 'chart_con',
                                        width: '100%',
                                        listeners: {
                                            afterrender: 'onChart_conAfterRender',
                                            resize: 'onChart_conResize'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        hidden: true,
                                        margin: '8 0 0 0',
                                        minHeight: 400,
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
                                                id: 'pnl_traffic_interface_chart',
                                                minWidth: 400,
                                                layout: 'fit'
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                hidden: true,
                                                id: 'gpn_traffic_interface',
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
                                                        text: '인터페이스',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return "<span style='color:red;' >"+value+' M'+"</span>";

                                                        },
                                                        dataIndex: 'max',
                                                        text: '최대',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value+' M';
                                                        },
                                                        dataIndex: 'avg',
                                                        text: '평균',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value+' M';
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
                                        id: 'grid_lb_con',
                                        margin: '30 0 0 30',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        listeners: {
                                            afterrender: 'onContainerAfterRender'
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
        var me = Ext.getCmp('NFW2_monitor_network_trafficAmount');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_rrdFetchLast_traffic();
            monitor_timeout();
        }
        else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
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
        var me = Ext.getCmp('NFW2_monitor_network_trafficAmount');

        me.btn_type = "ComTxRx";
        showCompLoadMask(Ext.getCmp('NFW2_monitor_network_trafficAmount'));
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'rrdFetchLast',
            {
                rrd_name : Ext.encode('data_mon'),
                seconds : Ext.encode(2),
                num_dots : Ext.encode(1)
            },
            function(response){
                var res_num = 0;
                for(var i in response[0]){
                    if(i.match('tx') || i.match('rx')){
                        res_num++;
                    }
                }

                for(var k = 3; k < res_num+1;k++){
                    Ext.getCmp('lb_con'+k).hide();
                }

                Ext.getCmp('lb_name1').setText(__zen('integrate_tx'));
                Ext.getCmp('lb_name2').setText(__zen('integrate_rx'));
            }
        );

        me.get_rrdFetchLast_traffic();
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_trafficAmount');
        me.btn_type = "RxTx";

        showCompLoadMask(Ext.getCmp('NFW2_monitor_network_trafficAmount'));
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'rrdFetchLast',
            {
                rrd_name : Ext.encode('data_mon'),
                seconds : Ext.encode(2),
                num_dots : Ext.encode(1)
            },
            function(response){

                var res_name = [];
                var res_num = 1;
                for(var i in response){
                    if(i.match('tx') || i.match('rx')){
                        res_num++;
                        res_name.push(i);
                    }
                }
                res_name.sort();
                res_name.reverse();
                res_name.sort(function(a,b){
                    var temp1 = a.split('_');
                    var temp2 = b.split('_');

                    if(temp1[0] > temp2[0]){
                        if(temp1[1] >= temp2[1]){ return 1; }
                        else{ return 1; }
                    }
                    else{
                        if(temp1[1] >= temp2[1]){ return -1; }
                        else{ return -1; }
                    }
                    return 0;
                });
                for(var k = 1; k < res_num;k++){
                    Ext.getCmp('lb_con'+k).show();
                    var name = res_name[k-1].split('_');
                    Ext.getCmp('lb_name'+k).setText(name[0] + " " + name[1].toUpperCase());
                }

                me.get_rrdFetchLast_traffic();
            }
        );


    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_trafficAmount');
        me.btn_type = "Tx";
        showCompLoadMask(Ext.getCmp('NFW2_monitor_network_trafficAmount'));
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'rrdFetchLast',
            {
                rrd_name : Ext.encode('data_mon'),
                seconds : Ext.encode(2),
                num_dots : Ext.encode(1)
            },
            function(response){
                var res_name = [];
                var res_num = 0;
                for(var i in response){
                    if(!i.match('time') && i.match('tx')){
                        res_num++;
                        res_name.push(i);
                    }
                }
                res_name.sort();

                for(var k = 1; k < res_num+1;k++){
                    Ext.getCmp('lb_con'+k).show();
                    var name = res_name[k-1].split('_');

                    Ext.getCmp('lb_name'+k).setText(name[0] + " " + name[1].toUpperCase());
                }

                res_num++;

                for(var l = k;l<(res_num*2)-1;l++){
                    Ext.getCmp('lb_con'+l).hide();
                }

            }
        );

        me.get_rrdFetchLast_traffic();
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_trafficAmount');
        me.btn_time = 1800;
        showCompLoadMask(Ext.getCmp('NFW2_monitor_network_trafficAmount'));
        me.get_rrdFetchLast_traffic();
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_trafficAmount');
        me.btn_time = 3600;
        showCompLoadMask(Ext.getCmp('NFW2_monitor_network_trafficAmount'));
        me.get_rrdFetchLast_traffic();
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_trafficAmount');
        me.btn_time = 43200;
        showCompLoadMask(Ext.getCmp('NFW2_monitor_network_trafficAmount'));
        me.get_rrdFetchLast_traffic();
    },

    onButtonClick6: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_trafficAmount');
        me.btn_time = 86400;
        showCompLoadMask(Ext.getCmp('NFW2_monitor_network_trafficAmount'));
        me.get_rrdFetchLast_traffic();
    },

    onCb_tokenChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_traffic();

    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_traffic();

    },

    onCb_secondsChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_traffic();
    },

    onChk_updateChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_traffic();
    },

    onCmb_updateTimeChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_traffic();

    },

    onChart_conAfterRender: function(component, eOpts) {
        var con = Ext.getCmp('chart_con');
        con.wid = document.body.clientWidth - 150;
        con.setWidth(con.wid);

        document.getElementById('amount_chart').style.width = con.wid+'px';
    },

    onChart_conResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_trafficAmount');

        if(me.myChart._option !== undefined){
            var get_chart = me.myChart.getOption();
            var wid = document.body.clientWidth - 150;
            me.chart_option.grid.width = wid-280;

            for(var i in get_chart.series){
                me.chart_option.series[i].data = get_chart.series[i].data;
            }

            me.myChart.setOption(me.chart_option, true);
            document.getElementById('amount_chart').style.width = wid+"px";

            me.myChart.resize();
        }
    },

    onContainerAfterRender: function(component, eOpts) {
        var me = this;

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'rrdFetchLast',
            {
                rrd_name : Ext.encode('data_mon'),
                seconds : Ext.encode(2),
                num_dots : Ext.encode(1)
            },
            function(response){
                var res_name = [];
                var res_num = 0;
                for(var i in response){
                    if(i.match('tx') || i.match('rx')){
                        res_num++;
                        res_name.push(i);
                    }
                }

                res_name.sort();
                Ext.suspendLayouts();
                var tab_cnt = 0;
                for(var j = 1; j <= res_num;j++){
                    if(j%4 === 1){
                        tab_cnt++;
                        var tab_con = Ext.create('Ext.container.Container', {
                            id : 'lb_tab_con'+tab_cnt,
                            layout: 'hbox'
                        });
                    }

                    var add_con = {
                        xtype: 'container',
                        id: 'lb_con'+j,
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
                                id: 'lb_name'+j,
                                text: __zen('integrate_tx')
                            },
                            {
                                xtype: 'label',
                                cls: 'f_m_big',
                                id: 'lb_max'+j,
                                margin: '20 0',
                                text: ""
                            },
                            {
                                xtype: 'label',
                                text: __zen('maximum')
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
                                                id: 'lb_avg'+j,
                                                cls: 'f_m_small'
                                            },
                                            {
                                                xtype: 'label',
                                                text: __zen('average')
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
                                                id: 'lb_min'+j,
                                                cls: 'f_m_small'
                                            },
                                            {
                                                xtype: 'label',
                                                text: __zen('minimum')
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    };

                    if(Ext.getCmp('lb_tab_con'+tab_cnt)){
                        Ext.getCmp('lb_tab_con'+tab_cnt).insert(add_con);
                    }
                    //             if(Ext.getCmp('grid_lb_con')){
                    //             Ext.getCmp('grid_lb_con').insert(add_con);
                    //             }
                }

                for(var z = 1;z <= tab_cnt;z++){
                    Ext.getCmp('grid_lb_con').insert(Ext.getCmp('lb_tab_con'+z));
                }

                for(var k = 3; k < res_num+1;k++){
                    Ext.getCmp('lb_con'+k).hide();
                }

                Ext.getCmp('lb_name2').setText(__zen('integrate_rx'));
                Ext.resumeLayouts();
            }
        );
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        me.myChart = echarts.init(document.getElementById('amount_chart'),'macarons');
        me.btn_type = "ComTxRx";
        me.btn_time = 1800;
        component.get_rrdFetchLast_traffic();
        monitor_timeout();
    },

    onPanelBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('pnl_traffic_interface_chart').items.items[0] !== undefined){

            Ext.getCmp('pnl_traffic_interface_chart').items.items[0].fireEvent('clearInterval');

            Ext.getCmp('pnl_traffic_interface_chart').removeAll();

            widet = "";
        }
    },

    get_rrdFetchLast_traffic: function() {
        var me = this;

        var _interval = null;

        if(Ext.getCmp('update_time')){
        var time = Ext.getCmp('update_time').text.split(' ');
        var chk_time = Number(time[0]);
        }
        else{
            var chk_time = 5;
        }
        var _seconds = me.btn_time;

        var _num_dots = _seconds/(chk_time);

        if(_seconds > 3600)
        {
        //     me.down('checkbox[itemId="chk_update"]').disable();
            _num_dots = 900;
        }
        // else
        // {
        //     me.down('checkbox[itemId="chk_update"]').enable();

        //     if(me.down('checkbox[itemId="chk_update"]').getValue())
        //     {
        //         _interval = me.down('combobox[itemId="cb_update_interval"]').getValue();
        //     }
        // }

        // var _items = me.down('combobox[itemId="cb_item"]').getValue();

        me._keys = [];
        me._keys_upper = [];
        var _token = me.btn_type;

        var _params = {
            rrd_name : Ext.encode('data_mon'),
            seconds : Ext.encode(2)
        };

        var comtx_max, comtx_avg, comtx_min;

        var comrx_max, comrx_avg, comrx_min;

        me._data = [];

        var _com_tx_avg, _com_rx_avg;

        var _inc, _orig, _label = '';

        var i,j,k;

        var toolTipContent = '';

        var maked_chart = false;

        var colorSet = ["#369EAD", "#C24642", "#7F6084", "#86B402", "#A2D1CF", "#C8B631", "#6DBCEB", "#52514E", "#4F81BC", "#A064A1",
                        "#F79647","#4F81BC", "#C0504E", "#9BBB58", "#23BFAA", "#8064A1", "#4AACC5", "#F79647", "#33558B","#8CA1BC",
                        "#36845C", "#017E82", "#8CB9D0", "#708C98", "#94838D", "#F08891", "#0366A7", "#008276", "#EE7757", "#E5BA3A",
                        "#F2990B", "#03557B", "#782970"];

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'rrdFetchLast',
            _params,
            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                switch(_token)
                {
                    case 'RxTx':
                        for(var data in response[0])
                        {
                            if(data.match('tx') || data.match('rx'))
                            {
                                me._keys.push(data);
                            }
                        }
                        me._keys.sort();
                        me._keys.reverse();
                        me._keys.sort(function(a,b){
                            var temp1 = a.split('_');
                            var temp2 = b.split('_');

                            if(temp1[0] > temp2[0]){
                                if(temp1[1] >= temp2[1]){ return 1; }
                                else{ return 1; }
                            }
                            else{
                                if(temp1[1] >= temp2[1]){ return -1; }
                                else{ return -1; }
                            }
                            return 0;
                        });

                        if(me._keys.length > 8)
                        {
                            me._keys.splice(8,me._keys.length - 8);
                        }

                        break;

                    case 'Tx':

                        for(var data in response[0])
                        {

                            if(data.match('tx') && data !== 'time')
                            {
                                me._keys.push(data);
                            }
                        }

                        me._keys.sort();

                        if(me._keys.length > 4)
                        {
                            me._keys.splice(4,me._keys.length - 4);
                        }
                        console.log(me._keys);
                        break;

                    case 'ComTxRx':

                        for(var data in response[0])
                        {
                            if(me._keys.length === 0)
                            {
                                me._keys.push('ComTxRx');
                            }
                            else
                            {
                                if(data !== 'time')
                                {
                                    me._keys.push(data);
                                }
                            }
                        }

                        me._keys.sort();

                        break;
                }

                Ext.each(me._keys, function(key){

                    if(key.match('tx'))
                    {
                        me._keys_upper.push(key.replace(/_tx/g, " TX"));
                    }
                    else if(key.match('rx'))
                    {
                        me._keys_upper.push(key.replace(/_rx/g, " RX"));
                    }
                });



                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'rrdFetchLast',
                    {
                        rrd_name : Ext.encode('data_mon'),
                        seconds : Ext.encode(_seconds),
                        num_dots : Ext.encode(_num_dots)
                    },
                    function(response){


                        if(me._keys[0] === "ComTxRx")
                        {
                            me._data = [2];
                            me._data[0] = [];
                            me._data[1] = [];

                            for(i = 0 ; i < response.length ; i++){

                                _orig = response[i];
                                _label = unixTimeConvert(_orig['time'],'HM');

                                _inc = unixTimeConvert(_orig['time']);

                                _com_tx_avg = 0;

                                _com_rx_avg = 0;

                                for(j = 1 ; j < me._keys.length ; j++)
                                {
                                    if(me._keys[j].match('tx'))
                                    {
                                        _com_tx_avg += _orig[me._keys[j]];
                                    }
                                    else if(me._keys[j].match('rx'))
                                    {
                                        _com_rx_avg += _orig[me._keys[j]];
                                    }
                                }

                                me._data[0].push({x : i, y : parseFloat((_com_tx_avg/1024)/1024), traffic_avg : parseFloat((_com_tx_avg/1024)/1024).toFixed(2), label : _label, _inc : _inc, tooltip_name : "통합 TX", tooltip_color : colorSet[0]});
                                me._data[1].push({x : i, y : parseFloat((_com_rx_avg/1024)/1024), traffic_avg : parseFloat((_com_rx_avg/1024)/1024).toFixed(2), label : _label, _inc : _inc, tooltip_name : "통합 RX", tooltip_color : colorSet[1]});
                            }
                        }
                        else
                        {
                            me._data = [me._keys.length];

                            for(i=0; i<me._keys.length; i++)
                            {
                                me._data[i] = [];
                            }

                            for(i = 0 ; i < response.length ; i++){

                                _orig = response[i];
                                _label = unixTimeConvert(_orig['time'],'HM');

                                _inc = unixTimeConvert(_orig['time']);

                                for(j = 0 ; j < me._keys.length ; j++){

                                    me._data[j].push({x : null, y : parseFloat((_orig[me._keys[j]]/1024)/1024),
                                                      traffic_avg : parseFloat((_orig[me._keys[j]]/1024)/1024).toFixed(2),
                                                      label : _label, _inc : _inc, tooltip_name : me._keys_upper[j], tooltip_color : colorSet[j]});
                                }
                            }
                        }

                        if(Ext.getCmp('chart_con')){
                            Ext.getCmp('chart_con').set_chart(me._data, "cre");
                        }


                        me.get_data();

                    }
                );
            }
        );
    },

    get_data: function() {
        var me = this;

        var _interval = null;

        if(Ext.getCmp('update_time')){
            var time = Ext.getCmp('update_time').text.split(' ');

            var chk_time = Number(time[0]);
        }
        else{
            var chk_time = 5;
        }

        var _seconds = me.btn_time;

        var _num_dots = _seconds/(chk_time);

        if(_seconds > 3600)
        {
            //     me.down('checkbox[itemId="chk_update"]').disable();
            _num_dots = 900;
        }
        // else
        // {
        //     me.down('checkbox[itemId="chk_update"]').enable();

        //     if(me.down('checkbox[itemId="chk_update"]').getValue())
        //     {
        //         _interval = me.down('combobox[itemId="cb_update_interval"]').getValue();
        //     }
        // }

        // var _items = me.down('combobox[itemId="cb_item"]').getValue();

        // var _keys = [];
        // var _keys_upper = [];
        var _token = me.btn_type;

        var _params = {
            rrd_name : Ext.encode('data_mon'),
            seconds : Ext.encode(2)
        };

        var comtx_max, comtx_avg, comtx_min;

        var comrx_max, comrx_avg, comrx_min;

        // me._data = [];

        var _com_tx_avg, _com_rx_avg;

        var _inc, _orig, _label = '';

        var i,j,k;

        var toolTipContent = '';

        var maked_chart = false;

        var colorSet = ["#369EAD", "#C24642", "#7F6084", "#86B402", "#A2D1CF", "#C8B631", "#6DBCEB", "#52514E", "#4F81BC", "#A064A1",
                        "#F79647","#4F81BC", "#C0504E", "#9BBB58", "#23BFAA", "#8064A1", "#4AACC5", "#F79647", "#33558B","#8CA1BC",
                        "#36845C", "#017E82", "#8CB9D0", "#708C98", "#94838D", "#F08891", "#0366A7", "#008276", "#EE7757", "#E5BA3A",
                        "#F2990B", "#03557B", "#782970"];

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'rrdFetchLast',
            {
                rrd_name : Ext.encode('data_mon'),
                seconds : Ext.encode(chk_time),
                num_dots : Ext.encode(1)
            },
            function(response){
                var _dataPoints = [];
                var _gridArray = [];

                if(me._keys[0] === "ComTxRx")
                {
                    if(!maked_chart){
                        maked_chart = true;
                    }

                    _orig = response;
                    _label = unixTimeConvert(_orig['time'],'HM');

                    _inc = unixTimeConvert(_orig['time']);

                    _com_tx_avg = 0;
                    _com_rx_avg = 0;

                    for(i = 1 ; i < me._keys.length ; i++){

                        if(me._keys[i].match('tx'))
                        {
                            _com_tx_avg += _orig[me._keys[i]];
                        }
                        else if(me._keys[i].match('rx'))
                        {
                            _com_rx_avg += _orig[me._keys[i]];
                        }
                    }
                    if(me._data[0]){
                        if(me._data[0].length >= _num_dots)
                        {
                            me._data[0].shift();
                        }

                        if(me._data[1].length >= _num_dots)
                        {
                            me._data[1].shift();
                        }

                        me._data[0].push({x : null, y : parseFloat((_com_tx_avg/1024)/1024), _com_tx_avg : parseFloat((_com_tx_avg/1024)/1024).toFixed(2), label : _label, _inc : _inc, tooltip_name : "통합 TX", tooltip_color : colorSet[0]});
                        me._data[1].push({x : null, y : parseFloat((_com_rx_avg/1024)/1024), _com_rx_avg : parseFloat((_com_rx_avg/1024)/1024).toFixed(2), label : _label, _inc : _inc, tooltip_name : "통합 RX", tooltip_color : colorSet[1]});

                        for(i = 0 ; i < me._data[0].length; i++)
                        {
                            me._data[0][i].x = i;

                            if(i === 0)
                            {
                                comtx_max = me._data[0][i].y;
                                comtx_avg = me._data[0][i].y;
                                comtx_min = me._data[0][i].y;
                            }
                            else
                            {
                                if(comtx_max < me._data[0][i].y)
                                {
                                    comtx_max = me._data[0][i].y;
                                }

                                if(comtx_min > me._data[0][i].y)
                                {
                                    comtx_min = me._data[0][i].y;
                                }

                                comtx_avg += me._data[0][i].y;
                            }
                        }

                        comtx_avg = parseFloat(comtx_avg/me._data[0].length);
                    }
                    if(me._data[1]){
                        for(i = 0 ; i < me._data[1].length; i++)
                        {
                            me._data[1][i].x = i;

                            if(i === 0)
                            {
                                comrx_max = me._data[1][i].y;
                                comrx_avg = me._data[1][i].y;
                                comrx_min = me._data[1][i].y;
                            }
                            else
                            {
                                if(comrx_max < me._data[1][i].y)
                                {
                                    comrx_max = me._data[1][i].y;
                                }

                                if(comrx_min > me._data[1][i].y)
                                {
                                    comrx_min = me._data[1][i].y;
                                }

                                comrx_avg += me._data[1][i].y;
                            }
                        }

                        comrx_avg = parseFloat(comrx_avg/me._data[1].length);

                        _gridArray.push({
                            "name": "통합 TX",
                            "max": comtx_max.toFixed(2),
                            "avg": comtx_avg.toFixed(2),
                            "min": comtx_min.toFixed(2),
                            "color": colorSet[0]
                        });

                        _gridArray.push({
                            "name": "통합 RX",
                            "max": comrx_max.toFixed(2),
                            "avg": comrx_avg.toFixed(2),
                            "min": comrx_min.toFixed(2),
                            "color": colorSet[1]
                        });

                        _dataPoints.push(me._data[0]);
                        _dataPoints.push(me._data[1]);
                        if(Ext.getCmp('lb_max1')){ Ext.getCmp('lb_max1').setText(_gridArray[0].max+"M"); }
                        if(Ext.getCmp('lb_avg1')){ Ext.getCmp('lb_avg1').setText(_gridArray[0].avg+"M"); }
                        if(Ext.getCmp('lb_min1')){ Ext.getCmp('lb_min1').setText(_gridArray[0].min+"M"); }
                        if(Ext.getCmp('lb_max2')){ Ext.getCmp('lb_max2').setText(_gridArray[1].max+"M"); }
                        if(Ext.getCmp('lb_avg2')){ Ext.getCmp('lb_avg2').setText(_gridArray[1].avg+"M"); }
                        if(Ext.getCmp('lb_min2')){ Ext.getCmp('lb_min2').setText(_gridArray[1].min+"M"); }
                    }
                }
                else
                {
                    if(!maked_chart){
                        maked_chart = true;
                    }

                    _orig = response;
                    _label = unixTimeConvert(_orig['time'],'HM');

                    _inc = unixTimeConvert(_orig['time']);

                    for(i = 0 ; i < me._keys.length ; i++){
                        if(me._data[i]){
                            if(me._data[i].length >= _num_dots)
                            {
                                me._data[i].shift();
                            }

                            me._data[i].push({x : null, y : parseFloat((_orig[me._keys[i]]/1024)/1024),
                                              traffic_avg : parseFloat((_orig[me._keys[i]]/1024)/1024).toFixed(2),
                                              label : _label, _inc : _inc, tooltip_name : me._keys_upper[i], tooltip_color : colorSet[i]});


                            for(j = 0 ; j < me._data[i].length; j++)
                            {
                                me._data[i][j].x = j;

                                if(j === 0)
                                {
                                    comtx_max = me._data[i][j].y;
                                    comtx_avg = me._data[i][j].y;
                                    comtx_min = me._data[i][j].y;
                                }
                                else
                                {
                                    if(comtx_max < me._data[i][j].y)
                                    {
                                        comtx_max = me._data[i][j].y;
                                    }

                                    if(comtx_min > me._data[i][j].y)
                                    {
                                        comtx_min = me._data[i][j].y;
                                    }

                                    comtx_avg += me._data[i][j].y;
                                }
                            }

                            comtx_avg = parseFloat(comtx_avg/me._data[i].length);

                            _gridArray.push({
                                "name": me._keys_upper[i],
                                "max": comtx_max.toFixed(2),
                                "avg": comtx_avg.toFixed(2),
                                "min": comtx_min.toFixed(2),
                                "color": colorSet[i]
                            });

                            _dataPoints.push(me._data[i]);
                        }
                        Ext.suspendLayouts();
                        for(var k in _gridArray){
                            var number = Number(k)+1;
                            if(Ext.getCmp('lb_max'+number)){ Ext.getCmp('lb_max'+number).setText(_gridArray[k].max+"M"); }
                            if(Ext.getCmp('lb_avg'+number)){ Ext.getCmp('lb_avg'+number).setText(_gridArray[k].avg+"M"); }
                            if(Ext.getCmp('lb_min'+number)){ Ext.getCmp('lb_min'+number).setText(_gridArray[k].min+"M"); }
                        }
                        Ext.resumeLayouts(true);
                    }
                }

                var chart_record = [me._data, _gridArray];

                if(Ext.getCmp('chart_con')){
                    Ext.getCmp('chart_con').set_chart(chart_record, "add");
                }
                //         Ext.getCmp('gpn_traffic_interface').getStore().loadData(_gridArray);
                if(Ext.getCmp('NFW2_monitor_network_trafficAmount')){
                    hideCompLoadMask(Ext.getCmp('NFW2_monitor_network_trafficAmount'));
                }
                //         var time = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                //         Ext.getCmp("l_time").setText("최종수정시간 : "+time);
            }
        );


    }

});