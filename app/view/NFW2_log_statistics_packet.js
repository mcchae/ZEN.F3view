
Ext.define('NFW2.view.NFW2_log_statistics_packet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_log_statistics_packet',

    requires: [
        'NFW2.view.NFW2_log_statistics_packetViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.form.field.Date',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'nfw2_log_statistics_packet'
    },
    cls: 'zen_body',
    id: 'NFW2_log_statistics_packet',
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
                                            allowDepress: false,
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
                                            allowDepress: false,
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
                                            allowDepress: false,
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
                                            allowDepress: false,
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
                                            allowDepress: false,
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
                                            allowDepress: false,
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
                                            allowDepress: false,
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
                                            allowDepress: false,
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
                                    padding: 5,
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: 'search_start',
                                            padding: 0,
                                            fieldLabel: '',
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
                                            fieldLabel: '',
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
            scrollable: true,
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'container',
                            makeChart: function() {
                                var me = Ext.getCmp("NFW2_log_statistics_packet");
                                var _me = this;

                                if(me.myChart !== undefined){
                                    me.myChart.clear();
                                }

                                if(_me.items.items[0] !== undefined){

                                    _me.removeAll();
                                }

                                var _keys = ['64 byte', '128 byte', '256 byte', '512 byte', '1024 byte', '1500 byte', 'Total'];
                                var _keys_value = ['ps64', 'ps128', 'ps256', 'ps512', 'ps1024', 'ps1500', 'ps_total'];

                                var _data = [_keys.length];
                                var _series = [];

                                for(i=0; i<_keys.length; i++){
                                    _data[i] = [];
                                }

                                var time_ = [];
                                var time = [];
                                var ps64 = [], ps128 = [], ps256 = [], ps512 = [], ps1024 = [], ps1500 = [], ps_total = [];

                                var color = [
                                '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                                '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                                '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                                '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                                ];

                                var response = Ext.getCmp('NFW2_log_statistics_packet').searchObj;

                                if(response.log_dt_list.length > 1){
                                    for(i = 0 ; i < response.log_dt_list.length ; i++){
                                        _orig = response.log_dt_list[i];

                                        _label = _orig[0];

                                        for(j = 0 ; j < _keys.length ; j++){
                                            if(_keys[j] === 'Total'){
                                                _data[j].push({x : i, y : parseInt(_orig[1]) + parseInt(_orig[2]) + parseInt(_orig[3]) + parseInt(_orig[4]) + parseInt(_orig[5]) +
                                                parseInt(_orig[6]), label : _label, tooltip_name : _keys[j]});
                                            }else{
                                                _data[j].push({x : i, y : parseInt(_orig[j+1]), label : _label, tooltip_name : _keys[j]});
                                            }
                                        }
                                    }
                                }else{
                                    for(i = 0; i < response.log_hh_list.length; i++){
                                        _orig = response.log_hh_list[i];

                                        if(parseInt(_orig[1]) + 1 < 10){
                                            _label = '~ 0' + (parseInt(_orig[1]) + 1) + ':00';
                                        }else{
                                            _label = '~ ' + (parseInt(_orig[1]) + 1) + ':00';
                                        }

                                        for(j = 0 ; j < _keys.length ; j++){
                                            if(_keys[j] === 'Total'){
                                                _data[j].push({x : i, y : parseInt(_orig[2]) + parseInt(_orig[3]) + parseInt(_orig[4]) + parseInt(_orig[5]) + parseInt(_orig[6]) +
                                                parseInt(_orig[7]), label : _label, tooltip_name : _keys[j]});
                                            }else{
                                                _data[j].push({x : i, y : parseInt(_orig[j+2]), label : _label, tooltip_name : _keys[j]});
                                            }
                                        }
                                    }
                                }

                                for(var i=0; i<_data.length; i++){
                                    eval('var ar = '+_keys_value[i]+';');
                                    for(var l=0; l<_data[i].length; l++){
                                        time[l] = _data[i][l].label;
                                        ar.push(_data[i][l].y);
                                    }
                                }

                                for(var i in time){
                                    time_.push(i);
                                }
                                for(i=0; i<_keys.length; i++){
                                    eval('var ar = '+_keys_value[i]+';');
                                    _series.push({
                                        name:_keys[i],
                                        type:'bar',
                                        data: ar

                                    });
                                }

                                var option = {
                                    tooltip : {
                                        trigger: 'axis',
                                        formatter: function(value){
                                            var result = "";
                                            var data = _keys;

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
                                        data:_keys,
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
                                        min : 0
                                    }
                                    ],
                                    series : _series,
                                    animation : false
                                };

                                me.myChart.setOption(option);
                            },
                            html: '<div id="chart_packet" style="height:300px;width:300px"></div>',
                            id: 'c_packet'
                        },
                        {
                            xtype: 'panel',
                            makeChart: function() {
                                var me = this;

                                var _keys = ['64 byte', '128 byte', '256 byte', '512 byte', '1024 byte', '1500 byte', 'Total'];
                                var _keys_value = ['ps64', 'ps128', 'ps256', 'ps512', 'ps1024', 'ps1500', 'ps_total'];

                                var _data = [_keys.length];

                                var _orig, _label = '';

                                var i,j;

                                var _tplList_data = [];

                                var toolTipContent = '<font color={tooltip_color}>{tooltip_name}</font> : {y}';

                                var colorSet = ["#369EAD", "#C24642", "#7F6084", "#86B402", "#A2D1CF", "#C8B631", "#6DBCEB", "#52514E", "#4F81BC", "#A064A1",
                                    "#F79647","#4F81BC", "#C0504E", "#9BBB58", "#23BFAA", "#8064A1", "#4AACC5", "#F79647", "#33558B","#8CA1BC",
                                    "#36845C", "#017E82", "#8CB9D0", "#708C98", "#94838D", "#F08891", "#0366A7", "#008276", "#EE7757", "#E5BA3A",
                                    "#F2990B", "#03557B", "#782970"];

                                var maked_chart = false;

                                for(i=0; i<_keys.length; i++)
                                {
                                    if(i === 0)
                                    {
                                        _tplList_data.push({
                                            type : 'line',
                                            showInLegend: true,
                                            name: _keys[i],
                                            legendText: _keys[i],
                                            markerType: "none",
                                            toolTipContent: '{label}<br><font color={tooltip_color}>{tooltip_name}</font> : {y}'
                                        });
                                    }
                                    else
                                    {
                                        _tplList_data.push({
                                            type : 'line',
                                            showInLegend: true,
                                            name: _keys[i],
                                            legendText: _keys[i],
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        });
                                    }
                                }

                                for(i=0; i<_keys.length; i++)
                                {
                                    _data[i] = [];
                                }

                                var tplList = {
                                    graphType : 'Extjs4Canvas',
                                    widgetTitle : '',
                                    drawType : 'line',
                                    chartAttr : {
                                        axisX : {
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            title : '시간',
                                            titleFontWeight : 'bold',
                                            labelFontWeight : 'bold'
                                        },
                                        axisY : {
                                            minimum : 0,
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            title : '분포도',
                                            titleFontWeight : 'bold',
                                            labelFontWeight : 'bold'
                                        },
                                        data : _tplList_data,
                                        toolTip:{
                                            shared: true
                                        },
                                        legend : {
                                            fontSize : 12,
                                            cursor: "pointer",
                                            itemclick: function(e){

                                                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                                                    if(e.dataSeriesIndex === 0){
                                                        e.dataSeries.toolTipContent = '{label}';
                                                    }else{
                                                        e.dataSeries.toolTipContent = null;
                                                    }
                                                    e.dataSeries.visible = false;
                                                } else {
                                                    if(e.dataSeriesIndex === 0){
                                                        e.dataSeries.toolTipContent = '{label}<br><font color={tooltip_color}>{tooltip_name}</font> : {y}';
                                                    }
                                                    else{
                                                        e.dataSeries.toolTipContent = toolTipContent;
                                                    }
                                                    e.dataSeries.visible = true;
                                                }

                                                e.chart.render();
                                            }
                                        },
                                        theme : "theme3"
                                    },
                                    requestInfo : {
                                        getData : function(obj){

                                            if(maked_chart){
                                                return false;
                                            }

                                            maked_chart = true;

                                            var response = Ext.getCmp('NFW2_log_statistics_packet').searchObj;

                                            var _dataPoints = [];

                                            if(response.log_dt_list.length > 1)
                                            {
                                                for(i = 0 ; i < response.log_dt_list.length ; i++)
                                                {
                                                    _orig = response.log_dt_list[i];

                                                    _label = _orig[0];

                                                    for(j = 0 ; j < _keys.length ; j++)
                                                    {
                                                        if(_keys[j] === 'Total')
                                                        {
                                                            _data[j].push({x : i, y : parseInt(_orig[1]) + parseInt(_orig[2]) + parseInt(_orig[3]) + parseInt(_orig[4]) + parseInt(_orig[5]) +
                                                            parseInt(_orig[6]), label : _label, tooltip_name : _keys[j], tooltip_color : colorSet[j]});
                                                        }
                                                        else
                                                        {
                                                            _data[j].push({x : i, y : parseInt(_orig[j+1]), label : _label, tooltip_name : _keys[j], tooltip_color : colorSet[j]});
                                                        }
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                for(i = 0; i < response.log_hh_list.length; i++)
                                                {
                                                    _orig = response.log_hh_list[i];

                                                    if(parseInt(_orig[1]) + 1 < 10)
                                                    {
                                                        _label = '~ 0' + (parseInt(_orig[1]) + 1) + ':00';
                                                    }
                                                    else
                                                    {
                                                        _label = '~ ' + (parseInt(_orig[1]) + 1) + ':00';
                                                    }

                                                    for(j = 0 ; j < _keys.length ; j++)
                                                    {
                                                        if(_keys[j] === 'Total')
                                                        {
                                                            _data[j].push({x : i, y : parseInt(_orig[2]) + parseInt(_orig[3]) + parseInt(_orig[4]) + parseInt(_orig[5]) + parseInt(_orig[6]) +
                                                            parseInt(_orig[7]), label : _label, tooltip_name : _keys[j], tooltip_color : colorSet[j]});
                                                        }
                                                        else
                                                        {
                                                            _data[j].push({x : i, y : parseInt(_orig[j+2]), label : _label, tooltip_name : _keys[j], tooltip_color : colorSet[j]});
                                                        }
                                                    }
                                                }
                                            }

                                            for(i = 0 ; i < _keys.length ; i++){

                                                _dataPoints.push(_data[i]);
                                            }

                                            obj.setData(obj, _dataPoints);
                                        }
                                    }
                                };

                                var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

                                    var _widgettype = 'Extjs4Canvas';
                                    var _attr = {};
                                    _attr.graphType = drawtype;
                                    _attr.chartInfo = chartAttr;
                                    _attr.requestInfo = reqInfo;
                                    _attr.interval = interval;

                                    var _item = Ext.create(_widgettype, _attr);

                                    return _item;
                                };

                                var packet_widget = makeWidget(tplList.drawType, '패킷 분포도', tplList.chartAttr, tplList.requestInfo, tplList.interval);

                                me.add(packet_widget);
                            },
                            height: 300,
                            hidden: true,
                            id: 'pnl_packetCanvas',
                            margin: 10,
                            maxHeight: 300,
                            minHeight: 300,
                            layout: 'fit',
                            listeners: {
                                hide: 'onPnl_interfaceCanvasHide'
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'grid_log',
                            hidden: true,
                            id: 'grid_statistics_packet',
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
                                        var percent_data = 0;

                                        if(record.data.ps_total > 0)
                                        {
                                            percent_data = (value/record.data.ps_total)*100;
                                        }

                                        return addComma(value) + ' (' + parseFloat(percent_data).toFixed(2) + '%)';
                                    },
                                    align: 'right',
                                    dataIndex: 'ps64',
                                    text: '64 byte',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var percent_data = 0;

                                        if(record.data.ps_total > 0)
                                        {
                                            percent_data = (value/record.data.ps_total)*100;
                                        }

                                        return addComma(value) + ' (' + parseFloat(percent_data).toFixed(2) + '%)';
                                    },
                                    align: 'right',
                                    dataIndex: 'ps128',
                                    text: '128 byte',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var percent_data = 0;

                                        if(record.data.ps_total > 0)
                                        {
                                            percent_data = (value/record.data.ps_total)*100;
                                        }

                                        return addComma(value) + ' (' + parseFloat(percent_data).toFixed(2) + '%)';
                                    },
                                    align: 'right',
                                    dataIndex: 'ps256',
                                    text: '256 byte',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var percent_data = 0;

                                        if(record.data.ps_total > 0)
                                        {
                                            percent_data = (value/record.data.ps_total)*100;
                                        }

                                        return addComma(value) + ' (' + parseFloat(percent_data).toFixed(2) + '%)';
                                    },
                                    align: 'right',
                                    dataIndex: 'ps512',
                                    text: '512 byte',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var percent_data = 0;

                                        if(record.data.ps_total > 0)
                                        {
                                            percent_data = (value/record.data.ps_total)*100;
                                        }

                                        return addComma(value) + ' (' + parseFloat(percent_data).toFixed(2) + '%)';
                                    },
                                    align: 'right',
                                    dataIndex: 'ps1024',
                                    text: '1024 byte',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var percent_data = 0;

                                        if(record.data.ps_total > 0)
                                        {
                                            percent_data = (value/record.data.ps_total)*100;
                                        }

                                        return addComma(value) + ' (' + parseFloat(percent_data).toFixed(2) + '%)';
                                    },
                                    align: 'right',
                                    dataIndex: 'ps1500',
                                    text: '1500 byte',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value);
                                    },
                                    align: 'right',
                                    dataIndex: 'ps_total',
                                    text: 'Total',
                                    flex: 1
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
                                cellclick: 'onGrid_statistics_packetCellClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        resize: 'onNFW2_log_statistics_packetResize'
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

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var _params = {
            start_ts: Ext.encode(Ext.Date.format(Ext.getCmp('search_start').getValue(), 'Ymd')),
            end_ts: Ext.encode(Ext.Date.format(Ext.getCmp('search_end').getValue(), 'Ymd'))
        };

        var record_packet = [];

        var t_record = Ext.create('Ext.data.Store',{
            data: [],
            fields: ['time','ps64','ps128','ps256','ps512','ps1024','ps1500','ps_total']
        });

        Ext.getCmp("grid_statistics_packet").bindStore(t_record);

        Ext.getCmp('grid_statistics_packet').hide();

        Ext.getCmp('pnl_packetCanvas').hide();

        showLoadMask();

        request_helper.xmlrpc_call_JsonP(
            'FtDBMgr',
            'getPacketStat',
            _params,
            function(response){

                hideLoadMask();

                if((!response.log_dt_list && !response.log_hh_list && !response.log_hhm_list) ||
                   (response.log_dt_list.length < 1 && response.log_hh_list.length < 1 && response.log_hhm_list.length < 1))
                {
                    Ext.MessageBox.alert(__weguardia,get_msg('err_statistics'));
                    return false;
                }

                me.searchObj = response;

                var a,i,j;

                if(response.log_dt_list.length > 1)
                {
                    for(a in response.log_dt_list){

                        record_packet.push({

                            time : response.log_dt_list[a][0],
                            ps64 : parseInt(response.log_dt_list[a][1]),
                            ps128 : parseInt(response.log_dt_list[a][2]),
                            ps256 :parseInt(response.log_dt_list[a][3]),
                            ps512 : parseInt(response.log_dt_list[a][4]),
                            ps1024 : parseInt(response.log_dt_list[a][5]),
                            ps1500 : parseInt(response.log_dt_list[a][6]),
                            ps_total : parseInt(response.log_dt_list[a][1]) + parseInt(response.log_dt_list[a][2]) + parseInt(response.log_dt_list[a][3]) +
                            parseInt(response.log_dt_list[a][4]) + parseInt(response.log_dt_list[a][5]) + parseInt(response.log_dt_list[a][6]),
                            hidden : false,
                            subhidden : true
                        });

                        for(i in response.log_hh_list){

                            if(response.log_hh_list[i][0] === response.log_dt_list[a][0])
                            {
                                record_packet.push({

                                    time : response.log_hh_list[i][1],
                                    ps64 : parseInt(response.log_hh_list[i][2]),
                                    ps128 : parseInt(response.log_hh_list[i][3]),
                                    ps256 :parseInt(response.log_hh_list[i][4]),
                                    ps512 : parseInt(response.log_hh_list[i][5]),
                                    ps1024 : parseInt(response.log_hh_list[i][6]),
                                    ps1500 : parseInt(response.log_hh_list[i][7]),
                                    ps_total : parseInt(response.log_hh_list[i][2]) + parseInt(response.log_hh_list[i][3]) + parseInt(response.log_hh_list[i][4]) +
                                    parseInt(response.log_hh_list[i][5]) + parseInt(response.log_hh_list[i][6]) + parseInt(response.log_hh_list[i][7]),
                                    hidden : true,
                                    subhidden : true,
                                    year : response.log_hh_list[i][0]
                                });

                                for(j in response.log_hhm_list){

                                    if(response.log_hhm_list[j][0] === response.log_hh_list[i][0] &&
                                       response.log_hhm_list[j][1] === response.log_hh_list[i][1])
                                    {
                                        record_packet.push({

                                            time : response.log_hhm_list[j][2],
                                            ps64 : parseInt(response.log_hhm_list[j][3]),
                                            ps128 : parseInt(response.log_hhm_list[j][4]),
                                            ps256 :parseInt(response.log_hhm_list[j][5]),
                                            ps512 : parseInt(response.log_hhm_list[j][6]),
                                            ps1024 : parseInt(response.log_hhm_list[j][7]),
                                            ps1500 : parseInt(response.log_hhm_list[j][8]),
                                            ps_total : parseInt(response.log_hhm_list[j][3]) + parseInt(response.log_hhm_list[j][4]) + parseInt(response.log_hhm_list[j][5]) +
                                            parseInt(response.log_hhm_list[j][6]) + parseInt(response.log_hhm_list[j][7]) + parseInt(response.log_hhm_list[j][8]),
                                            hidden : true,
                                            year : response.log_hhm_list[j][0],
                                            hour : response.log_hhm_list[j][1]
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
                else
                {
                    for(i in response.log_hh_list){

                        record_packet.push({

                            time : response.log_hh_list[i][1],
                            ps64 : parseInt(response.log_hh_list[i][2]),
                            ps128 : parseInt(response.log_hh_list[i][3]),
                            ps256 :parseInt(response.log_hh_list[i][4]),
                            ps512 : parseInt(response.log_hh_list[i][5]),
                            ps1024 : parseInt(response.log_hh_list[i][6]),
                            ps1500 : parseInt(response.log_hh_list[i][7]),
                            ps_total : parseInt(response.log_hh_list[i][2]) + parseInt(response.log_hh_list[i][3]) + parseInt(response.log_hh_list[i][4]) +
                            parseInt(response.log_hh_list[i][5]) + parseInt(response.log_hh_list[i][6]) + parseInt(response.log_hh_list[i][7]),
                            hidden : false,
                            subhidden : true
                        });

                        for(j in response.log_hhm_list){

                            if(response.log_hhm_list[j][1] === response.log_hh_list[i][1])
                            {
                                record_packet.push({

                                    time : response.log_hhm_list[j][2],
                                    ps64 : parseInt(response.log_hhm_list[j][3]),
                                    ps128 : parseInt(response.log_hhm_list[j][4]),
                                    ps256 :parseInt(response.log_hhm_list[j][5]),
                                    ps512 : parseInt(response.log_hhm_list[j][6]),
                                    ps1024 : parseInt(response.log_hhm_list[j][7]),
                                    ps1500 : parseInt(response.log_hhm_list[j][8]),
                                    ps_total : parseInt(response.log_hhm_list[j][3]) + parseInt(response.log_hhm_list[j][4]) + parseInt(response.log_hhm_list[j][5]) +
                                    parseInt(response.log_hhm_list[j][6]) + parseInt(response.log_hhm_list[j][7]) + parseInt(response.log_hhm_list[j][8]),
                                    hidden : true,
                                    hour : response.log_hhm_list[j][1]
                                });
                            }
                        }
                    }
                }

                var store_packet = Ext.getCmp('grid_statistics_packet').getStore();

                store_packet.loadData(record_packet);
                setTimeout(function(){ me.setWidth('100%'); },100);

                store_packet.clearFilter(true);

                store_packet.filterBy(function(record){

                    if(record.data.hidden)
                        return false;
                    else
                        return true;
                });

                Ext.getCmp('grid_statistics_packet').show();

                //Ext.getCmp('pnl_packetCanvas').show();

                Ext.getCmp("c_packet").makeChart();
                //Ext.getCmp('pnl_packetCanvas').makeChart();
            }
        );
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        me.myChart = echarts.init(document.getElementById('chart_packet'),'macarons');

        var date = new Date();

        Ext.getCmp("search_start").setValue(date);
        Ext.getCmp("search_end").setValue(date);

        hideLoadMask();
    },

    onPnl_interfaceCanvasHide: function(component, eOpts) {
        if(component.items.items[0] !== undefined){

            component.removeAll();
        }
    },

    onGrid_statistics_packetCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0 && !record.data.hour){
            if(record.data.subhidden)
                record.data.subhidden = false;
            else
                record.data.subhidden = true;

            var store_statistics_packet = Ext.getCmp('grid_statistics_packet').getStore();


            store_statistics_packet.clearFilter(true);

            store_statistics_packet.each(function(st_record){

                if(st_record.data.year){
                    if(record.data.subhidden){
                        if(record.data.year){
                            if(record.data.year === st_record.data.year &&
                               record.data.time === st_record.data.hour){
                                st_record.data.hidden = true;
                            }
                        }else{
                            if(record.data.time === st_record.data.year){
                                st_record.data.hidden = true;
                            }
                        }
                    }else{
                        if(record.data.year){
                            if(record.data.year === st_record.data.year &&
                               record.data.time === st_record.data.hour){
                                st_record.data.hidden = false;
                            }
                        }else{
                            if(record.data.time === st_record.data.year){
                                if(st_record.data.hour)
                                    st_record.data.hidden = true;
                                else
                                    st_record.data.hidden = false;
                            }
                        }
                    }
                }else{
                    if(record.data.subhidden){
                        if(record.data.time === st_record.data.hour){
                            st_record.data.hidden = true;
                        }
                    }else{
                        if(record.data.time === st_record.data.hour){
                            st_record.data.hidden = false;
                        }
                    }
                }
            });

            store_statistics_packet.filterBy(function(st_record){

                if(st_record.data.hidden)
                    return false;
                else
                    return true;
            });
        }

    },

    onNFW2_log_statistics_packetResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        var me = this;

        var _wid = Ext.getCmp("c_packet").getWidth();

        var option = {
            grid : {
                width : _wid-150
            }
        };

        document.getElementById('chart_packet').style.width = _wid+"px";
        me.myChart.setOption(option);
        me.myChart.resize();
    }

});