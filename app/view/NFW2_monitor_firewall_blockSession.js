
Ext.define('NFW2.view.NFW2_monitor_firewall_blockSession', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_firewall_blocksession',

    requires: [
        'NFW2.view.NFW2_monitor_firewall_blockSessionViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_monitor_firewall_blocksession'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_firewall_blockSession',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforerender: 'onNFW2_monitor_firewall_blockSessionBeforeRender',
        beforedestroy: 'onPanelDestroy'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        header: false,
                        title: 'My Form',
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
                                            var me = Ext.getCmp('NFW2_monitor_firewall_blockSession');

                                            me.get_blocksession();
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
                                        id: 'blsession_data_error',
                                        bind: {
                                            text: '{nodata_monitor_blockses}'
                                        }
                                    }
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
                                        flex: 1,
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
                                                xtype: 'label',
                                                cls: 'lb_sq',
                                                hidden: true,
                                                width: 120,
                                                text: 'IP Type'
                                            },
                                            {
                                                xtype: 'combobox',
                                                hidden: true,
                                                id: 'iptype_com',
                                                width: 130,
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_monitor_iptype',
                                                valueField: 'value',
                                                listeners: {
                                                    afterrender: 'onIptype_comAfterRender',
                                                    change: 'onIptype_comChange'
                                                }
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                id: 'update_chk',
                                                margin: '0 0 0 5',
                                                boxLabel: '업데이트 주기',
                                                listeners: {
                                                    change: 'onUpdate_chkChange'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'update_time1',
                                                margin: '0 0 2 5',
                                                width: 70,
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
                                margin: '10 0 0 10',
                                items: [
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        iconCls: 'icb_filter',
                                        bind: {
                                            text: '{filter_apply}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick2'
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
                                            click: 'onButtonClick'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                margin: '5 0 0 0',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        height: 21,
                                        style: 'background:url(../images/logdata_titlebg.gif); text-align:center; color:#fff;',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                            padding: 3
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                listeners: {
                                                    afterrender: 'onContainerAfterRender'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                listeners: {
                                                    afterrender: 'onContainerAfterRender5'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                listeners: {
                                                    afterrender: 'onContainerAfterRender4'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                listeners: {
                                                    afterrender: 'onContainerAfterRender3'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                listeners: {
                                                    afterrender: 'onContainerAfterRender2'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                listeners: {
                                                    afterrender: 'onContainerAfterRender1'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        margin: '5 0 0 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                flex: 0.2,
                                                id: 'search_session_start1',
                                                margin: '0 0 0 5',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                listeners: {
                                                    focus: 'onSearch_session_startFocus'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                flex: 0.2,
                                                id: 'search_session_dest1',
                                                margin: '0 0 0 5',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                listeners: {
                                                    focus: 'onSearch_session_destFocus'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                flex: 0.2,
                                                id: 'search_session_protocol1',
                                                margin: '0 0 0 5',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_monitor_session_protocol',
                                                valueField: 'value',
                                                listeners: {
                                                    afterrender: 'onSearch_session_protocolAfterRender',
                                                    change: 'onSearch_session_protocolChange',
                                                    expand: 'onSearch_session_protocolExpand'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                flex: 0.2,
                                                id: 'search_session_stport1',
                                                margin: '0 0 0 5',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                listeners: {
                                                    focus: 'onSearch_session_stportFocus'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                flex: 0.2,
                                                id: 'search_session_dtport1',
                                                margin: '0 0 0 5',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                listeners: {
                                                    focus: 'onSearch_session_dtportFocus'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                flex: 0.2,
                                                id: 'search_session_desc1',
                                                margin: '0 0 0 5',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_monitor_session_class',
                                                valueField: 'value',
                                                listeners: {
                                                    afterrender: 'onSearch_session_descAfterRender',
                                                    expand: 'onSearch_session_descExpand'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                margin: '5 0 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch',
                                    pack: 'end'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        width: 100,
                                        text: '검색',
                                        listeners: {
                                            click: 'onButtonClick1'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                margin: '8 0 10 0',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        id: 'grid_ipv4',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        store: 'store_monitor_session_v4_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                style: 'padding-bottom:29;',
                                                width: 60,
                                                align: 'center',
                                                dataIndex: '@num',
                                                text: 'N'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'search_src',
                                                    margin: '16 1 1 -9',
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9.]/,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    var str = disp_help_ip('4s');
                                                    component.fieldInfo = str;
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_firewall_blockSession'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_firewall_blockSession'), component);
                                                    }
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'start',
                                                flex: 0.2,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{src}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === "0"){ return ""; }
                                                    else{ return value; }
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'search_srcport',
                                                    margin: '16 1 1 -9',
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9.]/,
                                                    fieldInfo: '입력범위 : 1 ~ 65535',
                                                    enforceMaxLength: true,
                                                    maxLength: 5,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_firewall_blockSession'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_firewall_blockSession'), component);
                                                    }
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'strport',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{src_port}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'search_dst',
                                                    margin: '16 1 1 -9',
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9.]/,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    var str = disp_help_ip('4s');
                                                    component.fieldInfo = str;
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_firewall_blockSession'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_firewall_blockSession'), component);
                                                    }
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'destination',
                                                flex: 0.2,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{dest}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === "0"){ return ""; }
                                                    else{ return value; }
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'search_dstport',
                                                    margin: '16 1 1 -9',
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9.]/,
                                                    fieldInfo: {
                                                        txt: msg_tip_length(1,
                                                        65535,
                                                        null)
                                                    },
                                                    enforceMaxLength: true,
                                                    maxLength: 5,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_firewall_blockSession'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_firewall_blockSession'), component);
                                                    }
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'dstport',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{dest_port}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value.toUpperCase();
                                                },
                                                items: {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    id: 'search_protocol',
                                                    margin: '16 1 1 -9',
                                                    editable: false,
                                                    valueField: 'value',
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    value: 'all',
                                                    store: 'store_monitor_session_protocol',
                                                    emptyText: 'seclect'
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'protocol',
                                                flex: 0.15,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{protocol}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                style: 'padding-bottom:29;',
                                                align: 'center',
                                                dataIndex: 'timeout',
                                                flex: 0.15,
                                                bind: {
                                                    text: '{timeout}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colindex, store, view) {
                                                    var temp = value.split('\n');

                                                    if(temp[0] === "1"){ return "CLI"; }
                                                    else if(temp[0] === "2"){ return "IPS"; }
                                                    else if(temp[0] === "3"){ return "IDS"; }
                                                    else if(temp[0] === "4"){ return "WIPS"; }
                                                    else if(temp[0] === "5"){ return "DDOS"; }
                                                    else if(temp[0] === "6"){ return "APP"; }
                                                    else if(temp[0] === "7"){ return "안티스팸"; }
                                                    else if(temp[0] === "8"){ return "안티바이러스"; }
                                                    else if(temp[0] === "9"){ return "RTM"; }
                                                    else if(temp[0] === "10"){ return "DMC"; }

                                                    return "";
                                                },
                                                items: {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    id: 'search_desc',
                                                    margin: '16 1 1 -9',
                                                    editable: false,
                                                    valueField: 'value',
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    value: 'all',
                                                    store: 'store_monitor_session_class',
                                                    emptyText: 'seclect'
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'desc',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{section}'
                                                }
                                            }
                                        ],
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                doRefresh: function() {
                                                    var me = this,
                                                        current = me.store.currentPage;

                                                    if (me.fireEvent('beforechange', me, current) !== false) {
                                                        //me.store.load(current, me.tbl());
                                                        me.store.currentPage = current;


                                                        Ext.getCmp('NFW2_monitor_firewall_blockSession').get_blocksession();
                                                    }


                                                },
                                                onLoad: function() {
                                                    var me = this,
                                                        pageData,
                                                        currPage,
                                                        pageCount,
                                                        afterText,
                                                        count,
                                                        isEmpty,
                                                        item;

                                                    count = Ext.getCmp('NFW2_monitor_firewall_blockSession').store_data;
                                                    console.log(count);
                                                    isEmpty = count === 0;
                                                    if (!isEmpty) {
                                                        pageData = me.getPageData();
                                                        currPage = pageData.currentPage;
                                                        pageCount = pageData.pageCount;

                                                        if (currPage > pageCount) {
                                                            if (pageCount > 0) {
                                                                me.store.loadPage(pageCount);
                                                            }
                                                            else {
                                                                me.getInputItem().reset();
                                                            }
                                                            return;
                                                        }

                                                        afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1 : pageCount);
                                                    } else {
                                                        currPage = 0;
                                                        pageCount = 0;
                                                        afterText = Ext.String.format(me.afterPageText, 0);
                                                    }

                                                    Ext.suspendLayouts();
                                                    item = me.child('#afterTextItem');
                                                    if (item) {
                                                        item.setText(afterText);
                                                    }
                                                    item = me.getInputItem();
                                                    if (item) {
                                                        item.setDisabled(isEmpty).setValue(currPage);
                                                    }
                                                    me.setChildDisabled('#first', currPage === 1 || isEmpty);
                                                    me.setChildDisabled('#prev', currPage === 1 || isEmpty);
                                                    me.setChildDisabled('#next', currPage === pageCount  || isEmpty);
                                                    me.setChildDisabled('#last', currPage === pageCount  || isEmpty);
                                                    me.setChildDisabled('#refresh', false);
                                                    me.updateInfo();
                                                    Ext.resumeLayouts(true);

                                                    if (!me.calledInternal) {
                                                        me.fireEvent('change', me, pageData || me.emptyPageData);
                                                    }
                                                },
                                                updateInfo: function() {
                                                    var me = this,
                                                        displayItem = me.child('#displayItem'),
                                                        store = me.store,
                                                        pageData = me.getPageData(),
                                                        count, msg;

                                                    if (displayItem) {
                                                        count = pageData.total;
                                                        console.log(pageData);
                                                        if (count === 0) {
                                                            msg = me.emptyMsg;
                                                        } else {
                                                            msg = Ext.String.format(
                                                            me.displayMsg,
                                                            pageData.fromRecord,
                                                            pageData.toRecord,
                                                            pageData.total
                                                            );
                                                        }
                                                        console.log(msg);
                                                        displayItem.setText(msg);
                                                    }
                                                },
                                                getPageData: function() {
                                                    var store = this.store,
                                                        totalCount = store.getTotalCount();

                                                    if(Ext.getCmp('NFW2_monitor_firewall_blockSession').store_data){
                                                        if(Ext.getCmp('NFW2_monitor_firewall_blockSession').store_data !== 0){
                                                            totalCount = Ext.getCmp('NFW2_monitor_firewall_blockSession').store_data;
                                                        }
                                                    }
                                                    else{
                                                        if(totalCount === 1){
                                                            totalCount = 0;
                                                        }
                                                    }

                                                    return {
                                                        total : totalCount,
                                                        currentPage : store.currentPage,
                                                        pageCount: Math.ceil(totalCount / store.pageSize),
                                                        fromRecord: ((store.currentPage - 1) * store.pageSize) + 1,
                                                        toRecord: Math.min(store.currentPage * store.pageSize, totalCount)

                                                    };
                                                },
                                                dock: 'bottom',
                                                id: 'toolbar',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_monitor_session_v4_list'
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

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_monitor_firewall_blockSession');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_blocksession();
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

    onIptype_comAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('iptype_com').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("iptype_com").setValue(inter.items[0].data['value']);
        }
    },

    onIptype_comChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        if(newValue === "v4"){
        //     Ext.getCmp('grid_ipv4').show();
        //     Ext.getCmp('grid_ipv6').hide();
            Ext.data.StoreManager.lookup('store_monitor_session_v4_list').removeAll();
        }
        else{
        //     Ext.getCmp('grid_ipv4').hide();
        //     Ext.getCmp('grid_ipv6').show();
        //     Ext.data.StoreManager.lookup('store_monitor_session_v6_list').removeAll();
        }
    },

    onUpdate_chkChange: function(field, newValue, oldValue, eOpts) {
        // var me = Ext.getCmp('NFW2_monitor_firewall_blockSession');

        // if(me.btnclick){
        //     if(newValue){
        //         me.get_blocksession();
        //         if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_blocksession, 5000); }
        //         if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_blocksession, 10000); }
        //         if(Ext.getCmp('update_time').getValue() === "20"){ me.interval = setInterval(me.get_blocksession, 20000); }
        //         if(Ext.getCmp('update_time').getValue() === "30"){ me.interval = setInterval(me.get_blocksession, 30000); }
        //         if(Ext.getCmp('update_time').getValue() === "60"){ me.interval = setInterval(me.get_blocksession, 60000); }
        //     }
        //     else{
        //         me.btnclick = false;
        //         clearInterval(me.interval);
        //     }
        // }
        // else{
        //     if(newValue){
        //     }
        //     else{
        //         me.btnclick = false;
        //     }
        // }
    },

    onUpdate_timeAfterRender: function(component, eOpts) {
        // var inter = Ext.getCmp('update_time').getStore().data;

        // if(inter.length > 0){
        //     Ext.getCmp("update_time").setValue(inter.items[1].data['time']);
        // }
    },

    onUpdate_timeChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_blockSession');

        clearInterval(me.interval);

        // if(me.btnclick){
            if(Ext.getCmp('update_chk').getValue()){
                if(newValue === "5"){ me.interval = setInterval(me.get_blocksession, 5000); }
                if(newValue === "10"){ me.interval = setInterval(me.get_blocksession, 10000); }
                if(newValue === "20"){ me.interval = setInterval(me.get_blocksession, 20000); }
                if(newValue === "30"){ me.interval = setInterval(me.get_blocksession, 30000); }
                if(newValue === "60"){ me.interval = setInterval(me.get_blocksession, 60000); }
            }
        // }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_blockSession');

        me.btn_filter = true;
        if(Ext.getCmp('chk_btn').state === true){
            me.get_blocksession();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_blockSession');

        me.btn_filter = false;

        Ext.getCmp('search_src').reset();
        Ext.getCmp('search_srcport').reset();
        Ext.getCmp('search_dst').reset();
        Ext.getCmp('search_dstport').reset();
        Ext.getCmp('search_protocol').reset();
        Ext.getCmp('search_desc').reset();

        if(Ext.getCmp('chk_btn').state === true){
            me.get_blocksession();
        }
    },

    onContainerAfterRender: function(component, eOpts) {
        component.update("출발지");
    },

    onContainerAfterRender5: function(component, eOpts) {
        component.update("목적지");
    },

    onContainerAfterRender4: function(component, eOpts) {
        component.update("프로토콜");
    },

    onContainerAfterRender3: function(component, eOpts) {
        component.update("출발지 포트");
    },

    onContainerAfterRender2: function(component, eOpts) {
        component.update("목적지 포트");
    },

    onContainerAfterRender1: function(component, eOpts) {
        component.update("구분");
    },

    onSearch_session_startFocus: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onSearch_session_destFocus: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onSearch_session_protocolAfterRender: function(component, eOpts) {
        // var inter = Ext.getCmp('search_session_protocol').getStore().data;

        // if(inter.length > 0){
        //     Ext.getCmp("search_session_protocol").setValue(inter.items[0].data['name']);
        // }
    },

    onSearch_session_protocolChange: function(field, newValue, oldValue, eOpts) {
        // if(newValue === "tcp" || newValue === "udp"){
        //     Ext.getCmp('search_session_stport').enable();
        //     Ext.getCmp('search_session_dtport').enable();
        // }
        // else{
        //     Ext.getCmp('search_session_stport').reset();
        //     Ext.getCmp('search_session_dtport').reset();
        //     Ext.getCmp('search_session_stport').disable();
        //     Ext.getCmp('search_session_dtport').disable();
        // }
    },

    onSearch_session_protocolExpand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onSearch_session_stportFocus: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onSearch_session_dtportFocus: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onSearch_session_descAfterRender: function(component, eOpts) {
        // var inter = Ext.getCmp('search_session_desc').getStore().data;

        // if(inter.length > 0){
        //     Ext.getCmp("search_session_desc").setValue(inter.items[0].data['name']);
        // }
    },

    onSearch_session_descExpand: function(field, eOpts) {
        // Ext.getCmp('update_chk').setValue(false);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        me.btnclick = true;

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

        clearInterval(me.interval);

        // if(Ext.getCmp('update_chk').getValue()){
        //     me.get_blocksession();
        //     if(me.btnclick){
        //         if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_blocksession, 5000); }
        //         if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_blocksession, 10000); }
        //         if(Ext.getCmp('update_time').getValue() === "30"){ me.interval = setInterval(me.get_blocksession, 30000); }
        //         if(Ext.getCmp('update_time').getValue() === "60"){ me.interval = setInterval(me.get_blocksession, 60000); }
        //     }
        // }
        // else{
            me.get_blocksession();
        // }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.btnclick = false;
        me.btn_filter = false;
        this.fieldInfo = makeZenTip();

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
        setTimeout(function(){ me.setWidth('100%'); },100);
        // Ext.getCmp('date_label').setText("최종 수정 시간 : "+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec);
        // me.get_blocksession();
    },

    onNFW2_monitor_firewall_blockSessionBeforeRender: function(component, eOpts) {
        var me = this;

        me.store_data = 0;
    },

    onPanelDestroy: function(component, eOpts) {
        var me = this;
        Ext.data.StoreManager.lookup('store_monitor_session_v4_list').removeAll();
        // Ext.data.StoreManager.lookup('store_monitor_session_v6_list').removeAll();
        clearInterval(Ext.getCmp('timeout').interval);
    },

    get_blocksession: function() {
        var me = Ext.getCmp('NFW2_monitor_firewall_blockSession');

        var ipver = 4;
        var src = "any";
        var dst = "any";
        var protocol = "any";
        var src_port = "any";
        var dst_port = "any";
        var desc = "any";
        var store2 = Ext.data.StoreManager.lookup('store_monitor_session_v4_list');

        // if(me.btn_filter === true){
        //     if(Ext.getCmp('iptype_com').getValue() === "v4"){ ipver = 4; }
        //     else{ ipver = 6; }
        //     if(Ext.getCmp('search_session_start').getValue() === ""){ src = "any"; }
        //     else{ src = Ext.getCmp('search_session_start').getValue(); }
        //     if(Ext.getCmp('search_session_dest').getValue() === ""){ dst = "any"; }
        //     else{ dst = Ext.getCmp('search_session_dest').getValue(); }
        //     if(Ext.getCmp('search_session_protocol').getValue() === "ALL" || Ext.getCmp('search_session_protocol').getValue() === "all"){ protocol = "any"; }
        //     else{ protocol = Ext.getCmp('search_session_protocol').getValue(); }
        //     if(Ext.getCmp('search_session_stport').getValue() === ""){ src_port = "any"; }
        //     else{ src_port = Ext.getCmp('search_session_stport').getValue(); }
        //     if(Ext.getCmp('search_session_dtport').getValue() === ""){ dst_port = "any"; }
        //     else{ dst_port = Ext.getCmp('search_session_dtport').getValue(); }
        //     if(Ext.getCmp('search_session_desc').getValue() === "ALL" || Ext.getCmp('search_session_desc').getValue() === "all"){ desc = "any"; }
        //     else{ desc = Ext.getCmp('search_session_desc').getValue(); }
        // }

        var _params = {
            func_name: Ext.encode('mod_monitor_fw_block_info'),
            args: Ext.encode({'ver':ipver,'proto':protocol,'src':src,'dst':dst,'sport':src_port,'dport':dst_port,'block':desc,'page':1})
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'execKctrlFunc',
            _params,

            function(response){
                var records = [];

                if(response[1] !== ""){
                    Ext.getCmp('blsession_data_error').hide();
                    for(var i = 1;i < response.length;i++){
                        var temp1 = response[i].split('\n');

                        for(var k = 0;k < temp1.length-1;k++){
                            var rec_temp = [];
                            var data = temp1[k].split(' ');


                            for(var j = 2;j < data.length;j++){


                                var data2 = data[j].split('=');

                                rec_temp.push(data2[1]);
                            }

                            var num = Number(k)+1;
                            records.push({
                                '@num' : num,
                                'protocol' : data[0],
                                'timeout' : data[1],
                                'start' : rec_temp[0],
                                'destination' : rec_temp[1],
                                'strport' : rec_temp[2],
                                'dstport' : rec_temp[3],
                                'policy' : rec_temp[4],
                                'desc' : rec_temp[5]
                            });
                        }
                    }
                    Ext.getCmp('NFW2_monitor_firewall_blockSession').store_data = records.length;
                }
                else{
                    Ext.getCmp('blsession_data_error').show();
                    Ext.getCmp('NFW2_monitor_firewall_blockSession').store_data = 0;
                }
                var store_filter = Ext.data.StoreManager.lookup('store_monitor_session_filter');
                store_filter.clearFilter();
                store_filter.loadData(records);

                if(me.btn_filter === true){
                    if(Ext.getCmp('search_src').getValue() !== ""){ store_filter.filter('start', Ext.getCmp('search_src').getValue()); }
                    if(Ext.getCmp('search_srcport').getValue() !== ""){ store_filter.filter('strport', Ext.getCmp('search_srcport').getValue()); }
                    if(Ext.getCmp('search_dst').getValue() !== ""){ store_filter.filter('destination', Ext.getCmp('search_dst').getValue()); }
                    if(Ext.getCmp('search_dstport').getValue() !== ""){ store_filter.filter('dstport', Ext.getCmp('search_dstport').getValue()); }
                    if(Ext.getCmp('search_protocol').getValue() !== null && Ext.getCmp('search_protocol').getValue() !== "all"){ store_filter.filter('protocol', Ext.getCmp('search_protocol').getValue()); }
                    if(Ext.getCmp('search_desc').getValue() !== null && Ext.getCmp('search_desc').getValue() !== "all"){ store_filter.filter('desc', Ext.getCmp('search_desc').getValue()); }
                }

                var records_filter = [];

                for(var l in store_filter.data.items){
                    records_filter.push(store_filter.data.items[l].data);
                }
                store2.load(function(){
                var store = Ext.data.StoreManager.lookup('store_monitor_session_v4_list');
                store.loadData(records_filter);
                        });
            }
        );

    }

});