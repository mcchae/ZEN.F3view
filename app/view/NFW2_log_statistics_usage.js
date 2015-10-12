
Ext.define('NFW2.view.NFW2_log_statistics_usage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_log_statistics_usage',

    requires: [
        'NFW2.view.NFW2_log_statistics_usageViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.form.field.Date',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'nfw2_log_statistics_usage'
    },
    cls: 'zen_body',
    id: 'NFW2_log_statistics_usage',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
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
                            width: 120,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                    bind: {
                                        text: '{date}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    padding: '5 5 5 0',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            id: 'btn_today',
                                            margin: '0 0 0 5',
                                            bind: {
                                                text: '{today}'
                                            },
                                            listeners: {
                                                click: 'onBtn_todayClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            bind: {
                                                text: '{yesterday}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick1'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            bind: {
                                                text: '7{day}'
                                            },
                                            listeners: {
                                                click: 'onButtonToggle1'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            bind: {
                                                text: '10{day}'
                                            },
                                            listeners: {
                                                click: 'onButtonToggle2'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            bind: {
                                                text: '15{day}'
                                            },
                                            listeners: {
                                                click: 'onButtonToggle3'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            bind: {
                                                text: '{one_month}'
                                            },
                                            listeners: {
                                                click: 'onButtonToggle4'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            bind: {
                                                text: '3{month}'
                                            },
                                            listeners: {
                                                click: 'onButtonToggle5'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            bind: {
                                                text: '6{month}'
                                            },
                                            listeners: {
                                                click: 'onButtonToggle6'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    padding: '5 5 0 5',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: 'search_start',
                                            padding: 0,
                                            msgTarget: 'none',
                                            editable: false,
                                            format: 'Y-m-d'
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '0 5 0 5',
                                            text: '~'
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: 'search_end',
                                            padding: 0,
                                            msgTarget: 'none',
                                            editable: false,
                                            format: 'Y-m-d'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            cls: 'x-field x-form-item-label x-form-item-label-default',
                            labelSeparator: ' ',
                            labelWidth: 95,
                            bind: {
                                fieldLabel: '{usage_statistics}'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_interface',
                                    width: 250,
                                    checked: true,
                                    listeners: {
                                        beforerender: 'onChk_interfaceBeforeRender'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_cpu',
                                    width: 400,
                                    checked: true,
                                    listeners: {
                                        beforerender: 'onChk_cpuBeforeRender'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            iconCls: 'icb_ser',
                            bind: {
                                text: '{search}'
                            },
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            id: 'cont_log_grid',
            margin: '10 0 0 0',
            scrollable: true,
            items: [
                {
                    xtype: 'panel',
                    hidden: true,
                    id: 'pnl_usage_interface',
                    items: [
                        {
                            xtype: 'container',
                            makeChart: function() {
                                var me = Ext.getCmp("NFW2_log_statistics_usage");
                                var _me = this;

                                if(me.c_inter !== undefined){
                                    me.c_inter.clear();
                                }

                                if(_me.items.items[0] !== undefined){

                                    _me.removeAll();
                                }

                                var color = ['#2ec7c9','#b6a2de'];

                                var response = Ext.getCmp('NFW2_log_statistics_usage').searchObj;

                                var i, j, k;

                                var _time;

                                if(response.dt_list.length > 1){
                                    _time = [response.dt_list.length];

                                    for(i = 0; i < response.dt_list.length; i++){
                                        _time[i] = {rxByte:null,txByte:null,label:" "};

                                        for(j=0; j<me.eth.length; j++){
                                            if(parseInt(me.eth[j]) === 0){
                                                eth_num = 5;
                                            }else{
                                                eth_num = 5 + parseInt(me.eth[j])*8;
                                            }

                                            _time[i].rxByte += parseInt(response.dt_list[i][eth_num]);
                                            _time[i].txByte += parseInt(response.dt_list[i][eth_num+4]);
                                        }

                                        _time[i].label = response.dt_list[i][0];

                                    }
                                }else{
                                    _time = [response.hh_list.length];

                                    for(i=0; i<response.hh_list.length; i++){
                                        if(parseInt(response.hh_list[i][1]) + 1 < 10){
                                            _time[i] = {rxByte:null,txByte:null,label:(response.hh_list[i][1])};
                                        }else{
                                            _time[i] = {rxByte:null,txByte:null,label:(response.hh_list[i][1])};
                                        }

                                        for(j=0; j<me.eth.length; j++){
                                            if(parseInt(me.eth[j]) === 0){
                                                eth_num = 6;
                                            }else{
                                                eth_num = 6 + parseInt(me.eth[j])*8;
                                            }

                                            _time[i].rxByte += parseInt(response.hh_list[i][eth_num]);
                                            _time[i].txByte += parseInt(response.hh_list[i][eth_num+4]);
                                        }

                                    }
                                }

                                var time_ = [];
                                var time = {};
                                var rx = [];
                                var tx = [];

                                for(var i=0; i<_time.length; i++){
                                    time_.push(i);
                                    time[i] = _time[i].label;
                                    rx.push(_time[i].rxByte);
                                    tx.push(_time[i].txByte);
                                }

                                var option = {
                                    tooltip : {
                                        trigger: 'axis',
                                        formatter: function(value){
                                            var result = "";
                                            var data = [__zen('inbytes'), __zen('outbytes')];

                                            if(value.length !== 0){
                                                var t = time[value[0][1]]+'';
                                                if(t.indexOf('-')!==-1){
                                                    result += t;
                                                }else{
                                                    var _time = (value[0][1]<10)?'0':'';
                                                    result += '~'+_time+value[0][1]+':59';
                                                }
                                            }
                                            for(var i in value){
                                                var color_chk = 0;

                                                for(var j in data){
                                                    if(data[j] === value[i][0]){ color_chk = j; }
                                                }
                                                result += '<br/><span style="color:'+color[color_chk]+';">'+value[i][0]+' : ' + byteConvert(value[i][2]) + '</span>';

                                            }

                                            return result;
                                        },
                                        backgroundColor : 'rgba(0,0,0,0.9)'
                                    },
                                    legend: {
                                        data:[__zen('inbytes'), __zen('outbytes')],
                                        orient : 'horizontal',
                                        x :'left',
                                        y : 'top'
                                    },
                                    grid : {
                                        x : 100,
                                        width : document.body.clientWidth - 300
                                    },
                                    xAxis : [
                                    {
                                        type : 'category',
                                        name : __zen('hours'),
                                        data : time_,
                                        axisLabel : {
                                            formatter: function(value){

                                                var t = time[value]+'';
                                                if(t.indexOf('-')!==-1){ return t; }
                                                value = (value<10)?'0'+value:value;
                                                var result = "~"+value + ":59";
                                                return result;
                                            }
                                        }
                                    }
                                    ],
                                    yAxis : [
                                    {
                                        type : 'value',
                                        name : __zen('inter_traffic'),
                                        min : 0
                                    }
                                    ],
                                    series : [
                                    {
                                        name:__zen('inbytes'),
                                        type:'bar',
                                        data: rx

                                    },
                                    {
                                        name:__zen('outbytes'),
                                        type:'bar',
                                        data: tx

                                    }
                                    ],
                                    animation : false
                                };

                                me.c_inter.setOption(option);
                            },
                            html: '<div id="chart_inter" style="height:300px;width:300px"></div>',
                            id: 'c_inter'
                        },
                        {
                            xtype: 'panel',
                            makeChart: function() {
                                var panel_usage = Ext.getCmp('NFW2_log_statistics_usage');
                                var me = this;

                                if(me.items.items[0] !== undefined){

                                    me.removeAll();
                                }

                                var toolTipContent = '{label}<br><font color={color}>{name}</font> : {y} byte';

                                var maked_chart = false;

                                var _interfaceTplList = {
                                    graphType : 'Extjs4Canvas',
                                    widgetTitle : '',
                                    drawType : 'line',
                                    chartAttr : {
                                        axisY : {
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            minimum: 0,
                                            title : '사용량(byte)',
                                            titleFontWeight : 'bold',
                                            labelFontWeight : 'bold'
                                        },
                                        axisY2 : {
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            minimum: 0
                                        },
                                        axisX : {
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            title : '시간',
                                            titleFontWeight : 'bold',
                                            labelFontWeight : 'bold'
                                        },
                                        data :
                                        [
                                        {
                                            type: "line",
                                            showInLegend: true,
                                            name: "inbyte",
                                            markerType: "none",
                                            color: "#4F81BC",
                                            toolTipContent: toolTipContent
                                        },
                                        {
                                            type: "line",
                                            showInLegend: true,
                                            name: "outbyte",
                                            markerType: "none",
                                            color: "#C0504E",
                                            toolTipContent: '<font color={color}>{name}</font> : {y} byte'
                                        }
                                        ],
                                        toolTip:{
                                            shared: true
                                        },
                                        legend : { fontSize : 12 },
                                        theme : "theme3"
                                    },
                                    requestInfo : {
                                        getData : function(obj){

                                            if(maked_chart){
                                                return false;
                                            }

                                            maked_chart = true;

                                            var response = Ext.getCmp('NFW2_log_statistics_usage').searchObj;

                                            var i, j, k;

                                            var time;

                                            var _data1 = [];
                                            var _data2 = [];

                                            if(response.dt_list.length > 1)
                                            {
                                                time = [response.dt_list.length];

                                                for(i = 0; i < response.dt_list.length; i++)
                                                {
                                                    time[i] = {rxByte:null,txByte:null,label:" "};

                                                    for(j=0; j<panel_usage.eth.length; j++)
                                                    {
                                                        if(parseInt(panel_usage.eth[j]) === 0)
                                                        {
                                                            eth_num = 5;
                                                        }
                                                        else
                                                        {
                                                            eth_num = 5 + parseInt(panel_usage.eth[j])*8;
                                                        }

                                                        time[i].rxByte += parseInt(response.dt_list[i][eth_num]);
                                                        time[i].txByte += parseInt(response.dt_list[i][eth_num+4]);
                                                    }

                                                    time[i].label = response.dt_list[i][0];

                                                    _data1.push({x : i, y : time[i].rxByte, label : time[i].label, name : 'inbyte', color : "#4F81BC"});
                                                    _data2.push({x : i, y : time[i].txByte, label : time[i].label, name : 'outbyte', color : "#C0504E"});
                                                }
                                            }
                                            else
                                            {
                                                time = [response.hh_list.length];

                                                for(i=0; i<response.hh_list.length; i++)
                                                {
                                                    if(parseInt(response.hh_list[i][1]) + 1 < 10)
                                                    {
                                                        time[i] = {rxByte:null,txByte:null,label:'~ 0' + (parseInt(response.hh_list[i][1]) + 1) + ':00'};
                                                    }
                                                    else
                                                    {
                                                        time[i] = {rxByte:null,txByte:null,label:'~ ' + (parseInt(response.hh_list[i][1]) + 1) + ':00'};
                                                    }

                                                    for(j=0; j<panel_usage.eth.length; j++)
                                                    {
                                                        if(parseInt(panel_usage.eth[j]) === 0)
                                                        {
                                                            eth_num = 6;
                                                        }
                                                        else
                                                        {
                                                            eth_num = 6 + parseInt(panel_usage.eth[j])*8;
                                                        }

                                                        time[i].rxByte += parseInt(response.hh_list[i][eth_num]);
                                                        time[i].txByte += parseInt(response.hh_list[i][eth_num+4]);
                                                    }

                                                    _data1.push({x : i, y : time[i].rxByte, label : time[i].label, name : 'inbyte', color : "#4F81BC"});
                                                    _data2.push({x : i, y : time[i].txByte, label : time[i].label, name : 'outbyte', color : "#C0504E"});
                                                }
                                            }

                                            obj.setData(obj, [_data1,_data2]);
                                        }
                                    }
                                };

                                var interfaceMakeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

                                    var _widgettype = 'Extjs4Canvas';
                                    var _attr = {};
                                    _attr.graphType = drawtype;
                                    _attr.chartInfo = chartAttr;
                                    _attr.requestInfo = reqInfo;
                                    _attr.interval = interval;

                                    var _item = Ext.create(_widgettype, _attr);

                                    return _item;
                                };

                                var _interfaceWidget = interfaceMakeWidget(_interfaceTplList.drawType, 'Interface', _interfaceTplList.chartAttr,
                                    _interfaceTplList.requestInfo, _interfaceTplList.interval);

                                me.add(_interfaceWidget);
                            },
                            height: 300,
                            hidden: true,
                            id: 'pnl_interfaceCanvas',
                            margin: 10,
                            maxHeight: 300,
                            minHeight: 300,
                            layout: 'fit'
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'grid_log',
                            id: 'grid_usage_interface',
                            margin: 10,
                            columnLines: true,
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var first_value = parseInt(value);
                                        var second_value = parseInt(value) + 1;

                                        if(record.data.hour)
                                        {
                                            var second_hour = parseInt(record.data.hour);

                                            if(second_value >= 6){
                                                second_hour = second_hour + 1;
                                                second_value = 0;
                                            }

                                            if(parseInt(record.data.hour) < 9){
                                                return "0" + record.data.hour + ":" + value + "0 ~ 0" + second_hour + ":" + second_value + "0";
                                            }else if(parseInt(record.data.hour) === 9){
                                                return "0" + record.data.hour + ":" + value + "0 ~ " + second_hour + ":" + second_value + "0";
                                            }else{
                                                return record.data.hour + ":" + value + "0 ~ " + second_hour + ":" + second_value + "0";
                                            }
                                        }
                                        else
                                        {
                                            metaData.style = 'cursor: pointer;';

                                            if(first_value < 9){
                                                return "0" + value + ":00 ~ 0" + second_value + ":00";
                                            }else if(first_value === 9){
                                                return "0" + value + ":00 ~ " + second_value + ":00";
                                            }else if(first_value < 24){
                                                return value + ":00 ~ " + second_value + ":00";
                                            }else{
                                                return value;
                                            }
                                        }
                                    },
                                    align: 'center',
                                    dataIndex: 'time',
                                    flex: 1,
                                    bind: {
                                        text: '{time}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'eth',
                                    flex: 0.5,
                                    bind: {
                                        text: '{inter}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var _byte = (parseInt(value) >= 1000)?" ( "+byteConvert(value)+" )":'';
                                        return addComma(value)+_byte;
                                    },
                                    align: 'right',
                                    dataIndex: 'rxPacket',
                                    flex: 1,
                                    bind: {
                                        text: '{rx_packet}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var _byte = (parseInt(value) >= 1000)?" ( "+byteConvert(value)+" )":'';
                                        return addComma(value)+_byte;
                                    },
                                    align: 'right',
                                    dataIndex: 'txPacket',
                                    flex: 1,
                                    bind: {
                                        text: '{tx_packet}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var _byte = (parseInt(value) >= 1000)?" ( "+byteConvert(value)+" )":'';
                                        return addComma(value)+_byte;
                                    },
                                    align: 'right',
                                    dataIndex: 'rxByte',
                                    flex: 1,
                                    bind: {
                                        text: '{rx_byte}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var _byte = (parseInt(value) >= 1000)?" ( "+byteConvert(value)+" )":'';
                                        return addComma(value)+_byte;
                                    },
                                    align: 'right',
                                    dataIndex: 'txByte',
                                    flex: 1,
                                    bind: {
                                        text: '{tx_byte}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var _byte = (parseInt(value) >= 1000)?" ( "+byteConvert(value)+" )":'';
                                        return addComma(value)+_byte;
                                    },
                                    align: 'right',
                                    dataIndex: 'dropByte',
                                    flex: 1,
                                    bind: {
                                        text: '{drop_byte}'
                                    }
                                }
                            ],
                            viewConfig: {
                                getRowClass: function(record, rowIndex, rowParams, store) {
                                    var _cls = '';
                                    if(record.data.hour){
                                        if(record.data.year){
                                            _cls = 'dep1';
                                        }else{
                                            _cls = 'dep2';
                                        }
                                    }else{
                                        if(record.data.year){
                                            _cls = 'dep2';
                                        }
                                    }

                                    Ext.Function.defer(function(){
                                        this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                    },100, this);

                                    return _cls;
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_usage_interfaceCellClick'
                            }
                        }
                    ],
                    listeners: {
                        hide: 'onPnl_usage_interfaceHide',
                        beforerender: 'onPnl_usage_interfaceBeforeRender'
                    }
                },
                {
                    xtype: 'panel',
                    hidden: true,
                    id: 'pnl_usage_cpu',
                    items: [
                        {
                            xtype: 'container',
                            makeChart: function() {
                                var me = Ext.getCmp("NFW2_log_statistics_usage");
                                var _me = this;

                                if(me.myChart !== undefined){
                                    me.myChart.clear();
                                }

                                if(_me.items.items[0] !== undefined){

                                    _me.removeAll();
                                }

                                var time_ = [];
                                var time = [];
                                var cpu = [];
                                var memory = [];

                                var color = ['#2ec7c9','#b6a2de'];

                                var response = Ext.getCmp('NFW2_log_statistics_usage').searchObj;

                                if(response.dt_list.length > 1){
                                    for(i = 0; i < response.dt_list.length; i++){

                                        time_.push(i);
                                        time[i] = response.dt_list[i][0];
                                        cpu.push(parseInt(response.dt_list[i][1]));
                                        memory.push(parseInt(response.dt_list[i][2]));
                                    }

                                }else{
                                    for(i=0; i<response.hh_list.length; i++){

                                        time_.push(i);
                                        time[i] = response.hh_list[i][1];
                                        cpu.push(parseInt(response.hh_list[i][2]));
                                        memory.push(parseInt(response.hh_list[i][3]));
                                    }
                                }

                                var option = {
                                    tooltip : {
                                        trigger: 'axis',
                                        formatter: function(value){
                                            var result = "";
                                            var data = [__zen('cpu'), __zen('memory')];

                                            if(value.length !== 0){
                                                var t = time[value[0][1]]+'';
                                                if(t.indexOf('-')!==-1){
                                                    result += t;
                                                }else{
                                                    var _time = (value[0][1]<10)?'0':'';
                                                    result += '~'+_time+value[0][1]+':59';
                                                }
                                            }
                                            for(var i in value){
                                                var color_chk = 0;

                                                for(var j in data){
                                                    if(data[j] === value[i][0]){ color_chk = j; }
                                                }
                                                result += '<br/><span style="color:'+color[color_chk]+';">'+value[i][0]+' : ' + value[i][2] + '%</span>';

                                            }

                                            return result;
                                        },
                                        backgroundColor : 'rgba(0,0,0,0.9)'
                                    },
                                    legend: {
                                        data:[__zen('cpu'), __zen('memory')],
                                        orient : 'horizontal',
                                        x :'left',
                                        y : 'top'
                                    },
                                    grid : {
                                        x : 100
                                    },
                                    xAxis : [
                                    {
                                        type : 'category',
                                        name : __zen('hours'),
                                        data : time_,
                                        axisLabel : {
                                            formatter: function(value){

                                                var t = time[value]+'';
                                                if(t.indexOf('-')!==-1){ return t; }
                                                value = (value<10)?'0'+value:value;
                                                var result = "~"+value + ":59";
                                                return result;
                                            }
                                        }
                                    }
                                    ],
                                    yAxis : [
                                    {
                                        type : 'value',
                                        name : __zen('usage')+'(%)',
                                        min : 0
                                    }
                                    ],
                                    series : [
                                    {
                                        name:__zen('cpu'),
                                        type:'bar',
                                        data: cpu

                                    },
                                    {
                                        name:__zen('memory'),
                                        type:'bar',
                                        data: memory

                                    }
                                    ],
                                    animation : false
                                };

                                me.myChart.setOption(option);
                            },
                            html: '<div id="chart_cpu" style="height:300px"></div>',
                            id: 'c_chart'
                        },
                        {
                            xtype: 'container',
                            makeChart: function() {
                                var me = Ext.getCmp("NFW2_log_statistics_usage");
                                var _me = this;

                                if(me.c_session !== undefined){
                                    me.c_session.clear();
                                }

                                if(_me.items.items[0] !== undefined){

                                    _me.removeAll();
                                }

                                var time_ = [];
                                var time = [];
                                var session = [];

                                var color = ['#e78200'];

                                var response = Ext.getCmp('NFW2_log_statistics_usage').searchObj;

                                if(response.dt_list.length > 1){
                                    for(i = 0; i < response.dt_list.length; i++){

                                        time_.push(i);
                                        time[i] = response.dt_list[i][0];
                                        session.push(parseInt(response.dt_list[i][4]));
                                    }

                                }else{
                                    for(i=0; i<response.hh_list.length; i++){

                                        time_.push(i);
                                        time[i] = response.hh_list[i][1];
                                        session.push(parseInt(response.hh_list[i][5]));
                                    }
                                }

                                var option = {
                                    tooltip : {
                                        trigger: 'axis',
                                        formatter: function(value){
                                            var result = "";
                                            var data = [__zen('fw_session')];


                                            if(value.length !== 0){
                                                var t = time[value[0][1]]+'';
                                                if(t.indexOf('-')!==-1){
                                                    result += t;
                                                }else{
                                                    var _time = (value[0][1]<10)?'0':'';
                                                    result += '~'+_time+value[0][1]+':59';
                                                }
                                            }
                                            for(var i in value){
                                                var color_chk = 0;

                                                for(var j in data){
                                                    if(data[j] === value[i][0]){ color_chk = j; }
                                                }
                                                result += '<br/><span style="color:'+color[color_chk]+';">'+value[i][0]+' : ' + commify(value[i][2]) + '</span>';

                                            }

                                            return result;
                                        },
                                        backgroundColor : 'rgba(0,0,0,0.9)'
                                    },
                                    legend: {
                                        data:[__zen('fw_session')],
                                        orient : 'horizontal',
                                        x :'left',
                                        y : 'top',
                                        color: ['#e78200']
                                    },
                                    grid : {
                                        x : 100
                                    },
                                    xAxis : [
                                    {
                                        type : 'category',
                                        name : __zen('hours'),
                                        data : time_,
                                        axisLabel : {
                                            formatter: function(value){

                                                var t = time[value]+'';
                                                if(t.indexOf('-')!==-1){ return t; }
                                                value = (value<10)?'0'+value:value;
                                                var result = "~"+value + ":59";
                                                return result;
                                            }
                                        }
                                    }
                                    ],
                                    yAxis : [
                                    {
                                        type : 'value',
                                        name : __zen('usage'),
                                        min : 0
                                    }
                                    ],
                                    color: color,
                                    series : [
                                    {
                                        name:__zen('fw_session'),
                                        type:'bar',
                                        data: session
                                    }
                                    ],
                                    animation : false
                                };

                                me.c_session.setOption(option);
                            },
                            html: '<div id="chart_session" style="height:300px"></div>',
                            id: 'c_session'
                        },
                        {
                            xtype: 'container',
                            makeChart: function() {
                                var me = Ext.getCmp("NFW2_log_statistics_usage");
                                var _me = this;

                                if(me.c_hdd !== undefined){
                                    me.c_hdd.clear();
                                }

                                if(_me.items.items[0] !== undefined){

                                    _me.removeAll();
                                }

                                var time_ = [];
                                var time = [];
                                var hdd = [];

                                var color = ['#10729b'];

                                var response = Ext.getCmp('NFW2_log_statistics_usage').searchObj;

                                if(response.dt_list.length > 1){
                                    for(i = 0; i < response.dt_list.length; i++){

                                        time_.push(i);
                                        time[i] = response.dt_list[i][0];
                                        hdd.push(parseInt(response.dt_list[i][3]));
                                    }

                                }else{
                                    for(i=0; i<response.hh_list.length; i++){

                                        time_.push(i);
                                        time[i] = response.hh_list[i][1];
                                        hdd.push(parseInt(response.hh_list[i][4]));
                                    }
                                }

                                var option = {
                                    tooltip : {
                                        trigger: 'axis',
                                        formatter: function(value){
                                            var result = "";
                                            var data = [__zen('disk')];

                                            if(value.length !== 0){
                                                var t = time[value[0][1]]+'';
                                                if(t.indexOf('-')!==-1){
                                                    result += t;
                                                }else{
                                                    var _time = (value[0][1]<10)?'0':'';
                                                    result += '~'+_time+value[0][1]+':59';
                                                }
                                            }
                                            for(var i in value){
                                                var color_chk = 0;

                                                for(var j in data){
                                                    if(data[j] === value[i][0]){ color_chk = j; }
                                                }
                                                result += '<br/><span style="color:'+color[color_chk]+';">'+value[i][0]+' : ' + value[i][2] + '%</span>';

                                            }

                                            return result;
                                        },
                                        backgroundColor : 'rgba(0,0,0,0.9)'
                                    },
                                    legend: {
                                        data:[__zen('disk')],
                                        orient : 'horizontal',
                                        x :'left',
                                        y : 'top'
                                    },
                                    grid : {
                                        x : 100
                                    },
                                    xAxis : [
                                    {
                                        type : 'category',
                                        name : __zen('hours'),
                                        data : time_,
                                        axisLabel : {
                                            formatter: function(value){

                                                var t = time[value]+'';
                                                if(t.indexOf('-')!==-1){ return t; }
                                                value = (value<10)?'0'+value:value;
                                                var result = "~"+value + ":59";
                                                return result;
                                            }
                                        }
                                    }
                                    ],
                                    yAxis : [
                                    {
                                        type : 'value',
                                        name : __zen('usage')+'(%)',
                                        min : 0
                                    }
                                    ],
                                    color: color,
                                    series : [
                                    {
                                        name:__zen('disk'),
                                        type:'bar',
                                        data: hdd

                                    }
                                    ],
                                    animation : false
                                };

                                me.c_hdd.setOption(option);
                            },
                            html: '<div id="chart_hdd" style="height:300px"></div>',
                            id: 'c_hdd'
                        },
                        {
                            xtype: 'panel',
                            makeChart: function() {
                                var me = Ext.getCmp("NFW2_log_statistics_usage");

                                if(me.items.items[0] !== undefined){

                                    me.removeAll();
                                }

                                var toolTipContent = '{label}<br><font color={color}>{name}</font> : {y} %';

                                var maked_chart = false;

                                var _cpuTplList = {
                                    graphType : 'Extjs4Canvas',
                                    widgetTitle : '',
                                    drawType : 'line',
                                    chartAttr : {
                                        axisY : {
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            maximum: 100,
                                            minimum: 0,
                                            title : '사용률(%)',
                                            interval:20,
                                            titleFontWeight : 'bold',
                                            labelFontWeight : 'bold'
                                        },
                                        axisY2 : {
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            maximum: 100,
                                            minimum: 0
                                        },
                                        axisX : {
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            title : '시간',
                                            titleFontWeight : 'bold',
                                            labelFontWeight : 'bold'
                                        },
                                        data :
                                        [
                                        {
                                            type: "line",
                                            showInLegend: true,
                                            name: "CPU",
                                            color: "#4F81BC",
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        },
                                        {
                                            type: "line",
                                            showInLegend: true,
                                            name: "메모리",
                                            color: "#C0504E",
                                            markerType: "none",
                                            toolTipContent: '<font color={color}>{name}</font> : {y} %'
                                        }
                                        ],
                                        toolTip:{
                                            shared: true
                                        },
                                        legend : { fontSize : 12 },
                                        theme : "theme3"
                                    },
                                    requestInfo : {
                                        getData : function(obj){

                                            if(maked_chart){
                                                return false;
                                            }

                                            maked_chart = true;

                                            var response = Ext.getCmp('NFW2_log_statistics_usage').searchObj;

                                            var i;

                                            var _data1 = [];
                                            var _data2 = [];

                                            if(response.dt_list.length > 1)
                                            {
                                                for(i = 0; i < response.dt_list.length; i++)
                                                {
                                                    _data1.push({x : i, y : parseInt(response.dt_list[i][1]), label : response.dt_list[i][0], name : 'CPU', color : "#4F81BC"});
                                                    _data2.push({x : i, y : parseInt(response.dt_list[i][2]), label : response.dt_list[i][0], name : '메모리', color : "#C0504E"});
                                                }

                                            }
                                            else
                                            {
                                                for(i=0; i<response.hh_list.length; i++)
                                                {
                                                    if(parseInt(response.hh_list[i][1]) + 1 < 10)
                                                    {
                                                        _data1.push({x : i, y : parseInt(response.hh_list[i][2]), label : '~ 0' + (parseInt(response.hh_list[i][1]) + 1) + ':00', name : "CPU", color : "#4F81BC"});
                                                        _data2.push({x : i, y : parseInt(response.hh_list[i][3]), label : '~ 0' + (parseInt(response.hh_list[i][1]) + 1) + ':00', name : "메모리", color : "#C0504E"});
                                                    }
                                                    else
                                                    {
                                                        _data1.push({x : i, y : parseInt(response.hh_list[i][2]), label : '~ ' + (parseInt(response.hh_list[i][1]) + 1) + ':00', name : "CPU", color : "#4F81BC"});
                                                        _data2.push({x : i, y : parseInt(response.hh_list[i][3]), label : '~ ' + (parseInt(response.hh_list[i][1]) + 1) + ':00', name : "메모리", color : "#C0504E"});
                                                    }
                                                }
                                            }

                                            obj.setData(obj, [_data1,_data2]);
                                        }
                                    }
                                };

                                var cpuMakeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

                                    var _widgettype = 'Extjs4Canvas';
                                    var _attr = {};
                                    _attr.graphType = drawtype;
                                    _attr.chartInfo = chartAttr;
                                    _attr.requestInfo = reqInfo;
                                    _attr.interval = interval;

                                    var _item = Ext.create(_widgettype, _attr);

                                    return _item;
                                };

                                var _cpuWidget = cpuMakeWidget(_cpuTplList.drawType, 'CPU', _cpuTplList.chartAttr, _cpuTplList.requestInfo, _cpuTplList.interval);

                                me.add(_cpuWidget);
                            },
                            height: 300,
                            hidden: true,
                            html: '<div id="chart_cpu" style="height:300px"></div>',
                            id: 'pnl_cpuCanvas',
                            margin: 10,
                            maxHeight: 300,
                            minHeight: 300,
                            layout: 'fit'
                        },
                        {
                            xtype: 'panel',
                            makeChart: function() {
                                var me = this;

                                if(me.items.items[0] !== undefined){

                                    me.removeAll();
                                }

                                var toolTipContent = '{label}<br><font color={color}>{name}</font> : {y}';

                                var maked_chart = false;

                                var _sessionTplList = {
                                    graphType : 'Extjs4Canvas',
                                    widgetTitle : '',
                                    drawType : 'line',
                                    chartAttr : {
                                        axisY : {
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            minimum: 0,
                                            title : '사용량',
                                            titleFontWeight : 'bold',
                                            labelFontWeight : 'bold'
                                        },
                                        axisX : {
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            title : '시간',
                                            titleFontWeight : 'bold',
                                            labelFontWeight : 'bold'
                                        },
                                        data :
                                        [
                                        {
                                            color: "#F2CB61",
                                            type: "line",
                                            showInLegend: true,
                                            name: "방화벽 세션",
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        }
                                        ],
                                        legend : { fontSize : 12 },
                                        theme : "theme3"
                                    },
                                    requestInfo : {
                                        getData : function(obj){

                                            if(maked_chart){
                                                return false;
                                            }

                                            maked_chart = true;

                                            var response = Ext.getCmp('NFW2_log_statistics_usage').searchObj;

                                            var i, j;

                                            var _data1 = [];

                                            if(response.dt_list.length > 1)
                                            {
                                                for(i = 0; i < response.dt_list.length; i++)
                                                {
                                                    _data1.push({x : i, y : parseInt(response.dt_list[i][4]), label : response.dt_list[i][0], name : '방화벽 세션', color : "#F2CB61"});
                                                }
                                            }
                                            else
                                            {
                                                for(i=0; i<response.hh_list.length; i++)
                                                {
                                                    if(parseInt(response.hh_list[i][1]) + 1 < 10)
                                                    {
                                                        _data1.push({x : i, y : parseInt(response.hh_list[i][5]), label : '~ 0' + (parseInt(response.hh_list[i][1]) + 1) + ':00', name : "방화벽 세션", color : "#F2CB61"});
                                                    }
                                                    else
                                                    {
                                                        _data1.push({x : i, y : parseInt(response.hh_list[i][5]), label : '~ ' + (parseInt(response.hh_list[i][1]) + 1) + ':00', name : "방화벽 세션", color : "#F2CB61"});
                                                    }
                                                }
                                            }

                                            obj.setData(obj, [_data1]);
                                        }
                                    }
                                };

                                var sessionMakeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

                                    var _widgettype = 'Extjs4Canvas';
                                    var _attr = {};
                                    _attr.graphType = drawtype;
                                    _attr.chartInfo = chartAttr;
                                    _attr.requestInfo = reqInfo;
                                    _attr.interval = interval;

                                    var _item = Ext.create(_widgettype, _attr);

                                    return _item;
                                };


                                var _sessionWidget = sessionMakeWidget(_sessionTplList.drawType, 'SESSION', _sessionTplList.chartAttr, _sessionTplList.requestInfo, _sessionTplList.interval);

                                me.add(_sessionWidget);
                            },
                            height: 300,
                            hidden: true,
                            id: 'pnl_sessionCanvas',
                            margin: 10,
                            maxHeight: 300,
                            minHeight: 300,
                            layout: 'fit'
                        },
                        {
                            xtype: 'panel',
                            makeChart: function() {
                                var me = this;

                                if(me.items.items[0] !== undefined){

                                    me.removeAll();
                                }

                                var toolTipContent = '{label}<br><font color={color}>{name}</font> : {y} Mbyte';

                                var maked_chart = false;

                                var _hddTplList = {
                                    graphType : 'Extjs4Canvas',
                                    widgetTitle : '',
                                    drawType : 'line',
                                    chartAttr : {
                                        axisY : {
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            minimum: 0,
                                            title : '사용량(Mbyte)',
                                            titleFontWeight : 'bold',
                                            labelFontWeight : 'bold'
                                        },
                                        axisX : {
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            title : '시간',
                                            titleFontWeight : 'bold',
                                            labelFontWeight : 'bold'
                                        },
                                        data :
                                        [
                                        {
                                            color: "#4374D9",
                                            type: "line",
                                            showInLegend: true,
                                            name: "디스크",
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        }
                                        ],
                                        legend : { fontSize : 12 },
                                        theme : "theme3"
                                    },
                                    requestInfo : {
                                        getData : function(obj){

                                            if(maked_chart){
                                                return false;
                                            }

                                            maked_chart = true;

                                            var response = Ext.getCmp('NFW2_log_statistics_usage').searchObj;

                                            var i;

                                            var _data1 = [];

                                            if(response.dt_list.length > 1)
                                            {
                                                for(i = 0; i < response.dt_list.length; i++)
                                                {
                                                    _data1.push({x : i, y : parseInt(response.dt_list[i][3]), label : response.dt_list[i][0], name : "디스크", color : "#4374D9"});
                                                }
                                            }
                                            else
                                            {
                                                for(i=0; i<response.hh_list.length; i++)
                                                {
                                                    if(parseInt(response.hh_list[i][1]) + 1 < 10)
                                                    {
                                                        _data1.push({x : i, y : parseInt(response.hh_list[i][4]), label : '~ 0' + (parseInt(response.hh_list[i][1]) + 1) + ':00', name : "디스크", color : "#4374D9"});
                                                    }
                                                    else
                                                    {
                                                        _data1.push({x : i, y : parseInt(response.hh_list[i][4]), label : '~ ' + (parseInt(response.hh_list[i][1]) + 1) + ':00', name : "디스크", color : "#4374D9"});
                                                    }
                                                }
                                            }

                                            obj.setData(obj, [_data1]);
                                        }
                                    }
                                };

                                var hddMakeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

                                    var _widgettype = 'Extjs4Canvas';
                                    var _attr = {};
                                    _attr.graphType = drawtype;
                                    _attr.chartInfo = chartAttr;
                                    _attr.requestInfo = reqInfo;
                                    _attr.interval = interval;

                                    var _item = Ext.create(_widgettype, _attr);

                                    return _item;
                                };

                                var _hddWidget = hddMakeWidget(_hddTplList.drawType, 'HDD', _hddTplList.chartAttr, _hddTplList.requestInfo, _hddTplList.interval);

                                me.add(_hddWidget);
                            },
                            height: 300,
                            hidden: true,
                            id: 'pnl_hddCanvas',
                            margin: 10,
                            maxHeight: 300,
                            minHeight: 300,
                            layout: 'fit'
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'grid_log',
                            id: 'grid_usage_cpu',
                            margin: 10,
                            columnLines: true,
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var first_value = parseInt(value);
                                        var second_value = parseInt(value) + 1;

                                        if(record.data.hour)
                                        {
                                            var second_hour = parseInt(record.data.hour);

                                            if(second_value >= 6){
                                                second_hour = second_hour + 1;
                                                second_value = 0;
                                            }

                                            if(parseInt(record.data.hour) < 9){
                                                return "0" + record.data.hour + ":" + value + "0 ~ 0" + second_hour + ":" + second_value + "0";
                                            }else if(parseInt(record.data.hour) === 9){
                                                return "0" + record.data.hour + ":" + value + "0 ~ " + second_hour + ":" + second_value + "0";
                                            }else{
                                                return record.data.hour + ":" + value + "0 ~ " + second_hour + ":" + second_value + "0";
                                            }
                                        }
                                        else
                                        {
                                            metaData.style = 'cursor: pointer;';

                                            if(first_value < 9){
                                                return "0" + value + ":00 ~ 0" + second_value + ":00";
                                            }else if(first_value === 9){
                                                return "0" + value + ":00 ~ " + second_value + ":00";
                                            }else if(first_value < 24){
                                                return value + ":00 ~ " + second_value + ":00";
                                            }else{
                                                return value;
                                            }
                                        }
                                    },
                                    align: 'center',
                                    dataIndex: 'time',
                                    flex: 1,
                                    bind: {
                                        text: '{time}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value +" %";
                                    },
                                    align: 'right',
                                    dataIndex: 'cpu',
                                    flex: 1,
                                    bind: {
                                        text: '{cpu}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value +" %";
                                    },
                                    align: 'right',
                                    dataIndex: 'memory',
                                    flex: 1,
                                    bind: {
                                        text: '{memory}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value);
                                    },
                                    align: 'right',
                                    dataIndex: 'session',
                                    flex: 1,
                                    bind: {
                                        text: '{fw_session}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value) +" %";
                                    },
                                    align: 'right',
                                    dataIndex: 'hdd',
                                    flex: 1,
                                    bind: {
                                        text: '{disk}'
                                    }
                                }
                            ],
                            viewConfig: {
                                getRowClass: function(record, rowIndex, rowParams, store) {
                                    var _cls = '';
                                    if(record.data.hour){
                                        if(record.data.year){
                                            _cls = 'dep1';
                                        }else{
                                            _cls = 'dep2';
                                        }
                                    }else{
                                        if(record.data.year){
                                            _cls = 'dep2';
                                        }
                                    }

                                    Ext.Function.defer(function(){
                                        this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                    },100, this);

                                    return _cls;
                                }
                            },
                            listeners: {
                                cellclick: 'onGrid_usage_cpuCellClick'
                            }
                        }
                    ],
                    listeners: {
                        hide: 'onPnl_usage_cpuHide',
                        beforerender: 'onPnl_usage_cpuBeforeRender'
                    }
                },
                {
                    xtype: 'container'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        resize: 'onNFW2_log_statistics_usageResize'
    },

    onBtn_todayClick: function(button, e, eOpts) {
        var date = new Date();

        Ext.getCmp("search_start").setValue(date);
        Ext.getCmp("search_end").setValue(date);
    },

    onButtonClick1: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.DAY,-1);

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less);
    },

    onButtonToggle1: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.DAY,-7);
        var less_e = Ext.getCmp("search_start").getValue();

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less_e);
    },

    onButtonToggle2: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.DAY,-10);
        var less_e = Ext.getCmp("search_start").getValue();

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less_e);
    },

    onButtonToggle3: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.DAY,-15);
        var less_e = Ext.getCmp("search_start").getValue();

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less_e);
    },

    onButtonToggle4: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.MONTH,-1);
        var less_e = Ext.getCmp("search_start").getValue();

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less_e);
    },

    onButtonToggle5: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.MONTH,-3);
        var less_e = Ext.getCmp("search_start").getValue();

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less_e);
    },

    onButtonToggle6: function(button, e, eOpts) {
        var less = Ext.Date.add(Ext.getCmp("search_start").getValue(),Ext.Date.MONTH,-6);
        var less_e = Ext.getCmp("search_start").getValue();

        Ext.getCmp("search_start").setValue(less);
        Ext.getCmp("search_end").setValue(less_e);
    },

    onChk_interfaceBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('per_inter_traffic');
    },

    onChk_cpuBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('statistics_info1');
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_log_statistics_usage');

        var record_cpu = [];

        var record_interface = [];

        if(Ext.getCmp("chk_interface").getValue()===false && Ext.getCmp("chk_cpu").getValue()===false){
            Ext.MessageBox.alert(__weguardia,ValidSelect(__zen('usage_statistics'),1));
            return false;
        }

        var _params = {
            start_ts: Ext.encode(Ext.Date.format(Ext.getCmp('search_start').getValue(), 'Ymd')),
            end_ts: Ext.encode(Ext.Date.format(Ext.getCmp('search_end').getValue(), 'Ymd'))
        };

        Ext.getCmp('grid_usage_interface').hide();

        Ext.getCmp('pnl_usage_interface').hide();

        Ext.getCmp('grid_usage_cpu').hide();

        Ext.getCmp('pnl_usage_cpu').hide();

        var i_record = Ext.create('Ext.data.Store',{
            data: [],
            fields: ['time','eth','rxPacket','txPacket','rxByte','txByte','dropByte']
        });

        Ext.getCmp("grid_usage_interface").bindStore(i_record);

        var c_record = Ext.create('Ext.data.Store',{
            data: [],
            fields: ['time','cpu','memory','session','hdd']
        });

        Ext.getCmp("grid_usage_cpu").bindStore(c_record);

        showLoadMask();

        request_helper.xmlrpc_call_JsonP(
            'FtDBMgr',
            'getSystemUsage',
            _params,
            function(response){

                hideLoadMask();

                if((!response.dt_list && !response.hh_list && !response.hhm_list) ||
                   (response.dt_list.length < 1 && response.hh_list.length < 1 && response.hhm_list.length < 1)){
                    Ext.MessageBox.alert(__weguardia,get_msg('err_statistics'));
                    return false;
                }

                me.searchObj = response;

                var eth_num;
                var eth_hnum;
                var a,i,j,k;

                if(response.dt_list.length > 1){
                    for(a in response.dt_list){

                        record_cpu.push({

                            time : response.dt_list[a][0],
                            cpu : parseInt(response.dt_list[a][1]),
                            memory : parseInt(response.dt_list[a][2]),
                            session :parseInt(response.dt_list[a][4]),
                            hdd : parseInt(response.dt_list[a][3]),
                            hidden : false,
                            subhidden : true
                        });

                        for(i in response.hh_list){

                            if(response.hh_list[i][0] === response.dt_list[a][0]){
                                record_cpu.push({

                                    time : response.hh_list[i][1],
                                    cpu : parseInt(response.hh_list[i][2]),
                                    memory : parseInt(response.hh_list[i][3]),
                                    session :parseInt(response.hh_list[i][5]),
                                    hdd : parseInt(response.hh_list[i][4]),
                                    hidden : true,
                                    subhidden : true,
                                    year : response.hh_list[i][0]
                                });

                                for(j in response.hhm_list){

                                    if(response.hhm_list[j][0] === response.hh_list[i][0] &&
                                       response.hhm_list[j][1] === response.hh_list[i][1]){
                                        record_cpu.push({

                                            time : response.hhm_list[j][2],
                                            cpu : parseInt(response.hhm_list[j][3]),
                                            memory : parseInt(response.hhm_list[j][4]),
                                            session : parseInt(response.hhm_list[j][6]),
                                            hdd : parseInt(response.hhm_list[j][5]),
                                            hidden : true,
                                            year : response.hhm_list[j][0],
                                            hour : response.hhm_list[j][1]
                                        });
                                    }
                                }
                            }
                        }

                        for(k=0; k<me.eth.length; k++){
                            if(parseInt(me.eth[k]) === 0){
                                eth_num = 5;
                            }else{
                                eth_num = 5 + parseInt(me.eth[k])*8;
                            }

                            record_interface.push({

                                time : response.dt_list[a][0],
                                eth : 'eth' + me.eth[k],
                                rxPacket : response.dt_list[a][eth_num+1],
                                txPacket : response.dt_list[a][eth_num+5],
                                rxByte : response.dt_list[a][eth_num],
                                txByte : response.dt_list[a][eth_num+4],
                                dropByte : parseInt(response.dt_list[a][eth_num+3])+parseInt(response.dt_list[a][eth_num+7]),
                                hidden : false,
                                subhidden : true

                            });

                            for(i in response.hh_list){

                                if(response.hh_list[i][0] === response.dt_list[a][0]){
                                    if(parseInt(me.eth[k]) === 0){
                                        eth_num = 6;
                                    }else{
                                        eth_num = 6 + parseInt(me.eth[k])*8;
                                    }

                                    record_interface.push({

                                        time : response.hh_list[i][1],
                                        eth : 'eth' + me.eth[k],
                                        rxPacket : response.hh_list[i][eth_num+1],
                                        txPacket : response.hh_list[i][eth_num+5],
                                        rxByte : response.hh_list[i][eth_num],
                                        txByte : response.hh_list[i][eth_num+4],
                                        dropByte : parseInt(response.hh_list[i][eth_num+3])+parseInt(response.hh_list[i][eth_num+7]),
                                        hidden : true,
                                        subhidden : true,
                                        year : response.hh_list[i][0]

                                    });

                                    for(j in response.hhm_list){

                                        if(response.hhm_list[j][1] === response.hh_list[i][1] &&
                                           response.hhm_list[j][0] === response.hh_list[i][0]){
                                            if(parseInt(me.eth[k]) === 0){
                                                eth_hnum = 7;
                                            }else{
                                                eth_hnum = 7 + parseInt(me.eth[k])*8;
                                            }

                                            record_interface.push({

                                                time : response.hhm_list[j][2],
                                                eth : 'eth'+me.eth[k],
                                                rxPacket : response.hhm_list[j][eth_hnum+1],
                                                txPacket : response.hhm_list[j][eth_hnum+5],
                                                rxByte : response.hhm_list[j][eth_hnum],
                                                txByte : response.hhm_list[j][eth_hnum+4],
                                                dropByte : parseInt(response.hhm_list[j][eth_hnum+3])+parseInt(response.hhm_list[j][eth_hnum+7]),
                                                hidden : true,
                                                year : response.hhm_list[j][0],
                                                hour : response.hhm_list[j][1]

                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else{
                    for(i in response.hh_list){

                        record_cpu.push({

                            time : response.hh_list[i][1],
                            cpu : parseInt(response.hh_list[i][2]),
                            memory : parseInt(response.hh_list[i][3]),
                            session :parseInt(response.hh_list[i][5]),
                            hdd : parseInt(response.hh_list[i][4]),
                            hidden : false,
                            subhidden : true
                        });

                        for(j in response.hhm_list){

                            if(response.hhm_list[j][1] === response.hh_list[i][1]){
                                record_cpu.push({

                                    time : response.hhm_list[j][2],
                                    cpu : parseInt(response.hhm_list[j][3]),
                                    memory : parseInt(response.hhm_list[j][4]),
                                    session : parseInt(response.hhm_list[j][6]),
                                    hdd : parseInt(response.hhm_list[j][5]),
                                    hidden : true,
                                    hour : response.hhm_list[j][1]
                                });
                            }
                        }
                    }

                    for(i in response.hh_list){

                        for(k=0; k<me.eth.length; k++){

                            if(parseInt(me.eth[k]) === 0){
                                eth_num = 6;
                            }else{
                                eth_num = 6 + parseInt(me.eth[k])*8;
                            }

                            record_interface.push({

                                time : response.hh_list[i][1],
                                eth : 'eth' + me.eth[k],
                                rxPacket : response.hh_list[i][eth_num+1],
                                txPacket : response.hh_list[i][eth_num+5],
                                rxByte : response.hh_list[i][eth_num],
                                txByte : response.hh_list[i][eth_num+4],
                                dropByte : parseInt(response.hh_list[i][eth_num+3])+parseInt(response.hh_list[i][eth_num+7]),
                                hidden : false,
                                subhidden : true
                            });

                            for(j in response.hhm_list){

                                if(response.hhm_list[j][1] === response.hh_list[i][1]){
                                    if(parseInt(me.eth[k]) === 0){
                                        eth_hnum = 7;
                                    }else{
                                        eth_hnum = 7 + parseInt(me.eth[k])*8;
                                    }

                                    record_interface.push({

                                        time : response.hhm_list[j][2],
                                        eth : 'eth'+me.eth[k],
                                        rxPacket : response.hhm_list[j][eth_hnum+1],
                                        txPacket : response.hhm_list[j][eth_hnum+5],
                                        rxByte : response.hhm_list[j][eth_hnum],
                                        txByte : response.hhm_list[j][eth_hnum+4],
                                        dropByte : parseInt(response.hhm_list[j][eth_hnum+3])+parseInt(response.hhm_list[j][eth_hnum+7]),
                                        hidden : true,
                                        hour : response.hhm_list[j][1]
                                    });
                                }
                            }
                        }
                    }
                }

                var store_cpu = Ext.getCmp("grid_usage_cpu").getStore();

                store_cpu.loadData(record_cpu);

                store_cpu.clearFilter(true);

                store_cpu.filterBy(function(record){

                    if(record.data.hidden)
                        return false;
                    else
                        return true;
                });

                var store_interface = Ext.getCmp("grid_usage_interface").getStore();

                store_interface.loadData(record_interface);
                setTimeout(function(){ me.setWidth('100%'); },100);

                store_interface.clearFilter(true);

                store_interface.filterBy(function(record){

                    if(record.data.hidden)
                        return false;
                    else
                        return true;
                });

                if(Ext.getCmp('chk_interface').getValue()){

                    Ext.getCmp('grid_usage_interface').show();

                    Ext.getCmp('pnl_usage_interface').show();
                    Ext.getCmp("c_inter").makeChart();

                }

                if(Ext.getCmp('chk_cpu').getValue()){

                    Ext.getCmp('grid_usage_cpu').show();

                    Ext.getCmp('pnl_usage_cpu').show();
                    Ext.getCmp("c_chart").makeChart();
                    Ext.getCmp("c_session").makeChart();
                    Ext.getCmp("c_hdd").makeChart();

                }
            }
        );
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        me.c_inter = echarts.init(document.getElementById('chart_inter'),'macarons');
        me.myChart = echarts.init(document.getElementById('chart_cpu'),'macarons');
        me.c_session = echarts.init(document.getElementById('chart_session'),'macarons');
        me.c_hdd = echarts.init(document.getElementById('chart_hdd'),'macarons');

        var date = new Date();

        Ext.getCmp("search_start").setValue(date);
        Ext.getCmp("search_end").setValue(date);

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            {
                basename : Ext.encode('monitor_basic')
            },
            function(response){


                hideLoadMask();
                if(response){
                    me.eth = response.mon.eth.split(';');
                }else{
                    me.eth = ['0', '1', '2', '3'];
                }
            }
        );
    },

    onGrid_usage_interfaceCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0 && !record.data.hour)
        {
            if(record.data.subhidden)
                record.data.subhidden = false;
            else
                record.data.subhidden = true;

            var store_usage_interface = Ext.getCmp("grid_usage_interface").getStore();

            store_usage_interface.clearFilter(true);

            store_usage_interface.each(function(st_record){

                if(st_record.data.year)
                {
                    if(record.data.subhidden)
                    {
                        if(record.data.year)
                        {
                            if(record.data.year === st_record.data.year &&
                               record.data.time === st_record.data.hour &&
                               record.data.eth === st_record.data.eth)
                            {
                                st_record.data.hidden = true;
                            }
                        }
                        else
                        {
                            if(record.data.time === st_record.data.year &&
                               record.data.eth === st_record.data.eth)
                            {
                                st_record.data.hidden = true;
                            }
                        }
                    }
                    else
                    {
                        if(record.data.year)
                        {
                         if(record.data.year === st_record.data.year &&
                            record.data.time === st_record.data.hour &&
                            record.data.eth === st_record.data.eth)
                         {
                             st_record.data.hidden = false;
                         }
                        }
                        else
                        {
                            if(record.data.time === st_record.data.year &&
                               record.data.eth === st_record.data.eth)
                            {
                                if(st_record.data.hour)
                                    st_record.data.hidden = true;
                                else
                                    st_record.data.hidden = false;
                            }
                        }
                    }
                }
                else
                {
                    if(record.data.subhidden)
                    {
                        if(record.data.time === st_record.data.hour &&
                           record.data.eth === st_record.data.eth)
                        {
                            st_record.data.hidden = true;
                        }
                    }
                    else
                    {
                        if(record.data.time === st_record.data.hour &&
                           record.data.eth === st_record.data.eth)
                        {
                            st_record.data.hidden = false;
                        }
                    }
                }
            });

            store_usage_interface.filterBy(function(st_record){

                if(st_record.data.hidden)
                    return false;
                else
                    return true;
            });
        }

    },

    onPnl_usage_interfaceHide: function(component, eOpts) {
        if(Ext.getCmp('pnl_interfaceCanvas').items.items[0] !== undefined){

            Ext.getCmp('pnl_interfaceCanvas').removeAll();
        }
    },

    onPnl_usage_interfaceBeforeRender: function(component, eOpts) {
        component.setTitle(__zen('usage_statistics')+' - '+__zen('per_inter_traffic'));
    },

    onGrid_usage_cpuCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0 && !record.data.hour)
        {
            if(record.data.subhidden)
                record.data.subhidden = false;
            else
                record.data.subhidden = true;

            var store_usage_cpu = Ext.getCmp("grid_usage_cpu").getStore();

            store_usage_cpu.clearFilter(true);

            store_usage_cpu.each(function(st_record){

                if(st_record.data.year)
                {
                    if(record.data.subhidden)
                    {
                        if(record.data.year)
                        {
                            if(record.data.year === st_record.data.year &&
                               record.data.time === st_record.data.hour)
                            {
                                st_record.data.hidden = true;
                            }
                        }
                        else
                        {
                            if(record.data.time === st_record.data.year)
                            {
                                st_record.data.hidden = true;
                            }
                        }
                    }
                    else
                    {
                        if(record.data.year)
                        {
                            if(record.data.year === st_record.data.year &&
                               record.data.time === st_record.data.hour)
                            {
                                st_record.data.hidden = false;
                            }
                        }
                        else
                        {
                            if(record.data.time === st_record.data.year)
                            {
                                if(st_record.data.hour)
                                    st_record.data.hidden = true;
                                else
                                    st_record.data.hidden = false;
                            }
                        }
                    }
                }
                else
                {
                    if(record.data.subhidden)
                    {
                        if(record.data.time === st_record.data.hour)
                        {
                            st_record.data.hidden = true;
                        }
                    }
                    else
                    {
                        if(record.data.time === st_record.data.hour)
                        {
                            st_record.data.hidden = false;
                        }
                    }
                }
            });

            store_usage_cpu.filterBy(function(st_record){

                if(st_record.data.hidden)
                    return false;
                else
                    return true;
            });
        }

    },

    onPnl_usage_cpuHide: function(component, eOpts) {
        if(Ext.getCmp('pnl_cpuCanvas').items.items[0] !== undefined){

            Ext.getCmp('pnl_cpuCanvas').removeAll();
        }

        if(Ext.getCmp('pnl_sessionCanvas').items.items[0] !== undefined){

            Ext.getCmp('pnl_sessionCanvas').removeAll();
        }

        if(Ext.getCmp('pnl_hddCanvas').items.items[0] !== undefined){

            Ext.getCmp('pnl_hddCanvas').removeAll();
        }
    },

    onPnl_usage_cpuBeforeRender: function(component, eOpts) {
        component.setTitle(__zen('usage_statistics')+' - '+__zen('statistics_info1'));
    },

    onNFW2_log_statistics_usageResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        var me = this;

        var _wid = Ext.getCmp("c_chart").getWidth();

        var option = {
            grid : {
                width : _wid-150
            }
        };

        document.getElementById('chart_inter').style.width = _wid+"px";
        document.getElementById('chart_cpu').style.width = _wid+"px";
        document.getElementById('chart_session').style.width = _wid+"px";
        document.getElementById('chart_hdd').style.width = _wid+"px";

        me.c_inter.setOption(option);
        me.myChart.setOption(option);
        me.c_session.setOption(option);
        me.c_hdd.setOption(option);

        me.c_inter.resize();
        me.myChart.resize();
        me.c_session.resize();
        me.c_hdd.resize();
    }

});