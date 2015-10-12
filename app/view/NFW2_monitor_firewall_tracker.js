
Ext.define('NFW2.view.NFW2_monitor_firewall_tracker', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_firewall_tracker',

    requires: [
        'NFW2.view.NFW2_monitor_firewall_trackerViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_monitor_firewall_tracker'
    },
    cls: [
        'zen_body',
        'w_mask'
    ],
    id: 'monitor_tracker',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onMonitor_trackerBeforeDestroy'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        id: 'fm_tracker',
                        header: false,
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
                                            var me = Ext.getCmp('monitor_tracker');

                                            if(me.depth === 0){
                                                me.get_monitor_tracker();
                                            }else if(me.depth === 1){
                                                me.get_monitor_tracker_depth(me._id);
                                            }else if(me.depth === 2){
                                                me.get_monitor_tracker_depth(me._id,me.src,me.dst);
                                            }
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
                                                        checkchange: 'onMenucheckitemCheckChange'
                                                    }
                                                }),
                                                me.processMyCheckItem1({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
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
                                                })
                                            ]
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'lb_m_none',
                                        hidden: true,
                                        id: 'tracker_data_error',
                                        bind: {
                                            text: '{tracker_msg1}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                margin: '10 0 0 10',
                                layout: 'table',
                                items: [
                                    me.processS_sort({
                                        xtype: 'cycle',
                                        focusCls: 'btn_f',
                                        cls: 'sel_monitor',
                                        id: 's_sort',
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 150,
                                            items: [
                                                me.processSort_num({
                                                    xtype: 'menucheckitem',
                                                    id: 'sort_num',
                                                    focusable: true,
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onSort_numCheckChange'
                                                    }
                                                }),
                                                me.processSort_id({
                                                    xtype: 'menucheckitem',
                                                    id: 'sort_id',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onSort_idCheckChange'
                                                    }
                                                }),
                                                {
                                                    xtype: 'menucheckitem',
                                                    id: 'sort_bps',
                                                    text: 'BPS',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onSort_bpsCheckChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    id: 'sort_cps',
                                                    text: 'CPS',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onSort_cpsCheckChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    id: 'sort_pps',
                                                    text: 'PPS',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onSort_ppsCheckChange'
                                                    }
                                                },
                                                me.processSort_bytes({
                                                    xtype: 'menucheckitem',
                                                    id: 'sort_bytes',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange8'
                                                    }
                                                }),
                                                me.processMyCheckItem9({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange9'
                                                    }
                                                }),
                                                me.processMyCheckItem10({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange10'
                                                    }
                                                })
                                            ]
                                        }
                                    }),
                                    me.processS_count({
                                        xtype: 'cycle',
                                        focusCls: 'btn_f',
                                        cls: 'sel_monitor',
                                        id: 's_count',
                                        margin: '0 0 0 10',
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            items: [
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '50',
                                                    focusable: true,
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange3'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '100',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange5'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '200',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange4'
                                                    }
                                                }
                                            ]
                                        }
                                    }),
                                    {
                                        xtype: 'checkboxfield',
                                        id: 'chk_traffic',
                                        checked: true,
                                        listeners: {
                                            change: 'onChk_trafficChange',
                                            beforerender: 'onChk_trafficBeforeRender'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 40',
                                        iconCls: 'icb_filter',
                                        bind: {
                                            text: '{filter_apply}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 10',
                                        iconCls: 'icb_filter_x',
                                        bind: {
                                            text: '{filter_reset}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick1'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                id: 'con_grid',
                                items: [
                                    {
                                        xtype: 'container',
                                        padding: '10 0 10 10',
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
                                                        padding: '3 0 0 0',
                                                        style: 'cursor:pointer',
                                                        bind: {
                                                            text: '{all_policy}'
                                                        }
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onContainerRender'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                hidden: true,
                                                id: 'dep_1',
                                                margin: '0 0 0 5',
                                                style: 'background:url(../images/bul_06.gif) no-repeat',
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        id: 'l_dep1',
                                                        padding: '3 0 0 23',
                                                        style: 'cursor:pointer',
                                                        bind: {
                                                            text: '{advance_policy}'
                                                        }
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onDep_1Render'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                hidden: true,
                                                id: 'dep_2',
                                                margin: '0 0 0 5',
                                                style: 'background:url(../images/bul_06.gif) no-repeat',
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        id: 'l_dep2',
                                                        padding: '3 0 0 23',
                                                        bind: {
                                                            text: '{session}'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        padding: '0 0 5 10',
                                        items: [
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                iconCls: 'icb_del',
                                                bind: {
                                                    text: '{del_session}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick2'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        id: 'grid_list',
                                        title: '',
                                        columnLines: true,
                                        sortableColumns: false,
                                        store: 'store_monitor_tracker_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                id: 'c_num',
                                                dataIndex: 'num',
                                                flex: 0.5,
                                                bind: {
                                                    text: '{priority_level}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp("monitor_tracker");

                                                    if(record.data.action === "Accept" || me.action === "Accept"){
                                                        metaData.style = "color:#358ac8;font-weight:bold;";
                                                    }else if(record.data.action === "IPSec" || me.action === "IPSec"){
                                                        metaData.style = "color:green;font-weight:bold;";
                                                    }else{
                                                        metaData.style = "color:red;font-weight:bold;";
                                                    }
                                                    if(me.depth === 0){
                                                        metaData.style += "cursor:pointer";
                                                    }

                                                    return value;
                                                },
                                                dataIndex: 'uid',
                                                flex: 0.6,
                                                bind: {
                                                    text: '{rule_id}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp("monitor_tracker");
                                                    var _country = me._country;
                                                    metaData.style = 'text-align:left;';

                                                    if(me.depth === 1 || me.depth === 2){

                                                        var text = '';
                                                        var _s_ip = record.data.s_ip;
                                                        var s_ip = '';
                                                        if(_s_ip.indexOf(',')!==-1){
                                                            var _s = _s_ip.split(',');
                                                            s_ip = "<img src='../images/flag/"+_s[0].toLowerCase()+".png' title='["+_s[0]+"] "+_country[_s[0]]+"'/> "+_s[1];
                                                        }else{
                                                            s_ip = record.data.s_ip;
                                                        }

                                                        if(record.data.s_type === "N"){
                                                            return s_ip;
                                                        }
                                                        return record.data.s_addr+' ('+s_ip+')';
                                                    }

                                                    return disp_obj(value);
                                                },
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        flex: 1,
                                                        items: [
                                                            {
                                                                xtype: 'combobox',
                                                                id: 's_stype',
                                                                value: '',
                                                                editable: false,
                                                                displayField: 'name',
                                                                store: 'store_monitor_tracker_stype',
                                                                valueField: 'val',
                                                                flex: 1,
                                                                margin: '0 1 0 -9',
                                                                listeners: {
                                                                    change: function(field, newValue, oldValue, eOptes){
                                                                                        if(newValue === ""){
                                                                                            Ext.getCmp("s_src").disable().show().reset();
                                                                                            Ext.getCmp("s_user").hide().reset();
                                                                                            Ext.getCmp("s_country").hide().reset();
                                                                                        }else if(newValue === "user"){
                                                                                            Ext.getCmp("s_src").hide().reset();
                                                                                            Ext.getCmp("s_user").show().reset();
                                                                                            Ext.getCmp("s_country").hide().reset();
                                                                                        }else if(newValue === "country"){
                                                                                            Ext.getCmp("s_src").hide().reset();
                                                                                            Ext.getCmp("s_user").hide().reset();
                                                                                            Ext.getCmp("s_country").show();
                                                                                        }else{
                                                                                            Ext.getCmp("s_src").enable().show().reset();
                                                                                            Ext.getCmp("s_user").hide().reset();
                                                                                            Ext.getCmp("s_country").hide().reset();
                                                                                        }
                                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                disabled: true,
                                                                id: 's_src',
                                                                flex: 1,
                                                                listeners: {
                                                                    focus: function(component, event, eOpts){
                                                                                        if(Ext.getCmp("s_stype").getValue() === 'ip'){
                                                                                            var str = disp_help_ip('4s');
                                                                                            str += ', '+disp_help_ip('4r');
                                                                                            str += ', '+disp_help_ip('4s2m');
                                                                                            str += ', '+disp_help_ip('4s2p');
                                                                                            component.fieldInfo = str;
                                                                                            setTipFocus(Ext.getCmp('monitor_tracker'), component);
                                                                                        }
                                                                                    },
                                                                    blur: function(component, event, eOpts){
                                                                                        setTipBlur(Ext.getCmp('monitor_tracker'), component);
                                                                                    }
                                                                },
                                                                margin: '0 0 0 -9'
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                hidden: true,
                                                                id: 's_user',
                                                                flex: 1,
                                                                msgTarget: 'none',
                                                                enforceMaxLength: true,
                                                                maxLength: 32,
                                                                margin: '0 0 0 -9'
                                                            },
                                                            {
                                                                xtype: 'combobox',
                                                                id: 's_country',
                                                                hidden: true,
                                                                editable: false,
                                                                emptyText: 'Select',
                                                                matchFieldWidth: false,
                                                                displayField: 'country_desc',
                                                                store: 'store_country_items',
                                                                valueField: 'country_code',
                                                                queryMode: 'local',
                                                                listConfig: {
                                                                    xtype: 'boundlist',
                                                                    style: 'width:400px',
                                                                    itemSelector: 'div',
                                                                    itemTpl: [
                                                                        '{codes}'
                                                                    ]
                                                                },
                                                                flex: 1,
                                                                margin: '0 0 0 -9'
                                                            }
                                                        ]
                                                    }
                                                ],
                                                width: 150,
                                                layout: 'hbox',
                                                sortable: false,
                                                align: 'center',
                                                dataIndex: 'src',
                                                bind: {
                                                    text: '{src}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp("monitor_tracker");
                                                    var _country = me._country;
                                                    metaData.style = 'text-align:left';

                                                    if(me.depth === 1 || me.depth === 2){

                                                        var text = '';
                                                        var _d_ip = record.data.d_ip;
                                                        var d_ip = '';
                                                        if(_d_ip.indexOf(',')!==-1){
                                                            var _d = _d_ip.split(',');
                                                            d_ip = "<img src='../images/flag/"+_d[0].toLowerCase()+".png' title='["+_d[0]+"] "+_country[_d[0]]+"'/> "+_d[1];
                                                        }else{
                                                            d_ip = record.data.d_ip;
                                                        }

                                                        if(record.data.d_type === "N"){
                                                            return d_ip;
                                                        }
                                                        return record.data.d_addr+' ('+d_ip+')';
                                                    }

                                                    return disp_obj(value);
                                                },
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        flex: 1,
                                                        items: [
                                                            {
                                                                xtype: 'combobox',
                                                                id: 's_dtype',
                                                                value: '',
                                                                editable: false,
                                                                displayField: 'name',
                                                                store: 'store_monitor_tracker_type',
                                                                valueField: 'val',
                                                                flex: 1,
                                                                margin: '0 1 0 -9',
                                                                listeners: {
                                                                    change: function(field, newValue, oldValue, eOptes){
                                                                                        if(newValue === ""){
                                                                                            Ext.getCmp("s_dest").disable().show().reset();
                                                                                            Ext.getCmp("s_dcountry").hide().reset();
                                                                                        }else if(newValue === "country"){
                                                                                            Ext.getCmp("s_dest").hide().reset();
                                                                                            Ext.getCmp("s_dcountry").show().reset();
                                                                                        }else{
                                                                                            Ext.getCmp("s_dest").enable().show().reset();
                                                                                            Ext.getCmp("s_dcountry").hide().reset();
                                                                                        }
                                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                disabled: true,
                                                                id: 's_dest',
                                                                flex: 1,
                                                                msgTarget: 'none',
                                                                enforceMaxLength: true,
                                                                maxLength: 255,
                                                                listeners: {
                                                                    focus: function(component, event, eOpts){
                                                                                        if(Ext.getCmp("s_dtype").getValue() === 'ip'){
                                                                                            var str = disp_help_ip('4s');
                                                                                            str += ', '+disp_help_ip('4r');
                                                                                            str += ', '+disp_help_ip('4s2m');
                                                                                            str += ', '+disp_help_ip('4s2p');
                                                                                            component.fieldInfo = str;
                                                                                            setTipFocus(Ext.getCmp('monitor_tracker'), component);
                                                                                        }
                                                                                    },
                                                                    blur: function(component, event, eOpts){
                                                                                        setTipBlur(Ext.getCmp('monitor_tracker'), component);
                                                                                    }
                                                                },
                                                                margin: '0 0 0 -9'
                                                            },
                                                            {
                                                                xtype: 'combobox',
                                                                id: 's_dcountry',
                                                                editable: false,
                                                                emptyText: 'Select',
                                                                matchFieldWidth: false,
                                                                displayField: 'country_desc',
                                                                store: 'store_country_items',
                                                                valueField: 'country_code',
                                                                queryMode: 'local',
                                                                listConfig: {
                                                                    xtype: 'boundlist',
                                                                    style: 'width:400px',
                                                                    itemSelector: 'div',
                                                                    itemTpl: [
                                                                        '{codes}'
                                                                    ]
                                                                },
                                                                flex: 1,
                                                                margin: '0 0 0 -9'
                                                            }
                                                        ]
                                                    }
                                                ],
                                                width: 150,
                                                layout: 'hbox',
                                                sortable: false,
                                                align: 'center',
                                                dataIndex: 'dest',
                                                bind: {
                                                    text: '{dest}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    return disp_obj(value);
                                                },
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        flex: 1,
                                                        items: [
                                                            {
                                                                xtype: 'combobox',
                                                                id: 's_service',
                                                                value: 'all',
                                                                editable: false,
                                                                displayField: 'name',
                                                                store: 'store_monitor_tracker_service',
                                                                valueField: 'val',
                                                                flex: 1,
                                                                margin: '0 1 0 -9',
                                                                listeners: {
                                                                    change: function(field, newValue, oldValue, eOptes){
                                                                	                    if(newValue === 6 || newValue === 17){
                                                                	                        Ext.getCmp("s_port").enable().reset();
                                                                	                    }else{
                                                                	                        Ext.getCmp("s_port").disable().reset();
                                                                	                    }
                                                                	                }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                disabled: true,
                                                                id: 's_port',
                                                                enforceMaxLength: true,
                                                                maskRe: /[0-9]/,
                                                                maxLength: 5,
                                                                flex: 1,
                                                                margin: '0 0 0 -9',
                                                                fieldInfo: __zen('input_range')+'0 ~ 65535',
                                                                listeners: {
                                                                    focus: function(component, event, eOpts){
                                                                                        setTipFocus(Ext.getCmp("monitor_tracker"),component);
                                                                                    },
                                                                    blur: function(component, event, eOpts){
                                                                                        setTipBlur(Ext.getCmp("monitor_tracker"),component);
                                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ],
                                                id: 'c_service',
                                                width: 130,
                                                layout: 'hbox',
                                                sortable: false,
                                                align: 'center',
                                                dataIndex: 'service',
                                                bind: {
                                                    text: '{service}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<button class="icf_'+value+'" style="border:none"></button>';
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        id: 's_action',
                                                        flex: 1,
                                                        value: 'all',
                                                        editable: false,
                                                        displayField: 'name',
                                                        queryMode: 'local',
                                                        store: 'store_monitor_tracker_action',
                                                        valueField: 'val',
                                                        margin: '0 0 0 -9'
                                                    }
                                                ],
                                                id: 'c_action',
                                                width: 60,
                                                layout: 'hbox',
                                                align: 'center',
                                                dataIndex: 'action',
                                                bind: {
                                                    text: '{action}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var t_stat = (record.data.bps_p_tx !== 0)?'width:'+record.data.bps_p_tx+'%':'border:none';
                                                    var bar_g = '<strong class="bar_g" style="'+t_stat+'"></strong>';

                                                    var r_stat = (record.data.bps_p_rx !== 0)?'width:'+record.data.bps_p_rx+'%':'border:none';
                                                    var bar_b = '<strong class="bar_b" style="'+r_stat+'"></strong>';

                                                    var bps_tx = (record.data.bps_tx!=='')?byteConvert(record.data.bps_tx):'';
                                                    var bps_rx = (record.data.bps_rx!=='')?byteConvert(record.data.bps_rx):'';

                                                    return '<div>'+bps_tx+' / '+bps_rx+'</div><div class="graph">'+bar_g+bar_b+'</div>';
                                                },
                                                id: 'c_bps',
                                                align: 'center',
                                                dataIndex: 'bps',
                                                text: 'BPS (TX/RX)',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';

                                                    var r_stat = (record.data.cps_p !== 0)?'width:'+record.data.cps_p+'%':'border:none';
                                                    var bar_r = '<strong class="bar_r" style="'+r_stat+'"></strong>';

                                                    var val = (value!=='')?byteConvert(value):'';

                                                    return '<div>'+val+'</div><div class="graph">'+bar_r+'</div>';
                                                },
                                                id: 'c_cps',
                                                align: 'center',
                                                dataIndex: 'cps',
                                                text: 'CPS',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var t_stat = (record.data.pps_p_tx !== 0)?'width:'+record.data.pps_p_tx+'%':'border:none';
                                                    var bar_g = '<strong class="bar_g" style="'+t_stat+'"></strong>';

                                                    var r_stat = (record.data.pps_p_rx !== 0)?'width:'+record.data.pps_p_rx+'%':'border:none';
                                                    var bar_b = '<strong class="bar_b" style="'+r_stat+'"></strong>';

                                                    var pps_tx = (record.data.pps_tx!=='')?byteConvert(record.data.pps_tx):'';
                                                    var pps_rx = (record.data.pps_rx!=='')?byteConvert(record.data.pps_rx):'';

                                                    return '<div>'+pps_tx+' / '+pps_rx+'</div><div class="graph">'+bar_g+bar_b+'</div>';
                                                },
                                                id: 'c_pps',
                                                align: 'center',
                                                dataIndex: 'pps',
                                                text: 'PPS (TX/RX)',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var pro = getProtocol(Number(value));

                                                    return (pro!=="")?pro:value;
                                                },
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        flex: 1,
                                                        items: [
                                                            {
                                                                xtype: 'combobox',
                                                                id: 'ss_service',
                                                                value: 'all',
                                                                editable: false,
                                                                displayField: 'name',
                                                                store: 'store_monitor_tracker_service',
                                                                valueField: 'val',
                                                                flex: 1,
                                                                listeners: {
                                                                    change: function(field, newValue, oldValue, eOptes){
                                                                	                    if(newValue === 6 || newValue === 17){
                                                                	                        Ext.getCmp("ss_port").enable().reset();
                                                                	                    }else{
                                                                	                        Ext.getCmp("ss_port").disable().reset();
                                                                	                    }
                                                                	                }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ],
                                                hidden: true,
                                                id: 'c_protocol',
                                                minWidth: 80,
                                                align: 'center',
                                                dataIndex: 'proto',
                                                flex: 0.5,
                                                bind: {
                                                    text: '{protocol}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:right';
                                                    return (value==="-")?"":value;
                                                },
                                                hidden: true,
                                                id: 'c_sport',
                                                align: 'center',
                                                dataIndex: 's_port',
                                                flex: 0.5,
                                                bind: {
                                                    text: '{src_port}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var val = value.split(",");
                                                    metaData.style = 'text-align:right';
                                                    return (value === "-")?"":(val.length > 1)?val[1]:value;
                                                },
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        flex: 1,
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                disabled: true,
                                                                id: 'ss_port',
                                                                enforceMaxLength: true,
                                                                maskRe: /[0-9]/,
                                                                maxLength: 5,
                                                                flex: 1,
                                                                margin: '0 0 0 -9',
                                                                fieldInfo: __zen('input_range')+'0 ~ 65535'
                                                            }
                                                        ]
                                                    }
                                                ],
                                                hidden: true,
                                                id: 'c_dport',
                                                minWidth: 80,
                                                align: 'center',
                                                dataIndex: 'd_port_name',
                                                flex: 0.5,
                                                bind: {
                                                    text: '{dest_port}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    var t_stat = (record.data.bytes_p_tx !== 0)?'width:'+record.data.bytes_p_tx+'%':'border:none';
                                                    var bar_g = '<strong class="bar_g" style="'+t_stat+'"></strong>';

                                                    var r_stat = (record.data.bytes_p_rx !== 0)?'width:'+record.data.bytes_p_rx+'%':'border:none';
                                                    var bar_b = '<strong class="bar_b" style="'+r_stat+'"></strong>';

                                                    var bytes_tx = (record.data.bytes_tx!=='')?byteConvert(record.data.bytes_tx):'';
                                                    var bytes_rx = (record.data.bytes_rx!=='')?byteConvert(record.data.bytes_rx):'';

                                                    return '<div>'+bytes_tx+' / '+bytes_rx+'</div><div class="graph">'+bar_g+bar_b+'</div>';
                                                },
                                                id: 'c_byte',
                                                minWidth: 130,
                                                align: 'center',
                                                dataIndex: 'bytes',
                                                flex: 1,
                                                listeners: {
                                                    beforerender: 'onC_byteBeforeRender'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';
                                                    var r_stat = (record.data.sessions_p !== 0)?'width:'+record.data.sessions_p+'%':'border:none';
                                                    var bar_r = '<strong class="bar_r" style="'+r_stat+'"></strong>';

                                                    var val = (value!=='')?byteConvert(value):'';

                                                    return '<div>'+val+'</div><div class="graph">'+bar_r+'</div>';
                                                },
                                                id: 'c_session',
                                                minWidth: 130,
                                                align: 'center',
                                                dataIndex: 'sessions',
                                                flex: 1,
                                                listeners: {
                                                    beforerender: 'onC_sessionBeforeRender'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    var t_stat = (record.data.packets_p_tx !== 0)?'width:'+record.data.packets_p_tx+'%':'border:none';
                                                    var bar_g = '<strong class="bar_g" style="'+t_stat+'"></strong>';

                                                    var r_stat = (record.data.packets_p_rx !== 0)?'width:'+record.data.packets_p_rx+'%':'border:none';
                                                    var bar_b = '<strong class="bar_b" style="'+r_stat+'"></strong>';

                                                    var packets_tx = (record.data.packets_tx!=='')?byteConvert(record.data.packets_tx):'';
                                                    var packets_rx = (record.data.packets_rx!=='')?byteConvert(record.data.packets_rx):'';

                                                    return '<div>'+packets_tx+' / '+packets_rx+'</div><div class="graph">'+bar_g+bar_b+'</div>';
                                                },
                                                id: 'c_packet',
                                                minWidth: 130,
                                                align: 'center',
                                                dataIndex: 'packets',
                                                flex: 1,
                                                listeners: {
                                                    beforerender: 'onC_packetBeforeRender'
                                                }
                                            }
                                        ],
                                        viewConfig: {
                                            loadMask: false
                                        },
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel'
                                        }),
                                        listeners: {
                                            cellclick: 'onGrid_listCellClick',
                                            headerclick: 'onGrid_listHeaderClick'
                                        },
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                dock: 'bottom',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_monitor_tracker_list',
                                                listeners: {
                                                    beforechange: 'onPagingtoolbarBeforeChange'
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
        config.text = '10 '+__zen('sec');

        return config;
    },

    processMyCheckItem1: function(config) {
        config.text = '30 '+__zen('sec');

        return config;
    },

    processMyCheckItem2: function(config) {
        config.text = '60 '+__zen('sec');

        return config;
    },

    processSort_num: function(config) {
        config.text = __zen('priority_level');

        return config;
    },

    processSort_id: function(config) {
        config.text = __zen('rule_id');

        return config;
    },

    processSort_bytes: function(config) {
        config.text = __zen('usage2');

        return config;
    },

    processMyCheckItem9: function(config) {
        config.text = __zen('session');

        return config;
    },

    processMyCheckItem10: function(config) {
        config.text = __zen('packet');

        return config;
    },

    processS_sort: function(config) {
        config.prependText = __zen('align_criteria')+' : ';

        return config;
    },

    processS_count: function(config) {
        config.prependText = __zen('output_count')+' : ';

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('monitor_tracker');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            Ext.data.StoreManager.lookup("store_monitor_tracker_list").currentPage = 1;

            if(me.depth === 0){
                me.get_monitor_tracker();
            }else if(me.depth === 1){
                me.get_monitor_tracker_depth(me._id);
            }else if(me.depth === 2){
                me.get_monitor_tracker_depth(me._id,me.src,me.dst);
            }
            monitor_timeout();
        }else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        Ext.getCmp('timeout').setHtml(60);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onSort_numCheckChange: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_tracker");
        me.sort = 'num';

        if(me.depth === 0){
            me.get_monitor_tracker();
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst);
        }
    },

    onSort_idCheckChange: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_tracker");
        me.sort = 'id';

        if(me.depth === 0){
            me.get_monitor_tracker();
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst);
        }
    },

    onSort_bpsCheckChange: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_tracker");
        me.sort = 'bps';

        if(me.depth === 0){
            me.get_monitor_tracker();
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst);
        }
    },

    onSort_cpsCheckChange: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_tracker");
        me.sort = 'cps';

        if(me.depth === 0){
            me.get_monitor_tracker();
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst);
        }
    },

    onSort_ppsCheckChange: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_tracker");
        me.sort = 'pps';

        if(me.depth === 0){
            me.get_monitor_tracker();
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst);
        }
    },

    onMenucheckitemCheckChange8: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_tracker");
        me.sort = 'bytes';

        if(me.depth === 0){
            me.get_monitor_tracker();
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst);
        }
    },

    onMenucheckitemCheckChange9: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_tracker");
        me.sort = 'sessions';

        if(me.depth === 0){
            me.get_monitor_tracker();
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst);
        }
    },

    onMenucheckitemCheckChange10: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_tracker");
        me.sort = 'packets';

        if(me.depth === 0){
            me.get_monitor_tracker();
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst);
        }
    },

    onMenucheckitemCheckChange3: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_tracker");
        me.count = menucheckitem.text;

        if(me.depth === 0){
            me.get_monitor_tracker();
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst);
        }
    },

    onMenucheckitemCheckChange5: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_tracker");
        me.count = menucheckitem.text;

        if(me.depth === 0){
            me.get_monitor_tracker();
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst);
        }
    },

    onMenucheckitemCheckChange4: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        var me = Ext.getCmp("monitor_tracker");
        me.count = menucheckitem.text;

        if(me.depth === 0){
            me.get_monitor_tracker();
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst);
        }
    },

    onChk_trafficChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp("monitor_tracker");
        me.traffic = (newValue)?'exist':'all';

        if(me.depth === 0){
            me.get_monitor_tracker();
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst);
        }else{
            me.depth = 0;
            me.get_monitor_tracker();
        }
    },

    onChk_trafficBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('tracker_msg2');
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp("monitor_tracker");

        me.btn_filter = true;
    },

    onButtonClick1: function(button, e, eOpts) {
        Ext.getCmp("fm_tracker").getForm().reset();

        var me = Ext.getCmp("monitor_tracker");

        me.btn_filter = false;

        Ext.getCmp("s_src").disable();
        Ext.getCmp("s_dest").disable();
        Ext.getCmp("s_action").enable();
    },

    onContainerRender: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){

            me.depth = 0;
            me.action = '';
            me.src = '';
            me.dst = '';

            Ext.getCmp("chk_btn").state = false;
            Ext.getCmp("chk_btn").moveHandle(false);
            me.onChk_btnChange(Ext.getCmp("chk_btn"));

            me.get_monitor_tracker(1);
        }, component);
    },

    onDep_1Render: function(component, eOpts) {
        var me = this;

        component.getEl().on('click', function(eOpts){

            Ext.getCmp("c_byte").setText(__zen('usage2')+"(TX/RX)");
            Ext.getCmp("c_session").setText(__zen('session'));
            Ext.getCmp("c_packet").setText(__zen('packet')+"(TX/RX)");

            me.depth = 1;
            me.src = '';
            me.dst = '';

            Ext.getCmp("chk_btn").state = false;
            Ext.getCmp("chk_btn").moveHandle(false);
            me.onChk_btnChange(Ext.getCmp("chk_btn"));

            me.get_monitor_tracker_depth(me._id,null,null,1);
        }, component);
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        var obj = [];

        if(grid_chk.length === 0){
            Ext.MessageBox.alert(__weguardia,get_msg('sel_del'));
            return false;
        }else{

            var a_id = [];
            var msg = '';

            for(var i=0; i<grid_chk.length; i++){

                a_id.push(grid_chk[i].data.uid);

                obj.push({
                    'id': Number(grid_chk[i].data.uid),
                    'src': (grid_chk[i].data.s_ip !== '')?grid_chk[i].data.s_ip:null,
                    'dst': (grid_chk[i].data.d_ip !== '')?grid_chk[i].data.d_ip:null,
                    'proto': (grid_chk[i].data.proto !== '')?Number(grid_chk[i].data.proto):null,
                    'sport': (grid_chk[i].data.s_port !== '')?Number(grid_chk[i].data.s_port):null,
                    'dport': (grid_chk[i].data.d_port !== '')?Number(grid_chk[i].data.d_port):null
                });
            }

            if(me.depth === 0){
                msg = msg_tracker(0,a_id.join(", "));
            }else if(me.depth === 1){
                msg = msg_tracker(1,me._id);
            }else{
                msg = msg_tracker(2,me._id);
            }

            Ext.MessageBox.show({
                title: __weguardia,
                msg: msg,
                width: 300,
                buttons: Ext.Msg.YESNO,
                fn: session_del
            });
        }


        function session_del(btn){
            if(btn === "yes"){

                var _params = {
                    func_name: Ext.encode('mod_monitor_fw_ptracker_session_del'),
                    args: Ext.encode({'spec_list':obj})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'execKctrlFunc',
                    _params,
                    function(response){

                        if(me.depth === 0){
                            me.get_monitor_tracker(1);
                        }else{
                            me.get_monitor_tracker_depth(me._id,me.src,me.dst,1);
                        }
                    }
                );
            }
        }

    },

    onC_byteBeforeRender: function(component, eOpts) {
        component.setText(__zen('usage2')+'(TX/RX)');
    },

    onC_sessionBeforeRender: function(component, eOpts) {
        component.setText(__zen('session'));
    },

    onC_packetBeforeRender: function(component, eOpts) {
        component.setText(__zen('packet')+'(TX/RX)');
    },

    onGrid_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp("monitor_tracker");
        Ext.getCmp("chk_btn").state = false;
        Ext.getCmp("chk_btn").moveHandle(false);
        me.onChk_btnChange(Ext.getCmp("chk_btn"));

        if(cellIndex === 0){
            me.timer = 0;

        }else if((me.depth === 0 && cellIndex === 2) || (me.depth > 0 && cellIndex === 1)){

            var win = Ext.create('NFW2.view.win_ipv4SPD',{
                edit : "edit",
                uid  : record.data.uid,
                num  : record.data.uid,
                modal : true,
                mode: 'tracker',
                license : me.license
            });
            win.show();
        }else{

            if(record.data.action === "Deny"){
                Ext.MessageBox.alert(__weguardia,__zen('tracker_msg3'));
                return false;
            }

            Ext.getCmp("c_num").hide();
            if(me.depth === 0){

                me.depth = 1;
                me._id = record.data.uid;
                me.action = record.data.action;
                Ext.getCmp("l_dep1").setText(__zen('advance_policy')+' ('+__zen('rule_id')+' '+record.data.uid+')');

                me.get_monitor_tracker_depth(record.data.uid,null,null,1);

            }else if(me.depth === 1){

                var _country = me._country;
                me.depth = 2;
                me.src = record.data.s_ip;
                me.dst = record.data.d_ip;

                var _scountry = '', _dcountry = '', _sip = record.data.s_ip, _dip = record.data.d_ip;
                if(record.data.s_ip.indexOf(',')!==-1){
                    var _s = record.data.s_ip.split(',');

                    _scountry = "<img src='../images/flag/"+_s[0].toLowerCase()+".png' title='["+_s[0]+"] "+_country[_s[0]]+"'/> ";
                    _sip = _scountry+_s[1];
                }
                if(record.data.s_type === "D"){
                    _sip = record.data.s_addr+'('+_sip+')';
                }
                if(record.data.d_ip.indexOf(',')!==-1){
                    var _d = record.data.d_ip.split(',');

                    _dcountry = "<img src='../images/flag/"+_d[0].toLowerCase()+".png' title='["+_d[0]+"] "+_country[_d[0]]+"'/> ";
                    _dip = _dcountry+_d[1];
                }
                if(record.data.d_type === "D"){
                    _dip = record.data.d_addr+'('+_dip+')';
                }

                Ext.getCmp("l_dep2").update(__zen('session')+' ['+_sip+' -> '+_dip+']');

                me.get_monitor_tracker_depth(record.data.uid,record.data.s_ip,record.data.d_ip,1);
            }

        }
    },

    onPagingtoolbarBeforeChange: function(pagingtoolbar, page, eOpts) {
        var me = this;

        if(me.depth === 0){
            me.get_monitor_tracker(page);
        }else if(me.depth === 1){
            me.get_monitor_tracker_depth(me._id,null,null,page);
        }else if(me.depth === 2){
            me.get_monitor_tracker_depth(me._id,me.src,me.dst,page);
        }

        return false;
    },

    onGrid_listHeaderClick: function(ct, column, e, t, eOpts) {
        if(column.text === "&#160;"){
            if(Ext.getCmp("chk_btn").state === true){
                Ext.getCmp("chk_btn").toggle();
            }
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();
        clearInterval(timeout.interval);

        me.depth = 0;
        me.action = '';
        me.src = '';
        me.dst = '';
        me.btn_filter = false;
        me.traffic = 'exist';
        me.sort = 'num';
        me.count = 50;

        Ext.getCmp("s_dcountry").hide();
        Ext.getCmp("chk_traffic").show();

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_license_info',
            {},
            function(response){

                hideLoadMask();
                me.license = response.system_module;

                var ipsec = response.system_module.ipsec;

                if(ipsec === "off"){
                    var _store = Ext.data.StoreManager.lookup("store_monitor_tracker_action");

                    _store.removeAt(2);
                }
            }
        );

        Ext.Ajax.request({
            url : '/getRemoteAddress',
            method : 'POST',
            success : function(response, opts){

                me.clientIp = Ext.decode(response.responseText).remoteAddress;
            }
        });

        var _param = {
            start: Ext.encode(0),
            limit: Ext.encode(null)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'findCountryInfo',
            _param,
            function(response){

                var list = response.list;
                var _res = [];
                var _country = {};
                for(var i=0; i<list.length; i++){
                    _country[list[i].country_code] = ((!(list[i].country_desc==="" ||list[i].country_desc===undefined))?list[i].country_desc:"" );
                    _res.push({
                        'country_code': list[i].country_code,
                        'country_desc': list[i].country_desc,
                        'codes': "<img src='../images/flag/"+list[i].country_code.toLowerCase()+".png'/> ["+list[i].country_code+"] "+((!(list[i].country_desc==="" ||list[i].country_desc===undefined))?list[i].country_desc:"" )
                    });
                }

                me._country = _country;
                Ext.data.StoreManager.lookup("store_country_items").loadData(_res);
            }
        );

    },

    onMonitor_trackerBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);
        Ext.data.StoreManager.lookup("store_monitor_tracker_list").removeAll();
    },

    get_monitor_tracker: function(start) {
        Ext.suspendLayouts();
        var me = this;

        Ext.getCmp("sort_num").show();
        Ext.getCmp("sort_id").show();
        Ext.getCmp("sort_bps").show();
        Ext.getCmp("sort_cps").show();
        Ext.getCmp("sort_pps").show();
        Ext.getCmp("s_action").enable();
        Ext.getCmp("chk_traffic").show();

        var act = null, stype = null, src = null, dtype = null, dst = null, proto = null, port = null;
        if(me.btn_filter === true){
            act = (Ext.getCmp("s_action").getValue()==='all')?null:Ext.getCmp("s_action").getValue();
            stype = (Ext.getCmp("s_stype").getValue()==='')?null:Ext.getCmp("s_stype").getValue();
            src = (Ext.getCmp('s_stype').getValue()==='country')?Ext.getCmp("s_country").getValue():(Ext.getCmp("s_stype").getValue()==='user')?Ext.getCmp("s_user").getValue():Ext.getCmp('s_src').getValue();
            dtype = (Ext.getCmp("s_dtype").getValue()==='')?null:Ext.getCmp("s_dtype").getValue();
            dst = (Ext.getCmp('s_dtype').getValue()==='country')?Ext.getCmp("s_dcountry").getValue():Ext.getCmp('s_dest').getValue();
            proto = (Ext.getCmp('s_service').getValue()==="all")?null:Number(Ext.getCmp("s_service").getValue());
            port = (Ext.getCmp("s_port").getValue()==='')?null:Number(Ext.getCmp("s_port").getValue());
        }

        var store = Ext.data.StoreManager.lookup("store_monitor_tracker_list");
        var cp = (start)?start:store.currentPage;

        store.getProxy().url = "/api/ftuctrl/execKctrlFunc";
        store.getProxy().setExtraParam('func_name',Ext.encode('mod_monitor_fw_ptracker_search'));
        store.getProxy().setExtraParam('args',Ext.encode({
            'traffic': me.traffic,
            'sort': me.sort,
            'act': act,
            'stype': stype,
            'src': (src==='')?null:src,
            'dtype': dtype,
            'dst': (dst==='')?null:dst,
            'proto': proto,
            'port': port,
            'user_id':Ext.getCmp('NFW2_client').clientInfo.userId,
            'user_ip':me.clientIp
        }));
        me.mask('Loading...');
        store.getProxy().setExtraParam('limit',Ext.encode(Number(me.count)));
        store.currentPage = cp;
        store.pageSize = Number(me.count);
        store.load({callback : function(records, options, success) {
            if (success) {
                me.unmask();
                setTimeout(function(){ me.setWidth('100%'); },100);
            }
        }});

        Ext.getCmp("c_num").show();
        Ext.getCmp("c_service").show();
        Ext.getCmp("c_action").show();
        Ext.getCmp("c_pps").show();
        Ext.getCmp("c_cps").show();
        Ext.getCmp("c_bps").show();
        Ext.getCmp("c_session").show();

        Ext.getCmp("c_protocol").hide();
        Ext.getCmp("c_sport").hide();
        Ext.getCmp("c_dport").hide();
        Ext.getCmp("dep_1").hide();
        Ext.getCmp("dep_2").hide();

        Ext.getCmp("con_grid").show();

        Ext.resumeLayouts(true);
    },

    get_monitor_tracker_depth: function(id, dsrc, ddst, start) {
        var me = this;
        clearTimeout(this.timer);

        Ext.getCmp("chk_traffic").hide();

        var chk_update = Ext.getCmp("update_chk");
        var update = Ext.getCmp("update");

        var store = Ext.data.StoreManager.lookup("store_monitor_tracker_list");
        var cp = (start)?start:store.currentPage;

        Ext.getCmp("sort_num").hide();
        Ext.getCmp("sort_id").hide();
        Ext.getCmp("sort_bps").hide();
        Ext.getCmp("sort_cps").hide();
        Ext.getCmp("sort_pps").hide();
        Ext.getCmp("s_action").disable();

        if(me.sort !== "bytes" && me.sort !== "sessions" && me.sort !== "packets"){
            me.sort = "bytes";
            Ext.getCmp("s_sort").setActiveItem(5);
            return false;
        }

        var act = null, stype = null, src = null, dtype = null, dst = null, proto = null, port = null;
        if(me.btn_filter === true){
            stype = (Ext.getCmp("s_stype").getValue()==='')?null:Ext.getCmp("s_stype").getValue();
            src = (Ext.getCmp('s_stype').getValue()==='country')?Ext.getCmp("s_country").getValue():(Ext.getCmp('s_stype').getValue()==='country')?Ext.getCmp("s_user").getValue():Ext.getCmp('s_src').getValue();
            dtype = (Ext.getCmp("s_dtype").getValue()==='')?null:Ext.getCmp("s_dtype").getValue();
            dst = (Ext.getCmp('s_dtype').getValue()==='country')?Ext.getCmp("s_dcountry").getValue():Ext.getCmp('s_dest').getValue();
            proto = (Ext.getCmp('ss_service').getValue()==="all")?null:Number(Ext.getCmp("ss_service").getValue());
            port = (Ext.getCmp("ss_port").getValue()==='')?null:Number(Ext.getCmp("ss_port").getValue());
        }

        store.getProxy().url = "/api/ftuctrl/execKctrlFunc";
        store.getProxy().setExtraParam('func_name',Ext.encode('mod_monitor_fw_ptracker_depth'));
        store.getProxy().setExtraParam('args',Ext.encode({
            'id': Number(id),
            'src': (dsrc)?dsrc:null,
            'dst': (ddst)?ddst:null,
            'f_sort': me.sort,
            'f_stype': (stype==='')?null:stype,
            'f_src': src,
            'f_dtype': (dtype==='')?null:dtype,
            'f_dst': dst,
            'f_proto': proto,
            'f_port': port,
            'user_id':Ext.getCmp('NFW2_client').clientInfo.userId,
            'user_ip':me.clientIp
        }));
        me.mask('Loading...');
        store.getProxy().setExtraParam('limit',Ext.encode(Number(me.count)));
        store.pageSize = Number(me.count);
        store.currentPage = cp;
        store.load({callback : function(records, options, success) {
            if (success) {
                me.unmask();
                setTimeout(function(){ me.setWidth('100%'); },100);
            }
        }});

        if(dsrc && ddst){

            Ext.getCmp("c_session").hide();

            Ext.getCmp("dep_2").show();
            Ext.getCmp("c_protocol").show();
            Ext.getCmp("c_sport").show();
            Ext.getCmp("c_dport").show();
        }else{

            Ext.getCmp("dep_1").show();

            Ext.getCmp("c_service").hide();
            Ext.getCmp("c_action").hide();
            Ext.getCmp("c_protocol").hide();
            Ext.getCmp("c_sport").hide();
            Ext.getCmp("c_dport").hide();
            Ext.getCmp("dep_2").hide();
            Ext.getCmp("c_pps").hide();
            Ext.getCmp("c_cps").hide();
            Ext.getCmp("c_bps").hide();

            Ext.getCmp("c_session").show();
        }
    }

});