
Ext.define('NFW2.view.NFW2_dashboard_ips', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_dashboard_ips',

    requires: [
        'NFW2.view.NFW2_dashboard_ipsViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.button.Segmented',
        'Ext.toolbar.Toolbar',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.grid.plugin.RowExpander',
        'Ext.XTemplate'
    ],

    viewModel: {
        type: 'nfw2_dashboard_ips'
    },
    cls: 'zen_body',
    height: '100%',
    id: 'NFW2_ips',
    anchorSize: 100,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onNFW2_ipsBeforeDestroy',
        resize: 'onNFW2_ipsResize'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        flex: 1,
                        height: '100%',
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
                                        state: false,
                                        cls: 'custom-color-monitor',
                                        id: 'b_chk_btn',
                                        listeners: {
                                            change: 'onButtonChange'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        set_data: function() {
                                            Ext.getCmp("NFW2_monitor_ips_uid").get_uid();
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
                                                        checkchange: 'onMenucheckitemCheckChange5'
                                                    }
                                                }),
                                                me.processMyCheckItem1({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange4'
                                                    }
                                                }),
                                                me.processMyCheckItem2({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange3'
                                                    }
                                                }),
                                                me.processMyCheckItem3({
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
                                        xtype: 'segmentedbutton',
                                        cls: 'zen_seg',
                                        id: 'com_time1',
                                        items: [
                                            me.processMyButton13({
                                                enableToggle: true,
                                                pressed: true,
                                                listeners: {
                                                    click: 'onButtonClick1'
                                                }
                                            }),
                                            me.processMyButton14({
                                                listeners: {
                                                    click: 'onButtonClick3'
                                                }
                                            }),
                                            me.processMyButton15({
                                                listeners: {
                                                    click: 'onButtonClick4'
                                                }
                                            }),
                                            me.processMyButton16({
                                                listeners: {
                                                    click: 'onButtonClick5'
                                                }
                                            }),
                                            me.processMyButton17({
                                                listeners: {
                                                    click: 'onButtonClick6'
                                                }
                                            })
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1.8,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 2,
                                        id: 'con_policy',
                                        margin: '0 10 0 0',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                id: 'con_policy_traffic',
                                                margin: '5 0 0 0',
                                                items: [
                                                    {
                                                        xtype: 'panel',
                                                        dockedItems: [
                                                            {
                                                                xtype: 'toolbar',
                                                                dock: 'top',
                                                                cls: 'zen_toolbar',
                                                                items: [
                                                                    {
                                                                        xtype: 'container',
                                                                        flex: 1,
                                                                        items: [
                                                                            {
                                                                                xtype: 'label',
                                                                                cls: 'x-title-text',
                                                                                bind: {
                                                                                    text: '{traffic_per_policy}'
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: 'button',
                                                                        bind: {
                                                                            text: '{policy_prio_set}'
                                                                        },
                                                                        listeners: {
                                                                            click: 'onButtonClick'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        items: [
                                                            {
                                                                xtype: 'gridpanel',
                                                                cls: 'grid_xpad',
                                                                height: 120,
                                                                id: 'grid_ips_traffic',
                                                                margin: '5 0 0 0',
                                                                maxHeight: 120,
                                                                scrollable: true,
                                                                bufferedRenderer: false,
                                                                columnLines: true,
                                                                sortableColumns: false,
                                                                store: 'store_daships_policy',
                                                                columns: [
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var me = Ext.getCmp("NFW2_ips");
                                                                            var p_uid = me.p_uid;
                                                                            var checked = 'checked';

                                                                            eval('if(p_uid.uid_'+value+'===false){ checked = "";}');

                                                                            if(value === 0){ return "IDS_MODE"; }

                                                                            return '<input type="checkbox" name="uid[]" id="row_'+rowIndex+'" value="'+value+'" '+checked+' />'+value;
                                                                        },
                                                                        width: 80,
                                                                        dataIndex: '@uid',
                                                                        bind: {
                                                                            text: '{rule_id}'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return value['#text'];
                                                                        },
                                                                        dataIndex: 'ips',
                                                                        flex: 1,
                                                                        bind: {
                                                                            text: '{profile_name}(ID)'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var text = [];

                                                                            for(var i in value){
                                                                                text.push(value[i]['#text']);
                                                                            }

                                                                            return text.join(',');
                                                                        },
                                                                        dataIndex: 'src',
                                                                        flex: 1,
                                                                        bind: {
                                                                            text: '{src}'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var text = [];

                                                                            for(var i in value){
                                                                                text.push(value[i]['#text']);
                                                                            }

                                                                            return text.join(',');
                                                                        },
                                                                        dataIndex: 'dest',
                                                                        flex: 1,
                                                                        bind: {
                                                                            text: '{dest}'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return byteConvert(value.tx+value.rx)+'('+byteConvert(value.tx)+'/'+byteConvert(value.rx)+')';
                                                                        },
                                                                        dataIndex: 'traffic',
                                                                        flex: 1,
                                                                        bind: {
                                                                            text: '{traffic}(TX/RX)'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return commify(value.count)+'/'+byteConvert(value.bytes);
                                                                        },
                                                                        dataIndex: 'detect',
                                                                        flex: 1,
                                                                        bind: {
                                                                            text: '{detect}({count}/Bytes)'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return commify(value.count)+'/'+byteConvert(value.bytes);
                                                                        },
                                                                        dataIndex: 'block',
                                                                        flex: 1,
                                                                        bind: {
                                                                            text: '{block}({count}/Bytes)'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var bar_g = (value['4'] !== 0)?'<strong class="bar_g" style="width:'+value['4']+'%;border:none"></strong>':'';
                                                                            var bar_b = (value['3'] !== 0)?'<strong class="bar_b" style="width:'+value['3']+'%;border:none"></strong>':'';
                                                                            var bar_r = (value['2'] !== 0)?'<strong class="bar_r" style="width:'+value['2']+'%;border:none"></strong>':'';
                                                                            var bar_rr = (value['1'] !== 0)?'<strong class="bar_rr" style="width:'+value['1']+'%;border:none"></strong>':'';

                                                                            return '<div class="graph" style="border-left:1px solid #bdbdbe;">'+bar_g+bar_b+bar_r+bar_rr+'</div>';
                                                                        },
                                                                        align: 'center',
                                                                        dataIndex: 'priority',
                                                                        flex: 1,
                                                                        bind: {
                                                                            text: '{hazard}'
                                                                        }
                                                                    }
                                                                ],
                                                                viewConfig: {
                                                                    loadMask: false
                                                                },
                                                                listeners: {
                                                                    cellclick: 'onGridpanelCellClick'
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                id: 'con_policy_filter',
                                                margin: '5 0 0 0'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1.2,
                                        height: '100%',
                                        margin: '5 0 0 0',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                set_chart: function(record, record_mem, type, _time) {
                                                    var me = Ext.getCmp("NFW2_ips");
                                                    var p_uid = me.p_uid;

                                                    if(type === "cre"){
                                                        if(me.myChart !== undefined){
                                                            me.myChart.clear();
                                                        }
                                                        var time = [];

                                                        for(var i=0; i<record_mem.length; i++){
                                                            eval('var _'+record_mem[i]+' = [];');
                                                        }

                                                        var color = [
                                                        '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                                                        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                                                        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                                                        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089',
                                                        '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                                                        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                                                        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                                                        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089',
                                                        '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                                                        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                                                        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                                                        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089','#2ec7c9'
                                                        ];
                                                        var d = new Date();
                                                        var btn_time = Ext.getCmp('NFW2_monitor_ips_uid').btn_time*60/2;
                                                        d.setSeconds(d.getSeconds() - (Ext.getCmp('NFW2_monitor_ips_uid').btn_time*60));

                                                        for(var i=0; i<btn_time-1; i++){
                                                            d.setSeconds(d.getSeconds()+2);
                                                            _inc = Ext.Date.format(d, 'H:i:s');
                                                            time.push(_inc);
                                                            for(var l=0; l<record_mem.length; l++){
                                                                eval('_'+record_mem[l]+'.push(0)');
                                                            }
                                                        }
                                                        time.push(_time);

                                                        var _mem = [];
                                                        var _series = [];
                                                        for(var i=0; i<record_mem.length; i++){
                                                            eval('var name = _'+record_mem[i]+';');
                                                            eval('var _re = record[0].'+record_mem[i]+';');

                                                            eval('name.push(record[0].'+record_mem[i]+');');
                                                            var s = record_mem[i].split("_");
                                                            s = (i===0)?record_mem[i]:s[1];
                                                            _mem.push(s);

                                                            _series.push(
                                                            {
                                                                name:s,
                                                                type:'line',
                                                                data: name,
                                                                symbol:'none',
                                                                yAxisIndex: (record_mem[i]===__zen('all'))?1:0,
                                                                smooth:true,
                                                                clickable: false

                                                            }
                                                            );
                                                        }
                                                        var _wid = Ext.getCmp("c_chart").getWidth();
                                                        var _hei = Ext.getCmp("c_chart").getHeight();

                                                        var _le = _wid/50;
                                                        var _mem_hei = (_mem.length > _le)?_mem.length/_le*15:15;
                                                        var _regend = _hei-(_mem_hei)-70;

                                                        var option = {
                                                            tooltip : {
                                                                trigger: 'axis',
                                                                formatter: function(value){
                                                                    var result = "";
                                                                    var data = _mem;

                                                                    if(value.length !== 0){
                                                                        result += value[0][1];
                                                                    }

                                                                    var list = result+'<table width="100%" cellpadding="1" cellspacing="0" id="sorttable">';
                                                                    var k = 0;
                                                                    for(var i in value){
                                                                        var color_chk = 0;
                                                                        for(var j in data){

                                                                            if(data[j] === value[i][0]){ color_chk = j; }
                                                                        }
                                                                        var bytes = byteConvert(value[i][2]);
                                                                        var re = (value[i][2] < 1000)?value[i][2]/1000000000:(value[i][2] < 1000000)?value[i][2]/1000000:bytes.substring(0,bytes.length-1);
                                                                        if(value[i][2] > 1000000000){
                                                                            bytes = Number(re)*1000;
                                                                        }
                                                                        if((k+1)%5===0 || value[i][0] === __zen('all')){ result += '<tr>'; }
                                                                        var col = (value[i][0] === __zen('all'))?5:1;
                                                                        list += '<td colspan="'+col+'"><div style="color:'+color[color_chk]+';white-space:nowrap">'+value[i][0]+' : ' + bytes + '</div></td>';

                                                                        if(value[i][0] !== __zen('all')){
                                                                            if((k+1)%5===0){ list += '</tr>'; }
                                                                            k++;
                                                                        }else{
                                                                            list += '</tr>';
                                                                        }
                                                                    }

                                                                    list += '</table>';
                                                                    return list;
                                                                },
                                                                backgroundColor : 'rgba(0,0,0,0.9)'
                                                            },
                                                            legend: {
                                                                data:_mem,
                                                                orient : 'horizontal',
                                                                x : 'left',
                                                                y: 'bottom',
                                                                itemGap: 1,
                                                                padding: 5,
                                                                height: 10,
                                                                textStyle: {fontSize: '8pt'}
                                                            },
                                                            dataZoom : {
                                                                show : true,
                                                                realtime : true,
                                                                start : 0,
                                                                end : 100,
                                                                height: 15,
                                                                y: _regend+45
                                                            },
                                                            grid : {
                                                                //width : _wid-140,
                                                                x: 65,
                                                                y: 20,
                                                                height: _regend
                                                            },
                                                            xAxis : [
                                                            {
                                                                type : 'category',
                                                                boundaryGap : false,
                                                                name : __zen('time'),
                                                                data : time,
                                                                axisLabel : {
                                                                    formatter: function(value){
                                                                        return value;
                                                                    }
                                                                }
                                                            }
                                                            ],
                                                            yAxis : [
                                                            {
                                                                type : 'value',
                                                                name : __zen('profile_traffic')+'(M)',
                                                                splitArea : {
                                                                    show:true,
                                                                    areaStyle : {
                                                                        color: [
                                                                        'rgba(250,250,250,0.3)',
                                                                        'rgba(200,200,200,0.3)'
                                                                        ]
                                                                    }
                                                                },
                                                                axisLabel : {
                                                                    formatter: function(value){
                                                                        var bytes = byteConvert(value);
                                                                        var re = (value < 1000)?value/1000000000:(value < 1000000)?value/1000000:bytes.substring(0,bytes.length-1);
                                                                        if(value > 1000000000){
                                                                            bytes = Number(re)*1000;
                                                                        }
                                                                        return bytes;
                                                                    }
                                                                },
                                                                min : 0
                                                            },
                                                            {
                                                                type : 'value',
                                                                name : __zen('all_traffic')+'(M)',
                                                                splitArea : {
                                                                    show:false
                                                                },
                                                                axisLabel : {
                                                                    formatter: function(value){
                                                                        var bytes = byteConvert(value);
                                                                        var re = (value < 1000)?value/1000000000:(value < 1000000)?value/1000000:bytes.substring(0,bytes.length-1);
                                                                        if(value > 1000000000){
                                                                            bytes = Number(re)*1000;
                                                                        }
                                                                        return bytes;
                                                                    }
                                                                },
                                                                min : 0
                                                            }
                                                            ],
                                                            series : _series,
                                                            animation : false
                                                        };
                                                        me.myChart.setOption(option);

                                                        document.getElementById('ips_chart').style.width = Ext.getCmp("c_chart").getWidth()+"px";

                                                        me.myChart.resize();
                                                        me._y_max = 0;
                                                    }else{
                                                        var _record = [];

                                                        for(var i=0; i<record_mem.length; i++){
                                                            eval('var re = record[0].'+record_mem[i]+';');
                                                            if(i === 0){
                                                                var _max = re;
                                                                var _re = [i,re,false,false,_time];
                                                            }else{
                                                                var _re = [i,re,false,false];
                                                            }
                                                            _record.push(_re);
                                                        }

                                                        if(record_mem.length > 1){
                                                            me.myChart.addData(_record);

                                                            var _y_max = (_max >= me._y_max)?_max:me.myChart.component.yAxis._axisList[1]._max;
                                                            if(_y_max === 0){ return false; }

                                                            var option = {
                                                                yAxis : [
                                                                {
                                                                    max: _y_max
                                                                },
                                                                {
                                                                    max: _y_max
                                                                }
                                                                ]
                                                            };

                                                            me.myChart.setOption(option);
                                                            me._y_max = _y_max;
                                                        }
                                                    }
                                                },
                                                height: 250,
                                                html: '<div id="ips_chart" style="height:250px"></div>',
                                                id: 'c_chart',
                                                minHeight: 250,
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },
                                                listeners: {
                                                    afterrender: 'onC_chartAfterRender'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                height: '100%',
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        id: 'con_alarm',
                                                        margin: '5 0 0 0',
                                                        items: [
                                                            {
                                                                xtype: 'panel',
                                                                layout: {
                                                                    type: 'vbox',
                                                                    align: 'stretch'
                                                                },
                                                                dockedItems: [
                                                                    {
                                                                        xtype: 'toolbar',
                                                                        dock: 'top',
                                                                        cls: 'zen_toolbar',
                                                                        items: [
                                                                            {
                                                                                xtype: 'container',
                                                                                flex: 1,
                                                                                items: [
                                                                                    {
                                                                                        xtype: 'label',
                                                                                        cls: 'x-title-text',
                                                                                        bind: {
                                                                                            text: '{alarm}'
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                xtype: 'button',
                                                                                bind: {
                                                                                    text: '{alarm_setting}'
                                                                                },
                                                                                listeners: {
                                                                                    click: 'onButtonClick2'
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                items: [
                                                                    {
                                                                        xtype: 'gridpanel',
                                                                        flex: 1,
                                                                        cls: 'grid_xpad',
                                                                        id: 'grid_ips_alarm',
                                                                        margin: '5 0 0 0',
                                                                        scrollable: false,
                                                                        style: 'overflow-y:auto;overflow-x:hidden;',
                                                                        columnLines: true,
                                                                        store: 'store_dashtraffic_alarm',
                                                                        columns: [
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    if(record.data['@uid'] === 0){ return ''; }
                                                                                    var pri = value.priority;
                                                                                    var img = (pri===1)?"critical":(pri===2)?"high":(pri===3)?"normal":"low";
                                                                                    var type = record.data.stats.block_type;

                                                                                    metaData.style = "white-space:pre-line";

                                                                                    var stat = [];
                                                                                    if(Number(value.detect_count) !== 0){ stat.push('탐지('+value.detect_count+')'); }
                                                                                    if(Number(value.block_count) !== 0){ stat.push('차단('+value.block_count+')'); }
                                                                                    if(Number(value.detect_bytes) !== 0){ var _br = (stat.length === 2)?"<br/>":''; stat.push(_br+'탐지Bytes('+value.detect_bytes+')'); }
                                                                                    if(Number(value.block_bytes) !== 0){ var _br = (stat.length === 2)?"<br/>":''; stat.push(_br+'차단Bytes('+value.block_bytes+')'); }

                                                                                    return '<img src="../images/level_'+img+'.png" border="0" height="14"/> '+stat.join(', ');
                                                                                },
                                                                                dataIndex: 'alarm',
                                                                                flex: 1.5,
                                                                                bind: {
                                                                                    text: '{alarm_info}'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    if(value===0){ return "IDS_MODE"; }

                                                                                    return value;
                                                                                },
                                                                                dataIndex: '@uid',
                                                                                flex: 0.7,
                                                                                bind: {
                                                                                    text: '{rule_id}'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    if(record.data['@uid'] === 0){ return ''; }
                                                                                    return value['#text']+'('+value.profile_id+')';
                                                                                },
                                                                                dataIndex: 'ips',
                                                                                flex: 1.5,
                                                                                bind: {
                                                                                    text: '{profile_name}(ID)'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                dataIndex: 'curr_dt',
                                                                                flex: 1.2,
                                                                                bind: {
                                                                                    text: '{alarm_time}'
                                                                                }
                                                                            }
                                                                        ],
                                                                        viewConfig: {
                                                                            style: 'overflow:auto;overflow-x:hidden',
                                                                            loadMask: false,
                                                                            listeners: {
                                                                                expandbody: 'onTableExpandbody',
                                                                                collapsebody: 'onTableCollapsebody'
                                                                            }
                                                                        },
                                                                        listeners: {
                                                                            afterrender: 'onGridpanelAfterRender'
                                                                        },
                                                                        plugins: [
                                                                            {
                                                                                ptype: 'rowexpander',
                                                                                pluginId: 'expander_grid4',
                                                                                expandOnDblClick: false,
                                                                                expandOnEnter: false,
                                                                                rowBodyTpl: [
                                                                                    '<div></div>'
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
                            },
                            {
                                xtype: 'container',
                                height: 185,
                                id: 'con_top',
                                items: [
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        items: [
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                hidden: true,
                                                id: 'b_retop',
                                                width: 100,
                                                bind: {
                                                    text: '{top_n_screen}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        height: '100%',
                                        id: 'con_top_grid',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        margin: '5 0 5 10',
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'container',
                                                                height: 26,
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'middle'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'x-title-text',
                                                                        margin: '',
                                                                        bind: {
                                                                            text: '{attack_topn}'
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                flex: 1,
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch',
                                                                    pack: 'end'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'button',
                                                                        cls: 'btn_b',
                                                                        hidden: true,
                                                                        id: 'btn_att_more',
                                                                        bind: {
                                                                            text: '{more_result}'
                                                                        },
                                                                        listeners: {
                                                                            click: 'onBtn_att_moreClick'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        listeners: {
                                                            beforerender: 'onContainerBeforeRender'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        height: 110,
                                                        maxHeight: 110,
                                                        style: 'overflow-y:auto;overflow-x:hidden;border:1px solid #ccc;border-top:none;',
                                                        items: [
                                                            {
                                                                xtype: 'dataview',
                                                                itemTpl: [
                                                                    '<table cellspacing="0" cellpadding="3 5" style="border-collapse:collapse;width:100%" class="x-grid-item x_grid_template">',
                                                                    '	<tpl for=".">',
                                                                    '        <tr>',
                                                                    '			<td width="35" style="text-align:center;">{num}</td>',
                                                                    '			<td width="50%" style="max-width:10px;">',
                                                                    '				<button class="dbtn who" onclick=show_whois("{src}")></button><button class="dbtn tra" onclick=show_trace("{src}")></button> {src}</td>',
                                                                    '			<td width="20%" style="max-width:10px;">{detect}</td>',
                                                                    '			<td width="20%" style="max-width:10px;">{block}</td>',
                                                                    '		</tr>',
                                                                    '	</tpl>',
                                                                    '</table>'
                                                                ],
                                                                store: 'store_dashtraffic_top1',
                                                                id: 'ips_attack_grid'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                margin: '0 0 0 5',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        margin: '5 0 5 10',
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'container',
                                                                height: 26,
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'middle'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'x-title-text',
                                                                        margin: '',
                                                                        bind: {
                                                                            text: '{attack_port_topn}'
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                flex: 1,
                                                                width: '100%',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch',
                                                                    pack: 'end'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'button',
                                                                        cls: 'btn_b',
                                                                        hidden: true,
                                                                        id: 'btn_sport_more',
                                                                        bind: {
                                                                            text: '{more_result}'
                                                                        },
                                                                        listeners: {
                                                                            click: 'onBtn_sport_moreClick'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        listeners: {
                                                            beforerender: 'onContainerBeforeRender1'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        height: 110,
                                                        maxHeight: 110,
                                                        style: 'overflow-y:auto;overflow-x:hidden;border:1px solid #ccc;border-top:none;',
                                                        items: [
                                                            {
                                                                xtype: 'dataview',
                                                                itemTpl: [
                                                                    '<table cellspacing="0" cellpadding="3 5" style="border-collapse:collapse;width:100%" class="x-grid-item x_grid_template">',
                                                                    '	<tpl for=".">',
                                                                    '        <tr role="row" class="x-grid-row x-grid-data-row">',
                                                                    '			<td width="35" style="text-align:center;">{num}</td>',
                                                                    '			<td width="22%" style="max-width:10px;">{[getProtocol(values.protocol)]}</td>',
                                                                    '			<td width="24%" style="max-width:10px;">{sport}</td>',
                                                                    '			<td width="22%" style="max-width:10px;">{detect}</td>',
                                                                    '			<td width="22%" style="max-width:10px;">{block}</td>',
                                                                    '		</tr>',
                                                                    '	</tpl>',
                                                                    '</table>'
                                                                ],
                                                                store: 'store_dashtraffic_top2',
                                                                id: 'ips_port_grid'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                margin: '0 0 0 5',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        margin: '5 0 5 10',
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'container',
                                                                height: 26,
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'middle'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'x-title-text',
                                                                        bind: {
                                                                            text: '{detect_topn}'
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                flex: 1,
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch',
                                                                    pack: 'end'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'button',
                                                                        cls: 'btn_b',
                                                                        hidden: true,
                                                                        id: 'btn_detect_more',
                                                                        bind: {
                                                                            text: '{more_result}'
                                                                        },
                                                                        listeners: {
                                                                            click: 'onBtn_detect_moreClick'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        listeners: {
                                                            beforerender: 'onContainerBeforeRender11'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        height: 110,
                                                        maxHeight: 110,
                                                        style: 'overflow-y:auto;overflow-x:hidden;border:1px solid #ccc;border-top:none;',
                                                        items: [
                                                            {
                                                                xtype: 'dataview',
                                                                itemTpl: [
                                                                    '<table cellspacing="0" cellpadding="3 5" style="border-collapse:collapse;width:100%" class="x-grid-item x_grid_template">',
                                                                    '	<tpl for=".">',
                                                                    '        <tr role="row" class="x-grid-row  x-grid-data-row">',
                                                                    '			<td width="35" style="text-align:center;">{num}</td>',
                                                                    '			<td width="60%" style="max-width:10px;">',
                                                                    '			<tpl if="priority===1"><img src="../images/level_critical.png" border="0" height="14"/></tpl>',
                                                                    '			<tpl if="priority===2"><img src="../images/level_high.png" border="0" height="14"/></tpl>',
                                                                    '			<tpl if="priority===3"><img src="../images/level_normal.png" border="0" height="14"/></tpl>',
                                                                    '			<tpl if="priority===4"><img src="../images/level_low.png" border="0" height="14"/></tpl>',
                                                                    '			{signature_name}</td>',
                                                                    '			<td width="15%" style="max-width:10px;">{detect}</td>',
                                                                    '			<td width="15%" style="max-width:10px;">{block}</td>',
                                                                    '		</tr>',
                                                                    '	</tpl>',
                                                                    '</table>'
                                                                ],
                                                                store: 'store_dashtraffic_top3',
                                                                id: 'ips_detect_grid',
                                                                style: 'overflow-x: hidden;'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                margin: '0 0 0 5',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        margin: '5 0 5 10',
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'container',
                                                                height: 26,
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'middle'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'x-title-text',
                                                                        bind: {
                                                                            text: '{block_topn}'
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                flex: 1,
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch',
                                                                    pack: 'end'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'button',
                                                                        cls: 'btn_b',
                                                                        hidden: true,
                                                                        id: 'btn_block_more',
                                                                        bind: {
                                                                            text: '{more_result}'
                                                                        },
                                                                        listeners: {
                                                                            click: 'onBtn_block_moreClick'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        listeners: {
                                                            beforerender: 'onContainerBeforeRender111'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        height: 110,
                                                        maxHeight: 110,
                                                        style: 'overflow-y:auto;overflow-x:hidden;border:1px solid #ccc;border-top:none;',
                                                        items: [
                                                            {
                                                                xtype: 'dataview',
                                                                itemTpl: [
                                                                    '<table cellspacing="0" cellpadding="3 5" style="border-collapse:collapse;width:100%" class="x-grid-item x_grid_template">',
                                                                    '	<tpl for=".">',
                                                                    '        <tr role="row" class="x-grid-row  x-grid-data-row">',
                                                                    '			<td width="35" style="text-align:center;">{num}</td>',
                                                                    '			<td width="60%" style="max-width:10px;">',
                                                                    '			<tpl if="priority===1"><img src="../images/level_critical.png" border="0" height="14"/></tpl>',
                                                                    '			<tpl if="priority===2"><img src="../images/level_high.png" border="0" height="14"/></tpl>',
                                                                    '			<tpl if="priority===3"><img src="../images/level_normal.png" border="0" height="14"/></tpl>',
                                                                    '			<tpl if="priority===4"><img src="../images/level_low.png" border="0" height="14"/></tpl>',
                                                                    '			{signature_name}</td>',
                                                                    '			<td width="15%" style="max-width:10px;">{detect}</td>',
                                                                    '			<td width="15%" style="max-width:10px;">{block}</td>',
                                                                    '		</tr>',
                                                                    '	</tpl>',
                                                                    '</table>'
                                                                ],
                                                                store: 'store_dashtraffic_top4',
                                                                id: 'ips_block_grid'
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
        config.text = '5 '+__zen('sec');

        return config;
    },

    processMyCheckItem1: function(config) {
        config.text = '10 '+__zen('sec');

        return config;
    },

    processMyCheckItem2: function(config) {
        config.text = '30 '+__zen('sec');

        return config;
    },

    processMyCheckItem3: function(config) {
        config.text = '60 '+__zen('sec');

        return config;
    },

    processMyButton13: function(config) {
        config.text = '5 '+__zen('min');

        return config;
    },

    processMyButton14: function(config) {
        config.text = '10 '+__zen('min');

        return config;
    },

    processMyButton15: function(config) {
        config.text = '30 '+__zen('min');

        return config;
    },

    processMyButton16: function(config) {
        config.text = '1 '+__zen('hours');

        return config;
    },

    processMyButton17: function(config) {
        config.text = '5 '+__zen('hours');

        return config;
    },

    onButtonChange: function(button) {
        Ext.suspendLayouts();
        var NFW2_me = Ext.getCmp("NFW2_ips");
        var me = Ext.getCmp("NFW2_monitor_ips_uid");
        var timeout = Ext.getCmp('timeout');
        var time = Ext.getCmp('update_time').text.split(' ');

        clearTimeout(NFW2_me.p_timer);
        clearTimeout(NFW2_me.a_timer);
        clearTimeout(NFW2_me.t_timer);
        NFW2_me.p_timer = 0;
        NFW2_me.a_timer = 0;
        NFW2_me.t_timer = 0;

        if(button.state === true){

            NFW2_me.get_policy_chart('cre');

            Ext.StoreManager.lookup("store_daships_policy").removeAll();
            Ext.StoreManager.lookup("store_dashtraffic_alarm").removeAll();
            Ext.StoreManager.lookup("store_dashtraffic_top1").removeAll();
            Ext.StoreManager.lookup("store_dashtraffic_top2").removeAll();
            Ext.StoreManager.lookup("store_dashtraffic_top3").removeAll();
            Ext.StoreManager.lookup("store_dashtraffic_top4").removeAll();
            Ext.StoreManager.lookup("store_monitor_ips_uid_list").removeAll();
            Ext.StoreManager.lookup("store_monitor_ips_uid_detail_list1").removeAll();
            Ext.StoreManager.lookup("store_monitor_ips_uid_detail_list2").removeAll();
            Ext.StoreManager.lookup("store_monitor_ips_uid_detail_list3").removeAll();

            request_helper.xmlrpc_call_JsonP(
                'FtDBMgr',
                'getServerTime',
                {},
                function(response2){
                    me.start_ts = response2;
                    me.get_uid();
                    monitor_timeout();
                }
            );
        }else{
            clearInterval(NFW2_me.c_intr);
            delete NFW2_me.c_intr;
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
        Ext.resumeLayouts(true);
    },

    onMenucheckitemCheckChange5: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.update_sec = 5;
        Ext.getCmp('timeout').setHtml(5);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('b_chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange4: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.update_sec = 10;
        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('b_chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange3: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.update_sec = 30;
        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('b_chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.update_sec = 60;
        Ext.getCmp('timeout').setHtml(60);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('b_chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.btn_time = 5;
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));
        clearInterval(Ext.getCmp("NFW2_ips").c_intr);
        delete Ext.getCmp("NFW2_ips").c_intr;

        clearInterval(Ext.getCmp('timeout').interval);
        if(Ext.getCmp('b_chk_btn').state === true){
            Ext.getCmp('NFW2_monitor_ips_uid').get_uid();
            Ext.getCmp("NFW2_ips").get_policy_chart('cre');
            monitor_timeout();
        }
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.btn_time = 10;
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));
        clearInterval(Ext.getCmp("NFW2_ips").c_intr);
        delete Ext.getCmp("NFW2_ips").c_intr;

        clearInterval(Ext.getCmp('timeout').interval);
        if(Ext.getCmp('b_chk_btn').state === true){
            Ext.getCmp('NFW2_monitor_ips_uid').get_uid();
            Ext.getCmp("NFW2_ips").get_policy_chart('cre');
            monitor_timeout();
        }
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.btn_time = 30;
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));
        clearInterval(Ext.getCmp("NFW2_ips").c_intr);
        delete Ext.getCmp("NFW2_ips").c_intr;

        clearInterval(Ext.getCmp('timeout').interval);
        if(Ext.getCmp('b_chk_btn').state === true){
            Ext.getCmp('NFW2_monitor_ips_uid').get_uid();
            Ext.getCmp("NFW2_ips").get_policy_chart('cre');
            monitor_timeout();
        }
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.btn_time = 60;
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));
        clearInterval(Ext.getCmp("NFW2_ips").c_intr);
        delete Ext.getCmp("NFW2_ips").c_intr;

        clearInterval(Ext.getCmp('timeout').interval);
        if(Ext.getCmp('b_chk_btn').state === true){
            Ext.getCmp('NFW2_monitor_ips_uid').get_uid();
            Ext.getCmp("NFW2_ips").get_policy_chart('cre');
            monitor_timeout();
        }
    },

    onButtonClick6: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_uid');
        me.btn_time = 300;
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));
        clearInterval(Ext.getCmp("NFW2_ips").c_intr);
        delete Ext.getCmp("NFW2_ips").c_intr;

        clearInterval(Ext.getCmp('timeout').interval);
        if(Ext.getCmp('b_chk_btn').state === true){
            Ext.getCmp('NFW2_monitor_ips_uid').get_uid();
            Ext.getCmp("NFW2_ips").get_policy_chart('cre');
            monitor_timeout();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_firewall_order');
        win.show();
    },

    onGridpanelCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp("NFW2_ips");
        var p_uid = {};

        if(cellIndex === 0){

            var chk = document.getElementsByName("uid[]");

            for(var i=0; i<chk.length; i++){
                if(chk[i].checked === true){
                    eval('p_uid.uid_'+chk[i].value+' = true;');
                }else{
                    eval('p_uid.uid_'+chk[i].value+' = false;');
                }
            }
            me.p_uid = p_uid;
            if(Ext.getCmp("b_chk_btn").state === true){
                clearInterval(me.c_intr);
                delete me.c_intr;
                me.get_policy_chart('cre');
            }
        }
    },

    onC_chartAfterRender: function(component, eOpts) {
        var con = Ext.getCmp('c_chart');
        //con.wid = document.body.clientWidth - 150;

        //document.getElementById('ips_chart').style.width = "500px";
    },

    onButtonClick2: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_alarm_setting',{
            edit : "edit"
        });
        win.show();
    },

    onTableExpandbody: function(rowNode, record, expandRow, eOpts) {
        var grid = Ext.getCmp("grid_ips_alarm");
        grid.exp_obj[record.data['@uid']] = true;

        var _len = record.data.detail_list.length;
        if(_len === 0 || !record.data.detail_list){ return false; }

        var theTd = Ext.fly(expandRow).down('td');

        var ar_time = [];
        for(var i=0; i<_len; i++){
            var data = record.data.detail_list[i];

            list = '<td role="gridcell" class="x-grid-cell x-grid-td" style="min-heigth:22px;max-width:10px;">'+data.sip+'('+data.sport+')</td>';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="min-heigth:22px;max-width:10px;">'+data.dip+'('+data.dport+')</td>';
            var pri = data.priority;
            var img = (pri===1)?'critical':(pri===2)?'high':(pri===3)?'normal':'low';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="min-heigth:22px;max-width:10px;"><img src="../images/level_'+img+'.png" border="0" height="14" /> '+data.signature_name+'</td>';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="min-heigth:22px;max-width:10px;">'+data.count+'/'+byteConvert(data.bytes)+'</td>';
            ar_time.push('<tr role="row" class="x-grid-row  x-grid-data-row x-grid-tpl-tracker">'+list+'</tr>');
        }
        var t_list = '<tr role="row" class="x-grid-row x-grid-data-row x-grid-tpl-tracker">'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:22px;">'+__zen('attacker_port')+'</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:22px;">'+__zen('dest_ports')+'</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:22px;">'+__zen('sig_name')+'</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:22px;">'+__zen('count')+'/Bytes</td>'+
            '</tr>';
        var _tpl = new Ext.XTemplate('<table cellpadding="5" cellspacing="0" style="width:100%;border-collapse:collapse;" class="x-grid-item x_grid_template">'+t_list+ar_time.join('')+'</table>');

        theTd.update(_tpl.apply({
            sip: '',
            dip: ''
        }));
    },

    onTableCollapsebody: function(rowNode, record, expandRow, eOpts) {
        var grid = Ext.getCmp("grid_ips_alarm");
        delete grid.exp_obj[record.data['@uid']];
    },

    onGridpanelAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('grid_ips_alarm');
        me.exp_obj = {};

        me.getView().on('refresh', function (view, eOpts) {
            var grid = Ext.getCmp('grid_ips_alarm');
            var store = grid.getStore();
            var exp_obj = grid.exp_obj;

            var expander = grid.getPlugin('expander_grid4');

            for(var i = 0; i < store.getCount(); i++) {
                var record = store.getAt(i);
                var _id = store.find('@uid',record.data['@uid']);

                if(exp_obj[record.data['@uid']]){
                    expander.toggleRow(_id,record);
                }
            }
        });
    },

    onBtn_att_moreClick: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_ips");
        var max = me.att_max;

        var count = (max===5)?30:60;

        me.att_max = count;
        button.hide();
    },

    onContainerBeforeRender: function(component, eOpts) {
        var list = '<table cellspacing="0" cellpadding="7 10 7 10" style="height:30px;width:100%"><tr>'+
            '<td width="35" class="x-column-header" style="position:static">N</td>'+
            '<td width="50%" class="x-column-header" style="position:static">'+__zen('attacker')+'</td>'+
            '<td width="20%" class="x-column-header" style="position:static">'+__zen('detect')+'</td>'+
            '<td width="20%" class="x-column-header" style="position:static">'+__zen('block')+'</td>'+
            '</tr></table>';

        component.update(list);
    },

    onBtn_sport_moreClick: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_ips");
        var max = me.sport_max;

        var count = (max===5)?30:60;

        me.sport_max = count;
        button.hide();
    },

    onContainerBeforeRender1: function(component, eOpts) {
        var list = '<table cellspacing="0" cellpadding="7 10 7 10" style="height:30px;width:100%"><tr>'+
            '<td width="35" class="x-column-header" style="position:static">N</td>'+
            '<td width="22%" class="x-column-header" style="position:static;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:10px;">'+__zen('protocol')+'</td>'+
            '<td width="24%" class="x-column-header" style="position:static;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:10px;">'+__zen('attack_port')+'</td>'+
            '<td width="22%" class="x-column-header" style="position:static;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:10px;">'+__zen('detect')+'</td>'+
            '<td width="22%" class="x-column-header" style="position:static;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:10px;">'+__zen('block')+'</td>'+
            '</tr></table>';

        component.update(list);
    },

    onBtn_detect_moreClick: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_ips");
        var max = me.detect_max;

        var count = (max===5)?30:60;

        me.detect_max = count;
        button.hide();
    },

    onContainerBeforeRender11: function(component, eOpts) {
        var list = '<table cellspacing="0" cellpadding="7 10 7 10" style="height:30px;width:100%"><tr>'+
            '<td width="35" class="x-column-header" style="position:static">N</td>'+
            '<td width="60%" class="x-column-header" style="position:static">'+__zen('signature_name')+'</td>'+
            '<td width="15%" class="x-column-header" style="position:static">'+__zen('detect')+'</td>'+
            '<td width="15%" class="x-column-header" style="position:static">'+__zen('block')+'</td>'+
            '</tr></table>';

        component.update(list);
    },

    onBtn_block_moreClick: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_ips");
        var max = me.block_max;

        var count = (max===5)?30:60;

        me.block_max = count;
        button.hide();
    },

    onContainerBeforeRender111: function(component, eOpts) {
        var list = '<table cellspacing="0" cellpadding="7 10 7 10" style="height:30px;width:100%"><tr>'+
            '<td width="35" class="x-column-header" style="position:static">N</td>'+
            '<td width="60%" class="x-column-header" style="position:static">'+__zen('signature_name')+'</td>'+
            '<td width="15%" class="x-column-header" style="position:static">'+__zen('detect')+'</td>'+
            '<td width="15%" class="x-column-header" style="position:static">'+__zen('block')+'</td>'+
            '</tr></table>';

        component.update(list);
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        Ext.suspendLayouts();
        me.update = 0;

        me.att_max = 5;
        me.sport_max = 5;
        me.detect_max = 5;
        me.block_max = 5;

        me.src_time = 0;
        me.sport_time = 0;
        me.detect_time = 0;
        me.block_time = 0;
        me.btn_time = 5;

        var _data = [];
        var _mem = {};

        Ext.Ajax.request({
            url : '/getRemoteAddress',
            method : 'POST',
            success : function(response, opts){

                me.clientIp = Ext.decode(response.responseText).remoteAddress;
            }
        });

        clearInterval(Ext.getCmp("timeout").interval);

        me.myChart = echarts.init(document.getElementById('ips_chart'),'macarons');

        var win = Ext.create('NFW2.view.NFW2_monitor_ips_uid',{
            mode : 'board'
        });

        Ext.getCmp("con_policy_filter").add(win);

        var _param = {
            'basename': Ext.encode('mgt_ips_dashboard_policy')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _param,
            function(response){
                //response = {"total":60,"list":[{"_last_where":"10.31.1.190","@uid":52,"@use":"off","basename":"firewall_filter_ipv4","@num":40,"_id":"5570eda8adff8501b5375c4b"},{"_last_where":"10.31.1.190","@uid":53,"@use":"on","basename":"firewall_filter_ipv4","@num":41,"_id":"5570eda8adff8501b5375c4c"},{"_last_where":"10.31.1.190","@uid":54,"@use":"off","basename":"firewall_filter_ipv4","@num":42,"_id":"5570eda8adff8501b5375c4d"},{"_last_where":"10.31.1.190","@uid":55,"@use":"off","basename":"firewall_filter_ipv4","@num":43,"_id":"5570eda8adff8501b5375c4e"},{"_last_where":"10.31.1.190","@uid":136,"@use":"on","basename":"firewall_filter_ipv4","@num":44,"_id":"5570eda8adff8501b5375c4f"},{"_last_where":"10.31.1.190","@uid":137,"@use":"off","basename":"firewall_filter_ipv4","@num":45,"_id":"5570eda8adff8501b5375c50"},{"_last_where":"10.31.1.190","@uid":135,"@use":"off","basename":"firewall_filter_ipv4","@num":46,"_id":"5570eda8adff8501b5375c51"},{"_last_where":"10.31.1.190","@uid":56,"@use":"off","basename":"firewall_filter_ipv4","@num":47,"_id":"5570eda8adff8501b5375c52"},{"_last_where":"10.31.1.190","@uid":57,"@use":"off","basename":"firewall_filter_ipv4","@num":48,"_id":"5570eda8adff8501b5375c53"},{"_last_where":"10.31.1.190","@uid":58,"@use":"off","basename":"firewall_filter_ipv4","@num":49,"_id":"5570eda8adff8501b5375c54"},{"_last_where":"10.31.1.190","@uid":59,"@use":"off","basename":"firewall_filter_ipv4","@num":50,"_id":"5570eda8adff8501b5375c55"},{"_last_where":"10.31.1.190","@uid":60,"@use":"off","basename":"firewall_filter_ipv4","@num":51,"_id":"5570eda8adff8501b5375c56"},{"_last_where":"10.31.1.190","@uid":61,"@use":"off","basename":"firewall_filter_ipv4","@num":52,"_id":"5570eda8adff8501b5375c57"},{"_last_where":"10.31.1.190","@uid":68,"@use":"off","basename":"firewall_filter_ipv4","@num":53,"_id":"5570eda8adff8501b5375c58"},{"_last_where":"10.31.1.190","@uid":69,"@use":"off","basename":"firewall_filter_ipv4","@num":54,"_id":"5570eda8adff8501b5375c59"},{"_last_where":"10.31.1.190","@uid":70,"@use":"off","basename":"firewall_filter_ipv4","@num":55,"_id":"5570eda8adff8501b5375c5a"},{"_last_where":"10.31.1.190","@uid":71,"@use":"off","basename":"firewall_filter_ipv4","@num":56,"_id":"5570eda8adff8501b5375c5b"},{"_last_where":"10.31.1.190","@uid":72,"@use":"off","basename":"firewall_filter_ipv4","@num":57,"_id":"5570eda8adff8501b5375c5c"},{"_last_where":"10.31.1.190","@uid":73,"@use":"off","basename":"firewall_filter_ipv4","@num":58,"_id":"5570eda8adff8501b5375c5d"},{"_last_where":"10.31.1.190","@uid":77,"@use":"off","basename":"firewall_filter_ipv4","@num":59,"_id":"5570eda8adff8501b5375c5e"},{"_last_where":"10.31.1.190","@uid":78,"@use":"off","basename":"firewall_filter_ipv4","@num":60,"_id":"5570eda8adff8501b5375c5f"},{"_last_where":"10.31.1.190","@uid":79,"@use":"off","basename":"firewall_filter_ipv4","@num":61,"_id":"5570eda8adff8501b5375c60"},{"_last_where":"10.31.1.190","@uid":80,"@use":"off","basename":"firewall_filter_ipv4","@num":62,"_id":"5570eda8adff8501b5375c61"},{"_last_where":"10.31.1.190","@uid":81,"@use":"off","basename":"firewall_filter_ipv4","@num":63,"_id":"5570eda8adff8501b5375c62"},{"_last_where":"10.31.1.190","@uid":82,"@use":"off","basename":"firewall_filter_ipv4","@num":64,"_id":"5570eda8adff8501b5375c63"},{"_last_where":"10.31.1.190","@uid":83,"@use":"off","basename":"firewall_filter_ipv4","@num":65,"_id":"5570eda8adff8501b5375c64"},{"_last_where":"10.31.1.190","@uid":84,"@use":"off","basename":"firewall_filter_ipv4","@num":66,"_id":"5570eda8adff8501b5375c65"},{"_last_where":"10.31.1.190","@uid":85,"@use":"off","basename":"firewall_filter_ipv4","@num":67,"_id":"5570eda8adff8501b5375c66"},{"_last_where":"10.31.1.190","@uid":86,"@use":"off","basename":"firewall_filter_ipv4","@num":68,"_id":"5570eda8adff8501b5375c67"},{"_last_where":"10.31.1.190","@uid":87,"@use":"off","basename":"firewall_filter_ipv4","@num":69,"_id":"5570eda8adff8501b5375c68"},{"_last_where":"10.31.1.190","@uid":88,"@use":"off","basename":"firewall_filter_ipv4","@num":70,"_id":"5570eda8adff8501b5375c69"},{"_last_where":"10.31.1.190","@uid":101,"@use":"off","basename":"firewall_filter_ipv4","@num":71,"_id":"5570eda8adff8501b5375c6a"},{"_last_where":"10.31.1.190","@uid":102,"@use":"off","basename":"firewall_filter_ipv4","@num":72,"_id":"5570eda8adff8501b5375c6b"},{"_last_where":"10.31.1.190","@uid":103,"@use":"off","basename":"firewall_filter_ipv4","@num":73,"_id":"5570eda8adff8501b5375c6c"},{"_last_where":"10.31.1.190","@uid":104,"@use":"off","basename":"firewall_filter_ipv4","@num":74,"_id":"5570eda8adff8501b5375c6d"},{"_last_where":"10.31.1.190","@uid":105,"@use":"off","basename":"firewall_filter_ipv4","@num":75,"_id":"5570eda8adff8501b5375c6e"},{"_last_where":"10.31.1.190","@uid":106,"@use":"off","basename":"firewall_filter_ipv4","@num":76,"_id":"5570eda8adff8501b5375c6f"},{"_last_where":"10.31.1.190","@uid":107,"@use":"off","basename":"firewall_filter_ipv4","@num":77,"_id":"5570eda8adff8501b5375c70"},{"_last_where":"10.31.1.190","@uid":108,"@use":"off","basename":"firewall_filter_ipv4","@num":78,"_id":"5570eda8adff8501b5375c71"},{"_last_where":"10.31.1.190","@uid":109,"@use":"off","basename":"firewall_filter_ipv4","@num":79,"_id":"5570eda8adff8501b5375c72"},{"_last_where":"10.31.1.190","@uid":110,"@use":"off","basename":"firewall_filter_ipv4","@num":80,"_id":"5570eda8adff8501b5375c73"},{"_last_where":"10.31.1.190","@uid":111,"@use":"off","basename":"firewall_filter_ipv4","@num":81,"_id":"5570eda8adff8501b5375c74"},{"_last_where":"10.31.1.190","@uid":112,"@use":"off","basename":"firewall_filter_ipv4","@num":82,"_id":"5570eda8adff8501b5375c75"},{"_last_where":"10.31.1.190","@uid":113,"@use":"off","basename":"firewall_filter_ipv4","@num":83,"_id":"5570eda8adff8501b5375c76"},{"_last_where":"10.31.1.190","@uid":114,"@use":"off","basename":"firewall_filter_ipv4","@num":84,"_id":"5570eda8adff8501b5375c77"},{"_last_where":"10.31.1.190","@uid":115,"@use":"off","basename":"firewall_filter_ipv4","@num":85,"_id":"5570eda8adff8501b5375c78"},{"_last_where":"10.31.1.190","@uid":116,"@use":"off","basename":"firewall_filter_ipv4","@num":86,"_id":"5570eda8adff8501b5375c79"},{"_last_where":"10.31.1.190","@uid":117,"@use":"off","basename":"firewall_filter_ipv4","@num":87,"_id":"5570eda8adff8501b5375c7a"},{"_last_where":"10.31.1.190","@uid":118,"@use":"off","basename":"firewall_filter_ipv4","@num":88,"_id":"5570eda8adff8501b5375c7b"},{"_last_where":"10.31.1.190","@uid":119,"@use":"off","basename":"firewall_filter_ipv4","@num":89,"_id":"5570eda8adff8501b5375c7c"},{"_last_where":"10.31.1.190","@uid":120,"@use":"off","basename":"firewall_filter_ipv4","@num":90,"_id":"5570eda8adff8501b5375c7d"},{"_last_where":"10.31.1.190","@uid":121,"@use":"off","basename":"firewall_filter_ipv4","@num":91,"_id":"5570eda8adff8501b5375c7e"},{"_last_where":"10.31.1.190","@uid":139,"@use":"off","basename":"firewall_filter_ipv4","@num":92,"_id":"5570eda8adff8501b5375c7f"},{"_last_where":"10.31.1.190","@uid":140,"@use":"off","basename":"firewall_filter_ipv4","@num":93,"_id":"5570eda8adff8501b5375c80"},{"_last_where":"10.31.1.190","@uid":138,"@use":"off","basename":"firewall_filter_ipv4","@num":94,"_id":"5570eda8adff8501b5375c81"},{"_last_where":"10.31.1.190","@uid":122,"@use":"off","basename":"firewall_filter_ipv4","@num":95,"_id":"5570eda8adff8501b5375c82"},{"_last_where":"10.31.1.190","@uid":123,"@use":"off","basename":"firewall_filter_ipv4","@num":96,"_id":"5570eda8adff8501b5375c83"},{"_last_where":"10.31.1.190","@uid":124,"@use":"off","basename":"firewall_filter_ipv4","@num":97,"_id":"5570eda8adff8501b5375c84"},{"_last_where":"10.31.1.190","@uid":125,"@use":"off","basename":"firewall_filter_ipv4","@num":98,"_id":"5570eda8adff8501b5375c85"},{"_last_where":"10.31.1.190","@uid":126,"@use":"off","basename":"firewall_filter_ipv4","@num":99,"_id":"5570eda8adff8501b5375c86"}]};

                hideLoadMask();

                var p_uid = {};
                var _mem = [];
                for(var i=0; i<response.list.length; i++){
                    if(response.list[i]['@use'] === 'on'){
                        eval('p_uid.uid_'+response.list[i]['@uid']+' = true;');
                        _mem.push(response.list[i]['@uid']);
                    }
                }
                if(response === null || response.total === 0 || _mem.length === 0){
                    var win = Ext.create('NFW2.view.win_firewall_order');
                    win.show();
                }
                console.log(p_uid);

                me.p_uid = p_uid;

                if(Ext.getCmp("pnl_cont")){
                    Ext.getCmp("NFW2_ips").setHeight(Ext.getCmp("pnl_cont").getHeight()-8);
                }

                Ext.getCmp("monitor_ips_uid_grid").setHeight(Ext.getCmp("con_policy_filter").getHeight());
                Ext.getCmp("monitor_ips_uid_grid").maxHeight = Ext.getCmp("con_policy_filter").getHeight()-50;
                Ext.getCmp("grid_ips_alarm").setHeight(Ext.getCmp("con_alarm").getHeight()-50);
                Ext.getCmp("grid_ips_alarm").maxHeight = Ext.getCmp("con_alarm").getHeight()-50;


                var record = [{"priority":{"1":0,"3":0,"2":100.0,"4":0},"ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","profile_id":1,"#text":"ips_profile"},"@uid":17,"detect":{"count":704,"bytes":131994.0},"@num":14,"src":[{"@cid":"c85f4547-ee01-4c97-8a26-a76296097047","@otype":"v4","#text":"EMS PC"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"traffic":{"rx":0,"tx":0},"log_exist":true,"block":{"count":0,"bytes":0}},{"priority":{"1":0,"3":100.0,"2":0,"4":0},"ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","profile_id":1,"#text":"ips_profile"},"@uid":35,"detect":{"count":16,"bytes":1837.0},"@num":23,"src":[{"@cid":"253a3caa-9ad3-435b-b48b-25b813587bfa","@otype":"v4","#text":"IPS PC"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"traffic":{"rx":0,"tx":0},"log_exist":true,"block":{"count":0,"bytes":0}},{"priority":{"1":0,"3":100.0,"2":0,"4":0},"ips":{"@cid":"f126f1e3-7ad3-43c8-a0d4-5fd811a0735b","profile_id":2,"#text":"important_pc"},"@uid":23,"detect":{"count":6,"bytes":1541.0},"@num":20,"src":[{"@cid":"d41c8428-b82e-41ad-b710-ad2f91262cc3","@otype":"v4","#text":"제품기획 PC"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"traffic":{"rx":0,"tx":0},"log_exist":true,"block":{"count":0,"bytes":0}},{"priority":{"1":0,"3":0,"2":100.0,"4":0},"ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","profile_id":1,"#text":"ips_profile"},"@uid":17,"detect":{"count":704,"bytes":131994.0},"@num":14,"src":[{"@cid":"c85f4547-ee01-4c97-8a26-a76296097047","@otype":"v4","#text":"EMS PC"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"traffic":{"rx":0,"tx":0},"log_exist":true,"block":{"count":0,"bytes":0}}];
                //Ext.data.StoreManager.lookup("store_daships_policy").loadData(record);

                var _alarm = [{"@uid":6,"stats":{"priority":3,"count":1,"bytes":1414,"block_type":16},"dest":[{"@cid":"null","@otype":"Any","#text":"Any"}],"detail_list":[{"priority":3,"count":1,"sip":"61.247.193.236","protocol":6,"dport":2776,"bytes":1414.0,"signature_name":"FS MS_EXPLOIT IE Cached_Object ","sport":80,"dip":"10.71.6.100"},{"priority":3,"count":1,"sip":"61.247.193.236","protocol":6,"dport":2776,"bytes":1414.0,"signature_name":"FS MS_EXPLOIT IE Cached_Object ","sport":80,"dip":"10.71.6.100"},{"priority":3,"count":1,"sip":"61.247.193.236","protocol":6,"dport":2776,"bytes":1414.0,"signature_name":"FS MS_EXPLOIT IE Cached_Object ","sport":80,"dip":"10.71.6.100"},{"priority":3,"count":1,"sip":"61.247.193.236","protocol":6,"dport":2776,"bytes":1414.0,"signature_name":"FS MS_EXPLOIT IE Cached_Object ","sport":80,"dip":"10.71.6.100"},{"priority":3,"count":1,"sip":"61.247.193.236","protocol":6,"dport":2776,"bytes":1414.0,"signature_name":"FS MS_EXPLOIT IE Cached_Object ","sport":80,"dip":"10.71.6.100"},{"priority":3,"count":1,"sip":"61.247.193.236","protocol":6,"dport":2776,"bytes":1414.0,"signature_name":"FS MS_EXPLOIT IE Cached_Object ","sport":80,"dip":"10.71.6.100"}],"ips":{"@cid":"33afbbdd-5a3b-405f-b0e1-0cdbc8dd0eab","profile_id":4,"#text":"ALL"},"@num":4,"curr_dt":"2015-06-19 15:34:02"}];

                //Ext.data.StoreManager.lookup("store_dashtraffic_alarm").loadData(_alarm);


                var _series = [
                    {
                        name:__zen('all'),
                        type:'line',
                        data: ['',''],
                        symbol:'none',
                        yAxisIndex: 1,
                        smooth:true,
                        clickable: false

                    }
                ];
                var re_mem = [__zen('all')];
                for(var i=0; i<_mem.length; i++){
                    re_mem.push(_mem[i]);
                    _series.push(
                        {
                            name:_mem[i],
                            type:'line',
                            data: ['',''],
                            symbol:'none',
                            yAxisIndex: 0,
                            smooth:true,
                            clickable: false

                        }
                    );
                }

                var time = [];
                var packets = [];

                var _wid = Ext.getCmp("c_chart").getWidth();
                var _hei = Ext.getCmp("c_chart").getHeight();

                var _le = _wid/50;
                var _mem_hei = (_mem.length > _le)?_mem.length/_le*15:15;
                var _regend = _hei-(_mem_hei)-70;

                var option = {
                    legend: {
                        data:re_mem,
                        orient : 'horizontal',
                        x : 'left',
                        y: 'bottom',
                        itemGap: 1,
                        padding: 5,
                        height: 10,
                        textStyle: {fontSize: '8pt'}
                    },
                    dataZoom : {
                        show : true,
                        realtime : true,
                        start : 0,
                        end : 100,
                        height: 15,
                        y: _regend+45
                    },
                    grid : {
                        //width : _wid-140,
                        x: 65,
                        y: 20,
                        height: _regend
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            name : __zen('time'),
                            data : ['',''],
                            axisLabel : {
                                formatter: function(value){
                                    return value;
                                }
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name : __zen('profile_traffic')+'(M)',
                            splitArea : {
                                show:true,
                                areaStyle : {
                                    color: [
                                        'rgba(250,250,250,0.3)',
                                        'rgba(200,200,200,0.3)'
                                    ]
                                }
                            },
                            axisLabel : {
                                formatter: function(value){
                                    var bytes = byteConvert(value);
                                    bytes = (value < 1000)?bytes*0.001:bytes;
                                    return bytes;
                                }
                            },
                            min : 0
                        },
                        {
                            type : 'value',
                            name : __zen('all_traffic')+'(M)',
                            splitArea : {
                                show:false
                            },
                            axisLabel : {
                                formatter: function(value){
                                    var bytes = byteConvert(value);
                                    bytes = (value < 1000)?bytes*0.001:bytes;
                                    return bytes;
                                }
                            },
                            min : 0
                        }
                    ],
                    series : _series,
                    animation : false
                };

                me.myChart.setOption(option);

                document.getElementById('ips_chart').style.width = Ext.getCmp("c_chart").getWidth()+"px";

                me.myChart.resize();
            }
        );

        var _re = [{'num':1,'src':'1.1.1.1','detect':'1.1.1.2','block':'sdfsdfsdfsdfsdfsdfs'},
                   {'num':2,'src':'1.1.1.1','detect':'1.1.1.2','block':''},
                   {'num':3,'src':'1.1.1.1','detect':'1.1.1.2','block':''},
                   {'num':4,'src':'1.1.1.1','detect':'1.1.1.2','block':''},
                   {'num':5,'src':'1.1.1.1','detect':'1.1.1.2','block':''},
                   {'num':6,'src':'1.1.1.1','detect':'1.1.1.2','block':''}];
        //Ext.data.StoreManager.lookup("store_dashtraffic_top1").loadData(_re);

        var _re = [{'num':1,'protocol':'TCP','sport':30,'detect':'detect','block':'block'},
                   {'num':2,'protocol':'TCP','sport':30,'detect':'detect','block':'block'}];
        //Ext.data.StoreManager.lookup("store_dashtraffic_top2").loadData(_re);

        var _re = [{'num':1,'signature_name':'test','priority':3,'detect':'detect','block':'block'},
                   {'num':2,'signature_name':'test','priority':3,'detect':'detect','block':'block'},
                   {'num':3,'signature_name':'test','priority':3,'detect':'detect','block':'block'},
                   {'num':4,'signature_name':'testeeeeeeeeeeeeeeeeeeeeeeeeeee','priority':3,'detect':'detect','block':'block'},
                   {'num':5,'signature_name':'test','priority':3,'detect':'detect','block':'block'},
                   {'num':6,'signature_name':'test','priority':3,'detect':'detect','block':'block'}];
        //Ext.data.StoreManager.lookup("store_dashtraffic_top3").loadData(_re);
        //Ext.data.StoreManager.lookup("store_dashtraffic_top4").loadData(_re);

        Ext.resumeLayouts(true);
    },

    onNFW2_ipsBeforeDestroy: function(component, eOpts) {
        var me = this;

        if(Ext.getCmp("timeout")){
            clearInterval(Ext.getCmp("timeout").interval);
        }
        clearInterval(me.c_intr);
        Ext.data.StoreManager.lookup('store_monitor_ips_uid_list').removeAll();
        Ext.data.StoreManager.lookup('store_daships_policy').removeAll();
        Ext.data.StoreManager.lookup('store_dashtraffic_alarm').removeAll();
        Ext.data.StoreManager.lookup('store_dashtraffic_top1').removeAll();
        Ext.data.StoreManager.lookup('store_dashtraffic_top2').removeAll();
        Ext.data.StoreManager.lookup('store_dashtraffic_top3').removeAll();
        Ext.data.StoreManager.lookup('store_dashtraffic_top4').removeAll();
    },

    onNFW2_ipsResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        var me = Ext.getCmp("NFW2_ips");

        var _wid = Ext.getCmp("c_chart").getWidth();

        var option = {
            grid : {
                width : _wid-140
            }
        };

        document.getElementById('ips_chart').style.width = _wid+"px";
        me.myChart.setOption(option);
        me.myChart.resize();
    },

    get_policy_chart: function(type) {
        var me = Ext.getCmp("NFW2_ips");
        var p_uid = me.p_uid;
        var record = me.record;
        var _id = Ext.getCmp('NFW2_client').clientInfo.userId;
        var _param = {
            'command_name': Ext.encode('mon_ptracker_rule'),
            'args': Ext.encode([_id, me.clientIp])
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execBusyBoxCmd',
            _param,
            function(response){

                if(!response){ return false; }
                var data = [{'time':new Date()}];
                var record_mem = [__zen('all')];
                //response = [{"bps":0,"uid":1},{"bps":0,"uid":2},{"bps":0,"uid":3},{"bps":0,"uid":4},{"bps":0,"uid":5},{"bps":0,"uid":6},{"bps":0,"uid":7},{"bps":0,"uid":11},{"bps":0,"uid":12},{"bps":0,"uid":13},{"bps":0,"uid":14},{"bps":0,"uid":15},{"bps":0,"uid":16},{"bps":141107,"uid":17},{"bps":4972,"uid":18},{"bps":0,"uid":19},{"bps":48718,"uid":20},{"bps":1084,"uid":21},{"bps":0,"uid":22},{"bps":9460,"uid":23},{"bps":0,"uid":24},{"bps":0,"uid":25},{"bps":73702,"uid":26},{"bps":14,"uid":27},{"bps":0,"uid":28},{"bps":0,"uid":29},{"bps":0,"uid":30},{"bps":0,"uid":31},{"bps":23109,"uid":32},{"bps":0,"uid":33},{"bps":0,"uid":34},{"bps":1330,"uid":35},{"bps":2,"uid":36},{"bps":1257,"uid":37},{"bps":50240,"uid":38},{"bps":2,"uid":39},{"bps":0,"uid":40},{"bps":67481,"uid":41},{"bps":0,"uid":42},{"bps":544,"uid":43},{"bps":855,"uid":44},{"bps":597,"uid":45},{"bps":2,"uid":46},{"bps":47437,"uid":47},{"bps":0,"uid":48},{"bps":0,"uid":49},{"bps":7321,"uid":50},{"bps":0,"uid":51},{"bps":0,"uid":52},{"bps":0,"uid":53},{"bps":0,"uid":54},{"bps":0,"uid":55},{"bps":94,"uid":56},{"bps":625,"uid":57},{"bps":0,"uid":58},{"bps":0,"uid":59},{"bps":0,"uid":60},{"bps":51,"uid":61},{"bps":168,"uid":62},{"bps":2901,"uid":63},{"bps":0,"uid":64},{"bps":0,"uid":65},{"bps":6648,"uid":67},{"bps":0,"uid":68},{"bps":0,"uid":69},{"bps":0,"uid":70},{"bps":0,"uid":71},{"bps":0,"uid":72},{"bps":0,"uid":73},{"bps":0,"uid":77},{"bps":0,"uid":78},{"bps":0,"uid":79},{"bps":0,"uid":80},{"bps":0,"uid":81},{"bps":0,"uid":82},{"bps":694,"uid":83},{"bps":183,"uid":84},{"bps":0,"uid":85},{"bps":245,"uid":86},{"bps":3,"uid":87},{"bps":0,"uid":88},{"bps":7061,"uid":92},{"bps":0,"uid":93},{"bps":0,"uid":94},{"bps":156775,"uid":95},{"bps":0,"uid":96},{"bps":0,"uid":97},{"bps":0,"uid":98},{"bps":0,"uid":99},{"bps":0,"uid":100},{"bps":11,"uid":101},{"bps":2,"uid":102},{"bps":0,"uid":103},{"bps":1005,"uid":104},{"bps":0,"uid":105},{"bps":0,"uid":106},{"bps":52,"uid":107},{"bps":0,"uid":108},{"bps":70,"uid":109},{"bps":22,"uid":110},{"bps":3,"uid":111},{"bps":0,"uid":112},{"bps":5,"uid":113},{"bps":0,"uid":114},{"bps":0,"uid":115},{"bps":72,"uid":116},{"bps":0,"uid":117},{"bps":0,"uid":118},{"bps":59,"uid":119},{"bps":0,"uid":120},{"bps":0,"uid":121},{"bps":30,"uid":122},{"bps":0,"uid":123},{"bps":0,"uid":124},{"bps":0,"uid":125},{"bps":0,"uid":126},{"bps":21088,"uid":127},{"bps":18727,"uid":129},{"bps":255,"uid":130},{"bps":0,"uid":131},{"bps":0,"uid":132},{"bps":0,"uid":135},{"bps":0,"uid":136},{"bps":0,"uid":137},{"bps":0,"uid":138},{"bps":19,"uid":139},{"bps":0,"uid":140},{"bps":9683,"uid":141},{"bps":136415,"uid":142},{"bps":19173,"uid":143},{"bps":158,"uid":65535}];

                var a = 0;
                for(var i=0; i<response.length; i++){
                    var _uid = response[i].uid;

                    eval('if(p_uid.uid_'+_uid+'){ record_mem.push("uid_'+_uid+'"); data[0].uid_'+_uid+' = '+response[i].bps+'; a += response[i].bps; }');
                }
                data[0][__zen('all')] = a;
                var time = Ext.Date.format(new Date(),'H:i:s');

                Ext.getCmp("c_chart").set_chart(data,record_mem,type,time);

                if(me.c_intr === undefined){
                    me.c_intr = setInterval(function(){me.get_policy_chart('add');},2000);
                }
            }
        );
        Ext.resumeLayouts(true);
    }

});