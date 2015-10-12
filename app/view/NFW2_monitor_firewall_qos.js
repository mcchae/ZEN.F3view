
Ext.define('NFW2.view.NFW2_monitor_firewall_qos', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_firewall_qos',

    requires: [
        'NFW2.view.NFW2_monitor_firewall_qosViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'nfw2_monitor_firewall_qos'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_firewall_qos',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onNFW2_monitor_firewall_qosBeforeDestroy'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
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
                                            var me = Ext.getCmp('NFW2_monitor_firewall_qos');

                                            me.get_qos();
                                        },
                                        cls: 'dv_timecount',
                                        html: 10,
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
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'lb_m_none',
                                        hidden: true,
                                        id: 'qos_data_error',
                                        bind: {
                                            text: '{nodata_monitor_qos}'
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
                                                    text: '{inter}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick5'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{qos_user}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick4'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{policy}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick3'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{application}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick2'
                                                }
                                            }
                                        ]
                                    },
                                    me.processTop_chk({
                                        xtype: 'cycle',
                                        focusCls: 'btn_f',
                                        cls: 'sel_monitor',
                                        id: 'top_chk',
                                        margin: '0 0 0 10',
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            items: [
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '10',
                                                    focusable: true,
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange7'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '100',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange6'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '1000',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange5'
                                                    }
                                                }
                                            ]
                                        }
                                    })
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                margin: '8 0 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
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
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                            pack: 'end'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                id: 'update_chk',
                                                boxLabel: '업데이트 주기',
                                                listeners: {
                                                    change: 'onUpdate_chkChange'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'update_time1',
                                                margin: '0 0 2 5',
                                                width: 80,
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
                                            }
                                        ]
                                    }
                                ]
                            },
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
                                        xtype: 'container',
                                        width: 65,
                                        items: [
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                text: '초기화',
                                                listeners: {
                                                    click: 'onButtonClick'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        margin: '8 0 0 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                            pack: 'end'
                                        },
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                id: 'monitor_firewall_type_com',
                                                margin: '0 0 0 5',
                                                width: 250,
                                                fieldLabel: '출력 기준',
                                                labelSeparator: ' ',
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: {
                                                    data: [
                                                        {
                                                            value: 'interface',
                                                            name: '인터페이스'
                                                        },
                                                        {
                                                            value: 'qos',
                                                            name: 'QoS 객체'
                                                        },
                                                        {
                                                            value: 'policy',
                                                            name: '정책'
                                                        },
                                                        {
                                                            value: 'application',
                                                            name: '애플리케이션'
                                                        }
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
                                                    afterrender: 'onComboboxAfterRender',
                                                    change: 'onMonitor_firewall_type_comChange',
                                                    expand: 'onMonitor_firewall_type_comExpand'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'monitor_firewall_cnt_com',
                                                margin: '0 0 0 5',
                                                width: 200,
                                                fieldLabel: '출력 개수',
                                                labelSeparator: ' ',
                                                editable: false,
                                                displayField: 'cnt',
                                                queryMode: 'local',
                                                store: {
                                                    data: [
                                                        {
                                                            cnt: '10'
                                                        },
                                                        {
                                                            cnt: '100'
                                                        },
                                                        {
                                                            cnt: '1000'
                                                        }
                                                    ],
                                                    fields: [
                                                        {
                                                            name: 'cnt'
                                                        }
                                                    ]
                                                },
                                                valueField: 'cnt',
                                                listeners: {
                                                    afterrender: 'onMonitore_firewall_time_comAfterRender',
                                                    expand: 'onMonitor_firewall_cnt_comExpand'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                hidden: true,
                                                margin: '0 0 0 5',
                                                text: '검색',
                                                listeners: {
                                                    click: 'onButtonClick1'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                id: 'qos_grid_con',
                                margin: '5 0 0 0',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        id: 'monitor_qos_grid',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        disableSelection: true,
                                        store: 'store_monitor_qos_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp('NFW2_monitor_firewall_qos');

                                                    if(me.btn_type === "qos"){
                                                        var temp = value[1].split(' ');
                                                        var result = "";
                                                        for(var i in temp){
                                                            if(temp[i] !== "que_type"){
                                                                result += " " + temp[i];
                                                            }
                                                        }
                                                        return result;
                                                    }
                                                    else{ return value; }
                                                },
                                                id: 'qos_grid_col1',
                                                minWidth: 85,
                                                align: 'center',
                                                dataIndex: 'interface',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{inter}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var prio_val = ['','높음','중간','낮음'];
                                                    var width = Ext.getCmp('monitor_qos_grid').columns[colIndex].el.dom.clientWidth;

                                                    var result = '<table align="left" style="margin:-2 0 0 0">';

                                                    // if(Ext.getCmp('monitor_firewall_type_com').getValue() === "interface"){
                                                    // }
                                                    // else{

                                                    for(var i in value){
                                                        var type = [value[i]];

                                                        if(type.length > 1){
                                                            result += '<tr><td height="18" style="min-width:'+width+';font-size:12px;margin:0 5 0 0">PRIO</td></tr>';
                                                            for(var j in type){
                                                                if(j !== "0"){ result += '<tr><td height="18" style="min-width:'+width+';font-size:12px">-'+prio_val[j]+"("+type[j].toUpperCase()+")"+'</td></tr>'; }
                                                            }
                                                        }
                                                        else{
                                                            if(type[0] === "total"){
                                                                result += '<tr><td><hr style="min-width:'+width+'px;color:#FEFEFE;margin-left:-15;border-top: 1px solid rgba(0, 0, 0, 0.1);border-bottom: 1px solid rgba(255, 255, 255, 0.3);"/></td></tr>';
                                                                result += '<tr><td height="18" style="min-width:'+width+';font-size:12px">Total</td></tr>';
                                                            }
                                                            else if(type[0] === "default"){ result += '<tr><td height="18" style="min-width:'+width+';font-size:12px">Default</td></tr>'; }
                                                            else{ result += '<tr style="margin:0 0 0 5"><td height="18" style="min-width:'+width+';font-size:12px">' + type[0].toUpperCase() + '</td></tr>'; }
                                                        }
                                                    }
                                                    // }
                                                    result += '</table>';


                                                    return result;
                                                },
                                                minWidth: 85,
                                                align: 'center',
                                                dataIndex: 'type',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{queue_method}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp('NFW2_monitor_firewall_qos');
                                                    var result = '<table align="left" style="margin:-2 0 0 -13">';
                                                    var width = Ext.getCmp('monitor_qos_grid').columns[colIndex].el.dom.clientWidth+5;

                                                    if(me.btn_type === "interface"){
                                                        for(var i =0;i < value.length-1;i++){
                                                            if(record.data.type[i].split(':').length > 1){
                                                                result += '<tr><td height="18" align="center" style="min-width:50px;font-size:12px">'+value[i]+"M"+'</td></tr>';
                                                                result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                                result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                                result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                            }
                                                            else{
                                                                result += '<tr><td height="18" align="center" style="min-width:50px;font-size:12px">'+value[i]+"M"+'</td></tr>';
                                                            }
                                                        }

                                                        //     result += '<tr><td height="18" align="center" style="min-width:50px;font-size:12px">'+value[3]+"M"+'</td></tr>';
                                                        result += '<tr><td><hr style="color:#FEFEFE;margin-left:-2;border-top: 1px solid rgba(0, 0, 0, 0.1);border-bottom: 1px solid rgba(255, 255, 255, 0.3);"/></td></tr>';
                                                        result += '<tr><td height="18" align="center" style="min-width:'+width+'px;font-size:12px">'+value[value.length-1]+"M"+'</td></tr>';
                                                        result += '</table>';
                                                    }
                                                    else{
                                                        result += '<tr><td height="18" align="center" style="min-width:'+width+'px;font-size:12px">'+value+"M"+'</td></tr>';
                                                        result += '</table>';
                                                    }

                                                    return result;
                                                },
                                                minWidth: 85,
                                                align: 'center',
                                                dataIndex: 'minband',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{guarant_band}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp('NFW2_monitor_firewall_qos');
                                                    var result = '<table align="left" style="margin:-2 0 0 -13">';
                                                    var width = Ext.getCmp('monitor_qos_grid').columns[colIndex].el.dom.clientWidth+5;

                                                    if(me.btn_type === "interface"){
                                                        for(var i =0;i < value.length-1;i++){
                                                            if(record.data.type[i].split(':').length > 1){
                                                                result += '<tr><td height="18" align="center" style="min-width:50px;font-size:12px">'+value[i]+"M"+'</td></tr>';
                                                                result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                                result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                                result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                            }
                                                            else{
                                                                result += '<tr><td height="18" align="center" style="min-width:50px;font-size:12px">'+value[i]+"M"+'</td></tr>';
                                                            }
                                                        }

                                                        //     result += '<tr><td height="18" align="center" style="min-width:50px;font-size:12px">'+value[3]+"M"+'</td></tr>';
                                                        result += '<tr><td><hr style="color:#FEFEFE;margin-left:-2;border-top: 1px solid rgba(0, 0, 0, 0.1);border-bottom: 1px solid rgba(255, 255, 255, 0.3);"/></td></tr>';
                                                        result += '<tr><td height="18" align="center" style="min-width:'+width+'px;font-size:12px">'+value[value.length-1]+"M"+'</td></tr>';
                                                        result += '</table>';
                                                    }
                                                    else{
                                                        result += '<tr><td height="18" align="center" style="min-width:'+width+'px;font-size:12px">'+value+"M"+'</td></tr>';
                                                        result += '</table>';
                                                    }

                                                    return result;
                                                },
                                                minWidth: 85,
                                                align: 'center',
                                                dataIndex: 'maxband',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{limit_band}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp('NFW2_monitor_firewall_qos');
                                                    var result = '<table align="left" style="margin:-2 0 0 -13">';
                                                    var width = Ext.getCmp('monitor_qos_grid').columns[colIndex].el.dom.clientWidth+5;

                                                    if(me.btn_type === "interface"){
                                                        for(var i in value){
                                                            if(Number(i) === Number(value.length-1)){
                                                                result += '<tr><td><hr style="color:#FEFEFE;margin-left:-2;border-top: 1px solid rgba(0, 0, 0, 0.1);border-bottom: 1px solid rgba(255, 255, 255, 0.3);"/></td></tr>';
                                                                result += '<tr><td height="18" align="center" style="min-width:'+width+'px;font-size:12px">'+value[i]+'</td></tr>';
                                                            }
                                                            else{ result += '<tr><td height="18" align="center" style="min-width:'+width+'px;font-size:12px">'+value[i]+'</td></tr>'; }
                                                        }
                                                    }
                                                    else{
                                                        for(var i in value){
                                                            result += '<tr><td height="18" align="center" style="min-width:'+width+'px;font-size:12px">'+value[i]+'</td></tr>';
                                                        }
                                                    }

                                                    result += '</table>';

                                                    return result;
                                                },
                                                minWidth: 85,
                                                align: 'center',
                                                dataIndex: 'packet_drop',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{packet_dump}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp('NFW2_monitor_firewall_qos');
                                                    var result = '<table align="left" style="margin:-2 0 0 0">';
                                                    var width = Ext.getCmp('monitor_qos_grid').columns[colIndex].el.dom.clientWidth+15;
                                                    var wid = width - 120;
                                                    var length = value.length-1;

                                                    for(var i in value){
                                                        var val;
                                                        var data = value[i].split(':');
                                                        val = byteConvert(data[0]);

                                                        if(me.btn_type === "interface"){
                                                            if(Number(i) === Number(length)){
                                                                result += '<tr><td></td><td><hr style="color:#FEFEFE;margin-left:-90;border-top: 1px solid rgba(0, 0, 0, 0.1);border-bottom: 1px solid rgba(255, 255, 255, 0.3);min-width:'+width+'px"/></td></tr>';
                                                                result += '<tr><td height="18" style="min-width:70px;font-size:12px">'+val+'</td></tr>';
                                                            }
                                                            else{ result += '<tr><td height="18" style="min-width:70px;font-size:12px">'+val+'</td></tr>'; }

                                                        }
                                                        else{
                                                        result += '<tr><td height="18" style="min-width:70px;font-size:12px">'+val+'</td></tr>';    }
                                                    }

                                                    result += '</table>';

                                                    return result;

                                                    // var bar_g = (value['4'] !== 0)?'<strong class="bar_g" style="width:'+value['4']+'%;border:none"></strong>':'';
                                                    // var bar_b = (value['3'] !== 0)?'<strong class="bar_b" style="width:'+value['3']+'%;border:none"></strong>':'';
                                                    // var bar_r = (value['2'] !== 0)?'<strong class="bar_r" style="width:'+value['2']+'%;border:none"></strong>':'';
                                                    // var bar_rr = (value['1'] !== 0)?'<strong class="bar_rr" style="width:'+value['1']+'%;border:none"></strong>':'';

                                                    // '<div class="graph" style="border-left:1px solid #bdbdbe;">'+bar_g+bar_b+bar_r+bar_rr+'</div>';
                                                },
                                                minWidth: 85,
                                                align: 'center',
                                                dataIndex: 'bps',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{bps_tx}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp('NFW2_monitor_firewall_qos');
                                                    var result = '<table align="left" style="margin:-2 0 0 0">';
                                                    var width = Ext.getCmp('monitor_qos_grid').columns[colIndex].el.dom.clientWidth+15;
                                                    var wid = width - 120;
                                                    var length = value.length-1;

                                                    if(me.btn_type === "interface"){
                                                        for(var i in value){
                                                            if(Number(i) === Number(length)){
                                                                result += '<tr><td></td><td><hr style="color:#FEFEFE;margin-left:-90;border-top: 1px solid rgba(0, 0, 0, 0.1);border-bottom: 1px solid rgba(255, 255, 255, 0.3);min-width:'+width+'px"/></td></tr>';
                                                                result += '<tr><td height="18" style="min-width:70px;font-size:12px">'+value[i]+"%"+'</td><td height="17" style="min-width:70px;font-size:12px"><div class="graph" style="width:'+wid+';border-left:1px solid #bdbdbe;"><strong class="bar_g" style="width:'+value[i]+'%;border:none;"></strong></div></td></tr>';
                                                            }
                                                            else{ result += '<tr><td height="18" style="min-width:70px;font-size:12px">'+value[i]+"%"+'</td><td height="17" style="min-width:70px;font-size:12px"><div class="graph" style="width:'+wid+';border-left:1px solid #bdbdbe;"><strong class="bar_r" style="width:'+value[i]+'%;border:none;"></strong></div></td></tr>'; }
                                                        }
                                                    }
                                                    else{
                                                        //     for(var i in value){

                                                        result += '<tr><td height="18" style="min-width:70px;font-size:12px">'+value[0]+"%"+'</td><td height="17" style="min-width:'+wid+'px;font-size:12px"><div class="graph" style="width:'+wid+';"><strong class="bar_r" style="width:'+value[0]+'%;border:none;"></strong></div></td></tr>';
                                                        //     }
                                                    }
                                                    result += '</table>';

                                                    return result;
                                                },
                                                minWidth: 170,
                                                align: 'center',
                                                dataIndex: 'use_que',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{queue_usage}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                hidden: true,
                                                id: 'qos_grid_col7',
                                                dataIndex: 'interface',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{inter}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp('NFW2_monitor_firewall_qos');
                                                    var result = '<table align="left" style="margin:-2 0 0 -13">';
                                                    var width = Ext.getCmp('monitor_qos_grid').columns[colIndex].el.dom.clientWidth+5;
                                                    if(value[value.length-1] === ""){ value.splice(value.length-1, 1); }
                                                    if(me.btn_type === "interface"){

                                                        for(var i =0;i < value.length;i++){
                                                            var temp = value[i].split(',');
                                                            var temp_sum = [];
                                                            for(var j in temp){
                                                                if(temp[j] !== ""){
                                                                    temp_sum.push(temp[j]);
                                                                }
                                                            }
                                                            if(record.data.type[i].split(':').length > 1){
                                                                if(value[i] === "0"){ result += '<tr><td height="18" style="font-size:12px"></td></tr>'; }
                                                                else{ result += '<tr><td height="18" align="center" style="min-width:50px;font-size:12px">'+value[i]+'</td></tr>'; }
                                                                result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                                result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                                result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                            }
                                                            else{
                                                                if(temp[0] === "0"){ result += '<tr><td height="18" style="font-size:12px"></td></tr>'; }
                                                                else{ result += '<tr><td height="18" align="center" style="min-width:'+width+'px;font-size:12px">'+temp_sum+'</td></tr>'; }
                                                            }

                                                        }

                                                        //     result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                        result += '<tr><td><hr style="color:#FEFEFE;margin-left:-2;border-top: 1px solid rgba(0, 0, 0, 0.1);border-bottom: 1px solid rgba(255, 255, 255, 0.3);"/></td></tr>';
                                                        result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                        result += '</table>';
                                                    }
                                                    else{
                                                        if(value[0] === "0"){ result += '<tr><td height="18" style="font-size:12px"></td></tr>'; }
                                                        else{ result += '<tr><td height="18" align="center" style="min-width:'+width+'px;font-size:12px">'+value+'</td></tr>'; }
                                                        result += '</table>';
                                                    }

                                                    return result;
                                                },
                                                id: 'qos_grid_col8',
                                                minWidth: 85,
                                                align: 'center',
                                                dataIndex: 'policy',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{rule_id}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp('NFW2_monitor_firewall_qos');
                                                    var result = '<table align="left" style="margin:-2 0 0 -13">';
                                                    var width = Ext.getCmp('monitor_qos_grid').columns[colIndex].el.dom.clientWidth+5;
                                                    if(value[value.length-1] === ""){ value.splice(value.length-1, 1); }
                                                    if(me.btn_type === "interface"){
                                                        for(var i =0;i < value.length;i++){
                                                            var temp = value[i].split(',');
                                                            var temp_sum = [];
                                                            for(var j in temp){
                                                                if(temp[j] !== ""){
                                                                    temp_sum.push(temp[j]);
                                                                }
                                                            }

                                                            if(record.data.type[i].split(':').length > 1){
                                                                if(value[i] === "0"){ result += '<tr><td height="18" style="font-size:12px"></td></tr>'; }
                                                                else{ result += '<tr><td height="18" align="center" style="min-width:50px;font-size:12px">'+value[i]+'</td></tr>'; }
                                                                result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                                result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                                result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                            }
                                                            else{
                                                                if(temp[0] === "0"){ result += '<tr><td height="18" style="font-size:12px"></td></tr>'; }
                                                                else{ result += '<tr><td height="18" align="center" style="min-width:'+width+'px;font-size:12px">'+temp_sum+'</td></tr>'; }
                                                            }
                                                        }

                                                        //     result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                        result += '<tr><td><hr style="color:#FEFEFE;margin-left:-2;border-top: 1px solid rgba(0, 0, 0, 0.1);border-bottom: 1px solid rgba(255, 255, 255, 0.3);"/></td></tr>';
                                                        result += '<tr><td height="18" style="font-size:12px"></td></tr>';
                                                        result += '</table>';
                                                    }
                                                    else{
                                                        if(value[0] === "0"){ result += '<tr><td height="18" style="font-size:12px"></td></tr>'; }
                                                        else{ result += '<tr><td height="18" align="center" style="min-width:'+width+'px;font-size:12px">'+value+'</td></tr>'; }
                                                        result += '</table>';
                                                    }

                                                    return result;
                                                },
                                                id: 'qos_grid_col9',
                                                minWidth: 90,
                                                align: 'center',
                                                dataIndex: 'application',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{application}'
                                                }
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

    processTop_chk: function(config) {
        config.prependText = __zen('output_count') + " : ";

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_monitor_firewall_qos');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_qos();
            monitor_timeout();
        }
        else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(5);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(20);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange3: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange4: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(60);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_qos');
        me.btn_type = 'interface';

        Ext.getCmp('qos_grid_col7').hide();
        Ext.getCmp('qos_grid_col9').show();
        Ext.getCmp('monitor_qos_grid').getStore().removeAll();
        Ext.getCmp('qos_grid_col1').setText(__zen('inter'));
        Ext.getCmp('qos_grid_col1').dataIndex = "interface";
        Ext.getCmp('qos_grid_col8').setText(__zen('rule_id'));
        Ext.getCmp('qos_grid_col8').dataIndex = "policy";

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_qos').get_qos();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_qos');
        me.btn_type = 'qos';

        Ext.getCmp('qos_grid_col7').show();
        Ext.getCmp('qos_grid_col9').show();
        Ext.getCmp('monitor_qos_grid').getStore().removeAll();
        Ext.getCmp('qos_grid_col1').setText(__zen('qos_user'));
        Ext.getCmp('qos_grid_col1').dataIndex = "object";
        Ext.getCmp('qos_grid_col8').setText(__zen('rule_id'));
        Ext.getCmp('qos_grid_col8').dataIndex = "policy";

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_qos').get_qos();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_qos');
        me.btn_type = 'policy';

        Ext.getCmp('qos_grid_col7').show();
        Ext.getCmp('qos_grid_col9').show();
        Ext.getCmp('monitor_qos_grid').getStore().removeAll();
        Ext.getCmp('qos_grid_col1').setText(__zen('rule_id'));
        Ext.getCmp('qos_grid_col8').setText(__zen('application'));
        Ext.getCmp('qos_grid_col1').dataIndex = "policy";
        Ext.getCmp('qos_grid_col8').dataIndex = "application";
        Ext.getCmp('qos_grid_col9').hide();

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_qos').get_qos();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_qos');
        me.btn_type = 'application';

        Ext.getCmp('qos_grid_col7').show();
        Ext.getCmp('qos_grid_col9').show();
        Ext.getCmp('monitor_qos_grid').getStore().removeAll();
        Ext.getCmp('qos_grid_col1').setText(__zen('application'));
        Ext.getCmp('qos_grid_col1').dataIndex = "application";
        Ext.getCmp('qos_grid_col8').setText(__zen('rule_id'));
        Ext.getCmp('qos_grid_col8').dataIndex = "policy";
        Ext.getCmp('qos_grid_col9').hide();

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_qos').get_qos();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange7: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_qos');

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_qos').get_qos();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange6: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_qos');

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_qos').get_qos();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange5: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_qos');

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_qos').get_qos();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onUpdate_chkChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_qos');

        if(newValue){
            me.get_qos();
            if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_qos, 5000); }
            if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_qos, 10000); }
            if(Ext.getCmp('update_time').getValue() === "20"){ me.interval = setInterval(me.get_qos, 20000); }
            if(Ext.getCmp('update_time').getValue() === "30"){ me.interval = setInterval(me.get_qos, 30000); }
            if(Ext.getCmp('update_time').getValue() === "60"){ me.interval = setInterval(me.get_qos, 60000); }
        }
        else{
            me.btn_set = false;
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
        // var me = Ext.getCmp('NFW2_monitor_firewall_qos');

        // clearInterval(me.interval);

        // if(Ext.getCmp('update_chk').getValue()){

        // //     if(me.btn_set === true){
        //         me.get_qos();
        //         if(newValue === "5"){ me.interval = setInterval(me.get_qos, 5000); }
        //         if(newValue === "10"){ me.interval = setInterval(me.get_qos, 10000); }
        //         if(newValue === "20"){ me.interval = setInterval(me.get_qos, 20000); }
        //         if(newValue === "30"){ me.interval = setInterval(me.get_qos, 30000); }
        //         if(newValue === "60"){ me.interval = setInterval(me.get_qos, 60000); }
        // //     }
        // }
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('monitor_firewall_type_com').setValue('interface');
        Ext.getCmp('monitor_firewall_cnt_com').setValue('10');
        Ext.getCmp('update_chk').setValue(false);
    },

    onComboboxAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('monitor_firewall_type_com').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("monitor_firewall_type_com").setValue(inter.items[0].data['value']);
        }
    },

    onMonitor_firewall_type_comChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.btn_set = false;
        Ext.getCmp('qos_grid_col9').show();
        Ext.getCmp('monitor_qos_grid').getStore().removeAll();
        // Ext.getCmp('qos_grid_con').hide();

        if(Ext.getCmp('monitor_firewall_type_com').getValue() === "interface"){
            Ext.getCmp('qos_grid_col1').setText('인터페이스');
            Ext.getCmp('qos_grid_col1').dataIndex = "interface";
            Ext.getCmp('qos_grid_col8').setText('정책 ID');
            Ext.getCmp('qos_grid_col8').dataIndex = "policy";
        }
        else if(Ext.getCmp('monitor_firewall_type_com').getValue() === "qos"){
            Ext.getCmp('qos_grid_col1').setText('QoS 객체');
            Ext.getCmp('qos_grid_col1').dataIndex = "object";
            Ext.getCmp('qos_grid_col8').setText('정책 ID');
            Ext.getCmp('qos_grid_col8').dataIndex = "policy";
        }
        else if(Ext.getCmp('monitor_firewall_type_com').getValue() === "policy"){
            Ext.getCmp('qos_grid_col1').setText('정책 ID');
            Ext.getCmp('qos_grid_col8').setText('애플리케이션');
            Ext.getCmp('qos_grid_col1').dataIndex = "policy";
            Ext.getCmp('qos_grid_col8').dataIndex = "application";
            Ext.getCmp('qos_grid_col9').hide();
        }
        else if(Ext.getCmp('monitor_firewall_type_com').getValue() === "application"){
            Ext.getCmp('qos_grid_col1').setText('애플리케이션');
            Ext.getCmp('qos_grid_col1').dataIndex = "application";
            Ext.getCmp('qos_grid_col8').setText('정책 ID');
            Ext.getCmp('qos_grid_col8').dataIndex = "policy";
            Ext.getCmp('qos_grid_col9').hide();
        }
    },

    onMonitor_firewall_type_comExpand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onMonitore_firewall_time_comAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('monitor_firewall_cnt_com').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("monitor_firewall_cnt_com").setValue(inter.items[0].data['cnt']);
        }
    },

    onMonitor_firewall_cnt_comExpand: function(field, eOpts) {
        var me = this;
        me.btn_set = false;
        Ext.getCmp('update_chk').setValue(false);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_qos');
        me.btn_set = true;

        if(Ext.getCmp('update_chk').getValue() === false){
            me.get_qos();
        }
        else{
            clearInterval(me.interval);
            me.get_qos();
            if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_qos, 5000); }
            if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_qos, 10000); }
            if(Ext.getCmp('update_time').getValue() === "20"){ me.interval = setInterval(me.get_qos, 20000); }
            if(Ext.getCmp('update_time').getValue() === "30"){ me.interval = setInterval(me.get_qos, 30000); }
            if(Ext.getCmp('update_time').getValue() === "60"){ me.interval = setInterval(me.get_qos, 60000); }
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.btn_set = false;
        me.btn_type = 'interface';
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
        hideLoadMask();
        // me.get_qos();

        // Ext.getCmp('date_label').setText("최종 수정 시간 : "+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec);
    },

    onNFW2_monitor_firewall_qosBeforeDestroy: function(component, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_qos');
        Ext.data.StoreManager.lookup('store_monitor_qos_list').removeAll();
        clearInterval(Ext.getCmp('timeout').interval);
        // Ext.getCmp('qos_grid_con').hide();
    },

    get_qos: function() {
        var me = Ext.getCmp('NFW2_monitor_firewall_qos');
        var qos_type = me.btn_type;
        var count = Ext.getCmp('top_chk').text.split(' ');
        // Ext.getCmp('qos_grid_con').show();

        if(count !== null){
            var _params = {
                func_name : Ext.encode('mod_monitor_fw_qos_info'),
                args : Ext.encode({'ver':4, 'type':qos_type, 'count':Number(count[3])})
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'execKctrlFunc',
                _params,

                function(response){
                    hideLoadMask();
                    setTimeout(function(){ me.setWidth('100%'); },100);
                    var records = [];

                    var temp = response[1].split('\n');
                    var inter;
                    var type;
                    var minband;
                    var maxband;
                    var drop;
                    var bps;
                    var que_use;
                    var policy;
                    var app;
                    var object = [];
                    var inter_rec = [];
                    if(temp.length === 0){ Ext.getCmp('qos_data_error').show(); }
                    else{ Ext.getCmp('qos_data_error').hide(); }

                    if(qos_type === "interface"){
                        temp.pop();
                        var chk_count = [];
                        var chk = 0;
                        for(var a in temp){
                            var temp2 = temp[a].split(' ');
                            for(var b in temp2){
                                var data = temp2[b].split('=');
                                if(data[0] === "end"){ chk_count.push(chk); chk++; chk = 0;}
                                else if(data[0] === "que_type"){ chk++; }
                            }
                        }
                        chk_count.push(chk);

                        chk = 0;

                        for(var c in chk_count){
                            var inter_temp = [];
                            for(var d = 0;d < chk_count[c];d++){
                                inter_temp.push(temp[chk]);
                                chk++;
                            }
                            chk++;
                            inter_rec.push(inter_temp);
                        }

                        var int_iface = [];
                        var int_que_type = [];
                        var int_que_min = [];
                        var int_que_max = [];
                        var int_drop = [];
                        var int_bps = [];
                        var int_que_use = [];
                        var int_policy = [];
                        var int_app = [];

                        for(var x in inter_rec){
                            for(var y in inter_rec[x]){
                                if(inter_rec[x][y]){
                                    var rec_temp = inter_rec[x][y].split(' ');
                                    for(var w in rec_temp){
                                        var inter_data = rec_temp[w].split('=');
                                        if(qos_type === "interface"){
                                            if(inter_data[0] === "iface"){ int_iface.push(inter_data[1]); }
                                            else if(inter_data[0] === "que_type"){ int_que_type.push(inter_data[1]); }
                                            else if(inter_data[0] === "que_min"){ int_que_min.push(inter_data[1]); }
                                            else if(inter_data[0] === "que_max"){ int_que_max.push(inter_data[1]); }
                                            else if(inter_data[0] === "drop"){ int_drop.push(inter_data[1]); }
                                            else if(inter_data[0] === "bps"){ int_bps.push(inter_data[1]); }
                                            else if(inter_data[0] === "que_use"){ int_que_use.push(inter_data[1]); }
                                            else if(inter_data[0] === "policy"){ int_policy.push(inter_data[1]); }
                                            else if(inter_data[0] === "app"){ int_app.push(inter_data[1]); }
                                        }
                                    }
                                }
                            }
                        }

                        for(var e in chk_count){
                            var que_min_sum = 0;
                            var que_max_sum = 0;
                            var drop_sum = 0;
                            var bps_sum = 0;
                            var use_sum = 0;
                            var inter_type = [];
                            var inter_minband = [];
                            var inter_maxband = [];
                            var inter_drop = [];
                            var inter_bps = [];
                            var inter_use = [];
                            var inter_policy =[];
                            var inter_app = [];
                            for(var f = 0;f < chk_count[e];f++){
                                que_min_sum += Number(int_que_min[f]);
                                que_max_sum += Number(int_que_max[f]);
                                drop_sum += Number(int_drop[f]);
                                bps_sum += Number(int_bps[f]);
                                use_sum += Number(int_que_use[f]);
                                inter_type.push(int_que_type[f]);
                                inter_minband.push(int_que_min[f]);
                                inter_maxband.push(int_que_max[f]);
                                inter_drop.push(int_drop[f]);
                                inter_bps.push(int_bps[f]);
                                inter_use.push(int_que_use[f]);
                                inter_policy.push(int_policy[f]);
                                inter_app.push(int_app[f]);
                            }

                            inter_type.push("total");
                            inter_minband.push(que_min_sum);
                            inter_maxband.push(que_max_sum);
                            inter_drop.push(drop_sum);
                            inter_bps.push(String(bps_sum));
                            inter_use.push(use_sum);

                            if(int_iface[0] !== undefined){
                                records.push({
                                    'interface' : int_iface[e*chk_count[e]],
                                    'type' : inter_type,
                                    'minband' : inter_minband,
                                    'maxband' : inter_maxband,
                                    'packet_drop' : inter_drop,
                                    'bps' : inter_bps,
                                    'use_que' : inter_use,
                                    'policy' : inter_policy,
                                    'application' : inter_app,
                                    'object' : object
                                });
                            }
                        }
                        console.log(records);


                    }
                    else{
                        for(var i in temp){
                            var temp2 = temp[i].split(' ');
                            for(var j in temp2){
                                var data;

                                if(qos_type === "qos"){
                                    data = temp2[j].split('=');
                                    if(data[0] === "que_type"){ type = data[1].split(','); }
                                    else if(data[0] === "que_min"){ minband = data[1].split(','); }
                                    else if(data[0] === "que_max"){ maxband = data[1].split(','); }
                                    else if(data[0] === "drop"){ drop = data[1].split(','); }
                                    else if(data[0] === "bps"){ bps = data[1].split(','); }
                                    else if(data[0] === "que_use"){ que_use = data[1].split(','); }
                                    else if(data[0] === "policy"){ policy = data[1].split(','); }
                                    else if(data[0] === "app"){ app = data[1].split(','); }
                                    else if(data[0] === "qos_obj"){ object = temp[i].split('='); }
                                }
                                else if(qos_type === "policy"){
                                    data = temp2[j].split('=');
                                    if(data[0] === "que_type"){ type = data[1].split(','); }
                                    else if(data[0] === "que_min"){ minband = data[1].split(','); }
                                    else if(data[0] === "que_max"){ maxband = data[1].split(','); }
                                    else if(data[0] === "drop"){ drop = data[1].split(','); }
                                    else if(data[0] === "bps"){ bps = data[1].split(','); }
                                    else if(data[0] === "que_use"){ que_use = data[1].split(','); }
                                    else if(data[0] === "policy"){ policy = data[1].split(','); }
                                    else if(data[0] === "app"){ app = data[1].split(','); }
                                }
                                else if(qos_type === "application"){
                                    data = temp2[j].split('=');
                                    if(data[0] === "que_type"){ type = data[1].split(','); }
                                    else if(data[0] === "que_min"){ minband = data[1].split(','); }
                                    else if(data[0] === "que_max"){ maxband = data[1].split(','); }
                                    else if(data[0] === "drop"){ drop = data[1].split(','); }
                                    else if(data[0] === "bps"){ bps = data[1].split(','); }
                                    else if(data[0] === "que_use"){ que_use = data[1].split(','); }
                                    else if(data[0] === "policy"){ policy = data[1].split(','); }
                                    else if(data[0] === "app"){ app = data[1].split(','); }
                                }
                            }

                            if(temp[i] !== ""){
                                records.push({
                                    'interface' : inter,
                                    'type' : type,
                                    'minband' : minband,
                                    'maxband' : maxband,
                                    'packet_drop' : drop,
                                    'bps' : bps,
                                    'use_que' : que_use,
                                    'policy' : policy,
                                    'application' : app,
                                    'object' : object
                                });
                            }
                        }
                    }

                    //             for(var k in records){
                    //                 var app_temp = records[k].application;
                    //                 if(qos_type === "interface"){
                    //                     var result = [];
                    //                     for(var l in app_temp){
                    //                         var app_result = "";
                    //                         var app_data = app_temp[l].split(',');
                    //                         for(var p in app_data){
                    //                             if(app_data[p] === "0"){ app_result += "0,"; }
                    //                             else{
                    //                                 var _params = {
                    //                                     key : Ext.encode({'sid':app_data[p]})
                    //                                 };

                    //                                 request_helper.xmlrpc_call_JsonP(

                    //                                     'ftuctrl',
                    //                                     'getApplicationName',
                    //                                     _params,
                    //                                     function(response){
                    //                                         app_result += response + ",";
                    //                                     }
                    //                                 );
                    //                             }
                    //                         }
                    //                         result.push(app_result);
                    //                         records[k].application[l] = app_result;
                    //                     }
                    //                 }
                    //                 else{
                    //                     if(app_temp[0] !== "0"){
                    //                         var _params = {
                    //                             key : Ext.encode({'sid':app_temp[0]})
                    //                         };

                    //                         request_helper.xmlrpc_call_JsonP(

                    //                             'ftuctrl',
                    //                             'getApplicationName',
                    //                             _params,
                    //                             function(response){
                    //                                 records[k].application[0] = response;
                    //                             }
                    //                         );
                    //                     }
                    //                 }
                    //             }

                    var store = Ext.data.StoreManager.lookup('store_monitor_qos_list');
                    store.loadData(records);

                }

            );

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

            Ext.getCmp('date_label').setText("최종 수정 시간 : "+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec);
        }


    }

});