
Ext.define('NFW2.view.NFW2_log_statistics_log', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_log_statistics_log',

    requires: [
        'NFW2.view.NFW2_log_statistics_logViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.form.field.Date',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'nfw2_log_statistics_log'
    },
    cls: 'zen_body',
    id: 'NFW2_log_statistics_log',
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
                                            enableToggle: true,
                                            toggleGroup: 'date_toggle',
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
                                            enableToggle: true,
                                            toggleGroup: 'date_toggle',
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
                                            enableToggle: true,
                                            toggleGroup: 'date_toggle',
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
                                            enableToggle: true,
                                            toggleGroup: 'date_toggle',
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
                                            enableToggle: true,
                                            toggleGroup: 'date_toggle',
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
                                            enableToggle: true,
                                            toggleGroup: 'date_toggle',
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
                                            enableToggle: true,
                                            toggleGroup: 'date_toggle',
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
                                            enableToggle: true,
                                            toggleGroup: 'date_toggle',
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
            scrollable: true,
            layout: 'fit',
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'container',
                            makeChart: function(log_array) {
                                var me = Ext.getCmp("NFW2_log_statistics_log");
                                var _me = this;

                                if(me.myChart !== undefined){
                                    me.myChart.clear();
                                }

                                if(_me.items.items[0] !== undefined){

                                    _me.removeAll();
                                }

                                var _keys = [];
                                var list = {};
                                list['system'] = __zen('system');
                                list['network'] = __zen('network');
                                list['ips'] = __zen('ips');
                                list['as'] = __zen('as');
                                list['ipsec'] = __zen('ipsec_vpn');
                                list['ssl'] = __zen('ssl_vpn');
                                list['av'] = __zen('av');
                                list['fw'] = __zen('fw');
                                list['ddos'] = __zen('ddos');
                                list['total'] = __zen('total');

                                var _series = [];

                                for(var i=0; i<log_array.length; i++){
                                    if(log_array[i]==='time' || log_array[i]==='tracker'){ continue; }
                                    _series.push({
                                        _name: log_array[i],
                                        name: list[log_array[i]],
                                        type: 'bar',
                                        data: []
                                    });
                                    _keys.push(list[log_array[i]]);
                                }

                                var time_ = [];
                                var time = [];
                                var system = [], network = [];

                                var color = [
                                '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                                '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                                '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                                '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                                ];

                                var response = Ext.getCmp('NFW2_log_statistics_log').searchObj;

                                if(response.dt_list.length > 1){
                                    for(i = 0 ; i < response.dt_list.length ; i++){
                                        _orig = response.dt_list[i];

                                        _label = _orig[0];

                                        total = 0;
                                        time[i] = _label;
                                        for(var l=0; l<_series.length; l++){
                                            if(_series[l]._name === 'system'){
                                                _series[l].data.push(parseInt(_orig[1]));
                                                total += parseInt(_orig[1]);
                                            }else if(_series[l]._name === 'network'){
                                                _series[l].data.push(parseInt(_orig[2]));
                                                total += parseInt(_orig[2]);
                                            }else if(_series[l]._name === 'ips'){
                                                _series[l].data.push(parseInt(_orig[6]));
                                                total += parseInt(_orig[6]);
                                            }else if(_series[l]._name === 'as'){
                                                _series[l].data.push(parseInt(_orig[10]));
                                                total += parseInt(_orig[10]);
                                            }else if(_series[l]._name === 'ipsec'){
                                                _series[l].data.push(parseInt(_orig[4]));
                                                total += parseInt(_orig[4]);
                                            }else if(_series[l]._name === 'ssl'){
                                                _series[l].data.push(parseInt(_orig[5]));
                                                total += parseInt(_orig[5]);
                                            }else if(_series[l]._name === 'av'){
                                                _series[l].data.push(parseInt(_orig[9]));
                                                total += parseInt(_orig[9]);
                                            }else if(_series[l]._name === 'fw'){
                                                _series[l].data.push(parseInt(_orig[3]));
                                                total += parseInt(_orig[3]);
                                            }else if(_series[l]._name === 'ddos'){
                                                _series[l].data.push(parseInt(_orig[7]));
                                                total += parseInt(_orig[7]);
                                            }else if(_series[l]._name === 'total'){
                                                _series[l].data.push(total);
                                            }
                                        }
                                    }
                                }else{
                                    for(i = 0; i < response.hh_list.length; i++){
                                        _orig = response.hh_list[i];

                                        if(parseInt(_orig[1]) + 1 < 10){
                                            _label = '~ 0' + (parseInt(_orig[1]) + 1) + ':00';
                                        }else{
                                            _label = '~ ' + (parseInt(_orig[1]) + 1) + ':00';
                                        }

                                        total = 0;
                                        time[i] = _label;
                                        for(var l=0; l<_series.length; l++){
                                            if(_series[l]._name === 'system'){
                                                _series[l].data.push(parseInt(_orig[2]));
                                                total += parseInt(_orig[2]);
                                            }else if(_series[l]._name === 'network'){
                                                _series[l].data.push(parseInt(_orig[3]));
                                                total += parseInt(_orig[3]);
                                            }else if(_series[l]._name === 'ips'){
                                                _series[l].data.push(parseInt(_orig[7]));
                                                total += parseInt(_orig[7]);
                                            }else if(_series[l]._name === 'as'){
                                                _series[l].data.push(parseInt(_orig[11]));
                                                total += parseInt(_orig[11]);
                                            }else if(_series[l]._name === 'ipsec'){
                                                _series[l].data.push(parseInt(_orig[5]));
                                                total += parseInt(_orig[5]);
                                            }else if(_series[l]._name === 'ssl'){
                                                _series[l].data.push(parseInt(_orig[6]));
                                                total += parseInt(_orig[6]);
                                            }else if(_series[l]._name === 'av'){
                                                _series[l].data.push(parseInt(_orig[10]));
                                                total += parseInt(_orig[10]);
                                            }else if(_series[l]._name === 'fw'){
                                                _series[l].data.push(parseInt(_orig[4]));
                                                total += parseInt(_orig[4]);
                                            }else if(_series[l]._name === 'ddos'){
                                                _series[l].data.push(parseInt(_orig[8]));
                                                total += parseInt(_orig[8]);
                                            }else if(_series[l]._name === 'total'){
                                                _series[l].data.push(total);
                                            }
                                        }
                                    }
                                }

                                for(var i in time){
                                    time_.push(i);
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
                            html: '<div id="chart_log" style="height:300px;width:300px"></div>',
                            id: 'c_log'
                        },
                        {
                            xtype: 'panel',
                            makeChart: function(log_array) {
                                var me = this;

                                if(me.items.items[0] !== undefined){

                                    me.removeAll();
                                }

                                var _tplList_data = [];

                                var _data;

                                var i,j;

                                var total = 0;

                                var toolTipContent = '<font color={color}>{name}</font> : {y}';

                                var colorSet = ["#369EAD", "#C24642", "#7F6084", "#86B402", "#A2D1CF", "#C8B631", "#6DBCEB", "#52514E", "#4F81BC", "#A064A1",
                                    "#F79647","#4F81BC", "#C0504E", "#9BBB58", "#23BFAA", "#8064A1", "#4AACC5", "#F79647", "#33558B","#8CA1BC",
                                    "#36845C", "#017E82", "#8CB9D0", "#708C98", "#94838D", "#F08891", "#0366A7", "#008276", "#EE7757", "#E5BA3A",
                                    "#F2990B", "#03557B", "#782970"];

                                var maked_chart = false;

                                _tplList_data.push({
                                    color: colorSet[0],
                                    type : 'line',
                                    showInLegend: true,
                                    name: '시스템',
                                    legendText: '시스템',
                                    markerType: "none",
                                    toolTipContent: '{label}<br><font color={color}>{name}</font> : {y}'
                                });

                                _tplList_data.push({
                                    color: colorSet[1],
                                    type : 'line',
                                    showInLegend: true,
                                    name: '네트워크',
                                    legendText: '네트워크',
                                    markerType: "none",
                                    toolTipContent: toolTipContent
                                });

                                Ext.each(log_array, function(data, idx){

                                    switch(data)
                                    {
                                        case 'ips':
                                        _tplList_data.push({
                                            color: colorSet[idx+2],
                                            type : 'line',
                                            showInLegend: true,
                                            name: 'IPS',
                                            legendText: 'IPS',
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        });
                                        break;
                                        case 'as':
                                        _tplList_data.push({
                                            color: colorSet[idx+2],
                                            type : 'line',
                                            showInLegend: true,
                                            name: '안티스팸',
                                            legendText: '안티스팸',
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        });
                                        break;
                                        case 'vpn':
                                        _tplList_data.push({
                                            color: colorSet[idx+2],
                                            type : 'line',
                                            showInLegend: true,
                                            name: 'VPN',
                                            legendText: 'VPN',
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        });
                                        break;
                                        case 'ssl':
                                        _tplList_data.push({
                                            color: colorSet[idx+2],
                                            type : 'line',
                                            showInLegend: true,
                                            name: 'SSL VPN',
                                            legendText: 'SSL VPN',
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        });
                                        break;
                                        case 'av':
                                        _tplList_data.push({
                                            color: colorSet[idx+2],
                                            type : 'line',
                                            showInLegend: true,
                                            name: '안티바이러스',
                                            legendText: '안티바이러스',
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        });
                                        break;
                                        case 'waf':
                                        _tplList_data.push({
                                            color: colorSet[idx+2],
                                            type : 'line',
                                            showInLegend: true,
                                            name: 'WAF',
                                            legendText: 'WAF',
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        });
                                        break;
                                        case 'fw':
                                        _tplList_data.push({
                                            color: colorSet[idx+2],
                                            type : 'line',
                                            showInLegend: true,
                                            name: '방화벽',
                                            legendText: '방화벽',
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        });
                                        break;
                                        case 'ddos':
                                        _tplList_data.push({
                                            color: colorSet[idx+2],
                                            type : 'line',
                                            showInLegend: true,
                                            name: 'DDoS',
                                            legendText: 'DDoS',
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        });
                                        break;
                                        case 'total':
                                        _tplList_data.push({
                                            color: colorSet[idx+2],
                                            type : 'line',
                                            showInLegend: true,
                                            name: 'Total',
                                            legendText: 'Total',
                                            markerType: "none",
                                            toolTipContent: toolTipContent
                                        });
                                        break;
                                    }
                                });

                                _data = [_tplList_data.length];

                                for(i=0; i<_tplList_data.length; i++)
                                {
                                    _data[i] = [];
                                }

                                var _TplList = {
                                    graphType : 'Extjs4Canvas',
                                    widgetTitle : '',
                                    drawType : 'line',
                                    bevelEnabled: true,
                                    chartAttr : {
                                        axisY : {
                                            labelFontSize : 12,
                                            titleFontSize : 12,
                                            minimum: 0,
                                            title : '로그 개수',
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
                                                        e.dataSeries.toolTipContent = '{label}<br><font color={color}>{name}</font> : {y}';
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

                                            var response = Ext.getCmp('NFW2_log_statistics_log').searchObj;

                                            var _dataPoints = [];

                                            if(response.dt_list.length > 1)
                                            {
                                                for(i = 0 ; i < response.dt_list.length ; i++)
                                                {
                                                    _orig = response.dt_list[i];

                                                    _label = _orig[0];

                                                    total = 0;

                                                    for(j = 0 ; j < _tplList_data.length ; j++)
                                                    {
                                                        switch(_tplList_data[j].name)
                                                        {
                                                            case '시스템':
                                                            _data[j].push({x : i, y : parseInt(_orig[1]), label : _label, name : '시스템', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[1]);
                                                            break;
                                                            case '네트워크':
                                                            _data[j].push({x : i, y : parseInt(_orig[2]), label : _label, name : '네트워크', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[2]);
                                                            break;
                                                            case 'IPS':
                                                            _data[j].push({x : i, y : parseInt(_orig[6]), label : _label, name : 'IPS', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[6]);
                                                            break;
                                                            case '안티스팸':
                                                            _data[j].push({x : i, y : parseInt(_orig[10]), label : _label, name : '안티스팸', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[10]);
                                                            break;
                                                            case 'VPN':
                                                            _data[j].push({x : i, y : parseInt(_orig[4]), label : _label, name : 'VPN', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[4]);
                                                            break;
                                                            case 'SSL VPN':
                                                            _data[j].push({x : i, y : parseInt(_orig[5]), label : _label, name : 'SSL VPN', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[5]);
                                                            break;
                                                            case '안티바이러스':
                                                            _data[j].push({x : i, y : parseInt(_orig[9]), label : _label, name : '안티바이러스', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[9]);
                                                            break;
                                                            case 'WAF':
                                                            _data[j].push({x : i, y : parseInt(_orig[8]), label : _label, name : 'WAF', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[8]);
                                                            break;
                                                            case '방화벽':
                                                            _data[j].push({x : i, y : parseInt(_orig[3]), label : _label, name : '방화벽', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[3]);
                                                            break;
                                                            case 'DDoS':
                                                            _data[j].push({x : i, y : parseInt(_orig[7]), label : _label, name : 'DDoS', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[7]);
                                                            break;
                                                            case 'Total':
                                                            _data[j].push({x : i, y : total, label : _label, name : 'Total', color : _tplList_data[j].color});
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                for(i = 0; i < response.hh_list.length; i++)
                                                {
                                                    _orig = response.hh_list[i];

                                                    if(parseInt(_orig[1]) + 1 < 10)
                                                    {
                                                        _label = '~ 0' + (parseInt(_orig[1]) + 1) + ':00';
                                                    }
                                                    else
                                                    {
                                                        _label = '~ ' + (parseInt(_orig[1]) + 1) + ':00';
                                                    }

                                                    total = 0;

                                                    for(j = 0 ; j < _tplList_data.length ; j++)
                                                    {
                                                        switch(_tplList_data[j].name)
                                                        {
                                                            case '시스템':
                                                            _data[j].push({x : i, y : parseInt(_orig[2]), label : _label, name : '시스템', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[2]);
                                                            break;
                                                            case '네트워크':
                                                            _data[j].push({x : i, y : parseInt(_orig[3]), label : _label, name : '네트워크', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[3]);
                                                            break;
                                                            case 'IPS':
                                                            _data[j].push({x : i, y : parseInt(_orig[7]), label : _label, name : 'IPS', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[7]);
                                                            break;
                                                            case '안티스팸':
                                                            _data[j].push({x : i, y : parseInt(_orig[11]), label : _label, name : '안티스팸', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[11]);
                                                            break;
                                                            case 'VPN':
                                                            _data[j].push({x : i, y : parseInt(_orig[5]), label : _label, name : 'VPN', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[5]);
                                                            break;
                                                            case 'SSL VPN':
                                                            _data[j].push({x : i, y : parseInt(_orig[6]), label : _label, name : 'SSL VPN', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[6]);
                                                            break;
                                                            case '안티바이러스':
                                                            _data[j].push({x : i, y : parseInt(_orig[10]), label : _label, name : '안티바이러스', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[10]);
                                                            break;
                                                            case 'WAF':
                                                            _data[j].push({x : i, y : parseInt(_orig[9]), label : _label, name : 'WAF', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[9]);
                                                            break;
                                                            case '방화벽':
                                                            _data[j].push({x : i, y : parseInt(_orig[4]), label : _label, name : '방화벽', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[4]);
                                                            break;
                                                            case 'DDoS':
                                                            _data[j].push({x : i, y : parseInt(_orig[8]), label : _label, name : 'DDoS', color : _tplList_data[j].color});
                                                            total += parseInt(_orig[8]);
                                                            break;
                                                            case 'Total':
                                                            _data[j].push({x : i, y : total, label : _label, name : 'Total', color : _tplList_data[j].color});
                                                            break;
                                                        }
                                                    }
                                                }
                                            }

                                            for(i = 0 ; i < _tplList_data.length ; i++){

                                                _dataPoints.push(_data[i]);
                                            }

                                            obj.setData(obj, _dataPoints);
                                        }
                                    }
                                };

                                var MakeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

                                    var _widgettype = 'Extjs4Canvas';
                                    var _attr = {};
                                    _attr.graphType = drawtype;
                                    _attr.chartInfo = chartAttr;
                                    _attr.requestInfo = reqInfo;
                                    _attr.interval = interval;

                                    var _item = Ext.create(_widgettype, _attr);

                                    return _item;
                                };


                                var _Widget = MakeWidget(_TplList.drawType, '로그', _TplList.chartAttr, _TplList.requestInfo, _TplList.interval);

                                me.add(_Widget);
                            },
                            height: 300,
                            hidden: true,
                            id: 'pnl_logCanvas',
                            maxHeight: 300,
                            minHeight: 300,
                            layout: 'fit',
                            listeners: {
                                hide: 'onPnl_logCanvasHide'
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'grid_log',
                            hidden: true,
                            id: 'grid_usage_log',
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
                                        return addComma(value);
                                    },
                                    align: 'right',
                                    dataIndex: 'system',
                                    flex: 1,
                                    bind: {
                                        text: '{system}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value);
                                    },
                                    align: 'right',
                                    dataIndex: 'network',
                                    flex: 1,
                                    bind: {
                                        text: '{network}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value);
                                    },
                                    align: 'right',
                                    dataIndex: 'fw',
                                    flex: 1,
                                    bind: {
                                        text: '{fw}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value);
                                    },
                                    align: 'right',
                                    dataIndex: 'vpn',
                                    flex: 1,
                                    bind: {
                                        text: '{ipsec_vpn}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value);
                                    },
                                    align: 'right',
                                    dataIndex: 'ssl',
                                    flex: 1,
                                    bind: {
                                        text: '{ssl_vpn}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value);
                                    },
                                    align: 'right',
                                    dataIndex: 'ips',
                                    flex: 1,
                                    bind: {
                                        text: '{ips}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value);
                                    },
                                    align: 'right',
                                    dataIndex: 'ddos',
                                    flex: 1,
                                    bind: {
                                        text: '{ddos}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value);
                                    },
                                    align: 'right',
                                    dataIndex: 'av',
                                    flex: 1,
                                    bind: {
                                        text: '{av}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value);
                                    },
                                    align: 'right',
                                    dataIndex: 'as',
                                    flex: 1,
                                    bind: {
                                        text: '{as}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value);
                                    },
                                    align: 'right',
                                    dataIndex: 'total',
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
                                cellclick: 'onGrid_usage_interfaceCellClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        resize: 'onNFW2_log_statistics_logResize'
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
        var me = Ext.getCmp('NFW2_log_statistics_log');

        Ext.getCmp('pnl_logCanvas').hide();

        Ext.getCmp('grid_usage_log').hide();

        var l_record = Ext.create('Ext.data.Store',{
            data: [],
            fields: ['time','system','network','fw','vpn','ssl','ips','ddos','waf','av','as','system_usage','packet_dist','total']
        });

        Ext.getCmp("grid_usage_log").bindStore(l_record);

        showLoadMask();

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_license_info',
            {},
            function(license_info){

                if(license_info.flag !== "1" && license_info.flag !== "4")
                {
                    hideLoadMask();
                    Ext.MessageBox.alert(__weguardia,get_msg('err_license'));
                    return false;
                }

                var a,i,j,k;

                var log_array = ['time', 'system', 'network'];

                var total = 0;

                for(i in license_info.system_module)
                {
                    if(license_info.system_module[i] === "on")
                    {
                        if(parseInt(unixTimeConvert(license_info.period[i][0] < unixTimeConvert(license_info.period[i][1]))))
                        {
                            log_array.push(i);
                        }
                    }
                }

                log_array.push('total');

                var record_log = [];

                var _params = {
                    start_ts: Ext.encode(Ext.Date.format(Ext.getCmp('search_start').getValue(), 'Ymd')),
                    end_ts: Ext.encode(Ext.Date.format(Ext.getCmp('search_end').getValue(), 'Ymd'))
                };

                request_helper.xmlrpc_call_JsonP(
                    'FtDBMgr',
                    'getLogTotal',
                    _params,
                    function(response){

                        hideLoadMask();

                        if((!response.dt_list && !response.hh_list && !response.hhm_list) ||
                           (response.dt_list.length < 1 && response.hh_list.length < 1 && response.hhm_list.length < 1))
                        {
                            Ext.MessageBox.alert(__weguardia,get_msg('err_statistics'));
                            return false;
                        }

                        me.searchObj = response;

                        if(response.dt_list.length > 1)
                        {
                            for(a in response.dt_list){

                                total = parseInt(response.dt_list[a][1]) + parseInt(response.dt_list[a][2]);

                                for(i in log_array)
                                {
                                    switch(log_array[i])
                                    {
                                        case 'ips':
                                            total += parseInt(response.dt_list[a][6]);
                                            break;
                                        case 'as':
                                            total += parseInt(response.dt_list[a][10]);
                                            break;
                                        case 'vpn':
                                            total += parseInt(response.dt_list[a][4]);
                                            break;
                                        case 'ssl':
                                            total += parseInt(response.dt_list[a][5]);
                                            break;
                                        case 'av':
                                            total += parseInt(response.dt_list[a][9]);
                                            break;
                                        case 'waf':
                                            total += parseInt(response.dt_list[a][8]);
                                            break;
                                        case 'fw':
                                            total += parseInt(response.dt_list[a][3]);
                                            break;
                                        case 'ddos':
                                            total += parseInt(response.dt_list[a][7]);
                                            break;
                                    }
                                }

                                record_log.push({

                                    time : response.dt_list[a][0],
                                    system : parseInt(response.dt_list[a][1]),
                                    network : parseInt(response.dt_list[a][2]),
                                    fw :parseInt(response.dt_list[a][3]),
                                    vpn : parseInt(response.dt_list[a][4]),
                                    ssl : parseInt(response.dt_list[a][5]),
                                    ips : parseInt(response.dt_list[a][6]),
                                    ddos : parseInt(response.dt_list[a][7]),
                                    waf : parseInt(response.dt_list[a][8]),
                                    av : parseInt(response.dt_list[a][9]),
                                    as : parseInt(response.dt_list[a][10]),
                                    total : total,
                                    hidden : false,
                                    subhidden : true
                                });

                                for(i in response.hh_list){

                                    if(response.hh_list[i][0] === response.dt_list[a][0])
                                    {
                                        total = parseInt(response.hh_list[i][2]) + parseInt(response.hh_list[i][3]);

                                        for(j in log_array)
                                        {
                                            switch(log_array[j])
                                            {
                                                case 'ips':
                                                    total += parseInt(response.hh_list[i][7]);
                                                    break;
                                                case 'as':
                                                    total += parseInt(response.hh_list[i][11]);
                                                    break;
                                                case 'vpn':
                                                    total += parseInt(response.hh_list[i][5]);
                                                    break;
                                                case 'ssl':
                                                    total += parseInt(response.hh_list[i][6]);
                                                    break;
                                                case 'av':
                                                    total += parseInt(response.hh_list[i][10]);
                                                    break;
                                                case 'waf':
                                                    total += parseInt(response.hh_list[i][9]);
                                                    break;
                                                case 'fw':
                                                    total += parseInt(response.hh_list[i][4]);
                                                    break;
                                                case 'ddos':
                                                    total += parseInt(response.hh_list[i][8]);
                                                    break;
                                            }
                                        }

                                        record_log.push({

                                            time : response.hh_list[i][1],
                                            system : parseInt(response.hh_list[i][2]),
                                            network : parseInt(response.hh_list[i][3]),
                                            fw :parseInt(response.hh_list[i][4]),
                                            vpn : parseInt(response.hh_list[i][5]),
                                            ssl : parseInt(response.hh_list[i][6]),
                                            ips : parseInt(response.hh_list[i][7]),
                                            ddos : parseInt(response.hh_list[i][8]),
                                            waf : parseInt(response.hh_list[i][9]),
                                            av : parseInt(response.hh_list[i][10]),
                                            as : parseInt(response.hh_list[i][11]),
                                            total : total,
                                            hidden : true,
                                            subhidden : true,
                                            year : response.hh_list[i][0]
                                        });

                                        for(j in response.hhm_list){

                                            if(response.hhm_list[j][0] === response.hh_list[i][0] &&
                                               response.hhm_list[j][1] === response.hh_list[i][1])
                                            {
                                                total = parseInt(response.hhm_list[j][3]) + parseInt(response.hhm_list[j][4]);

                                                for(k in log_array)
                                                {
                                                    switch(log_array[k])
                                                    {
                                                        case 'ips':
                                                            total += parseInt(response.hhm_list[j][8]);
                                                            break;
                                                        case 'as':
                                                            total += parseInt(response.hhm_list[j][12]);
                                                            break;
                                                        case 'vpn':
                                                            total += parseInt(response.hhm_list[j][6]);
                                                            break;
                                                        case 'ssl':
                                                            total += parseInt(response.hhm_list[j][7]);
                                                            break;
                                                        case 'av':
                                                            total += parseInt(response.hhm_list[j][11]);
                                                            break;
                                                        case 'waf':
                                                            total += parseInt(response.hhm_list[j][10]);
                                                            break;
                                                        case 'fw':
                                                            total += parseInt(response.hhm_list[j][5]);
                                                            break;
                                                        case 'ddos':
                                                            total += parseInt(response.hhm_list[j][9]);
                                                            break;
                                                    }
                                                }

                                                record_log.push({

                                                    time : response.hhm_list[j][2],
                                                    system : parseInt(response.hhm_list[j][3]),
                                                    network : parseInt(response.hhm_list[j][4]),
                                                    fw :parseInt(response.hhm_list[j][5]),
                                                    vpn : parseInt(response.hhm_list[j][6]),
                                                    ssl : parseInt(response.hhm_list[j][7]),
                                                    ips : parseInt(response.hhm_list[j][8]),
                                                    ddos : parseInt(response.hhm_list[j][9]),
                                                    waf : parseInt(response.hhm_list[j][10]),
                                                    av : parseInt(response.hhm_list[j][11]),
                                                    as : parseInt(response.hhm_list[j][12]),
                                                    total : total,
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
                        else
                        {
                            for(i in response.hh_list){

                                total = parseInt(response.hh_list[i][2]) + parseInt(response.hh_list[i][3]);

                                for(j in log_array)
                                {
                                    switch(log_array[j])
                                    {
                                        case 'ips':
                                            total += parseInt(response.hh_list[i][7]);
                                            break;
                                        case 'as':
                                            total += parseInt(response.hh_list[i][11]);
                                            break;
                                        case 'vpn':
                                            total += parseInt(response.hh_list[i][5]);
                                            break;
                                        case 'ssl':
                                            total += parseInt(response.hh_list[i][6]);
                                            break;
                                        case 'av':
                                            total += parseInt(response.hh_list[i][10]);
                                            break;
                                        case 'waf':
                                            total += parseInt(response.hh_list[i][9]);
                                            break;
                                        case 'fw':
                                            total += parseInt(response.hh_list[i][4]);
                                            break;
                                        case 'ddos':
                                            total += parseInt(response.hh_list[i][8]);
                                            break;
                                    }
                                }

                                record_log.push({

                                    time : response.hh_list[i][1],
                                    system : parseInt(response.hh_list[i][2]),
                                    network : parseInt(response.hh_list[i][3]),
                                    fw :parseInt(response.hh_list[i][4]),
                                    vpn : parseInt(response.hh_list[i][5]),
                                    ssl : parseInt(response.hh_list[i][6]),
                                    ips : parseInt(response.hh_list[i][7]),
                                    ddos : parseInt(response.hh_list[i][8]),
                                    waf : parseInt(response.hh_list[i][9]),
                                    av : parseInt(response.hh_list[i][10]),
                                    as : parseInt(response.hh_list[i][11]),
                                    total : total,
                                    hidden : false,
                                    subhidden : true
                                });

                                for(j in response.hhm_list){

                                    if(response.hhm_list[j][1] === response.hh_list[i][1])
                                    {
                                        total = parseInt(response.hhm_list[j][3]) + parseInt(response.hhm_list[j][4]);

                                        for(k in log_array)
                                        {
                                            switch(log_array[k])
                                            {
                                                case 'ips':
                                                    total += parseInt(response.hhm_list[j][8]);
                                                    break;
                                                case 'as':
                                                    total += parseInt(response.hhm_list[j][12]);
                                                    break;
                                                case 'vpn':
                                                    total += parseInt(response.hhm_list[j][6]);
                                                    break;
                                                case 'ssl':
                                                    total += parseInt(response.hhm_list[j][7]);
                                                    break;
                                                case 'av':
                                                    total += parseInt(response.hhm_list[j][11]);
                                                    break;
                                                case 'waf':
                                                    total += parseInt(response.hhm_list[j][10]);
                                                    break;
                                                case 'fw':
                                                    total += parseInt(response.hhm_list[j][5]);
                                                    break;
                                                case 'ddos':
                                                    total += parseInt(response.hhm_list[j][9]);
                                                    break;
                                            }
                                        }

                                        record_log.push({

                                            time : response.hhm_list[j][2],
                                            system : parseInt(response.hhm_list[j][3]),
                                            network : parseInt(response.hhm_list[j][4]),
                                            fw :parseInt(response.hhm_list[j][5]),
                                            vpn : parseInt(response.hhm_list[j][6]),
                                            ssl : parseInt(response.hhm_list[j][7]),
                                            ips : parseInt(response.hhm_list[j][8]),
                                            ddos : parseInt(response.hhm_list[j][9]),
                                            waf : parseInt(response.hhm_list[j][10]),
                                            av : parseInt(response.hhm_list[j][11]),
                                            as : parseInt(response.hhm_list[j][12]),
                                            total : total,
                                            hidden : true,
                                            hour : response.hhm_list[j][1]
                                        });
                                    }
                                }
                            }
                        }

                        var store_log = Ext.getCmp("grid_usage_log").getStore();

                        store_log.loadData(record_log);
                        setTimeout(function(){ me.setWidth('100%'); },100);

                        store_log.clearFilter(true);

                        store_log.filterBy(function(record){

                            if(record.data.hidden)
                                return false;
                            else
                                return true;
                        });

                        Ext.each(Ext.getCmp('grid_usage_log').columnManager.headerCt.items.items, function(column){

                            var _index = (column.dataIndex==='vpn')?'ipsec':column.dataIndex;
                            if(log_array.indexOf(_index) < 0)
                            {
                                column.setVisible(false);
                            }
                        });

                        Ext.getCmp('grid_usage_log').show();
                        Ext.getCmp("c_log").makeChart(log_array);
                        //Ext.getCmp('pnl_logCanvas').show();

                        //Ext.getCmp('pnl_logCanvas').makeChart(log_array);
                    }
                );
            }
        );
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        me.myChart = echarts.init(document.getElementById('chart_log'),'macarons');

        var date = new Date();

        Ext.getCmp("search_start").setValue(date);
        Ext.getCmp("search_end").setValue(date);

        hideLoadMask();
    },

    onPnl_logCanvasHide: function(component, eOpts) {
        if(component.items.items[0] !== undefined){

            component.removeAll();
        }
    },

    onGrid_usage_interfaceCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0 && !record.data.hour)
        {
            if(record.data.subhidden)
                record.data.subhidden = false;
            else
                record.data.subhidden = true;

            var store_usage_log = Ext.getCmp("grid_usage_log").getStore();

            store_usage_log.clearFilter(true);

            store_usage_log.each(function(st_record){

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

            store_usage_log.filterBy(function(st_record){

                if(st_record.data.hidden)
                    return false;
                else
                    return true;
            });
        }

    },

    onNFW2_log_statistics_logResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        var me = this;

        var _wid = Ext.getCmp("c_log").getWidth();

        var option = {
            grid : {
                width : _wid-150
            }
        };

        document.getElementById('chart_log').style.width = _wid+"px";
        me.myChart.setOption(option);
        me.myChart.resize();
    }

});