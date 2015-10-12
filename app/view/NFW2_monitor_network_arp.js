
Ext.define('NFW2.view.NFW2_monitor_network_arp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_network_arp',

    requires: [
        'NFW2.view.NFW2_monitor_network_arpViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.button.Segmented',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_monitor_network_arp'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_network_arp',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforerender: 'onNFW2_monitor_network_arpBeforeRender',
        beforedestroy: 'onNFW2_monitor_network_arpBeforeDestroy'
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
                                flex: 1,
                                cls: 'dV_monitor',
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
                                            var me = Ext.getCmp('NFW2_monitor_network_arp');

                                            me.get_arp();
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
                                                    checked: true,
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
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'lb_m_none',
                                        hidden: true,
                                        id: 'arp_data_error',
                                        bind: {
                                            text: '{nodata_monitor_arp}'
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
                                        flex: 0.3,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
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
                                        flex: 0.7,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretchmax',
                                            pack: 'end'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                width: 80,
                                                text: 'IP Type'
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'iptype_com',
                                                margin: '0 0 2 5',
                                                width: 70,
                                                labelSeparator: ' ',
                                                labelWidth: 120,
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
                                                store: 'store_monitor_update_time',
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
                                                id: 'arp_ipv4_btn',
                                                enableToggle: true,
                                                pressed: true,
                                                bind: {
                                                    text: '{ipv4}'
                                                },
                                                listeners: {
                                                    click: 'onArp_ipv4_btnClick'
                                                }
                                            },
                                            {
                                                id: 'arp_ipv6_btn',
                                                bind: {
                                                    text: '{ipv6}'
                                                },
                                                listeners: {
                                                    click: 'onArp_ipv6_btnClick'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 10',
                                        iconCls: 'icb_del',
                                        bind: {
                                            text: '{del}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick'
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
                                        store: 'store_monitor_arp_v4_list',
                                        columns: [
                                            {
                                                xtype: 'rownumberer',
                                                width: 60,
                                                align: 'center',
                                                dataIndex: '@num',
                                                text: 'N'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'interface',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{inter}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'ip',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{ip}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === "00:00:00:00:00:00"){ return ""; }
                                                    else{ return value; }
                                                },
                                                align: 'center',
                                                dataIndex: 'mac',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{mac}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var num = parseInt(value,16);

                                                    switch(num){
                                                        case 0 : return "Incomplete";
                                                        case 1 : return "Incomplete";
                                                        case 2 : return "Reachable";
                                                        case 3 : return "Stable";
                                                        case 6 : return "Static";
                                                        case 8 : return "Delay";
                                                        case 16 : return "Probe";
                                                        case 32 : return "Failed";
                                                    }
                                                },
                                                align: 'center',
                                                dataIndex: 'flags',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{flags}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var num = parseInt(value,16);

                                                    switch(num){
                                                        case 0 : return "NET/ROM";
                                                        case 1 : return "Ethernet";
                                                        case 2 : return "EEtnetnet";
                                                        case 3 : return "AX.25";
                                                        case 4 : return "PROnet";
                                                        case 5 : return "Chaosnet";
                                                        case 6 : return "IEEE 802.2";
                                                        case 7 : return "ARCnet";
                                                        case 8 : return "APPLEtalk";
                                                        case 15 : return "DLCI";
                                                        case 19 : return "ATM";
                                                        case 23 : return "Metricom STRIP";
                                                        case 25 : return "IEEE 1394";
                                                        case 27 : return "EUI-64";
                                                    }
                                                },
                                                align: 'center',
                                                dataIndex: 'hw',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{hard_ware}'
                                                }
                                            }
                                        ],
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel',
                                            listeners: {
                                                select: 'onCheckboxModelSelect'
                                            }
                                        }),
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                doRefresh: function() {
                                                    var me = this,
                                                        current = me.store.currentPage;

                                                    if (me.fireEvent('beforechange', me, current) !== false) {
                                                        //me.store.load(current, me.tbl());
                                                        me.store.currentPage = current;
                                                        var main = Ext.getCmp('NFW2_monitor_network_arp');

                                                        main.get_arp();
                                                    }

                                                },
                                                moveNext: function() {
                                                    var me = this,
                                                        store = me.store,
                                                        total = me.getPageData().pageCount,
                                                        next = store.currentPage + 1;

                                                    if (next <= total) {
                                                        if (me.fireEvent('beforechange', me, next) !== false) {

                                                            //store.nextPage();
                                                            store.getProxy().setExtraParam('start',Ext.encode((next-1)*1000));
                                                            store.currentPage = next;
                                                            var main = Ext.getCmp('NFW2_monitor_network_arp');

                                                            main.get_arp();

                                                            return true;
                                                        }
                                                    }
                                                    return false;
                                                },
                                                movePrevious: function() {
                                                    var me = this,
                                                        store = me.store,
                                                        prev = store.currentPage - 1;

                                                    if (prev > 0) {
                                                        if (me.fireEvent('beforechange', me, prev) !== false) {

                                                            //store.previousPage();
                                                            store.getProxy().setExtraParam('start',Ext.encode((prev-1)*1000));
                                                            store.currentPage = prev;
                                                            var main = Ext.getCmp('NFW2_monitor_network_arp');

                                                            main.get_arp();

                                                            return true;
                                                        }
                                                    }
                                                    return false;
                                                },
                                                moveFirst: function() {
                                                    var me = this,
                                                        store = me.store,
                                                        total = me.getPageData().pageCount,
                                                        next = store.currentPage + 1;

                                                    if (next <= total) {
                                                        if (me.fireEvent('beforechange', me, next) !== false) {

                                                            //store.nextPage();
                                                            store.getProxy().setExtraParam('start',Ext.encode((next-1)*1000));
                                                            store.currentPage = next;
                                                            var main = Ext.getCmp('NFW2_monitor_network_arp');

                                                            main.get_arp();

                                                            return true;
                                                        }
                                                    }
                                                    return false;
                                                },
                                                moveLast: function() {
                                                    var me = this,
                                                        last = me.getPageData().pageCount;

                                                    if (me.fireEvent('beforechange', me, last) !== false) {
                                                        me.store.getProxy().setExtraParam('start',Ext.encode((last-1)*1000));
                                                        me.store.currentPage = last;
                                                        var main = Ext.getCmp('NFW2_monitor_network_arp');

                                                        main.get_arp();


                                                        return true;
                                                    }
                                                    return false;
                                                },
                                                dock: 'bottom',
                                                id: 'toolbar',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_monitor_arp_v4_list',
                                                listeners: {
                                                    afterrender: 'onPagingtoolbarAfterRender'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        hidden: true,
                                        id: 'grid_ipv6',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        store: 'store_monitor_arp_v6_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                width: 60,
                                                align: 'center',
                                                dataIndex: '@num',
                                                text: 'N'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'interface',
                                                flex: 0.25,
                                                bind: {
                                                    text: '{inter}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'ip',
                                                flex: 0.25,
                                                bind: {
                                                    text: '{ip}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'mac',
                                                flex: 0.25,
                                                bind: {
                                                    text: '{mac}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'flags',
                                                flex: 0.25,
                                                bind: {
                                                    text: '{flags}'
                                                }
                                            }
                                        ],
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel'
                                        }),
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                doRefresh: function() {
                                                    var me = this,
                                                        current = me.store.currentPage;

                                                    if (me.fireEvent('beforechange', me, current) !== false) {
                                                        //me.store.load(current, me.tbl());
                                                        me.store.currentPage = current;
                                                        var main = Ext.getCmp('NFW2_monitor_network_arp');

                                                        main.get_arp();
                                                    }

                                                },
                                                moveNext: function() {
                                                    var me = this,
                                                        store = me.store,
                                                        total = me.getPageData().pageCount,
                                                        next = store.currentPage + 1;

                                                    if (next <= total) {
                                                        if (me.fireEvent('beforechange', me, next) !== false) {

                                                            //store.nextPage();
                                                            store.getProxy().setExtraParam('start',Ext.encode((next-1)*1000));
                                                            store.currentPage = next;
                                                            var main = Ext.getCmp('NFW2_monitor_network_arp');

                                                            main.get_arp();

                                                            return true;
                                                        }
                                                    }
                                                    return false;
                                                },
                                                movePrevious: function() {
                                                    var me = this,
                                                        store = me.store,
                                                        prev = store.currentPage - 1;

                                                    if (prev > 0) {
                                                        if (me.fireEvent('beforechange', me, prev) !== false) {

                                                            //store.previousPage();
                                                            store.getProxy().setExtraParam('start',Ext.encode((prev-1)*1000));
                                                            store.currentPage = prev;
                                                            var main = Ext.getCmp('NFW2_monitor_network_arp');

                                                            main.get_arp();

                                                            return true;
                                                        }
                                                    }
                                                    return false;
                                                },
                                                moveFirst: function() {
                                                    var me = this,
                                                        store = me.store,
                                                        total = me.getPageData().pageCount,
                                                        next = store.currentPage + 1;

                                                    if (next <= total) {
                                                        if (me.fireEvent('beforechange', me, next) !== false) {

                                                            //store.nextPage();
                                                            store.getProxy().setExtraParam('start',Ext.encode((next-1)*1000));
                                                            store.currentPage = next;
                                                            var main = Ext.getCmp('NFW2_monitor_network_arp');

                                                            main.get_arp();

                                                            return true;
                                                        }
                                                    }
                                                    return false;
                                                },
                                                moveLast: function() {
                                                    var me = this,
                                                        last = me.getPageData().pageCount;

                                                    if (me.fireEvent('beforechange', me, last) !== false) {
                                                        me.store.getProxy().setExtraParam('start',Ext.encode((last-1)*1000));
                                                        me.store.currentPage = last;
                                                        var main = Ext.getCmp('NFW2_monitor_network_arp');

                                                        main.get_arp();


                                                        return true;
                                                    }
                                                    return false;
                                                },
                                                updateInfo: function() {
                                                    var me = this,
                                                        displayItem = me.child('#displayItem'),
                                                        store = me.store,
                                                        pageData = me.getPageData(),
                                                        count, msg;

                                                    if (displayItem) {
                                                        count = pageData.total;
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

                                                        displayItem.setText(msg);
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

                                                    count = Ext.getCmp('NFW2_monitor_network_arp').ipv6;
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
                                                getPageData: function() {
                                                    var store = this.store,
                                                        totalCount = store.getTotalCount();

                                                    if(Ext.getCmp('NFW2_monitor_network_arp').ipv6){
                                                        if(Ext.getCmp('NFW2_monitor_network_arp').ipv6 !== 0){
                                                            totalCount = Ext.getCmp('NFW2_monitor_network_arp').ipv6;
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
                                                id: 'toolbar2',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_monitor_arp_v6_list'
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

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_monitor_network_arp');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_arp();
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

    onIptype_comAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('iptype_com').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("iptype_com").setValue(inter.items[0].data['value']);
        }
    },

    onIptype_comChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "v4"){
            Ext.getCmp('grid_ipv4').show();
            Ext.getCmp('grid_ipv6').hide();
            Ext.getCmp('update_chk').setValue(false);
        }
        else{
            Ext.getCmp('grid_ipv6').show();
            Ext.getCmp('grid_ipv4').hide();
            Ext.getCmp('update_chk').setValue(false);
        }
    },

    onUpdate_chkChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_arp');

        if(newValue){
            me.get_arp();
            if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_arp, 5000); }
            if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_arp, 10000); }
            if(Ext.getCmp('update_time').getValue() === "20"){ me.interval = setInterval(me.get_arp, 20000); }
            if(Ext.getCmp('update_time').getValue() === "30"){ me.interval = setInterval(me.get_arp, 30000); }
        }
        else{
            clearInterval(me.interval);
        }
    },

    onUpdate_timeAfterRender: function(component, eOpts) {
        // var inter = Ext.getCmp('update_time').getStore().data;

        // if(inter.length > 0){
        //     Ext.getCmp("update_time").setValue(inter.items[0].data['time']);
        // }
    },

    onUpdate_timeChange: function(field, newValue, oldValue, eOpts) {
        // var me = Ext.getCmp('NFW2_monitor_network_arp');

        // clearInterval(me.interval);

        // if(Ext.getCmp('update_chk').getValue()){
        //     if(newValue === "5"){ me.interval = setInterval(me.get_arp, 5000); }
        //     if(newValue === "10"){ me.interval = setInterval(me.get_arp, 10000); }
        //     if(newValue === "20"){ me.interval = setInterval(me.get_arp, 20000); }
        //     if(newValue === "30"){ me.interval = setInterval(me.get_arp, 30000); }
        // }
    },

    onArp_ipv4_btnClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_arp');
        Ext.getCmp('grid_ipv4').show();
        Ext.getCmp('grid_ipv6').hide();
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));
        me.set_ver = 4;

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_network_arp').get_arp();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
        if(Ext.data.StoreManager.lookup('store_monitor_arp_v4_list').data.items.length === 0){ Ext.getCmp('arp_data_error').show(); }
        else{ Ext.getCmp('arp_data_error').hide(); }
    },

    onArp_ipv6_btnClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_arp');
        Ext.getCmp('grid_ipv4').hide();
        Ext.getCmp('grid_ipv6').show();
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));
        me.set_ver = 4;

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_network_arp').get_arp();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
        if(Ext.data.StoreManager.lookup('store_monitor_arp_v6_list').data.items.length === 0){ Ext.getCmp('arp_data_error').show(); }
        else{ Ext.getCmp('arp_data_error').hide(); }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        if(me.set_ver === 4){
            var tbl = Ext.getCmp("grid_ipv4");
            var tbl_sel = tbl.getSelectionModel().getSelection();

            if(tbl_sel.length === 0){

                Ext.Msg.alert("",get_msg("sel_del"));
                return false;
            }else{
                var del_list = [];

                for(var i in tbl_sel){
                    del_list.push({
                        'ip':tbl_sel[i].data.ip
                    });
                }
                showLoadMask();
                var _params = {
                    func_name : Ext.encode('del_arp_list_ipv4'),
                    args : Ext.encode(del_list)
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'execKctrlFunc',
                    _params,

                    function(response){
                        hideLoadMask();
                        me.get_arp();
                    }
                );
            }
        }
        else{
            var tbl = Ext.getCmp("grid_ipv6");
            var tbl_sel = tbl.getSelectionModel().getSelection();

            if(tbl_sel.length === 0){

                Ext.Msg.alert("",get_msg("sel_del"));
                return false;
            }else{
                var del_list = [];

                for(var i in tbl_sel){
                    del_list.push(tbl_sel[i].data.ip);
                }
                showLoadMask();
                var _params = {
                    func_name : Ext.encode('del_arp_list_ipv6'),
                    args : Ext.encode(del_list)
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'execKctrlFunc',
                    _params,

                    function(response){
                        hideLoadMask();
                        me.get_arp();
                    }
                );
            }
        }
    },

    onCheckboxModelSelect: function(rowmodel, record, index, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onPagingtoolbarAfterRender: function(component, eOpts) {
        // var store = Ext.data.StoreManager.lookup('store_monitor_arp_v4_list');
        // store.load();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.set_ver = 4;
        me.ipv6 = [];
        me.fir = true;

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
        me.get_arp();
    },

    onNFW2_monitor_network_arpBeforeRender: function(component, eOpts) {
        Ext.getCmp('toolbar').items.items[4].editable = false;
        Ext.getCmp('toolbar2').items.items[4].editable = false;
    },

    onNFW2_monitor_network_arpBeforeDestroy: function(component, eOpts) {
        var me = this;
        Ext.data.StoreManager.lookup('store_monitor_arp_v4_list').removeAll();
        Ext.data.StoreManager.lookup('store_monitor_arp_v6_list').removeAll();
        clearInterval(Ext.getCmp('timeout').interval);
    },

    get_arp: function() {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_monitor_arp_v4_list');
        var store2 = Ext.data.StoreManager.lookup('store_monitor_arp_v6_list');
        // if(me.fir === true){ store.load(); me.fir = false;}
        store.load(function(response){
            var _params = {
                filename: Ext.encode('/proc/net/arp'),
                start : Ext.encode(0),
                limit : Ext.encode(1000)
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getFileContent',
                _params,

                function(response){
                    hideLoadMask();
                    setTimeout(function(){ me.setWidth('100%'); },100);
                    var records = [];
                    var temp;
                    if(response === undefined){ return false; }
                    if(!response.retcode){
                        if(Ext.getCmp('arp_ipv4_btn').pressed === true){
                            if(response.list.length === 0){ Ext.getCmp('arp_data_error').show(); }
                            else{ Ext.getCmp('arp_data_error').hide(); }
                        }
                        for(var i = 1;i < response.list.length;i++){
                            var data = [];
                            temp = response.list[i].split(' ');
                            for(var j in temp){
                                if(temp[j] !== ""){ data.push(temp[j]); }
                            }
                            records.push({
                                "@num" : i,
                                "interface" : data[5],
                                "ip" : data[0],
                                "mac" : data[3],
                                "flags" : data[2],
                                "hw" : data[1]
                            });

                        }
                        var store = Ext.data.StoreManager.lookup('store_monitor_arp_v4_list');
                        store.loadData(records);
                    }
                    else{ return false; }
                }
            );
        });

        store2.load(function(response){
            var _params = {
                type_info : Ext.encode({'name':'arp', 'ip_type':'ipv6'})
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getNetworkUsage',
                _params,

                function(response){
                    var records_ipv6 = [];
                    if(response === undefined){ return false; }
                    if(Ext.getCmp('arp_ipv6_btn').pressed === true){
                        if(response.length === 0){ Ext.getCmp('arp_data_error').show(); }
                        else{ Ext.getCmp('arp_data_error').hide(); }
                    }
                    for(var i in response){
                        records_ipv6.push({
                            "@num" : Number(i)+1,
                            "interface" : response[i].Interface,
                            "ip" : response[i].IP,
                            "mac" : response[i].MAC,
                            "flags" : response[i].Flags
                        });
                    }

                    var store2 = Ext.data.StoreManager.lookup('store_monitor_arp_v6_list');
                    me.ipv6 = response.length;
                    store2.loadData(records_ipv6);
                }
            );
        });
    }

});