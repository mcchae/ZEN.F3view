
Ext.define('NFW2.view.NFW2_monitor_network_protocol', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_network_protocol',

    requires: [
        'NFW2.view.NFW2_monitor_network_protocolViewModel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.button.Segmented',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox'
    ],

    config: {
        flex: 1
    },

    viewModel: {
        type: 'nfw2_monitor_network_protocol'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_network_protocol',
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
                                                    var me = Ext.getCmp('NFW2_monitor_network_protocol');

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
                                                            text: '{bytes}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{packets}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick1'
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
                                                            text: '{min_1}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick4'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{min_5}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick3'
                                                        }
                                                    },
                                                    {
                                                        bind: {
                                                            text: '{min_30}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick2'
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
                                                itemId: 'cb_bit',
                                                margin: 5,
                                                width: 200,
                                                fieldLabel: '단위',
                                                labelSeparator: ' ',
                                                labelWidth: 80,
                                                value: 'bytes',
                                                editable: false,
                                                displayField: 'name',
                                                forceSelection: true,
                                                queryMode: 'local',
                                                store: 'store_monitor_protocol_bit',
                                                valueField: 'value',
                                                listeners: {
                                                    change: 'onComboboxChange1'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                flex: 1,
                                                hidden: true,
                                                itemId: 'cb_protocol',
                                                margin: 5,
                                                maxWidth: 300,
                                                fieldLabel: '프로토콜',
                                                labelCls: 'lb_sq',
                                                labelSeparator: ' ',
                                                labelWidth: 70,
                                                value: [
                                                    'tcp',
                                                    'udp',
                                                    'icmp',
                                                    'esp',
                                                    'other'
                                                ],
                                                editable: false,
                                                displayField: 'name',
                                                forceSelection: true,
                                                queryMode: 'local',
                                                store: 'store_monitor_protocol_item',
                                                valueField: 'value',
                                                multiSelect: true,
                                                listeners: {
                                                    change: 'onComboboxChange'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                itemId: 'cb_protocol_seconds',
                                                margin: 5,
                                                width: 180,
                                                fieldLabel: '시간',
                                                labelSeparator: ' ',
                                                labelWidth: 50,
                                                value: 60,
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_monitor_protocol_seconds',
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
                                                readOnly: true,
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
                                                    change: 'onCmb_update_intervalChange'
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
                                        xtype: 'panel',
                                        flex: 1,
                                        border: false,
                                        hidden: true,
                                        id: 'pnl_traffic_protocol_chart',
                                        minHeight: 400,
                                        minWidth: 400,
                                        layout: 'fit'
                                    },
                                    {
                                        xtype: 'container',
                                        set_chart: function(record, time, type) {
                                            var me = Ext.getCmp('NFW2_monitor_network_protocol');

                                            if(type === "cre"){
                                                if(me.myChart !== undefined){
                                                    me.myChart.clear();
                                                }
                                                var time_set = [];
                                                var avg = [];
                                                var type = "";
                                                var color = [
                                                '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                                                '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                                                '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                                                '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                                                ];

                                                var d = new Date();

                                                d.setSeconds(d.getSeconds() - ((me.btn_time/5)*5));

                                                for(var z = 0;z <= me.btn_time/5;z++){
                                                    d.setSeconds(d.getSeconds()+5);
                                                    _inc = Ext.Date.format(d, 'Y-m-d H:i:s');
                                                    time_set.push(_inc);

                                                }

                                                if(me.btn_type === "bytes"){ type = "byte"; }
                                                else{ type = "packet"; }

                                                for(var i in record){
                                                    avg[i] = [];

                                                    if(me.btn_time !== 60){
                                                        for(var y = 13;y <= me.btn_time/5;y++){
                                                            avg[i].push("0");
                                                        }
                                                    }

                                                    for(var j in record[i]){
                                                        if(record[i][j].y === null){ avg[i].push("0"); }
                                                        else{ avg[i].push(String(record[i][j].y)); }
                                                    }
                                                }

                                                me.chart_option = {
                                                    tooltip : {
                                                        trigger: 'axis',
                                                        formatter: function(value){
                                                            if(me.btn_type === "bytes"){
                                                                var result = "";
                                                                var data = ['TCP','UDP','ICMP','ESP','OTHER'];
                                                                if(value.length !== 0){
                                                                    result += value[0][1];
                                                                }
                                                                for(var i in value){
                                                                    var color_chk = 0;
                                                                    for(var j in data){
                                                                        if(data[j] === value[i][0]){ color_chk = j; }
                                                                    }
                                                                    result += '<br/><span style="color:'+color[color_chk]+';">'+ value[i][0]+ ' : ' + byteConvert(value[i][2]) + '</span>';
                                                                }

                                                                return result;

                                                            }
                                                            else{
                                                                var result = "";
                                                                var data = ['TCP','UDP','ICMP','ESP','OTHER'];
                                                                if(value.length !== 0){
                                                                    result += value[0][1];
                                                                }
                                                                for(var i in value){
                                                                    var color_chk = 0;
                                                                    for(var j in data){
                                                                        if(data[j] === value[i][0]){ color_chk = j; }
                                                                    }

                                                                    result += '<br/><span style="color:'+color[color_chk]+';">'+ value[i][0] +' : ' + value[i][2] + '</span>';
                                                                }

                                                                return result;
                                                            }
                                                        },
                                                        backgroundColor : 'rgba(0,0,0,0.9)'
                                                    },
                                                    legend: {
                                                        data:['TCP','UDP','ICMP','ESP','OTHER'],
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
                                                        width : Ext.getCmp('protocol_con').wid-280
                                                    },
                                                    xAxis : [
                                                    {
                                                        type : 'category',
                                                        boundaryGap : false,
                                                        name : __zen('hours'),
                                                        data : time_set,
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
                                                        name : __zen('usage')+'('+type+')',
                                                        splitArea : {
                                                            show:true,
                                                            areaStyle : {
                                                                color: [
                                                                'rgba(250,250,250,0.3)',
                                                                'rgba(200,200,200,0.3)'
                                                                ]
                                                            }
                                                        }
                                                    }
                                                    ],
                                                    series : [
                                                    {
                                                        name:'TCP',
                                                        type:'line',
                                                        data: avg[0],
                                                        symbol:'none',
                                                        smooth:true,
                                                        clickable: false

                                                    },
                                                    {
                                                        name:'UDP',
                                                        type:'line',
                                                        data: avg[1],
                                                        symbol:'none',
                                                        smooth:true,
                                                        clickable: false
                                                    },
                                                    {
                                                        name:'ICMP',
                                                        type:'line',
                                                        data: avg[2],
                                                        symbol:'none',
                                                        smooth:true,
                                                        clickable: false
                                                    },
                                                    {
                                                        name:'ESP',
                                                        type:'line',
                                                        data: avg[3],
                                                        symbol:'none',
                                                        smooth:true,
                                                        clickable: false
                                                    },
                                                    {
                                                        name:'OTHER',
                                                        type:'line',
                                                        data: avg[4],
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
                                                    var avg = [];
                                                    var time_set = [];
                                                    time_set.push(time);

                                                    for(var i in record){
                                                        var temp = record[i].slice(12,record[i].length);

                                                        for(var j in temp){
                                                            avg[i] = [];
                                                            if(me.btn_type === "bytes"){ avg[i].push(temp[j].y); }
                                                            else{ avg[i].push(temp[j].y); }
                                                        }
                                                    }

                                                    me.myChart.addData([[0,avg[0][0],false,false,time_set[0]],[1,avg[1][0],false,false],[2,avg[2][0],false,false],[3,avg[3][0],false,false],[4,avg[4][0],false,false]]);
                                                }
                                            }
                                        },
                                        html: '<div id="protocol_chart" style="height:400px;"></div>',
                                        id: 'protocol_con',
                                        margin: '10 0 0 0',
                                        width: '100%',
                                        listeners: {
                                            afterrender: 'onContainerAfterRender',
                                            resize: 'onProtocol_conResize'
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
        var me = Ext.getCmp('NFW2_monitor_network_protocol');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.fir = true;
            me.get_rrdFetchLast_protocol();
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

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_protocol');

        me.btn_type = "bytes";
        me.fir = true;
        me.get_rrdFetchLast_protocol();
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_protocol');

        me.btn_type = "pkt";
        me.fir = true;
        me.get_rrdFetchLast_protocol();
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_protocol');

        me.btn_time = 60;
        me.fir = true;
        me.get_rrdFetchLast_protocol();
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_protocol');

        me.btn_time = 300;
        me.fir = true;
        me.get_rrdFetchLast_protocol();
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_protocol');

        me.btn_time = 1800;
        me.fir = true;
        me.get_rrdFetchLast_protocol();
    },

    onComboboxChange1: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_protocol();

    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_protocol();

    },

    onCb_secondsChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_protocol();
    },

    onChk_updateChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_protocol();
    },

    onCmb_update_intervalChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_protocol();

    },

    onContainerAfterRender: function(component, eOpts) {
        var con = Ext.getCmp('protocol_con');
        con.wid = document.body.clientWidth - 150;

        document.getElementById('protocol_chart').style.width = con.wid+"px";
    },

    onProtocol_conResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_protocol');

        if(me.myChart._option !== undefined){
            var get_chart = me.myChart.getOption();
            var wid = document.body.clientWidth - 150;
            me.chart_option.grid.width = wid-280;

            for(var i in get_chart.series){
                me.chart_option.series[i].data = get_chart.series[i].data;
            }

            me.myChart.setOption(me.chart_option, true);
            document.getElementById('protocol_chart').style.width = wid+"px";

            me.myChart.resize();
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.myChart = echarts.init(document.getElementById('protocol_chart'),'macarons');
        me.btn_type = "bytes";
        me.btn_time = 60;
        me.fir = true;
        component.get_rrdFetchLast_protocol();
        monitor_timeout();
    },

    onPanelBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('pnl_traffic_protocol_chart').items.items[0] !== undefined){

            Ext.getCmp('pnl_traffic_protocol_chart').items.items[0].fireEvent('clearInterval');

            Ext.getCmp('pnl_traffic_protocol_chart').removeAll();

            widget = "";
        }
    },

    get_rrdFetchLast_protocol: function() {
        var me = this;

        var _interval = null;

        if(Ext.getCmp('pnl_traffic_protocol_chart').items.items[0] !== undefined){

            Ext.getCmp('pnl_traffic_protocol_chart').items.items[0].fireEvent('clearInterval');

            Ext.getCmp('pnl_traffic_protocol_chart').removeAll();

            widget = "";
        }

        var _seconds = me.down('combobox[itemId="cb_protocol_seconds"]').getValue();

        var _num_dots = _seconds/(me.down('combobox[itemId="cb_update_interval"]').getValue()/1000);

        if(_seconds > 3600)
        {
            me.down('checkbox[itemId="chk_update"]').disable();
            _num_dots = 900;
        }
        else
        {
            me.down('checkbox[itemId="chk_update"]').enable();

            if(me.down('checkbox[itemId="chk_update"]').getValue())
            {
                _interval = me.down('combobox[itemId="cb_update_interval"]').getValue();
            }
        }

        var _items = ['avg'];

        me._keys = [];

        var _bit = me.btn_type;

        me._data = [];
        me._data_clone = [];
        me._before_data = [];

        var i,j,k;

        var colorSet = ["#369EAD", "#C24642", "#7F6084", "#86B402", "#A2D1CF", "#C8B631", "#6DBCEB", "#52514E", "#4F81BC", "#A064A1",
                        "#F79647","#4F81BC", "#C0504E", "#9BBB58", "#23BFAA", "#8064A1", "#4AACC5", "#F79647", "#33558B","#8CA1BC",
                        "#36845C", "#017E82", "#8CB9D0", "#708C98", "#94838D", "#F08891", "#0366A7", "#008276", "#EE7757", "#E5BA3A",
                        "#F2990B", "#03557B", "#782970"];

        var toolTipContent = '';

        var _tplList_data = [];

        var _inc, _orig, _label = '', _orig_data;

        var tooltip_y = '', tooltip_name = '', data_byte = 'Byte';

        var title = '';

        if(me.down('combobox[itemId="cb_protocol"]').getValue() && _bit)
        {
            for(i=0; i<me.down('combobox[itemId="cb_protocol"]').getValue().length; i++)
            {
                me._keys.push(me.down('combobox[itemId="cb_protocol"]').getValue()[i]);
            }
        }

        toolTipContent = '<font color={tooltip_color}>{tooltip_name}</font> : {tooltip_y}';

        if(_bit === 'bytes')
        {
            title = '사용량 (Byte)';
        }
        else if(_bit === 'pkt')
        {
            title = '사용량 (Packet)';
        }

        for(i = 0; i < me._keys.length; i++)
        {
            me._data[i] = [];
            me._data_clone[i] = [];
            me._before_data[i] = [];

            for(j = 0; j < _num_dots; j++)
            {
                me._data[i].push({x : null, y : null, label : ' '});
                me._data_clone[i].push({x : null, y : null, label : ' '});
            }
        }

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            {
                filename: Ext.encode('/proc/ferret/monitor/network/protocol_stat')
            },
            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                me._before_data = [];

                Ext.each(response, function(data){

                    me._before_data.push(data.split('\t'));
                });

                _inc = Ext.Date.format(new Date(), 'Y-m-d H:i:s');

                me.get_data();
            }
        );
    },

    get_data: function() {
        var me = this;

        // var _interval = null;

        // if(Ext.getCmp('pnl_traffic_protocol_chart').items.items[0] !== undefined){

        //     Ext.getCmp('pnl_traffic_protocol_chart').items.items[0].fireEvent('clearInterval');

        //     Ext.getCmp('pnl_traffic_protocol_chart').removeAll();

        //     widget = "";
        // }

        // var _seconds = me.down('combobox[itemId="cb_protocol_seconds"]').getValue();

        // var _num_dots = _seconds/(me.down('combobox[itemId="cb_update_interval"]').getValue()/1000);

        // if(_seconds > 3600)
        // {
        //     me.down('checkbox[itemId="chk_update"]').disable();
        //     _num_dots = 900;
        // }
        // else
        // {
        //     me.down('checkbox[itemId="chk_update"]').enable();

        //     if(me.down('checkbox[itemId="chk_update"]').getValue())
        //     {
        //         _interval = me.down('combobox[itemId="cb_update_interval"]').getValue();
        //     }
        // }

        // var _items = ['avg'];

        // var _keys = [];

        var _bit = me.btn_type;

        // // me._data = []; me._data_clone = [], me._before_data = [];

        // var i,j,k;

        var colorSet = ["#369EAD", "#C24642", "#7F6084", "#86B402", "#A2D1CF", "#C8B631", "#6DBCEB", "#52514E", "#4F81BC", "#A064A1",
                        "#F79647","#4F81BC", "#C0504E", "#9BBB58", "#23BFAA", "#8064A1", "#4AACC5", "#F79647", "#33558B","#8CA1BC",
                        "#36845C", "#017E82", "#8CB9D0", "#708C98", "#94838D", "#F08891", "#0366A7", "#008276", "#EE7757", "#E5BA3A",
                        "#F2990B", "#03557B", "#782970"];

        // var toolTipContent = '';

        // var _tplList_data = [];

        // var _inc, _orig, _label = '', _orig_data;

        // var tooltip_y = '', tooltip_name = '', data_byte = 'Byte';

        // var title = '';

        // if(me.down('combobox[itemId="cb_protocol"]').getValue() && _bit)
        // {
        //     for(i=0; i<me.down('combobox[itemId="cb_protocol"]').getValue().length; i++)
        //     {
        //         _keys.push(me.down('combobox[itemId="cb_protocol"]').getValue()[i]);
        //     }
        // }

        // toolTipContent = '<font color={tooltip_color}>{tooltip_name}</font> : {tooltip_y}';

        if(_bit === 'bytes')
        {
            title = '사용량 (Byte)';
        }
        else if(_bit === 'pkt')
        {
            title = '사용량 (Packet)';
        }

        // for(i = 0; i < _keys.length; i++)
        // {
        //     me._data[i] = [];
        //     me._data_clone[i] = [];
        //     me._before_data[i] = [];

        //     for(j = 0; j < _num_dots; j++)
        //     {
        //         me._data[i].push({x : null, y : null, label : ' '});
        //         me._data_clone[i].push({x : null, y : null, label : ' '});
        //     }
        // }

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            {
                filename: Ext.encode('/proc/ferret/monitor/network/protocol_stat')
            },
            function(response){

                var _dataPoints = [];

                _orig = [];

                Ext.each(response, function(data){
                    _orig.push(data.split('\t'));
                });

                _label = Ext.Date.format(new Date(), 'H:i:s');

                _inc = Ext.Date.format(new Date(), 'Y-m-d H:i:s');

                for(i = 0 ; i < me._keys.length ; i++)
                {
                    if(me._data[i].length >= me.down('combobox[itemId="cb_protocol_seconds"]').getValue()/(me.down('combobox[itemId="cb_update_interval"]')/1000))
                    {
                        me._data[i].shift();
                        me._data_clone[i].shift();
                    }

                    for(j in _orig)
                    {
                        if(_orig[j][0] === me._keys[i])
                        {
                            _orig_data = [_orig[j].length];

                            _orig_data[0] = _orig[j][0];
                            _orig_data[1] = parseFloat(_orig[j][1]) - parseFloat(me._before_data[j][1]);
                            _orig_data[2] = parseFloat(_orig[j][2]) - parseFloat(me._before_data[j][2]);
                        }
                    }

                    switch(_orig_data[0])
                    {
                        case 'tcp':
                            tooltip_name = 'TCP';
                            break;
                        case 'udp':
                            tooltip_name = 'UDP';
                            break;
                        case 'icmp':
                            tooltip_name = 'ICMP';
                            break;
                        case 'esp':
                            tooltip_name = 'ESP';
                            break;
                        case 'other':
                            tooltip_name = 'OTHER';
                            break;
                    }

                    if(_bit === 'bytes')
                    {
                        if(_orig_data[2] > (1024*1024))
                        {
                            tooltip_y = addComma(parseFloat(_orig_data[2]/(1024*1024)).toFixed(2)) + ' M';
                        }
                        else if(_orig_data[2] > 1024)
                        {
                            tooltip_y = parseFloat(_orig_data[2]/1024).toFixed(2) + ' K';
                        }
                        else
                        {
                            tooltip_y = _orig_data[2] + ' byte';
                        }

                        me._data[i].push({x : null, y : _orig_data[2], label : _label, _inc : _inc,
                                          tooltip_name : tooltip_name, tooltip_color : colorSet[i], tooltip_y : tooltip_y});

                        me._data_clone[i].push({x : null, y : _orig_data[2]});

                    }
                    else if(_bit === 'pkt')
                    {
                        tooltip_y = + parseInt(_orig_data[1]);

                        me._data[i].push({x : null, y : _orig_data[1], label : _label, _inc : _inc,
                                          tooltip_name : tooltip_name, tooltip_color : colorSet[i], tooltip_y : addComma(tooltip_y)});

                        me._data_clone[i].push({x : null, y : _orig_data[1]});
                    }

                    for(j = 0 ; j < me._data[i].length ; j++){

                        me._data[i][j].x = j;
                        me._data_clone[i][j].x = j;
                    }
                }

                if(_bit === 'bytes')
                {
                    data_byte = 'Byte';

                    //                         for(i in obj.chart.options.data)
                    //                         {
                    //                             if(obj.chart.options.data[i].visible !== false)
                    //                             {
                    for(j in me._data[i])
                    {
                        if(me._data[i][j].y > (1024*1024))
                        {
                            data_byte = 'M';
                            //                                         break;
                        }
                        else if(me._data[i][j].y > 1024)
                        {
                            data_byte = 'K';
                        }
                    }

                    if(data_byte === 'M')
                    {
                        //                                     break;
                    }
                    //                             }
                    //                         }

                    for(i in me._data)
                    {
                        switch(data_byte)
                        {
                            case 'M':

                                for(j in me._data[i])
                                {
                                    if(me._data_clone[i][j].y)
                                    {
                                        me._data[i][j].y = parseFloat(me._data_clone[i][j].y/(1024*1024));
                                    }
                                }

                                //                                     obj.chart.options.axisY.title = '사용량 (M)';

                                break;
                            case 'K':

                                for(j in me._data[i])
                                {
                                    if(me._data_clone[i][j].y)
                                    {
                                        me._data[i][j].y = parseFloat(me._data_clone[i][j].y/1024);
                                    }
                                }

                                //                                     obj.chart.options.axisY.title = '사용량 (K)';

                                break;
                            case 'Byte':

                                //                                     obj.chart.options.axisY.title = '사용량 (Byte)';

                                break;
                        }
                        _dataPoints.push(me._data[i]);
                    }
                }
                else if(_bit === 'pkt')
                {
                    for(i in me._data)
                    {
                        _dataPoints.push(me._data[i]);
                    }
                }

                me._before_data = _orig;

                if(me.fir){
                    if(Ext.getCmp('protocol_con')){
                        Ext.getCmp('protocol_con').set_chart(_dataPoints, _inc, "cre"); me.fir = false;
                    }
                }
                else{
                    if(Ext.getCmp('protocol_con')){
                        Ext.getCmp('protocol_con').set_chart(_dataPoints, _inc, "add");
                    }
                }
                var time = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                Ext.getCmp("l_time").setText("최종수정시간 : "+time);
            }
        );

    }

});