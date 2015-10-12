
Ext.define('NFW2.view.NFW2_monitor_system_memory', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    flex: 1,
    layout: 'fit',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                            height: 40,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    height: 40,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'chk_update',
                                            margin: '0 0 0 5',
                                            labelCls: 'lb_sq',
                                            boxLabel: '업데이트 주기 (초)',
                                            checked: true,
                                            listeners: {
                                                change: {
                                                    fn: me.onChk_updateChange,
                                                    scope: me
                                                }
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
                                                change: {
                                                    fn: me.onCb_update_intervalChange,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            autoScroll: true,
                            title: '메모리',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    height: 40,
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
                                            itemId: 'cb_mem_key',
                                            margin: 5,
                                            maxWidth: 300,
                                            fieldLabel: '데이터',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 60,
                                            value: [
                                                'membuf',
                                                'memcac',
                                                'memfre'
                                            ],
                                            editable: false,
                                            displayField: 'name',
                                            multiSelect: true,
                                            store: 'store_monitor_mem_key',
                                            valueField: 'value',
                                            listeners: {
                                                change: {
                                                    fn: me.onCb_cpu_keyChange1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            hidden: true,
                                            itemId: 'cb_mem_item',
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
                                            multiSelect: true,
                                            store: 'store_monitor_item',
                                            valueField: 'value',
                                            listeners: {
                                                change: {
                                                    fn: me.onCb_cpu_itemChange1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cb_mem_seconds',
                                            margin: 5,
                                            width: 180,
                                            fieldLabel: '시간',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 50,
                                            value: 1800,
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_monitor_seconds',
                                            valueField: 'value',
                                            listeners: {
                                                change: {
                                                    fn: me.onCb_cpu_secondsChange1,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    minHeight: 400,
                                    autoScroll: true,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            border: false,
                                            id: 'pnl_system_mem_chart',
                                            minWidth: 400,
                                            layout: 'fit'
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            id: 'gpn_system_mem',
                                            margin: 10,
                                            width: 300,
                                            overflowX: 'auto',
                                            overflowY: 'auto',
                                            columnLines: true,
                                            store: 'store_monitor_grid',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return "<span style='color:" + record.data.color + ";font-weight: bold;' >"+value+"</span>";

                                                    },
                                                    dataIndex: 'name',
                                                    text: '메모리',
                                                    flex: 1
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
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onViewportAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPanelBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onChk_updateChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_mem();
    },

    onCb_update_intervalChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_mem();
    },

    onCb_cpu_keyChange1: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_mem();
    },

    onCb_cpu_itemChange1: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_mem();
    },

    onCb_cpu_secondsChange1: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.get_rrdFetchLast_mem();


    },

    onViewportAfterRender: function(component, eOpts) {
        component.get_rrdFetchLast_mem();
    },

    onPanelBeforeDestroy: function(component, eOpts) {
        if(Ext.getCmp('pnl_system_mem_chart').items.items[0] !== undefined){

            Ext.getCmp('pnl_system_mem_chart').items.items[0].fireEvent('clearInterval');

            Ext.getCmp('pnl_system_mem_chart').removeAll();

            widet = "";
        }

    },

    get_rrdFetchLast_mem: function() {
        var me = this;

        var _interval = null;

        if(Ext.getCmp('pnl_system_mem_chart').items.items[0] !== undefined){

            Ext.getCmp('pnl_system_mem_chart').items.items[0].fireEvent('clearInterval');

            Ext.getCmp('pnl_system_mem_chart').removeAll();

            widet = "";
        }

        var _seconds = me.down('combobox[itemId="cb_mem_seconds"]').getValue();

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

        var _mem_key = me.down('combobox[itemId="cb_mem_key"]').getValue();
        var _mem_key_name = me.down('combobox[itemId="cb_mem_key"]').getRawValue().split(',');
        var _mem_item = me.down('combobox[itemId="cb_mem_item"]').getValue();

        var toolTipContent = '{_inc}<br>';

        var i,j,k;

        var buf_max, buf_avg, buf_min, cac_max, cac_avg, cac_min, fre_max, fre_avg, fre_min;

        var _data = [];

        var colorSet = ['#C24642', '#7F6084', '#86B402'];

        for(i=0; i<_mem_key_name.length; i++)
        {
            toolTipContent += '<font color=' + colorSet[i] + '>' + _mem_key_name[i] + '</font> : ' + '{' + _mem_key[i] + '} M<br>';
        }

        var _inc, _orig, _label = '';

        var maked_chart = false;

        var _tplList_data = [{
            type : 'line',
            showInLegend: true,
            name: 'swpuse',
            legendText: '사용률',
            markerType: "none",
            toolTipContent: toolTipContent
        }];

        showLoadMask();

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'rrdFetchLast',
            {
                rrd_name : Ext.encode('system_mem'),
                seconds : Ext.encode(_seconds),
                num_dots : Ext.encode(_num_dots)
            },
            function(response){

                hideLoadMask();

                for(i = 0 ; i < response.length ; i++){

                    _orig = response[i];
                    _label = unixTimeConvert(_orig['time'],'HM');

                    _inc = unixTimeConvert(_orig['time']);

                    _data.push({x : null, y : _orig['swpuse']['avg'],
                                membuf : addComma(parseFloat(_orig['membuf']['avg']/1024).toFixed(2)),
                                memcac : addComma(parseFloat(_orig['memcac']['avg']/1024).toFixed(2)),
                                memfre : addComma(parseFloat(_orig['memfre']['avg']/1024).toFixed(2)),
                                membuf_avg : parseFloat(_orig['membuf']['avg']/1024),
                                memcac_avg : parseFloat(_orig['memcac']['avg']/1024),
                                memfre_avg : parseFloat(_orig['memfre']['avg']/1024),
                                label: _label,
                                _inc : _inc});

                }

                var tplList = {
                    graphType : GRAPH_TYPE.CANVAS,
                    widgetTitle : '',
                    drawType : 'line',
                    chartAttr : {
                        axisX : {
                            title : '시간',
                            labelFontSize : 12,
                            titleFontSize : 12,
                            labelFontWeight : 'bold',
                            titleFontWeight : 'bold'
                        },
                        axisY : {
                            title : '사용률(%)',
                            maximum : 100,
                            minimum : 0,
                            labelFontSize : 12,
                            titleFontSize : 12,
                            labelFontWeight : 'bold',
                            titleFontWeight : 'bold'
                        },
                        data : _tplList_data,
                        toolTip:{
                            shared: true
                        },
                        legend : {
                            fontSize : 12
                        },
                        theme : 'theme3'
                    },
                    requestInfo : {
                        getData : function(obj){

                            request_helper.xmlrpc_call_JsonP(
                                'ftuctrl',
                                'rrdFetchLast',
                                {
                                    rrd_name : Ext.encode('system_mem'),
                                    seconds : Ext.encode(me.down('combobox[itemId="cb_update_interval"]').getValue()/1000),
                                    num_dots : Ext.encode(1)
                                },
                                function(response){

                                    var _dataPoints = [];

                                    if(!maked_chart){
                                        maked_chart = true;
                                    }

                                    _orig = response[0];
                                    _label = unixTimeConvert(_orig['time'],'HM');

                                    _inc = unixTimeConvert(_orig['time']);

                                    if(_data.length >= _num_dots)
                                    {
                                        _data.shift();
                                    }

                                    _data.push({x : null, y : _orig['swpuse']['avg'],
                                                membuf : addComma(parseFloat(_orig['membuf']['avg']/1024).toFixed(2)),
                                                memcac : addComma(parseFloat(_orig['memcac']['avg']/1024).toFixed(2)),
                                                memfre : addComma(parseFloat(_orig['memfre']['avg']/1024).toFixed(2)),
                                                membuf_avg : parseFloat(_orig['membuf']['avg']/1024),
                                                memcac_avg : parseFloat(_orig['memcac']['avg']/1024),
                                                memfre_avg : parseFloat(_orig['memfre']['avg']/1024),
                                                label: _label,
                                                _inc : _inc});

                                    for(i=0; i<_data.length; i++)
                                    {
                                        _data[i].x = i;

                                        if(i === 0)
                                        {
                                            buf_max = _data[i].membuf_avg;
                                            buf_avg = _data[i].membuf_avg;
                                            buf_min = _data[i].membuf_avg;
                                            cac_max = _data[i].memcac_avg;
                                            cac_avg = _data[i].memcac_avg;
                                            cac_min = _data[i].memcac_avg;
                                            fre_max = _data[i].memfre_avg;
                                            fre_avg = _data[i].memfre_avg;
                                            fre_min = _data[i].memfre_avg;
                                        }
                                        else
                                        {
                                            if(buf_max < _data[i].membuf_avg)
                                            {
                                                buf_max = _data[i].membuf_avg;
                                            }

                                            if(buf_min > _data[i].membuf_avg)
                                            {
                                                buf_min = _data[i].membuf_avg;
                                            }

                                            if(cac_max < _data[i].memcac_avg)
                                            {
                                                cac_max = _data[i].memcac_avg;
                                            }

                                            if(cac_min > _data[i].memcac_avg)
                                            {
                                                cac_min = _data[i].memcac_avg;
                                            }

                                            if(fre_max < _data[i].memfre_avg)
                                            {
                                                fre_max = _data[i].memfre_avg;
                                            }

                                            if(fre_min > _data[i].memfre_avg)
                                            {
                                                fre_min = _data[i].memfre_avg;
                                            }

                                            buf_avg += _data[i].membuf_avg;
                                            cac_avg += _data[i].memcac_avg;
                                            fre_avg += _data[i].memfre_avg;
                                        }
                                    }

                                    buf_avg = parseFloat(buf_avg/_data.length);
                                    cac_avg = parseFloat(cac_avg/_data.length);
                                    fre_avg = parseFloat(fre_avg/_data.length);

                                    var _gridArray = [];

                                    for(j=0; j<_mem_key.length; j++)
                                    {
                                        switch(_mem_key[j])
                                        {
                                            case 'membuf':
                                                _gridArray.push({
                                                    "name": _mem_key_name[j],
                                                    "max": buf_max.toFixed(2),
                                                    "avg":  buf_avg.toFixed(2),
                                                    "min": buf_min.toFixed(2),
                                                    "color": colorSet[j]
                                                });
                                                break;
                                            case 'memcac':
                                                _gridArray.push({
                                                    "name": _mem_key_name[j],
                                                    "max": cac_max.toFixed(2),
                                                    "avg":  cac_avg.toFixed(2),
                                                    "min": cac_min.toFixed(2),
                                                    "color": colorSet[j]
                                                });
                                                break;
                                            case 'memfre':
                                                _gridArray.push({
                                                    "name": _mem_key_name[j],
                                                    "max": fre_max.toFixed(2),
                                                    "avg":  fre_avg.toFixed(2),
                                                    "min": fre_min.toFixed(2),
                                                    "color": colorSet[j]
                                                });
                                                break;
                                        }
                                    }

                                    Ext.getCmp('gpn_system_mem').getStore().loadData(_gridArray);

                                    _dataPoints.push(_data);

                                    obj.setData(obj, _dataPoints, 20);

                                    var time = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                                    Ext.getCmp("l_time").setText("최종수정시간 : "+time);
                                }
                            );
                        }
                    },
                    interval : _interval,
                    name : 'traffic(uctrl)'
                };

                var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

                    var _widgettype = 'Extjs4Canvas';

                    var _attr = {};

                    _attr['graphType'] = drawtype;
                    _attr['chartInfo'] = chartAttr;
                    _attr['requestInfo'] = reqInfo;

                    if(typeof interval !== 'undefined'){
                        _attr['interval'] = interval;
                    }

                    var _item = Ext.create(_widgettype, _attr);

                    return _item;
                };

                if(Ext.getCmp('pnl_system_mem_chart').items.items[0] !== undefined){

                    Ext.getCmp('pnl_system_mem_chart').items.items[0].fireEvent('clearInterval');

                    Ext.getCmp('pnl_system_mem_chart').removeAll();

                    widet = "";
                }

                var widget = makeWidget(tplList.drawType, '메모리_사용량', tplList.chartAttr, tplList.requestInfo, tplList.interval);
                Ext.getCmp('pnl_system_mem_chart').add(widget);
            }
        );
    }

});