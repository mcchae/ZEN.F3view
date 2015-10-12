
Ext.define('NFW2.view.NFW2_monitor_system_cpu', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_system_cpu',

    requires: [
        'NFW2.view.NFW2_monitor_system_cpuViewModel',
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
        type: 'nfw2_monitor_system_cpu'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_system_cpu',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onViewportAfterRender',
        beforedestroy: 'onPanelBeforeDestroy'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
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
                                        state: true,
                                        cls: 'custom-color-monitor',
                                        id: 'chk_btn',
                                        listeners: {
                                            change: 'onButtonChange'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        set_data: function() {
                                            var me = Ext.getCmp('NFW2_monitor_system_cpu');

                                            me.get_cpu_data();
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
                                                        checkchange: 'onMenucheckitemCheckChange'
                                                    }
                                                }),
                                                me.processMyCheckItem1({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    checked: true,
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
                                                }),
                                                me.processMyCheckItem3({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange3'
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
                                                    click: 'onButtonClick'
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
                                                    click: 'onButtonClick2'
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
                                margin: '8 0 0 0',
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
                                                text: '최종수정시간 : '
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'combobox',
                                        cls: 'lb_sq',
                                        hidden: true,
                                        itemId: 'cb_cpu_item',
                                        margin: 5,
                                        maxWidth: 300,
                                        fieldLabel: '항목',
                                        labelSeparator: ' ',
                                        labelWidth: 40,
                                        value: 'avg',
                                        editable: false,
                                        displayField: 'name',
                                        store: 'store_monitor_item',
                                        valueField: 'value',
                                        multiSelect: true,
                                        listeners: {
                                            change: 'onCb_cpu_itemChange'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cb_cpu_seconds',
                                        margin: 5,
                                        width: 180,
                                        fieldLabel: '시간',
                                        labelSeparator: ' ',
                                        labelWidth: 50,
                                        value: 1800,
                                        editable: false,
                                        displayField: 'name',
                                        store: 'store_monitor_seconds',
                                        valueField: 'value',
                                        listeners: {
                                            change: 'onCb_cpu_secondsChange'
                                        }
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        id: 'chk_update',
                                        itemId: 'chk_update',
                                        margin: '0 0 0 5',
                                        boxLabel: '업데이트 주기 (초)',
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
                                            change: 'onCb_update_intervalChange'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                set_chart: function(record, record_mem, type) {
                                    // var myChart = echarts.init(document.getElementById('echart'));
                                    var me = Ext.getCmp('NFW2_monitor_system_cpu');

                                    if(type === "cre"){
                                        if(me.myChart !== undefined){
                                            me.myChart.clear();
                                        }
                                        console.log(record);
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
                                            var temp = record[i]._inc.split(' ');
                                            var data = temp[1].split(':');
                                            var result = data[0] + ":" + data[1];
                                            avg.push(String(record[i].y));
                                            time.push(record[i]._inc);
                                        }

                                        for(var j in record_mem){
                                            buf_avg.push(removeComma(record_mem[j].membuf));
                                            cac_avg.push(removeComma(record_mem[j].memcac));
                                            fre_avg.push(removeComma(record_mem[j].memfre));
                                            mem_use.push(record_mem[j].y);
                                        }

                                        var split_num = time.length;

                                        me.chart_option = {
                                            tooltip : {
                                                trigger: 'axis',
                                                formatter: function(value){
                                                    var result = "";
                                                    var data = [__zen('usage_cpu'),__zen('usage_memory'),__zen('buffered'),__zen('cached'),__zen('free')];
                                                    if(value.length !== 0){
                                                        result += value[0][1];
                                                    }
                                                    for(var i in value){
                                                        var color_chk = 0;
                                                        for(var j in data){
                                                            if(data[j] === value[i][0]){ color_chk = j; }
                                                        }
                                                        if(value[i][0] === 'Buffered' || value[i][0] === 'Cached' || value[i][0] === 'Free'){
                                                            result += '<br/><span style="color:'+color[color_chk]+';">'+value[i][0]+' : ' + value[i][2] + 'M</span>';
                                                        }
                                                        else{
                                                            result += '<br/><span style="color:'+color[color_chk]+';">'+value[i][0]+' : ' + value[i][2] + '%</span>';
                                                        }
                                                    }
                                                    return result;
                                                },
                                                backgroundColor : 'rgba(0,0,0,0.9)'
                                            },
                                            legend: {
                                                data:[__zen('usage_cpu'),__zen('usage_memory'),__zen('buffered'),__zen('cached'),__zen('free')],
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
                                                width : Ext.getCmp('test_con').wid-280
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
                                                },
                                                splitNumber : split_num
                                            }
                                            ],
                                            yAxis : [
                                            {
                                                type : 'value',
                                                name : __zen('usage_per'),
                                                splitArea : {
                                                    show:true,
                                                    areaStyle : {
                                                        color: [
                                                        'rgba(250,250,250,0.3)',
                                                        'rgba(200,200,200,0.3)'
                                                        ]
                                                    }
                                                },
                                                min : 0,
                                                max : 100
                                            },
                                            {
                                                type : 'value',
                                                name : __zen('memory')+"("+__zen('mbyte')+")",
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
                                                name:__zen('usage_cpu'),
                                                type:'line',
                                                data: avg,
                                                symbol:'none',
                                                smooth:true,
                                                clickable: false

                                            },
                                            {
                                                name:__zen('usage_memory'),
                                                type:'line',
                                                data: mem_use,
                                                symbol:'none',
                                                smooth:true,
                                                clickable: false
                                            },
                                            {
                                                name:__zen('buffered'),
                                                type:'line',
                                                yAxisIndex: 1,
                                                data: buf_avg,
                                                symbol:'none',
                                                smooth:true,
                                                clickable: false
                                            },
                                            {
                                                name:__zen('cached'),
                                                type:'line',
                                                yAxisIndex: 1,
                                                data: cac_avg,
                                                symbol:'none',
                                                smooth:true,
                                                clickable: false
                                            },
                                            {
                                                name:__zen('free'),
                                                type:'line',
                                                yAxisIndex: 1,
                                                data: fre_avg,
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
                                        console.log(me.myChart);
                                        hideCompLoadMask(Ext.getCmp('NFW2_monitor_system_cpu'));
                                    }
                                    else{
                                        if(me.myChart._chartList.length !== 0){
                                            me.myChart.addData([[0,record[record.length-1].y,false,false,record[record.length-1]._inc],[1,record_mem[record_mem.length-1].y,false,false,record[record.length-1]._inc],[2,removeComma(record_mem[record_mem.length-1].membuf),false,false,record[record.length-1]._inc],[3,removeComma(record_mem[record_mem.length-1].memcac),false,false,record[record.length-1]._inc],[4,removeComma(record_mem[record_mem.length-1].memfre),false,false,record[record.length-1]._inc]]);
                                        }
                                    }
                                },
                                flex: 1,
                                html: '<div id="echart" style="height:400px;"></div>',
                                id: 'test_con',
                                listeners: {
                                    afterrender: 'onTest_conAfterRender',
                                    resize: 'onTest_conResize'
                                }
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                hidden: true,
                                margin: '8 0 0 0',
                                minHeight: 400,
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
                                        id: 'pnl_system_cpu_chart',
                                        minWidth: 400,
                                        layout: 'fit'
                                    },
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'gridpanel',
                                                id: 'gpn_system_cpu',
                                                margin: 10,
                                                scrollable: {
                                                    x: true,
                                                    y: true
                                                },
                                                width: 380,
                                                columnLines: true,
                                                store: 'store_monitor_grid',
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return "<span style='color:" + record.data.color + ";font-weight:bold' >"+value+"</span>";

                                                        },
                                                        dataIndex: 'name',
                                                        text: '항목',
                                                        flex: 1.5
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return "<span style='color:red;' >"+value+" %</span>";

                                                        },
                                                        dataIndex: 'max',
                                                        text: '최대',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value+" %";

                                                        },
                                                        dataIndex: 'avg',
                                                        text: '평균',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value+" %";

                                                        },
                                                        dataIndex: 'min',
                                                        text: '최소',
                                                        flex: 1
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                id: 'gpn_system_mem',
                                                margin: 10,
                                                scrollable: {
                                                    x: true,
                                                    y: true
                                                },
                                                width: 380,
                                                columnLines: true,
                                                store: 'store_monitor_grid_mem',
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return "<span style='color:" + record.data.color + ";font-weight:bold' >"+value+"</span>";

                                                        },
                                                        dataIndex: 'name',
                                                        text: '메모리',
                                                        flex: 1.5
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return "<span style='color:red;' >"+addComma(value)+" M</span>";

                                                        },
                                                        dataIndex: 'max',
                                                        text: '최대',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return addComma(value)+" M";

                                                        },
                                                        dataIndex: 'avg',
                                                        text: '평균',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return addComma(value)+" M";

                                                        },
                                                        dataIndex: 'min',
                                                        text: '최소',
                                                        flex: 1
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                margin: '30 0 0 30',
                                scrollable: {
                                    x: true,
                                    y: false
                                },
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
                                                    text: '{usage_cpu}'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                cls: 'f_m_big',
                                                id: 'cpu_max',
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
                                                                id: 'cpu_avg'
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
                                                                id: 'cpu_min'
                                                            },
                                                            {
                                                                xtype: 'label',
                                                                bind: {
                                                                    text: '{minimum}'
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
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
                                                    text: '{usage_memory}'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                cls: 'f_m_big',
                                                id: 'mem_max',
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
                                                                id: 'mem_avg'
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
                                                                id: 'mem_min'
                                                            },
                                                            {
                                                                xtype: 'label',
                                                                bind: {
                                                                    text: '{minimum}'
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
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
                                                    text: '{buffered}'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                cls: 'f_m_big',
                                                id: 'buf_max',
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
                                                                id: 'buf_avg'
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
                                                                id: 'buf_min'
                                                            },
                                                            {
                                                                xtype: 'label',
                                                                bind: {
                                                                    text: '{minimum}'
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
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
                                                    text: '{cached}'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                cls: 'f_m_big',
                                                id: 'cac_max',
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
                                                                id: 'cac_avg'
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
                                                                id: 'cac_min'
                                                            },
                                                            {
                                                                xtype: 'label',
                                                                bind: {
                                                                    text: '{minimum}'
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
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
                                                    text: '{free}'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                cls: 'f_m_big',
                                                id: 'fre_max',
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
                                                                id: 'fre_avg'
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
                                                                id: 'fre_min'
                                                            },
                                                            {
                                                                xtype: 'label',
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

    onButtonChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_monitor_system_cpu');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(me.btn_time === 12){
            Ext.getCmp('chk_btn').state = true;
            Ext.getCmp('chk_btn').moveHandle(true);
        }

        if(button.state === true){
            me.get_rrdFetchLast_cpu();
            monitor_timeout();
        //     var time = Ext.getCmp('update_time').text.split(' ');
        //     me.get_rrdFetchLast_cpu();
        //     timeout.interval = setInterval(me.get_rrdFetchLast_cpu, Number(time[0])*1000);
        }
        else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {

        Ext.getCmp('timeout').setHtml(2);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {

        Ext.getCmp('timeout').setHtml(5);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {

        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange3: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_system_cpu');
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        me.btn_time = 1800;
        showCompLoadMask(Ext.getCmp('NFW2_monitor_system_cpu'));
        clearInterval(Ext.getCmp('timeout').interval);
        me.get_rrdFetchLast_cpu();
        // if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_system_cpu');
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        me.btn_time = 3600;
        showCompLoadMask(Ext.getCmp('NFW2_monitor_system_cpu'));

        clearInterval(Ext.getCmp('timeout').interval);
        me.get_rrdFetchLast_cpu();
        // if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_system_cpu');
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        me.btn_time = 43200;
        showCompLoadMask(Ext.getCmp('NFW2_monitor_system_cpu'));
        clearInterval(Ext.getCmp('timeout').interval);
        me.get_rrdFetchLast_cpu();
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_system_cpu');
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        me.btn_time = 86400;
        showCompLoadMask(Ext.getCmp('NFW2_monitor_system_cpu'));
        clearInterval(Ext.getCmp('timeout').interval);
        me.get_rrdFetchLast_cpu();
    },

    onCb_cpu_itemChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        // me.get_rrdFetchLast_cpu();
    },

    onCb_cpu_secondsChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        // me.get_rrdFetchLast_cpu();
    },

    onChk_updateChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        if(newValue){
        //     me.get_rrdFetchLast_cpu();
        //     if(Ext.getCmp('cb_update_interval').getValue() === 2000){ me.interval = setInterval(me.get_cpu_interval, 2000); }
        //     if(Ext.getCmp('cb_update_interval').getValue() === 5000){ me.interval = setInterval(me.get_cpu_interval, 5000); }
        //     if(Ext.getCmp('cb_update_interval').getValue() === 10000){ me.interval = setInterval(me.get_cpu_interval, 10000); }
        //     if(Ext.getCmp('cb_update_interval').getValue() === 30000){ me.interval = setInterval(me.get_cpu_interval, 30000); }
        }
        else{
            clearInterval(me.interval);
        }
    },

    onCb_update_intervalChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        clearInterval(me.interval);

        // me.get_rrdFetchLast_cpu();
    },

    onTest_conAfterRender: function(component, eOpts) {
        var con = Ext.getCmp('test_con');
        con.wid = document.body.clientWidth - 150;

        document.getElementById('echart').style.width = con.wid+"px";
    },

    onTest_conResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        var me = this;

        if(me.myChart._option !== undefined){
            var get_chart = me.myChart.getOption();
            var wid = document.body.clientWidth - 150;
            me.chart_option.grid.width = wid-280;

            for(var i in get_chart.series){
                me.chart_option.series[i].data = get_chart.series[i].data;
            }

            me.myChart.setOption(me.chart_option, true);
            document.getElementById('echart').style.width = wid+"px";

            me.myChart.resize();
        }
    },

    onViewportAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_system_cpu');
        me.myChart = echarts.init(document.getElementById('echart'),'macarons');

        me.btn_time = 1800;
        me.update_get = false;
        me._data = [];

        me._data_mem = [];
        component.get_rrdFetchLast_cpu();
        // monitor_timeout();
    },

    onPanelBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);
        if(Ext.getCmp('pnl_system_cpu_chart').items.items[0] !== undefined){

            Ext.getCmp('pnl_system_cpu_chart').items.items[0].fireEvent('clearInterval');

            Ext.getCmp('pnl_system_cpu_chart').removeAll();

            widet = "";
        }
    },

    get_rrdFetchLast_cpu: function() {
        var me = this;

        var _interval = null;

        var _seconds = me.btn_time;
        var time = Ext.getCmp('update_time').text.split(' ');

        var _num_dots = _seconds/Number(time[0]);

        if(_seconds > 3600)
        {
            //     Ext.getCmp('chk_btn').disable();
            //     if(Ext.getCmp('chk_btn').state !== true){
            //         Ext.getCmp('chk_btn').state = true;
            //         Ext.getCmp('chk_btn').moveHandle(true);
            //         //         Ext.getCmp('chk_btn').fireEvent('change',Ext.getCmp('chk_btn'));
            //     }

            _num_dots = 720;
        }
        else if(_seconds > 43200){
            _num_dots = 1440;
        }
        else
        {
            _num_dots = 360;
            Ext.getCmp('chk_btn').enable();
            //     Ext.getCmp('chk_btn').state = true;
            //     Ext.getCmp('chk_btn').moveHandle(true);

            if(Ext.getCmp('chk_btn').state)
            {
                _interval = Number(time[0]);
            }
        }

        var _cpu_key = ['cpunic','cpusys','cpuusr'];

        var cpu_max, cpu_avg, cpu_min;

        me._data = [];

        me._data_mem = [];

        // var toolTipContent = '{_inc}<br><font color=#369EAD>사용률</font> : {y} %<br>';

        var _inc, _orig, _label = '';

        var _cpu_len = _cpu_key.length;

        var _cpu_max;

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
                setTimeout(function(){ me.setWidth('100%'); },100);
                for(i = 0 ; i < response.length ; i++){

                    _orig = response[i];
                    console.log(_orig.time);
                    _inc = unixTimeConvert(_orig.time);

                    _label = unixTimeConvert(_orig.time,'HM');

                    _cpu_max = 0;

                    for(var j = 0 ; j < _cpu_len ; j++)
                    {
                        _cpu_max += _orig[_cpu_key[j]];
                    }

                    _cpu_max = parseInt(_cpu_max*100);

                    if(_cpu_max > 100)
                    {
                        _cpu_max = 100;
                    }

                    me._data.push({x : null, y : _cpu_max, label : _label, _inc : _inc});


                }

                //         request_helper.xmlrpc_call_JsonP(
                //             'ftuctrl',
                //             'rrdFetchLast',
                //             {
                //                 rrd_name : Ext.encode('data_mon'),
                //                 seconds : Ext.encode(_seconds),
                //                 num_dots : Ext.encode(_num_dots)
                //             },
                //             function(response){

                for(i = 0 ; i < response.length ; i++){

                    _orig = response[i];
                    //                     _label = unixTimeConvert(_orig['time'],'HM');

                    //                     _inc = unixTimeConvert(_orig['time']);

                    me._data_mem.push({x : null, y : parseInt(_orig['swpuse'],10),
                                       membuf : addComma(parseFloat(_orig['membuf']/1024).toFixed(2)),
                                       memcac : addComma(parseFloat(_orig['memcac']/1024).toFixed(2)),
                                       memfre : addComma(parseFloat(_orig['memfre']/1024).toFixed(2)),
                                       membuf_avg : parseFloat(_orig['membuf']/1024),
                                       memcac_avg : parseFloat(_orig['memcac']/1024),
                                       memfre_avg : parseFloat(_orig['memfre']/1024),
                                       label: _label,
                                       _inc : _inc});

                }

                //         Ext.data.StoreManager.lookup('store_monitor_grid_test').loadData(_data);
                if(Ext.getCmp('test_con')){
                    Ext.getCmp('test_con').set_chart(me._data, me._data_mem,"cre");

                    //                 if(Ext.getCmp('chk_btn').state){
                    //                     clearInterval(Ext.getCmp('timeout').interval);
                    //                     me.get_cpu_data();
                    if(Ext.getCmp('chk_btn').state === true){


                        Ext.getCmp('timeout').interval = setInterval(count_time, 1000);


                    }
                    else{ clearInterval(Ext.getCmp('timeout').interval); }
                }
                //                     if(Ext.getCmp('cb_update_interval').getValue() === 2000){ me.interval = setInterval(getData, 2000); }
                //                     if(Ext.getCmp('cb_update_interval').getValue() === 5000){ me.interval = setInterval(getData, 5000); }
                //                     if(Ext.getCmp('cb_update_interval').getValue() === 10000){ me.interval = setInterval(getData, 10000); }
                //                     if(Ext.getCmp('cb_update_interval').getValue() === 30000){ me.interval = setInterval(getData, 30000); }
                //                 }
                //             }
                //         );

                me.get_cpu_data();
            }
        );
        var time = Ext.getCmp('update_time').text.split(' ');
        var chk_time = Number(time[0]);
        function count_time(){
            chk_time--;
            if(chk_time === 0){ chk_time = Number(time[0]); Ext.getCmp('timeout').set_data(); }
            Ext.getCmp('timeout').setHtml(chk_time);
        }
    },

    get_cpu_data: function() {
        var me = this;

        var _interval = null;

        var _seconds = me.btn_time;
        var time = Ext.getCmp('update_time').text.split(' ');

        var _num_dots = _seconds/Number(time[0]);

        if(_seconds > 3600)
        {
            //     Ext.getCmp('chk_btn').disable();
            //     if(Ext.getCmp('chk_btn').state !== true){
            //         Ext.getCmp('chk_btn').state = true;
            //         Ext.getCmp('chk_btn').moveHandle(true);
            //     }

            _num_dots = 720;
        }
        else if(_seconds > 43200){
            _num_dots = 1440;
        }
        else
        {
            _num_dots = 360;
            Ext.getCmp('chk_btn').enable();

            if(Ext.getCmp('chk_btn').state)
            {
                _interval = Number(time[0]);
            }
        }

        var _cpu_key = ['cpunic','cpusys','cpuusr'];

        var cpu_max, cpu_avg, cpu_min;

        // var toolTipContent = '{_inc}<br><font color=#369EAD>사용률</font> : {y} %<br>';

        var _inc, _orig, _label = '';

        var _cpu_len = _cpu_key.length;

        var _cpu_max;

        var maked_chart = false;

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'rrdFetchLast',
            {
                rrd_name : Ext.encode('data_mon'),
                seconds : Ext.encode(Number(time[0])),
                num_dots : Ext.encode(1)
            },
            function(response){
                var _inc, _orig, _label = '';
                var _dataPoints = [];

                if(!maked_chart){
                    maked_chart = true;
                }

                _orig = response;

                _label = unixTimeConvert(_orig.time,'HM');

                _inc = unixTimeConvert(_orig.time);

                _cpu_max = 0;


                for(var j = 0 ; j < _cpu_len ; j++)
                {
                    _cpu_max += _orig[_cpu_key[j]];
                }

                _cpu_max = parseInt(_cpu_max*100);

                if(_cpu_max > 100)
                {
                    _cpu_max = 100;
                }
                if(me._data){
                    if(me._data.length >= _num_dots)
                    {
                        me._data.shift();
                    }

                    me._data.push({x : null, y : _cpu_max, label : _label, _inc : _inc});

                    for(i=0; i<me._data.length; i++)
                    {
                        me._data[i].x = i;

                        if(i === 0)
                        {
                            cpu_max = me._data[i].y;
                            cpu_avg = me._data[i].y;
                            cpu_min = me._data[i].y;
                        }
                        else
                        {
                            if(cpu_max < me._data[i].y)
                            {
                                cpu_max = me._data[i].y;
                            }

                            if(cpu_min > me._data[i].y)
                            {
                                cpu_min = me._data[i].y;
                            }

                            cpu_avg += me._data[i].y;
                        }
                    }

                    cpu_avg = parseInt(cpu_avg/me._data.length);
                }
                _dataPoints.push(me._data);

                //         request_helper.xmlrpc_call_JsonP(
                //             'ftuctrl',
                //             'rrdFetchLast',
                //             {
                //                 rrd_name : Ext.encode('data_mon'),
                //                 seconds : Ext.encode(Number(time[0])),
                //                 num_dots : Ext.encode(1)
                //             },
                //             function(response){
                _orig = response;
                var buf_max, buf_avg, buf_min, cac_max, cac_avg, cac_min, fre_max, fre_avg, fre_min, use_max, use_avg, use_min;

                me._data_mem.push({x : null, y : _orig['swpuse'],
                                   membuf : addComma(parseFloat(_orig['membuf']/1024).toFixed(2)),
                                   memcac : addComma(parseFloat(_orig['memcac']/1024).toFixed(2)),
                                   memfre : addComma(parseFloat(_orig['memfre']/1024).toFixed(2)),
                                   membuf_avg : parseFloat(_orig['membuf']/1024),
                                   memcac_avg : parseFloat(_orig['memcac']/1024),
                                   memfre_avg : parseFloat(_orig['memfre']/1024),
                                   label: _label,
                                   _inc : _inc});

                for(i=0; i<me._data_mem.length; i++)
                {
                    me._data_mem[i].x = i;

                    if(i === 0)
                    {
                        buf_max = me._data_mem[i].membuf_avg;
                        buf_avg = me._data_mem[i].membuf_avg;
                        buf_min = me._data_mem[i].membuf_avg;
                        cac_max = me._data_mem[i].memcac_avg;
                        cac_avg = me._data_mem[i].memcac_avg;
                        cac_min = me._data_mem[i].memcac_avg;
                        fre_max = me._data_mem[i].memfre_avg;
                        fre_avg = me._data_mem[i].memfre_avg;
                        fre_min = me._data_mem[i].memfre_avg;
                        use_max = me._data_mem[i].y;
                        use_avg = me._data_mem[i].y;
                        use_min = me._data_mem[i].y;
                    }
                    else
                    {
                        if(buf_max < me._data_mem[i].membuf_avg)
                        {
                            buf_max = me._data_mem[i].membuf_avg;
                        }

                        if(buf_min > me._data_mem[i].membuf_avg)
                        {
                            buf_min = me._data_mem[i].membuf_avg;
                        }

                        if(cac_max < me._data_mem[i].memcac_avg)
                        {
                            cac_max = me._data_mem[i].memcac_avg;
                        }

                        if(cac_min > me._data_mem[i].memcac_avg)
                        {
                            cac_min = me._data_mem[i].memcac_avg;
                        }

                        if(fre_max < me._data_mem[i].memfre_avg)
                        {
                            fre_max = me._data_mem[i].memfre_avg;
                        }

                        if(fre_min > me._data_mem[i].memfre_avg)
                        {
                            fre_min = me._data_mem[i].memfre_avg;
                        }

                        if(use_max < me._data_mem[i].y)
                        {
                            use_max = me._data_mem[i].y;
                        }

                        if(use_min > me._data_mem[i].y)
                        {
                            use_min = me._data_mem[i].y;
                        }

                        buf_avg += me._data_mem[i].membuf_avg;
                        cac_avg += me._data_mem[i].memcac_avg;
                        fre_avg += me._data_mem[i].memfre_avg;
                        use_avg += me._data_mem[i].y;
                    }
                }

                buf_avg = parseFloat(buf_avg/me._data_mem.length);
                cac_avg = parseFloat(cac_avg/me._data_mem.length);
                fre_avg = parseFloat(fre_avg/me._data_mem.length);
                use_avg = parseInt(use_avg/me._data_mem.length, 10);
                if(Number(cpu_max) > 70){ Ext.getCmp('cpu_max').addCls("f_m_big_r"); Ext.getCmp('cpu_max').removeCls("f_m_big"); }
                else{ Ext.getCmp('cpu_max').addCls("f_m_big");  Ext.getCmp('cpu_max').removeCls("f_m_big_r"); }
                if(Number(use_max) > 70){ Ext.getCmp('mem_max').addCls("f_m_big_r"); Ext.getCmp('mem_max').removeCls("f_m_big"); }
                else{ Ext.getCmp('mem_max').addCls("f_m_big"); Ext.getCmp('mem_max').removeCls("f_m_big_r"); }

                Ext.getCmp('cpu_max').setText(cpu_max.toFixed(0)+"%");
                Ext.getCmp('cpu_avg').setText(cpu_avg.toFixed(0)+"%");
                Ext.getCmp('cpu_min').setText(cpu_min.toFixed(0)+"%");
                Ext.getCmp('mem_max').setText(use_max.toFixed(0)+"%");
                Ext.getCmp('mem_avg').setText(use_avg.toFixed(0)+"%");
                Ext.getCmp('mem_min').setText(use_min.toFixed(0)+"%");
                if(buf_max >= 1000){ Ext.getCmp('buf_max').setText((buf_max/1000).toFixed(2)+"G"); }
                else{ Ext.getCmp('buf_max').setText(buf_max.toFixed(2)+"M"); }
                if(buf_avg >= 1000){ Ext.getCmp('buf_avg').setText((buf_avg/1000).toFixed(2)+"G"); }
                else{ Ext.getCmp('buf_avg').setText(buf_avg.toFixed(2)+"M"); }
                if(buf_min >= 1000){ Ext.getCmp('buf_min').setText((buf_min/1000).toFixed(2)+"G"); }
                else{ Ext.getCmp('buf_min').setText(buf_min.toFixed(2)+"M"); }
                if(cac_max >= 1000){ Ext.getCmp('cac_max').setText((cac_max/1000).toFixed(2)+"G"); }
                else{ Ext.getCmp('cac_max').setText(cac_max.toFixed(2)+"M"); }
                if(cac_avg >= 1000){ Ext.getCmp('cac_avg').setText((cac_avg/1000).toFixed(2)+"G"); }
                else{ Ext.getCmp('cac_avg').setText(cac_avg.toFixed(2)+"M"); }
                if(cac_min >= 1000){ Ext.getCmp('cac_min').setText((cac_avg/1000).toFixed(2)+"G"); }
                else{ Ext.getCmp('cac_min').setText(cac_min.toFixed(2)+"M"); }
                if(fre_max >= 1000){ Ext.getCmp('fre_max').setText((fre_max/1000).toFixed(2)+"G"); }
                else{ Ext.getCmp('fre_max').setText(fre_max.toFixed(2)+"M"); }
                if(fre_avg >= 1000){ Ext.getCmp('fre_avg').setText((fre_avg/1000).toFixed(2)+"G"); }
                else{ Ext.getCmp('fre_avg').setText(fre_avg.toFixed(2)+"M"); }
                if(fre_min >= 1000){ Ext.getCmp('fre_min').setText((fre_min/1000).toFixed(2)+"G"); }
                else{ Ext.getCmp('fre_min').setText(fre_min.toFixed(2)+"M"); }

                //                                     Ext.getCmp('gpn_system_cpu').getStore().loadData([{
                //                                         "name": "CPU 사용률",
                //                                         "max": cpu_max,
                //                                         "avg": cpu_avg,
                //                                         "min": cpu_min,
                //                                         "color": "#2ec7c9"
                //                                     },{
                //                                         "name" : "메모리 사용률",
                //                                         "max" : use_max,
                //                                         "avg" : use_avg,
                //                                         "min" : use_min,
                //                                         "color" : "#b6a2de"
                //                                     }]);

                //                                     Ext.getCmp('gpn_system_mem').getStore().loadData([{
                //                                         "name": "Buffererd",
                //                                         "max": buf_max.toFixed(2),
                //                                         "avg": buf_avg.toFixed(2),
                //                                         "min": buf_min.toFixed(2),
                //                                         "color": "#5ab1ef"
                //                                     },{
                //                                         "name" : "Cached",
                //                                         "max" : cac_max.toFixed(2),
                //                                         "avg" : cac_avg.toFixed(2),
                //                                         "min" : cac_min.toFixed(2),
                //                                         "color" : "#ffb980"
                //                                     },{
                //                                         "name" : "Free",
                //                                         "max" : fre_max.toFixed(2),
                //                                         "avg" : fre_avg.toFixed(2),
                //                                         "min" : fre_min.toFixed(2),
                //                                         "color" : "#d87a80"
                //                                     }]);

                if(Ext.getCmp('test_con')){
                    Ext.getCmp('test_con').set_chart(me._data, me._data_mem, "add");
                }
                hideLoadMask();
                //             }
                //         );
            }
        );
    }

});